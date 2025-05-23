
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { useAuth } from './AuthContext';

export type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  actualTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [theme, setThemeState] = useState<Theme>('system');
  const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light');

  const { preferences, setPreferences } = useUserPreferences({
    module: 'theme',
    key: 'preference',
    defaultValue: 'system'
  });

  // Initialize theme from preferences
  useEffect(() => {
    if (preferences && typeof preferences === 'string') {
      setThemeState(preferences as Theme);
    }
  }, [preferences]);

  // Apply theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      setActualTheme(systemTheme);
      root.classList.toggle('dark', systemTheme === 'dark');
    } else {
      setActualTheme(theme);
      root.classList.toggle('dark', theme === 'dark');
    }
  }, [theme]);

  const setTheme = async (newTheme: Theme) => {
    setThemeState(newTheme);
    if (user) {
      await setPreferences(newTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, actualTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
