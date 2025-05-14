
import { toast, Toast } from "@/components/ui/toast";

// Create a useToast hook that returns the toast function and an empty toasts array
// This mimics the shadcn toast API but uses sonner under the hood
export const useToast = () => {
  return {
    toast,
    toasts: [] as Toast[],
    dismiss: (id: string) => {},
  };
};

// Export the standalone toast function that can be imported and used without the hook
export { toast };

// Type export
export type { Toast };
