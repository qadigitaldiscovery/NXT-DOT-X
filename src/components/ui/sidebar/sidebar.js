import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useSidebar } from "./sidebar-context";
const sidebarVariants = cva("group/sidebar peer data-[variant=inset]:bg-sidebar h-screen z-40", {
    variants: {
        variant: {
            default: "border-r border-border",
            inset: "border-none bg-sidebar",
        },
        padding: {
            default: "p-0",
            sm: "p-2",
            md: "p-4",
            lg: "p-6",
            xl: "p-8",
        },
        state: {
            expanded: "w-[var(--sidebar-width)]",
            collapsed: "w-[var(--sidebar-width-icon)]",
        },
        position: {
            default: "sticky top-0 left-0",
            fixed: "fixed inset-y-0 left-0",
        },
        collapsible: {
            default: "",
            auto: "",
            icon: "",
        },
    },
    defaultVariants: {
        variant: "default",
        padding: "default",
        state: "expanded",
        position: "default",
        collapsible: "default",
    },
});
const Sidebar = React.forwardRef(({ variant = "default", padding = "default", position = "default", collapsible = "default", className, ...props }, ref) => {
    const { state, isMobile, openMobile, setOpenMobile, } = useSidebar();
    React.useEffect(() => {
        const handleResize = () => {
            if (collapsible === "auto" && !isMobile) {
                // Handle responsive behavior
                const shouldBeOpen = window.innerWidth > 1024;
                useSidebar().setOpen(shouldBeOpen);
            }
        };
        if (collapsible === "auto") {
            window.addEventListener("resize", handleResize);
            handleResize();
        }
        return () => {
            if (collapsible === "auto") {
                window.removeEventListener("resize", handleResize);
            }
        };
    }, [collapsible, isMobile]);
    return (_jsxs(_Fragment, { children: [isMobile && openMobile && (_jsx("div", { className: "fixed inset-0 z-30 bg-background/80 backdrop-blur-sm", onClick: () => setOpenMobile(false), "aria-hidden": "true" })), _jsx("aside", { ref: ref, "data-sidebar": "root", "data-variant": variant, "data-state": state, "data-collapsible": collapsible, "data-position": position, "data-padding": padding, className: cn(sidebarVariants({
                    variant,
                    padding,
                    state,
                    position,
                    collapsible,
                }), 
                // Show and hide on mobile.
                isMobile && "fixed -left-[var(--sidebar-width)] max-sm:!w-full", isMobile && openMobile && "left-0", className), ...props })] }));
});
Sidebar.displayName = "Sidebar";
export { Sidebar };
