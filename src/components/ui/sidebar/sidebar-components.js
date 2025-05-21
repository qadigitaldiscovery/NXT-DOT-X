import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
// SidebarInset component
const SidebarInset = React.forwardRef(({ className, ...props }, ref) => {
    return (_jsx("main", { ref: ref, className: cn("relative flex min-h-svh flex-1 flex-col bg-background", "peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow", className), ...props }));
});
SidebarInset.displayName = "SidebarInset";
// SidebarInput component
const SidebarInput = React.forwardRef(({ className, ...props }, ref) => {
    return (_jsx(Input, { ref: ref, "data-sidebar": "input", className: cn("h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring", className), ...props }));
});
SidebarInput.displayName = "SidebarInput";
// SidebarHeader component
const SidebarHeader = React.forwardRef(({ className, ...props }, ref) => {
    return (_jsx("div", { ref: ref, "data-sidebar": "header", className: cn("flex flex-col gap-2 p-2", className), ...props }));
});
SidebarHeader.displayName = "SidebarHeader";
// SidebarFooter component
const SidebarFooter = React.forwardRef(({ className, ...props }, ref) => {
    return (_jsx("div", { ref: ref, "data-sidebar": "footer", className: cn("flex flex-col gap-2 p-2", className), ...props }));
});
SidebarFooter.displayName = "SidebarFooter";
// SidebarSeparator component
const SidebarSeparator = React.forwardRef(({ className, ...props }, ref) => {
    return (_jsx(Separator, { ref: ref, "data-sidebar": "separator", className: cn("mx-2 w-auto bg-sidebar-border", className), ...props }));
});
SidebarSeparator.displayName = "SidebarSeparator";
// SidebarContent component
const SidebarContent = React.forwardRef(({ className, ...props }, ref) => {
    return (_jsx("div", { ref: ref, "data-sidebar": "content", className: cn("flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden", className), ...props }));
});
SidebarContent.displayName = "SidebarContent";
// SidebarGroup component
const SidebarGroup = React.forwardRef(({ className, ...props }, ref) => {
    return (_jsx("div", { ref: ref, "data-sidebar": "group", className: cn("relative flex w-full min-w-0 flex-col p-2", className), ...props }));
});
SidebarGroup.displayName = "SidebarGroup";
// SidebarGroupLabel component
const SidebarGroupLabel = React.forwardRef(({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (_jsx(Comp, { ref: ref, "data-sidebar": "group-label", className: cn("duration-200 flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opa] ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0", "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0", className), ...props }));
});
SidebarGroupLabel.displayName = "SidebarGroupLabel";
// SidebarGroupAction component
const SidebarGroupAction = React.forwardRef(({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (_jsx(Comp, { ref: ref, "data-sidebar": "group-action", className: cn("absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0", 
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden", "group-data-[collapsible=icon]:hidden", className), ...props }));
});
SidebarGroupAction.displayName = "SidebarGroupAction";
// SidebarGroupContent component
const SidebarGroupContent = React.forwardRef(({ className, ...props }, ref) => (_jsx("div", { ref: ref, "data-sidebar": "group-content", className: cn("w-full text-sm", className), ...props })));
SidebarGroupContent.displayName = "SidebarGroupContent";
// SidebarMenu component
const SidebarMenu = React.forwardRef(({ className, ...props }, ref) => (_jsx("ul", { ref: ref, "data-sidebar": "menu", className: cn("flex w-full min-w-0 flex-col gap-1", className), ...props })));
SidebarMenu.displayName = "SidebarMenu";
// SidebarMenuItem component
const SidebarMenuItem = React.forwardRef(({ className, ...props }, ref) => (_jsx("li", { ref: ref, "data-sidebar": "menu-item", className: cn("group/menu-item relative", className), ...props })));
SidebarMenuItem.displayName = "SidebarMenuItem";
// SidebarMenuAction component
const SidebarMenuAction = React.forwardRef(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (_jsx(Comp, { ref: ref, "data-sidebar": "menu-action", className: cn("absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0", 
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden", "peer-data-[size=sm]/menu-button:top-1", "peer-data-[size=default]/menu-button:top-1.5", "peer-data-[size=lg]/menu-button:top-2.5", "group-data-[collapsible=icon]:hidden", showOnHover &&
            "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0", className), ...props }));
});
SidebarMenuAction.displayName = "SidebarMenuAction";
// SidebarMenuBadge component
const SidebarMenuBadge = React.forwardRef(({ className, ...props }, ref) => (_jsx("div", { ref: ref, "data-sidebar": "menu-badge", className: cn("absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground select-none pointer-events-none", "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground", "peer-data-[size=sm]/menu-button:top-1", "peer-data-[size=default]/menu-button:top-1.5", "peer-data-[size=lg]/menu-button:top-2.5", "group-data-[collapsible=icon]:hidden", className), ...props })));
SidebarMenuBadge.displayName = "SidebarMenuBadge";
// SidebarMenuSkeleton component
const SidebarMenuSkeleton = React.forwardRef(({ className, showIcon = false, ...props }, ref) => {
    // Random width between 50 to 90%.
    const width = React.useMemo(() => {
        return `${Math.floor(Math.random() * 40) + 50}%`;
    }, []);
    return (_jsxs("div", { ref: ref, "data-sidebar": "menu-skeleton", className: cn("rounded-md h-8 flex gap-2 px-2 items-center", className), ...props, children: [showIcon && (_jsx(Skeleton, { className: "size-4 rounded-md", "data-sidebar": "menu-skeleton-icon" })), _jsx(Skeleton, { className: "h-4 flex-1 max-w-[--skeleton-width]", "data-sidebar": "menu-skeleton-text", style: {
                    "--skeleton-width": width,
                } })] }));
});
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";
// SidebarMenuSub component
const SidebarMenuSub = React.forwardRef(({ className, ...props }, ref) => (_jsx("ul", { ref: ref, "data-sidebar": "menu-sub", className: cn("mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5", "group-data-[collapsible=icon]:hidden", className), ...props })));
SidebarMenuSub.displayName = "SidebarMenuSub";
// SidebarMenuSubItem component
const SidebarMenuSubItem = React.forwardRef(({ ...props }, ref) => _jsx("li", { ref: ref, ...props }));
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";
// SidebarMenuSubButton component
const SidebarMenuSubButton = React.forwardRef(({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
    const Comp = asChild ? Slot : "a";
    return (_jsx(Comp, { ref: ref, "data-sidebar": "menu-sub-button", "data-size": size, "data-active": isActive, className: cn("flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground", "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground", size === "sm" && "text-xs", size === "md" && "text-sm", "group-data-[collapsible=icon]:hidden", className), ...props }));
});
SidebarMenuSubButton.displayName = "SidebarMenuSubButton";
export { SidebarInset, SidebarInput, SidebarHeader, SidebarFooter, SidebarSeparator, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupAction, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuAction, SidebarMenuBadge, SidebarMenuSkeleton, SidebarMenuSub, SidebarMenuSubItem, SidebarMenuSubButton };
