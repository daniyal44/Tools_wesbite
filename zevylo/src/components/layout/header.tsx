"use client"
import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "@/components/ui/theme-provider"
import { SearchDialog } from "@/components/search/search-dialog"
import {
  Menu,
  X,
  Sun,
  Moon,
  Search,
  Sparkles,
  ChevronDown,
  Layers,
  FolderTree,
  Award,
  Info,
  Mail,
  BookOpen
} from "lucide-react"

export function Header() {
  const { theme, setTheme } = useTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [isSearchOpen, setIsSearchOpen] = React.useState(false)
  const [isMoreOpen, setIsMoreOpen] = React.useState(false)
  const moreMenuRef = React.useRef<HTMLDivElement>(null)

  // Close "More" dropdown when clicking outside
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target as Node)) {
        setIsMoreOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200/80 bg-white/90 backdrop-blur-md dark:border-gray-800/80 dark:bg-gray-950/90 transition-colors">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Left Side: Brand Logo + Desktop Nav */}
        <div className="flex items-center gap-6 lg:gap-8">
          <Link href="/" className="flex items-center gap-2 shrink-0 group" aria-label="Zevylo Home — 206+ Free In-Browser Online Utilities">
            <Image
              src="/images/Zevylo_logo.png"
              alt="Zevylo — 206+ Free Client-Side Online Browser Utilities (Zero Cloud Uploads)"
              title="Zevylo — 206+ Free Online Browser Tools (100% Client-Side Privacy)"
              width={122}
              height={31}
              style={{ height: "30px", width: "auto" }}
              className="max-h-7 sm:max-h-8 w-auto object-contain rounded transition-transform group-hover:scale-[1.02]"
              priority
              unoptimized
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {/* AI Tools Featured Link */}
            <Link
              href="/ai-tools"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50/70 dark:text-indigo-400 dark:hover:text-indigo-300 dark:hover:bg-indigo-950/40 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
              <span>AI Tools</span>
              <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black bg-gradient-to-r from-blue-600 to-indigo-600 text-white uppercase tracking-wider shadow-xs">
                Hub
              </span>
            </Link>

            {/* All Tools */}
            <Link
              href="/tools"
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100/70 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800/50 transition-colors"
            >
              All Tools
            </Link>

            {/* Categories */}
            <Link
              href="/categories"
              className="px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100/70 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800/50 transition-colors"
            >
              Categories
            </Link>

            {/* Articles & Guides (Visible on lg+) */}
            <Link
              href="/articles"
              className="hidden lg:inline-flex px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100/70 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800/50 transition-colors"
            >
              Guides
            </Link>

            {/* More Dropdown (Directory, Badges, About, Contact) */}
            <div className="relative" ref={moreMenuRef}>
              <button
                type="button"
                onClick={() => setIsMoreOpen(!isMoreOpen)}
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  isMoreOpen
                    ? "bg-gray-100 text-blue-600 dark:bg-gray-800 dark:text-blue-400"
                    : "text-gray-700 hover:text-blue-600 hover:bg-gray-100/70 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800/50"
                }`}
                aria-expanded={isMoreOpen}
              >
                <span>More</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isMoreOpen ? "rotate-180" : ""}`} />
              </button>

              {isMoreOpen && (
                <div className="absolute left-0 mt-2 w-56 rounded-xl border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-800 dark:bg-gray-900 animate-in fade-in-50 slide-in-from-top-1 z-50">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 px-3 py-1">
                    Resources & Info
                  </div>
                  <Link
                    href="/articles"
                    onClick={() => setIsMoreOpen(false)}
                    className="flex lg:hidden items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    <BookOpen className="w-4 h-4 text-blue-500" />
                    <span>Articles & Guides</span>
                  </Link>
                  <Link
                    href="/sitemap"
                    onClick={() => setIsMoreOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    <FolderTree className="w-4 h-4 text-emerald-500" />
                    <span>HTML Sitemap & Directory</span>
                  </Link>
                  <Link
                    href="/badges"
                    onClick={() => setIsMoreOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    <Award className="w-4 h-4 text-amber-500" />
                    <span>Badges & Embeds</span>
                  </Link>
                  <div className="my-1 border-t border-gray-100 dark:border-gray-800" />
                  <Link
                    href="/about"
                    onClick={() => setIsMoreOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    <Info className="w-4 h-4 text-blue-500" />
                    <span>About Zevylo</span>
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setIsMoreOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    <Mail className="w-4 h-4 text-purple-500" />
                    <span>Contact & Request Tool</span>
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>

        {/* Right Side: Quick Search + Dark Mode + Mobile Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 rounded-full md:rounded-lg border border-gray-200 bg-gray-50/80 px-3 py-1.5 text-xs text-gray-500 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900/80 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors shadow-2xs"
            aria-label="Search tools"
          >
            <Search className="h-3.5 w-3.5 text-gray-400" />
            <span className="hidden sm:inline">Search 206+ tools...</span>
            <kbd className="hidden sm:inline text-[10px] font-semibold bg-gray-200/70 dark:bg-gray-800 px-1.5 py-0.5 rounded text-gray-500 dark:text-gray-400">
              ⌘K
            </kbd>
          </button>

          <button
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-50 dark:hover:bg-gray-800/60 rounded-lg transition-colors"
            aria-label="Toggle color theme"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-4 py-5 space-y-4 animate-in slide-in-from-top-2">
          {/* Featured AI tools */}
          <Link
            href="/ai-tools"
            className="flex items-center justify-between p-3 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-900/50"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-sm font-bold text-indigo-700 dark:text-indigo-300">AI Tools Hub</span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-indigo-600 text-white uppercase">
              Directory
            </span>
          </Link>

          {/* Core Navigation */}
          <div className="space-y-1">
            <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 px-2 py-1">
              Tools Suite
            </div>
            <Link
              href="/tools"
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Layers className="w-4 h-4 text-blue-500" />
              <span>All 206+ Tools</span>
            </Link>
            <Link
              href="/categories"
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Layers className="w-4 h-4 text-purple-500" />
              <span>Browse Categories</span>
            </Link>
          </div>

          {/* Resources */}
          <div className="space-y-1 pt-2 border-t border-gray-100 dark:border-gray-800">
            <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 px-2 py-1">
              Resources & Info
            </div>
            <Link
              href="/articles"
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <BookOpen className="w-4 h-4 text-blue-500" />
              <span>Articles & Guides</span>
            </Link>
            <Link
              href="/sitemap"
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <FolderTree className="w-4 h-4 text-emerald-500" />
              <span>Directory (HTML Sitemap)</span>
            </Link>
            <Link
              href="/badges"
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Award className="w-4 h-4 text-amber-500" />
              <span>Badges & Embeds</span>
            </Link>
            <Link
              href="/about"
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Info className="w-4 h-4 text-gray-500" />
              <span>About Us</span>
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Mail className="w-4 h-4 text-rose-500" />
              <span>Contact & Support</span>
            </Link>
          </div>
        </div>
      )}

      <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </header>
  )
}
