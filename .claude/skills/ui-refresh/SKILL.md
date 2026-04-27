---
name: ui-refresh
description: Design standards for refreshing Meridian Components dashboard UI. Use this skill when improving visual polish, updating component styles, or adding new UI elements to the dashboard.
---

# Meridian Dashboard UI Refresh

## Design philosophy

The dashboard is a professional B2B tool used daily by warehouse and procurement staff. The visual language should feel **calm, dense, and trustworthy** — not flashy. Every change should make data easier to read, not harder.

## What to improve

### Stat cards
- Add a coloured left-border accent (4px) that maps to the card's semantic colour (success → green, warning → amber, danger → red, info → blue, neutral → slate)
- Remove the heavy `box-shadow` on hover; replace with a subtle `border-color` shift
- Reduce `stat-value` font size from `2.25rem` to `1.875rem` — large numbers wrap on narrow screens
- Add a small trend indicator line or icon below the value where data supports it

### Tables
- Zebra-stripe tbody rows using `var(--bg-subtle)` on even rows instead of hover-only highlight
- Make column headers sticky (`position: sticky; top: 0`) inside `.table-container` so long tables remain navigable
- Right-align numeric columns (quantity, cost, value) — left-aligned numbers are hard to scan

### Badges
- Round corners to `9999px` (pill shape) — the current `6px` reads as a button
- Slightly reduce padding: `0.2rem 0.625rem` instead of `0.313rem 0.75rem`
- Keep existing colour semantics exactly — do not change which colours map to which states

### Filter bar
- Add a visible divider between the filter group area and the reset button
- Give active (non-default) selects a subtle blue `border-color: var(--accent)` so users can see at a glance which filters are set

### Page headers
- Tighten `margin-bottom` from `1.5rem` to `1rem` — reduces wasted vertical space
- Make the subtitle (`p`) slightly smaller: `0.875rem` → `0.813rem`

### Cards
- Increase `border-radius` from `10px` to `12px` for a slightly softer feel
- Add `padding: 0` to `.card` and move padding to `.card-header` and table rows — avoids double-padding when a table sits directly inside a card

## What NOT to change

- CSS custom property names (`--bg-page`, `--accent`, etc.) — dark mode depends on them
- Semantic colour values — `#059669` success, `#ea580c` warning, `#dc2626` danger stay as-is
- Layout structure: nav height (70px), main-content max-width (1600px), filter bar position
- Font family — Inter is intentional
- Any `z-index` values — modal stacking order is already correct
- Transitions longer than `0.2s` — keep interactions snappy

## Implementation rules

1. All changes go in `App.vue` global styles or component `<style scoped>` blocks — never inline styles
2. Use CSS custom properties for any new colour values; never hardcode hex in component scoped styles
3. Test every change in both light and dark mode before marking done
4. Do not introduce new npm dependencies for styling
5. Changes must not break any of the 19 Playwright tests
