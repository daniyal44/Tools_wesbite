import { ToolDefinition } from '@/lib/tools/types';

export const birthdayCalculatorDefinition: ToolDefinition = {
  id: 'birthday-calculator',
  slug: 'birthday-calculator',
  name: 'Birthday & Anniversary Countdown Calculator',
  shortDescription: 'Calculate exact age, countdown to next birthday, total seconds/days lived, and milestone anniversaries.',
  longDescription: 'Discover the exact milestones of your lifespan. Calculates real-time countdown to your next birthday or marriage anniversary, total days, hours, and live seconds lived, weekday of birth, zodiac sign, and biological heartbeat estimates.',
  category: 'date-time',
  icon: 'cake',
  keywords: ['birthday calculator', 'birthday countdown', 'birthday to seconds', 'birthday to days', 'anniversary reminder', 'age in seconds'],
  searchableText: 'birthday calculator birthday countdown age in seconds days hours live ticker anniversary marriage milestone zodiac free',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Birthday & Anniversary Countdown Calculator — Exact Age in Days & Seconds | Zevylo',
    description: 'Calculate live countdown to your next birthday or wedding anniversary, total seconds lived, days alive, and zodiac sign for free.',
    keywords: ['birthday countdown calculator', 'birthday to seconds', 'birthday to days calculator', 'age in seconds calculator'],
  },
  faq: [
    {
      question: 'How accurate is the seconds countdown?',
      answer: 'It calculates exact seconds difference from midnight of your birth date to the current real-time system clock, updating dynamically every second.',
    },
    {
      question: 'Can I track wedding anniversaries as well?',
      answer: 'Yes! Toggle the Celebration Type to "Marriage / Wedding Anniversary" to calculate elapsed marriage milestones and upcoming anniversaries.',
    },
  ],
  relatedTools: ['date-difference-calculator', 'alarm-clock-timer', 'timezone-converter'],
  status: 'active',
  visibility: 'public',
  sortOrder: 2,
  component: 'birthday-calculator',
};
