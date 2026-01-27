import { createContext } from 'react';

export const DarkModeContext = createContext<{
  darkMode: boolean;
  toggleDarkMode: () => void;
} | null>(null);
