import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { en } from '../locales/en';
import { fr } from '../locales/fr';

type Language = 'en' | 'fr';

// Convert all literal leaf strings to plain string recursively so different locales
// with the same shape but different string values are assignable.
type DeepStringify<T> = T extends string ? string : { [K in keyof T]: DeepStringify<T[K]> };

type Translations = DeepStringify<typeof en>;

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
  languages: { code: Language; name: string }[];
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const translations: Record<Language, Translations> = {
  en,
  fr
};

const languages = [
  { code: 'en' as Language, name: 'English' },
  { code: 'fr' as Language, name: 'Français' }
];

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  // Initialize language from localStorage or browser preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && translations[savedLanguage]) {
      setLanguageState(savedLanguage);
    } else {
      // Detect browser language
      const browserLang = navigator.language.split('-')[0] as Language;
      if (translations[browserLang]) {
        setLanguageState(browserLang);
      }
    }
  }, []);

  // Update document language and save to localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
  };

  // Translation function with nested key support
  const t = (key: string): any => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to English if key not found
        let fallbackValue: any = translations.en;
        for (const fallbackKey of keys) {
          if (fallbackValue && typeof fallbackValue === 'object' && fallbackKey in fallbackValue) {
            fallbackValue = fallbackValue[fallbackKey];
          } else {
            console.warn(`Translation key "${key}" not found`);
            return key; // Return the key if translation not found
          }
        }
        return fallbackValue;
      }
    }
    
    return value;
  };

  // Set initial document language
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <I18nContext.Provider value={{ language, setLanguage, t, languages }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}

// Hook for formatting dates based on language
export function useLocalizedDate() {
  const { language } = useI18n();
  
  const formatDate = (date: Date, options?: Intl.DateTimeFormatOptions) => {
    const locale = language === 'fr' ? 'fr-FR' : 'en-US';
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      ...options
    }).format(date);
  };

  return { formatDate };
}

// Utility for SEO meta tags
export function getLocalizedMeta(key: string) {
  const currentLang = localStorage.getItem('language') as Language || 'en';
  const keys = key.split('.');
  let value: any = translations[currentLang];
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return translations.en.meta.title; // Fallback
    }
  }
  
  return value;
}