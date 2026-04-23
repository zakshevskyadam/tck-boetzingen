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
  '/tennishalle': { de: '/tennishalle', en: '/tennis-hall', fr: '/salle-de-tennis', ru: '/tennisnyj-zal', uk: '/tenisnyj-zal', es: '/sala-de-tenis' },
  '/mitgliedschaft': { de: '/mitgliedschaft', en: '/membership', fr: '/adhesion', ru: '/chlenstvo', uk: '/chlenstvo', es: '/membresia' },
  '/termine': { de: '/termine', en: '/events', fr: '/evenements', ru: '/sobytija', uk: '/podiji', es: '/eventos' },
  '/kontakt': { de: '/kontakt', en: '/contact', fr: '/contact', ru: '/kontakt', uk: '/kontakt', es: '/contacto' },
};
