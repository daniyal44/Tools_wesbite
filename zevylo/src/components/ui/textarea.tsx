import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
  showCount?: boolean
  maxLength?: number
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, showCount, maxLength, id, value, onChange, ...props }, ref) => {
    const defaultId = React.useId()
    const textareaId = id || defaultId
    const [charCount, setCharCount] = React.useState(0)

    React.useEffect(() => {
      if (typeof value === 'string') {
        setCharCount(value.length)
      }
    }, [value])

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length)
      if (onChange) onChange(e)
    }

    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={textareaId} className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          value={value}
          onChange={handleChange}
          maxLength={maxLength}
          className={cn(
            "flex min-h-[80px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:placeholder:text-gray-500",
            error && "border-red-500 focus:ring-red-500 dark:border-red-500",
            className
          )}
          ref={ref}
          {...props}
        />
        <div className="flex justify-between items-start">
          <div className="flex flex-col">
            {error && <p className="text-xs text-red-500">{error}</p>}
            {helperText && !error && <p className="text-xs text-gray-500 dark:text-gray-400">{helperText}</p>}
          </div>
          {showCount && maxLength && (
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-auto pl-2">
              {charCount}/{maxLength}
            </span>
          )}
        </div>
      </div>
    )
  }
)
Textarea.displayName = "Textarea"
