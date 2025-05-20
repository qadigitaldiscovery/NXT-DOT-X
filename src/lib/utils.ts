
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Additional utility for handling common accessibility issues
export function ensureAccessibleLabel(
  label?: string | null,
  fallback: string = "Element"
): string {
  return label || fallback;
}

// Fix user-select cross-browser compatibility
export function createUserSelectStyles(value: "none" | "auto" | "text" | "all"): React.CSSProperties {
  return {
    WebkitUserSelect: value,
    MozUserSelect: value as any,
    msUserSelect: value as any,
    userSelect: value,
  };
}
