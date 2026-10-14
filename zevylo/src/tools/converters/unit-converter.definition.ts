import { ToolDefinition } from '@/lib/tools/types';

export const unitConverterDefinition: ToolDefinition = {
  id: 'unit-converter',
  slug: 'unit-converter',
  name: 'Unit Converter',
  shortDescription: 'Comprehensive unit converter for length, weight, temperature, and more.',
  longDescription: 'A versatile universal unit converter that supports length, weight/mass, temperature, area, volume, speed, data size, time, pressure, and energy. Converts in real-time with high precision.',
  category: 'converters',
  icon: 'arrow-right-left',
  keywords: ['unit', 'converter', 'metric', 'imperial', 'length', 'weight', 'temperature', 'volume', 'speed'],
  searchableText: 'unit converter convert metric imperial length weight mass temperature area volume speed data time pressure energy',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Universal Unit Converter | Zevylo Tools',
    description: 'Convert between metric and imperial units for length, weight, temperature, and more instantly.',
  },
  faq: [
    { question: 'What categories of units are supported?', answer: 'Length, Weight/Mass, Temperature, Area, Volume, Speed, Data Size, Time, Pressure, and Energy.' },
    { question: 'Are the conversions precise?', answer: 'Yes, conversions use standard definitions and precise constants.' }
  ],
  relatedTools: ['data-size-converter', 'timestamp-converter'],
  status: 'active',
  visibility: 'public',
  sortOrder: 1,
  component: 'unit-converter',
};
