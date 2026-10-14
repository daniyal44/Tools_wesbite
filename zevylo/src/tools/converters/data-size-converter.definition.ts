import { ToolDefinition } from '@/lib/tools/types';

export const dataSizeConverterDefinition: ToolDefinition = {
  id: 'data-size-converter',
  slug: 'data-size-converter',
  name: 'Data Size Converter',
  shortDescription: 'Convert between bytes, KB, MB, GB, TB, and more.',
  longDescription: 'Easily convert computer data sizes between bits, bytes, Kilobytes, Megabytes, Gigabytes, Terabytes, and Petabytes. Supports both decimal (SI: 1000) and binary (IEC: 1024) standards.',
  category: 'converters',
  icon: 'hard-drive',
  keywords: ['data', 'size', 'converter', 'byte', 'kb', 'mb', 'gb', 'tb', 'binary', 'decimal'],
  searchableText: 'data size converter byte bit kilobyte megabyte gigabyte terabyte petabyte binary decimal',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Data Size Converter (KB, MB, GB, TB) | Zevylo Tools',
    description: 'Convert between bits, bytes, KB, MB, GB, TB, and PB. Supports both SI (decimal) and IEC (binary) standards.',
  },
  faq: [
    { question: 'What is the difference between decimal (SI) and binary (IEC)?', answer: 'Decimal (SI) uses base-10 where 1 KB = 1000 Bytes. Binary (IEC) uses base-2 where 1 KiB = 1024 Bytes. Storage manufacturers often use decimal, while operating systems often use binary.' }
  ],
  relatedTools: ['unit-converter'],
  status: 'active',
  visibility: 'public',
  sortOrder: 3,
  component: 'data-size-converter',
};
