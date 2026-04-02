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
