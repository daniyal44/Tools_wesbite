import { ToolDefinition } from '@/lib/tools/types';

export const tapBpmDefinition: ToolDefinition = {
  id: 'tap-bpm',
  slug: 'tap-bpm',
  name: 'Tap BPM Tempo Counter',
  shortDescription: 'Calculate beats per minute (BPM) by tapping any key or clicking in rhythm.',
  longDescription: 'Accurately measure the tempo of any song, beat, or performance by tapping with your mouse, touch screen, or keyboard spacebar. Calculates real-time average BPM, instantaneous tempo, beat intervals in milliseconds, and standard classical tempo markings (Adagio, Andante, Allegro, Presto). Includes optional audible click feedback.',
  category: 'audio',
  icon: 'music',
  keywords: ['tap bpm', 'bpm counter', 'tempo counter', 'beats per minute', 'music tempo calculator', 'dj bpm finder', 'tap tempo'],
  searchableText: 'tap bpm tempo counter beats per minute calculate tempo dj music producer audio rhythm spacebar',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: true,
  supportsCopy: true,
  seo: {
    title: 'Tap BPM Counter - Measure Tempo & Beats Per Minute Online',
    description: 'Calculate beats per minute (BPM) quickly and accurately by tapping your spacebar or mouse. Features tempo markings, interval ms, and audio clicks.',
    keywords: ['tap bpm', 'bpm counter', 'beats per minute calculator', 'tempo finder online', 'tap tempo'],
  },
  faq: [
    {
      question: 'How do I use the Tap BPM tool?',
      answer: 'Tap the large button or press the spacebar on your keyboard in rhythm with the beat of the song. After 3-4 taps, the tool calculates your tempo with high precision.',
    },
    {
      question: 'How many taps are required for an accurate BPM?',
      answer: 'Tapping 8 to 16 times provides the most accurate average BPM calculation as it evens out slight human timing variations.',
    },
  ],
  relatedTools: ['metronome', 'tone-generator', 'piano-chords'],
  status: 'active',
  visibility: 'public',
  sortOrder: 1,
  component: 'src/tools/audio/tap-bpm',
};
