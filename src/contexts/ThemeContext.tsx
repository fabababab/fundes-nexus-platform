
import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole } from '@/types/common';

type ThemeContextType = {
  currentTheme: string;
  setTheme: (theme: string) => void;
  updateThemeFromRole: (role: UserRole) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('theme-msme');

  useEffect(() => {
    // Apply theme class to document body
    document.body.className = document.body.className
      .split(' ')
      .filter(cls => !cls.startsWith('theme-'))
      .join(' ');
    document.body.classList.add(currentTheme);
  }, [currentTheme]);

  const setTheme = (theme: string) => {
    setCurrentTheme(theme);
  };

  const updateThemeFromRole = (role: UserRole) => {
    switch (role) {
      case 'msme':
        setTheme('theme-msme');
        break;
      case 'fundes':
        setTheme('theme-fundes');
        break;
      case 'investor':
        setTheme('theme-investor');
        break;
      default:
        setTheme('theme-msme');
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, updateThemeFromRole }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
