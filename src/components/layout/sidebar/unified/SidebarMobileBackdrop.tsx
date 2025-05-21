
interface SidebarMobileBackdropProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SidebarMobileBackdrop({ isOpen, onClose }: SidebarMobileBackdropProps) {
  if (!isOpen) return null;
  
  return (
    <div
      className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity"
      onClick={onClose}
      aria-hidden="true"
    />
  );
}
