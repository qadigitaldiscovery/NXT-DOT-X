
import { VariantProps } from "class-variance-authority"
import { ElementRef, HTMLAttributes, ComponentPropsWithoutRef, ReactNode } from "react"
import { TooltipContentProps } from "@radix-ui/react-tooltip"
import { sidebarMenuButtonVariants } from "./sidebar-menu-button"

export type SidebarState = "expanded" | "collapsed"

export interface SidebarContext {
  state: SidebarState
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

export interface SidebarProviderProps extends React.ComponentProps<"div"> {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export interface SidebarProps extends React.ComponentProps<"div"> {
  side?: "left" | "right" 
  variant?: "sidebar" | "floating" | "inset"
  collapsible?: "offcanvas" | "icon" | "none"
}

export interface SidebarTriggerProps extends React.ComponentProps<typeof import("@/components/ui/button").Button> {}

export interface SidebarRailProps extends React.ComponentProps<"button"> {}

export interface SidebarInsetProps extends React.ComponentProps<"main"> {}

export interface SidebarInputProps extends React.ComponentProps<typeof import("@/components/ui/input").Input> {}

export interface SidebarHeaderProps extends React.ComponentProps<"div"> {}

export interface SidebarFooterProps extends React.ComponentProps<"div"> {}

export interface SidebarSeparatorProps extends React.ComponentProps<typeof import("@/components/ui/separator").Separator> {}

export interface SidebarContentProps extends React.ComponentProps<"div"> {}

export interface SidebarGroupProps extends React.ComponentProps<"div"> {}

export interface SidebarGroupLabelProps extends React.ComponentProps<"div"> {
  asChild?: boolean
}

export interface SidebarGroupActionProps extends React.ComponentProps<"button"> {
  asChild?: boolean
}

export interface SidebarGroupContentProps extends React.ComponentProps<"div"> {}

export interface SidebarMenuProps extends React.ComponentProps<"ul"> {}

export interface SidebarMenuItemProps extends React.ComponentProps<"li"> {}

export interface SidebarMenuButtonProps extends React.ComponentProps<"button">, 
  VariantProps<typeof sidebarMenuButtonVariants> {
  asChild?: boolean
  isActive?: boolean
  tooltip?: string | ComponentPropsWithoutRef<typeof import("@radix-ui/react-tooltip").TooltipContent>
}

export interface SidebarMenuActionProps extends React.ComponentProps<"button"> {
  asChild?: boolean
  showOnHover?: boolean
}

export interface SidebarMenuBadgeProps extends React.ComponentProps<"div"> {}

export interface SidebarMenuSkeletonProps extends React.ComponentProps<"div"> {
  showIcon?: boolean
}

export interface SidebarMenuSubProps extends React.ComponentProps<"ul"> {}

export interface SidebarMenuSubItemProps extends React.ComponentProps<"li"> {}

export interface SidebarMenuSubButtonProps extends React.ComponentProps<"a"> {
  asChild?: boolean
  size?: "sm" | "md"
  isActive?: boolean
}
