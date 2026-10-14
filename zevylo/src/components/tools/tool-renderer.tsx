'use client';

import * as React from 'react';
import { toolComponentMap } from '@/lib/tools/component-map';

export function ToolRenderer({ slug, id }: { slug: string; id: string }) {
  const Component = toolComponentMap[slug] || toolComponentMap[id];

  if (!Component) {
    return (
      <div className="rounded-xl border border-amber-200 dark:border-amber-900 bg-amber-50 dark:bg-amber-950/30 p-8 text-center text-amber-700 dark:text-amber-400">
        This tool is currently undergoing maintenance.
      </div>
    );
  }

  return <Component />;
}
