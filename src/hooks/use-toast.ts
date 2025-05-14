
import { ReactNode } from 'react';
import { toast as sonnerToast, Toaster } from 'sonner';

export type ToastProps = {
  title?: ReactNode;
  description?: ReactNode;
  variant?: 'default' | 'destructive';
};

// Define a type for the toast object that will be returned
export type Toast = {
  id: string;
  title?: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  [key: string]: unknown;
};

// Define a type that extends the sonner toast function with shadcn-like methods
interface ExtendedToastFunction {
  (props: ToastProps): string | number;
  success: (
    message: string | ToastProps
  ) => string | number;
  error: (
    message: string | ToastProps
  ) => string | number;
}

// Create a function that adapts shadcn toast API to sonner
export const useToast = () => {
  return {
    toast: ((props: ToastProps) => {
      // For object params, adapt to sonner's expected format
      return sonnerToast(props.title as string, {
        description: props.description as string,
      });
    }) as ExtendedToastFunction,
    // Add a dummy toasts array for compatibility with the Toaster component
    toasts: [] as Toast[]
  };
};

// Add helper methods to adapt between APIs
useToast().toast.success = (message: string | ToastProps) => {
  if (typeof message === 'string') {
    return sonnerToast.success(message);
  } else {
    return sonnerToast.success(message.title as string, {
      description: message.description as string,
    });
  }
};

useToast().toast.error = (message: string | ToastProps) => {
  if (typeof message === 'string') {
    return sonnerToast.error(message);
  } else {
    return sonnerToast.error(message.title as string, {
      description: message.description as string,
    });
  }
};

// Export the toast function directly for ease of use
export const toast = ((props: ToastProps) => {
  return sonnerToast(props.title as string, {
    description: props.description as string,
  });
}) as ExtendedToastFunction;

// Add helper methods for direct export
toast.success = (message: string | ToastProps) => {
  if (typeof message === 'string') {
    return sonnerToast.success(message);
  } else {
    return sonnerToast.success(message.title as string, {
      description: message.description as string,
    });
  }
};

toast.error = (message: string | ToastProps) => {
  if (typeof message === 'string') {
    return sonnerToast.error(message);
  } else {
    return sonnerToast.error(message.title as string, {
      description: message.description as string,
    });
  }
};
