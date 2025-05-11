
import React from "react";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  
  const handleClick = () => {
    console.log("Theme toggle clicked, current theme:", theme);
    toggleTheme();
  };

  return (
    <Button 
      variant="outline" 
      size="icon" 
      onClick={handleClick}
      className="rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
    >
      {theme === "light" ? (
        <Moon className="h-5 w-5 text-gray-700" />
      ) : (
        <Sun className="h-5 w-5 text-yellow-400" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
