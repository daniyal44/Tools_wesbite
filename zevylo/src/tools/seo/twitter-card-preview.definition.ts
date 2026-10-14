import { ToolDefinition } from '@/lib/tools/types';

export const twitterCardPreviewDefinition: ToolDefinition = {
  id: 'twitter-card-preview',
  slug: 'twitter-card-preview',
  name: 'Twitter / X Card Preview & Meta Generator',
  shortDescription: 'Preview and generate Twitter / X summary and summary_large_image card meta tags.',
  longDescription: 'Ensure your links look clean and engaging when shared on Twitter / X. Test and validate summary_large_image and summary card formats in both light and dark feed appearances. Generates standard twitter:card, twitter:title, twitter:description, twitter:image, and twitter:site meta tags with instant copy functionality.',
  category: 'seo',
  icon: 'share-2',
  keywords: ['twitter card preview', 'x card validator', 'twitter card generator', 'twitter summary_large_image', 'twitter meta tags', 'social share preview'],
  searchableText: 'twitter card preview x validator summary large image social share meta tags generator dark light mode feed',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: true,
  supportsCopy: true,
  seo: {
    title: 'Twitter / X Card Preview & Validator - Free Meta Tag Generator',
    description: 'Preview how your blog or website links appear on Twitter / X before sharing. Generate valid twitter:card meta tags with instant copy.',
    keywords: ['twitter card preview', 'twitter card generator', 'x card validator', 'twitter meta tags'],
  },
  faq: [
    {
      question: 'What is the recommended image dimension for summary_large_image?',
      answer: 'The ideal image resolution for summary_large_image is 1200 x 628 pixels (1.91:1 aspect ratio), with a maximum file size of 5MB.',
    },
    {
      question: 'What is the difference between summary and summary_large_image?',
      answer: 'A "summary" card displays a small square thumbnail on the left of the title, while a "summary_large_image" card displays a full-width high-impact banner graphic above the title.',
    },
  ],
  relatedTools: ['og-generator', 'meta-tag-generator', 'serp-pixel-checker'],
  status: 'active',
  visibility: 'public',
  sortOrder: 8,
  component: 'src/tools/seo/twitter-card-preview',
};
