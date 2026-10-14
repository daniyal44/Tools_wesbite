import { ToolDefinition } from '@/lib/tools/types';

export const hashtagGeneratorDefinition: ToolDefinition = {
  id: 'hashtag-generator',
  slug: 'hashtag-generator',
  name: 'Social Media & SEO Hashtag Generator',
  shortDescription: 'Generate trending hashtags for Instagram, TikTok, LinkedIn, and YouTube by topic with limit counters.',
  longDescription: 'Boost organic social reach and discovery with high-ranking hashtags. Features niche categories across Tech, Business, Marketing, Fitness, and Photography, plus an automatic 30-tag Instagram limit tracker and 1-click clipboard formatting.',
  category: 'seo',
  icon: 'hash',
  keywords: ['hashtag generator', 'instagram hashtags', 'trending hashtags', 'tiktok hashtags', 'seo hashtags', 'best hashtags for likes'],
  searchableText: 'hashtag generator hashtags instagram tiktok linkedin youtube social media tags niche trending seo tags copy paste',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Free Hashtag Generator — Trending Tags for Instagram & TikTok | Zevylo',
    description: 'Find top viral hashtags for your niche or keyword. Manage your 30-tag limit and copy space- or comma-separated tags in 1 click.',
    keywords: ['hashtag generator', 'instagram hashtag generator', 'trending hashtags', 'tiktok hashtag finder', 'free hashtag tool'],
  },
  faq: [
    {
      question: 'How many hashtags should I use on Instagram?',
      answer: 'Instagram allows up to 30 hashtags per post. Our tool tracks your count in real time so you never exceed the platform maximum.',
    },
    {
      question: 'Are these hashtags updated for current algorithms?',
      answer: 'Yes! The collections focus on specific high-engagement niche communities rather than overly broad spam tags, boosting algorithmic reach.',
    },
  ],
  relatedTools: ['meta-tag-generator', 'keyword-density-analyzer', 'slug-generator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 11,
  component: 'hashtag-generator',
};
