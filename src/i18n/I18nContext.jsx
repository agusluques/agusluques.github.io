import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { DEFAULT_LANGUAGE, LANGUAGES, translations } from './translations.js';

const STORAGE_KEY = 'agusluques.lang';

const I18nContext = createContext(null);

/** Saved choice first, then the browser's preference, then English. */
function detectLanguage() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && translations[saved]) return saved;
  } catch {
    // Private mode, or site data blocked. Fall through to the browser hint.
  }

  const tags = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const tag of tags) {
    const code = String(tag || '').slice(0, 2).toLowerCase();
    if (translations[code]) return code;
  }

  return DEFAULT_LANGUAGE;
}

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(detectLanguage);

  const changeLanguage = useCallback((next) => {
    if (!translations[next]) return;
    setLang(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Nothing to do — the choice just will not survive a reload.
    }
  }, []);

  const t = useCallback(
    (key, params) => {
      const value = translations[lang]?.[key] ?? translations[DEFAULT_LANGUAGE][key];
      if (value === undefined) return key;
      if (typeof value !== 'string' || !params) return value;

      return Object.entries(params).reduce(
        (text, [name, replacement]) => text.replaceAll(`{${name}}`, String(replacement)),
        value
      );
    },
    [lang]
  );

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t('document.title');
  }, [lang, t]);

  const value = useMemo(
    () => ({ lang, setLang: changeLanguage, t, languages: LANGUAGES }),
    [lang, changeLanguage, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used inside <I18nProvider>');
  return context;
}
