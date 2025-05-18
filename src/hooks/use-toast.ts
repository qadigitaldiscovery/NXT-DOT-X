
"use client";

import { toast as sonnerToast } from "../components/ui/toast";
import type { Toast as ToastType } from "../components/ui/toast";

export type Toast = ToastType;

export const useToast = () => {
  return {
    toast: {
      // Helper methods that match the expected patterns
      default: (props: {
        title?: React.ReactNode;
        description?: React.ReactNode;
        variant?: "default" | "destructive";
        action?: React.ReactNode;
      }) => sonnerToast(props.title as string, { description: props.description }),
      
      error: (props: {
        title?: React.ReactNode;
        description?: React.ReactNode;
        variant?: "default" | "destructive";
        action?: React.ReactNode;
      }) => sonnerToast.error(props.title as string, { description: props.description }),
      
      success: (props: {
        title?: React.ReactNode;
        description?: React.ReactNode;
        variant?: "default" | "destructive";
        action?: React.ReactNode;
      }) => sonnerToast.success(props.title as string, { description: props.description }),
      
      // Allow direct access to other sonnerToast methods
      ...sonnerToast
    }
  };
};

// Also export the direct toast function for components that prefer to use it directly
export { sonnerToast as toast };
