import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';
import { useTranslation } from 'react-i18next';

// ─── Types ─────────────────────────────────────────────────────────────────

type Theme = 'dark' | 'light';
type Locale = 'en' | 'ar';

interface CardTransition {
  active: boolean;
  projectId: string;
}

interface AppContextValue {
  theme: Theme;
  toggleTheme: () => void;
  locale: Locale;
  setLocale: (locale: Locale) => void;
  commandPaletteOpen: boolean;
  openCommandPalette: () => void;
  closeCommandPalette: () => void;
  toggleCommandPalette: () => void;
  cardTransition: CardTransition;
  startCardTransition: (projectId: string) => void;
  clearCardTransition: () => void;
}

// ─── Context ────────────────────────────────────────────────────────────────

const AppContext = createContext<AppContextValue | null>(null);

// ─── Provider ───────────────────────────────────────────────────────────────

export function AppContextProvider({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation();

  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('portfolio_theme') as Theme) || 'dark';
  });

  const [locale, setLocaleState] = useState<Locale>(() => {
    return (localStorage.getItem('portfolio_locale') as Locale) || 'en';
  });

  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  const [cardTransition, setCardTransition] = useState<CardTransition>({
    active: false,
    projectId: '',
  });

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio_theme', theme);
  }, [theme]);

  // Apply locale to document and i18n
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('portfolio_locale', locale);
    i18n.changeLanguage(locale);
  }, [locale, i18n]);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
  }, []);

  const openCommandPalette = useCallback(() => setCommandPaletteOpen(true), []);
  const closeCommandPalette = useCallback(() => setCommandPaletteOpen(false), []);
  const toggleCommandPalette = useCallback(
    () => setCommandPaletteOpen((p) => !p),
    []
  );

  const startCardTransition = useCallback((projectId: string) => {
    setCardTransition({ active: true, projectId });
  }, []);

  const clearCardTransition = useCallback(() => {
    setCardTransition({ active: false, projectId: '' });
  }, []);

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        locale,
        setLocale,
        commandPaletteOpen,
        openCommandPalette,
        closeCommandPalette,
        toggleCommandPalette,
        cardTransition,
        startCardTransition,
        clearCardTransition,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// ─── Hook ───────────────────────────────────────────────────────────────────

export function useAppContext(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppContextProvider');
  return ctx;
}
