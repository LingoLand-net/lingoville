import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { en } from './en';
import { fr } from './fr';

export type Lang = 'en' | 'fr';

type Dict = Record<string, unknown>;

const DICTS: Record<Lang, Dict> = { en, fr };

// `t` can return a string OR an array of objects (slides, cards, steps, FAQ items…).
// Callers that need arrays cast explicitly: `t('about.cards') as Card[]`.
type TFunc = (key: string) => any;

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  t: TFunc;
};

const LanguageContext = createContext<Ctx | null>(null);

const STORAGE_KEY = 'lv-lang';

function detectInitialLang(): Lang {
  if (typeof window === 'undefined') return 'en';
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'en' || stored === 'fr') return stored;
  const browser = (window.navigator.language || 'en').toLowerCase();
  return browser.startsWith('fr') ? 'fr' : 'en';
}

// Returns whatever is at the path — string, array, object, or undefined.
function resolve(dict: Dict, path: string): unknown {
  const parts = path.split('.');
  let cur: unknown = dict;
  for (const p of parts) {
    if (cur && typeof cur === 'object' && p in (cur as Dict)) {
      cur = (cur as Dict)[p];
    } else {
      return undefined;
    }
  }
  return cur;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectInitialLang);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const toggleLang = useCallback(
    () => setLangState((prev) => (prev === 'en' ? 'fr' : 'en')),
    [],
  );

  const t = useCallback<TFunc>(
    (key: string) => {
      const fromCurrent = resolve(DICTS[lang], key);
      if (fromCurrent !== undefined) return fromCurrent;
      const fromEn = resolve(DICTS.en, key);
      return fromEn !== undefined ? fromEn : key; // key as last resort
    },
    [lang],
  );

  const value = useMemo(
    () => ({ lang, setLang, toggleLang, t }),
    [lang, setLang, toggleLang, t],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): Ctx {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>');
  return ctx;
}

/** Convenience: just the t() function. */
export function useT(): TFunc {
  return useLanguage().t;
}