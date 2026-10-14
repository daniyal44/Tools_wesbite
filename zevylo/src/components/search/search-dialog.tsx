"use client"
import * as React from "react"
import { useRouter } from "next/navigation"
import { Search, X } from "lucide-react"

import "@/tools"
import { getActiveTools, searchTools } from "@/lib/tools/registry"

export function SearchDialog({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  const [query, setQuery] = React.useState("")
  const router = useRouter()
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onOpenChange(!open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [onOpenChange, open])

  React.useEffect(() => {
    if (open) {
      const timer = setTimeout(() => inputRef.current?.focus(), 10)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => setQuery(""), 0)
      return () => clearTimeout(timer)
    }
  }, [open])

  if (!open) return null

  const filtered = query.trim()
    ? searchTools(query)
    : getActiveTools().slice(0, 10)


  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-24">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative z-50 w-full max-w-xl overflow-hidden rounded-xl bg-white shadow-2xl dark:bg-gray-950 border dark:border-gray-800 mx-4">
        <div className="flex items-center border-b border-gray-200 dark:border-gray-800 px-4 py-3">
          <Search className="h-5 w-5 text-gray-400" />
          <input
            ref={inputRef}
            className="flex-1 bg-transparent px-4 py-2 outline-none placeholder:text-gray-400 dark:text-gray-100 text-lg"
            placeholder="Search tools..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={() => onOpenChange(false)} className="rounded-sm opacity-70 hover:opacity-100">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto py-2">
          {filtered.length === 0 ? (
            <p className="p-4 text-center text-sm text-gray-500">No tools found.</p>
          ) : (
            <div className="px-2">
              {filtered.map((tool) => (
                <button
                  key={tool.slug}
                  onClick={() => {
                    router.push(`/tools/${tool.category}/${tool.slug}`)
                    onOpenChange(false)
                  }}
                  className="flex w-full items-center justify-between rounded-md px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <div>
                    <div className="font-medium text-gray-900 dark:text-gray-100">{tool.name}</div>
                    <div className="text-sm text-gray-500 line-clamp-1">{tool.shortDescription}</div>
                  </div>
                  <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-gray-500 dark:text-gray-400 capitalize">
                    {tool.category}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
