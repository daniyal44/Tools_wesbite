import { ToolDefinition } from '@/lib/tools/types';

export const metronomeDefinition: ToolDefinition = {
  id: 'metronome',
  slug: 'metronome',
  name: 'Online Metronome',
  shortDescription: 'Accurate, jitter-free interactive metronome with visual pendulum and time signatures.',
  longDescription: 'High precision digital metronome powered by the Web Audio API with sub-millisecond scheduling to prevent timing drift. Offers custom tempo ranges (30-300 BPM), time signatures (2/4, 3/4, 4/4, 6/8, 5/4), distinct accented downbeats, visual bouncing pendulum, and tap tempo synchronization.',
  category: 'audio',
  icon: 'music',
  keywords: ['online metronome', 'free metronome', 'digital metronome', 'bpm metronome', 'tempo keeper', 'guitar metronome', 'piano practice metronome'],
  searchableText: 'online metronome free digital bpm tempo keeper time signature beats audio click pendulum',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: true,
  supportsCopy: false,
  seo: {
    title: 'Online Metronome - Free Accurate Tempo & BPM Keeper',
    description: 'Practice music with an ultra-precise digital metronome. Features variable BPM, multiple time signatures, accented first beats, and visual indicators.',
    keywords: ['online metronome', 'free metronome', 'accurate metronome', 'bpm click track'],
  },
  faq: [
    {
      question: 'Is this metronome sample-accurate?',
      answer: 'Yes! It utilizes the browser’s Web Audio API high-resolution hardware clock, ensuring completely drift-free timing unlike standard JavaScript setTimeout.',
    },
    {
      question: 'What time signatures are supported?',
      answer: 'Standard time signatures including 2/4, 3/4, 4/4, 5/4, 6/8, and 7/8 with accented primary downbeats are supported.',
    },
  ],
  relatedTools: ['tap-bpm', 'tone-generator', 'piano-chords'],
  status: 'active',
  visibility: 'public',
  sortOrder: 2,
  component: 'src/tools/audio/metronome',
};
