
import * as React from "react"
import { PanelLeft } from "lucide-react"
import { cn } from "@/lib/utils"
import { useSidebar } from "./sidebar-context"
import { SidebarTriggerProps } from "./types"

const SidebarTrigger = React.forwardRef<
  HTMLAnchorElement,
  Omit<SidebarTriggerProps, 'ref'> & React.AnchorHTMLAttributes<HTMLAnchorElement>
>(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();

  return (
    <a
      ref={ref}
      href="#"
      data-sidebar="trigger"
      className={cn("inline-flex items-center justify-center h-7 w-7 text-primary hover:text-primary/80", className)}
      onClick={(event) => {
        event.preventDefault();
        onClick?.(event as any);
        toggleSidebar();
      }}
      aria-label="Toggle Sidebar"
      {...props}
    >
      <PanelLeft aria-hidden="true" />
    </a>
  )
})
SidebarTrigger.displayName = "SidebarTrigger"

export { SidebarTrigger }
