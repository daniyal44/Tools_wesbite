import { ToolDefinition } from '@/lib/tools/types';

export const videoCompressorDefinition: ToolDefinition = {
  id: 'video-compressor',
  slug: 'video-compressor',
  name: 'Video Compressor (Client-Side Size Reducer)',
  shortDescription: 'Compress MP4 and WebM videos directly in your browser without uploading to any server.',
  longDescription: 'Significantly reduce video file size by adjusting resolution (1080p, 720p, 480p) and target bitrate. Pure client-side hardware-accelerated re-encoding keeps your private clips, recordings, and media 100% confidential.',
  category: 'video',
  icon: 'film',
  keywords: ['video compressor', 'compress video online', 'reduce video size', 'mp4 compressor no upload', 'free video compression'],
  searchableText: 'video compressor reduce video file size mp4 webm bitrate resolution 720p 1080p client side private no upload',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'Free Video Compressor — Reduce Video Size Online | Zevylo',
    description: 'Compress video files online for Discord, email, and web without uploading to a cloud server. 100% private, fast, and free.',
    keywords: ['video compressor', 'reduce video size online', 'compress mp4 free', 'client side video compressor'],
  },
  faq: [
    {
      question: 'Will my video be sent to a remote server?',
      answer: 'No! Unlike CloudConvert or FreeConvert, Zevylo re-encodes the video stream directly in your browser using local canvas and MediaRecorder hardware decoding.',
    },
    {
      question: 'Which resolution should I choose for email or Discord?',
      answer: '720p HD with balanced 1.2 Mbps bitrate offers the sweet spot between sharp visual clarity and compact file sizes under 25MB.',
    },
  ],
  relatedTools: ['video-to-frames', 'video-trimmer', 'video-quality-checker'],
  status: 'active',
  visibility: 'public',
  sortOrder: 2,
  component: 'video-compressor',
};
