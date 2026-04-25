import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import yaml from '@rollup/plugin-yaml';

export default defineConfig({
  site: 'https://www.tck-boetzingen.de',
  output: 'static',
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss(), yaml()],
  },
  i18n: {
    defaultLocale: 'de',
    locales: ['de', 'en', 'fr', 'ru', 'uk', 'es'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
