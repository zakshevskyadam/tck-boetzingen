import { LANGUAGES, DEFAULT_LANG, ROUTE_MAP, type Lang } from './config';
import de from './de.json';
import en from './en.json';
import fr from './fr.json';
import ru from './ru.json';
import uk from './uk.json';
import es from './es.json';

const translations: Record<Lang, Record<string, string>> = { de, en, fr, ru, uk, es };

export { LANGUAGES, DEFAULT_LANG, type Lang };

export function t(key: string, lang: Lang = DEFAULT_LANG): string {
  return translations[lang]?.[key] ?? translations[DEFAULT_LANG][key] ?? key;
}

export function getLang(url: URL | string): Lang {
  const path = typeof url === 'string' ? url : url.pathname;
  const segment = path.split('/').filter(Boolean)[0];
  const match = LANGUAGES.find(l => l.code === segment);
  return match ? match.code : DEFAULT_LANG;
}

export function getLocalizedPath(dePath: string, lang: Lang): string {
  const route = ROUTE_MAP[dePath];
  if (!route) return lang === DEFAULT_LANG ? dePath : `/${lang}${dePath}`;
  const slug = route[lang];
  return lang === DEFAULT_LANG ? slug : `/${lang}${slug}`;
}

/** Convert any localized URL path back to the DE (default) path */
export function getDePath(pathname: string): string {
  // Strip trailing slash (except root)
  const clean = pathname === '/' ? '/' : pathname.replace(/\/$/, '');

  // Check if path starts with a language prefix
  const segments = clean.split('/').filter(Boolean);
  const firstSeg = segments[0];
  const langMatch = LANGUAGES.find(l => l.code === firstSeg && l.code !== DEFAULT_LANG);

  if (!langMatch) {
    // Already a DE path
    return clean || '/';
  }

  // Remove language prefix to get the localized slug
  const localizedSlug = '/' + segments.slice(1).join('/') || '/';

  // Find which DE route maps to this localized slug for this language
  for (const [dePath, routes] of Object.entries(ROUTE_MAP)) {
    if (routes[langMatch.code] === localizedSlug) {
      return dePath;
    }
  }

  // Fallback: return the slug without prefix
  return localizedSlug;
}
