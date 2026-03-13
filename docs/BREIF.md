# Project Brief: Patient AI - The slow takeover

The aim of this project is to create an interative web based experience that tells a story of the rise of artificial superintelligence. The aim is to move away from sensationalist naratives on either end of the utopia/dystopia spectrum and instead to provide a more nuanced and realistic portrayal of the potential futures that await us.

## IMPORTANT MUST FOLLOW

- Do not use any trademarked names (e.g. OpenAI, Google, Microsoft, etc.), instead come up with creative fictional names for the companies and organizations involved.

## Key Aims

- Provide a nuanced and realistic portrayal of the future layed out in the PROPOSAL.md file
- Create a narrative that is engaging and thought-provoking
- Turn the combined research into a cohesive and engaging narrative, ensuring we don't just present a list of facts and figures, but also don't lose the nuance and detail of the research
- Make the experience multimedia and interactive to enhance the experience and boost the impact
- The style of the website should be clean and clear, with a touch of whimsy and fun, but still maintain a serious tone appropriate to the subject matter.

# Tech Stack & Guidelines

## Stack

- **Astro** — core framework, static-first, island architecture
- **MDX** — narrative content authored as Markdown with embedded components
- **Vue** — island components only, for interactive elements with complex state
- **Tailwind CSS** — styling, mobile-first responsive design
- **Vanilla JS** — default for client-side interactivity via Astro `<script>` tags

## Interactive Libraries (lazy-loaded per component)

- **D3.js** — data visualisations and custom charts
- **GSAP + ScrollTrigger** — scroll-driven narrative animations ("scrollytelling")
- **Three.js** — 3D elements (only where needed)

## Key Principles

1. **Static by default.** Narrative prose renders as pure HTML/CSS with zero JS. Only interactive elements ship JavaScript.
2. **Vanilla JS first.** Reach for D3, GSAP, or plain `<script>` tags before using a Vue island. Use Vue only when managing component state by hand becomes unwieldy.
3. **Lazy hydration.** All Vue islands must use `client:visible` so they hydrate only when scrolled into view.
4. **Minimal bundles.** Import libraries per-component, never globally. No global D3 or Three.js imports.
5. **Mobile and desktop.** All layouts and interactive elements must be responsive. Use Tailwind breakpoints (`sm:`, `md:`, `lg:`). Test touch interactions.
6. **Content lives in MDX.** Each narrative section/chapter is an `.mdx` file in `src/content/`. Interactive components are embedded inline within the prose.
7. **Dark mode.** The website should have a dark mode and a light mode. The user should be able to switch between the two. The default should detect the user's system preference.
8. **Image generation** Come up with prompts for Nano Banana to generate images that fit the narrative, and place them in the `docs/prompts/images/` directory, user will run the prompts to generate the images. Come up with a cohesive style for the images and add a shared prompt (saved as a seperate file) that is prepended to the top of each prompt to ensure the style is consistent.

## Project Structure

```
docs/.            # Research and planning, should be excluded from the build
src/
  content/        # MDX narrative files (chapters/sections)
  components/     # Astro components (static) and Vue islands (interactive)
  layouts/        # Page layouts, navigation, scroll tracking
  styles/         # Global Tailwind config and any shared CSS
public/           # Static assets (images, data files, fonts)
```

## Deployment

- Target: **Cloudflare Pages** (or any static CDN)
- Build: `astro build` → static `dist/` folder
- No server-side functions required


