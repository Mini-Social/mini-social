import { useEffect, useState } from 'react';

import { DarkModeContext } from './DarkModeContext';

export const DarkmodeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [darkMode, setDarkMode] = useState<boolean>(
    JSON.parse(localStorage.getItem('DarkMode') ?? 'false'),
  );
  const [isSystemTheme, setIsSystemTheme] = useState<boolean>(
    JSON.parse(localStorage.getItem('SystemTheme') ?? 'false'),
  );
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('DarkMode', JSON.stringify(!darkMode));
  };

  const setMode = (isDark: boolean) => {
    setDarkMode(isDark);
    localStorage.setItem('DarkMode', JSON.stringify(isDark));
  };
  const setSystemTheme = (value: boolean) => {
    setIsSystemTheme(value);
    localStorage.setItem('SystemTheme', JSON.stringify(value));
  };
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);
  return (
    <DarkModeContext.Provider
      value={{
        darkMode,
        isSystemTheme,
        setSystemTheme,
        toggleDarkMode,
        setMode,
      }}
    >
      {children}
    </DarkModeContext.Provider>
  );
};
