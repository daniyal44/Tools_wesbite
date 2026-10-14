import { ToolDefinition } from '@/lib/tools/types';

export const textToSpeechDefinition: ToolDefinition = {
  id: 'text-to-speech',
  slug: 'text-to-speech',
  name: 'Text to Speech Reader (TTS Voice Synthesizer)',
  shortDescription: 'Free natural-sounding text to speech reader with multi-voice selection and speed/pitch modulation.',
  longDescription: 'High-quality browser-native speech synthesizer that converts written text into natural-sounding spoken audio. Features multiple accents, voice speed/pitch controls, and zero server transmission for 100% private text reading.',
  category: 'audio',
  icon: 'mic',
  keywords: ['text to speech', 'tts online', 'read text aloud', 'speech synthesizer', 'voice reader', 'free tts'],
  searchableText: 'text to speech tts voice synthesizer read aloud voice reader speech audio natural voice pronunciation web speech api',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'Free Text to Speech Online — Natural TTS Voice Reader | Zevylo',
    description: 'Listen to any text read aloud with realistic voices, custom playback speed, and pitch modulation. Free, private, and unlimited client-side speech.',
    keywords: ['text to speech online', 'free tts reader', 'read text aloud online', 'speech synthesis tool'],
  },
  faq: [
    {
      question: 'Is there a character limit on Text to Speech?',
      answer: 'No! Because speech synthesis is performed directly on your local device, you can read articles and long texts without arbitrary artificial word caps.',
    },
    {
      question: 'Which languages and voices are supported?',
      answer: 'All voices installed on your operating system (English, Spanish, French, German, Japanese, and more) are detected and usable.',
    },
  ],
  relatedTools: ['tone-generator', 'word-counter'],
  status: 'active',
  visibility: 'public',
  sortOrder: 5,
  component: 'text-to-speech',
};
