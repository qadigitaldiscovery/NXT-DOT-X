
"use client";

import { toast as sonnerToast } from "sonner";
import type { Toast as ToastType } from "@/components/ui/toast";

export type Toast = ToastType;

// Create a wrapper for sonner toast that's compatible with existing code
export const toast = {
  // Forward all sonner toast methods
  ...sonnerToast,
  
  // Add custom method that maps to the older toast API
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
  }
};

export const useToast = () => {
  return {
    toast,
  };
};
