"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

export type ToastType = 'success' | 'error' | 'info'

export interface ToastMessage {
  id: string
  title: string
  description?: string
  type: ToastType
}

type ToastContextType = {
  toasts: ToastMessage[]
  addToast: (toast: Omit<ToastMessage, 'id'>) => void
  removeToast: (id: string) => void
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastMessage[]>([])

  const addToast = React.useCallback((toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { ...toast, id }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 5000)
  }, [])

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              "flex flex-col gap-1 w-80 rounded-md p-4 shadow-lg border text-white transition-all transform duration-300 ease-in-out",
              toast.type === 'success' && "bg-green-600 border-green-700",
              toast.type === 'error' && "bg-red-600 border-red-700",
              toast.type === 'info' && "bg-blue-600 border-blue-700"
            )}
            role="alert"
          >
            <div className="flex justify-between items-start">
              <h4 className="text-sm font-semibold">{toast.title}</h4>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-white/80 hover:text-white"
              >
                <span className="sr-only">Close</span>
                &times;
              </button>
            </div>
            {toast.description && (
              <p className="text-xs text-white/90">{toast.description}</p>
            )}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return {
    toast: context.addToast,
    toasts: context.toasts,
    dismiss: context.removeToast,
  }
}
