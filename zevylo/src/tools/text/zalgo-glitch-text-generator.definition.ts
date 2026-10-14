import { ToolDefinition } from '@/lib/tools/types';

export const zalgoGlitchTextGeneratorDefinition: ToolDefinition = {
  id: 'zalgo-glitch-text-generator',
  slug: 'zalgo-glitch-text-generator',
  name: 'Zalgo Glitch & Cursed Text Generator',
  shortDescription: 'Generate eerie glitch, corrupted, and cursed Zalgo text with chaos controls.',
  longDescription: 'Corrupt words into terrifying, creepy, and glitchy Zalgo text using stacked Unicode combining diacritical marks. Features customizable corruption height, chaos intensity sliders, and toggles for glitching above, through, and below letters for Discord, gaming bios, and horror roleplay.',
  category: 'text',
  icon: 'flame',
  keywords: ['zalgo text generator', 'glitch text generator', 'cursed text', 'corrupted text', 'creepy font generator', 'scary text', 'void text'],
  searchableText: 'zalgo text generator glitch cursed corrupted creepy scary diacritics unicode void chaos horror discord steam bio',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Zalgo Glitch Text Generator (Cursed / Corrupted Text) | Zevylo',
    description: 'Create creepy, corrupted Zalgo text with customizable glitch intensity. Adjust top, middle, and bottom marks and copy anywhere for Discord, Reddit, and bios.',
    keywords: ['zalgo text generator', 'glitch text generator', 'cursed font generator', 'creepy text generator online'],
  },
  faq: [
    {
      question: 'What is Zalgo text?',
      answer: 'Zalgo text refers to text that appears corrupted or invaded by chaos, created by stacking combining Unicode diacritical marks over and under standard characters.',
    },
    {
      question: 'Can I use Zalgo text on Discord or social media?',
      answer: 'Yes! Zalgo text can be pasted into Discord, Reddit, TikTok, and Twitter comments. Adjust the intensity slider to control the height of the corruption.',
    },
  ],
  relatedTools: ['stylish-text-generator', 'upside-down-text-generator', 'text-repeater'],
  status: 'active',
  visibility: 'public',
  sortOrder: 18,
  component: 'zalgo-glitch-text-generator',
};
