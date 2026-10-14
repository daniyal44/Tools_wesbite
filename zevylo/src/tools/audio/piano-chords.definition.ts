import { ToolDefinition } from '@/lib/tools/types';

export const pianoChordsDefinition: ToolDefinition = {
  id: 'piano-chords',
  slug: 'piano-chords',
  name: 'Virtual Piano Keyboard & Chord Finder',
  shortDescription: 'Play piano keys online, discover chords, and learn musical scales with polyphonic audio.',
  longDescription: 'Direct alternative to ChordChord and ChordSeqAI. Interactive 2-octave responsive virtual piano keyboard with realistic polyphonic synthesizers powered by Web Audio API. Explore Major, Minor, 7th, Major 7th, Minor 7th, Diminished, Augmented, Sus2, and Sus4 chords across all 12 musical keys. Visual keys highlight note intervals and chord formulas in real-time.',
  category: 'audio',
  icon: 'music',
  keywords: ['piano chords', 'virtual piano', 'online piano keyboard', 'chord finder', 'chord chord alternative', 'music theory chord dictionary', 'play piano online'],
  searchableText: 'piano chords virtual keyboard chord finder online piano synthesizer major minor 7th chordchord chordseqai music theory notes scale',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: true,
  supportsCopy: true,
  seo: {
    title: 'Virtual Piano Keyboard & Chord Finder - Free Online Instrument',
    description: 'Play piano online with interactive keys and learn all chord inversions, intervals, and music theory. High-quality polyphonic synthesizer sound.',
    keywords: ['virtual piano', 'online piano', 'piano chord finder', 'chord dictionary', 'play piano in browser'],
  },
  faq: [
    {
      question: 'Can I play individual piano notes or full chords?',
      answer: 'Both! You can click or tap individual white and black piano keys, or select any root note and chord quality to play full polyphonic chords and see their notes highlighted.',
    },
    {
      question: 'What chord types are included?',
      answer: 'Major, Minor, Dominant 7th, Major 7th, Minor 7th, Diminished, Augmented, Sus2, and Sus4 across all root notes (C, C#, D, D#, E, F, F#, G, G#, A, A#, B).',
    },
  ],
  relatedTools: ['tap-bpm', 'metronome', 'tone-generator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 4,
  component: 'src/tools/audio/piano-chords',
};
