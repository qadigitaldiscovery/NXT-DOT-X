
import { toast as sonnerToast } from "@/components/ui/toast";
import type { Toast } from "@/components/ui/toast";

// Create a useToast hook that returns the toast function and an empty toasts array
// This mimics the shadcn toast API but uses sonner under the hood
export const useToast = () => {
  return {
    toast: (props: { title?: React.ReactNode; description?: React.ReactNode; variant?: "default" | "destructive" }) => {
      return sonnerToast(props.description as string, {
        // Map the shadcn toast API to sonner's API
        // For variant handling if needed
        // If variant is destructive, we could use a different style
      });
    },
    toasts: [] as Toast[],
    dismiss: (id: string) => {},
  };
};

// Export the standalone toast function that can be imported and used without the hook
// Adapting the function to match both APIs
export const toast = (props: { title?: React.ReactNode; description?: React.ReactNode; variant?: "default" | "destructive" }) => {
  return sonnerToast(props.description as string, {
    // If we have a title, add it
    ...(props.title && { title: props.title }),
  });
};

// Type export
export type { Toast };
