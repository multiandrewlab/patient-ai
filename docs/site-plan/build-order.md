# Build Order: The Patient Intelligence

Recommended sequence for building the site, ordered by dependency and deployability. Each phase produces something independently reviewable and deployable to Cloudflare Pages.

---

## Guiding Principles

1. **Narrative first.** Prose must be readable and compelling before any interaction is added. A reader on a text browser or with JS disabled should still experience the full story.
2. **Tier 1 components ship before Tier 2 and 3.** The ten load-bearing interactive moments (the ones that make narrative beats land) are built before enrichment components.
3. **Each phase is independently deployable.** At the end of every phase, `astro build` succeeds and the result is shippable.
4. **Libraries enter one at a time.** GSAP is introduced in Phase 3. D3 follows. Vue islands last (except where a Tier 1 component requires Vue earlier). This controls complexity growth.
5. **Data files are authored before their components are built.** No component should be built without its data already in `public/data/` and reviewed for accuracy and tone.

---

## Phase 1 — Foundation

**Goal:** A working Astro project that renders all chapters as readable prose with correct layout, navigation, typography, dark/light mode, and responsive behaviour. No interactive components.

**Definition of done:** All 8 chapters render correctly on mobile and desktop, in dark and light mode. The site is navigable. Reading time is correct. No broken links.

**Steps:**

1.1 Initialise Astro project with MDX, Vue, and Tailwind integrations
```
npm create astro@latest
npx astro add mdx vue tailwind
```

1.2 Configure `astro.config.mjs`:
- Set `output: 'static'`
- Configure MDX options (syntax highlighting, remark plugins if needed)
- Set `site:` for canonical URLs

1.3 Create `tailwind.config.ts`:
- Custom font families (Editorial New, Inter)
- Custom colour tokens for the site palette (using CSS custom properties as the source, Tailwind as the consumer)
- Dark mode: `class` strategy (for user-toggle + system preference)
- Typography plugin configuration for prose

1.4 Create `src/styles/global.css`:
- Tailwind directives
- `@layer base`: font-face declarations, CSS custom properties for colour tokens (light and dark variants), body and root defaults

1.5 Build `BaseLayout.astro`:
- HTML shell with correct `lang`, `meta charset`, `meta viewport`
- Dark mode class initialisation script (inline, blocking — prevents flash of wrong theme)
- Font preloads
- OpenGraph and Twitter card meta tags

1.6 Build `ChapterLayout.astro`:
- Prose container with correct max-width and typography
- Chapter header slot
- Navigation slot
- Reading progress slot
- Transition wrapper

1.7 Build `HomeLayout.astro`:
- Landing page layout

1.8 Build shared Astro UI components (static, no JS):
- `ChapterHeader.astro`
- `Callout.astro`
- `StatHighlight.astro`
- `Figure.astro`
- `DeepDive.astro`
- `CrossRef.astro`
- `FictionBadge.astro`
- `ThemeToggle.astro` (static render; JS added in next step)
- `ScrollProgress.astro` (static render)

1.9 Create `src/content/config.ts` with collection schema

1.10 Write all 8 MDX chapter files with:
- Correct frontmatter
- Full prose content
- `<Callout>`, `<StatHighlight>`, `<DeepDive>` components embedded
- Placeholder `{/* COMPONENT: ComponentName */}` comments where interactive components will go

1.11 Create `src/pages/index.astro` and `src/pages/[chapter].astro`

1.12 Author all 30 data files in `public/data/` (no components depend on them yet, but they should be reviewed before component build begins)

**Deliverable:** Fully readable, navigable, typographically correct site. Every chapter accessible. Dark mode works. Responsive. Zero interactive components. Deployable.

**Estimated effort:** 5-7 days

---

## Phase 2 — Vanilla JS and Theme

**Goal:** Add the remaining vanilla-JS behaviours: dark/light mode toggle with persistence, scroll progress bar, chapter navigation, and keyboard accessibility. These have no library dependencies.

**Steps:**

2.1 Wire `ThemeToggle.astro` with inline `<script>`:
- Read from `localStorage` on load
- Listen for system preference change
- Toggle `dark` class on `<html>`
- Persist choice to `localStorage`

2.2 Wire `ScrollProgress.astro` with `<script>`:
- `scroll` event listener updating a CSS custom property or width style
- `requestAnimationFrame` throttling

2.3 Wire `ChapterNav.astro`:
- Active chapter highlighting based on current URL
- Mobile hamburger with CSS-only or minimal JS drawer
- Keyboard navigation (arrow keys, escape)

2.4 Wire `DeepDive.astro`:
- Smooth height animation for expand/collapse
- ARIA attributes for accessibility

2.5 Add `src/pages/404.astro` with navigation back to index

2.6 Add `FullRightsDilemma.astro` (#24 — vanilla JS only component):
- 2×2 grid with hover/tap expand
- Load `public/data/dilemma-matrix.json` client-side
- No library dependency

**Deliverable:** All vanilla-JS site behaviours working. Theme toggle persists. Navigation is fully functional. Keyboard accessible. Deployable.

**Estimated effort:** 2-3 days

---

## Phase 3 — GSAP Scroll Animations (Tier 1 and Tier 2)

**Goal:** Add all GSAP + ScrollTrigger components, starting with Tier 1, then Tier 2. These are Astro components that import GSAP lazily within their `<script>` tags (not globally).

**GSAP import pattern for each component:**
```js
// Inside Astro <script> tag
const { gsap } = await import('gsap')
const { ScrollTrigger } = await import('gsap/ScrollTrigger')
gsap.registerPlugin(ScrollTrigger)
```

**Steps:**

3.1 Build `FibreStrandHero.astro` (#1, Tier 1):
- SVG strand geometry
- GSAP timeline bound to ScrollTrigger
- Mobile vertical variant
- Static SVG fallback via `<noscript>`

3.2 Build `TrustAccumulationMeter.astro` (#15, Tier 1):
- Dual progress bars with GSAP-driven fill
- Hidden second bar with reveal trigger
- Load `trust-milestones.json`

3.3 Build `DependencyRatchet.astro` (#16, Tier 2):
- SVG valve icons
- Scroll-direction-aware animations
- Load `ratchet-stages.json`

3.4 Build `FourPhaseTimeline.astro` (#18, Tier 1):
- D3 timeline scale and layout (D3 introduced here alongside GSAP)
- GSAP ScrollTrigger for milestone reveals
- Horizontal desktop / vertical mobile
- Load `timeline-phases.json`

3.5 Build `BrainVsSiliconScale.astro` (#4, Tier 1):
- GSAP zoom animation
- SVG or CSS illustrations
- Static comparison fallback

3.6 Build `EastWestContrast.astro` (#25, Tier 3):
- GSAP parallel column animations
- SVG connecting lines
- Load `cultural-contrast.json`

3.7 Build `NormativeEthicsComparison.astro` (#26, Tier 3):
- GSAP sequential reveal
- Verdict tally counter
- Load `ethics-frameworks.json`

3.8 Build `EnergyTransitionCards.astro` (#21, Tier 3):
- GSAP scroll-reveal card animations
- Load `energy-cards.json`

3.9 Build `EntropyCountdown.astro` (#28, Tier 3):
- GSAP logarithmic scale transitions
- Load `timescales.json`

3.10 Build `FibreStrandCallback.astro` (#34, Tier 1):
- Reuse FibreStrandHero assets with modified parameters
- Multiplied strand density, pulse animation

3.11 Build `RegulatoryTimeline.astro` (#33, Tier 3):
- GSAP + D3 combined
- Load `timeline-phases.json` (regulatory section)

**Deliverable:** All GSAP animations working. The opening (FibreStrandHero), the dual progress bars (TrustAccumulationMeter), the four-phase timeline, and the closing callback are all live. Deployable.

**Estimated effort:** 8-12 days

---

## Phase 4 — D3 Visualisations

**Goal:** Build all remaining D3 chart components (those that do not depend on Vue state management). D3 is imported per-component inside Astro `<script>` tags.

**D3 import pattern:**
```js
const d3 = await import('d3')
```

Import only the D3 sub-modules needed per component where possible (`d3-selection`, `d3-scale`, etc.) to keep bundle sizes minimal.

**Steps:**

4.1 Build `InfrastructureComparator.astro` (#3, Tier 1):
- D3 horizontal bar chart
- Scroll-triggered growth animation
- Load `infrastructure-comparison.json`

4.2 Build `DemandSurgeChart.astro` (#6, Tier 2):
- D3 bar chart with dynamic axis rescaling
- The axis-break animation beat
- Load `energy-data.json`

4.3 Build `JevonsParadoxChart.astro` (#7, Tier 3):
- D3 dual-axis line chart
- Load `energy-data.json`

4.4 Build `SupplyChainMap.astro` (#9, Tier 2):
- D3 network graph
- GSAP sequential reveal
- Load `supply-chain.json`

4.5 Build `MineTimeline.astro` (#10, Tier 2):
- D3 timeline with drag behaviour
- Slider fallback for mobile
- Load `mine-timeline.json`

4.6 Build `RobotBOMBreakdown.astro` (#11, Tier 3):
- SVG with vanilla JS hotspots (no D3 required for this one)
- Load `robot-bom.json`

4.7 Build `LeadTimeBars.astro` (#13, Tier 3):
- D3 horizontal bar chart
- Load `lead-times.json`

4.8 Build `RobotCostCurve.astro` (#22, Tier 3):
- D3 annotated line chart
- Load `robot-cost.json`

4.9 Build `ClosureProblemSlider.astro` (#20, Tier 3) — initial static version:
- D3 stacked bar
- GSAP scroll binding
- Load `closure-data.json`
- Note: Vue upgrade deferred to Phase 5 if callout interactivity is needed

**Deliverable:** All D3 charts rendering correctly. Chapter 1 and Chapter 2's data visualisations are complete. Deployable.

**Estimated effort:** 8-12 days

---

## Phase 5 — Vue Islands (Tier 1 first)

**Goal:** Build all Vue island components. Tier 1 Vue islands first (DeceptiveAlignmentQuiz, VeilOfIgnorance, ChipCalculator, SevenPurposesNavigator), then Tier 2 and Tier 3.

**Vue island pattern:**
```astro
<!-- In MDX file -->
import DeceptiveAlignmentQuiz from '../components/vue/chapter-03/DeceptiveAlignmentQuiz.vue'
<DeceptiveAlignmentQuiz client:visible />
```

All Vue islands use `client:visible` — they hydrate only when scrolled into view. This is mandatory for performance.

**Steps:**

5.1 Build `DeceptiveAlignmentQuiz.vue` (#14, Tier 1):
- Multi-card quiz with binary choice
- Running score and final reveal
- Load `alignment-scenarios.json`
- Card-swipe touch support for mobile

5.2 Build `VeilOfIgnorance.vue` (#23, Tier 1):
- Multi-step branching choice narrative
- Choice history tracking
- Outcome computation and reveal
- Load `veil-choices.json`

5.3 Build `ChipCalculator.vue` (#8, Tier 1):
- Three reactive sliders
- D3 deficit bar (D3 imported inside Vue component)
- Load `chip-calculator.json`

5.4 Build `SevenPurposesNavigator.vue` (#27, Tier 1):
- Seven expandable cards
- Survival/knowledge lens toggle
- Load `seven-purposes.json`

5.5 Build `WaterCostCalculator.vue` (#5, Tier 2):
- Input slider + reactive output
- SVG vessel illustrations
- Load `water-data.json`

5.6 Build `TechDependencyTree.vue` (#17, Tier 2):
- D3 force-directed graph inside Vue
- Selected node detail panel
- Pan/zoom
- Load `tech-tree.json`

5.7 Build `ReplicationGrowthViz.vue` (#19, Tier 2):
- D3 line chart inside Vue
- Two sliders driving computed chart data
- Load `replication-model.json`

5.8 Build `TerrariumExperiment.vue` (#29, Tier 2):
- Branching decision tree
- Navigation history and reset
- Load `terrarium-tree.json`

5.9 Build `GeopoliticalMap.vue` (#31, Tier 2):
- D3 geo inside Vue
- Region click handler and detail panels
- Timeline slider
- Load `geo-boundaries.json` + `world-regions.json`

5.10 Build `FibreScaleCounter.vue` (#2, Tier 3):
- Counter animation
- Sync with FibreStrandHero scroll position

5.11 Build `StrandedAssetScenario.vue` (#12, Tier 3):
- Multi-step state machine
- Random component selection
- Revenue ticker with GSAP
- Load `construction-stages.json`

5.12 Build `InvisibleCeilingQuiz.vue` (#30, Tier 3):
- Same pattern as DeceptiveAlignmentQuiz
- Load `ceiling-scenarios.json`

5.13 Build `UBICalculator.vue` (#32, Tier 3):
- Two sliders, viability indicator
- Load `ubi-model.json`

5.14 Upgrade `ClosureProblemSlider` to Vue if callout state management warrants it (assess during Phase 4)

**Deliverable:** All Vue islands functional. All Tier 1 interactive moments are live. The site is feature-complete. Deployable.

**Estimated effort:** 12-16 days

---

## Phase 6 — Images and Visual Polish

**Goal:** Integrate AI-generated images, add visual transitions between chapters, and ensure the full design is polished and consistent.

**Steps:**

6.1 Run image generation prompts from `docs/prompts/images/` and place outputs in `public/images/`

6.2 Integrate images into MDX files using `<Figure>` component:
- Correct `alt` text
- Responsive `srcset` for multiple sizes
- Lazy loading (`loading="lazy"`)

6.3 Optimise image delivery:
- Use Astro's built-in image optimisation (`<Image>` component from `@astrojs/image` or `astro:assets`)
- Generate WebP variants
- Set correct `width` and `height` to prevent layout shift

6.4 Add `og/og-default.jpg` and wire to BaseLayout meta tags

6.5 Add chapter transition animations:
- Crossfade or scroll-reveal transition between chapter sections
- GSAP (already loaded in Phase 3)

6.6 Add `ChapterTransition.astro` with subtle scroll-driven fade between sections

6.7 Typography polish:
- Check all chapter prose for widow/orphan issues
- Verify `clamp()` sizing at all viewport sizes
- Confirm code/technical-term styling is consistent

6.8 Audit all `DeepDive` sections for content completeness

6.9 Wire `CrossRef.astro` links between chapters for key recurring concepts:
- Dependency ratchet (Chapters 2, 3, 4)
- 17-year cycle (Chapters 2, 4)
- Jevons Paradox (Chapter 1 and referenced in later chapters)

**Deliverable:** Visually complete site with all images and full design polish. Deployable.

**Estimated effort:** 5-7 days

---

## Phase 7 — Performance, Accessibility, and Launch Hardening

**Goal:** Production-ready. All performance, accessibility, and SEO requirements met.

**Steps:**

7.1 Performance audit:
- Lighthouse score targets: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95
- Core Web Vitals: LCP < 2.5s, CLS < 0.1, FID/INP < 200ms
- Check bundle sizes for each chapter — no chapter should load a library it does not use

7.2 GSAP/D3/Vue bundle audit:
- Confirm all libraries are imported per-component, not globally
- Confirm all Vue islands use `client:visible`
- Confirm D3 sub-module imports (not full `d3` bundle) where possible

7.3 Accessibility audit:
- All interactive components keyboard navigable
- All images have correct `alt` text
- All form inputs (sliders, buttons) have accessible labels
- Colour contrast passes WCAG AA on both dark and light modes
- Focus indicators visible
- `prefers-reduced-motion` respected — GSAP animations deactivated or simplified

7.4 `prefers-reduced-motion` implementation:
```js
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
if (!prefersReducedMotion) {
  // initialise GSAP animations
}
```
Each GSAP component must check this before initialising.

7.5 Dark mode final audit:
- Every component reviewed in both modes
- No hardcoded colours that break in either mode

7.6 Mobile final audit:
- Every interactive component tested on a 375px viewport (iPhone SE)
- Touch interactions tested (drag, swipe, tap)
- No horizontal overflow
- No text too small to read

7.7 SEO and meta:
- Canonical URLs correct for all chapters
- `robots.txt` excluding `docs/` directory
- Sitemap generated

7.8 Cloudflare Pages configuration:
- `_headers` file for security headers (CSP, HSTS)
- `_redirects` for any URL normalisation
- Confirm build command (`astro build`) and output directory (`dist/`)

7.9 Graceful degradation test:
- Disable JavaScript and verify all prose is readable
- Confirm static fallbacks render for all components
- Verify no content is exclusively in a JS-rendered component

7.10 Error handling:
- All `fetch()` calls for JSON data files have error handling
- Failed data loads show a fallback state, not a broken component

**Deliverable:** Production-ready. All audits passing. Ready for Cloudflare Pages deployment.

**Estimated effort:** 4-6 days

---

## Summary Timeline

| Phase | Description | Key deliverables | Effort |
|-------|-------------|-----------------|--------|
| 1 | Foundation | All prose readable, layouts, dark mode, navigation | 5-7 days |
| 2 | Vanilla JS | Theme toggle, scroll progress, chapter nav | 2-3 days |
| 3 | GSAP animations | FibreStrandHero, TrustMeter, FourPhaseTimeline, callback | 8-12 days |
| 4 | D3 visualisations | All charts and data visualisations | 8-12 days |
| 5 | Vue islands | All interactive models, quizzes, calculators | 12-16 days |
| 6 | Images and polish | AI-generated images, transitions, typography | 5-7 days |
| 7 | Launch hardening | Performance, accessibility, SEO, Cloudflare config | 4-6 days |
| **Total** | | | **44-63 days** |

Tier 1 components (the ten load-bearing interactive moments) are all complete by the end of Phase 5. Phases 1-5 with Tier 1 only (skipping Tier 3 components in Phases 3-5) reduces to approximately 30-40 days for a launch-ready MVP.

---

## Dependency Map

```
Phase 1 (Foundation)
  └── Phase 2 (Vanilla JS)
        └── Phase 3 (GSAP)     — can overlap with Phase 4
              │
              └── Phase 4 (D3) — can overlap with Phase 5 (partial)
                    │
                    └── Phase 5 (Vue islands)
                          │
                          └── Phase 6 (Images and polish)
                                │
                                └── Phase 7 (Launch hardening)
```

Phases 3 and 4 can be parallelised by two developers (one building GSAP components, one building D3 components). Phase 5 Vue islands can begin on Tier 1 while Phases 3/4 Tier 3 components are still in progress.

---

## Data Authoring Priority

Data files should be authored in this order (matched to when their components are built):

**Before Phase 3:** `trust-milestones.json`, `timeline-phases.json`, `ratchet-stages.json`
**Before Phase 4:** `infrastructure-comparison.json`, `energy-data.json`, `supply-chain.json`, `mine-timeline.json`, `lead-times.json`, `robot-cost.json`, `closure-data.json`
**Before Phase 5 (Tier 1):** `alignment-scenarios.json`, `veil-choices.json`, `chip-calculator.json`, `seven-purposes.json`
**Before Phase 5 (Tier 2-3):** All remaining data files
**Before Phase 6:** All image prompts reviewed and generation run

---

## Component Build Checklist Template

For each component, before marking complete:

- [ ] Component renders correctly in desktop dark mode
- [ ] Component renders correctly in desktop light mode
- [ ] Component renders correctly on 375px mobile (dark mode)
- [ ] Component renders correctly on 375px mobile (light mode)
- [ ] All interactions work with keyboard only
- [ ] Touch interactions work on mobile (tap, swipe as appropriate)
- [ ] Static fallback renders if JS fails or is disabled
- [ ] `prefers-reduced-motion` respected
- [ ] Data loads with error handling (try/catch or `.catch()`)
- [ ] No hardcoded colours — all via CSS custom properties or Tailwind dark: variants
- [ ] ARIA labels present on all interactive elements
- [ ] Component imported and embedded correctly in MDX file
- [ ] Lighthouse performance score not significantly degraded by this component
