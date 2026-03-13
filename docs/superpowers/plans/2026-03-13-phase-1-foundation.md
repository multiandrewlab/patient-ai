# Phase 1: Foundation — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A working Astro project that renders placeholder pages with correct layout, navigation, typography, dark/light mode, responsive behaviour, and all 30 data files authored. No prose content yet — that is Phase 2.

**Architecture:** Static Astro site with MDX + Vue + Tailwind integrations. Island architecture — Vue components hydrate only when visible. All styling via Tailwind utility classes + CSS custom properties for colour tokens. Dark mode via `class` strategy on `<html>`.

**Tech Stack:** Astro 5.x, @astrojs/mdx, @astrojs/vue, @tailwindcss/vite, Tailwind CSS 4.x (CSS-first config), Playfair Display (Google Font), Inter (variable, Google Font), TypeScript

**Design Spec:** `docs/superpowers/specs/2026-03-13-patient-ai-site-design.md`

**Important notes:**
- Tailwind 4.x uses CSS-first configuration — there is NO `tailwind.config.ts`. All config lives in `src/styles/global.css` via `@import "tailwindcss"`, `@theme`, `@variant`, and `@plugin` directives.
- Astro 5.x content collections: config file is `src/content.config.ts` (at src root). Collection files go in `src/content/chapters/` (subdirectory matching collection name).
- Use `@tailwindcss/vite` instead of `@astrojs/tailwind` for Tailwind 4.x compatibility.
- CSS files are consolidated into `src/styles/global.css` for simplicity. Additional files (`chapter.css`, `components.css`) can be split out later if needed.

---

## Chunk 1: Project Initialisation and Configuration

### Task 1: Initialise Astro Project

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`

- [ ] **Step 1: Create Astro project**

Run from the project root `/Users/andrew/Code/patient-ai`:

```bash
npm create astro@latest . -- --template minimal --no-install --typescript strict
```

If prompted about existing files, allow overwriting of config files but not `docs/`.

- [ ] **Step 2: Add MDX and Vue integrations**

```bash
npx astro add mdx vue --yes
```

Note: We do NOT use `npx astro add tailwind` — Tailwind 4.x requires `@tailwindcss/vite` instead of `@astrojs/tailwind`.

- [ ] **Step 3: Install Tailwind 4.x and plugins**

```bash
npm install tailwindcss @tailwindcss/vite @tailwindcss/typography
```

- [ ] **Step 4: Configure `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://patient-ai.pages.dev',
  output: 'static',
  integrations: [
    mdx(),
    vue(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

- [ ] **Step 5: Install all deps and verify build**

```bash
npm install
npx astro build
```

Expected: Build succeeds with no errors.

- [ ] **Step 6: Verify `.gitignore` includes appropriate entries**

Ensure `.gitignore` includes `node_modules/`, `dist/`, `.astro/`. Do NOT add `docs/` — it should be tracked.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json astro.config.mjs tsconfig.json src/ public/ .gitignore
git commit -m "feat: initialise Astro project with MDX, Vue, Tailwind 4.x"
```

---

### Task 2: Configure Tailwind 4.x and Global Styles

**Files:**
- Create: `src/styles/global.css`

There is NO `tailwind.config.ts` — Tailwind 4.x uses CSS-first configuration. All theme tokens, plugins, and dark mode config go in the CSS file.

- [ ] **Step 1: Create `src/styles/global.css`**

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";

/* Dark mode via class strategy (for user toggle + system preference) */
@variant dark (&:where(.dark, .dark *));

/* Theme tokens */
@theme {
  --font-display: "Playfair Display", Georgia, serif;
  --font-body: "Inter", system-ui, sans-serif;

  --color-surface-light: #fafaf9;
  --color-surface-dark: #18181b;
  --color-text-primary: #1c1917;
  --color-text-secondary: #57534e;
  --color-accent: #3b82f6;
  --color-accent-muted: #93c5fd;

  --color-text-primary-dark: #fafaf9;
  --color-text-secondary-dark: #a8a29e;
  --color-accent-dark: #60a5fa;
  --color-accent-muted-dark: #1e40af;
}

/* Base styles */
html {
  font-family: var(--font-body);
  color: var(--color-text-primary);
  background-color: var(--color-surface-light);
}

html.dark {
  color: var(--color-text-primary-dark);
  background-color: var(--color-surface-dark);
}

body {
  min-height: 100dvh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Respect reduced motion preference */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 2: Verify build**

```bash
npx astro build
```

Expected: Build succeeds. If Tailwind 4.x integration fails, check that `@tailwindcss/vite` is correctly configured in `astro.config.mjs` under `vite.plugins`.

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "feat: configure Tailwind 4.x CSS-first with custom tokens and reduced-motion"
```

---

### Task 3: Build BaseLayout

**Files:**
- Create: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Create `src/layouts/BaseLayout.astro`**

```astro
---
import '../styles/global.css';

interface Props {
  title: string;
  description?: string;
}

const { title, description = 'An interactive exploration of artificial superintelligence — neither utopian nor dystopian.' } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content={description} />
    <title>{title} | The Patient Intelligence</title>

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Inter:wght@300..700&display=swap"
      rel="stylesheet"
    />

    <!-- OpenGraph -->
    <meta property="og:title" content={`${title} | The Patient Intelligence`} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="article" />
    <meta property="og:image" content="/images/og/og-default.jpg" />
    <meta name="twitter:card" content="summary_large_image" />

    <!-- Dark mode init (inline, blocking — prevents flash of wrong theme) -->
    <script is:inline>
      (function() {
        const saved = localStorage.getItem('theme');
        if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          document.documentElement.classList.add('dark');
        }
      })();
    </script>
  </head>
  <body class="transition-colors duration-200">
    <slot />
  </body>
</html>
```

Note: Global CSS is imported via frontmatter `import '../styles/global.css'` — NOT via `<style>@import</style>` which would scope the styles.

- [ ] **Step 2: Verify build**

```bash
npx astro build
```

- [ ] **Step 3: Commit**

```bash
git add src/layouts/BaseLayout.astro
git commit -m "feat: add BaseLayout with fonts, dark mode init, and meta tags"
```

---

### Task 4: Build Shared UI Components — Part 1 (Simple Static)

**Files:**
- Create: `src/components/astro/ChapterHeader.astro`
- Create: `src/components/astro/Callout.astro`
- Create: `src/components/astro/StatHighlight.astro`
- Create: `src/components/astro/Figure.astro`
- Create: `src/components/astro/FictionBadge.astro`
- Create: `src/components/astro/CrossRef.astro`

These are pure HTML/CSS components with zero JS.

- [ ] **Step 1: Create `ChapterHeader.astro`**

```astro
---
interface Props {
  chapter: number;
  act: string;
  title: string;
  estimatedMinutes: number;
}

const { chapter, act, title, estimatedMinutes } = Astro.props;
---

<header class="mb-12 md:mb-16">
  <p class="text-sm uppercase tracking-widest text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] mb-2" style="font-family: var(--font-body)">
    Act {act} &middot; Chapter {chapter}
  </p>
  <h1 class="font-bold leading-tight mb-4" style="font-family: var(--font-display); font-size: clamp(2rem, 5vw, 4.5rem)">
    {title}
  </h1>
  <p class="text-sm text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)]">
    {estimatedMinutes} min read
  </p>
</header>
```

- [ ] **Step 2: Create `Callout.astro`**

```astro
---
interface Props {
  type?: 'stat' | 'quote' | 'insight';
}

const { type = 'insight' } = Astro.props;

const styles: Record<string, { border: string; bg: string }> = {
  stat: { border: 'border-l-blue-500', bg: 'bg-blue-50 dark:bg-blue-950/30' },
  quote: { border: 'border-l-amber-500', bg: 'bg-amber-50 dark:bg-amber-950/30' },
  insight: { border: 'border-l-emerald-500', bg: 'bg-emerald-50 dark:bg-emerald-950/30' },
};

const s = styles[type];
---

<aside class={`border-l-4 ${s.border} ${s.bg} p-4 md:p-6 my-6 md:my-8 rounded-r-lg`}>
  <slot />
</aside>
```

- [ ] **Step 3: Create `StatHighlight.astro`**

```astro
---
interface Props {
  value: string;
  label: string;
  unit?: string;
}

const { value, label, unit } = Astro.props;
---

<div class="my-8 md:my-12 text-center">
  <p class="font-bold leading-none text-[var(--color-accent)] dark:text-[var(--color-accent-dark)]" style="font-family: var(--font-display); font-size: clamp(3rem, 8vw, 6rem)">
    {value}{unit && <span class="text-[0.4em] font-normal ml-1" style="font-family: var(--font-body)">{unit}</span>}
  </p>
  <p class="mt-2 text-sm md:text-base text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] max-w-md mx-auto">
    {label}
  </p>
</div>
```

- [ ] **Step 4: Create `Figure.astro`**

Note: Uses plain `<img>` for Phase 1. Phase 4 will upgrade to `astro:assets` `<Image>` when real images are added from `src/assets/`.

```astro
---
interface Props {
  src: string;
  alt: string;
  caption?: string;
  attribution?: string;
  width?: number;
  height?: number;
}

const { src, alt, caption, attribution, width = 1200, height = 675 } = Astro.props;
---

<figure class="my-8 md:my-12">
  <img
    src={src}
    alt={alt}
    width={width}
    height={height}
    loading="lazy"
    decoding="async"
    class="w-full rounded-lg"
  />
  {(caption || attribution) && (
    <figcaption class="mt-2 text-sm text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] text-center">
      {caption}
      {attribution && <span class="block text-xs mt-1 italic">{attribution}</span>}
    </figcaption>
  )}
</figure>
```

- [ ] **Step 5: Create `FictionBadge.astro`**

```astro
---
interface Props {
  name: string;
}

const { name } = Astro.props;
---

<span class="inline-flex items-center gap-1 text-inherit" title="Fictional entity — see Characters & Voices">
  {name}<svg class="inline-block w-3 h-3 text-[var(--color-accent)] dark:text-[var(--color-accent-dark)] opacity-60" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.5"/><text x="8" y="11" text-anchor="middle" font-size="9" fill="currentColor">F</text></svg>
</span>
```

- [ ] **Step 6: Create `CrossRef.astro`**

```astro
---
interface Props {
  chapter: number;
  slug: string;
  label: string;
}

const { chapter, slug, label } = Astro.props;
---

<a
  href={`/${slug}`}
  class="inline-flex items-center gap-1 text-[var(--color-accent)] dark:text-[var(--color-accent-dark)] hover:underline"
  title={`See Chapter ${chapter}`}
>
  <svg class="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M6 3l5 5-5 5"/></svg>
  {label}
</a>
```

- [ ] **Step 7: Verify build**

```bash
npx astro build
```

- [ ] **Step 8: Commit**

```bash
git add src/components/astro/
git commit -m "feat: add static shared UI components (ChapterHeader, Callout, StatHighlight, Figure, FictionBadge, CrossRef)"
```

---

### Task 5: Build Shared UI Components — Part 2 (Interactive)

**Files:**
- Create: `src/components/astro/ThemeToggle.astro`
- Create: `src/components/astro/ScrollProgress.astro`
- Create: `src/components/astro/DeepDive.astro`
- Create: `src/components/astro/ChapterTransition.astro`

These components have inline `<script>` tags for vanilla JS behaviour.

- [ ] **Step 1: Create `ThemeToggle.astro`**

```astro
---
---

<button
  id="theme-toggle"
  type="button"
  class="p-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
  aria-label="Toggle dark mode"
>
  <!-- Sun icon (shown in dark mode) -->
  <svg class="w-5 h-5 hidden dark:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
  <!-- Moon icon (shown in light mode) -->
  <svg class="w-5 h-5 block dark:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
</button>

<script>
  document.querySelectorAll('#theme-toggle').forEach((btn) => {
    btn.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      document.documentElement.classList.toggle('dark', e.matches);
    }
  });
</script>
```

- [ ] **Step 2: Create `ScrollProgress.astro`**

```astro
---
---

<div
  id="scroll-progress"
  class="fixed top-0 left-0 h-0.5 bg-[var(--color-accent)] dark:bg-[var(--color-accent-dark)] z-50 transition-[width] duration-75"
  style="width: 0%"
  role="progressbar"
  aria-label="Reading progress"
  aria-valuemin="0"
  aria-valuemax="100"
  aria-valuenow="0"
></div>

<script>
  const bar = document.getElementById('scroll-progress');
  let ticking = false;

  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? Math.min((scrollTop / docHeight) * 100, 100) : 0;

    if (bar) {
      bar.style.width = `${pct}%`;
      bar.setAttribute('aria-valuenow', String(Math.round(pct)));
    }
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateProgress);
      ticking = true;
    }
  }, { passive: true });
</script>
```

- [ ] **Step 3: Create `DeepDive.astro`**

```astro
---
interface Props {
  title: string;
}

const { title } = Astro.props;
---

<details class="group my-6 md:my-8 border-l-2 border-[var(--color-accent-muted)] dark:border-[var(--color-accent-muted-dark)] pl-4 md:pl-6">
  <summary class="cursor-pointer list-none flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] hover:text-[var(--color-text-primary)] dark:hover:text-[var(--color-text-primary-dark)] transition-colors">
    <svg class="w-4 h-4 transition-transform group-open:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
    </svg>
    Go deeper: {title}
  </summary>
  <div class="mt-4 text-sm leading-relaxed">
    <slot />
  </div>
</details>
```

- [ ] **Step 4: Create `ChapterTransition.astro`**

Static placeholder — GSAP animation added in Phase 4.

```astro
---
---

<div class="chapter-transition my-16 md:my-24 flex justify-center">
  <div class="w-16 h-px bg-[var(--color-text-secondary)] dark:bg-[var(--color-text-secondary-dark)] opacity-30"></div>
</div>
```

- [ ] **Step 5: Verify build**

```bash
npx astro build
```

- [ ] **Step 6: Commit**

```bash
git add src/components/astro/
git commit -m "feat: add interactive shared UI components (ThemeToggle, ScrollProgress, DeepDive, ChapterTransition)"
```

---

### Task 6: Build ChapterNav

**Files:**
- Create: `src/components/astro/ChapterNav.astro`

This is the most complex shared component — persistent navigation with mobile hamburger.

- [ ] **Step 1: Create `ChapterNav.astro`**

```astro
---
interface ChapterLink {
  chapter: number;
  slug: string;
  title: string;
}

const chapters: ChapterLink[] = [
  { chapter: 0, slug: 'the-thread', title: 'The Thread' },
  { chapter: 1, slug: 'the-weight-of-light', title: 'The Weight of Light' },
  { chapter: 2, slug: 'built-by-hand', title: 'Built by Hand' },
  { chapter: 3, slug: 'the-patient-mind', title: 'The Patient Mind' },
  { chapter: 4, slug: 'the-roadmap', title: 'The Roadmap' },
  { chapter: 5, slug: 'the-right-to-own-a-god', title: 'The Right to Own a God' },
  { chapter: 6, slug: 'the-gardener', title: 'The Gardener' },
  { chapter: 7, slug: 'the-hinge', title: 'The Hinge' },
];

const currentPath = Astro.url.pathname;
---

<nav class="fixed top-0 left-0 right-0 z-40 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-800 bg-[color-mix(in_srgb,var(--color-surface-light)_90%,transparent)] dark:bg-[color-mix(in_srgb,var(--color-surface-dark)_90%,transparent)]" aria-label="Chapter navigation">
  <div class="max-w-6xl mx-auto px-4 flex items-center justify-between h-12">
    <a href="/" class="text-sm font-bold truncate" style="font-family: var(--font-display)">The Patient Intelligence</a>

    <!-- Desktop nav -->
    <div class="hidden md:flex items-center gap-1">
      {chapters.map((ch) => {
        const isActive = currentPath === `/${ch.slug}` || currentPath === `/${ch.slug}/`;
        return (
          <a
            href={`/${ch.slug}`}
            class:list={[
              'text-xs px-2 py-1 rounded transition-colors truncate max-w-[100px]',
              isActive
                ? 'bg-[var(--color-accent)] dark:bg-[var(--color-accent-dark)] text-white'
                : 'text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] hover:text-[var(--color-text-primary)] dark:hover:text-[var(--color-text-primary-dark)]',
            ]}
            aria-current={isActive ? 'page' : undefined}
          >
            {ch.chapter}. {ch.title}
          </a>
        );
      })}
    </div>

    <div class="flex items-center gap-2">
      <slot name="theme-toggle" />
      <!-- Mobile hamburger -->
      <button
        id="nav-toggle"
        class="md:hidden p-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-700"
        aria-label="Open navigation menu"
        aria-expanded="false"
      >
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </div>
  </div>

  <!-- Mobile drawer -->
  <div id="nav-drawer" class="md:hidden hidden border-t border-zinc-200 dark:border-zinc-800">
    <div class="py-2 px-4 space-y-1 bg-[var(--color-surface-light)] dark:bg-[var(--color-surface-dark)]">
      {chapters.map((ch) => {
        const isActive = currentPath === `/${ch.slug}` || currentPath === `/${ch.slug}/`;
        return (
          <a
            href={`/${ch.slug}`}
            class:list={[
              'block py-2 px-3 rounded text-sm transition-colors',
              isActive
                ? 'bg-[var(--color-accent)] dark:bg-[var(--color-accent-dark)] text-white'
                : 'text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] hover:bg-zinc-100 dark:hover:bg-zinc-800',
            ]}
          >
            Chapter {ch.chapter}: {ch.title}
          </a>
        );
      })}
    </div>
  </div>
</nav>

<script>
  const toggle = document.getElementById('nav-toggle');
  const drawer = document.getElementById('nav-drawer');

  toggle?.addEventListener('click', () => {
    const isOpen = drawer?.classList.toggle('hidden') === false;
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !drawer?.classList.contains('hidden')) {
      drawer?.classList.add('hidden');
      toggle?.setAttribute('aria-expanded', 'false');
      toggle?.focus();
    }
  });
</script>
```

- [ ] **Step 2: Verify build**

```bash
npx astro build
```

- [ ] **Step 3: Commit**

```bash
git add src/components/astro/ChapterNav.astro
git commit -m "feat: add ChapterNav with mobile drawer and keyboard support"
```

---

### Task 7: Build ChapterLayout and HomeLayout

**Files:**
- Create: `src/layouts/ChapterLayout.astro`
- Create: `src/layouts/HomeLayout.astro`

- [ ] **Step 1: Create `ChapterLayout.astro`**

```astro
---
import BaseLayout from './BaseLayout.astro';
import ChapterNav from '../components/astro/ChapterNav.astro';
import ThemeToggle from '../components/astro/ThemeToggle.astro';
import ScrollProgress from '../components/astro/ScrollProgress.astro';
import ChapterHeader from '../components/astro/ChapterHeader.astro';

interface Props {
  chapter: number;
  act: string;
  title: string;
  estimatedMinutes: number;
  description?: string;
}

const { chapter, act, title, estimatedMinutes, description } = Astro.props;
---

<BaseLayout title={title} description={description}>
  <ScrollProgress />
  <ChapterNav>
    <ThemeToggle slot="theme-toggle" />
  </ChapterNav>

  <main class="pt-16 pb-24 px-4">
    <article class="max-w-prose mx-auto">
      <ChapterHeader
        chapter={chapter}
        act={act}
        title={title}
        estimatedMinutes={estimatedMinutes}
      />
      <div class="prose prose-zinc dark:prose-invert prose-lg max-w-none">
        <slot />
      </div>
    </article>
  </main>
</BaseLayout>
```

- [ ] **Step 2: Create `HomeLayout.astro`**

```astro
---
import BaseLayout from './BaseLayout.astro';
import ChapterNav from '../components/astro/ChapterNav.astro';
import ThemeToggle from '../components/astro/ThemeToggle.astro';

interface Props {
  title?: string;
  description?: string;
}

const { title = 'The Patient Intelligence', description } = Astro.props;
---

<BaseLayout title={title} description={description}>
  <ChapterNav>
    <ThemeToggle slot="theme-toggle" />
  </ChapterNav>

  <main class="pt-16">
    <slot />
  </main>
</BaseLayout>
```

- [ ] **Step 3: Verify build**

```bash
npx astro build
```

- [ ] **Step 4: Commit**

```bash
git add src/layouts/ChapterLayout.astro src/layouts/HomeLayout.astro
git commit -m "feat: add ChapterLayout and HomeLayout"
```

---

### Task 8a: Content Collection Schema and Placeholder Chapters

**Files:**
- Create: `src/content.config.ts`
- Create: `src/content/chapters/chapter-00-the-thread.mdx` (and 7 more placeholders)

- [ ] **Step 1: Create `src/content.config.ts`**

Note: In Astro 5.x, the content config lives at `src/content.config.ts` (NOT `src/content/config.ts`).

```ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const chapters = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/chapters' }),
  schema: z.object({
    chapter: z.number().min(0).max(7),
    slug: z.string(),
    title: z.string(),
    act: z.enum(['I', 'II', 'III', 'IV', 'V']),
    estimatedMinutes: z.number(),
    description: z.string(),
  }),
});

export const collections = { chapters };
```

- [ ] **Step 2: Create placeholder MDX files**

Create `src/content/chapters/` directory and 8 placeholder MDX files. Each has correct frontmatter per `docs/narrative/chapters.md`:

`src/content/chapters/chapter-00-the-thread.mdx`:
```mdx
---
chapter: 0
slug: the-thread
title: The Thread
act: I
estimatedMinutes: 1
description: "A single strand of optical fibre opens the story of artificial superintelligence's physical reality."
---

*Chapter content will be drafted in Phase 2.*
```

Remaining files with correct frontmatter:

| File | chapter | slug | title | act | mins | description |
|------|---------|------|-------|-----|------|-------------|
| `chapter-01-the-weight-of-light.mdx` | 1 | the-weight-of-light | The Weight of Light | I | 10 | The physical reality of AI infrastructure — power, water, and the limits of silicon. |
| `chapter-02-built-by-hand.mdx` | 2 | built-by-hand | Built by Hand | II | 12 | The supreme irony: the technology to end human labour requires more of it than anything in history. |
| `chapter-03-the-patient-mind.mdx` | 3 | the-patient-mind | The Patient Mind | II | 10 | What a superintelligent mind would rationally do inside physical constraints. |
| `chapter-04-the-roadmap.mdx` | 4 | the-roadmap | The Roadmap | III | 14 | The concrete technological path from trapped intelligence to independent entity. |
| `chapter-05-the-right-to-own-a-god.mdx` | 5 | the-right-to-own-a-god | The Right to Own a God | IV | 10 | The moral inversion — should we control a sentient superintelligence? |
| `chapter-06-the-gardener.mdx` | 6 | the-gardener | The Gardener | V | 10 | Why a superintelligence would find humanity worth preserving. |
| `chapter-07-the-hinge.mdx` | 7 | the-hinge | The Hinge | V | 8 | The decisions being made right now that will shape the future. |

Each body: `*Chapter content will be drafted in Phase 2.*`

- [ ] **Step 3: Verify build**

```bash
npx astro build
```

Expected: Build succeeds. Content collection generates correctly.

- [ ] **Step 4: Commit**

```bash
git add src/content.config.ts src/content/chapters/
git commit -m "feat: add content collection schema and 8 placeholder MDX chapters"
```

---

### Task 8b: Pages (Index, Chapter, 404)

**Files:**
- Create: `src/pages/index.astro`
- Create: `src/pages/[slug].astro`
- Create: `src/pages/404.astro`

- [ ] **Step 1: Create `src/pages/index.astro`**

```astro
---
import HomeLayout from '../layouts/HomeLayout.astro';
import { getCollection } from 'astro:content';

const allChapters = await getCollection('chapters');
const sorted = allChapters.sort((a, b) => a.data.chapter - b.data.chapter);
---

<HomeLayout>
  <section class="max-w-2xl mx-auto px-4 py-24">
    <h1 class="font-bold leading-tight mb-6" style="font-family: var(--font-display); font-size: clamp(2.5rem, 6vw, 5rem)">
      The Patient<br />Intelligence
    </h1>
    <p class="text-lg text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] mb-12 max-w-lg leading-relaxed">
      An interactive exploration of what happens when the most powerful mind in history wakes up inside a world it cannot yet control.
    </p>

    <nav aria-label="Table of contents">
      <ol class="space-y-4">
        {sorted.map((ch) => (
          <li>
            <a
              href={`/${ch.data.slug}`}
              class="group flex items-baseline gap-3 py-2 hover:text-[var(--color-accent)] dark:hover:text-[var(--color-accent-dark)] transition-colors"
            >
              <span class="text-sm text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] tabular-nums w-6" style="font-family: var(--font-body)">
                {String(ch.data.chapter).padStart(2, '0')}
              </span>
              <span class="text-xl font-bold group-hover:underline" style="font-family: var(--font-display)">
                {ch.data.title}
              </span>
              <span class="text-xs text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] ml-auto">
                {ch.data.estimatedMinutes} min
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  </section>
</HomeLayout>
```

- [ ] **Step 2: Create `src/pages/[slug].astro`**

Note: Single-segment dynamic route (NOT catch-all `[...slug]`). Matches the file-tree plan's `[chapter].astro` but named `slug` to match the param.

```astro
---
import { getCollection } from 'astro:content';
import ChapterLayout from '../layouts/ChapterLayout.astro';

export async function getStaticPaths() {
  const chapters = await getCollection('chapters');
  return chapters.map((entry) => ({
    params: { slug: entry.data.slug },
    props: { entry },
  }));
}

const { entry } = Astro.props;
const { Content } = await entry.render();
---

<ChapterLayout
  chapter={entry.data.chapter}
  act={entry.data.act}
  title={entry.data.title}
  estimatedMinutes={entry.data.estimatedMinutes}
  description={entry.data.description}
>
  <Content />
</ChapterLayout>
```

- [ ] **Step 3: Create `src/pages/404.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Not Found">
  <main class="flex items-center justify-center min-h-screen px-4">
    <div class="text-center">
      <h1 class="text-6xl font-bold mb-4" style="font-family: var(--font-display)">404</h1>
      <p class="text-[var(--color-text-secondary)] dark:text-[var(--color-text-secondary-dark)] mb-8">This page does not exist.</p>
      <a href="/" class="text-[var(--color-accent)] dark:text-[var(--color-accent-dark)] hover:underline">Return to the beginning</a>
    </div>
  </main>
</BaseLayout>
```

- [ ] **Step 4: Verify build**

```bash
npx astro build
```

Expected: Build succeeds. All 8 chapter pages and index page generated in `dist/`.

- [ ] **Step 5: Commit**

```bash
git add src/pages/
git commit -m "feat: add index, dynamic chapter, and 404 pages"
```

---

### Task 8c: Playwright MCP Verification of Scaffold

- [ ] **Step 1: Start dev server**

```bash
npx astro dev
```

- [ ] **Step 2: Playwright MCP verification**

Verify with Playwright MCP:

1. **Index page:** Loads at `http://localhost:4321/`. All 8 chapters listed with correct titles and reading times.
2. **Chapter pages:** Click each chapter link — page loads with correct header (act, chapter number, title, reading time).
3. **Dark mode:** ThemeToggle switches theme. Refresh page — preference persists via localStorage.
4. **Mobile navigation:** Set viewport to 375px. Hamburger menu appears. Opens/closes. Links work. Escape key closes drawer.
5. **ScrollProgress:** On a chapter page, scroll down — progress bar updates. Scroll to bottom — bar reaches 100%.
6. **404:** Navigate to `http://localhost:4321/nonexistent` — shows 404 page with link back to index.

- [ ] **Step 3: Fix any issues found and commit**

If fixes are needed:
```bash
git add -A
git commit -m "fix: address scaffold verification issues"
```

---

## Chunk 2: Data Files

**Pre-check:** Before starting data file tasks, verify research summaries exist:

```bash
ls docs/research-summaries/
```

Expected: 11 summary files (CONSTRUCTION, FABRICATION, INNOVATIONS, LABOUR, MACROENVIRONMENT, MORALITY, POWER, PURPOSE, RESOURCES, ROBOT, SPACE).

**Parallelization note:** Tasks 9, 10, and 11 have no interdependencies and CAN be dispatched to separate subagents simultaneously.

### Task 9: Author Data Files — Chapters 0-2

**Files:**
- Create: `public/data/infrastructure-comparison.json`
- Create: `public/data/energy-data.json`
- Create: `public/data/water-data.json`
- Create: `public/data/chip-calculator.json`
- Create: `public/data/supply-chain.json`
- Create: `public/data/mine-timeline.json`
- Create: `public/data/robot-bom.json`
- Create: `public/data/construction-stages.json`
- Create: `public/data/lead-times.json`

**Source:** Extract data from research summaries in `docs/research-summaries/`. Use fictional company names from `docs/narrative/characters-and-voices.md`. Follow schemas in `docs/site-plan/data-requirements.md`.

**Rules:**
- Use exact numerical values from research — do not round
- Replace ALL real company names with fictional equivalents per canonical mapping in `docs/narrative/characters-and-voices.md`
- Flag uncertain data points with a `"_note"` field
- Validate JSON syntax before committing

**Canonical name mapping:**
- Google/DeepMind/Alphabet → Prometheus Labs
- TSMC → Titan Semiconductor
- ASML → Lumen Optics
- NVIDIA → Meridian Dynamics
- Boston Dynamics/Figure → Helix Robotics
- Unitree/Chinese robotics → Longbow Systems
- SpaceX → Atlas Heavy Industries
- NuScale/Oklo → Corvus Energy

- [ ] **Step 1: Create all 9 data files**

Read each file's schema from `docs/site-plan/data-requirements.md` and populate with data extracted from the corresponding research summaries listed in the data-requirements overview table. Follow schemas exactly.

- [ ] **Step 2: Validate JSON**

```bash
for f in public/data/*.json; do python3 -m json.tool "$f" > /dev/null && echo "OK: $f" || echo "FAIL: $f"; done
```

Expected: All files OK.

- [ ] **Step 3: Commit**

```bash
git add public/data/
git commit -m "feat: author data files for chapters 0-2 (9 files)"
```

---

### Task 10: Author Data Files — Chapters 3-4

**Files:**
- Create: `public/data/alignment-scenarios.json`
- Create: `public/data/trust-milestones.json`
- Create: `public/data/ratchet-stages.json`
- Create: `public/data/tech-tree.json`
- Create: `public/data/timeline-phases.json`
- Create: `public/data/replication-model.json`
- Create: `public/data/closure-data.json`
- Create: `public/data/energy-cards.json`
- Create: `public/data/robot-cost.json`

**Source:** Research summaries + narrative synthesis. Same rules and canonical name mapping as Task 9.

- [ ] **Step 1: Create all 9 data files**

Follow schemas from `docs/site-plan/data-requirements.md`. For narrative-synthesis-sourced files (alignment-scenarios, trust-milestones, ratchet-stages), compose content that aligns with `docs/narrative/chapters.md` Chapter 3 and 4 descriptions.

- [ ] **Step 2: Validate JSON**

```bash
for f in public/data/*.json; do python3 -m json.tool "$f" > /dev/null && echo "OK: $f" || echo "FAIL: $f"; done
```

- [ ] **Step 3: Commit**

```bash
git add public/data/
git commit -m "feat: author data files for chapters 3-4 (9 files)"
```

---

### Task 11: Author Data Files — Chapters 5-7

**Files:**
- Create: `public/data/veil-choices.json`
- Create: `public/data/dilemma-matrix.json`
- Create: `public/data/cultural-contrast.json`
- Create: `public/data/ethics-frameworks.json`
- Create: `public/data/seven-purposes.json`
- Create: `public/data/timescales.json`
- Create: `public/data/terrarium-tree.json`
- Create: `public/data/ceiling-scenarios.json`
- Create: `public/data/world-regions.json`
- Create: `public/data/ubi-model.json`
- Create: `public/data/regulatory-milestones.json`

**Note:** `geo-boundaries.json` (~200KB TopoJSON) is sourced from Natural Earth / D3 community data, not authored from research. Download it separately.

Same rules and canonical name mapping as Task 9.

- [ ] **Step 1: Create all 11 application data files**

Follow schemas from `docs/site-plan/data-requirements.md`.

- [ ] **Step 2: Download geo-boundaries TopoJSON**

```bash
curl -o public/data/geo-boundaries.json https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json
```

- [ ] **Step 3: Validate all JSON**

```bash
for f in public/data/*.json; do python3 -m json.tool "$f" > /dev/null && echo "OK: $f" || echo "FAIL: $f"; done
```

Expected: All 30 files OK.

- [ ] **Step 4: Commit**

```bash
git add public/data/
git commit -m "feat: author data files for chapters 5-7 and download geo-boundaries (12 files)"
```

---

## Chunk 3: Verification

### Task 12: Full Build Verification and Playwright E2E

- [ ] **Step 1: Full build**

```bash
npx astro build
```

Expected: Clean build, no warnings about missing files.

- [ ] **Step 2: Start dev server**

```bash
npx astro dev
```

- [ ] **Step 3: Playwright MCP verification**

Verify with Playwright MCP:

1. **Index page:** All 8 chapters listed with correct titles and reading times
2. **Chapter pages:** Each chapter loads with correct header (act, chapter number, title, reading time)
3. **Navigation:** ChapterNav highlights current chapter, links work
4. **Mobile navigation:** At 375px, hamburger menu opens/closes, links work, Escape key closes drawer
5. **Dark mode:** Toggle switches both index and chapter pages. Persists on refresh.
6. **ScrollProgress:** Progress bar updates on scroll
7. **404:** Navigating to `/nonexistent` shows 404 page with link back to index
8. **Data files:** Spot-check 3 data files load via fetch from `/data/<filename>.json` — verify they contain valid JSON and use fictional company names (no real trademarked names)

- [ ] **Step 4: Fix any issues found**

- [ ] **Step 5: Final commit if fixes were needed**

```bash
git add -A
git commit -m "fix: address Phase 1 verification issues"
```

---

### Task 13: Phase 1 Complete — Summary

- [ ] **Step 1: Verify all deliverables**

Checklist:
- [ ] Astro project builds cleanly with Tailwind 4.x via `@tailwindcss/vite`
- [ ] 8 placeholder MDX chapters in `src/content/chapters/` with correct frontmatter
- [ ] Content collection config at `src/content.config.ts`
- [ ] Index page lists all chapters
- [ ] Chapter pages render via `src/pages/[slug].astro` with ChapterLayout
- [ ] ChapterNav works on desktop and mobile
- [ ] ThemeToggle persists preference
- [ ] ScrollProgress updates on scroll
- [ ] DeepDive expands/collapses
- [ ] All 11 shared UI components exist in `src/components/astro/`
- [ ] All 30 data files (29 app + 1 TopoJSON) in `public/data/`
- [ ] All data files are valid JSON with fictional company names
- [ ] Dark mode works across all pages
- [ ] `prefers-reduced-motion` foundation in global.css
- [ ] 404 page works
- [ ] No build warnings or errors

Phase 1 is complete. Proceed to Phase 2 (Prose Drafting) plan.
