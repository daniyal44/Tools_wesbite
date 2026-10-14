import { ToolDefinition } from '@/lib/tools/types';

export const morseCodeTranslatorDefinition: ToolDefinition = {
  id: 'morse-code-translator',
  slug: 'morse-code-translator',
  name: 'Morse Code Translator & Audio Player',
  shortDescription: 'Translate text to Morse code and Morse to text with real-time sound audio playback.',
  longDescription: 'Complete two-way Morse code encoder and decoder conforming to International Morse Code standards. Convert letters, digits, and punctuation into dots (·) and dashes (-), or decode raw Morse strings back to readable English. Features live Web Audio sound playback with customizable WPM (words per minute) speed and frequency pitch, flashing visual beacon light, copy buttons, and full international Morse alphabet reference chart.',
  category: 'converters',
  icon: 'radio',
  keywords: ['morse code translator', 'morse code audio', 'text to morse code', 'morse to text', 'morse code sound generator', 'international morse code', 'sos morse code'],
  searchableText: 'morse code translator text to morse decode encode sound audio player telegraph dit dah dots dashes international radio',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: true,
  supportsCopy: true,
  seo: {
    title: 'Morse Code Translator - Encode, Decode & Play Morse Audio Online',
    description: 'Convert plain text to Morse code and Morse code to English. Listen to high quality audio playback with adjustable WPM and tone pitch.',
    keywords: ['morse code translator', 'morse code audio player', 'text to morse', 'morse code sound', 'morse decoder online'],
  },
  faq: [
    {
      question: 'How are dots and dashes represented in timing?',
      answer: 'Standard International Morse code timing: a dot (dit) is 1 time unit, a dash (dah) is 3 units, silence between parts of the same letter is 1 unit, space between letters is 3 units, and space between words is 7 units.',
    },
    {
      question: 'Can this tool decode raw Morse code back into English?',
      answer: 'Yes! Simply paste dots and dashes (separated by spaces between letters and slashes "/" between words) to instantly decode back to text.',
    },
  ],
  relatedTools: ['binary-text-converter', 'rot13-encoder', 'tap-bpm'],
  status: 'active',
  visibility: 'public',
  sortOrder: 7,
  component: 'src/tools/converters/morse-code-translator',
};
