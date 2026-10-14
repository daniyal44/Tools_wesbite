import { NextResponse } from 'next/server';
import '@/tools';
import { getAllTools, getCategoriesWithToolCount } from '@/lib/tools/registry';
import { categoryList } from '@/lib/tools/categories';

export async function GET() {
  const tools = getAllTools();
  const categoryCounts = getCategoriesWithToolCount();

  return NextResponse.json({
    success: true,
    data: {
      totalTools: tools.length,
      categories: categoryList.map((cat) => ({
        ...cat,
        toolCount: categoryCounts.find((c) => c.category === cat.id)?.count || 0,
      })),
      tools: tools.map((tool) => ({
        id: tool.id,
        slug: tool.slug,
        name: tool.name,
        shortDescription: tool.shortDescription,
        category: tool.category,
        executionMode: tool.executionMode,
        url: `/tools/${tool.category}/${tool.slug}`,
        keywords: tool.keywords,
      })),
    },
    meta: {
      timestamp: new Date().toISOString(),
      platform: 'Zevylo',
    },
  });
}
