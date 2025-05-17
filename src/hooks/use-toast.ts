
// Re-export from the hooks directory
import { useToast as useToastOriginal, toast } from "@/components/ui/toast";
import type { Toast as ToastType } from "@/components/ui/toast";

// Re-export with renamed type
export const useToast = useToastOriginal;
export { toast };
export type Toast = ToastType;
