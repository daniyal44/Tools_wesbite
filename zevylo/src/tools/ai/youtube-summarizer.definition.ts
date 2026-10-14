import { ToolDefinition } from '@/lib/tools/types';

export const youtubeSummarizerDefinition: ToolDefinition = {
  id: 'youtube-summarizer',
  slug: 'youtube-summarizer',
  name: 'YouTube Video Summarizer & Note Taker',
  shortDescription: 'Summarize YouTube video transcripts and notes into structured key takeaways and action items.',
  longDescription: 'Turn long YouTube videos and transcript notes into concise executive summaries, actionable key bullet points, and practical action checklists. Works 100% client-side with complete privacy.',
  category: 'ai',
  icon: 'youtube',
  keywords: ['youtube summarizer', 'video summary generator', 'youtube transcript summarizer', 'video notes maker', 'free youtube ai summary'],
  searchableText: 'youtube video summarizer transcript summary notes takeaways action items ai markdown client side free private',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'YouTube Video Summarizer — Free Transcript Notes & Key Takeaways | Zevylo',
    description: 'Summarize YouTube videos and transcripts into instant key bullet points, executive summaries, and action checklists. 100% free and client-side.',
    keywords: ['youtube summarizer', 'video transcript summarizer', 'youtube video notes', 'summarize youtube video free'],
  },
  faq: [
    {
      question: 'How do I get the YouTube transcript?',
      answer: 'On any YouTube video, click the "..." menu below the video and select "Show transcript". Copy the text and paste it directly into this tool.',
    },
    {
      question: 'Is my video data sent to any third-party server?',
      answer: 'No. All parsing and structured summary formatting is executed 100% locally in your web browser. No audio or text leaves your computer.',
    },
  ],
  relatedTools: ['ai-article-writer', 'geo-aeo-optimizer', 'prompt-enhancer'],
  status: 'active',
  visibility: 'public',
  sortOrder: 4,
  component: 'youtube-summarizer',
};
