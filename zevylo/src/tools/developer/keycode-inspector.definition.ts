import { ToolDefinition } from '@/lib/tools/types';

export const keycodeInspectorDefinition: ToolDefinition = {
  id: 'keycode-inspector',
  slug: 'keycode-inspector',
  name: 'JavaScript KeyCode & Keyboard Event Inspector',
  shortDescription: 'Press any key to inspect event.key, event.code, event.keyCode, and modifier flags.',
  longDescription: 'Debug keyboard events in real time. Press any key on your keyboard to instantly inspect JavaScript KeyboardEvent parameters including event.key, event.code, legacy event.keyCode, event.which, location, and active modifier states (Shift, Ctrl, Alt, Meta).',
  category: 'developer',
  icon: 'keyboard',
  keywords: ['keycode', 'javascript keycode', 'keyboard event inspector', 'event key', 'event code', 'it-tools alternative'],
  searchableText: 'keycode inspector javascript keyboard event key code which location modifier keydown',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'JavaScript KeyCode Inspector — Event.key & Event.code Tester | Zevylo',
    description: 'Press any key to inspect JavaScript keycodes, event.key, and event.code in real time. 100% free and client-side.',
  },
  faq: [
    {
      question: 'What is the modern standard replacement for event.keyCode?',
      answer: 'The W3C recommends using event.key (the printed value, like "Enter" or "a") and event.code (the physical key position, like "KeyA") instead of the deprecated event.keyCode.',
    },
    {
      question: 'Does this inspector detect modifier keys?',
      answer: 'Yes! It tracks Shift, Control, Alt/Option, and Meta/Command (Windows/Mac) state flags on every key press.',
    },
  ],
  relatedTools: ['url-encoder', 'hash-generator', 'regex-tester'],
  status: 'active',
  visibility: 'public',
  sortOrder: 29,
  component: 'keycode-inspector',
};
