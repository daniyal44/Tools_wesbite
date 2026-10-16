import { MetadataRoute } from 'next';
import '@/tools';
import { getAllTools } from '@/lib/tools/registry';
import { categoryList } from '@/lib/tools/categories';
import { AI_CATEGORIES } from '@/lib/ai-directory/categories';
import { AI_TOOLS_DATABASE } from '@/lib/ai-directory/database';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://zevylo.netlify.app';
  const now = new Date();

  // 1. Core Platform & Discovery Hubs
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/ai-tools`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/ai-tools/categories`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sitemap`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ai-tools/article`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/resources`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/llms.txt`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/badges`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // 2. 18 Tool Category Hubs (Alphabetically Sorted)
  const sortedCategories = [...categoryList].sort((a, b) => a.slug.localeCompare(b.slug));
  const categoryPages: MetadataRoute.Sitemap = sortedCategories.map((cat) => ({
    url: `${baseUrl}/tools/${cat.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // 3. AI Directory Categories (24 Categories)
  const sortedAiCategories = [...AI_CATEGORIES].sort((a, b) => a.slug.localeCompare(b.slug));
  const aiCategoryPages: MetadataRoute.Sitemap = sortedAiCategories.map((cat) => ({
    url: `${baseUrl}/ai-tools/${cat.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // 4. In-Browser Tools (206+ Tools Sorted by Category and Slug)
  const sortedTools = [...getAllTools()].sort((a, b) => {
    if (a.category !== b.category) {
      return a.category.localeCompare(b.category);
    }
    return a.slug.localeCompare(b.slug);
  });
  const toolPages: MetadataRoute.Sitemap = sortedTools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.category}/${tool.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // 5. Curated AI Tools Profiles (302+ Tools)
  const sortedAiTools = [...AI_TOOLS_DATABASE].sort((a, b) => a.slug.localeCompare(b.slug));
  const aiToolPages: MetadataRoute.Sitemap = sortedAiTools.map((tool) => ({
    url: `${baseUrl}/ai-tools/tool/${tool.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // 6. Dedicated AI Technical Articles (302+ Articles)
  const aiArticlePages: MetadataRoute.Sitemap = sortedAiTools.map((tool) => ({
    url: `${baseUrl}/ai-tools/article/${tool.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // 7. Technical Guides & Articles (206 In-Browser Tool Articles)
  const articlePages: MetadataRoute.Sitemap = sortedTools.map((tool) => ({
    url: `${baseUrl}/articles/${tool.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.75,
  }));

  return [
    ...staticPages,
    ...categoryPages,
    ...(sortedAiCategories.length ? aiCategoryPages : []),
    ...toolPages,
    ...(sortedAiTools.length ? aiToolPages : []),
    ...(sortedAiTools.length ? aiArticlePages : []),
    ...articlePages,
  ];
}
