
import { toast as sonnerToast, type ToastT } from "sonner";
import type { ReactNode } from "react";

// Define the Toast type to match expected interface
export type Toast = {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  [key: string]: unknown;
};

// Extended toast function with success and error methods
interface ExtendedToastFunction {
  (props: { title?: ReactNode; description?: ReactNode; variant?: "default" | "destructive" }): string | number;
  success: (message: string | { title?: ReactNode; description?: ReactNode }) => string | number;
  error: (message: string | { title?: ReactNode; description?: ReactNode }) => string | number;
}

// Create a useToast hook that returns the toast function and an empty toasts array
// This mimics the shadcn toast API but uses sonner under the hood
export const useToast = () => {
  const extendedToast = ((props: { title?: ReactNode; description?: ReactNode; variant?: "default" | "destructive" }) => {
    return sonnerToast(props.description as string, {
      // Map the shadcn toast API to sonner's API
      ...(props.title && { title: props.title }),
    });
  }) as ExtendedToastFunction;

  // Add success and error methods
  extendedToast.success = (message) => {
    if (typeof message === 'string') {
      return sonnerToast.success(message);
    } else {
      return sonnerToast.success(message.description as string, {
        ...(message.title && { title: message.title }),
      });
    }
  };

  extendedToast.error = (message) => {
    if (typeof message === 'string') {
      return sonnerToast.error(message);
    } else {
      return sonnerToast.error(message.description as string, {
        ...(message.title && { title: message.title }),
      });
    }
  };

  return {
    toast: extendedToast,
    toasts: [] as Toast[],
    dismiss: (id: string) => {},
  };
};

// Export the standalone toast function that can be imported and used without the hook
// Adapting the function to match both APIs
export const toast = ((props: { title?: ReactNode; description?: ReactNode; variant?: "default" | "destructive" }) => {
  return sonnerToast(props.description as string, {
    ...(props.title && { title: props.title }),
  });
}) as ExtendedToastFunction;

// Add success and error methods to the standalone toast function
toast.success = (message) => {
  if (typeof message === 'string') {
    return sonnerToast.success(message);
  } else {
    return sonnerToast.success(message.description as string, {
      ...(message.title && { title: message.title }),
    });
  }
};

toast.error = (message) => {
  if (typeof message === 'string') {
    return sonnerToast.error(message);
  } else {
    return sonnerToast.error(message.description as string, {
      ...(message.title && { title: message.title }),
    });
  }
};

// Type export
export type { Toast };
