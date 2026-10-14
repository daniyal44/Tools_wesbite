import { ToolDefinition } from '@/lib/tools/types';

export const aspectRatioCalculatorDefinition: ToolDefinition = {
  id: 'aspect-ratio-calculator',
  slug: 'aspect-ratio-calculator',
  name: 'Aspect Ratio Calculator',
  shortDescription: 'Calculate dimensions and scale images, videos, and screens across standard aspect ratios.',
  longDescription: 'Calculate missing width or height while maintaining perfect proportions. Supports standard aspect ratios (16:9 Widescreen, 4:3 Standard, 1:1 Square, 9:16 Mobile Story, 21:9 Ultrawide) and common resolution presets (1080p, 4K, 720p, Instagram, YouTube).',
  category: 'image',
  icon: 'aspect-ratio',
  keywords: ['aspect ratio calculator', '16:9 calculator', 'image dimension calculator', 'screen ratio', 'video aspect ratio', 'calcprotool alternative'],
  searchableText: 'aspect ratio calculator calculate width height 16:9 4:3 1:1 9:16 21:9 scale dimensions pixels',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Aspect Ratio Calculator — 16:9, 4:3, 9:16 Image & Video Resizer | Zevylo',
    description: 'Calculate image and video aspect ratio dimensions. 16:9, 4:3, 1:1 and custom ratios with instant resolution presets. 100% free and client-side.',
  },
  faq: [
    {
      question: 'What is the formula for calculating aspect ratio dimensions?',
      answer: 'If ratio is W:H: New Height = (New Width × H) / W, and New Width = (New Height × W) / H.',
    },
    {
      question: 'What aspect ratio is used for Instagram Reels, TikTok, and YouTube Shorts?',
      answer: 'Vertical mobile videos use a 9:16 aspect ratio (standard resolution is 1080 × 1920 pixels).',
    },
  ],
  relatedTools: ['image-compressor', 'image-cropper'],
  status: 'active',
  visibility: 'public',
  sortOrder: 38,
  component: 'aspect-ratio-calculator',
};
