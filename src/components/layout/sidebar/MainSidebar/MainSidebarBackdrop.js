import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
export function MainSidebarBackdrop({ isOpen, onClose }) {
    if (!isOpen)
        return null;
    return (_jsx("div", { className: cn("fixed inset-0 z-40 bg-black/60 transition-opacity", isOpen ? "opacity-100" : "opacity-0 pointer-events-none"), onClick: onClose, "aria-hidden": "true" }));
}
