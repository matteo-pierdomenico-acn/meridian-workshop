# Technical Approach

**RFP #MC-2026-0417 — Meridian Components Inventory Dashboard**

---

Unlike a typical vendor engagement where scope is estimated from a spec alone, we reviewed Meridian's source code and previous vendor handoff directly before writing this section. What follows is grounded in what the system actually contains — not what we assume it might. Each requirement below includes our specific findings, our delivery approach, and any assumptions we are making explicitly so Meridian can flag disagreements before contract.

---

## R1 — Reports Module Remediation

**Finding.** The previous vendor's handoff notes confirm the Reports module was left incomplete: filters are not fully wired, and the handoff cites internationalization gaps and inconsistent data patterns as open items. The system's filter architecture spans four dimensions — Time Period, Warehouse, Category, and Order Status — and the Reports view does not correctly apply all of them.

**Approach.** We will perform a full audit of the Reports view (`client/src/views/`) against all four filter dimensions and the full data set. Every defect identified will be resolved and verified before delivery. We will not scope to a list of eight — we will scope to zero remaining defects.

**Assumption.** The codebase is our source of truth for defect discovery. We do not require Meridian to provide a separate issue log, though we will share our audit findings before beginning remediation so your team can confirm alignment.

---

## R2 — Restocking Recommendations

**Finding.** The system already exposes `/api/demand` and `/api/backlog` endpoints, and stock data is present in the server's structured data layer. The inputs needed to generate restocking recommendations — current stock levels, demand forecast, and supplier context — are available within the existing application. No external data source or forecasting model is required.

**Approach.** We will build a new Restocking view as a first-class module in the Vue 3 frontend (Composition API, consistent with the application's intended patterns) backed by a new FastAPI endpoint that combines stock levels, demand data, and an operator-supplied budget ceiling. The output will be a ranked list of recommended purchase orders — item, quantity, estimated cost — filtered to stay within the specified budget. The view will support warehouse-level filtering consistent with the rest of the application.

**Assumption.** The demand data currently in the system is sufficient to produce meaningful recommendations without modification. If Meridian's operations team identifies data quality issues during UAT, we will address them within scope.

---

## R3 — Automated Browser Testing

**Finding.** No automated tests were delivered by the previous vendor. Meridian IT has blocked changes to the system as a result. Establishing test coverage is effectively a prerequisite for the rest of the engagement — and for any future work Meridian commissions after this contract.

**Approach.** We will implement end-to-end browser tests using Playwright covering the primary operations team journeys: dashboard summary, report filtering across all dimensions, and the new Restocking view. Tests will be written to run against the local development environment and structured so Meridian IT can integrate them into a CI pipeline if desired. We will share the coverage map with IT for sign-off before delivery.

**Assumption.** "Critical flows" are defined as the primary operations team journeys listed above. If IT has specific flows they want prioritized, we can adjust the coverage plan before we begin writing tests.

---

## R4 — Architecture Documentation

**Finding.** The previous vendor's handoff documentation was minimal — one page covering the stack, a partial API list, and a brief note on patterns. It is not sufficient for IT onboarding or future vendor continuity.

**Approach.** We will produce a current-state architecture overview as a self-contained HTML document, covering:

- **Stack:** Vue 3 + Vite (frontend), Python FastAPI (backend), structured JSON data layer
- **Data flow:** how filters propagate from the Vue filter system through `api.js` to the FastAPI endpoints and back
- **API surface:** all endpoints with parameters, response shapes, and filter behavior
- **Component map:** views, shared components, and their relationships
- **Technical debt:** the incomplete Options API → Composition API migration, and our approach to resolving it during delivery

The document will be written for Meridian IT — not for developers — and will be reviewed with your team before final delivery.

---

## D1–D3 — Desired Items (Optional Extension)

These items are not included in the fixed-fee base engagement but are priced as an optional extension Meridian can elect at contract time.

**D1 — UI Modernization.** A visual refresh of the dashboard using the existing design token system as a baseline (slate/gray palette, status colors, chart patterns). We will propose a revised visual direction for Meridian's review before implementation begins.

**D2 — Internationalization.** Extension of i18n support to all remaining modules. Priority will be given to the views most used by Tokyo warehouse staff, where English-only interfaces are the current operational constraint for approximately 12 APAC team members. Japanese locale will be the primary target; additional locales can be scoped separately.

**D3 — Dark mode.** An operator-selectable theme toggle suitable for warehouse floor stations in low-light environments. We will prototype on an isolated branch to avoid any risk to the main application during development.

---

## Assumptions Summary

| # | Assumption | Impact if incorrect |
|---|---|---|
| A1 | Codebase is source of truth for R1 defect discovery | May require additional audit time if Meridian's logged issue list exceeds what the code reveals |
| A2 | `/api/demand` data is sufficient for R2 recommendations without modification | May require data enrichment work if quality is insufficient |
| A3 | Critical flows for R3 are dashboard summary, report filtering, and restocking | Coverage plan will be adjusted if IT specifies different priorities |
| A4 | No external database or data source is required | Scope and timeline would increase if a database migration is required |
| A5 | D1–D3 are out of base scope; Meridian elects at contract time | No impact — these are explicitly optional |

---

*All assumptions will be reviewed with Meridian at engagement kickoff. Clarifying assumptions are the norm in engagements of this type; none represent risks to the required deliverables.*
