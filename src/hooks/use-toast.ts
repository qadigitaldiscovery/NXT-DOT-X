"use client";

import { toast } from "@/components/ui/toast";
import type { Toast as ToastType } from "@/components/ui/toast";

export type Toast = ToastType;

// Re-export toast directly from UI components
export { toast };

export const useToast = () => {
  return {
    toast,
  };
};
