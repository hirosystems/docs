import { en } from './en';
import { es } from './es';
import type { Translations } from './types';

export const translations: Record<string, Translations> = {
  en,
  es,
};

export type { Translations };
export { en, es };
