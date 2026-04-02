import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import keystatic from '@keystatic/astro';
import netlify from '@astrojs/netlify';

export default defineConfig({
  site: 'https://www.tck-boetzingen.de',
  output: 'static',
  adapter: netlify(),
  integrations: [react(), sitemap(), keystatic()],
  vite: {
    plugins: [tailwindcss()],
  },
  i18n: {
    defaultLocale: 'de',
    locales: ['de', 'en', 'fr', 'ru', 'uk', 'es'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
