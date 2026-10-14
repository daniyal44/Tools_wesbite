import { ToolDefinition } from '@/lib/tools/types';

export const csvJsonConverterDefinition: ToolDefinition = {
  id: 'csv-json-converter',
  slug: 'csv-json-converter',
  name: 'CSV to JSON Converter',
  shortDescription: 'Convert CSV to JSON and JSON to CSV with correct quote and delimiter handling.',
  longDescription:
    'A two-way CSV ⇄ JSON converter that parses properly per RFC 4180 — quoted fields, escaped quotes, and commas or line breaks inside values are all handled correctly. Choose your delimiter (comma, semicolon, tab, or pipe), toggle a header row, then copy or download the result. Everything runs locally in your browser; your data is never uploaded.',
  category: 'developer',
  icon: 'arrow-right-left',
  keywords: ['csv to json', 'json to csv', 'csv converter', 'json converter', 'csv parser', 'convert csv', 'data converter', 'spreadsheet to json'],
  searchableText: 'csv to json json to csv converter parser delimiter rfc 4180 data spreadsheet convert',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'CSV to JSON Converter (and JSON to CSV) | Zevylo Tools',
    description: 'Free online CSV to JSON and JSON to CSV converter with correct quote/delimiter handling. 100% client-side — your data never leaves your browser.',
  },
  faq: [
    { question: 'Does it handle commas inside quoted CSV fields?', answer: 'Yes. The parser follows RFC 4180, so quoted fields containing commas, line breaks, or escaped double-quotes ("") are parsed correctly.' },
    { question: 'Can I convert JSON back to CSV?', answer: 'Yes. Switch to JSON → CSV mode and paste an array of objects (or arrays). Column headers are derived from the object keys automatically.' },
    { question: 'Is my data uploaded anywhere?', answer: 'No. All parsing and conversion happens entirely in your browser — nothing is sent to any server.' },
  ],
  relatedTools: ['json-formatter', 'yaml-json-converter', 'json-to-typescript'],
  status: 'active',
  visibility: 'public',
  sortOrder: 21,
  component: 'csv-json-converter',
};
