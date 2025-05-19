
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface MainSidebarContentProps {
  onClose?: () => void;
}

export function MainSidebarContent({ onClose }: MainSidebarContentProps) {
  return (
    <>
      <div className="flex h-14 items-center justify-between border-b border-border px-4">
        <span className="font-semibold">Navigation</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="h-8 w-8 p-0 text-muted-foreground"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </div>
      <div className="flex-1 overflow-auto p-4">
        <p>Sidebar Content Here</p>
      </div>
    </>
  );
}
