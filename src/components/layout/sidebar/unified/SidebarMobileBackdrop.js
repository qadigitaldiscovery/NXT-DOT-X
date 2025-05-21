import { jsx as _jsx } from "react/jsx-runtime";
export function SidebarMobileBackdrop({ isOpen, onClose }) {
    if (!isOpen)
        return null;
    return (_jsx("div", { className: "fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity", onClick: onClose, "aria-hidden": "true" }));
}
