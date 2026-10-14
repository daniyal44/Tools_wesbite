import { ToolDefinition } from '@/lib/tools/types';

export const socialVideoDownloaderHelperDefinition: ToolDefinition = {
  id: 'social-video-downloader-helper',
  slug: 'social-video-downloader-helper',
  name: 'Social Video Link Inspector & Downloader Guide',
  shortDescription: 'Inspect video links from YouTube, TikTok, Instagram, and Facebook with HD thumbnail downloader and lossless download commands.',
  longDescription: 'Safely inspect social media video URLs, extract video IDs, download original Full HD 1080p thumbnails, and generate clean lossless command-line download scripts for YouTube, TikTok, Instagram Reels, and Facebook videos without malware or intrusive ads.',
  category: 'marketing',
  icon: 'video',
  keywords: ['video downloader', 'youtube video download', 'facebook video download', 'instagram video download', 'tiktok video download', 'video link inspector'],
  searchableText: 'social video downloader youtube video download facebook video download instagram reel tiktok video thumbnail command line privacy',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Social Video Link Inspector & Downloader Guide — Free & Safe | Zevylo',
    description: 'Inspect YouTube, TikTok, Instagram, and Facebook video links. Download full-res thumbnails and copy clean lossless download commands safely.',
    keywords: ['social video downloader', 'youtube video downloader helper', 'tiktok video download free', 'instagram reel thumbnail download'],
  },
  faq: [
    {
      question: 'How do I download the full video with the best quality?',
      answer: 'Use the generated open-source yt-dlp command. It fetches the highest quality 4K/1080p direct stream directly onto your computer with zero compression and no intrusive advertising.',
    },
    {
      question: 'Can I download the video thumbnail?',
      answer: 'Yes! For YouTube videos, click "Open High-Res Image" to view and save the original max-resolution cover photo.',
    },
  ],
  relatedTools: ['youtube-tag-generator', 'video-quality-checker', 'utm-builder'],
  status: 'active',
  visibility: 'public',
  sortOrder: 3,
  component: 'social-video-downloader-helper',
};
