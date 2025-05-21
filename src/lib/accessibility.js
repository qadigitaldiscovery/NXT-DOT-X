/**
 * Utility functions for accessibility and cross-browser compatibility
 */
import { cn } from "@/lib/utils";
// Ensure all interactive elements have proper accessible names
export const ensureAccessibleLabel = (label, fallback = "Element") => {
    return label || fallback;
};
// Helper for ensuring cross-browser compatibility with user-select
export const createUserSelectStyles = (value) => {
    return {
        WebkitUserSelect: value,
        MozUserSelect: value,
        msUserSelect: value,
        userSelect: value,
    };
};
// Standard link class names for accessibility and consistency
export const getAccessibleLinkClass = (className) => {
    return cn("inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2", className);
};
