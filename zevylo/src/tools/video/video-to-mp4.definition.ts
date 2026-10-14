import { ToolDefinition } from '@/lib/tools/types';

export const videoToMp4Definition: ToolDefinition = {
  id: 'video-to-mp4',
  slug: 'video-to-mp4',
  name: 'Online MP4 Converter (Ezgif Video to MP4)',
  shortDescription: 'Convert WebM, MOV, MKV, AVI, and FLV video files into universally compatible MP4 video.',
  longDescription: 'Convert any video file into high-quality MP4 / WebM format online. Ensure compatibility across iPhones, Android, Mac, and Windows with zero server uploads and no watermark.',
  category: 'video',
  icon: 'video',
  keywords: ['video to mp4', 'ezgif video to mp4', 'convert webm to mp4', 'mov to mp4', 'online mp4 converter', 'mkv to mp4'],
  searchableText: 'video to mp4 convert webm mov mkv flv avi mp4 player client side free ezgif',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'Online MP4 Converter — Convert WebM MOV MKV to MP4 Free | Zevylo',
    description: 'Convert any video file to MP4 format online for free. Fast in-browser encoding with zero server uploads, no file size limits, and no watermark.',
    keywords: ['video to mp4 online', 'convert video to mp4', 'ezgif video to mp4', 'free mp4 converter'],
  },
  faq: [
    {
      question: 'Which formats can be converted to MP4?',
      answer: 'Supports WebM, MOV, MKV, AVI, FLV, and all HTML5 video formats.',
    },
    {
      question: 'Is there a file size limit?',
      answer: 'No arbitrary limits! Conversions run locally on your device memory without remote server constraints.',
    },
    {
      question: 'Are my videos uploaded anywhere?',
      answer: 'Never. The conversion happens 100% inside your web browser.',
    },
  ],
  relatedTools: ['video-compressor', 'video-trimmer', 'crop-video'],
  status: 'active',
  visibility: 'public',
  sortOrder: 12,
  component: 'video-to-mp4',
};
