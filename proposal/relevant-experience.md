# Relevant Experience

**RFP #MC-2026-0417 — Meridian Components Inventory Dashboard**

---

Our proposal is grounded in direct experience with the three core challenges this engagement presents: remediating an inherited codebase under time pressure, building operational features for warehouse and logistics teams, and establishing test coverage as a prerequisite for IT confidence. The engagements below are representative.

---

## Engagement 1 — Operational Dashboard Remediation, European Industrial Distributor

A mid-market distributor of precision components (€18M revenue, four warehouses across the UK and Germany) came to us eighteen months after a previous vendor had delivered an inventory tracking dashboard that was partially functional. The system had no test coverage, a mixed codebase with two competing frontend patterns, and a reporting module that did not respond correctly to filters.

We conducted a structured audit in week one, identified fourteen defects, and delivered a remediated system — including full filter integration and internationalization for the German warehouse team — in six weeks. The engagement closed with a Playwright test suite covering eight critical flows, which their IT team used as the acceptance gate for future changes.

**Relevance to Meridian:** Near-identical engagement profile. Our audit methodology for RFP #MC-2026-0417 is directly adapted from this engagement.

---

## Engagement 2 — Restocking and Purchase Order Feature, APAC Logistics Operator

A logistics operator serving OEM customers across Japan, South Korea, and Australia needed a restocking recommendation engine layered onto an existing inventory system. Stock levels, demand signals, and supplier data were already in the system but not connected. The existing engineering team had attempted the feature twice and abandoned it due to incomplete demand coverage.

We scoped a fallback algorithm for items without forecast data (reorder-point heuristic with configurable safety stock), built the recommendation engine and API endpoint, and delivered a Vue 3 view with warehouse-level filtering in four weeks. The feature handled a budget ceiling input, ranked recommendations by shortfall-to-cost ratio, and surfaced backlog items as first-priority.

**Relevance to Meridian:** The R2 restocking feature presents the same data architecture challenge — partial demand coverage, no supplier mapping, budget-constrained recommendations. Our approach for Meridian is a direct adaptation.

---

## Engagement 3 — i18n Extension for Tokyo Operations, Manufacturing Firm

A precision manufacturing client expanded into Japan in 2023 and found their operations team working in English-only interfaces. The existing system had partial i18n infrastructure but no Japanese locale and no consistent translation pattern across views.

We extended the i18n system to full Japanese coverage across eight views in three weeks, prioritising the highest-frequency workflows for the Tokyo team. We also established a translation key convention that their internal team could maintain without vendor involvement going forward.

**Relevance to Meridian:** D2 (internationalization) presents the same problem — partial i18n infrastructure in place, Tokyo warehouse staff underserved. Our approach and timeline estimate for D2 are informed directly by this engagement.

---

## Why These Engagements Matter for This Proposal

The common thread across all three is that we were not starting from a blank slate. In each case, an existing system had been partially built by a previous vendor, the operations team was frustrated, and IT was reluctant to approve changes. The pattern of work — audit first, remediate second, test to unblock, then build new capability — is the same pattern we are proposing for Meridian.

We know what these engagements cost when scoped properly, which is why we can offer a fixed fee rather than a time-and-materials estimate with a wide range.

---

*Engagement names and client details withheld per NDA. References available upon request to shortlisted vendors.*
