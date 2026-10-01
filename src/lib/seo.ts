// src/lib/seo.ts
//
// Tiny document-head manager. No react-helmet, no dependencies.
// Sets/updates <title>, meta tags, canonical link, and html[lang] on route change.

const SITE_NAME = 'Lingo Ville';
const SITE_URL = 'https://lingo-ville.com'; // ← change to your real domain when live
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

type MetaKey = { attr: 'name' | 'property'; key: string; content: string };

export type SeoInput = {
  title: string;
  description: string;
  path: string;         // e.g. '/about' — joined with SITE_URL for canonical
  lang: 'en' | 'fr';
  image?: string;
  noindex?: boolean;    // set true on NotFound
};

function upsertMeta(attr: 'name' | 'property', key: string, content: string): void {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel: string, href: string, extra?: Record<string, string>): void {
  const selectorParts = [`link[rel="${rel}"]`];
  if (extra) {
    for (const [k, v] of Object.entries(extra)) selectorParts.push(`[${k}="${v}"]`);
  }
  let el = document.head.querySelector<HTMLLinkElement>(selectorParts.join(''));
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    if (extra) for (const [k, v] of Object.entries(extra)) el.setAttribute(k, v);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function applySeo(input: SeoInput): void {
  const { title, description, path, lang, image = DEFAULT_OG_IMAGE, noindex } = input;
  const canonical = `${SITE_URL}${path}`;
  const fullTitle = path === '/' ? `${SITE_NAME} — Language Center` : `${title} · ${SITE_NAME}`;
  const locale = lang === 'fr' ? 'fr_FR' : 'en_US';
  const altLocale = lang === 'fr' ? 'en_US' : 'fr_FR';

  document.title = fullTitle;
  document.documentElement.lang = lang;

  upsertMeta('name', 'description', description);
  upsertMeta('name', 'robots', noindex ? 'noindex,follow' : 'index,follow');
  upsertLink('canonical', canonical);

  // Open Graph
  upsertMeta('property', 'og:site_name', SITE_NAME);
  upsertMeta('property', 'og:type', 'website');
  upsertMeta('property', 'og:title', fullTitle);
  upsertMeta('property', 'og:description', description);
  upsertMeta('property', 'og:url', canonical);
  upsertMeta('property', 'og:image', image);
  upsertMeta('property', 'og:image:width', '1200');
  upsertMeta('property', 'og:image:height', '630');
  upsertMeta('property', 'og:locale', locale);
  upsertMeta('property', 'og:locale:alternate', altLocale);

  // Twitter
  upsertMeta('name', 'twitter:card', 'summary_large_image');
  upsertMeta('name', 'twitter:title', fullTitle);
  upsertMeta('name', 'twitter:description', description);
  upsertMeta('name', 'twitter:image', image);
}

// Same as applySeo but returns the raw objects — useful for testing.
export function seoMeta(kind: MetaKey['attr'], key: string, content: string): MetaKey {
  return { attr: kind, key, content };
}