import { createContext } from 'react';

import type { Language, translations } from '@/language/language';

const LanguageContext = createContext<{
  language: Language;
  switchLanguage: (lang: Language) => void;
  translate: (lang: Language, key: keyof typeof translations.vi) => string;
} | null>(null);

export default LanguageContext;
