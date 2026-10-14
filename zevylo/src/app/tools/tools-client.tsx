'use client';

import * as React from 'react';
import Link from 'next/link';
import { ToolDefinition, CategoryDefinition } from '@/lib/tools/types';
import { Search, ShieldCheck, ArrowRight, X } from 'lucide-react';
import { Card, CardContent } from '@/components/ui';
import { ToolIcon } from '@/components/tools/tool-icon';

interface ToolsDirectoryClientProps {
  initialTools: ToolDefinition[];
  categories: CategoryDefinition[];
}

export function ToolsDirectoryClient({ initialTools, categories }: ToolsDirectoryClientProps) {
  const [search, setSearch] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<string>('all');

  const filteredTools = React.useMemo(() => {
    return initialTools.filter((tool) => {
      const matchesCategory =
        selectedCategory === 'all' || tool.category === selectedCategory;

      if (!matchesCategory) return false;

      if (!search.trim()) return true;

      const q = search.toLowerCase().trim();
      return (
        tool.name.toLowerCase().includes(q) ||
        tool.shortDescription.toLowerCase().includes(q) ||
        tool.category.toLowerCase().includes(q) ||
        tool.keywords.some((kw) => kw.toLowerCase().includes(q))
      );
    });
  }, [initialTools, search, selectedCategory]);

  // Categories that actually contain tools
  const activeCategorySlugs = new Set(initialTools.map((t) => t.category));
  const availableCategories = categories.filter((c) => activeCategorySlugs.has(c.id));

  return (
    <div className="space-y-8">
      {/* Controls: Search and Categories */}
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search all tools by name, description, or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-10 py-3.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm text-sm"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-2 pt-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            All Categories ({initialTools.length})
          </button>
          {availableCategories.map((cat) => {
            const count = initialTools.filter((t) => t.category === cat.id).length;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>
          Showing <strong>{filteredTools.length}</strong> of {initialTools.length} tools
        </span>
        {selectedCategory !== 'all' && (
          <button
            onClick={() => setSelectedCategory('all')}
            className="text-blue-600 dark:text-blue-400 hover:underline text-xs font-medium"
          >
            Clear category filter
          </button>
        )}
      </div>

      {/* Tool Cards Grid */}
      {filteredTools.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-800 p-12 text-center space-y-3">
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            No tools matched your search &quot;{search}&quot;.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedCategory('all');
            }}
            className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTools.map((tool) => (
            <Link
              key={tool.slug}
              href={`/tools/${tool.category}/${tool.slug}`}
              className="group flex flex-col"
            >
              <Card className="h-full border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-blue-500 hover:shadow-md transition-all">
                <CardContent className="p-6 flex flex-col justify-between h-full space-y-4">
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3.5">
                      <ToolIcon
                        slug={tool.slug}
                        category={tool.category}
                        icon={tool.icon}
                        name={tool.name}
                        size="md"
                      />
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                          {tool.category}
                        </span>
                        {tool.executionMode === 'client' && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                            <ShieldCheck className="w-3 h-3" />
                            Client-side
                          </span>
                        )}
                      </div>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                      {tool.shortDescription}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                    <span>Open tool</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
