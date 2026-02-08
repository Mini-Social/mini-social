import { useContext } from 'react';

import { DarkModeContext } from '@/contexts/DarkModeContext';
import LanguageContext from '@/contexts/LanguageContext';

const AppearanceSetting = () => {
  const darkModeContext = useContext(DarkModeContext);
  const languageContext = useContext(LanguageContext);
  if (!darkModeContext) {
    return null;
  }
  const { setSystemTheme, setMode } = darkModeContext;
  const handleChangeThem = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === 'system') {
      const system = window.matchMedia('(prefers-color-scheme: dark)');
      setMode(system.matches);
      setSystemTheme(true);
    } else {
      setMode(value === 'dark' ? true : false);
      setSystemTheme(false);
    }
  };
  const value = darkModeContext.isSystemTheme
    ? 'system'
    : darkModeContext.darkMode
      ? 'dark'
      : 'light';
  if (!languageContext) {
    return null;
  }
  const { language, translate } = languageContext;
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">
        {translate(language, 'appearance')}
      </h3>

      <select
        value={value}
        onChange={handleChangeThem}
        className="bg-background rounded border px-3 py-2"
      >
        <option value="light">{translate(language, 'light')}</option>
        <option value="dark">{translate(language, 'dark')}</option>
        <option value="system" onClick={() => setSystemTheme(true)}>
          {translate(language, 'system')}
        </option>
      </select>
    </div>
  );
};

export default AppearanceSetting;
