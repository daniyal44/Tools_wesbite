import { ToolDefinition } from '@/lib/tools/types';

export const toneGeneratorDefinition: ToolDefinition = {
  id: 'tone-generator',
  slug: 'tone-generator',
  name: 'Online Tone Generator & Oscilloscope',
  shortDescription: 'Generate pure frequency sine, square, sawtooth, and triangle audio tones from 20Hz to 20kHz.',
  longDescription: 'Create clean audio tones and waveforms using the Web Audio API. Perfect for speaker testing, hearing checks, instrument tuning (440Hz Concert A, 432Hz), acoustics analysis, and audio equipment calibration. Features real-time Canvas oscilloscope visualization, precise frequency steppers, volume gain control, and dual-tone binaural beats mode.',
  category: 'audio',
  icon: 'activity',
  keywords: ['tone generator', 'online tone generator', 'frequency generator', 'audio oscillator', 'sound wave generator', '440hz tuning', 'hearing test tone'],
  searchableText: 'tone generator frequency oscillator sine square triangle sawtooth wave 440hz 1000hz audio test speaker acoustics calibration oscilloscope',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: true,
  supportsCopy: true,
  seo: {
    title: 'Online Tone Generator - Pure Frequency Audio Oscillator & Waves',
    description: 'Generate pure sine, square, triangle, and sawtooth audio frequencies from 20Hz to 20,000Hz. Includes live oscilloscope visualizer and calibration presets.',
    keywords: ['tone generator', 'online tone generator', 'frequency generator', 'sound wave generator', 'audio test frequency'],
  },
  faq: [
    {
      question: 'What frequency range can this generate?',
      answer: 'It can produce any audible frequency from 20 Hz (deep sub-bass) up to 20,000 Hz (ultrasonic treble limits of human hearing).',
    },
    {
      question: 'What waveforms are supported?',
      answer: 'Sine (pure tone), Square (rich odd harmonics), Triangle (mellow harmonics), and Sawtooth (full harmonic spectrum).',
    },
  ],
  relatedTools: ['tap-bpm', 'metronome', 'piano-chords'],
  status: 'active',
  visibility: 'public',
  sortOrder: 3,
  component: 'src/tools/audio/tone-generator',
};
