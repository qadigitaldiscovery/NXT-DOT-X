
"use client";

import { toast, Toaster as SonnerToaster } from "sonner";
import React from "react";

// Define a proper Toast type to match expected interface
export type Toast = {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  variant?: "default" | "destructive";
  [key: string]: unknown;
};

// Export the toast function and Toaster component
export { toast, SonnerToaster as Toaster };

// Export the primitive toast UI components for shadcn compatibility
export const ToastProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const ToastViewport = () => <></>;
export const ToastClose = () => <></>;
export const ToastTitle = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const ToastDescription = ({ children }: { children: React.ReactNode }) => <>{children}</>;

// Simplified ToastAction component with proper typing
export const ToastAction = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => (
  <button className={className} ref={ref} {...props}>
    {children}
  </button>
));

ToastAction.displayName = "ToastAction";
