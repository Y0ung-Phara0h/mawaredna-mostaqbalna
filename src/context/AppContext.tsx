import React, { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import {
  PUBLIC_ROUTES,
  type Language,
  type RoutePath,
  type ThemeMode,
} from '../config/siteConfig';
import { TRANSLATIONS, type SiteTranslations } from '../data/translations';
import type { CalculatorTransferPayload } from '../lib/calculator';

const LANG_STORAGE_KEY = 'mm_selected_lang';
const THEME_STORAGE_KEY = 'mm_selected_theme';
const CALC_TRANSFER_KEY = 'mm_calculator_transfer';

interface AppContextValue {
  lang: Language;
  isRtl: boolean;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  t: SiteTranslations;
  route: RoutePath;
  navigate: (path: RoutePath) => void;
  calculatorTransfer: CalculatorTransferPayload | null;
  setCalculatorTransfer: (payload: CalculatorTransferPayload | null) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

function normalizeRoute(pathname: string): RoutePath {
  const clean = pathname.replace(/\/+$/, '') || '/';
  if ((PUBLIC_ROUTES as readonly string[]).includes(clean)) {
    return clean as RoutePath;
  }
  return '/';
}

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'ar';
  const params = new URLSearchParams(window.location.search);
  const queryLang = params.get('lang');
  if (queryLang === 'ar' || queryLang === 'en') {
    return queryLang;
  }
  try {
    const stored = window.localStorage.getItem(LANG_STORAGE_KEY);
    if (stored === 'ar' || stored === 'en') {
      return stored;
    }
  } catch {
    // Ignore storage errors
  }
  return 'ar';
}

function getInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'dark';
  const params = new URLSearchParams(window.location.search);
  const queryTheme = params.get('theme');
  if (queryTheme === 'dark' || queryTheme === 'light') {
    return queryTheme;
  }
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'dark' || stored === 'light') {
      return stored;
    }
  } catch {
    // Ignore storage errors
  }
  return 'dark';
}

function getInitialTransfer(): CalculatorTransferPayload | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.sessionStorage.getItem(CALC_TRANSFER_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CalculatorTransferPayload;
  } catch {
    return null;
  }
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(getInitialLanguage);
  const [theme, setThemeState] = useState<ThemeMode>(getInitialTheme);
  const [route, setRoute] = useState<RoutePath>(() =>
    typeof window !== 'undefined' ? normalizeRoute(window.location.pathname) : '/'
  );
  const [calculatorTransfer, setCalculatorTransferState] = useState<CalculatorTransferPayload | null>(
    getInitialTransfer
  );

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    const onPopState = () => {
      setRoute(normalizeRoute(window.location.pathname));
      const params = new URLSearchParams(window.location.search);
      const queryLang = params.get('lang');
      if (queryLang === 'ar' || queryLang === 'en') {
        setLangState(queryLang);
      }
      const queryTheme = params.get('theme');
      if (queryTheme === 'dark' || queryTheme === 'light') {
        setThemeState(queryTheme);
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useLayoutEffect(() => {
    const resetToTop = () => {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    };
    resetToTop();
    const rafId = window.requestAnimationFrame(resetToTop);
    return () => window.cancelAnimationFrame(rafId);
  }, [route]);

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.title =
      lang === 'ar'
        ? 'مواردنا مستقبلنا — كمبوست قصب السكر العضوي'
        : 'Mawaredna Mostaqbaluna — Organic Sugarcane Compost';
  }, [lang]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    document.body.style.backgroundColor = theme === 'dark' ? '#121813' : '#F6F3EC';
    document.body.style.color = theme === 'dark' ? '#F4F1E8' : '#1F2720';
  }, [theme]);

  const setLang = useCallback((next: Language) => {
    setLangState(next);
    try {
      window.localStorage.setItem(LANG_STORAGE_KEY, next);
    } catch {
      // Ignore storage errors
    }
    const url = new URL(window.location.href);
    url.searchParams.set('lang', next);
    window.history.replaceState({}, '', url.pathname + url.search);
  }, []);

  const toggleLang = useCallback(() => {
    setLang(lang === 'ar' ? 'en' : 'ar');
  }, [lang, setLang]);

  const setTheme = useCallback((next: ThemeMode) => {
    setThemeState(next);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Ignore storage errors
    }
    const url = new URL(window.location.href);
    url.searchParams.set('theme', next);
    window.history.replaceState({}, '', url.pathname + url.search);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  const navigate = useCallback(
    (path: RoutePath) => {
      const target = normalizeRoute(path);
      const url = new URL(window.location.href);
      url.pathname = target;
      url.searchParams.set('lang', lang);
      url.searchParams.set('theme', theme);
      window.history.pushState({}, '', url.pathname + url.search);
      setRoute(target);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
    },
    [lang, theme]
  );

  const setCalculatorTransfer = useCallback((payload: CalculatorTransferPayload | null) => {
    setCalculatorTransferState(payload);
    try {
      if (payload) {
        window.sessionStorage.setItem(CALC_TRANSFER_KEY, JSON.stringify(payload));
      } else {
        window.sessionStorage.removeItem(CALC_TRANSFER_KEY);
      }
    } catch {
      // Ignore sessionStorage errors
    }
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      lang,
      isRtl: lang === 'ar',
      setLang,
      toggleLang,
      theme,
      setTheme,
      toggleTheme,
      t: TRANSLATIONS[lang],
      route,
      navigate,
      calculatorTransfer,
      setCalculatorTransfer,
    }),
    [
      lang,
      setLang,
      toggleLang,
      theme,
      setTheme,
      toggleTheme,
      route,
      navigate,
      calculatorTransfer,
      setCalculatorTransfer,
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp must be used inside AppProvider');
  }
  return ctx;
}

export function AppLink({
  to,
  className,
  children,
  onClick,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { to: RoutePath }) {
  const { navigate, lang, theme } = useApp();
  const href = `${to}?lang=${lang}&theme=${theme}`;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }
    e.preventDefault();
    onClick?.(e);
    navigate(to);
  };

  return (
    <a href={href} onClick={handleClick} className={className} {...rest}>
      {children}
    </a>
  );
}
