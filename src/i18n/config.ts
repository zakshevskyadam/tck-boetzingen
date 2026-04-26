export const LANGUAGES = [
  { code: 'de', name: 'Deutsch', flag: 'DE' },
  { code: 'en', name: 'English', flag: 'EN' },
  { code: 'fr', name: 'Français', flag: 'FR' },
  { code: 'ru', name: 'Русский', flag: 'RU' },
  { code: 'uk', name: 'Українська', flag: 'UK' },
  { code: 'es', name: 'Español', flag: 'ES' },
] as const;

export type Lang = (typeof LANGUAGES)[number]['code'];
export const DEFAULT_LANG: Lang = 'de';

export const ROUTE_MAP: Record<string, Record<Lang, string>> = {
  '/': { de: '/', en: '/', fr: '/', ru: '/', uk: '/', es: '/' },
  '/verein': { de: '/verein', en: '/club', fr: '/club', ru: '/club', uk: '/club', es: '/club' },
  '/termine': { de: '/termine', en: '/events', fr: '/events', ru: '/events', uk: '/events', es: '/events' },
  '/kontakt': { de: '/kontakt', en: '/contact', fr: '/contact', ru: '/contact', uk: '/contact', es: '/contact' },
  '/datenschutz': { de: '/datenschutz', en: '/privacy', fr: '/privacy', ru: '/privacy', uk: '/privacy', es: '/privacy' },
  '/impressum': { de: '/impressum', en: '/imprint', fr: '/imprint', ru: '/imprint', uk: '/imprint', es: '/imprint' },
};
