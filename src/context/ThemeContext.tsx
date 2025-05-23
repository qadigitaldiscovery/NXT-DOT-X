
import React, { createContext, useContext, useEffect, useState, useMemo, useCallback, useRef } from "react";
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
  const [localTheme, setLocalTheme] = useState<Theme>(() => getInitialTheme());
  const previousTheme = useRef<Theme>(localTheme);
  const isInitialMount = useRef(true);
  
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
        return "light";
      }
    }
    return "light";
  }
  
  // Use database persistence with fallback to localStorage for unauthenticated users
  const { preferences, setPreferences, loading } = useUserPreferences({
    module: 'system',
    key: 'theme',
    defaultValue: localTheme
  });
  
  // Memoize theme to prevent constant re-renders
  const theme = useMemo(() => {
    // If no user or if loading, use local theme from state/localStorage
    if (!user) return localTheme;
    
    // If we have user preferences and they are valid, use them
    if (preferences && (preferences === "light" || preferences === "dark")) {
      return preferences as Theme;
    }
    
    // Otherwise fall back to local theme
    return localTheme;
  }, [user, preferences, localTheme]);

  // Apply theme to document and localStorage - only when theme actually changes
  useEffect(() => {
    // Skip effect on initial mount since the class is already set in HTML
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    
    // Skip if theme hasn't actually changed
    if (previousTheme.current === theme) return;
    
    // Update ref with current theme to track changes
    previousTheme.current = theme;
    
    // Apply theme to document immediately and effectively
    const html = document.documentElement;
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
    if (user?.id && typeof user.id === 'string') {
      try {
        await setPreferences(newTheme);
      } catch (err) {
        console.error('Failed to save theme preference to database:', err);
        // Non-fatal error, just log it
      }
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
