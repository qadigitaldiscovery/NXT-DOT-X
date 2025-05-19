
import { cn } from "@/lib/utils";

export interface MainSidebarBackdropProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function MainSidebarBackdrop({ isOpen, onClose }: MainSidebarBackdropProps) {
  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-40 bg-black/60 transition-opacity",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      onClick={onClose}
      aria-hidden="true"
    />
  );
}
