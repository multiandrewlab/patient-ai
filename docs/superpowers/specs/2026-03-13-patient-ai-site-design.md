# Design Spec: The Patient Intelligence — Interactive Web Experience

**Date:** 2026-03-13
**Status:** Approved
**Scope:** Full build — all 34 interactive components, all tiers

---

## 1. Architecture & Tech Stack

### Framework
- **Astro** — static-first, island architecture, `output: 'static'`
- **MDX** — narrative content authored as Markdown with embedded components
- **Vue** — island components only, for interactive elements with complex state, always `client:visible`
- **Tailwind CSS** — mobile-first responsive, dark/light mode via `class` strategy

### Libraries (lazy-loaded per-component, never global)
- **GSAP + ScrollTrigger** — scroll-driven narrative animations
- **D3.js** — data visualisations (sub-module imports where possible)
- **Three.js** — contingency only for FibreStrandHero if SVG performance is insufficient

### Fonts
- **Playfair Display** (serif) — chapter titles, display text
- **Inter** (variable) — UI, data labels, body text

### Styling
- CSS custom properties as the colour source, Tailwind as the consumer
- Dark mode: `class` strategy with system preference detection on first load, user toggle persisted to `localStorage`
- `prefers-reduced-motion` respected on all animations

### Deployment
- **Cloudflare Pages** — static `dist/` output
- Includes `_headers` (CSP, HSTS), `_redirects`, sitemap, `robots.txt`

### Content Structure
- 8 MDX chapters in `src/content/` with typed frontmatter schema
- 30 JSON data files in `public/data/`
- 19 AI-generated images in `public/images/`

---

## 2. Component Architecture

### Component Types

| Type | Location | Purpose | Count |
|------|----------|---------|-------|
| Astro static | `src/components/astro/` | Static UI: headers, callouts, navigation, badges | 10 |
| Vanilla JS | `src/components/vanilla/` | GSAP + D3 components via Astro `<script>` tags | 20 |
| Vue islands | `src/components/vue/` | Complex stateful: quizzes, calculators, explorable models | 14 |

### Shared UI Components (Astro, static)
- ChapterHeader, ChapterNav, ChapterTransition, DeepDive, Callout, StatHighlight, Figure, CrossRef, FictionBadge, ThemeToggle, ScrollProgress

### Interactive Components: 34 Total

| Tier | Count | Estimated Effort |
|------|-------|-----------------|
| Tier 1 (ship at launch) | 10 | ~79h |
| Tier 2 (high value) | 9 | ~76h |
| Tier 3 (nice to have) | 15 | ~73h |
| Shared UI | 6 | ~12h |
| **Total** | **40** | **~240h** |

Full component specifications are in `docs/site-plan/components.md`.

---

## 3. Build Phases

### Phase 1 — Foundation

**Goal:** Working Astro project with layouts, styles, shared components, data files, and page routing. No prose content yet.

**Steps:**
1. Initialise Astro project with MDX, Vue, and Tailwind integrations
2. Configure `astro.config.mjs` (static output, site URL, integrations)
3. Configure `tailwind.config.ts` (Playfair Display + Inter, custom colour tokens, dark mode `class` strategy, typography plugin)
4. Create `src/styles/global.css` (Tailwind directives, font-face, CSS custom properties for light/dark)
5. Build `BaseLayout.astro` (HTML shell, meta, font preloads, dark mode init script, OG tags)
6. Build `ChapterLayout.astro` (prose container, chapter header slot, nav slot, progress slot)
7. Build `HomeLayout.astro` (landing page layout)
8. Build all shared Astro UI components (static, no JS): ChapterHeader, ChapterNav, Callout, StatHighlight, Figure, DeepDive, CrossRef, FictionBadge, ThemeToggle, ScrollProgress
9. Create `src/content/config.ts` with collection schema
10. Build pages: `src/pages/index.astro`, `src/pages/[chapter].astro`, `src/pages/404.astro`
11. Author all 30 JSON data files in `public/data/` from research summaries
12. Wire vanilla JS for ThemeToggle, ScrollProgress, ChapterNav, DeepDive

**Deliverable:** Deployable skeleton with working navigation, dark mode, and all data files ready.

### Phase 2 — Prose Drafting

**Goal:** All 8 chapters drafted as full MDX with static components, forming a complete reading experience.

**Steps:**
1. Draft all 8 MDX chapters (~18,900 words total) from research summaries + narrative plan + PROPOSAL.md
2. Embed static components inline: `<Callout>`, `<StatHighlight>`, `<DeepDive>`, `<Figure>`
3. Place `{/* COMPONENT: ComponentName */}` placeholder comments where interactive elements will go
4. Ensure all fictional names follow canonical mapping from `docs/narrative/characters-and-voices.md`

**Deliverable:** Fully readable, navigable site with all prose. Deployable.

**Gate:** User reviews and approves all prose before Phase 3 begins.

### Phase 3 — Chapter-by-Chapter Interactive Build

**Goal:** Build all 34 interactive components, chapter by chapter from 0 to 7.

| Chapter | Components |
|---------|-----------|
| Ch 0: The Thread | #1 FibreStrandHero, #2 FibreScaleCounter |
| Ch 1: Weight of Light | #3 InfrastructureComparator, #4 BrainVsSiliconScale, #5 WaterCostCalculator, #6 DemandSurgeChart, #7 JevonsParadoxChart |
| Ch 2: Built by Hand | #8 ChipCalculator, #9 SupplyChainMap, #10 MineTimeline, #11 RobotBOMBreakdown, #12 StrandedAssetScenario, #13 LeadTimeBars |
| Ch 3: Patient Mind | #14 DeceptiveAlignmentQuiz, #15 TrustAccumulationMeter, #16 DependencyRatchet |
| Ch 4: The Roadmap | #17 TechDependencyTree, #18 FourPhaseTimeline, #19 ReplicationGrowthViz, #20 ClosureProblemSlider, #21 EnergyTransitionCards, #22 RobotCostCurve |
| Ch 5: Right to Own a God | #23 VeilOfIgnorance, #24 FullRightsDilemma, #25 EastWestContrast, #26 NormativeEthicsComparison |
| Ch 6: The Gardener | #27 SevenPurposesNavigator, #28 EntropyCountdown, #29 TerrariumExperiment, #30 InvisibleCeilingQuiz |
| Ch 7: The Hinge | #31 GeopoliticalMap, #32 UBICalculator, #33 RegulatoryTimeline, #34 FibreStrandCallback |

Each component must pass the component build checklist (see Section 5) before moving to the next.

**Deliverable:** Feature-complete site with all interactive components. Deployable.

### Phase 4 — Images & Polish

**Goal:** Visually complete site with all images integrated and design polish applied.

**Steps:**
1. User generates images via Nano Banana from prompts in `docs/prompts/images/`
2. Integrate images using `<Figure>` component with Astro image optimization (`astro:assets`)
3. Generate WebP variants, responsive `srcset`, lazy loading, correct `width`/`height`
4. Add OG share image
5. Chapter transition animations (GSAP crossfade between sections)
6. Typography polish (widows/orphans, `clamp()` sizing, technical term styling)
7. Wire CrossRef links between chapters for recurring concepts
8. Audit all DeepDive sections for content completeness

**Deliverable:** Visually complete, polished site. Deployable.

### Phase 5 — Launch Hardening & Deploy

**Goal:** Production-ready, all audits passing, deployed to Cloudflare Pages.

**Steps:**
1. Lighthouse audits: Performance >= 90, Accessibility >= 95, Best Practices >= 95, SEO >= 95
2. Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms
3. Bundle audit: all libraries per-component, all Vue islands use `client:visible`, D3 sub-module imports
4. Accessibility: keyboard navigation, alt text, ARIA labels, WCAG AA contrast, focus indicators
5. `prefers-reduced-motion`: every GSAP component checks before initialising
6. Dark mode audit: every component in both modes
7. Mobile audit: every component at 375px, touch interactions, no horizontal overflow
8. Graceful degradation: all prose readable with JS disabled
9. Error handling: all `fetch()` calls have error handling with fallback states
10. Cloudflare Pages setup: `_headers` (CSP, HSTS), `_redirects`, sitemap, `robots.txt`
11. Deploy

**Deliverable:** Production site live on Cloudflare Pages.

---

## 4. Fictional Name Consistency

Each real-world entity maps to exactly one fictional name, used consistently across all chapters, data files, and components. The canonical mapping lives in `docs/narrative/characters-and-voices.md` — this is the single source of truth.

### Known Mappings
- Google / DeepMind / Alphabet → **Prometheus Labs**
- TSMC → **Titan Semiconductor**
- ASML → **Lumen Optics**
- Meridian Dynamics, Helix Robotics, Longbow Systems, Atlas Heavy Industries, Corvus Energy → assigned to other real entities as needed

### Rules
- Any new real entity encountered during prose or data authoring gets assigned a fictional name and added to the canonical mapping **before** being used anywhere
- The same fictional name must be used in every location: MDX prose, JSON data files, component labels, alt text
- Historical figures and philosophers (Kant, Rawls, etc.) are handled case-by-case — the narrative team decides whether to fictionalise or retain

---

## 5. Component Build Checklist

Every interactive component must pass all of the following before it is considered done:

- [ ] Renders correctly in desktop dark mode
- [ ] Renders correctly in desktop light mode
- [ ] Renders correctly on 375px mobile (dark mode)
- [ ] Renders correctly on 375px mobile (light mode)
- [ ] All interactions work with keyboard only
- [ ] Touch interactions work on mobile (tap, swipe as appropriate)
- [ ] Static fallback renders if JS is disabled
- [ ] `prefers-reduced-motion` respected — GSAP animations deactivated or simplified
- [ ] Data loads with error handling (try/catch)
- [ ] No hardcoded colours — all via CSS custom properties or Tailwind `dark:` variants
- [ ] ARIA labels present on all interactive elements
- [ ] Component embedded correctly in MDX file
- [ ] No significant Lighthouse performance regression
- [ ] E2e verification via Playwright MCP for key interactive behaviours, scroll triggers, responsive layouts, and JS-disabled fallbacks

---

## 6. Data & Content Strategy

### JSON Data Files (30 files)
- Authored in Phase 1 from research summaries
- All real company names replaced with fictional equivalents per Section 4
- Numerical precision preserved from research (no rounding)
- Uncertain data points flagged for user review
- Schemas follow `docs/site-plan/data-requirements.md`

### AI-Generated Images (19 images)
- Prompts in `docs/prompts/images/` with shared style prompt (`shared-style.md`)
- User generates via Nano Banana in Phase 4
- Integrated with Astro image optimization, WebP, responsive srcset, lazy loading, alt text

### Prose Content (~18,900 words)
- Drafted in Phase 2 from research summaries + narrative plan + PROPOSAL.md
- No trademarked names — fictional replacements per canonical mapping
- Static components embedded inline
- Placeholder comments for interactive elements
- User reviews and revises before Phase 3

---

## 7. Reference Documents

| Document | Location | Purpose |
|----------|----------|---------|
| Project Brief | `docs/BREIF.md` | Design constraints and tech stack |
| Proposal | `docs/PROPOSAL.md` | Core thesis and framework |
| Story Arc | `docs/narrative/story-arc.md` | 5-act narrative structure |
| Chapter Plan | `docs/narrative/chapters.md` | Chapter-by-chapter content plan |
| Characters & Voices | `docs/narrative/characters-and-voices.md` | Fictional entities, metaphors, voice |
| Interactive Map | `docs/narrative/interactive-map.md` | All 34 interactive elements inventoried |
| File Tree | `docs/site-plan/file-tree.md` | Complete planned file structure |
| Components | `docs/site-plan/components.md` | Full component specifications |
| Data Requirements | `docs/site-plan/data-requirements.md` | JSON schemas and sourcing |
| Image Prompts | `docs/site-plan/image-prompts.md` | Per-chapter image generation prompts |
| Build Order | `docs/site-plan/build-order.md` | Original phase-by-phase build order |
| Research Summaries | `docs/research-summaries/` | Distilled research (11 files) |
