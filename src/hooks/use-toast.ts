"use client";

import { toast } from "../components/ui/toast";
import type { Toast as ToastType } from "../components/ui/toast";

export type Toast = ToastType;

export const useToast = () => {
  return {
    toast: {
      ...toast,
      // Helper method for default toasts
      show: (props: {
        title?: React.ReactNode;
        description?: React.ReactNode;
        variant?: "default" | "destructive";
        action?: React.ReactNode;
      }) => {
        if (props.variant === "destructive") {
          return toast.error(props);
        }
        return toast.default(props);
      }
    }
  };
};

export { toast };
