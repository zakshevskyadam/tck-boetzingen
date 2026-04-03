import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'fs';

describe('build output', () => {
  it('generates index.html', () => {
    expect(existsSync('dist/index.html')).toBe(true);
  });
  it('generates sitemap', () => {
    expect(existsSync('dist/sitemap-index.xml')).toBe(true);
  });
  it('generates all language variants', () => {
    ['en', 'fr', 'ru', 'uk', 'es'].forEach(lang => {
      expect(existsSync(`dist/${lang}/index.html`)).toBe(true);
    });
  });
  it('includes hreflang tags', () => {
    const html = readFileSync('dist/index.html', 'utf-8');
    expect(html).toContain('hreflang="de"');
    expect(html).toContain('hreflang="en"');
  });
});
