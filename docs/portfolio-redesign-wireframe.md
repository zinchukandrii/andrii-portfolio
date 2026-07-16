# Wireframe — Signal / Evidence Systems

## Desktop

```text
┌─────────────────────────────────────────────────────────────────────────────┐
│ AZ / ANDRII ZINCHUK    PROJECTS    PROOF    ABOUT    CONTACT    GITHUB ↗   │
├─────────────────────────────────────────────────────────────────────────────┤
│ SYSTEMS PORTFOLIO / 2026                           [decorative evidence]    │
│                                                                              │
│ Engineering systems that can be inspected,                   ○──○──○         │
│ verified and trusted.                                        │  │  │         │
│                                                                              │
│ [VIEW SELECTED SYSTEMS]  [GITHUB ↗]                     trace / signals     │
│                                                                              │
│ 01 Control Plane          02 Runtime Failover       03 Quality Observatory  │
├─────────────────────────────────────────────────────────────────────────────┤
│ SELECTED SYSTEMS                                      03 PUBLIC CASES       │
│                                                                              │
│ [01 / control-plane visual]              [02 / decision-flow visual]        │
│ Agent Control Plane                      Runtime Failover                    │
│ problem / proof / tags / case study      problem / proof / case study        │
│                                                                              │
│ [03 / full-width real quality-dashboard preview + case study]               │
├─────────────────────────────────────────────────────────────────────────────┤
│ PROOF: public code · repeatable tests · explicit constraints · synthetic data│
├─────────────────────────────────────────────────────────────────────────────┤
│ ABOUT: engineering + process quality → Python / AI systems / data            │
├─────────────────────────────────────────────────────────────────────────────┤
│ CONTACT: email / LinkedIn / GitHub                                            │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Mobile

```text
[AZ]  ANDRII ZINCHUK                               [MENU]

SYSTEMS PORTFOLIO / 2026
Engineering systems that can be inspected,
verified and trusted.

[ VIEW PROJECTS ]
01 · 02 · 03  (three direct project shortcuts)

[Project 01]
[Project 02]
[Project 03]

[Proof] → [About] → [Contact]
```

## Interaction contract

- Header stays visible on desktop; mobile navigation opens with a button and closes with Escape / link activation.
- Project links are explicit HTML anchors, not a hover-only interaction.
- Decorative evidence trace is hidden from assistive technology.
- Reveal, trace and card transitions respect `prefers-reduced-motion`.
- The exact evidence shown on cards is limited to verified public data: tests, coverage, Docker smoke, offline simulation and synthetic-only labels.
