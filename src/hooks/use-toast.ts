
import { toast as sonnerToast, type ToastT } from "sonner";

export type Toast = {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
};

export type ToasterToast = Toast;

// Create a fixed toasts array for shadcn compatibility
const toasts: Toast[] = [];

// Wrapper for sonner toast with shadcn compatibility
export function toast(
  message: string,
  options?: {
    description?: React.ReactNode;
    action?: {
      label: string;
      onClick: () => void;
    };
  }
) {
  return sonnerToast(message, {
    description: options?.description,
    action: options?.action
      ? {
          label: options.action.label,
          onClick: options.action.onClick,
        }
      : undefined,
  });
}

// Add common toast types for easier access
toast.success = sonnerToast.success;
toast.error = sonnerToast.error;
toast.warning = sonnerToast.warning;
toast.info = sonnerToast.info;

export const useToast = () => {
  return {
    toast,
    toasts,
    dismiss: sonnerToast.dismiss,
    error: sonnerToast.error,
    success: sonnerToast.success,
    warning: sonnerToast.warning,
    info: sonnerToast.info,
  };
};
