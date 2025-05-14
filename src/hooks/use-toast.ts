
import { useToast as useShadcnToast } from "@/components/ui/use-toast";
import { Toast, toast as shadcnToast } from "@/components/ui/toast";

// Re-export the hook for component usage
export const useToast = useShadcnToast;

// Export a standalone toast function that can be imported and used without the hook
export const toast = shadcnToast;

// Type export
export type { Toast };
