# Delivery Timeline

**RFP #MC-2026-0417 — Meridian Components Inventory Dashboard**

---

## Approach

We are proposing a five-week base engagement covering all four required deliverables (R1–R4), followed by an optional extension for D1–D3. The sequence is deliberate: we start with architecture review to orient the engagement, move to remediation to fix what's broken, establish test coverage to satisfy IT, and then build the Restocking feature on a clean, tested foundation.

---

## Phase 1 — Orientation & Architecture (Week 1)

**Deliverable: R4 — Architecture Documentation**

The engagement opens with a structured review of the existing codebase. This is not ceremonial — our pre-proposal review already identified the incomplete Composition API migration, the Reports isolation from the filter system, and the partial demand forecast coverage. Week 1 formalizes those findings into a current-state architecture document and aligns the team on the full defect list before work begins.

- Kickoff with Meridian IT and operations stakeholders
- Confirm defect inventory (11 issues identified; Meridian to flag any additions)
- Deliver: self-contained HTML architecture overview covering stack, data flow, API surface, component map, and known technical debt
- **IT sign-off on architecture doc closes R4**

---

## Phase 2 — Reports Remediation (Weeks 2–3)

**Deliverable: R1 — Reports Module**

With the codebase mapped, we address all eleven identified defects in the Reports module. This is the most structurally deep fix — it involves migrating the view from Options API to Composition API, wiring the full filter system, internationalizing all strings, and aligning the backend endpoints to accept filter parameters. The work proceeds defect by defect, with daily progress shared to Meridian's operations team for validation.

- Migrate `Reports.vue` to Composition API (consistent with all other views)
- Wire `useFilters` composable — Time Period, Warehouse, Category, Order Status
- Add i18n keys and `useI18n` integration — all hardcoded strings replaced
- Update `/api/reports/quarterly` and `/api/reports/monthly-trends` to accept filter parameters
- Fix direct `axios` calls — reroute through centralized `api.js`
- Remove all `console.log` debug statements
- Resolve number formatting, category translation, nav link, and `v-for` key issues
- **Operations team sign-off on Reports behavior closes R1**

---

## Phase 3 — Test Coverage (Week 4)

**Deliverable: R3 — Automated Browser Testing**

With the Reports module fixed, Week 4 establishes end-to-end browser test coverage using Playwright. Tests are written against the running application and cover the flows Meridian IT needs to approve future changes. Coverage map is shared with IT before delivery.

Critical flows covered:
1. Dashboard summary — loads correctly with and without filters applied
2. Reports filtering — all four filter dimensions produce correct output
3. Restocking view (stub) — placeholder verified before full feature lands in Week 5

- Tests structured for integration into a CI pipeline if Meridian IT chooses to adopt one
- Coverage documentation delivered alongside test suite
- **IT sign-off on coverage map closes R3**

---

## Phase 4 — Restocking Feature (Weeks 4–6)

**Deliverable: R2 — Restocking Recommendations**

The Restocking view is built in parallel with and following the testing phase. It is the most significant new build: a new FastAPI endpoint aggregating stock levels, demand forecasts, and backlog data, combined with a new Vue 3 view that accepts a budget ceiling and returns ranked purchase order recommendations.

- New `/api/restocking/recommendations` endpoint — accepts budget ceiling, optional warehouse and category filters
- Algorithm: for each item, calculate shortfall against demand forecast (or reorder-point heuristic for items without forecast data); rank by priority (backlog first, then shortfall/cost ratio); filter to budget ceiling
- New `Restocking.vue` — Composition API, integrated with `useFilters`, supports all four filter dimensions
- End-to-end Playwright tests for the Restocking flow added to the test suite
- **Operations team UAT closes R2**

---

## Phase 5 — Optional Extension (Weeks 6–8)

**Deliverables: D1, D2, D3 — Elected at contract time**

If Meridian elects any or all of the desired items, they are delivered following base scope close. Each is independent and can be sequenced to Meridian's preference.

| Item | Duration | Dependency |
|---|---|---|
| D2 — i18n extension (Tokyo priority) | 1 week | R1 complete (i18n patterns established) |
| D3 — Dark mode | 1 week | None — prototyped on isolated branch |
| D1 — UI modernization | 1.5 weeks | D2 preferred first (avoids rework) |

---

## Summary

| Week | Activity | Deliverable |
|---|---|---|
| 1 | Kickoff + architecture review | R4 |
| 2–3 | Reports remediation | R1 |
| 4 | Automated test coverage | R3 |
| 4–6 | Restocking feature | R2 |
| 6–8 | Optional: D1, D2, D3 | D1–D3 |

**Base engagement closes at Week 6. All four required deliverables complete.**

---

*Timeline assumes standard business hours and prompt feedback turnaround from Meridian stakeholders at each sign-off milestone. Material delays in feedback will be flagged proactively with a revised schedule.*
