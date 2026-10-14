import { ToolDefinition } from '@/lib/tools/types';

export const yamlJsonConverterDefinition: ToolDefinition = {
  id: 'yaml-json-converter',
  slug: 'yaml-json-converter',
  name: 'YAML to JSON & JSON to YAML Converter',
  shortDescription: 'Bi-directional converter between YAML and JSON formats with real-time syntax validation.',
  longDescription: 'Easily convert Kubernetes configs, GitHub Actions workflows, Docker compose files, and API schemas between YAML and JSON. Features bidirectional instant conversion and syntax error indicators without sending code to third-party servers.',
  category: 'developer',
  icon: 'file-code',
  keywords: ['yaml to json', 'json to yaml', 'yaml converter', 'yaml parser', 'kubernetes yaml to json', 'transform.tools alternative'],
  searchableText: 'yaml to json converter json to yaml convert parse format kubernetes docker compose schema',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'YAML to JSON & JSON to YAML Converter — Online Bi-Directional Tool | Zevylo',
    description: 'Convert between YAML and JSON in real time. Validate syntax and format configs cleanly. 100% free and client-side.',
  },
  faq: [
    {
      question: 'Does this converter support nested structures and arrays?',
      answer: 'Yes! Nested objects, multidimensional arrays, booleans, null values, and strings are fully preserved in both directions.',
    },
    {
      question: 'Is my data secure?',
      answer: 'All parsing occurs locally in your browser. No confidential tokens, environment variables, or config payloads are transmitted to any server.',
    },
  ],
  relatedTools: ['json-formatter', 'json-to-typescript', 'base64'],
  status: 'active',
  visibility: 'public',
  sortOrder: 27,
  component: 'yaml-json-converter',
};
