import { ToolDefinition } from '@/lib/tools/types';

export const cutVideoDefinition: ToolDefinition = {
  id: 'cut-video',
  slug: 'cut-video',
  name: 'Online Video Cutter (Ezgif Cut Video)',
  shortDescription: 'Cut and trim video clips online by specifying exact start and end times in seconds.',
  longDescription: 'Cut MP4, WebM, and MOV video clips with millisecond precision online. Set start and end cut points with visual timeline preview and download trimmed clips with zero server uploads.',
  category: 'video',
  icon: 'scissors',
  keywords: ['cut video', 'ezgif cut video', 'online video cutter', 'cut mp4 online', 'video trimmer', 'cut video start end time'],
  searchableText: 'cut video online video cutter trim mp4 webm start end timestamp clip ezgif free',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'Online Video Cutter — Cut & Trim MP4 Videos Free | Zevylo',
    description: 'Cut video clips online with exact start and end points for free. Fast in-browser video trimmer with zero server uploads and no watermark.',
    keywords: ['cut video online', 'ezgif cut video', 'online video cutter', 'trim video free'],
  },
  faq: [
    {
      question: 'How do I cut a video clip?',
      answer: 'Upload your video, specify your desired start and end times in seconds, and click "Export Cut Video".',
    },
    {
      question: 'Is there a watermark on the cut video?',
      answer: 'Never! All outputs from Zevylo are 100% clean with no watermark or branding.',
    },
    {
      question: 'Are my videos uploaded to any server?',
      answer: 'No. The video is trimmed directly inside your web browser using HTML5 Canvas.',
    },
  ],
  relatedTools: ['video-trimmer', 'crop-video', 'rotate-video'],
  status: 'active',
  visibility: 'public',
  sortOrder: 14,
  component: 'cut-video',
};
