import { toast as sonnerToast } from "sonner";
import { Toast } from "@/components/ui/toast";
import { ReactNode } from "react";

type ToastProps = {
  title?: ReactNode;
  description?: ReactNode;
  variant?: "default" | "destructive";
  action?: ReactNode;
};

// Create a compatible wrapper around sonner toast
export const toast = Object.assign(
  (content: string | ToastProps) => {
    if (typeof content === "string") {
      return sonnerToast(content);
    } else {
      return sonnerToast(content.title as string, {
        description: content.description,
      });
    }
  },
  {
    // Standard variants
    error: (content: string | ToastProps) => {
      if (typeof content === "string") {
        return sonnerToast.error(content);
      } else {
        return sonnerToast.error(content.title as string, {
          description: content.description,
        });
      }
    },
    success: (content: string | ToastProps) => {
      if (typeof content === "string") {
        return sonnerToast.success(content);
      } else {
        return sonnerToast.success(content.title as string, {
          description: content.description,
        });
      }
    },
    warning: (content: string | ToastProps) => {
      if (typeof content === "string") {
        return sonnerToast.warning(content);
      } else {
        return sonnerToast.warning(content.title as string, {
          description: content.description,
        });
      }
    },
    info: (content: string | ToastProps) => {
      if (typeof content === "string") {
        return sonnerToast.info(content);
      } else {
        return sonnerToast.info(content.title as string, {
          description: content.description,
        });
      }
    },
    // Other functions from sonner
    promise: sonnerToast.promise,
    dismiss: sonnerToast.dismiss,
    custom: sonnerToast.custom,
    loading: sonnerToast.loading,
    message: sonnerToast.message,
    getHistory: sonnerToast.getHistory
  }
);

export const useToast = () => {
  return { toast };
};
