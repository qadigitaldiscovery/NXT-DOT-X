
"use client";

import { toast as sonnerToast } from "../components/ui/toast";
import type { Toast as ToastType } from "../components/ui/toast";

export type Toast = ToastType;

export const useToast = () => {
  return {
    toast: sonnerToast
  };
};

// Also export the direct toast function for components that prefer to use it directly
export { sonnerToast as toast };
