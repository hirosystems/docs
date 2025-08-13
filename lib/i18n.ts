import type { I18nConfig } from 'fumadocs-core/i18n';

export const i18n: I18nConfig = {
  defaultLanguage: 'en',
  languages: ['en', 'es'],
  // hideLocale: 'default-locale',
};

export const languageNames: Record<string, string> = {
  en: 'English',
  es: 'Español',
};

export const languageAbbreviations: Record<string, string> = {
  en: 'EN',
  es: 'ES',
};

export const languageFlags: Record<string, string> = {
  en: '🇺🇸',
  es: '🇪🇸',
};
