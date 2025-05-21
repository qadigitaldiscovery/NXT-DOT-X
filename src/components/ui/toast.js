"use client";
import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { toast as sonnerToast, Toaster as SonnerToaster } from "sonner";
import React from "react";
// Create a toast function that matches the expected interface
export const toast = {
    ...sonnerToast,
    default: (content) => {
        if (typeof content === 'string') {
            return sonnerToast(content);
        }
        else {
            return sonnerToast(content.title, {
                description: content.description,
            });
        }
    },
    error: (content) => {
        if (typeof content === 'string') {
            return sonnerToast.error(content);
        }
        else {
            return sonnerToast.error(content.title, {
                description: content.description,
            });
        }
    },
    success: (content) => {
        if (typeof content === 'string') {
            return sonnerToast.success(content);
        }
        else {
            return sonnerToast.success(content.title, {
                description: content.description,
            });
        }
    }
};
// Export the Toaster component
export { SonnerToaster as Toaster };
// Export the primitive toast UI components for shadcn compatibility
export const ToastProvider = ({ children }) => _jsx(_Fragment, { children: children });
export const ToastViewport = () => _jsx(_Fragment, {});
export const ToastClose = () => _jsx(_Fragment, {});
export const ToastTitle = ({ children }) => _jsx(_Fragment, { children: children });
export const ToastDescription = ({ children }) => _jsx(_Fragment, { children: children });
// Simplified ToastAction component with proper typing
export const ToastAction = React.forwardRef(({ className, children, ...props }, ref) => (_jsx("button", { className: className, ref: ref, ...props, children: children })));
ToastAction.displayName = "ToastAction";
