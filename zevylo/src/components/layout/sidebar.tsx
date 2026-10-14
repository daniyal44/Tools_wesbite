"use client"
import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

import "@/tools"
import { categoryList } from "@/lib/tools/categories"
import { getToolsByCategory } from "@/lib/tools/registry"

export function Sidebar() {
  const pathname = usePathname()
  const [isExpanded, setIsExpanded] = React.useState(false)

  const activeCategories = React.useMemo(() => {
    return categoryList.map((cat) => ({
      id: cat.slug,
      name: cat.name,
      count: getToolsByCategory(cat.id).length,
    })).filter((c) => c.count > 0);
  }, []);

  return (
    <aside className="w-full md:w-64 flex-shrink-0">
      <div className="md:sticky md:top-24 space-y-2">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-between md:hidden p-4 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
        >
          <span className="font-semibold text-gray-900 dark:text-gray-100">Categories</span>
          <ChevronDown className={cn("w-5 h-5 transition-transform", isExpanded && "rotate-180")} />
        </button>

        <div className={cn("md:block space-y-1", !isExpanded && "hidden")}>
          {activeCategories.map((cat) => {
            const isActive = pathname.includes(`/tools/${cat.id}`)
            return (
              <Link
                key={cat.id}
                href={`/tools/${cat.id}`}
                className={cn(
                  "flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800/50"
                )}
              >
                <div className="flex items-center gap-3">
                  <span className={cn("w-2 h-2 rounded-full", isActive ? "bg-blue-600 dark:bg-blue-400" : "bg-gray-300 dark:bg-gray-700")} />
                  {cat.name}
                </div>
                <span className={cn(
                  "text-xs px-2 py-0.5 rounded-full",
                  isActive ? "bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-200" : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                )}>
                  {cat.count}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </aside>
  )
}
