# Portfolio redesign research — evidence before implementation

**Date:** 2026-07-16
**Scope:** personal portfolio for Python / AI systems / reliability / engineering-data roles. This document is research and a design brief; it is not a claim that the listed visual patterns have been implemented.

## 1. Method

The review combined three independent research lanes:

1. Recruiter-first information architecture and case-study navigation.
2. Real portfolio motion/visual systems, including data/AI portfolios and award-level creative case studies.
3. Legal starter/template review, including deployment constraints and licenses.

The live site was also inspected directly:

- https://zinchukandrii.github.io/andrii-portfolio/
- mobile screenshot at 390 × 844

## 2. Honest audit of the current live page

### What works

- The page is responsive and readable on mobile.
- The hero makes the professional domain clear: engineering, data and AI systems.
- The three projects are real, public and link to case studies/repositories.
- The synthetic-only label and technical proof are appropriate for the Quality Observability project.

### What is weak

1. **The site looks like polished documentation, not a memorable portfolio.** The light background, restrained cards and mostly static interaction do not visually differentiate an AI/reliability/data-systems candidate.
2. **Project discovery is delayed.** Visitors first read a text-heavy hero and only then reach the work. The mobile view signals work below the fold but does not make a project selectable immediately.
3. **Navigation is too abstract.** `Work / Approach / Contact` does not expose the three actual projects, proof, CV, or a quick route to a chosen case study.
4. **The project cards lack visual distinction.** They are similar in structure and do not immediately show the product, artifact, problem or technical evidence.
5. **Case studies lead with explanation rather than a concrete artifact.** A recruiter should see the final interface/diagram first, then get the concise story: problem → approach → verified proof → links.
6. **There is no consistent motion language.** The site has accent colors and hover affordances, but no visual motif that ties the hero, project navigation and case studies together.

### Important evidence constraint

Do **not** invent business-user research, client data, production impact or percentage improvements. These projects are portfolio demos/synthetic systems. The honest proof is: public code, test output, CI, architecture, screenshots, documented constraints, and observed local/live behavior.

## 3. What good portfolio research consistently shows

### IA / recruiter flow

Figma's portfolio examples repeatedly pair a project preview with an explicit role, goal and case-study route. Conor O’Hollaren’s examples use clear project phases; Perry Wang and Bradley Ziffer pair a concise project story with visual proof. UXfolio and SiteBuilderReport also emphasize that case-study thumbnails are navigation triggers, not decoration.

**Adaptation:** make projects the first major destination and show a meaningful visual preview of each system. The homepage must orient in seconds; the case-study page must make evidence easy to scan.

Sources:

- https://www.figma.com/resource-library/portfolio-website-examples/
- https://www.sitebuilderreport.com/inspiration/ux-portfolios
- https://blog.uxfol.io/ux-case-study-structure/
- https://www.nngroup.com/articles/ux-design-portfolios/

### Motion systems worth adapting

Stefan Vitasović’s and Stas Bondar’s documented portfolios show a useful principle: a **single repeated motion motif** can make a portfolio feel authored. They use typography, project-media transitions, a stable grid and page transitions rather than random effects. Their sites also make clear that full WebGL/3D takes substantial performance engineering.

**Adaptation:** use motion to orient and preview: project-card reveal, information-line progress, masked headline entrance, short route transitions. Do not imitate their full shader/video/physics stacks.

Sources:

- https://tympanus.net/codrops/2025/03/05/case-study-stefan-vitasovic-portfolio-2025/
- https://tympanus.net/codrops/2025/03/25/stas-bondar-25-the-code-techniques-behind-a-next-level-portfolio/

### Data/AI portfolio patterns

Data/AI portfolios by Natassha Selvaraj, Harrison Jansma and Yan Holtz prioritize discoverable project galleries, crisp labels, screenshots/visual outputs and direct GitHub/demo links. They do not depend on 3D scenes to communicate credibility.

**Adaptation:** the visual center should be real project evidence: the Quality dashboard, a control-plane architecture/evidence view, and a failover decision-flow visualization.

Sources:

- https://natassha.github.io/natasshaselvaraj/
- https://harrisonjansma.com/
- https://www.yan-holtz.com/

## 4. Accessibility and performance guardrails

- W3C says non-essential interaction motion must be disableable; parallax and motion can cause nausea or distraction.
- Use `prefers-reduced-motion: reduce` to replace motion with instant states.
- Use CSS/SVG and GPU-friendly `opacity`/`transform` for the standard path.
- Lazy-load project screenshots; do not put autoplay video, infinite carousels or a heavy 3D scene above the fold.
- Use semantic buttons/links, visible keyboard focus, accessible names, Escape support for any lightbox/modal and a real mobile menu.

Sources:

- https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html
- https://web.dev/articles/prefers-reduced-motion

## 5. Legal template review

| Candidate | License/status | Suitability | Decision |
| --- | --- | --- | --- |
| [HamishMW/portfolio](https://github.com/HamishMW/portfolio) | MIT; Remix, Three.js, Framer Motion; Cloudflare-oriented | Visually high-end but substantial framework/hosting migration | **Use only as a motion-system reference. Do not fork.** |
| [ladunjexa/reactjs18-3d-portfolio](https://github.com/ladunjexa/reactjs18-3d-portfolio) | MIT; React/Vite/Three.js/Framer Motion | Can build static output, but generic 3D assets and tutorial feel conflict with engineering-data story | **Use only small implementation references. Do not fork.** |
| [Start Bootstrap Stylish Portfolio](https://github.com/StartBootstrap/startbootstrap-stylish-portfolio) | MIT; static HTML/CSS/JS; mature but last main commits are old | Easy GitHub Pages deployment, but generic and not visually distinctive | **Do not fork.** |

MIT permits reuse of code when its license/notice is preserved. It does not permit presenting another person’s projects, brand, screenshots, 3D models or identity as ours. No third-party visual assets will be copied into the public portfolio without a verified compatible license.

## 6. Recommended direction: **Signal / Evidence Systems**

The new website should look intentionally designed for the subject matter rather than like a generic developer template.

### Visual language

- **Base:** graphite/near-black background, off-white type, electric cyan as the active signal.
- **Project accents:** violet (agent control), amber/orange (failover), teal/lime (quality observability).
- **Motif:** a thin animated evidence trace — a grid/line of nodes that changes state as the user enters a project. This is a lightweight SVG/CSS pattern, not a borrowed shader.
- **Media:** each project has a real artifact above the fold: dashboard screenshot, decision-flow/architecture diagram, or evidence/audit trace. Media is the visual hook.
- **Typography:** large editorial headline + compact mono labels for `SYSTEM / STATUS / PROOF`.

### Navigation model

Desktop sticky top bar:

```text
AZ / ANDRII ZINCHUK    PROJECTS    PROOF    ABOUT    CONTACT    GITHUB ↗
```

- `PROJECTS` is a real anchor/route and opens a direct numbered project navigator:
  `01 Control Plane · 02 Runtime Failover · 03 Quality Observability`.
- `PROOF` goes to CI/tests/verified artifacts, not vague “Approach”.
- On mobile: an accessible menu button plus a fixed `View projects` CTA; no cramped text links.
- The homepage’s first screen includes the three numbered project shortcuts. A recruiter can open a chosen project in one click.

### Home-page sequence

1. **Hero:** professional positioning, two actions (`View selected systems`, `GitHub`) and a live-looking but decorative evidence trace.
2. **Project navigator:** three large, distinct cards. Hover/focus reveals one-line problem, stack, verified proof and real screenshot/diagram. Touch uses tap/focus state instead of hover.
3. **Proof strip:** public repositories, CI, tests, synthetic-only data classification where applicable.
4. **About:** concise story bridging engineering/process quality to Python/AI/data systems; real LinkedIn/GitHub/CV links only once verified.
5. **Contact:** direct, low-friction path.

### Case-study sequence

```text
Artifact preview → Problem / scope → What I built → Architecture & decisions
→ Verification / evidence → Lessons → Next project
```

A sticky, active section tracker can use the same evidence-trace motif. Do not introduce fake business metrics; use verified technical evidence.

## 7. Motion specification

| Interaction | Purpose | Standard motion | Reduced-motion state |
| --- | --- | --- | --- |
| Hero evidence trace | Establish system/evidence theme | subtle SVG pulse, 6–10 s loop | static completed trace |
| Headline | Direct attention to role | masked line reveal, <= 500 ms | visible immediately |
| Project cards | Show clickability and relevance | image sharpen + 2–4 px lift + border glow, <= 220 ms | color/border change only |
| Section entry | Preserve reading rhythm | opacity + 12 px translate, <= 350 ms | opacity 1, no translate |
| Case navigation | Confirm location | short active-indicator transition | instant indicator |
| Page/route | Maintain visual continuity | 180–250 ms fade | instant route |

No: autoplay video, infinite scroll, text physics, cursor replacement, constant parallax, noisy animated backgrounds, 3D avatar/astronaut or a template’s original assets.

## 8. Build plan — pending design approval

1. Create a low-fidelity wireframe for desktop/mobile using the IA above.
2. Create original SVG system diagrams and three project cover compositions from real artifacts.
3. Convert the static portfolio into a lightweight static build (Astro or Vite; final choice after implementation constraints are checked).
4. Implement the navigation, motion system, focus states and reduced-motion path.
5. Verify desktop/mobile, keyboard navigation, `prefers-reduced-motion`, page weight and GitHub Pages deployment.
6. Update all case studies and only then publish screenshots/links.

## 9. Decision requested

Approve the direction **Signal / Evidence Systems** before code changes. The alternative is a generic 3D/template portfolio; the research does not recommend that alternative for Python/AI/data recruiting because it risks looking like a copied frontend tutorial rather than evidence of systems work.
