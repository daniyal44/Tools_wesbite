import { ToolDefinition } from '@/lib/tools/types';

export const audioTrimmerDefinition: ToolDefinition = {
  id: 'audio-trimmer',
  slug: 'audio-trimmer',
  name: 'Audio Trimmer & Cutter',
  shortDescription: 'Cut and trim MP3, WAV, and audio files with interactive waveform visualization.',
  longDescription: 'Easily cut, slice, and trim songs, voice memos, and audio files directly in your web browser. Features visual interactive canvas waveforms, precision millisecond start/end markers, realtime preview playback, and instant WAV download with 100% client-side privacy.',
  category: 'audio',
  icon: 'scissors',
  keywords: ['audio trimmer', 'mp3 cutter online', 'cut audio file', 'trim sound', 'waveform audio cutter', 'ringtone maker', 'crop audio'],
  searchableText: 'audio trimmer cutter cut mp3 wav ogg m4a waveform web audio canvas start end markers ringtone crop sound edit browser client side',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: true,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'Free Audio Trimmer & MP3 Cutter Online | Zevylo',
    description: 'Trim audio files directly in your browser. 100% private Web Audio API processing with zero uploads. Cut MP3, WAV, and OGG with waveform preview.',
    keywords: ['audio trimmer online', 'mp3 cutter free', 'cut audio browser', 'trim wav file online'],
  },
  faq: [
    {
      question: 'Are my audio recordings or songs uploaded to a server?',
      answer: 'No. All audio decoding, waveform rendering, and slicing are performed strictly inside your browser using the HTML5 Web Audio API.',
    },
    {
      question: 'What audio formats are supported for trimming?',
      answer: 'Supports all browser-decodable audio formats including MP3, WAV, OGG, M4A, and FLAC, exporting the trimmed portion as a lossless WAV file.',
    },
  ],
  relatedTools: ['audio-speed-changer', 'voice-to-text', 'text-to-speech', 'tone-generator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 7,
  component: 'audio-trimmer',
};
