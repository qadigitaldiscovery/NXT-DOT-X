
"use client";

import { useToast } from "@/hooks/use-toast";
import {
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <>
      <SonnerToaster 
        position="bottom-right"
        toastOptions={{
          style: {
            background: "hsl(var(--background))",
            color: "hsl(var(--foreground))",
            border: "1px solid hsl(var(--border))",
          },
        }}
      />
      
      <ToastProvider>
        {toasts.map(function ({ id, title, description, ...props }) {
          return (
            <div key={id} {...props}>
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
              <ToastClose />
            </div>
          );
        })}
        <ToastViewport />
      </ToastProvider>
    </>
  );
}
