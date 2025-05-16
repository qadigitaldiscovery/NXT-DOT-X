import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";
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
      // Check localStorage first
      const savedTheme = localStorage.getItem("theme") as Theme;
      if (savedTheme && (savedTheme === "light" || savedTheme === "dark")) {
        return savedTheme;
      }
      
      // Fall back to system preference if no localStorage value
      try {
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        return prefersDark ? "dark" : "light";
      } catch (err) {
        // If media query fails for some reason, default to light
        return "light";
      }
    }
    return "light";
  }
  
  // Memoize theme to prevent constant re-renders
  const theme = useMemo(() => {
    // If loading or no user, use local theme to avoid flashing
    if (!user) return localTheme;
    
    // If we have user preferences, use them
    if (preferences && (preferences === "light" || preferences === "dark")) {
      return preferences as Theme;
    }
    
    // Otherwise fall back to local theme
    return localTheme;
  }, [user, preferences, localTheme]);

  // Separate effect that only runs when theme changes
  useEffect(() => {
    // Apply theme to document immediately and effectively
    const html = document.documentElement;
    
    // Force removal and re-addition of theme classes to avoid conflicts
    html.classList.remove("light", "dark");
    html.classList.add(theme);
    
    // Save theme preference to localStorage as fallback
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Memoize the toggle function to prevent unnecessary re-renders
  const toggleTheme = useCallback(async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    
    // Update local state immediately to avoid delay in UI update
    setLocalTheme(newTheme);
    
    // Always update localStorage as fallback
    localStorage.setItem("theme", newTheme);
    
    // Update in database only if authenticated with valid ID
    if (user?.id && typeof user.id === 'string' && 
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(user.id)) {
      await setPreferences(newTheme);
    }
  }, [theme, user, setPreferences]);

  // Use memo for the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    theme,
    toggleTheme
  }), [theme, toggleTheme]);

  return (
    <ThemeContext.Provider value={contextValue}>
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
