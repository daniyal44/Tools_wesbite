import { ToolDefinition } from '@/lib/tools/types';

export const youtubeTagGeneratorDefinition: ToolDefinition = {
  id: 'youtube-tag-generator',
  slug: 'youtube-tag-generator',
  name: 'YouTube Title, Tag & SEO Generator',
  shortDescription: 'Generate high-CTR video titles, ranking YouTube tags, viral hashtags, and SEO descriptions.',
  longDescription: 'Optimize your YouTube channel growth with instant high-converting title formulas, copy-paste comma-separated tags within the 500-character limit, structured description blueprints, and trending hashtags.',
  category: 'marketing',
  icon: 'youtube',
  keywords: ['youtube tag generator', 'youtube title generator', 'youtube seo tool', 'video description generator', 'youtube hashtag generator'],
  searchableText: 'youtube tag generator title generator seo metadata tags hashtags description blueprint click-through rate channel growth free',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'YouTube Title & Tag Generator — Free SEO Studio | Zevylo',
    description: 'Generate high-ranking YouTube video titles, SEO tags, viral hashtags, and video description blueprints instantly for free.',
    keywords: ['youtube tag generator', 'youtube title generator', 'free youtube seo tools', 'video tags generator online'],
  },
  faq: [
    {
      question: 'How many tags can I add to a YouTube video?',
      answer: 'YouTube allows up to 500 characters in the video tags field. This tool counts characters automatically to keep you within limits.',
    },
    {
      question: 'How do video titles affect ranking and click-through rates?',
      answer: 'Titles under 60 characters prevent truncation on mobile screens and focus on high-intent search queries that drive initial views and recommendations.',
    },
  ],
  relatedTools: ['utm-builder', 'geo-aeo-optimizer', 'social-video-downloader-helper'],
  status: 'active',
  visibility: 'public',
  sortOrder: 2,
  component: 'youtube-tag-generator',
};
