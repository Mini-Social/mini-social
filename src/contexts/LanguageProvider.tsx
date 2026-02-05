import { useState } from 'react';

import LanguageContext from '@/contexts/LanguageContext';
import type { Language } from '@/language/language';
import { translations } from '@/language/language';

interface Props {
  children: React.ReactNode;
}
const LanguageProvider = ({ children }: Props) => {
  const [language, setLanguage] = useState<Language>(
    (localStorage.getItem('language') as Language) || 'vi',
  );
  const switchLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };
  const translate = (lang: Language, key: keyof typeof translations.vi) =>
    translations[lang][key];
  return (
    <LanguageContext.Provider
      value={{
        language,
        switchLanguage,
        translate,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageProvider;
