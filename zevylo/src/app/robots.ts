import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://zevylo.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      // Traditional Search Crawlers
      {
        userAgent: ['Googlebot', 'Bingbot', 'Applebot', 'DuckDuckBot', 'YandexBot', 'Baiduspider', 'Sogou'],
        allow: '/',
        disallow: ['/api/'],
      },
      // AI & Generative Search Crawlers (GEO / AEO)
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'PerplexityBot',
          'ClaudeBot',
          'Claude-Web',
          'anthropic-ai',
          'Google-Extended',
          'Applebot-Extended',
          'CCBot',
          'cohere-ai',
          'Bytespider',
          'Diffbot',
        ],
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: ['Googlebot-Image'],
        allow: ['/images/', '/badge.svg', '/icon.png'],
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/feed.xml`,
    ],
    host: baseUrl,
  };
}
