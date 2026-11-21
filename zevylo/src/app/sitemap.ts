import { MetadataRoute } from 'next';
import { getAllTools } from '@/lib/tools/registry';
import { categoryList } from '@/lib/tools/categories';
import { AI_CATEGORIES } from '@/lib/ai-directory/categories';
import { AI_TOOLS_DATABASE } from '@/lib/ai-directory/database';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://zevylo.netlify.app';
  const now = new Date();

  // ── 1️⃣ Static platform pages ─────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/tools`, lastModified: now, changeFrequency: 'weekly', priority: 0.95 },
    { url: `${baseUrl}/categories`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/ai-tools`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/ai-tools/categories`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/sitemap`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/resources`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
  ];

  // ── 2️⃣ Tools category hub pages ───────────────────────────
  // One entry per tool-category pair (18 categories → 18 URLs)
  const categoryPages: MetadataRoute.Sitemap = [...categoryList]
    .sort((a, b) => a.slug.localeCompare(b.slug))
    .map((cat) => ({
      url: `${baseUrl}/tools/${cat.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

  // ── 3️⃣ AI category hub pages ─────────────────────────────
  // One entry per AI niche (23 niches → 23 URLs)
  const aiCategoryPages: MetadataRoute.Sitemap = [...AI_CATEGORIES]
    .sort((a, b) => a.slug.localeCompare(b.slug))
    .map((cat) => ({
      url: `${baseUrl}/ai-tools/${cat.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

  // ── 4️⃣ Individual tool pages ─────────────────────────────
  // All public, non‑disabled tools from the registry (sorted by category then slug)
  const toolPages: MetadataRoute.Sitemap = [...getAllTools()]
    .sort((a, b) => {
      if (a.category !== b.category) return a.category.localeCompare(b.category);
      return a.slug.localeCompare(b.slug);
    })
    .map((tool) => ({
      url: `${baseUrl}/tools/${tool.category}/${tool.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.75,
    }));

  // ── 5️⃣ Individual AI tool pages ──────────────────────────
  // All AI listings from the database, deduplicated by name (301 entries)
  const aiToolPages: MetadataRoute.Sitemap = [...AI_TOOLS_DATABASE]
    .sort((a, b) => a.slug.localeCompare(b.slug))
    .map((tool) => ({
      url: `${baseUrl}/ai-tools/tool/${tool.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    }));

  // ── 6️⃣ Compose final sitemap ─────────────────────────────
  return [
    ...staticPages,
    ...categoryPages,
    ...aiCategoryPages,
    ...toolPages,
    ...aiToolPages,
  ];
}

