import { ToolDefinition } from '@/lib/tools/types';

export const ageCalculatorDefinition: ToolDefinition = {
  id: 'age-calculator',
  slug: 'age-calculator',
  name: 'Age & Birthday Countdown Calculator',
  shortDescription: 'Calculate exact age in years, months, days, hours, and minutes, plus next birthday countdown.',
  longDescription: 'Find out exactly how old you or anyone else is in years, months, days, minutes, and seconds. View your birth day of the week, Western and Chinese zodiac signs, and a live countdown to your next birthday.',
  category: 'calculators',
  icon: 'cake',
  keywords: ['age calculator', 'chronological age calculator', 'birthday countdown', 'days lived calculator', 'how old am i', 'calcprotool alternative'],
  searchableText: 'age calculator calculate chronological age birthday countdown years months days hours minutes',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Age Calculator — Exact Age in Years, Months, Days & Next Birthday | Zevylo',
    description: 'Calculate your exact age in years, months, days, and hours, plus countdown to your next birthday. 100% free and client-side.',
  },
  faq: [
    {
      question: 'How is chronological age calculated precisely?',
      answer: 'Chronological age compares the birth date directly against today’s date, factoring in leap years, month day variations (28-31 days), and daylight savings.',
    },
    {
      question: 'Does this calculator find my birth day of the week and zodiac?',
      answer: 'Yes! Zevylo automatically determines the exact day of the week you were born on (e.g. Tuesday) and your astrological zodiac sign.',
    },
  ],
  relatedTools: ['date-difference-calculator', 'timestamp-converter'],
  status: 'active',
  visibility: 'public',
  sortOrder: 18,
  component: 'age-calculator',
};
