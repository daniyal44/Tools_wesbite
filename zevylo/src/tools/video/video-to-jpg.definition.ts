import { ToolDefinition } from '@/lib/tools/types';

export const videoToJpgDefinition: ToolDefinition = {
  id: 'video-to-jpg',
  slug: 'video-to-jpg',
  name: 'Video to JPG Converter',
  shortDescription: 'Convert MP4, WebM, and MOV video clips into high-quality JPEG photos with custom frame rates and ZIP download.',
  longDescription: 'Turn videos into sharp JPG pictures in your browser. Extract individual scenes, high-resolution action snapshots, or batch extract image sequences at custom frame intervals (0.1s to 10s). Includes interactive timeline, JPG quality control (50%-100%), and 1-click batch ZIP download with 100% client-side privacy.',
  category: 'video',
  icon: 'film',
  keywords: ['video to jpg', 'video to jpeg', 'convert video to jpg', 'extract jpg from video', 'mp4 to jpg', 'webm to jpg', 'save video as pictures'],
  searchableText: 'video to jpg convert video to jpeg mp4 to jpg webm mov extract pictures frames snapshot client side zip download',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: true,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Free Video to JPG Converter — Convert Video to JPEG Online | Zevylo',
    description: 'Convert MP4, WebM, and MOV videos to JPG image sequences online. Adjust JPEG quality, set custom start/end time, capture instant snapshots, and download all as ZIP. 100% free and private.',
    keywords: ['video to jpg', 'video to jpeg converter', 'convert mp4 to jpg', 'extract frames from video to jpg'],
  },
  faq: [
    {
      question: 'How do I convert a video into JPG photos?',
      answer: 'Simply upload your video (MP4, WebM, MOV, MKV), select your desired extraction interval or total frame count, adjust your JPG quality slider, and click "Extract JPG Frames". You can also play the video and click "Capture Snapshot Frame" to save any exact moment.',
    },
    {
      question: 'Can I download all extracted JPG frames as a ZIP archive?',
      answer: 'Yes! Click "Download as ZIP" to immediately package all selected JPG frames into a single zip file directly in your browser without any server upload lag.',
    },
    {
      question: 'Does this tool preserve video resolution?',
      answer: 'Yes, by default frames are extracted at 100% native video resolution (up to 4K Ultra HD). You can also choose to scale down to 75%, 50%, or 25% if smaller file sizes are desired.',
    },
  ],
  relatedTools: ['video-to-png', 'video-to-frames', 'video-to-gif', 'video-quality-checker'],
  status: 'active',
  visibility: 'public',
  sortOrder: 2,
  component: 'video-to-jpg',
};
