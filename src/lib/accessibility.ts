
/**
 * Utility functions for accessibility and cross-browser compatibility
 */

import { cn } from "@/lib/utils";

// Ensure all interactive elements have proper accessible names
export const ensureAccessibleLabel = (label?: string | null, fallback: string = "Element"): string => {
  return label || fallback;
};

// Helper for ensuring cross-browser compatibility with user-select
export const createUserSelectStyles = (value: "none" | "auto" | "text" | "all"): React.CSSProperties => {
  return {
    WebkitUserSelect: value,
    MozUserSelect: value as any,
    msUserSelect: value as any,
    userSelect: value,
  };
};

// Standard link class names for accessibility and consistency
export const getAccessibleLinkClass = (className?: string): string => {
  return cn(
    "inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
    className
  );
};
