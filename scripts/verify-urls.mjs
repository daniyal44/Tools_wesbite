import fs from 'fs';

const content = fs.readFileSync('zevylo/src/lib/ai-directory/database.ts', 'utf-8');
const blocks = content.split(/\{\s*id:\s*['"]/);
console.log('Total tools in database.ts:', blocks.length - 1);

const tools = [];
for (const b of blocks.slice(1)) {
  const slugMatch = b.match(/slug:\s*['"]([^'"]+)['"]/);
  const urlMatch = b.match(/url:\s*['"]([^'"]+)['"]/);
  const nameMatch = b.match(/name:\s*['"]([^'"]+)['"]/);
  if (slugMatch && urlMatch) {
    tools.push({ name: nameMatch ? nameMatch[1] : '', slug: slugMatch[1], url: urlMatch[1] });
  }
}

console.log('Found', tools.length, 'tools with URLs.');

const githubTools = tools.filter(t => t.url.includes('github.com'));
console.log('GitHub-based tools:', githubTools);

// Check newly added tools specifically
const newSlugs = [
  'open-claw', 'openai-codex', 'claude-3-7-opus', 'grok-3', 'gpt-5-orion',
  'sora-api', 'apple-intelligence', 'falcon-ai', 'jais-ai', 'core42-compass',
  'taiwan-llm', 'mediatek-breeze', 'appier-ai', 'sakana-ai', 'plamo-ai',
  'line-clova', 'fugaku-llm', 'zhipu-glm-4', 'baidu-ernie', '01-ai-yi',
  'doubao-ai', 'alphafold-3', 'deepmind-genie', 'synthesia', 'kyutai-moshi',
  'aleph-alpha', 'deepl', 'flux-1-pro', 'hyperclova-x', 'upstage-solar',
  'krutrim-ai', 'sarvam-ai'
];

console.log('\n--- Checking New Tools URLs ---');
for (const s of newSlugs) {
  const t = tools.find(x => x.slug === s);
  if (t) {
    console.log(`${t.slug} -> ${t.url}`);
  } else {
    console.log(`MISSING: ${s}`);
  }
}
