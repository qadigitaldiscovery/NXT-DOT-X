import { ReactNode } from 'react';
import { toast as sonnerToast, Toaster } from 'sonner';

export type ToastProps = {
  title?: ReactNode;
  description?: ReactNode;
  variant?: 'default' | 'destructive';
  action?: ReactNode;
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
    message: string | Omit<ToastProps, 'variant'>
  ) => string | number;
  error: (
    message: string | Omit<ToastProps, 'variant'>
  ) => string | number;
}

// Create a function that adapts shadcn toast API to sonner
export const useToast = () => {
  return {
    toast: ((props: ToastProps) => {
      // For object params, adapt to sonner's expected format
      if (props.variant === 'destructive') {
        return sonnerToast.error(props.title || 'Error', {
          description: props.description,
          action: props.action ? { label: 'Undo', onClick: () => console.log('Action!') } : undefined,
        });
      }
      return sonnerToast(props.title, {
        description: props.description,
        action: props.action ? {
          label: props.action,
          onClick: () => { /* The ToastAction component should handle its own onClick */ }
        } : undefined,
      });
    }) as ExtendedToastFunction,
    // Add a dummy toasts array for compatibility with the Toaster component
    toasts: [] as Toast[]
  };
};

const currentToastInstance = useToast().toast;

// Add helper methods to adapt between APIs
currentToastInstance.success = (message: string | Omit<ToastProps, 'variant'>) => {
  if (typeof message === 'string') {
    return sonnerToast.success(message);
  } else {
    return sonnerToast.success(message.title, {
      description: message.description,
      action: message.action ? {
        label: message.action,
        onClick: () => { /* The ToastAction component should handle its own onClick */ }
      } : undefined,
    });
  }
};

currentToastInstance.error = (message: string | Omit<ToastProps, 'variant'>) => {
  if (typeof message === 'string') {
    return sonnerToast.error(message);
  } else {
    return sonnerToast.error(message.title || 'Error', {
      description: message.description,
      action: message.action ? {
        label: message.action,
        onClick: () => { /* The ToastAction component should handle its own onClick */ }
      } : undefined,
    });
  }
};

// Export the toast function directly for ease of use
export const toast = currentToastInstance;

// Toaster component remains the same, re-exported from sonner
export { Toaster };
