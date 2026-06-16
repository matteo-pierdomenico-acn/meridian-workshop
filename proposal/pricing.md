# Pricing

**RFP #MC-2026-0417 — Meridian Components Inventory Dashboard**

---

## At a Glance

| # | Deliverable | Type | Model | Fee |
|---|---|---|---|---|
| R4 | Architecture documentation | Fixed fee | hrs × 1.30 × €290 | €3,800 |
| R1 | Reports remediation | Fixed fee | hrs × 1.30 × €290 × 1.18 | €11,000 |
| R3 | Automated browser testing | Fixed fee | hrs × 1.30 × €290 × 1.18 | €11,000 |
| R2 | Restocking recommendations | Fixed fee | hrs × 1.30 × €290 × 1.18 | €22,200 |
| | **Base total** | | | **€48,000** |
| D2 | i18n — Japanese locale | T&M NTE | hrs × 1.30 × €290 | €9,500 |
| D3 | Dark mode | T&M NTE | hrs × 1.30 × €290 | €7,600 |
| D1 | UI modernisation | T&M NTE | hrs × 1.30 × €290 | €15,100 |
| | **Optional total** | | | **€32,200** |
| | **Full engagement ceiling** | | | **€80,200** |

---

## Pricing Model

All fees derive from a single transparent formula applied consistently across both the base scope and optional items:

```
Billed Hours  =  Delivery Hours  ×  1.30   (overhead multiplier)
T&M Cost      =  Billed Hours    ×  €290   (blended rate)
Fixed Fee     =  T&M Cost        ×  1.18   (fixed-fee risk premium)
```

**Blended rate — €290/hour**
Reflects a senior full-stack engineer and engagement lead working in tandem.

**Overhead multiplier — ×1.30**
Delivery hours alone do not represent total engagement cost. The 30% overhead covers:
- Project management and status reporting
- UAT support and client review cycles
- Knowledge transfer and handoff documentation beyond R4
- Internal quality review and code sign-off

This multiplier is applied to **all items**, fixed-fee and optional alike.

**Fixed-fee risk premium — ×1.18**
Applied only to fixed-fee items (R1, R2, R3). When we offer a fixed fee, we absorb the risk of overruns — not Meridian. That guarantee costs something. R4 (architecture documentation) and all optional T&M items carry no risk premium: R4 is well-bounded, and optional T&M items cap Meridian's exposure rather than ours.

---

## Base Scope — Fixed Fee

| # | Deliverable | Delivery hrs | ×1.30 = Billed hrs | ×€290 = T&M cost | ×1.18 risk premium | **Fixed fee** |
|---|---|---|---|---|---|---|
| R4 | Architecture documentation | 10h | 13h | €3,770 | — (not applied) | **€3,800** |
| R1 | Reports module remediation | 25h | 32h | €9,280 | ×1.18 | **€11,000** |
| R3 | Automated browser testing | 25h | 32h | €9,280 | ×1.18 | **€11,000** |
| R2 | Restocking recommendations | 50h | 65h | €18,850 | ×1.18 | **€22,200** |
| | **Base total** | **110h** | **142h** | **€41,180** | | **€48,000** |

The fixed fee is the not-to-exceed figure. If the engagement comes in under estimate, Meridian pays the fixed fee. If it runs over due to factors within our control, we absorb the difference.

**The only exception:** if the Reports defect audit uncovers issues beyond the 11 identified in our pre-proposal review that materially expand scope, we will notify Meridian in writing before proceeding with additional work.

---

## Optional Extension — D1–D3 (T&M with Not-to-Exceed)

Optional items are billed time-and-materials — Meridian pays only for hours worked, up to the not-to-exceed cap. No risk premium is applied: the NTE cap protects Meridian's budget ceiling, and the T&M model means we are not absorbing open-ended risk.

| # | Deliverable | Delivery hrs | ×1.30 = Billed hrs | ×€290 = T&M cost | Risk premium | **Not-to-exceed** |
|---|---|---|---|---|---|---|
| D2 | Internationalization (Japanese locale) | 25h | 32h | €9,280 | — (T&M, no premium) | **€9,500** |
| D3 | Dark mode (operator-selectable theme) | 20h | 26h | €7,540 | — (T&M, no premium) | **€7,600** |
| D1 | UI modernization (visual refresh) | 40h | 52h | €15,080 | — (T&M, no premium) | **€15,100** |
| | **Optional total (all three)** | **85h** | **110h** | **€31,900** | | **€32,200** |

Recommended sequencing if Meridian elects all three: D2 first (i18n patterns established during R1 carry over), then D3, then D1 (reduces rework if visual refresh comes last).

---

## Full Engagement Ceiling

| Scope | Fee |
|---|---|
| Base (R1–R4) | €48,000 |
| Optional extension (D1–D3, all elected) | €32,200 |
| **Maximum total** | **€80,200** |

At Meridian's ~€9.6M annual revenue, the base engagement represents approximately 0.5% of revenue to remediate, test, and extend a system the operations team relies on daily. The full engagement ceiling — including all desired items — is under 0.84%.

---

## Payment Terms

| Milestone | Amount |
|---|---|
| Contract execution | 30% (€14,400) |
| R4 + R1 delivery and sign-off | 35% (€16,800) |
| R3 + R2 delivery and sign-off | 35% (€16,800) |

Optional extension items billed monthly on actuals, capped at each item's not-to-exceed.

---

## Assumptions

| # | Assumption | Impact if incorrect |
|---|---|---|
| A1 | No cloud infrastructure, deployment pipeline, or database migration in scope | Scope and fee increase; change order required |
| A2 | 11 Reports defects identified represent the full defect set | Material additional defects may require a change order |
| A3 | `/api/demand` data is sufficient for R2 without external sourcing | May require data enrichment work |
| A4 | Meridian provides feedback within 2 business days at each sign-off milestone | Timeline extends; no fee impact unless delays are systemic |
| A5 | D1–D3, if elected, begin after R2 sign-off | No impact — sequencing is Meridian's choice |

---

*All fees in EUR. Invoice currency can be adjusted to USD or GBP at contract time at the prevailing rate.*
