"use client"
import * as React from "react"
import { Button, ButtonProps } from "./button"

interface CopyButtonProps extends ButtonProps {
  textToCopy: string
}

export function CopyButton({ textToCopy, className, ...props }: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className={className}
      onClick={handleCopy}
      {...props}
    >
      {copied ? "Copied!" : "Copy"}
    </Button>
  )
}
