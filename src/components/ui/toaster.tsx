
import { useToast } from "@/hooks/use-toast"
import {
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { Toaster as SonnerToaster } from "sonner"

export function Toaster() {
  // We're using toasts from useToast for compatibility
  const { toasts } = useToast()

  return (
    <>
      {/* Use the sonner toaster component */}
      <SonnerToaster />
      
      {/* Keep the shadcn structure for compatibility */}
      <ToastProvider>
        {toasts.map(function ({ id, title, description, action, ...props }) {
          return (
            <div key={id} {...props}>
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
              {action}
              <ToastClose />
            </div>
          )
        })}
        <ToastViewport />
      </ToastProvider>
    </>
  )
}
