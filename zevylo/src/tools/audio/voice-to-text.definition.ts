import { ToolDefinition } from '@/lib/tools/types';

export const voiceToTextDefinition: ToolDefinition = {
  id: 'voice-to-text',
  slug: 'voice-to-text',
  name: 'Free Voice to Text & Audio Speech Transcriber',
  shortDescription: 'Transcribe spoken voice and microphone dictation into clean text in real-time.',
  longDescription: 'Turn your voice into written notes effortlessly. Features live real-time speech-to-text dictation using the browser Web Speech API, multi-language support (English, Spanish, Urdu, Hindi, Arabic, and more), word count statistics, and one-click TXT transcript export.',
  category: 'audio',
  icon: 'mic',
  keywords: ['voice to text', 'speech to text', 'audio transcriber', 'voice typing', 'speech recognition free', 'microphone dictation'],
  searchableText: 'voice to text speech to text dictation voice typing speech recognition microphone audio transcribe word count free',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Voice to Text Converter — Free Real-Time Speech Transcriber | Zevylo',
    description: 'Convert voice and microphone speech to text in real-time for free. Multi-language dictation with instant TXT export and complete privacy.',
    keywords: ['voice to text', 'free speech to text', 'audio transcriber online', 'microphone voice typing'],
  },
  faq: [
    {
      question: 'Which browsers support voice to text?',
      answer: 'Google Chrome, Microsoft Edge, and Safari have native support for speech recognition via the Web Speech API.',
    },
    {
      question: 'Is my audio uploaded or saved?',
      answer: 'No. Transcription occurs directly through your browser speech recognition engine. Zevylo never stores or records your voice audio.',
    },
  ],
  relatedTools: ['text-to-speech', 'ai-article-writer', 'youtube-summarizer'],
  status: 'active',
  visibility: 'public',
  sortOrder: 6,
  component: 'voice-to-text',
};
