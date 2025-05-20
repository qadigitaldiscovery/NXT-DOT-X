
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { useSidebar } from "./sidebar-context"
import { SidebarMenuButtonProps } from "./types"

export const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none transition-[width,height,padding] hover:text-sidebar-accent-foreground hover:underline focus-visible:ring-2 active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:text-sidebar-accent-foreground",
        outline:
          "bg-background hover:text-sidebar-accent-foreground hover:underline",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const SidebarMenuButton = React.forwardRef<
  HTMLAnchorElement,
  Omit<SidebarMenuButtonProps, 'ref'> & React.AnchorHTMLAttributes<HTMLAnchorElement>
>(
  (
    {
      asChild = false,
      isActive = false,
      variant = "default",
      size = "default",
      tooltip,
      className,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "a"
    
    // Safely access sidebar context, providing fallback values if not in a SidebarProvider
    let sidebarContext;
    try {
      sidebarContext = useSidebar();
    } catch (error) {
      // If the context isn't available, provide default values
      sidebarContext = { isMobile: false, state: "expanded" };
      console.warn("SidebarMenuButton used outside of SidebarProvider - using default values");
    }
    
    const { isMobile, state } = sidebarContext;

    const button = (
      <Comp
        ref={ref}
        href="#"
        onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
          e.preventDefault();
          if (props.onClick) props.onClick(e);
        }}
        data-sidebar="menu-button"
        data-size={size}
        data-active={isActive}
        className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
        {...props}
      />
    )

    if (!tooltip) {
      return button
    }

    if (typeof tooltip === "string") {
      tooltip = {
        children: tooltip,
      }
    }

    // Only show tooltip if we have it and the sidebar is collapsed
    const showTooltip = tooltip && state === "collapsed" && !isMobile;

    if (showTooltip) {
      return (
        <Tooltip>
          <TooltipTrigger asChild>{button}</TooltipTrigger>
          <TooltipContent
            side="right"
            align="center"
            {...tooltip}
          />
        </Tooltip>
      );
    }

    return button;
  }
)
SidebarMenuButton.displayName = "SidebarMenuButton"

export { SidebarMenuButton }
