import { ToolDefinition } from '@/lib/tools/types';

export const audioSpeedChangerDefinition: ToolDefinition = {
  id: 'audio-speed-changer',
  slug: 'audio-speed-changer',
  name: 'Audio Speed & Tempo Changer',
  shortDescription: 'Speed up or slow down audio files from 0.25x to 3.0x with optional pitch preservation.',
  longDescription: 'Adjust playback speed and tempo of podcasts, lectures, and music tracks from 0.25x (slow motion) to 3.0x (fast forward). Features realtime preview, pitch lock toggle (preventing chipmunk distortion), and offline Web Audio rendering to download your modified track as a WAV file.',
  category: 'audio',
  icon: 'fast-forward',
  keywords: ['audio speed changer', 'change tempo of song', 'slow down audio', 'speed up mp3', 'nightcore maker', 'podcast speed controller', 'pitch preserve'],
  searchableText: 'audio speed changer tempo slow down speed up playback rate pitch preserve nightcore podcast voice audio wav offline rendering',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'Free Audio Speed & Tempo Changer Online | Zevylo',
    description: 'Speed up or slow down songs, podcasts, and audio clips from 0.25x to 3x in your browser. Pure client-side processing with high-quality WAV export.',
    keywords: ['audio speed changer', 'speed up audio online', 'slow down song online', 'tempo changer free'],
  },
  faq: [
    {
      question: 'Does changing audio speed change the voice pitch?',
      answer: 'By default, the pitch preservation toggle is enabled, keeping natural vocal tones without helium or deep-voice distortion.',
    },
    {
      question: 'Can I download the modified speed file?',
      answer: 'Yes! Click "Download WAV" to export the rendered audio at your chosen playback speed directly to your device.',
    },
  ],
  relatedTools: ['audio-trimmer', 'tap-bpm', 'metronome', 'text-to-speech'],
  status: 'active',
  visibility: 'public',
  sortOrder: 8,
  component: 'audio-speed-changer',
};
