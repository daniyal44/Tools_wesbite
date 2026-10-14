import fs from 'fs';

const content = fs.readFileSync('zevylo/src/lib/ai-directory/database.ts', 'utf-8');
const candidateSlugs = [
  'bolt-new', 'v0-dev', 'windsurf-ai', 'trae-ai', 'devin-ai',
  'swe-agent', 'aider-ai', 'roo-code', 'lovable-dev', 'manus-ai',
  'gemini-2-flash', 'openai-operator', 'notebooklm', 'perplexity-deep-research',
  'recraft-ai', 'ideogram-ai', 'hunyuan-video', 'wan-video',
  'hailuo-ai', 'luma-dream-machine', 'kling-ai', 'suno-ai',
  'udio-ai', 'cartesia-sonic', 'fish-audio', 'ibm-granite',
  'microsoft-phi-4', 'exa-ai', 'tavily-ai', 'firecrawl-ai',
  'langfuse-ai', 'ollama-ai', 'lm-studio'
];

const existingSlugs = new Set();
const matches = content.matchAll(/slug:\s*['"]([^'"]+)['"]/g);
for (const m of matches) existingSlugs.add(m[1]);

console.log('Total in database:', existingSlugs.size);
const missing = candidateSlugs.filter(s => !existingSlugs.has(s));
console.log('Missing candidate slugs count:', missing.length);
console.log('Missing candidate slugs:', missing);
