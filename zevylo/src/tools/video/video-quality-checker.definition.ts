import { ToolDefinition } from '@/lib/tools/types';

export const videoQualityCheckerDefinition: ToolDefinition = {
  id: 'video-quality-checker',
  slug: 'video-quality-checker',
  name: 'Video Quality & Metadata Checker',
  shortDescription: 'Inspect video resolution, aspect ratio, estimated bitrate, and social media platform readiness.',
  longDescription: 'Analyze video specifications in seconds. Checks 4K/1080p resolution, aspect ratios (16:9, 9:16 vertical), duration, estimated bitrates, file size, and gives instant readiness status for YouTube, TikTok Reels, and Discord limits.',
  category: 'video',
  icon: 'info',
  keywords: ['video quality checker', 'video metadata inspector', 'check video resolution', 'video bitrate checker', 'aspect ratio check'],
  searchableText: 'video quality checker video metadata resolution 4k 1080p aspect ratio bitrate duration discord limit tiktok reels client side',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'Free Video Quality & Resolution Checker — Inspect Video Metadata | Zevylo',
    description: 'Check video resolution, aspect ratio, bitrate, and size online. Verify if your video is ready for YouTube, TikTok, or Discord without server upload.',
    keywords: ['video quality checker', 'check video resolution online', 'video metadata viewer', 'video bitrate calculator'],
  },
  faq: [
    {
      question: 'Can I check 4K video files without buffering or lag?',
      answer: 'Yes! Zevylo reads video metadata headers directly via your browser video engine in milliseconds without transferring large gigabyte files over the internet.',
    },
    {
      question: 'What is the recommended video resolution for TikTok and Instagram Reels?',
      answer: 'The ideal format is 1080 × 1920 with a 9:16 vertical aspect ratio and a bitrate between 3.5 to 6 Mbps.',
    },
  ],
  relatedTools: ['video-to-frames', 'video-compressor', 'video-trimmer'],
  status: 'active',
  visibility: 'public',
  sortOrder: 4,
  component: 'video-quality-checker',
};
