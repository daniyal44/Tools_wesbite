"use client"
import * as React from "react"
import { cn } from "@/lib/utils"

export interface FileUploadProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onFileSelect: (file: File | null) => void
  accept?: string
  maxSizeMB?: number
  label?: string
}

export function FileUpload({ onFileSelect, accept, maxSizeMB = 5, label, className, ...props }: FileUploadProps) {
  const [dragActive, setDragActive] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const validateAndSetFile = (file: File | undefined) => {
    setError(null)
    if (!file) {
      onFileSelect(null)
      return
    }

    if (maxSizeMB && file.size > maxSizeMB * 1024 * 1024) {
      setError(`File size exceeds ${maxSizeMB}MB limit.`)
      onFileSelect(null)
      return
    }

    if (accept) {
      const acceptedTypes = accept.split(',').map(t => t.trim().toLowerCase())
      const fileExt = `.${file.name.split('.').pop()?.toLowerCase()}`
      const isAccepted = acceptedTypes.some(type => {
        if (type.startsWith('.')) return type === fileExt
        if (type.endsWith('/*')) return file.type.startsWith(type.replace('/*', ''))
        return type === file.type
      })

      if (!isAccepted) {
        setError(`File type not accepted.`)
        onFileSelect(null)
        return
      }
    }

    onFileSelect(file)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      validateAndSetFile(e.target.files[0])
    }
  }

  const onButtonClick = () => {
    inputRef.current?.click()
  }

  return (
    <div className={cn("flex flex-col gap-2 w-full", className)}>
      {label && <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>}
      <div
        className={cn(
          "relative flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-lg cursor-pointer transition-colors",
          dragActive ? "border-blue-500 bg-blue-50 dark:bg-blue-950" : "border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 bg-gray-50 dark:bg-gray-900"
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={onButtonClick}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept={accept}
          onChange={handleChange}
          {...props}
        />
        <div className="flex flex-col items-center gap-1 text-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {accept ? `Accepted: ${accept}` : "Any file"} (Max: {maxSizeMB}MB)
          </p>
        </div>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  )
}
