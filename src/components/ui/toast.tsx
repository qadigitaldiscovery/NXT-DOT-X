
// Re-exporting from sonner
import { toast, Toaster as SonnerToaster } from 'sonner';
import React from 'react';

// Define the Toast type to match expected interface
export type Toast = {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  [key: string]: unknown;
};

// Export the components
export { toast, SonnerToaster as Toaster };

// Export the primitive toast UI components
export const ToastProvider = ({children}: {children: React.ReactNode}) => <>{children}</>;
export const ToastViewport = () => <></>;
export const ToastClose = () => <></>;
export const ToastTitle = ({children}: {children: React.ReactNode}) => <>{children}</>;
export const ToastDescription = ({children}: {children: React.ReactNode}) => <>{children}</>;
