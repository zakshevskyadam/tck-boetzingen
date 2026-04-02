import { describe, it, expect } from 'vitest';
import { t, getLang, getLocalizedPath, LANGUAGES } from '../src/i18n/utils';

describe('i18n', () => {
  it('returns German string for de locale', () => {
    expect(t('nav.home', 'de')).toBe('Home');
  });

  it('returns English string for en locale', () => {
    expect(t('nav.home', 'en')).toBe('Home');
  });

  it('falls back to DE if key missing in locale', () => {
    expect(t('nav.home', 'fr')).toBeTruthy();
  });

  it('getLocalizedPath returns unprefixed for de', () => {
    expect(getLocalizedPath('/verein', 'de')).toBe('/verein');
  });

  it('getLocalizedPath prefixes for en', () => {
    expect(getLocalizedPath('/verein', 'en')).toBe('/en/club');
  });

  it('has all 6 languages', () => {
    expect(LANGUAGES).toHaveLength(6);
    expect(LANGUAGES.map(l => l.code)).toEqual(['de', 'en', 'fr', 'ru', 'uk', 'es']);
  });
});
