import { ToolDefinition } from '@/lib/tools/types';

export const timestampConverterDefinition: ToolDefinition = {
  id: 'timestamp-converter',
  slug: 'timestamp-converter',
  name: 'Timestamp Converter',
  shortDescription: 'Convert between Unix timestamps and human-readable dates.',
  longDescription: 'Easily convert Unix timestamps (seconds or milliseconds) to human-readable dates in UTC, local time, ISO 8601, and RFC 2822 formats. You can also pick a date to generate its corresponding Unix timestamp.',
  category: 'date-time',
  icon: 'clock',
  keywords: ['timestamp', 'converter', 'unix', 'epoch', 'date', 'time', 'iso8601'],
  searchableText: 'timestamp converter unix epoch date time iso8601 rfc 2822 utc local',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Unix Timestamp Converter | Zevylo Tools',
    description: 'Convert Unix timestamps to dates and vice versa. Supports UTC, local time, ISO 8601 formats.',
  },
  faq: [
    { question: 'What is a Unix timestamp?', answer: 'A Unix timestamp represents the number of seconds (or milliseconds) that have elapsed since January 1, 1970 (midnight UTC/GMT), not counting leap seconds.' }
  ],
  relatedTools: ['unit-converter', 'data-size-converter'],
  status: 'active',
  visibility: 'public',
  sortOrder: 2,
  component: 'timestamp-converter',
};
