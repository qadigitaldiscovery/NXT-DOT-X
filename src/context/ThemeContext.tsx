
import React, { createContext, useContext, useEffect, useState } from "react";
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { useAuth } from '@/context/AuthContext';

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [localTheme, setLocalTheme] = useState<Theme>(getInitialTheme());
  
  // Use database persistence with fallback to localStorage for unauthenticated users
  const { preferences, setPreferences, loading } = useUserPreferences({
    module: 'system',
    key: 'theme',
    defaultValue: localTheme
  });
  
  // Get theme from localStorage or system preference as initial value
  function getInitialTheme(): Theme {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as Theme;
      if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) return savedTheme;
      
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return prefersDark ? "dark" : "light";
    }
    return "light";
  }
  
  // Memoize theme to prevent constant re-renders
  const theme = React.useMemo(() => {
    if (user && preferences) return preferences as Theme;
    return localTheme;
  }, [user, preferences, localTheme]);

  useEffect(() => {
    // Apply theme to document immediately and effectively
    const html = document.documentElement;
    
    // Force removal and re-addition of theme classes
    html.classList.remove("light", "dark");
    html.classList.add(theme);
    
    // Save theme preference to localStorage as fallback
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    
    // Update local state immediately to avoid delay in UI update
    setLocalTheme(newTheme);
    
    // Update in database only if authenticated and user ID is valid
    if (user?.id && typeof user.id === 'string' && 
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(user.id)) {
      await setPreferences(newTheme);
    }
    
    // Always update localStorage as fallback
    localStorage.setItem("theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
