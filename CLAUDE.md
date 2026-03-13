# Patient AI — Project Intelligence

## Project Overview

This is an interactive web experience telling the story of artificial superintelligence's rise. The tone is nuanced and realistic — neither utopian nor dystopian. See `BREIF.md` for full project brief and `PROPOSAL.md` for the core thesis.

## CRITICAL RULES

- **NO trademarked names** — Never use real company names (OpenAI, Google, Microsoft, DeepMind, Meta, etc.). Use fictional replacements.
- **Nuance over sensationalism** — This is not a doom piece or a hype piece.

## Research-to-Site Pipeline

This project uses a three-phase multi-agent pipeline to process ~600KB of research into an interactive site plan. The research lives in `docs/research/` as markdown files.

### Phase 1: Research Distillation

**Goal**: Compress raw research into structured summaries that fit in a single context window.

**How to run**: Spawn one `@research-distiller` subagent per research file (or small batch of related files). Run them in parallel where possible.

```
For each file in docs/research/:
  → Spawn @research-distiller with instruction:
    "Read and distil {filename}. Write summary to docs/research-summaries/{filename}-summary.md.
     Also read PROPOSAL.md for context on how this research fits the overall thesis."
```

**Batching strategy**: If files are small (<10KB), batch 3-5 per subagent. If large (>30KB), one per subagent. Check file sizes first with `wc -c docs/research/*.md`.

**Output**: `docs/research-summaries/` filled with structured summaries (~20% of original size).

**Verification**: After all subagents complete, scan summaries for completeness:
- Every research file should have a corresponding summary
- Summaries should flag any real company names found
- Check that key evidence and data points are preserved

### Phase 2: Narrative Synthesis

**Goal**: Turn distilled research into a cohesive story plan.

**How to run**: Spawn one `@narrative-synthesiser` subagent. It reads all summaries (now small enough to fit in context) plus PROPOSAL.md and BREIF.md.

```
Spawn @narrative-synthesiser with instruction:
  "Read all files in docs/research-summaries/, plus PROPOSAL.md and BREIF.md.
   Produce the full narrative plan in docs/narrative/."
```

**Output**: `docs/narrative/` with story-arc.md, chapters.md, characters-and-voices.md, interactive-map.md.

**Verification**: Review the narrative plan before proceeding to Phase 3. Check:
- Does the story flow logically?
- Are all research themes represented?
- Are interactive elements justified by the narrative?
- Is the pacing varied (dense analysis → visual breathers)?

### Phase 3: Site Planning

**Goal**: Turn the narrative plan into a buildable technical specification.

**How to run**: Spawn one `@site-planner` subagent.

```
Spawn @site-planner with instruction:
  "Read docs/narrative/, BREIF.md, and PROPOSAL.md.
   Produce the complete site plan in docs/site-plan/."
```

**Output**: `docs/site-plan/` with file-tree.md, components.md, data-requirements.md, image-prompts.md, build-order.md.

### Running the Full Pipeline

To run all three phases in sequence:

```
/user-prompt Run the research-to-site pipeline:

1. First, list all files in docs/research/ and check their sizes
2. Spawn @research-distiller agents to process all research files (batch small files, parallelise where possible)
3. Once all distillers complete, verify all summaries exist in docs/research-summaries/
4. Spawn @narrative-synthesiser to create the story plan from the summaries
5. Review the narrative output, then spawn @site-planner to create the technical plan
6. Present final outputs for review
```

## Tech Stack Reference

- Astro (static-first, islands) + MDX + Vue (islands only) + Tailwind
- D3.js, GSAP+ScrollTrigger, Three.js — all lazy-loaded per component
- Dark/light mode with system preference detection
- Target: Cloudflare Pages static deployment

## Directory Structure

```
docs/
  research/              # Raw research markdown (~600KB total)
  research-summaries/    # Phase 1 output: structured summaries
  narrative/             # Phase 2 output: story plan
  site-plan/             # Phase 3 output: technical build plan
  prompts/images/        # AI image generation prompts
src/                     # Site source (built after planning)
public/                  # Static assets
```
