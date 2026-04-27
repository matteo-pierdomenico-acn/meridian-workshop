<template>
  <div class="restocking">
    <div class="page-header">
      <div>
        <h2>{{ t('restocking.title') }}</h2>
        <p>{{ t('restocking.subtitle') }}</p>
      </div>
      <div class="budget-control">
        <label class="budget-label">{{ t('restocking.budgetCeiling') }}</label>
        <div class="budget-input-row">
          <span class="currency-prefix">{{ currencySymbol }}</span>
          <input
            v-model.number="budgetInput"
            type="number"
            min="0"
            step="1000"
            :placeholder="t('restocking.budgetPlaceholder')"
            class="budget-input"
            @keyup.enter="applyBudget"
          />
          <button class="apply-btn" @click="applyBudget">{{ t('restocking.apply') }}</button>
        </div>
      </div>
    </div>

    <div v-if="loading" class="loading">{{ t('common.loading') }}</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="data">
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-label">{{ t('restocking.itemsRecommended') }}</div>
          <div class="stat-value success">{{ data.items_within_budget }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">{{ t('restocking.totalCost') }}</div>
          <div class="stat-value">{{ currencySymbol }}{{ data.total_within_budget.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">{{ t('restocking.budgetRemaining') }}</div>
          <div class="stat-value" :class="data.budget_remaining < 0 ? 'danger' : 'success'">
            {{ currencySymbol }}{{ data.budget_remaining.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-label">{{ t('restocking.itemsOverBudget') }}</div>
          <div class="stat-value" :class="data.items_over_budget > 0 ? 'warning' : ''">{{ data.items_over_budget }}</div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h3 class="card-title">{{ data.recommendations.length }} {{ t('restocking.itemsRecommended') }}</h3>
        </div>
        <div v-if="data.recommendations.length === 0" class="empty-state">
          {{ t('restocking.noRecommendations') }}
        </div>
        <div v-else class="table-container">
          <table>
            <thead>
              <tr>
                <th>{{ t('restocking.sku') }}</th>
                <th>{{ t('restocking.item') }}</th>
                <th>{{ t('restocking.category') }}</th>
                <th>{{ t('restocking.warehouse') }}</th>
                <th>{{ t('restocking.currentStock') }}</th>
                <th>{{ t('restocking.reorderPoint') }}</th>
                <th>{{ t('restocking.recommendedQty') }}</th>
                <th>{{ t('restocking.unitCost') }}</th>
                <th>{{ t('restocking.estimatedCost') }}</th>
                <th>{{ t('restocking.trend') }}</th>
                <th>{{ t('restocking.priority') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in data.recommendations"
                :key="item.sku"
                :class="{ 'over-budget': !item.within_budget }"
              >
                <td><strong>{{ item.sku }}</strong></td>
                <td>{{ translateProductName(item.name) }}</td>
                <td>{{ translateCategory(item.category) }}</td>
                <td>{{ translateWarehouse(item.warehouse) }}</td>
                <td>{{ item.current_qty }}</td>
                <td>{{ item.reorder_point }}</td>
                <td><strong>{{ item.recommended_qty }}</strong></td>
                <td>{{ currencySymbol }}{{ item.unit_cost.toFixed(2) }}</td>
                <td>
                  <strong :class="item.within_budget ? '' : 'muted'">
                    {{ currencySymbol }}{{ item.estimated_cost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}
                  </strong>
                </td>
                <td>
                  <span :class="['badge', trendClass(item.trend)]">
                    {{ trendIcon(item.trend) }} {{ t(`trends.${item.trend}`) }}
                  </span>
                </td>
                <td>
                  <span v-if="item.in_backlog" :class="['badge', priorityClass(item.backlog_priority)]">
                    {{ t(`priority.${item.backlog_priority}`) }}
                  </span>
                  <span v-else class="muted">—</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { api } from '../api'
import { useFilters } from '../composables/useFilters'
import { useI18n } from '../composables/useI18n'

export default {
  name: 'Restocking',
  setup() {
    const { t, currentCurrency, translateProductName, translateWarehouse } = useI18n()

    const currencySymbol = computed(() => currentCurrency.value === 'JPY' ? '¥' : '$')

    const loading = ref(true)
    const error = ref(null)
    const data = ref(null)
    const budgetInput = ref(10000)
    const appliedBudget = ref(10000)

    const { selectedLocation, selectedCategory, getCurrentFilters } = useFilters()

    const translateCategory = (category) => {
      const map = {
        'Circuit Boards': t('categories.circuitBoards'),
        'Sensors': t('categories.sensors'),
        'Actuators': t('categories.actuators'),
        'Controllers': t('categories.controllers'),
        'Power Supplies': t('categories.powerSupplies')
      }
      return map[category] || category
    }

    const priorityClass = (priority) => {
      if (priority === 'high') return 'danger'
      if (priority === 'medium') return 'warning'
      if (priority === 'low') return 'info'
      return ''
    }

    const trendClass = (trend) => {
      if (trend === 'increasing') return 'danger'
      if (trend === 'decreasing') return 'success'
      return 'info'
    }

    const trendIcon = (trend) => {
      if (trend === 'increasing') return '↑'
      if (trend === 'decreasing') return '↓'
      return '→'
    }

    const loadRecommendations = async () => {
      try {
        loading.value = true
        error.value = null
        const filters = getCurrentFilters()
        data.value = await api.getRestockingRecommendations(appliedBudget.value, {
          warehouse: filters.warehouse,
          category: filters.category
        })
      } catch (err) {
        error.value = 'Failed to load recommendations: ' + err.message
      } finally {
        loading.value = false
      }
    }

    const applyBudget = () => {
      appliedBudget.value = budgetInput.value
      loadRecommendations()
    }

    watch([selectedLocation, selectedCategory], loadRecommendations)

    onMounted(loadRecommendations)

    return {
      t,
      currencySymbol,
      loading,
      error,
      data,
      budgetInput,
      applyBudget,
      translateCategory,
      translateProductName,
      translateWarehouse,
      priorityClass,
      trendClass,
      trendIcon
    }
  }
}
</script>

<style scoped>
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.page-header h2 {
  margin-bottom: 0.25rem;
}

.page-header p {
  color: var(--text-muted);
  font-size: 0.875rem;
}

.budget-control {
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.budget-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.budget-input-row {
  display: flex;
  align-items: center;
  gap: 0;
}

.currency-prefix {
  padding: 0.5rem 0.625rem;
  background: var(--bg-subtle);
  border: 1px solid var(--border-strong);
  border-right: none;
  border-radius: 8px 0 0 8px;
  font-size: 0.875rem;
  color: var(--text-muted);
  line-height: 1.25rem;
}

.budget-input {
  width: 140px;
  padding: 0.5rem 0.75rem;
  border: 1px solid var(--border-strong);
  border-right: none;
  font-size: 0.875rem;
  color: var(--text-primary);
  background: var(--bg-subtle);
  transition: all 0.2s;
}

.budget-input:focus {
  outline: none;
  border-color: var(--accent);
  background: var(--bg-surface);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  z-index: 1;
  position: relative;
}

.apply-btn {
  padding: 0.5rem 1rem;
  background: var(--accent);
  color: white;
  border: 1px solid var(--accent);
  border-radius: 0 8px 8px 0;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  white-space: nowrap;
}

.apply-btn:hover {
  background: var(--accent-bar);
  border-color: var(--accent-bar);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat-card {
  background: var(--bg-surface);
  border-radius: 12px;
  padding: 1.25rem 1.5rem;
}

.stat-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.5rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
}

.stat-value.success { color: #10b981; }
.stat-value.warning { color: #f59e0b; }
.stat-value.danger  { color: #ef4444; }

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid var(--border);
}

.card-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0;
}

.empty-state {
  padding: 3rem;
  text-align: center;
  color: var(--text-muted);
  font-size: 0.875rem;
}

.loading,
.error {
  padding: 2rem;
  text-align: center;
  color: var(--text-muted);
}

.error { color: #ef4444; }

.over-budget {
  opacity: 0.45;
}

.muted {
  color: #94a3b8;
}
</style>
