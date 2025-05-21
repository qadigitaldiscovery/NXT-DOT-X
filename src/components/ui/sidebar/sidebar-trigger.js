import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { PanelLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSidebar } from "./sidebar-context";
const SidebarTrigger = React.forwardRef(({ className, onClick, ...props }, ref) => {
    const { toggleSidebar } = useSidebar();
    return (_jsx("a", { ref: ref, href: "#", "data-sidebar": "trigger", className: cn("inline-flex items-center justify-center h-7 w-7 text-primary hover:text-primary/80", className), onClick: (event) => {
            event.preventDefault();
            onClick?.(event);
            toggleSidebar();
        }, "aria-label": "Toggle Sidebar", ...props, children: _jsx(PanelLeft, { "aria-hidden": "true" }) }));
});
SidebarTrigger.displayName = "SidebarTrigger";
export { SidebarTrigger };
