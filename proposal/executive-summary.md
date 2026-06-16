# Executive Summary

**RFP #MC-2026-0417 — Meridian Components Inventory Dashboard**
**Submitted by:** Accenture
**Date:** April 28, 2026

---

Meridian Components has built a capable foundation for inventory management — but an incomplete delivery from the previous vendor has left the operations team working around defects, and IT unable to safely approve changes. The result is a system your team uses despite its limitations rather than because of what it enables.

We propose to close that gap completely and extend the platform with the Restocking capability your operations team has been waiting for.

Accenture has delivered comparable engagements across mid-market distributors — modernizing operational dashboards, remediating inherited codebases, and establishing test coverage for teams where IT confidence was a prerequisite to moving forward. This engagement fits squarely in that experience.

Our approach is grounded in the source code and handoff documentation Meridian provided. We reviewed the existing architecture in full: a Vue 3 / FastAPI application serving three warehouse locations — San Francisco, London, and Tokyo — with a filter system across four dimensions and a data layer backed by structured JSON. We found a partially completed Vue Composition API migration, a Reports module with unwired filters, and no test coverage. The scope of work is clear.

**What we will deliver:**

- **Reports remediation (R1):** A full audit of the Reports module followed by resolution of all identified defects — filter wiring, internationalization gaps, and data consistency issues. Your team will have a Reports page that works as intended.
- **Restocking recommendations (R2):** A new view that surfaces purchase order recommendations based on live stock levels, demand forecasts already present in the system, and an operator-supplied budget ceiling. Built for R. Tanaka's operations team to use daily.
- **Automated browser tests (R3):** End-to-end test coverage for the critical user flows, giving Meridian IT the confidence to approve future changes without manual regression testing.
- **Architecture documentation (R4):** A current-state overview — stack, data flow, API surface, and component structure — delivered in a format suitable for IT handoff.

On the desired items: D2 (internationalization) is particularly relevant given that Tokyo warehouse staff — approximately 12 people serving APAC OEM customers — currently work in English-only views. We will price D1–D3 as an optional extension so Meridian can decide at contract time how far to take the engagement.

**Why this engagement will land differently than the last one:** We are not scoping blind. We have read the codebase, identified the incomplete migration, and confirmed that demand forecast data is already present in the system. The required work is well-defined, the risks are manageable, and we are committing to a timeline that reflects what the code actually needs — not what sounds good in a proposal.

---

*Response prepared in accordance with RFP §4. Clarifying assumptions are documented in the Technical Approach section.*
