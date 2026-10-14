import { ToolDefinition } from '@/lib/tools/types';

export const timezoneConverterDefinition: ToolDefinition = {
  id: 'timezone-converter',
  slug: 'timezone-converter',
  name: 'Time Zone Converter & Meeting Planner',
  shortDescription: 'Interactive world clock and 24-hour time scrubber to convert timezones and plan global meetings.',
  longDescription: 'Easily convert times across international time zones including UTC, EST, PST, GMT, CET, PKT, IST, JST, and AEST. Features a 24-hour slider scrubber that highlights overlapping office hours for distributed remote teams.',
  category: 'date-time',
  icon: 'clock',
  keywords: ['timezone converter', 'world clock', 'meeting planner', 'est to pst', 'gmt to utc', 'time difference calculator'],
  searchableText: 'timezone converter time zone world clock meeting planner time difference est pst gmt utc cet ist pkt jst aest daylight savings',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Time Zone Converter & Global Meeting Planner | Zevylo',
    description: 'Compare time zones across continents with an interactive 24-hour timeline scrubber. Find overlapping working hours effortlessly.',
    keywords: ['timezone converter', 'world clock converter', 'meeting planner time zone', 'est to gmt converter'],
  },
  faq: [
    {
      question: 'How do I find overlapping business hours?',
      answer: 'Drag the 24-hour timeline slider. Green highlighted cards indicate local working hours (9 AM - 5 PM) across all selected cities.',
    },
    {
      question: 'Does it automatically handle Daylight Saving Time (DST)?',
      answer: 'Yes, calculations use standard browser IANA time zone databases that account for active daylight savings adjustments automatically.',
    },
  ],
  relatedTools: ['timestamp-converter', 'date-difference-calculator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 9,
  component: 'timezone-converter',
};
