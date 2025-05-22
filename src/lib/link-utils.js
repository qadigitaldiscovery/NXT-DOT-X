
/**
 * Utility functions for consistent link styling and accessibility
 */
import { cn } from "./utils";
// Common text link styles with variants
export const getLinkClassName = (variant = 'default', size = 'md', className = '') => {
    const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none user-select-none -webkit-user-select-none";
    const variantStyles = {
        default: "text-primary hover:text-primary/80 hover:underline",
        primary: "text-primary-foreground bg-primary hover:bg-primary/90 hover:underline",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
        destructive: "text-destructive hover:text-destructive/80 hover:underline"
    };
    const sizeStyles = {
        sm: "text-xs py-1 px-2",
        md: "py-2 px-3",
        lg: "text-base py-2.5 px-4"
    };
    return cn(baseStyles, variantStyles[variant], sizeStyles[size], className);
};
// Helper for consistent icon + text styling within links
export const getIconLinkClassName = (textColor = "text-primary", hoverColor = "hover:text-primary/80") => {
    return cn("inline-flex items-center gap-2", textColor, hoverColor, "hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2");
};
