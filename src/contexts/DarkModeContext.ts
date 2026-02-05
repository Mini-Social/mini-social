import { createContext } from 'react';

export const DarkModeContext = createContext<{
  darkMode: boolean;
  isSystemTheme: boolean;
  setSystemTheme: (val: boolean) => void;
  toggleDarkMode: () => void;
  setMode: (val: boolean) => void;
} | null>(null);
