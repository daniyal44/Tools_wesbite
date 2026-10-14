"use client"
import * as React from "react"
import { CopyButton, Button, Card, CardHeader, CardTitle, CardContent } from "@/components/ui"
import { Download } from "lucide-react"

interface ToolResultProps {
  title?: string
  result: string
  onDownload?: () => void
  error?: boolean
}

export function ToolResult({ title = "Result", result, onDownload, error }: ToolResultProps) {
  if (!result && !error) return null

  return (
    <Card className="w-full mt-6">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {result && !error && (
          <div className="flex gap-2">
            <CopyButton textToCopy={result} />
            {onDownload && (
              <Button variant="outline" size="sm" onClick={onDownload}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            )}
          </div>
        )}
      </CardHeader>
      <CardContent>
        {error ? (
          <div className="p-4 rounded-md bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm">
            {result}
          </div>
        ) : (
          <pre className="p-4 rounded-md bg-gray-50 dark:bg-gray-900 text-sm overflow-x-auto whitespace-pre-wrap font-mono text-gray-800 dark:text-gray-200">
            {result}
          </pre>
        )}
      </CardContent>
    </Card>
  )
}
