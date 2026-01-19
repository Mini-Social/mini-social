import { useEffect, useState } from 'react';

import { DarkModeContext } from './DarkModeContext';

export const DarkmodeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [darkMode, setDarkMode] = useState<boolean>(JSON.parse(localStorage.getItem('DarkMode') ?? 'false'));
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('DarkMode', JSON.stringify(!darkMode))
  };
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode])
  return (
    <DarkModeContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </DarkModeContext.Provider>
  );
};
