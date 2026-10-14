"use client"
import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "@/components/ui/theme-provider"
import { SearchDialog } from "@/components/search/search-dialog"
import { Menu, X, Sun, Moon, Search, Sparkles } from "lucide-react"

export function Header() {
  const { theme, setTheme } = useTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [isSearchOpen, setIsSearchOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-950/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 group" aria-label="Zevylo Home">
            <Image
              src="/images/Zevylo_logo.png"
              alt="Zevylo Logo"
              width={140}
              height={36}
              className="h-8 sm:h-9 w-auto object-contain rounded transition-opacity group-hover:opacity-90"
              priority
              unoptimized
            />
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/ai-tools" className="inline-flex items-center gap-1.5 text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>AI Tools</span>
              <span className="px-1.5 py-0.2 rounded-full text-[9px] font-black bg-gradient-to-r from-blue-600 to-indigo-600 text-white uppercase tracking-wider">Hub</span>
            </Link>
            <Link href="/tools" className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
              All Tools
            </Link>
            <Link href="/categories" className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
              Categories
            </Link>
            <Link href="/articles" className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
              Articles & Guides
            </Link>
            <Link href="/sitemap" className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
              Directory
            </Link>
            <Link href="/badges" className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
              Badges
            </Link>
            <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors">
              Contact
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 rounded-full md:rounded-md border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm text-gray-500 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"
          >
            <Search className="h-4 w-4" />
            <span className="hidden md:inline">Search tools...</span>
            <span className="hidden md:inline text-xs bg-gray-200 dark:bg-gray-800 px-1.5 py-0.5 rounded">⌘K</span>
          </button>
          
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 rounded-md"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 rounded-md"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 py-4 space-y-3">
          <Link href="/ai-tools" className="flex items-center gap-2 text-sm font-bold text-indigo-600 dark:text-indigo-400" onClick={() => setIsMobileMenuOpen(false)}>
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>AI Tools Hub (Directory)</span>
            <span className="px-1.5 py-0.2 rounded-full text-[9px] font-black bg-blue-600 text-white">NEW</span>
          </Link>
          <Link href="/tools" className="block text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>
            All Tools
          </Link>
          <Link href="/categories" className="block text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>
            Categories
          </Link>
          <Link href="/articles" className="block text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>
            Articles & Guides
          </Link>
          <Link href="/sitemap" className="block text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>
            Directory
          </Link>
          <Link href="/badges" className="block text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>
            Badges
          </Link>
          <Link href="/about" className="block text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>
            About
          </Link>
          <Link href="/contact" className="block text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600" onClick={() => setIsMobileMenuOpen(false)}>
            Contact
          </Link>
        </div>
      )}

      <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </header>
  )
}
