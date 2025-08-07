"use client"

import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, icon, variant, ...props }) {
        return (
          <Toast key={id} variant={variant} {...props}>
            <div className="flex items-start gap-3 w-full">
              {icon && (
                <div className="shrink-0 mt-0.5">
                  {icon}
                </div>
              )}
              <div className="flex-1 min-w-0">
                {title && (
                  <ToastTitle className="text-sm font-semibold leading-5">
                    {title}
                  </ToastTitle>
                )}
                {description && typeof description === 'string' && (
                  <ToastDescription className="text-sm leading-5 mt-1 text-muted-foreground">
                    {description.split('\n').map((line: string, index: number) => (
                      <div key={index} className="flex items-center gap-1">
                        {line.startsWith('•') ? (
                          <>
                            <span className="w-1 h-1 bg-current rounded-full opacity-60"></span>
                            <span>{line.substring(1).trim()}</span>
                          </>
                        ) : (
                          <span>{line}</span>
                        )}
                      </div>
                    ))}
                  </ToastDescription>
                )}
                {description && typeof description !== 'string' && (
                  <ToastDescription className="text-sm leading-5 mt-1 text-muted-foreground">
                    {description}
                  </ToastDescription>
                )}
              </div>
              <div className="flex flex-col items-end gap-2">
                {action}
                <ToastClose className="shrink-0" />
              </div>
            </div>
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
