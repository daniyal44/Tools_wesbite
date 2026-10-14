import { ToolDefinition } from '@/lib/tools/types';

export const lottieToGifDefinition: ToolDefinition = {
  id: 'lottie-to-gif',
  slug: 'lottie-to-gif',
  name: 'Lottie & TGS to GIF Converter (Ezgif Lottie to GIF)',
  shortDescription: 'Convert Lottie JSON and Telegram TGS vector animations into animated GIF or WebM format.',
  longDescription: 'Convert Bodymovin / Lottie JSON and Telegram animated sticker (TGS) files into animated GIFs online for free. Custom resolution, frame rate, and loop settings with 100% private in-browser rendering.',
  category: 'image',
  icon: 'sparkles',
  keywords: ['lottie to gif', 'ezgif lottie to gif', 'convert lottie json to gif', 'tgs to gif', 'telegram sticker to gif', 'bodymovin to gif'],
  searchableText: 'lottie to gif convert lottie json to gif tgs telegram sticker animated vector free ezgif',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'Lottie to GIF Converter — Convert Lottie JSON to GIF Online Free | Zevylo',
    description: 'Convert Lottie JSON and Telegram TGS animations into animated GIFs online for free. In-browser frame rendering with zero server uploads and no watermark.',
    keywords: ['lottie to gif online', 'convert lottie to gif', 'ezgif lottie to gif', 'free lottie gif converter'],
  },
  faq: [
    {
      question: 'What is a Lottie file?',
      answer: 'A Lottie file is a JSON-based animation format commonly exported from Adobe After Effects via Bodymovin, used for mobile apps and web animations.',
    },
    {
      question: 'How do I convert Lottie JSON to GIF?',
      answer: 'Upload your Lottie .json file, preview the animation frames, and click "Export Animated GIF".',
    },
    {
      question: 'Is my proprietary animation kept confidential?',
      answer: 'Yes! The entire animation parsing and frame rasterization executes 100% locally in your web browser.',
    },
  ],
  relatedTools: ['gif-maker', 'video-to-gif', 'gif-to-mp4'],
  status: 'active',
  visibility: 'public',
  sortOrder: 34,
  component: 'lottie-to-gif',
};
