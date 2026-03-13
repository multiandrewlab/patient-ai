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