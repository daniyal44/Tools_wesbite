import { MetadataRoute } from 'next';
import '@/tools';
import { getAllTools } from '@/lib/tools/registry';
import { categoryList } from '@/lib/tools/categories';
import { AI_CATEGORIES } from '@/lib/ai-directory/categories';
import { AI_TOOLS_DATABASE } from '@/lib/ai-directory/database';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://zevylo.netlify.app';
  const now = new Date();

  const createLanguageAlternates = (path: string) => {
    const fullUrl = path.startsWith('http') ? path : `${baseUrl}${path}`;
    return {
      languages: {
        'x-default': fullUrl,
        'en': fullUrl,
        'es': fullUrl,
        'fr': fullUrl,
        'de': fullUrl,
        'pt': fullUrl,
        'ar': fullUrl,
        'hi': fullUrl,
        'id': fullUrl,
        'ja': fullUrl,
        'ru': fullUrl,
        'zh': fullUrl,
      },
    };
  };

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
      alternates: createLanguageAlternates(''),
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
      alternates: createLanguageAlternates('/tools'),
    },
    {
      url: `${baseUrl}/ai-tools`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
      alternates: createLanguageAlternates('/ai-tools'),
    },
    {
      url: `${baseUrl}/ai-tools/categories`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: createLanguageAlternates('/ai-tools/categories'),
    },
    {
      url: `${baseUrl}/sitemap`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
      alternates: createLanguageAlternates('/sitemap'),
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/articles`,
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

  const categoryPages: MetadataRoute.Sitemap = categoryList.map((cat) => ({
    url: `${baseUrl}/tools/${cat.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
    alternates: createLanguageAlternates(`/tools/${cat.slug}`),
  }));

  const aiCategoryPages: MetadataRoute.Sitemap = AI_CATEGORIES.map((cat) => ({
    url: `${baseUrl}/ai-tools/${cat.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.85,
    alternates: createLanguageAlternates(`/ai-tools/${cat.slug}`),
  }));

  const tools = getAllTools();
  const toolPages: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${baseUrl}/tools/${tool.category}/${tool.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
    alternates: createLanguageAlternates(`/tools/${tool.category}/${tool.slug}`),
  }));

  const aiToolPages: MetadataRoute.Sitemap = AI_TOOLS_DATABASE.map((tool) => ({
    url: `${baseUrl}/ai-tools/tool/${tool.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
    alternates: createLanguageAlternates(`/ai-tools/tool/${tool.slug}`),
  }));

  const articlePages: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${baseUrl}/articles/${tool.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
    alternates: createLanguageAlternates(`/articles/${tool.slug}`),
  }));

  return [
    ...staticPages,
    ...categoryPages,
    ...aiCategoryPages,
    ...toolPages,
    ...aiToolPages,
    ...articlePages,
  ];
}
