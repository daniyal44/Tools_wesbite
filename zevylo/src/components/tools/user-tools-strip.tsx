'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Star, Clock, ArrowRight } from 'lucide-react';
import { getToolBySlug } from '@/lib/tools/registry';
import { ToolIcon } from './tool-icon';

interface RecentItem {
  slug: string;
  name: string;
  category: string;
  timestamp: number;
}

export function UserToolsStrip() {
  const [favoriteSlugs, setFavoriteSlugs] = useState<string[]>([]);
  const [recentItems, setRecentItems] = useState<RecentItem[]>([]);
  const [mounted, setMounted] = useState<boolean>(false);

  const loadData = () => {
    try {
      const favs: string[] = JSON.parse(localStorage.getItem('zevylo_favorite_tools') || '[]');
      const recents: RecentItem[] = JSON.parse(localStorage.getItem('zevylo_recent_tools') || '[]');
      setFavoriteSlugs(favs);
      setRecentItems(recents.slice(0, 6));
    } catch {
      // Ignore
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      loadData();
      setMounted(true);
    }, 0);

    const handleUpdate = () => loadData();
    window.addEventListener('zevylo_favorites_updated', handleUpdate);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('zevylo_favorites_updated', handleUpdate);
    };
  }, []);

  if (!mounted || (favoriteSlugs.length === 0 && recentItems.length === 0)) {
    return null;
  }

  return (
    <section className="py-8 bg-blue-500/5 border-y border-blue-500/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Pinned Favorites */}
        {favoriteSlugs.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-gray-100">
                Your Pinned Favorites ({favoriteSlugs.length})
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {favoriteSlugs.map((slug) => {
                const tool = getToolBySlug(slug);
                if (!tool) return null;
                return (
                  <Link
                    key={slug}
                    href={`/tools/${tool.category}/${tool.slug}`}
                    className="p-3 rounded-xl bg-white dark:bg-gray-900 border border-amber-500/20 hover:border-amber-500 shadow-sm transition-all group flex items-center gap-2.5"
                  >
                    <ToolIcon
                      slug={tool.slug}
                      category={tool.category}
                      icon={tool.icon}
                      name={tool.name}
                      size="sm"
                      className="shrink-0 rounded-lg"
                    />
                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-semibold text-gray-900 dark:text-gray-100 group-hover:text-amber-500 line-clamp-1 block">
                        {tool.name}
                      </span>
                      <span className="text-[10px] text-gray-400 dark:text-gray-500 capitalize block">
                        {tool.category}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Recently Used */}
        {recentItems.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-500" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-gray-100">
                  Recently Used
                </h2>
              </div>
              <button
                onClick={() => {
                  localStorage.removeItem('zevylo_recent_tools');
                  setRecentItems([]);
                }}
                className="text-[11px] text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                Clear History
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {recentItems.map((item) => (
                <Link
                  key={item.slug}
                  href={`/tools/${item.category}/${item.slug}`}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-blue-500 text-xs text-gray-800 dark:text-gray-200 transition-colors group shadow-sm"
                >
                  <ToolIcon
                    slug={item.slug}
                    category={item.category}
                    name={item.name}
                    size="sm"
                    className="w-5 h-5 rounded-md p-0.5 border-0 shadow-none shrink-0"
                    withBackground={false}
                  />
                  <span>{item.name}</span>
                  <ArrowRight className="w-3 h-3 text-gray-400 group-hover:text-blue-500 transition-transform group-hover:translate-x-0.5" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
