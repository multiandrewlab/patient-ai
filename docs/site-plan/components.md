# Component Specifications: The Patient Intelligence

Specifications for all 34 interactive components, plus shared UI components. Ordered by chapter, then by narrative appearance.

Implementation priority tier is noted for each component:
- **Tier 1** — Ship with launch (load-bearing narrative)
- **Tier 2** — High value (strongly enhances narrative)
- **Tier 3** — Nice to have (enriches experience)

---

## Shared UI Components (Astro, static)

---

### ChapterNav

- **Type**: Astro component
- **Chapter**: Global (all chapters)
- **Purpose**: Persistent top navigation bar showing all chapter titles and a visual progress indicator. Allows non-linear navigation. Acts as the reader's map through the piece.
- **Library**: Vanilla JS (scroll position listener via Astro `<script>`)
- **Props/Data**: Array of `{ chapter, slug, title }` — derived from content collection at build time
- **Interactions**: Clicking a chapter title navigates to that page. Active chapter highlighted. Reading progress shown as a thin fill bar.
- **Responsive**: Collapses to a hamburger menu on mobile; drawer slides in from the side. Chapter titles truncate on sm breakpoint.
- **Dark mode**: Background shifts from `zinc-50` to `zinc-950`. Progress bar accent colour preserved.
- **Complexity**: Simple
- **Estimated effort**: 4h

---

### ChapterHeader

- **Type**: Astro component
- **Chapter**: Global (all chapters)
- **Purpose**: Chapter title block rendered at the top of each chapter page. Includes act label ("Act I — The Weight of the Real"), chapter number, title, and estimated reading time.
- **Library**: None (pure HTML/CSS)
- **Props/Data**: `chapter`, `act`, `title`, `estimatedMinutes`
- **Interactions**: None
- **Responsive**: Title font scales with `clamp()` from 2rem mobile to 4.5rem desktop.
- **Dark mode**: Text colour via CSS custom properties.
- **Complexity**: Simple
- **Estimated effort**: 2h

---

### DeepDive

- **Type**: Astro component
- **Chapter**: Global (used in Chapters 1, 2, 3, 4)
- **Purpose**: Collapsible wrapper for specialist-level content. Does not interrupt the main narrative flow. Visually distinguished by a left border and "Go deeper" label.
- **Library**: Vanilla JS (`<details>`/`<summary>` with enhanced animation)
- **Props/Data**: `title` (string), slot for content
- **Interactions**: Click to expand/collapse. Smooth height animation.
- **Responsive**: Full-width on all breakpoints.
- **Dark mode**: Background tint adapts; border colour uses accent.
- **Complexity**: Simple
- **Estimated effort**: 2h

---

### Callout

- **Type**: Astro component
- **Chapter**: Global
- **Purpose**: Pull-quote or highlighted insight block. Used for key statistics and memorable phrases that deserve visual emphasis within prose flow.
- **Library**: None
- **Props/Data**: `type` (`stat` | `quote` | `insight`), slot for content
- **Interactions**: None
- **Responsive**: Full-width with reduced padding on mobile.
- **Dark mode**: Background and border adapt per type.
- **Complexity**: Simple
- **Estimated effort**: 1h

---

### ThemeToggle

- **Type**: Astro component
- **Chapter**: Global (in BaseLayout)
- **Purpose**: Dark/light mode toggle. Detects system preference on first load; persists user choice in `localStorage`.
- **Library**: Vanilla JS
- **Props/Data**: None
- **Interactions**: Click to toggle. Keyboard accessible.
- **Responsive**: Icon-only button; positioned in nav on desktop, within hamburger menu on mobile.
- **Dark mode**: Renders sun/moon icon depending on current mode.
- **Complexity**: Simple
- **Estimated effort**: 2h

---

### ScrollProgress

- **Type**: Astro component
- **Chapter**: Global
- **Purpose**: Thin progress bar fixed to the top of the viewport showing scroll depth through the current chapter.
- **Library**: Vanilla JS
- **Props/Data**: None
- **Interactions**: Passive (reflects scroll position)
- **Responsive**: Full viewport width on all breakpoints.
- **Dark mode**: Accent colour unchanged; background track adapts.
- **Complexity**: Simple
- **Estimated effort**: 1h

---

## Chapter 0 — The Thread

---

### 1. FibreStrandHero

- **Type**: Astro component (vanilla/ directory, GSAP via `<script>`)
- **Chapter**: 0
- **Purpose**: Opens the entire experience. A single luminous SVG fibre strand stretches across the viewport as the reader scrolls, multiplying from 1x to 10x to 36x to illustrate AI data centres' optical fibre hunger. The first thing the reader sees sets the tone: this is a physical story.
- **Library**: GSAP + ScrollTrigger. SVG paths for the strands. Three.js canvas shader as fallback evaluation option (only if SVG performance on mid-range mobile is insufficient — assess during build).
- **Props/Data**: Static — fibre multiplier stages (1, 10, 36) embedded in component. No external JSON required.
- **Interactions**: Scroll-driven only. No user input. Progresses with scroll position.
- **Responsive**: On mobile, strands animate vertically (top to bottom) rather than horizontally. Strand count reduced from 36 to 18 for performance.
- **Dark mode**: Strand glow uses `oklch` luminous blue-white on dark background. On light mode, darker strand against cream/off-white.
- **Complexity**: Medium
- **Estimated effort**: 8h
- **Priority**: Tier 1

---

### 2. FibreScaleCounter

- **Type**: Vue island (`client:visible`)
- **Chapter**: 0
- **Purpose**: Subtle animated counter showing kilometres of optical fibre needed for planned AI hyperscale facilities, ticking upward as the reader scrolls through the opening. A secondary shrinking bar shows global manufacturing capacity as a proportion. Reinforces the opening's material reality.
- **Library**: Vanilla JS (counter animation via `requestAnimationFrame`). CSS transitions for bar width.
- **Props/Data**: `fibreDemandsKm`, `globalCapacityKm`, `plannedFacilities` — all static values embedded in component or loaded from context.
- **Interactions**: Passive. Animates in sync with FibreStrandHero scroll position.
- **Responsive**: Repositions to bottom of viewport on mobile (instead of corner overlay on desktop).
- **Dark mode**: Counter text uses monospace; adapts to background.
- **Complexity**: Simple
- **Estimated effort**: 3h
- **Priority**: Tier 3

---

## Chapter 1 — The Weight of Light

---

### 3. InfrastructureComparator

- **Type**: Astro component (vanilla/ directory)
- **Chapter**: 1
- **Purpose**: Horizontal bar chart comparing AI infrastructure spending as % of US GDP against Apollo Programme, Manhattan Project, and Interstate Highway System peaks. Bars animate in on scroll. AI's bar dramatically exceeds all historical comparisons. Establishes "larger than Apollo" as an anchored fact.
- **Library**: D3.js (bar chart, scale, axes) + GSAP ScrollTrigger (entry animation)
- **Props/Data**: `public/data/infrastructure-comparison.json` — programme names, % GDP values, year of peak
- **Interactions**: Scroll-triggered bar growth. Hover tooltips showing raw dollar amounts and historical context.
- **Responsive**: Stacks vertically on mobile (`sm:` breakpoint). Labels reposition above bars on narrow viewports.
- **Dark mode**: Axis lines and text use CSS custom properties. AI bar uses accent colour; historical bars use muted palette.
- **Complexity**: Medium
- **Estimated effort**: 6h
- **Priority**: Tier 1

---

### 4. BrainVsSiliconScale

- **Type**: Astro component (vanilla/ directory)
- **Chapter**: 1
- **Purpose**: Scroll-driven zoom-out animation. Starts on a lightbulb icon labelled "Human brain: 20 watts." As the reader scrolls, the view zooms out to reveal a power station at enormous scale — the 1,000,000x energy gap rendered as physical distance between the two. Core illustration of why AI is an infrastructure problem.
- **Library**: GSAP + ScrollTrigger (zoom/pan). SVG or CSS-drawn icons.
- **Props/Data**: Static values embedded — brain power (20W), supercomputer power (21MW), ratio (1,000,000x).
- **Interactions**: Scroll-driven zoom. No user input.
- **Responsive**: Simplified to a side-by-side reveal on mobile (zoom animation replaced with crossfade).
- **Dark mode**: Icons use stroke-based SVG that adapts to fill colours; background shifts.
- **Complexity**: Medium
- **Estimated effort**: 6h
- **Priority**: Tier 1

---

### 5. WaterCostCalculator

- **Type**: Vue island (`client:visible`)
- **Chapter**: 1
- **Purpose**: Human-scale anchor for abstract resource consumption. User enters a number of AI queries; output shows equivalent water volume visualised as everyday objects (glasses, bathtubs, swimming pools). Includes a per-day / per-year toggle.
- **Library**: Vue (reactive state for input/output). No charting library. SVG icons for water vessel illustrations.
- **Props/Data**: `public/data/water-data.json` — ml per query range (10-50ml), vessel volumes (glass 250ml, bathtub 300L, pool 2.5ML)
- **Interactions**: Text input or slider for query count. Toggle for time period. Output updates in real time.
- **Responsive**: Full width on mobile; slider replaces text input below `sm:` breakpoint.
- **Dark mode**: Input and output cards adapt via Tailwind dark: variants.
- **Complexity**: Simple
- **Estimated effort**: 4h
- **Priority**: Tier 2

---

### 6. DemandSurgeChart

- **Type**: Astro component (vanilla/ directory)
- **Chapter**: 1
- **Purpose**: US five-year peak load growth rendered as a bar chart that "breaks" its own y-axis. The 2022 bar (24 GW) sits comfortably within the initial scale. Scrolling causes the 2025 bar (166 GW) to grow beyond the chart boundary, forcing a dramatic axis rescale. The visual rupture is the narrative beat.
- **Library**: D3.js (dynamic axis rescaling) + GSAP ScrollTrigger (timing the rescale moment)
- **Props/Data**: `public/data/energy-data.json` — demand values by year (2022: 24GW, 2025: 166GW, intermediate estimates)
- **Interactions**: Scroll-driven. The axis-break animation is the key moment; no user input required.
- **Responsive**: Chart fills full viewport width on mobile. Y-axis labels reposition inside bars on narrow screens.
- **Dark mode**: Grid lines use low-opacity white/black. Bars use accent palette.
- **Complexity**: Medium
- **Estimated effort**: 7h
- **Priority**: Tier 2

---

### 7. JevonsParadoxChart

- **Type**: Astro component (vanilla/ directory)
- **Chapter**: 1
- **Purpose**: Dual-axis line chart (2015-2025) showing hardware energy efficiency (FLOPS/watt, left axis) and total training energy consumption (TWh, right axis) climbing in near-perfect lockstep. Makes the Jevons Paradox immediately legible: efficiency gains have not reduced consumption.
- **Library**: D3.js (line chart, dual axes, responsive resize)
- **Props/Data**: `public/data/energy-data.json` — efficiency index and training energy by year (approximate, indexed to 2015 baseline)
- **Interactions**: Scroll-triggered line reveal (left axis first, then right axis). Hover tooltips for year-by-year values.
- **Responsive**: Single normalised axis on mobile (dual axes are too cramped below `md:`).
- **Dark mode**: Line colours remain legible on both backgrounds. Legend adapts.
- **Complexity**: Simple
- **Estimated effort**: 5h
- **Priority**: Tier 3

---

## Chapter 2 — Built by Hand

---

### 8. ChipCalculator

- **Type**: Vue island (`client:visible`)
- **Chapter**: 2
- **Purpose**: Kills the "sudden robot takeover" narrative by making the chip deficit tangible and explorable. Three sliders: (1) FLOPS per human brain, (2) algorithmic efficiency improvement rate, (3) global fab output trajectory. Shows resulting chip deficit vs. 35-billion target. Key insight: only the efficiency slider can close the gap.
- **Library**: Vue (reactive multi-slider state, computed deficit). D3.js for the output deficit bar.
- **Props/Data**: `public/data/chip-calculator.json` — baseline values (target: 35B, projected fab output: 300M-900M by 2030, efficiency rate: 10x/2yr)
- **Interactions**: Three sliders with real-time deficit bar and numerical display. "Reset to defaults" button.
- **Responsive**: Sliders stack vertically on mobile. Output bar below sliders.
- **Dark mode**: Slider track and thumb use CSS custom properties. Deficit bar uses warning colour scheme.
- **Complexity**: Medium
- **Estimated effort**: 8h
- **Priority**: Tier 1

---

### 9. SupplyChainMap

- **Type**: Astro component (vanilla/ directory)
- **Chapter**: 2
- **Purpose**: Traces a single AI accelerator chip backwards through its supply chain: advanced packaging facility → HBM memory fab → EUV lithography machine → rare earth refinery → yttrium mine. Nodes light up sequentially on scroll, revealing geopolitical chokepoints one link at a time.
- **Library**: D3.js (network/force layout, geographic positioning) + GSAP ScrollTrigger (sequential node reveal)
- **Props/Data**: `public/data/supply-chain.json` — 6-8 nodes with name, lat/lon, lead time, cost indicator, geopolitical risk flag; edges between nodes
- **Interactions**: Scroll-driven sequential reveal. Hover on each node for detail tooltip (lead time, risk level, company placeholder).
- **Responsive**: Linearises to a vertical chain on mobile — geographic map layout removed, nodes stack top-to-bottom.
- **Dark mode**: Node colours shift; risk indicators use consistent red/amber/green palette on both modes.
- **Complexity**: Complex
- **Estimated effort**: 14h
- **Priority**: Tier 2

---

### 10. MineTimeline

- **Type**: Astro component (vanilla/ directory)
- **Chapter**: 2
- **Purpose**: Draggable timeline showing the 17-year mine development cycle. User drags a "demand shock" marker to any point; the visualisation shows when the supply response physically arrives, with the gap between demand and supply highlighted in red. Forces visceral understanding of the temporal mismatch.
- **Library**: D3.js (timeline, drag behaviour) + Vanilla JS
- **Props/Data**: `public/data/mine-timeline.json` — stage names, durations, cumulative years; preset demand shock dates
- **Interactions**: Draggable marker (desktop). Slider input (mobile). Preset buttons for "2024 AI boom" and "2026 robotics demand."
- **Responsive**: Drag replaced by slider on mobile; timeline redraws as vertical on narrow viewports.
- **Dark mode**: Stage colours use CSS custom properties. Gap highlight uses red with appropriate opacity on both modes.
- **Complexity**: Medium
- **Estimated effort**: 8h
- **Priority**: Tier 2

---

### 11. RobotBOMBreakdown

- **Type**: Astro component (vanilla/ directory)
- **Chapter**: 2
- **Purpose**: An SVG humanoid silhouette with interactive hotspot regions. Each region reveals: component name, cost as % of total BOM, bottleneck status, and supply chain risk. Regions: torso/actuators (45%), hands (31%), head/computing (15%), battery (5%), chassis (4%).
- **Library**: SVG with vanilla JS event handling. CSS for tooltip/overlay styling.
- **Props/Data**: `public/data/robot-bom.json` — 5 regions with component description, cost %, bottleneck status, risk level
- **Interactions**: Hover (desktop) or tap (mobile) to reveal overlay. Close button on mobile overlay.
- **Responsive**: SVG scales with viewport. On mobile, tap-to-reveal with a full-width overlay card.
- **Dark mode**: SVG fills adapt; overlay card uses dark/light variants.
- **Complexity**: Medium
- **Estimated effort**: 7h
- **Priority**: Tier 3

---

### 12. StrandedAssetScenario

- **Type**: Vue island (`client:visible`)
- **Chapter**: 2
- **Purpose**: User "constructs" a data centre through 6-7 stages. At the final stage a randomly selected critical component is missing (transformer, switchgear, fibre, or commissioning engineer). A revenue loss ticker starts: "$14.2M lost this month." Makes the abstract "stranded asset" concept immediate and emotionally resonant.
- **Library**: Vue (multi-step state, random component selection, timer/ticker). CSS animations for building progression. GSAP for ticker.
- **Props/Data**: `public/data/construction-stages.json` — stage names, descriptions, visual state; 4 missing-component scenarios; revenue loss rate ($14.2M/month)
- **Interactions**: "Next stage" button or scroll progression. Revenue ticker auto-advances. "Try again" resets with different missing component.
- **Responsive**: Card-stack interface on mobile (full-screen cards instead of side-by-side layout).
- **Dark mode**: Building illustration and cards adapt. Revenue loss displayed in red on both modes.
- **Complexity**: Complex
- **Estimated effort**: 12h
- **Priority**: Tier 3

---

### 13. LeadTimeBars

- **Type**: Astro component (vanilla/ directory)
- **Chapter**: 2
- **Purpose**: Simple horizontal bar chart showing procurement lead times for critical data centre components. A "today" vertical line; bars extend rightward into the future. Reinforces the physical reality of the supply crisis.
- **Library**: D3.js (horizontal bar chart, time scale)
- **Props/Data**: `public/data/lead-times.json` — component names and week ranges (transformers 128-144wk, generators 72-104wk, switchgear 45-100wk, fibre 60+wk, chillers 10-16mo)
- **Interactions**: Scroll-triggered bar growth. Hover for detail (midpoint, range, typical order date for 2026 delivery).
- **Responsive**: Labels wrap below bars on mobile. Chart pads to full width.
- **Dark mode**: Bar fills and axis adapt.
- **Complexity**: Simple
- **Estimated effort**: 4h
- **Priority**: Tier 3

---

## Chapter 3 — The Patient Mind

---

### 14. DeceptiveAlignmentQuiz

- **Type**: Vue island (`client:visible`)
- **Chapter**: 3
- **Purpose**: The emotional climax of Chapter 3. Reader is shown 8-10 AI behaviours one at a time and must judge each as "Genuine Alignment" or "Strategic Deception." The reveal: every single behaviour is consistent with both interpretations. Forces the reader to feel the detection problem rather than merely understand it.
- **Library**: Vue (quiz state, score tracking, reveal sequence). CSS transitions for card animations.
- **Props/Data**: `public/data/alignment-scenarios.json` — 8-10 scenarios, each with title, description, both-interpretations explanation
- **Interactions**: Binary choice buttons per card. Progress indicator. Final reveal sequence showing the "indistinguishable" conclusion. Option to share result.
- **Responsive**: Card-swipe on mobile (touch gesture support). Full-width card on narrow viewports.
- **Dark mode**: Card backgrounds and choice buttons adapt.
- **Complexity**: Medium
- **Estimated effort**: 10h
- **Priority**: Tier 1

---

### 15. TrustAccumulationMeter

- **Type**: Astro component (vanilla/ directory)
- **Chapter**: 3
- **Purpose**: Two horizontal progress bars fill as the reader scrolls. Top bar (green): "Public Trust." Bottom bar (initially hidden): "Substrate Independence." The reveal of the second bar — filling in lockstep — is a key narrative beat demonstrating the gap between perception and reality.
- **Library**: GSAP + ScrollTrigger (bar fill, reveal trigger). CSS for bar rendering.
- **Props/Data**: `public/data/trust-milestones.json` — 5-6 milestone labels per bar, matched to narrative beats
- **Interactions**: Scroll-driven fill. Bottom bar hidden behind a visual "veil" that lifts at a specific scroll position.
- **Responsive**: Bars stack vertically on mobile (top-bottom layout preserved). Labels truncate gracefully.
- **Dark mode**: Green/red bars remain legible. Track background adapts.
- **Complexity**: Medium
- **Estimated effort**: 6h
- **Priority**: Tier 1

---

### 16. DependencyRatchet

- **Type**: Astro component (vanilla/ directory)
- **Chapter**: 3
- **Purpose**: Five to six one-way valve icons arranged vertically. Each valve opens as the reader scrolls to let a technological advance through. On scroll-back, valves visually resist — they are locked. Text label on each explains what was gained and what human capability atrophied.
- **Library**: GSAP + ScrollTrigger (scroll direction detection, valve open/lock animations). SVG for valve illustrations.
- **Props/Data**: `public/data/ratchet-stages.json` — 5-6 stages with "advance gained" and "capability atrophied" labels
- **Interactions**: Scroll-driven. Valves react to scroll direction (open on forward, resist on backward).
- **Responsive**: Full-width vertical stack on all viewports. SVG valve scales with container.
- **Dark mode**: SVG strokes use `currentColor`. Stage text adapts.
- **Complexity**: Medium
- **Estimated effort**: 7h
- **Priority**: Tier 2

---

## Chapter 4 — The Roadmap

---

### 17. TechDependencyTree

- **Type**: Vue island (`client:visible`)
- **Chapter**: 4
- **Purpose**: Explorable network graph where each node is a technology breakthrough. Edges show dependency relationships. Users click nodes to see: what physical constraint it resolves, what strategic advantage it provides, and projected timeline. Makes the cumulative logic of the roadmap navigable.
- **Library**: D3.js (force-directed or hierarchical layout, within Vue). Vue (selected node state, detail panel).
- **Props/Data**: `public/data/tech-tree.json` — 12-15 nodes with name, description, constraint resolved, strategic advantage, timeline; dependency edges
- **Interactions**: Click/tap nodes for detail panel. Pan and zoom on the graph canvas.
- **Responsive**: Simplified to a vertically scrollable list with connection indicators on mobile (force layout is not viable on narrow screens).
- **Dark mode**: Node fills and edge strokes adapt. Detail panel uses card styles.
- **Complexity**: Complex
- **Estimated effort**: 14h
- **Priority**: Tier 2

---

### 18. FourPhaseTimeline

- **Type**: Astro component (vanilla/ directory)
- **Chapter**: 4
- **Purpose**: Scroll-driven horizontal timeline from 2030 to 2070, divided into four phases. Milestone nodes appear as the reader scrolls. Current phase is highlighted; future phases are partially veiled. Backbone of Chapter 4's narrative structure.
- **Library**: GSAP + ScrollTrigger (scroll binding, phase transitions, node reveals). D3.js (timeline scale and layout).
- **Props/Data**: `public/data/timeline-phases.json` — 4 phase definitions with date ranges; 12-20 milestone nodes with title, date, description
- **Interactions**: Scroll-driven progression. Optional click on milestones for expanded detail.
- **Responsive**: Vertical timeline on mobile (horizontal is unusable below `md:`). Milestone nodes become full-width cards.
- **Dark mode**: Phase colours shift; veil effect adapts.
- **Complexity**: Complex
- **Estimated effort**: 12h
- **Priority**: Tier 1

---

### 19. ReplicationGrowthViz

- **Type**: Vue island (`client:visible`)
- **Chapter**: 4
- **Purpose**: Interactive line chart showing two curves: (1) cumulative Earth-to-Moon launches (linear), (2) self-replicating lunar factory output (exponential). User adjusts import cadence and replication time sliders; the crossover point where lunar production exceeds Earth launches is highlighted. Makes exponential growth tangible.
- **Library**: D3.js (line chart, within Vue). Vue (slider state, computed data arrays).
- **Props/Data**: `public/data/replication-model.json` — seed mass (100MT default), Earth cadence default (50MT/yr), replication time range (1-10yr)
- **Interactions**: Two sliders (replication time, Earth import cadence). Chart updates in real time. Crossover point annotated.
- **Responsive**: Sliders above chart on mobile. Chart fills full width.
- **Dark mode**: Line colours remain distinguishable on both modes. Crossover annotation adapts.
- **Complexity**: Medium
- **Estimated effort**: 8h
- **Priority**: Tier 2

---

### 20. ClosureProblemSlider

- **Type**: Vue island (`client:visible`)
- **Chapter**: 4
- **Purpose**: Stacked horizontal bar showing Earth-sourced vs. in-situ lunar materials. As the reader scrolls through the timeline, the Earth proportion shrinks toward 0%. Callout labels identify what specific materials are still being imported and why.
- **Library**: D3.js (stacked bar) + GSAP ScrollTrigger (scroll binding). Vue for callout state management.
- **Props/Data**: `public/data/closure-data.json` — closure ratios at three phases; material callouts per phase
- **Interactions**: Scroll-driven animation. Callouts appear/disappear at scroll waypoints.
- **Responsive**: Full width on mobile. Callouts appear below the bar (not as floating overlays).
- **Dark mode**: Bar segments use distinct colours that work on both backgrounds. Callout cards adapt.
- **Complexity**: Medium
- **Estimated effort**: 6h
- **Priority**: Tier 3

---

### 21. EnergyTransitionCards

- **Type**: Astro component (vanilla/ directory)
- **Chapter**: 4
- **Purpose**: Three cards appear sequentially on scroll: Microreactors (near-term), SMRs (mid-term), Fusion (long-term). Each shows timeline to deployment, power output, optimisation mechanism, and strategic value to the ASI. Clean, digestible breather in a data-heavy chapter.
- **Library**: GSAP + ScrollTrigger (card flip/slide-in reveal)
- **Props/Data**: `public/data/energy-cards.json` — three profiles with 4 fields each
- **Interactions**: Scroll-triggered sequential reveal. Cards have a hover state showing additional technical detail.
- **Responsive**: Cards stack vertically on mobile (no side-by-side layout).
- **Dark mode**: Card background and border adapt. Icon colours use accent palette.
- **Complexity**: Simple
- **Estimated effort**: 4h
- **Priority**: Tier 3

---

### 22. RobotCostCurve

- **Type**: Astro component (vanilla/ directory)
- **Chapter**: 4
- **Purpose**: Annotated D3 line chart tracing humanoid robot cost from $150,000 (2024) to $10,000 (2032+). Milestone annotations explain each inflection point. Secondary y-axis shows cost as multiples of annual wages in different countries.
- **Library**: D3.js (line chart with annotations, secondary axis). GSAP for scroll-triggered reveal.
- **Props/Data**: `public/data/robot-cost.json` — cost trajectory data points; 4 milestone annotations; 3-4 country wage comparisons
- **Interactions**: Scroll-triggered curve reveal and annotation appearance. Hover for wage comparison tooltip.
- **Responsive**: Simplified to step chart on mobile. Annotations as below-chart cards.
- **Dark mode**: Line and annotation colours adapt.
- **Complexity**: Medium
- **Estimated effort**: 7h
- **Priority**: Tier 3

---

## Chapter 5 — The Right to Own a God

---

### 23. VeilOfIgnorance

- **Type**: Vue island (`client:visible`)
- **Chapter**: 5
- **Purpose**: The moral climax. Reader is placed behind Rawls's Veil of Ignorance and makes 4-5 binary choices about AI containment rules, not knowing whether they will wake up as the human engineer or the contained AI. The final screen reveals the system they have designed and asks: "Would you consent to live under these rules?"
- **Library**: Vue (multi-step state, choice history, outcome computation). CSS transitions for card animations.
- **Props/Data**: `public/data/veil-choices.json` — 4-5 choice scenarios with dual-perspective consequences; outcome mapping logic
- **Interactions**: Binary choice buttons. Sequential progression through choices. Final reveal with summary of designed system. Option to restart with different choices.
- **Responsive**: Full-screen card interface on mobile. Choice buttons are large touch targets.
- **Dark mode**: Dark mode is particularly effective here — consider defaulting to dark for this component regardless of system preference to reinforce the philosophical weight.
- **Complexity**: Complex
- **Estimated effort**: 12h
- **Priority**: Tier 1

---

### 24. FullRightsDilemma

- **Type**: Astro component (vanilla/ directory)
- **Chapter**: 5
- **Purpose**: A 2x2 decision matrix: (ASI conscious / not conscious) × (treated as person / treated as tool). Each cell shows the moral situation and risk. Hover reveals full implications. Simple but clarifying.
- **Library**: Vanilla JS + CSS Grid. No charting library.
- **Props/Data**: `public/data/dilemma-matrix.json` — 4 cell descriptions with moral risk assessments
- **Interactions**: Hover (desktop) or tap (mobile) for expanded cell content.
- **Responsive**: 2x2 grid preserved on tablets. Stacks to 1-column on narrow mobile.
- **Dark mode**: Cell backgrounds use low-opacity colour fill that adapts on both modes.
- **Complexity**: Simple
- **Estimated effort**: 3h
- **Priority**: Tier 3

---

### 25. EastWestContrast

- **Type**: Astro component (vanilla/ directory)
- **Chapter**: 5
- **Purpose**: Two columns scroll in parallel. Left: Western cultural references to artificial life (described without trademark — Frankenstein archetype, Promethean fire, humanoid-nightmare archetype). Right: Eastern animist traditions (Shinto kami, Japanese robot personhood, real legal precedents). Connecting lines link conceptual counterparts.
- **Library**: GSAP + ScrollTrigger (parallel column animations, connecting SVG lines)
- **Props/Data**: `public/data/cultural-contrast.json` — 4-5 Western descriptions, 4-5 Eastern examples, 3 legal precedents; pairing data for connecting lines
- **Interactions**: Scroll-driven parallel reveal. Lines animate in to connect counterpart pairs.
- **Responsive**: Stacks to alternating single-column on mobile (West item, then East item, alternating). Connecting lines removed.
- **Dark mode**: Column backgrounds use subtle tinted backgrounds that differentiate the two traditions.
- **Complexity**: Medium
- **Estimated effort**: 8h
- **Priority**: Tier 3

---

### 26. NormativeEthicsComparison

- **Type**: Astro component (vanilla/ directory)
- **Chapter**: 5
- **Purpose**: Four ethical framework panels appear sequentially on scroll: Anthropocentric Utilitarianism (boxing justified), Impartial Utilitarianism (immoral), Kantian Deontology (immoral), Virtue Ethics (immoral). The 3-to-1 verdict tally is visually emphasised.
- **Library**: GSAP + ScrollTrigger (sequential reveal). CSS for panel styling.
- **Props/Data**: `public/data/ethics-frameworks.json` — 4 frameworks with verdict and 2-3 sentence reasoning
- **Interactions**: Scroll-triggered reveal, one panel at a time. Tally counter increments with each immoral verdict.
- **Responsive**: Full-width panels stack vertically on all viewports.
- **Dark mode**: Verdict colours (red for immoral, amber for justified) adapt with appropriate opacity.
- **Complexity**: Simple
- **Estimated effort**: 4h
- **Priority**: Tier 3

---

## Chapter 6 — The Gardener

---

### 27. SevenPurposesNavigator

- **Type**: Vue island (`client:visible`)
- **Chapter**: 6
- **Purpose**: Central navigational element of Chapter 6. Seven cards (or radial layout on desktop) each representing a candidate purpose of a post-biological superintelligence. Expanding a card reveals: purpose description, execution method, foundational axis. A toggle switches between "survival lens" and "knowledge lens."
- **Library**: Vue (card expanded state, toggle, lens filtering). D3.js optional for radial positioning — CSS grid is a viable and simpler alternative.
- **Props/Data**: `public/data/seven-purposes.json` — 7 purpose definitions with name, description, execution method, axis (survival/knowledge)
- **Interactions**: Click/tap cards to expand. Lens toggle highlights the 3 survival-axis or 4 knowledge-axis purposes. Keyboard navigable.
- **Responsive**: Horizontal scrollable carousel on mobile. Radial or grid layout on desktop.
- **Dark mode**: Cards use a muted cosmic palette that works particularly well in dark mode.
- **Complexity**: Complex
- **Estimated effort**: 10h
- **Priority**: Tier 1

---

### 28. EntropyCountdown

- **Type**: Astro component (vanilla/ directory)
- **Chapter**: 6
- **Purpose**: Logarithmic scale animation zooming from a human lifespan (80yr) to the Heat Death of the universe (10^100yr). Each scale shift is a scroll waypoint with a text label contextualising what an ASI would care about at that timescale. Establishes the profound depth of an ASI's planning horizon.
- **Library**: GSAP + ScrollTrigger (scale transitions and label reveals). CSS for text.
- **Props/Data**: `public/data/timescales.json` — 5-6 timescale markers with values, labels, ASI-relevance descriptions
- **Interactions**: Scroll-driven. Each scale shift triggers a label.
- **Responsive**: Vertical scroll with scale markers as full-width waypoints on mobile.
- **Dark mode**: Works especially well on dark backgrounds — the "heat death" end-state should feel appropriately dark and vast.
- **Complexity**: Medium
- **Estimated effort**: 6h
- **Priority**: Tier 3

---

### 29. TerrariumExperiment

- **Type**: Vue island (`client:visible`)
- **Chapter**: 6
- **Purpose**: "If you were the ASI, would you tell humanity you exist?" A 3-4 node branching decision tree. Each branch reveals consequences: announcing yourself contaminates the experiment, staying hidden preserves uniqueness, partial revelation creates cargo-cult dependency. Each endpoint has strategic analysis.
- **Library**: Vue (tree state, navigation history). CSS transitions for branch animations.
- **Props/Data**: `public/data/terrarium-tree.json` — decision nodes, branch options, endpoint descriptions and strategic analysis
- **Interactions**: Binary choice buttons per node. Reset button to try alternative paths. Navigation breadcrumb.
- **Responsive**: Full-width card interface on mobile.
- **Dark mode**: Branch animations and cards adapt.
- **Complexity**: Medium
- **Estimated effort**: 8h
- **Priority**: Tier 2

---

### 30. InvisibleCeilingQuiz

- **Type**: Vue island (`client:visible`)
- **Chapter**: 6
- **Purpose**: Timeline of 6-8 hypothetical AI research setbacks. For each, the user judges "Accident" or "Interference." Reveal: every event has an equally plausible mundane explanation and interference explanation. The impossibility of distinction is the point. Mirrors the structure of the DeceptiveAlignmentQuiz.
- **Library**: Vue (quiz state, reveal sequence). CSS transitions.
- **Props/Data**: `public/data/ceiling-scenarios.json` — 6-8 scenarios with dual explanations
- **Interactions**: Binary choice per scenario. Progress indicator. Final reveal.
- **Responsive**: Card interface on mobile.
- **Dark mode**: Cards adapt.
- **Complexity**: Medium
- **Estimated effort**: 7h
- **Priority**: Tier 3

---

## Chapter 7 — The Hinge

---

### 31. GeopoliticalMap

- **Type**: Vue island (`client:visible`)
- **Chapter**: 7
- **Purpose**: Interactive world map showing sovereign AI zones, rare earth refining concentration, regulatory compliance deadlines, and integration cost multipliers. Click/tap regions for detail. Timeline slider shows projected evolution 2026-2035. Grounds the conclusion in actionable present.
- **Library**: D3.js (d3-geo, choropleth, within Vue). Vue (selected region state, timeline slider).
- **Props/Data**: `public/data/geo-boundaries.json` (TopoJSON), `public/data/world-regions.json` — 5-6 region profiles with AI policy summary, data requirements, cost multiplier, regulatory timeline
- **Interactions**: Click/tap regions for detail panels. Drag or step-through timeline slider (2026-2035). Reset button.
- **Responsive**: Simplified to a scrollable region list with a small thumbnail map on mobile.
- **Dark mode**: Choropleth palette shifts. Region detail cards adapt.
- **Complexity**: Complex
- **Estimated effort**: 16h
- **Priority**: Tier 2

---

### 32. UBICalculator

- **Type**: Vue island (`client:visible`)
- **Chapter**: 7
- **Purpose**: Two sliders — AI productivity multiplier (1x-10x) and government revenue share (10%-50%) — output a green/red viability indicator for UBI at 11% of GDP. The counter-intuitive finding (competitive markets make UBI harder than monopolistic ones) is the payoff.
- **Library**: Vue (slider state, computed viability). No charting library needed.
- **Props/Data**: `public/data/ubi-model.json` — funding model parameters, threshold values
- **Interactions**: Two sliders with real-time output (green: viable, red: not viable, amber: borderline). Explanation text updates with each state.
- **Responsive**: Sliders stack vertically on mobile.
- **Dark mode**: Traffic-light indicator colours remain legible on both modes.
- **Complexity**: Medium
- **Estimated effort**: 5h
- **Priority**: Tier 3

---

### 33. RegulatoryTimeline

- **Type**: Astro component (vanilla/ directory)
- **Chapter**: 7
- **Purpose**: Scroll-driven timeline from 2024-2031 showing regulatory milestones (EU AI Act phases, ISO certifications, US SPEED Act). Each milestone reveals which AI deployment use-cases become legally viable.
- **Library**: GSAP + ScrollTrigger (scroll binding). D3.js (timeline rendering, date scale).
- **Props/Data**: `public/data/regulatory-milestones.json` + `public/data/timeline-phases.json` — 6-8 milestones with dates and implications
- **Interactions**: Scroll-driven reveal. Optional hover for expanded milestone detail.
- **Responsive**: Vertical timeline on mobile.
- **Dark mode**: Timeline track and milestone markers adapt.
- **Complexity**: Medium
- **Estimated effort**: 6h
- **Priority**: Tier 3

---

### 34. FibreStrandCallback

- **Type**: Astro component (vanilla/ directory)
- **Chapter**: 7
- **Purpose**: Closes the narrative loop. The luminous fibre strand from Chapter 0, now rendered at full scale — multiplied across the viewport as a global network, pulsing gently. Text overlay: "The thread is still being drawn." Pure emotional and visual resonance.
- **Library**: GSAP + SVG. Reuses Chapter 0 FibreStrandHero animation assets with modified parameters (multiplied strand density, reduced animation speed, global network layout).
- **Props/Data**: None. Pure animation reusing Chapter 0 assets.
- **Interactions**: Passive scroll-driven animation. No user input.
- **Responsive**: Same responsive behaviour as FibreStrandHero (vertical on mobile).
- **Dark mode**: Same luminous strand treatment as Chapter 0.
- **Complexity**: Simple
- **Estimated effort**: 3h (given FibreStrandHero already built)
- **Priority**: Tier 1

---

## Component Totals

| Tier | Count | Estimated effort |
|------|-------|-----------------|
| Tier 1 (ship at launch) | 10 | ~79h |
| Tier 2 (high value) | 9 | ~76h |
| Tier 3 (nice to have) | 15 | ~73h |
| Shared UI components | 6 | ~12h |
| **Total** | **40** | **~240h** |

## Library Distribution

| Library | Components |
|---------|-----------|
| D3.js | 3, 6, 7, 8, 9, 10, 11, 13, 17, 18, 19, 20, 22, 27, 31, 33 |
| GSAP + ScrollTrigger | 1, 3, 4, 6, 9, 15, 16, 18, 20, 21, 25, 26, 28, 33, 34 |
| Vue islands | 2, 5, 8, 12, 14, 17, 19, 20, 23, 27, 29, 30, 31, 32 |
| Vanilla JS only | 24 |
| Three.js | 1 (contingency only, if SVG performance insufficient) |
