"use client";

import { toast as sonnerToast, Toaster as SonnerToaster } from "sonner";
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

// Create a wrapper for sonner toast that's callable and compatible with existing code
const toastFunction = (props: {
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: "default" | "destructive";
  action?: React.ReactNode;
}) => {
  if (props.variant === "destructive") {
    return sonnerToast.error(props.title as string, {
      description: props.description as string,
    });
  }
  return sonnerToast(props.title as string, {
    description: props.description as string,
  });
};

// Add all sonner methods to our function
export const toast = Object.assign(toastFunction, {
  ...sonnerToast,
  custom: toastFunction
});

// Export the Toaster component
export { SonnerToaster as Toaster };

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
