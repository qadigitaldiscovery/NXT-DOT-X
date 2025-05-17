
import { toast } from "@/components/ui/toast";
import type { Toast } from "@/components/ui/toast";

// Re-export with renamed type
export { toast };
export type { Toast };

// If you need to use a hook-based toast approach:
export const useToast = () => {
  return { toast };
};
