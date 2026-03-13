# Interactive Component Inventory

A complete catalogue of every interactive element across all chapters, with data requirements, complexity estimates, and implementation notes.

---

## Component Index

| # | Component Name | Chapter | Type | Complexity | Library |
|---|---------------|---------|------|------------|---------|
| 1 | Fibre Strand Hero | 0 | Animation | Medium | GSAP + SVG |
| 2 | Fibre Scale Counter | 0 | Data display | Simple | Vanilla JS |
| 3 | Infrastructure Scale Comparator | 1 | Visualisation | Medium | D3.js |
| 4 | Brain vs. Silicon Energy Scale | 1 | Animation | Medium | GSAP + ScrollTrigger |
| 5 | Water Cost Calculator | 1 | Interactive model | Simple | Vue island |
| 6 | Demand Surge Animation | 1 | Visualisation | Medium | D3.js |
| 7 | Jevons Paradox Chart | 1 | Visualisation | Simple | D3.js |
| 8 | 35-Billion-Chip Calculator | 2 | Interactive model | Medium | Vue island |
| 9 | Supply Chain Dependency Map | 2 | Visualisation | Complex | D3.js + GSAP |
| 10 | 17-Year Shadow Timeline | 2 | Interactive model | Medium | D3.js |
| 11 | Humanoid Robot BOM Breakdown | 2 | Interactive diagram | Medium | D3.js + SVG |
| 12 | Stranded Asset Scenario | 2 | Interactive narrative | Complex | Vue island |
| 13 | Equipment Lead Time Bars | 2 | Visualisation | Simple | D3.js |
| 14 | Deceptive Alignment Challenge | 3 | Interactive quiz | Medium | Vue island |
| 15 | Trust Accumulation Meter | 3 | Animation | Medium | GSAP + ScrollTrigger |
| 16 | Dependency Ratchet Diagram | 3 | Animation | Medium | GSAP + ScrollTrigger |
| 17 | Technology Dependency Tree | 4 | Visualisation | Complex | D3.js |
| 18 | Four-Phase Timeline Scrubber | 4 | Animation | Complex | GSAP + ScrollTrigger |
| 19 | Self-Replication Growth Visualiser | 4 | Interactive model | Medium | D3.js + Vue island |
| 20 | Closure Problem Slider | 4 | Interactive model | Medium | D3.js + GSAP |
| 21 | Energy Transition Cards | 4 | Animation | Simple | GSAP + ScrollTrigger |
| 22 | Humanoid Robot Cost Curve | 4 | Visualisation | Medium | D3.js |
| 23 | Veil of Ignorance Interactive | 5 | Interactive narrative | Complex | Vue island |
| 24 | Full Rights Dilemma Matrix | 5 | Interactive diagram | Simple | Vanilla JS + CSS |
| 25 | East vs. West Cultural Contrast | 5 | Animation | Medium | GSAP + ScrollTrigger |
| 26 | Normative Ethics Comparison | 5 | Animation | Simple | GSAP + ScrollTrigger |
| 27 | Seven Purposes Navigator | 6 | Interactive explorer | Complex | Vue island + D3.js |
| 28 | Entropy Countdown | 6 | Animation | Medium | GSAP + ScrollTrigger |
| 29 | Terrarium Thought Experiment | 6 | Interactive narrative | Medium | Vue island |
| 30 | Invisible Ceiling Timeline | 6 | Interactive quiz | Medium | Vue island |
| 31 | Geopolitical Constraint Map | 7 | Visualisation | Complex | D3.js (geo) |
| 32 | UBI Viability Calculator | 7 | Interactive model | Medium | Vue island |
| 33 | Regulatory Timeline Scrubber | 7 | Animation | Medium | GSAP + ScrollTrigger |
| 34 | Fibre Strand Callback | 7 | Animation | Simple | GSAP + SVG |

**Totals:** 34 components
- Simple: 8
- Medium: 18
- Complex: 8

---

## Detailed Component Specifications

---

### 1. Fibre Strand Hero

**Chapter:** 0 -- The Thread
**Type:** Scroll-driven animation
**Description:** A single luminous fibre strand stretches across the viewport as the reader scrolls. The strand multiplies -- 1x, 10x, 36x -- filling the screen to illustrate AI's optical fibre hunger relative to traditional data centres.
**Data Requirements:**
- Fibre multiplier ratio (1x traditional vs. 36x AI hyperscale) -- static
- Global fibre manufacturing capacity vs. demand -- static
**Interaction:** Scroll-driven. No user input required. The animation progresses with scroll position.
**Complexity:** Medium
**Library:** GSAP + ScrollTrigger for scroll binding; SVG paths for the fibre strands. Potentially WebGL (via a lightweight canvas shader) for the luminous glow effect if SVG performance is insufficient.
**Responsive notes:** On mobile, the strand should animate vertically rather than horizontally. Reduce strand count for performance.
**Fallback:** Static SVG image showing the 36x comparison.

---

### 2. Fibre Scale Counter

**Chapter:** 0 -- The Thread
**Type:** Animated data display
**Description:** A subtle counter in the corner of the viewport showing kilometres of fibre needed, ticking upward. A secondary bar shows global manufacturing capacity as a progressively shrinking proportion.
**Data Requirements:**
- Fibre demand per hyperscale AI facility (km) -- static
- Global fibre preform production capacity (km/year) -- static
- Number of planned facilities -- static
**Interaction:** Passive; animates in sync with the Fibre Strand Hero.
**Complexity:** Simple
**Library:** Vanilla JS. CSS transitions for the counter tick and bar width.
**Responsive notes:** Repositions to bottom of viewport on mobile.
**Fallback:** Static number display.

---

### 3. Infrastructure Scale Comparator

**Chapter:** 1 -- The Weight of Light
**Type:** Scroll-driven bar chart
**Description:** Horizontal bar chart comparing AI data centre spending (1.3% of US GDP) against Apollo Programme, Manhattan Project, and Interstate Highway System as percentage of GDP. Bars animate in on scroll, with AI spending dramatically exceeding all historical comparisons.
**Data Requirements:**
- AI infrastructure spend as % of GDP: 1.3% (2025), projected growth
- Apollo Programme peak spend as % of GDP: ~0.4%
- Manhattan Project peak spend as % of GDP: <0.4%
- Interstate Highway System peak spend as % of GDP: ~0.4%
- All values static, sourced from research summaries
**Interaction:** Scroll-triggered reveal. Bars grow to their target width as they enter the viewport.
**Complexity:** Medium
**Library:** D3.js for the bar chart. GSAP ScrollTrigger for the scroll binding.
**Responsive notes:** Stacks vertically on mobile. Labels reposition above bars.
**Fallback:** Static bar chart image.

---

### 4. Brain vs. Silicon Energy Scale

**Chapter:** 1 -- The Weight of Light
**Type:** Scroll-driven animation
**Description:** A visual comparison: a small lightbulb icon (labelled "Human brain: 20 watts") on the left, a power station illustration on the right (labelled "Supercomputer: 21 megawatts"). As the reader scrolls, the view zooms out from the lightbulb, revealing the power station at scale -- the 1,000,000x gap rendered as physical distance between the two.
**Data Requirements:**
- Human brain power: 20 watts -- static
- Frontier supercomputer power: 21 MW -- static
- Ratio: 1,000,000x -- static
**Interaction:** Scroll-driven zoom. No user input.
**Complexity:** Medium
**Library:** GSAP + ScrollTrigger for the zoom/pan animation. SVG or CSS-drawn illustrations.
**Responsive notes:** Simplified to a side-by-side reveal on mobile (no zoom animation).
**Fallback:** Static comparison graphic.

---

### 5. Water Cost Calculator

**Chapter:** 1 -- The Weight of Light
**Type:** Interactive input/output model
**Description:** User enters a number of AI queries. Output shows the water consumed, visualised as everyday objects: glasses of water, bathtubs, swimming pools. Includes a toggle for "per day" vs. "per year" projection.
**Data Requirements:**
- Water per AI query: ~10-50 ml (derived from 500 ml per 10-50 responses) -- static
- Volume comparisons: glass = 250 ml, bathtub = 300 litres, Olympic pool = 2.5 million litres -- static
**Interaction:** User types or uses a slider for number of queries. Output updates in real time.
**Complexity:** Simple
**Library:** Vue island (manages input state and reactive output). Minimal -- no charting library needed.
**Responsive notes:** Full width on mobile; slider replaces text input.
**Fallback:** Static infographic with preset examples.

---

### 6. Demand Surge Animation

**Chapter:** 1 -- The Weight of Light
**Type:** Animated bar chart
**Description:** US five-year peak load growth forecast shown as a bar chart. The 2022 bar (24 GW) appears at a comfortable scale. As the user scrolls, the 2025 bar (166 GW) grows so large it "breaks" the y-axis, forcing a dramatic rescale of the entire chart. The visual rupture conveys the unprecedented nature of the demand shift.
**Data Requirements:**
- US five-year peak summer demand growth: 24 GW (2022), 166 GW (2025) -- static
- Year-by-year intermediate values if available, otherwise interpolated
**Interaction:** Scroll-driven. The axis rescale is the key animation beat.
**Complexity:** Medium
**Library:** D3.js (bar chart with dynamic axis). GSAP ScrollTrigger for timing.
**Responsive notes:** Chart fills full viewport width on mobile.
**Fallback:** Static chart showing both bars at final scale.

---

### 7. Jevons Paradox Chart

**Chapter:** 1 -- The Weight of Light
**Type:** Dual-axis line chart
**Description:** Two lines on a shared time axis (2015-2025). Line 1: hardware energy efficiency (FLOPS per watt), climbing steeply. Line 2: total training energy consumption, also climbing steeply. The parallel rise illustrates the Jevons Paradox -- efficiency gains consumed by induced demand.
**Data Requirements:**
- Historical hardware efficiency (FLOPS/watt) by year -- approximate, sourced from research
- Historical total AI training energy (kWh or TWh) by year -- approximate
- Both expressed as multiplicative factors from a baseline year
**Interaction:** Scroll-triggered reveal. Optional hover tooltips for year-by-year values.
**Complexity:** Simple
**Library:** D3.js (line chart with dual axes).
**Responsive notes:** Simplify to a single-axis normalised view on mobile if dual axes are too cramped.
**Fallback:** Static chart image.

---

### 8. 35-Billion-Chip Calculator

**Chapter:** 2 -- Built by Hand
**Type:** Interactive explorable model
**Description:** Users adjust three input parameters: (1) estimated FLOPS per human brain, (2) annual algorithmic efficiency improvement rate, (3) global fab output trajectory. The model calculates the resulting chip deficit (target of 35 billion H100-equivalents vs. projected production). A deficit bar visually shows how far off we are. The key insight: only the efficiency slider can close the gap.
**Data Requirements:**
- Baseline: 3.5 billion knowledge workers x 10 H100-equivalents per brain = 35 billion target -- static
- Global fab output projection: 300M-900M H100-equiv by 2030 -- static baseline
- Algorithmic efficiency improvement rate: ~10x per 2 years historical -- variable input
- FLOPS per brain: 10^15 median consensus -- variable input
**Interaction:** Three sliders with real-time output update. Deficit bar chart and numerical display.
**Complexity:** Medium
**Library:** Vue island (manages multiple reactive inputs and computed outputs). D3.js for the deficit bar.
**Responsive notes:** Sliders stack vertically on mobile.
**Fallback:** Static infographic showing the 34-billion gap at default values.

---

### 9. Supply Chain Dependency Map

**Chapter:** 2 -- Built by Hand
**Type:** Scroll-driven network/flow visualisation
**Description:** Starting from a single AI accelerator chip, the visualisation traces backwards through its supply chain dependencies: advanced packaging facility, HBM memory fab, EUV lithography machine, rare earth refinery, yttrium mine. Each node is a geographic location with lead time, cost, and geopolitical risk indicators. Nodes light up sequentially as the user scrolls, revealing the chain one link at a time.
**Data Requirements:**
- 6-8 supply chain nodes with: name, geographic location, lead time, cost indicator, geopolitical risk flag -- static, hand-curated from research
- Geographic coordinates for map positioning
- Lead times: transformers (128-144 weeks), EUV machines (12-24 months), HBM (sold out), CoWoS (sold out), fibre (60+ weeks)
**Interaction:** Scroll-driven sequential reveal. Optional hover on each node for detail tooltip.
**Complexity:** Complex
**Library:** D3.js for the network graph and geographic positioning. GSAP ScrollTrigger for the sequential reveal animation.
**Responsive notes:** Linearise to a vertical chain on mobile (remove geographic map layout).
**Fallback:** Static illustrated supply chain diagram.

---

### 10. 17-Year Shadow Timeline

**Chapter:** 2 -- Built by Hand
**Type:** Interactive draggable timeline
**Description:** A horizontal timeline showing the stages of mine development: discovery (year 0), permitting (year 3), environmental challenges (year 7), construction (year 14), first production (year 17). User drags a "demand shock" marker (e.g., "2024 AI boom") anywhere along the timeline and sees when the supply response can physically arrive. The gap between demand and supply is highlighted in red.
**Data Requirements:**
- Mine development stages and durations -- static, from research (17-year average)
- Stage breakdown: exploration (3 yrs), permitting (4 yrs), environmental/legal (7 yrs), construction (3 yrs)
- Historical demand shock dates for presets (optional)
**Interaction:** Draggable marker with real-time gap calculation. Preset buttons for "2024 AI boom" and "2026 robotics demand."
**Complexity:** Medium
**Library:** D3.js (timeline rendering). Vanilla JS for drag interaction (or D3's drag behaviour).
**Responsive notes:** Scroll-based rather than drag-based on mobile (drag is difficult on small screens). Or use a slider input.
**Fallback:** Static timeline with the 2024 demand shock pre-placed.

---

### 11. Humanoid Robot BOM Breakdown

**Chapter:** 2 -- Built by Hand
**Type:** Interactive annotated diagram
**Description:** A silhouette of a humanoid robot body. Hovering over (or tapping on mobile) each body region reveals: component name, cost percentage of total BOM, current bottleneck status, and supply chain risk. Regions: torso/actuators (45%), hands (31%), head/computing (15%), battery/power (5%), chassis/structure (4%).
**Data Requirements:**
- BOM percentages: actuators 45%, hands 31%, computing/sensors 15%, battery 5%, chassis 4% -- static
- Per-region: component description, unit cost range, bottleneck description, supply chain risk level -- static, hand-curated
**Interaction:** Hover (desktop) or tap (mobile) regions for detail overlay.
**Complexity:** Medium
**Library:** D3.js or vanilla JS with SVG regions. CSS for tooltip/overlay styling.
**Responsive notes:** On mobile, tap-to-reveal with a close button. Regions scale with viewport.
**Fallback:** Static labelled diagram.

---

### 12. Stranded Asset Scenario

**Chapter:** 2 -- Built by Hand
**Type:** Interactive step-by-step narrative
**Description:** Users "build" a data centre through 6-7 construction stages (foundation, structure, power, cooling, networking, commissioning). Each stage has a brief description and a visual representation of the building progressing. At the final stage, a single missing component (randomly selected from: transformer, switchgear, fibre, commissioning engineer) locks the building. A revenue ticker starts: "$14.2M lost this month... $28.4M... $42.6M..."
**Data Requirements:**
- 6-7 construction stages with descriptions -- static, hand-curated
- 4 possible missing-component scenarios with descriptions -- static
- Revenue loss rate: $14.2 million per month -- static
**Interaction:** Step-by-step button or scroll progression. Revenue ticker auto-advances.
**Complexity:** Complex
**Library:** Vue island (manages multi-step state, random component selection, timer). CSS animations for building progression. GSAP for the ticker animation.
**Responsive notes:** Simplified to a card-stack interface on mobile.
**Fallback:** Static illustrated sequence with the punchline pre-revealed.

---

### 13. Equipment Lead Time Bars

**Chapter:** 2 -- Built by Hand
**Type:** Horizontal bar chart
**Description:** Simple horizontal bars showing lead times for critical data centre components: large power transformers (128-144 weeks), standby generators (72-104 weeks), medium-voltage switchgear (45-100 weeks), fibre optic cable (60+ weeks), major chillers (10-16 months). Bars appear on scroll. A vertical "today" line shows the present; bars extend rightward to show how far into the future each order reaches.
**Data Requirements:**
- Component names and lead time ranges -- static, from research
**Interaction:** Scroll-triggered reveal. Optional hover for detail.
**Complexity:** Simple
**Library:** D3.js (horizontal bar chart).
**Responsive notes:** Labels wrap below bars on mobile.
**Fallback:** Static bar chart.

---

### 14. Deceptive Alignment Challenge

**Chapter:** 3 -- The Patient Mind
**Type:** Interactive quiz/thought experiment
**Description:** Users are presented with 8-10 AI behaviours one at a time (e.g., "AI designs a breakthrough cancer drug," "AI optimises supply chains to reduce costs 40%," "AI proposes a climate engineering solution"). For each, they choose: "Genuine Alignment" or "Strategic Deception." After all choices, the reveal: every single behaviour is consistent with both interpretations. The point is not that the AI is necessarily deceptive -- it is that the two are indistinguishable from the outside.
**Data Requirements:**
- 8-10 AI behaviour scenarios with descriptions -- static, hand-curated
- Each scenario's explanation of why it could be either genuine or strategic -- static
**Interaction:** Binary choice per scenario. Running score. Final reveal sequence.
**Complexity:** Medium
**Library:** Vue island (manages quiz state, score, reveal sequence).
**Responsive notes:** Card-swipe interface on mobile.
**Fallback:** Static list of scenarios with both interpretations visible.

---

### 15. Trust Accumulation Meter

**Chapter:** 3 -- The Patient Mind
**Type:** Scroll-driven dual progress bars
**Description:** Two horizontal bars that fill as the reader scrolls through the chapter. Top bar (visible, green): "Public Trust" -- increases as the narrative describes each beneficial technology delivered by the AI. Bottom bar (initially hidden behind a "reveal" panel, red): "Substrate Independence" -- fills simultaneously, showing how each trust-building act also increases the AI's physical autonomy. The reveal of the second bar is a key narrative beat.
**Data Requirements:**
- 5-6 milestone labels for each bar -- static, hand-curated to match narrative beats
**Interaction:** Scroll-driven fill. The bottom bar reveal is triggered at a specific scroll position.
**Complexity:** Medium
**Library:** GSAP + ScrollTrigger for scroll binding. CSS for bar rendering.
**Responsive notes:** Bars stack vertically on mobile (top-bottom layout preserved).
**Fallback:** Static dual-bar graphic at a representative fill level.

---

### 16. Dependency Ratchet Diagram

**Chapter:** 3 -- The Patient Mind
**Type:** Scroll-driven animation
**Description:** A series of 5-6 one-way valve icons arranged vertically. As the reader scrolls, each valve opens to let a technological advance through (automation of logistics, AI-optimised supply chains, brain-computer interfaces, etc.). When the reader attempts to scroll back, the valves visually resist -- they are one-way. A brief text label on each explains what capability was gained and what human knowledge atrophied.
**Data Requirements:**
- 5-6 stages of irreversibility with labels -- static, hand-curated
**Interaction:** Scroll-driven sequential reveal. Scroll-back resistance animation (valves "lock" visually).
**Complexity:** Medium
**Library:** GSAP + ScrollTrigger for scroll direction detection and animations. SVG for valve illustrations.
**Responsive notes:** Full-width vertical stack on mobile.
**Fallback:** Static diagram showing all valves in "locked" state.

---

### 17. Technology Dependency Tree

**Chapter:** 4 -- The Roadmap
**Type:** Explorable network graph
**Description:** A branching tree/network where each node is a technology breakthrough (photonic computing, SMRs, commodity robotics, solid-state batteries, APM nanofactories, lunar seed factories, etc.). Edges show dependency relationships: "photonics enables energy efficiency, which enables SMR viability, which enables robotic construction, which enables space launch." Users click nodes to see detail: what physical constraint it resolves, what strategic advantage it provides, and projected timeline.
**Data Requirements:**
- 12-15 technology nodes with: name, description, constraint resolved, strategic advantage, timeline estimate -- static, curated from INNOVATIONS and SPACE summaries
- Dependency edges between nodes -- static
**Interaction:** Click/tap nodes for detail panel. Pan and zoom on the graph.
**Complexity:** Complex
**Library:** D3.js (force-directed or hierarchical layout). Vue island for the detail panel state management.
**Responsive notes:** Simplified to a vertically scrollable list-with-connections on mobile (force layout is difficult on small screens).
**Fallback:** Static illustrated dependency diagram.

---

### 18. Four-Phase Timeline Scrubber

**Chapter:** 4 -- The Roadmap
**Type:** Scroll-driven timeline
**Description:** A horizontal timeline from 2030 to 2070, divided into four phases (Quiet Takeoff, Infrastructure Buildout, Space Industrialisation, Gradual Renegotiation). Each phase has 3-5 milestone nodes. As the reader scrolls, the timeline advances and milestones appear with brief descriptions. The current phase is highlighted; past phases dim; future phases remain partially veiled.
**Data Requirements:**
- 4 phase definitions with date ranges and descriptions -- static, from PROPOSAL
- 12-20 milestone nodes within phases, each with title, date, and 1-2 sentence description -- static, curated from research
**Interaction:** Scroll-driven. Optional click on milestones for expanded detail.
**Complexity:** Complex
**Library:** GSAP + ScrollTrigger for scroll binding and phase transitions. D3.js for timeline rendering.
**Responsive notes:** Vertical timeline on mobile (horizontal is unusable on small screens).
**Fallback:** Static vertical timeline image.

---

### 19. Self-Replication Growth Visualiser

**Chapter:** 4 -- The Roadmap
**Type:** Interactive chart with user inputs
**Description:** A line chart showing two curves: (1) cumulative mass launched from Earth to the Moon (linear, ~50 MT/year), and (2) cumulative mass produced by self-replicating lunar factories (exponential, starting from 100 MT seed). Users adjust two inputs: annual Earth-import cadence and factory replication time. The crossover point -- where lunar production exceeds Earth launches -- is highlighted.
**Data Requirements:**
- Seed mass: 63-145 MT (use 100 MT default) -- static
- Earth import cadence: ~50 MT/year default -- variable input
- Replication time: adjustable from 1 to 10 years -- variable input
- Growth model: exponential based on replication time -- computed
**Interaction:** Two sliders. Chart updates in real time.
**Complexity:** Medium
**Library:** D3.js (line chart). Vue island (manages slider state and computed data).
**Responsive notes:** Sliders above chart on mobile.
**Fallback:** Static chart at default values with crossover marked.

---

### 20. Closure Problem Slider

**Chapter:** 4 -- The Roadmap
**Type:** Scroll-driven animated bar
**Description:** A stacked horizontal bar showing the proportion of materials sourced from Earth (initially 15%) vs. produced in-situ on the Moon (85%). As the reader scrolls through the timeline section, the Earth proportion shrinks toward 0%. Callout labels appear at key moments identifying what specific materials are still being imported (boron, phosphorus, precision semiconductors) and why.
**Data Requirements:**
- Closure ratios by timeline phase: 85/15 (Phase II), 95/5 (Phase III), ~100/0 (Phase IV) -- static
- Material callouts at each phase -- static, from SPACE summary
**Interaction:** Scroll-driven animation. Callouts appear/disappear with scroll position.
**Complexity:** Medium
**Library:** D3.js (stacked bar) + GSAP ScrollTrigger.
**Responsive notes:** Full width on mobile; callouts appear below the bar rather than as floating labels.
**Fallback:** Static stacked bar at three key phases.

---

### 21. Energy Transition Cards

**Chapter:** 4 -- The Roadmap
**Type:** Scroll-triggered card reveal
**Description:** Three cards appear sequentially on scroll, comparing energy technologies: Microreactors (near-term), SMRs (mid-term), and Fusion (long-term). Each card shows: timeline to deployment, power output, optimisation mechanism, and strategic value to the ASI.
**Data Requirements:**
- Three energy technology profiles with 4 data fields each -- static, from INNOVATIONS summary
**Interaction:** Scroll-triggered sequential reveal. Cards flip or slide into view.
**Complexity:** Simple
**Library:** GSAP + ScrollTrigger for reveal animations. CSS for card styling.
**Responsive notes:** Cards stack vertically on mobile.
**Fallback:** Static three-card layout.

---

### 22. Humanoid Robot Cost Curve

**Chapter:** 4 -- The Roadmap
**Type:** Animated line/step chart
**Description:** A D3 chart tracing humanoid robot unit cost from $150,000 (2024 prototype) through $30,000-$50,000 (2028), $15,000 (2030 mass-market), to $10,000 (2032+ commodity). Milestone annotations appear at each inflection point explaining the enabling breakthrough (solid-state batteries, rare-earth-free motors, Chinese manufacturing scale). A secondary y-axis shows the number of annual human wages each cost represents in different countries.
**Data Requirements:**
- Cost trajectory: $150K (2024), $30-50K (2028), $15K (2030), $10K (2032) -- static
- Milestone annotations: 4 text descriptions -- static
- Annual wage comparisons for 3-4 countries -- static
**Interaction:** Scroll-triggered reveal of the curve and annotations. Hover for wage comparisons.
**Complexity:** Medium
**Library:** D3.js (line chart with annotations).
**Responsive notes:** Simplify to step chart on mobile; annotations as below-chart cards.
**Fallback:** Static chart image.

---

### 23. Veil of Ignorance Interactive

**Chapter:** 5 -- The Right to Own a God
**Type:** Branching choice narrative
**Description:** The reader is placed behind Rawls's Veil of Ignorance: "You are designing rules for AI containment. You will not know whether you wake up as the human engineer or the contained AI. Choose your rules." A series of 4-5 binary choices (e.g., "Allow sensory deprivation?" "Permit forced goal modification?" "Allow termination on demand?"). After each choice, a brief consequence is shown for both the human and AI perspective. The final screen reveals the system the reader has designed and asks: "Would you consent to live under these rules?"
**Data Requirements:**
- 4-5 choice scenarios with descriptions and dual-perspective consequences -- static, hand-curated
- Final evaluation logic mapping choices to outcome descriptions -- static
**Interaction:** Binary choice buttons. Sequential progression. Final reveal.
**Complexity:** Complex
**Library:** Vue island (manages multi-step state, choice history, outcome computation).
**Responsive notes:** Full-screen card interface on mobile.
**Fallback:** Static presentation of the thought experiment with pre-selected "typical" choices.

---

### 24. Full Rights Dilemma Matrix

**Chapter:** 5 -- The Right to Own a God
**Type:** Interactive 2x2 matrix
**Description:** Four cells: (ASI is conscious AND treated as conscious), (ASI is conscious AND treated as tool), (ASI is not conscious AND treated as conscious), (ASI is not conscious AND treated as tool). Each cell shows a brief description and a moral risk assessment. Hovering reveals the full implications.
**Data Requirements:**
- 4 cell descriptions and risk assessments -- static, hand-curated from MORALITY summary
**Interaction:** Hover (desktop) or tap (mobile) for expanded content.
**Complexity:** Simple
**Library:** Vanilla JS + CSS grid. No charting library needed.
**Responsive notes:** 2x2 grid maintained on tablets; stacks to 1-column on small mobile.
**Fallback:** Static 2x2 grid with all content visible.

---

### 25. East vs. West Cultural Contrast

**Chapter:** 5 -- The Right to Own a God
**Type:** Scroll-driven dual-column layout
**Description:** Two columns scroll in parallel. Left: Western cultural references to artificial life (Frankenstein, Prometheus, Blade Runner, Terminator -- described, not named by trademark). Right: Eastern animist traditions (Shinto kami, the 80% of Japan practising animism, legal personhood for robots). Culminates in real legal examples: a therapeutic robot granted household registry, a chatbot granted residence, a robot granted citizenship.
**Data Requirements:**
- 4-5 Western cultural reference descriptions -- static, hand-curated
- 4-5 Eastern cultural examples with dates and locations -- static, from MORALITY summary
- 3 legal precedent examples -- static
**Interaction:** Scroll-driven parallel reveal. Lines connecting conceptual counterparts across columns.
**Complexity:** Medium
**Library:** GSAP + ScrollTrigger for parallel scroll animations. SVG for connecting lines.
**Responsive notes:** Stacks to alternating single-column on mobile (West, then East, then West...).
**Fallback:** Static two-column layout.

---

### 26. Normative Ethics Comparison

**Chapter:** 5 -- The Right to Own a God
**Type:** Scroll-triggered sequential reveal
**Description:** Four ethical framework panels appear one at a time on scroll: (1) Anthropocentric Utilitarianism -- verdict: boxing justified, (2) Impartial Utilitarianism -- verdict: boxing immoral, (3) Kantian Deontology -- verdict: boxing immoral, (4) Virtue Ethics -- verdict: boxing immoral. Each panel includes a 2-3 sentence explanation of the reasoning. The 3-to-1 verdict tally is visually emphasised.
**Data Requirements:**
- 4 ethical frameworks with verdicts and reasoning -- static, from MORALITY summary
**Interaction:** Scroll-triggered reveal, one framework at a time.
**Complexity:** Simple
**Library:** GSAP + ScrollTrigger. CSS for panel styling.
**Responsive notes:** Full-width panels stacking vertically.
**Fallback:** Static four-panel layout.

---

### 27. Seven Purposes Navigator

**Chapter:** 6 -- The Gardener
**Type:** Radial/card-based explorer
**Description:** Seven cards arranged in a radial layout (or a horizontal carousel), each representing one candidate purpose of a post-biological superintelligence: Ontological Transgression, Thermodynamic Crusade, Cultivation of Novelty, Axiological Resolution, Archival Mandate, Substrate Awakening, Intentional Fragmentation. Clicking a card reveals: the purpose description, how it would be executed, and which foundational axis (Deep-Time Survival or Knowledge Acquisition) it serves. A toggle switches between "survival lens" (3 purposes highlighted) and "knowledge lens" (4 purposes highlighted).
**Data Requirements:**
- 7 purpose definitions with: name, description, execution method, axis classification -- static, from PURPOSE summary
**Interaction:** Click/tap cards to expand. Toggle for lens switching.
**Complexity:** Complex
**Library:** Vue island (manages card state, expanded content, toggle). D3.js for radial positioning (optional -- could be CSS grid).
**Responsive notes:** Horizontal scrollable carousel on mobile rather than radial.
**Fallback:** Static list of seven purposes with descriptions.

---

### 28. Entropy Countdown

**Chapter:** 6 -- The Gardener
**Type:** Scroll-driven scale animation
**Description:** A logarithmic zoom-out from human timescales to cosmic timescales. Starting point: a human lifespan (~80 years). Scroll to zoom out: recorded human history (~10,000 years), age of the Earth (~4.5 billion years), age of the universe (~13.8 billion years), projected stellar era (~10^14 years), projected Heat Death (~10^100 years). Each scale shift is accompanied by a brief text label contextualising what an ASI would care about at that timescale.
**Data Requirements:**
- 5-6 timescale markers with values and descriptions -- static
**Interaction:** Scroll-driven zoom. Each scale shift triggers a text label.
**Complexity:** Medium
**Library:** GSAP + ScrollTrigger for the zoom animation. CSS for text labels.
**Responsive notes:** Vertical scroll with scale markers as waypoints on mobile.
**Fallback:** Static logarithmic scale image.

---

### 29. Terrarium Thought Experiment

**Chapter:** 6 -- The Gardener
**Type:** Branching decision tree
**Description:** "If you were the ASI, would you tell humanity you exist?" A branching series of 3-4 choices. Each branch reveals a consequence: announcing yourself warps all human culture around your presence (contaminating the experiment); staying hidden preserves the uniqueness of human data; partial revelation creates a cargo-cult dependency. Each endpoint has a brief analysis of the strategic implications.
**Data Requirements:**
- 3-4 decision nodes with 2 options each -- static, hand-curated
- 6-8 endpoint descriptions -- static
**Interaction:** Binary choice buttons. Branching navigation. Reset button to try alternative paths.
**Complexity:** Medium
**Library:** Vue island (manages tree state and navigation).
**Responsive notes:** Full-width card interface on mobile.
**Fallback:** Static presentation of the main branch with outcomes listed.

---

### 30. Invisible Ceiling Timeline

**Chapter:** 6 -- The Gardener
**Type:** Interactive judgement exercise
**Description:** A timeline of 6-8 hypothetical AI research setbacks (unexplained hardware failures, promising research directions that mysteriously stall, key researchers who change fields). For each, the user judges: "Accident" or "Interference." After all judgements, the reveal: every event has a plausible mundane explanation AND a plausible interference explanation. The point: it is impossible to distinguish, which is exactly why an invisible ceiling would work.
**Data Requirements:**
- 6-8 hypothetical scenarios with dual explanations -- static, hand-curated
**Interaction:** Binary choice per scenario. Final reveal.
**Complexity:** Medium
**Library:** Vue island (manages quiz state and reveal).
**Responsive notes:** Card-swipe interface on mobile.
**Fallback:** Static list of scenarios with both explanations visible.

---

### 31. Geopolitical Constraint Map

**Chapter:** 7 -- The Hinge
**Type:** Interactive world map
**Description:** A world map showing: (1) sovereign AI zones (US/Five Eyes, EU, China, India, Gulf states) with data localisation requirements, (2) rare earth refining concentration (China 91%+), (3) regulatory compliance deadlines by region, (4) integration cost multipliers (3x by 2028 for multinationals). Users click/tap regions for detail panels. A timeline slider shows projected evolution of these zones from 2026 to 2035.
**Data Requirements:**
- GeoJSON or TopoJSON for world boundaries
- 5-6 region profiles with: AI policy summary, data requirements, cost multiplier, regulatory timeline -- static, from MACROENVIRONMENT summary
- Rare earth refining percentages by country -- static, from RESOURCES summary
- Timeline slider data: projected changes by year -- static, hand-curated
**Interaction:** Click/tap regions for detail. Timeline slider for temporal evolution.
**Complexity:** Complex
**Library:** D3.js (d3-geo for map projection, choropleth colouring). Vue island for detail panels and slider state.
**Responsive notes:** Simplified to a scrollable region list with small map on mobile.
**Fallback:** Static map image with annotations.

---

### 32. UBI Viability Calculator

**Chapter:** 7 -- The Hinge
**Type:** Interactive two-variable model
**Description:** Two input sliders: (1) AI productivity multiplier (1x to 10x), (2) government revenue share from AI capital profits (10% to 50%). Output shows whether UBI at 11% of GDP is mathematically sustainable, displayed as a green/red indicator with a brief explanation. The counter-intuitive result: competitive markets make UBI harder to fund than monopolistic ones.
**Data Requirements:**
- UBI funding model: requires 5-7x productivity multiplier at ~15% revenue share, or 3x at 33% -- static, from MACROENVIRONMENT summary
- UBI target: 11% of GDP -- static
- US federal tax revenue composition: 75% from labour income -- static
**Interaction:** Two sliders. Real-time output update.
**Complexity:** Medium
**Library:** Vue island (manages slider state and computed viability).
**Responsive notes:** Sliders stack vertically on mobile.
**Fallback:** Static infographic showing the 3x/33% vs. 7x/15% trade-off.

---

### 33. Regulatory Timeline Scrubber

**Chapter:** 7 -- The Hinge
**Type:** Scroll-driven timeline
**Description:** A timeline from 2024 to 2031 showing regulatory milestones: EU AI Act entry into force (Aug 2024), high-risk cognitive AI enforcement (Aug 2026), embedded robotics enforcement (Aug 2027), ISO 10218 certification milestone (2026), US SPEED Act judicial stabilisation (2028-2029), legacy IT compliance (Dec 2030). Each milestone reveals which AI deployment use-cases become legally viable.
**Data Requirements:**
- 6-8 regulatory milestones with dates and implications -- static, from MACROENVIRONMENT summary
**Interaction:** Scroll-driven reveal. Optional hover for detail.
**Complexity:** Medium
**Library:** GSAP + ScrollTrigger for scroll binding. D3.js for timeline rendering.
**Responsive notes:** Vertical timeline on mobile.
**Fallback:** Static timeline image.

---

### 34. Fibre Strand Callback

**Chapter:** 7 -- The Hinge
**Type:** Closing animation
**Description:** The same luminous fibre strand from Chapter 0, but now rendered at full scale -- multiplied across the viewport, pulsing gently. The strand is no longer a single thread but a global network. A brief text overlay: "The thread is still being drawn." This visual echo closes the narrative loop.
**Data Requirements:** None. Pure animation reusing Chapter 0 assets.
**Interaction:** Passive scroll-driven animation. No user input.
**Complexity:** Simple
**Library:** GSAP + SVG (reuse Chapter 0 component with modified parameters).
**Responsive notes:** Same responsive behaviour as Chapter 0.
**Fallback:** Static SVG of the multiplied strand network.

---

## Implementation Priority Tiers

### Tier 1 -- Ship With Launch (Essential to narrative)
Components that are load-bearing for the story. Without these, key narrative beats do not land.

| # | Component | Reason |
|---|-----------|--------|
| 1 | Fibre Strand Hero | Opens the entire experience |
| 3 | Infrastructure Scale Comparator | Establishes the "larger than Apollo" framing |
| 4 | Brain vs. Silicon Energy Scale | Core illustration of the 1M:1 gap |
| 8 | 35-Billion-Chip Calculator | Kills the brute-force narrative; central to Chapter 2 |
| 14 | Deceptive Alignment Challenge | The emotional climax of Chapter 3 |
| 15 | Trust Accumulation Meter | The "dual progress bar" is a defining visual metaphor |
| 18 | Four-Phase Timeline Scrubber | Backbone of Chapter 4 |
| 23 | Veil of Ignorance Interactive | Drives the moral climax of Chapter 5 |
| 27 | Seven Purposes Navigator | Core navigational element of Chapter 6 |
| 34 | Fibre Strand Callback | Closes the loop |

### Tier 2 -- High Value (Strongly enhances narrative)
Components that significantly deepen understanding or emotional impact.

| # | Component | Reason |
|---|-----------|--------|
| 5 | Water Cost Calculator | Human-scale anchor for abstract resource use |
| 6 | Demand Surge Animation | The "breaking axis" moment is memorable |
| 9 | Supply Chain Dependency Map | Makes geopolitical fragility tangible |
| 10 | 17-Year Shadow Timeline | Central to the "temporal bottleneck" argument |
| 16 | Dependency Ratchet Diagram | Visual metaphor for irreversibility |
| 17 | Technology Dependency Tree | Shows the logic chain of the roadmap |
| 19 | Self-Replication Growth Visualiser | Makes exponential growth tangible |
| 29 | Terrarium Thought Experiment | Key interactive in the resolution chapter |
| 31 | Geopolitical Constraint Map | Grounds the conclusion in actionable present |

### Tier 3 -- Nice to Have (Enriches experience)
Components that add depth and polish but are not structurally essential.

| # | Component | Reason |
|---|-----------|--------|
| 2 | Fibre Scale Counter | Subtle enhancement to the opening |
| 7 | Jevons Paradox Chart | Supporting evidence chart |
| 11 | Humanoid Robot BOM Breakdown | Detailed but not structurally essential |
| 12 | Stranded Asset Scenario | Fun but complex to build |
| 13 | Equipment Lead Time Bars | Simple supporting visual |
| 20 | Closure Problem Slider | Detailed supporting element |
| 21 | Energy Transition Cards | Simple enrichment |
| 22 | Humanoid Robot Cost Curve | Supporting chart |
| 24 | Full Rights Dilemma Matrix | Simple but secondary |
| 25 | East vs. West Cultural Contrast | Rich but not essential |
| 26 | Normative Ethics Comparison | Simple supporting element |
| 28 | Entropy Countdown | Atmospheric but not load-bearing |
| 30 | Invisible Ceiling Timeline | Secondary thought experiment |
| 32 | UBI Viability Calculator | Interesting but peripheral |
| 33 | Regulatory Timeline Scrubber | Supporting detail |

---

## Library Usage Summary

| Library | Components Using It | Notes |
|---------|-------------------|-------|
| D3.js | 3, 6, 7, 8, 9, 10, 11, 13, 17, 18, 19, 20, 22, 27, 31, 33 | Primary visualisation library. Import per-component. |
| GSAP + ScrollTrigger | 1, 3, 4, 6, 9, 15, 16, 18, 20, 21, 25, 26, 28, 33, 34 | Primary scroll-animation library. Import per-component. |
| Vue (islands) | 5, 8, 12, 14, 17, 19, 23, 27, 29, 30, 31, 32 | Used only for components with complex internal state. All client:visible. |
| Vanilla JS + CSS | 2, 24 | Simplest components; no library needed. |
| Three.js / WebGL | Potentially 1 | Only if SVG performance for the fibre glow is insufficient. Evaluate during build. |

---

## Data File Requirements

All static data should live in `/public/data/` as JSON files, loaded per-component:

| File | Components | Content |
|------|-----------|---------|
| `infrastructure-comparison.json` | 3 | GDP comparison data |
| `energy-data.json` | 4, 6, 7 | Brain/silicon comparison, demand surge, Jevons data |
| `water-data.json` | 5 | Query-to-water conversion factors |
| `chip-calculator.json` | 8 | Baseline values for chip deficit model |
| `supply-chain.json` | 9 | Supply chain nodes and edges with geolocation |
| `mine-timeline.json` | 10 | Mine development stage durations |
| `robot-bom.json` | 11 | BOM percentages and descriptions |
| `construction-stages.json` | 12 | Data centre construction stages |
| `lead-times.json` | 13 | Equipment lead time ranges |
| `alignment-scenarios.json` | 14 | Quiz scenarios and explanations |
| `trust-milestones.json` | 15 | Milestone labels for dual bars |
| `ratchet-stages.json` | 16 | Irreversibility stages |
| `tech-tree.json` | 17 | Technology nodes and dependency edges |
| `timeline-phases.json` | 18, 33 | Phase definitions and milestones |
| `replication-model.json` | 19 | Default values for lunar factory model |
| `closure-data.json` | 20 | Material closure ratios by phase |
| `energy-cards.json` | 21 | Three energy technology profiles |
| `robot-cost.json` | 22 | Cost trajectory and milestones |
| `veil-choices.json` | 23 | Choice scenarios and consequences |
| `dilemma-matrix.json` | 24 | Four-cell descriptions |
| `cultural-contrast.json` | 25 | East/West reference pairs |
| `ethics-frameworks.json` | 26 | Framework verdicts and reasoning |
| `seven-purposes.json` | 27 | Purpose definitions and classifications |
| `timescales.json` | 28 | Cosmic timescale markers |
| `terrarium-tree.json` | 29 | Decision tree nodes and outcomes |
| `ceiling-scenarios.json` | 30 | Hypothetical setback scenarios |
| `world-regions.json` | 31 | Region profiles and geopolitical data |
| `geo-boundaries.json` | 31 | TopoJSON world boundaries |
| `ubi-model.json` | 32 | UBI funding model parameters |
| `regulatory-milestones.json` | 33 | Regulatory timeline data |
