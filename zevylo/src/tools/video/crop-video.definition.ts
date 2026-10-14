import { ToolDefinition } from '@/lib/tools/types';

export const cropVideoDefinition: ToolDefinition = {
  id: 'crop-video',
  slug: 'crop-video',
  name: 'Crop Video Online (Ezgif Video Crop)',
  shortDescription: 'Crop video aspect ratios to 1:1, 16:9, 9:16 (TikTok / Reels), 4:3, or custom bounding box.',
  longDescription: 'Crop MP4, WebM, and MOV video clips online. Select popular social media aspect ratios (1:1 Instagram, 9:16 TikTok/Reels, 16:9 YouTube) or specify custom dimensions with 100% private in-browser processing.',
  category: 'video',
  icon: 'crop',
  keywords: ['crop video', 'ezgif crop video', 'crop mp4', 'crop video online', 'resize video dimensions', 'tiktok video crop'],
  searchableText: 'crop video ezgif aspect ratio 1:1 9:16 16:9 tiktok instagram reels mp4 webm client side free',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'Crop Video Online — Free MP4 Video Cropper 9:16 1:1 | Zevylo',
    description: 'Crop videos online for free. Adjust aspect ratios to 1:1, 9:16 for TikTok/Shorts, or custom dimensions with zero server uploads and no watermark.',
    keywords: ['crop video online', 'ezgif crop video', 'crop video 9:16', 'free mp4 cropper'],
  },
  faq: [
    {
      question: 'How do I crop a video for TikTok or Instagram Reels?',
      answer: 'Upload your video, select the 9:16 aspect ratio preset, adjust the crop center, and click "Export Cropped Video".',
    },
    {
      question: 'Is my video uploaded to a remote server?',
      answer: 'No. The video is cropped frame-by-frame directly in your browser using HTML5 Canvas.',
    },
    {
      question: 'Will cropping remove my original video quality?',
      answer: 'The cropped area maintains its original pixel clarity and exports at high bitrate encoding.',
    },
  ],
  relatedTools: ['video-trimmer', 'rotate-video', 'video-speed-changer'],
  status: 'active',
  visibility: 'public',
  sortOrder: 11,
  component: 'crop-video',
};
