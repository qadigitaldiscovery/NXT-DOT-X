"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { Toaster as SonnerToaster } from "sonner";
export function Toaster() {
    return (_jsx(SonnerToaster, { position: "bottom-right", toastOptions: {
            style: {
                background: "hsl(var(--background))",
                color: "hsl(var(--foreground))",
                border: "1px solid hsl(var(--border))",
            },
        } }));
}
