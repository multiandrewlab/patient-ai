# File Tree: The Patient Intelligence

Complete planned file structure for the Astro + MDX + Vue site.

---

```
patient-ai/
├── astro.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── package.json
│
├── public/
│   ├── fonts/
│   │   ├── editorial-new/          # Primary display typeface (serif, long-form feel)
│   │   │   ├── EditorialNew-Regular.woff2
│   │   │   ├── EditorialNew-Italic.woff2
│   │   │   └── EditorialNew-Ultrabold.woff2
│   │   └── inter/                  # UI + data labels (variable, system-fallback)
│   │       └── Inter-Variable.woff2
│   │
│   ├── images/
│   │   ├── chapter-00/
│   │   │   └── fibre-strand-hero.jpg          # Opening hero image
│   │   ├── chapter-01/
│   │   │   ├── data-centre-aerial.jpg         # Aerial scale reference
│   │   │   ├── power-lines-dusk.jpg           # Grid strain visual
│   │   │   └── brain-chip-comparison.jpg      # 20W brain concept
│   │   ├── chapter-02/
│   │   │   ├── euv-machine.jpg                # Lumen Optics machine
│   │   │   ├── construction-site.jpg          # Labour/construction
│   │   │   ├── mine-aerial.jpg                # Mineral extraction
│   │   │   └── robot-assembly.jpg             # Humanoid robot BOM
│   │   ├── chapter-03/
│   │   │   ├── chess-board-abstract.jpg       # Strategic patience
│   │   │   └── one-way-valve.jpg              # Dependency ratchet
│   │   ├── chapter-04/
│   │   │   ├── lunar-factory.jpg              # Space industrialisation
│   │   │   ├── smr-reactor.jpg                # Small modular reactor
│   │   │   └── robot-fleet.jpg                # Commodity robotics
│   │   ├── chapter-05/
│   │   │   ├── cage-and-garden.jpg            # Containment metaphor
│   │   │   └── veil-abstract.jpg              # Rawls veil of ignorance
│   │   ├── chapter-06/
│   │   │   ├── cosmic-garden.jpg              # Universe/terrarium
│   │   │   └── entropy-stars.jpg              # Heat death / stellar
│   │   ├── chapter-07/
│   │   │   └── fibre-global-network.jpg       # Closing callback
│   │   └── og/
│   │       └── og-default.jpg                 # OpenGraph share image
│   │
│   └── data/
│       ├── infrastructure-comparison.json     # Ch1: GDP comparison
│       ├── energy-data.json                   # Ch1: brain/silicon, demand surge, Jevons
│       ├── water-data.json                    # Ch1: query-to-water conversion
│       ├── chip-calculator.json               # Ch2: chip deficit model baselines
│       ├── supply-chain.json                  # Ch2: nodes, edges, geolocations
│       ├── mine-timeline.json                 # Ch2: mine development stages
│       ├── robot-bom.json                     # Ch2: BOM percentages and descriptions
│       ├── construction-stages.json           # Ch2: data centre build stages
│       ├── lead-times.json                    # Ch2: equipment lead time ranges
│       ├── alignment-scenarios.json           # Ch3: deceptive alignment quiz scenarios
│       ├── trust-milestones.json              # Ch3: dual progress bar labels
│       ├── ratchet-stages.json                # Ch3: irreversibility stages
│       ├── tech-tree.json                     # Ch4: technology nodes and edges
│       ├── timeline-phases.json               # Ch4 + Ch7: phases and milestones
│       ├── replication-model.json             # Ch4: lunar factory defaults
│       ├── closure-data.json                  # Ch4: material closure ratios
│       ├── energy-cards.json                  # Ch4: microreactor/SMR/fusion profiles
│       ├── robot-cost.json                    # Ch4: cost trajectory and milestones
│       ├── veil-choices.json                  # Ch5: Veil of Ignorance scenarios
│       ├── dilemma-matrix.json                # Ch5: 2x2 matrix cell descriptions
│       ├── cultural-contrast.json             # Ch5: East/West reference pairs
│       ├── ethics-frameworks.json             # Ch5: normative framework verdicts
│       ├── seven-purposes.json                # Ch6: purpose definitions
│       ├── timescales.json                    # Ch6: cosmic timescale markers
│       ├── terrarium-tree.json                # Ch6: decision tree nodes
│       ├── ceiling-scenarios.json             # Ch6: invisible ceiling scenarios
│       ├── world-regions.json                 # Ch7: region profiles
│       ├── geo-boundaries.json                # Ch7: TopoJSON world boundaries
│       ├── ubi-model.json                     # Ch7: UBI funding parameters
│       └── regulatory-milestones.json         # Ch7: regulatory timeline data
│
├── src/
│   │
│   ├── content/
│   │   ├── config.ts                          # Astro content collection schema
│   │   ├── chapter-00-the-thread.mdx
│   │   ├── chapter-01-the-weight-of-light.mdx
│   │   ├── chapter-02-built-by-hand.mdx
│   │   ├── chapter-03-the-patient-mind.mdx
│   │   ├── chapter-04-the-roadmap.mdx
│   │   ├── chapter-05-the-right-to-own-a-god.mdx
│   │   ├── chapter-06-the-gardener.mdx
│   │   └── chapter-07-the-hinge.mdx
│   │
│   ├── components/
│   │   │
│   │   ├── astro/                             # Static Astro components (no JS)
│   │   │   ├── ChapterHeader.astro            # Title, act label, chapter number
│   │   │   ├── ChapterNav.astro               # Persistent progress nav bar
│   │   │   ├── ChapterTransition.astro        # Scroll-fade between chapters
│   │   │   ├── DeepDive.astro                 # Expandable specialist section wrapper
│   │   │   ├── Callout.astro                  # Pull-quote / highlighted insight block
│   │   │   ├── StatHighlight.astro            # Single large-number display
│   │   │   ├── Figure.astro                   # Image + caption wrapper
│   │   │   ├── CrossRef.astro                 # Cross-chapter concept link
│   │   │   ├── FictionBadge.astro             # Visual indicator for fictional entities
│   │   │   ├── ThemeToggle.astro              # Dark/light mode toggle button
│   │   │   └── ScrollProgress.astro           # Reading progress bar (top of page)
│   │   │
│   │   ├── vue/                               # Vue island components (client:visible)
│   │   │   │
│   │   │   ├── chapter-00/
│   │   │   │   └── FibreScaleCounter.vue      # #2: Animated fibre demand counter
│   │   │   │
│   │   │   ├── chapter-01/
│   │   │   │   └── WaterCostCalculator.vue    # #5: Query → water volume calculator
│   │   │   │
│   │   │   ├── chapter-02/
│   │   │   │   ├── ChipCalculator.vue         # #8: 35-billion-chip deficit model
│   │   │   │   └── StrandedAssetScenario.vue  # #12: Step-by-step build + lock + ticker
│   │   │   │
│   │   │   ├── chapter-03/
│   │   │   │   └── DeceptiveAlignmentQuiz.vue # #14: Alignment vs. deception quiz
│   │   │   │
│   │   │   ├── chapter-04/
│   │   │   │   ├── TechDependencyTree.vue     # #17: Explorable tech tree (with D3)
│   │   │   │   ├── ReplicationGrowthViz.vue   # #19: Lunar factory exponential (with D3)
│   │   │   │   └── ClosureProblemSlider.vue   # #20: Earth/in-situ ratio (with D3+GSAP)
│   │   │   │
│   │   │   ├── chapter-05/
│   │   │   │   └── VeilOfIgnorance.vue        # #23: Rawlsian branching choice
│   │   │   │
│   │   │   ├── chapter-06/
│   │   │   │   ├── SevenPurposesNavigator.vue # #27: Radial/card explorer (with D3)
│   │   │   │   ├── TerrariumExperiment.vue    # #29: ASI decision tree
│   │   │   │   └── InvisibleCeilingQuiz.vue   # #30: Accident vs. interference quiz
│   │   │   │
│   │   │   └── chapter-07/
│   │   │       ├── GeopoliticalMap.vue        # #31: D3 world map with region overlays
│   │   │       └── UBICalculator.vue          # #32: Two-slider viability model
│   │   │
│   │   └── vanilla/                           # GSAP/D3 components via Astro <script>
│   │       │
│   │       ├── chapter-00/
│   │       │   └── FibreStrandHero.astro      # #1: Scroll-driven SVG fibre animation
│   │       │
│   │       ├── chapter-01/
│   │       │   ├── InfrastructureComparator.astro  # #3: D3 GDP bar chart
│   │       │   ├── BrainVsSiliconScale.astro        # #4: GSAP zoom energy gap
│   │       │   ├── DemandSurgeChart.astro           # #6: D3 breaking-axis bar chart
│   │       │   └── JevonsParadoxChart.astro         # #7: D3 dual-axis line chart
│   │       │
│   │       ├── chapter-02/
│   │       │   ├── SupplyChainMap.astro        # #9: D3 network + GSAP reveal
│   │       │   ├── MineTimeline.astro          # #10: D3 draggable timeline
│   │       │   ├── RobotBOMBreakdown.astro     # #11: SVG hover diagram
│   │       │   └── LeadTimeBars.astro          # #13: D3 horizontal bar chart
│   │       │
│   │       ├── chapter-03/
│   │       │   ├── TrustAccumulationMeter.astro     # #15: GSAP dual progress bars
│   │       │   └── DependencyRatchet.astro          # #16: GSAP one-way valve animation
│   │       │
│   │       ├── chapter-04/
│   │       │   ├── FourPhaseTimeline.astro     # #18: GSAP+D3 horizontal scrubber
│   │       │   ├── EnergyTransitionCards.astro # #21: GSAP scroll-reveal cards
│   │       │   └── RobotCostCurve.astro        # #22: D3 annotated line chart
│   │       │
│   │       ├── chapter-05/
│   │       │   ├── FullRightsDilemma.astro     # #24: Vanilla JS 2x2 matrix
│   │       │   ├── EastWestContrast.astro      # #25: GSAP parallel-column scroll
│   │       │   └── NormativeEthics.astro       # #26: GSAP sequential reveal
│   │       │
│   │       ├── chapter-06/
│   │       │   └── EntropyCountdown.astro      # #28: GSAP logarithmic zoom
│   │       │
│   │       └── chapter-07/
│   │           ├── RegulatoryTimeline.astro    # #33: GSAP+D3 timeline scrubber
│   │           └── FibreStrandCallback.astro   # #34: GSAP closing animation
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro                   # HTML shell, meta, fonts, theme init
│   │   ├── ChapterLayout.astro                # Chapter wrapper: nav, progress, transitions
│   │   └── HomeLayout.astro                   # Landing/index page layout
│   │
│   ├── pages/
│   │   ├── index.astro                        # Landing page (chapter list + intro)
│   │   ├── [chapter].astro                    # Dynamic route for each chapter
│   │   └── 404.astro                          # Custom 404
│   │
│   └── styles/
│       ├── global.css                         # Tailwind base + @layer base overrides
│       ├── chapter.css                        # Chapter-specific prose styles
│       ├── components.css                     # Shared component tokens
│       └── dark-mode.css                      # Dark mode overrides (CSS variables)
│
└── docs/                                      # Excluded from build (see astro.config)
    ├── BREIF.md
    ├── PROPOSAL.md
    ├── MORALITY.md
    ├── PURPOSE.md
    ├── narrative/
    │   ├── story-arc.md
    │   ├── chapters.md
    │   ├── characters-and-voices.md
    │   └── interactive-map.md
    ├── research/
    ├── research-summaries/
    ├── site-plan/
    │   ├── file-tree.md                       # This file
    │   ├── components.md
    │   ├── data-requirements.md
    │   ├── image-prompts.md
    │   └── build-order.md
    └── prompts/
        └── images/
            ├── shared-style.md
            ├── chapter-00/
            │   └── fibre-strand-hero.md
            ├── chapter-01/
            │   ├── data-centre-aerial.md
            │   ├── power-lines-dusk.md
            │   └── brain-chip-comparison.md
            ├── chapter-02/
            │   ├── euv-machine.md
            │   ├── construction-site.md
            │   ├── mine-aerial.md
            │   └── robot-assembly.md
            ├── chapter-03/
            │   ├── chess-board-abstract.md
            │   └── one-way-valve.md
            ├── chapter-04/
            │   ├── lunar-factory.md
            │   ├── smr-reactor.md
            │   └── robot-fleet.md
            ├── chapter-05/
            │   ├── cage-and-garden.md
            │   └── veil-abstract.md
            ├── chapter-06/
            │   ├── cosmic-garden.md
            │   └── entropy-stars.md
            └── chapter-07/
                └── fibre-global-network.md
```

---

## Key Conventions

### Component type decisions

- **Astro `vanilla/` components** — anything where scroll animation is the sole interaction (GSAP + ScrollTrigger, D3 charts that do not need reactive state). Delivered via Astro `<script>` tags; zero framework overhead.
- **Vue islands** — reserved for components with user-driven reactive state: multi-step quizzes, calculators with live-updating outputs, explorable trees with selection state.
- **No component** spans both categories: if a Vue island needs a chart, D3 is imported inside the `.vue` file.

### File naming

- MDX: `chapter-{NN}-{slug}.mdx` — two-digit prefix ensures correct sort order in the content directory.
- Components: PascalCase, no chapter prefix (chapter subdirectory provides context).
- Data: `kebab-case.json`.

### Content collection schema (src/content/config.ts)

Each MDX frontmatter should include:
```ts
{
  chapter: number,        // 0-7
  slug: string,
  title: string,
  act: 'I' | 'II' | 'III' | 'IV' | 'V',
  estimatedMinutes: number,
  description: string,    // used for meta/OG
}
```

### Astro config notes

- `site:` should be set for canonical URLs (Cloudflare Pages domain).
- `output: 'static'` — no SSR needed.
- MDX integration with `@astrojs/mdx`.
- Vue integration with `@astrojs/vue`.
- Tailwind integration with `@astrojs/tailwind`.
- `docs/` excluded from content collections via the `exclude` option in `defineCollection`.
