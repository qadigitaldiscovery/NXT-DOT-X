
"use client";

import { toast as sonnerToast } from "sonner";
import type { Toast as ToastType } from "@/components/ui/toast";

export type Toast = ToastType;

// Simple wrapper around sonner toast for compatibility with existing code
export const toast = {
  // Basic toast function
  custom: (props: {
    title?: React.ReactNode;
    description?: React.ReactNode;
    variant?: "default" | "destructive";
    action?: React.ReactNode;
  }) => {
    if (props.variant === "destructive") {
      return sonnerToast.error(props.title as string, {
        description: props.description as string,
      });
    }
    return sonnerToast(props.title as string, {
      description: props.description as string,
    });
  },
  
  // Create a simplified version that's compatible with the old API
  // but forwards to the sonner toast
  ...sonnerToast
};

export const useToast = () => {
  return {
    toast,
  };
};
