import fs from 'fs';
import path from 'path';

const DB_PATH = path.resolve('zevylo/src/lib/ai-directory/database.ts');
let content = fs.readFileSync(DB_PATH, 'utf-8');

// Country rules for automatic enrichment
const countryRules = [
  { match: /deepseek/i, country: "China", code: "CN", flag: "🇨🇳" },
  { match: /qwen|alibaba|tongyi/i, country: "China", code: "CN", flag: "🇨🇳" },
  { match: /kimi|moonshot/i, country: "China", code: "CN", flag: "🇨🇳" },
  { match: /kling|kuaishou/i, country: "China", code: "CN", flag: "🇨🇳" },
  { match: /zhipu|cogvideo/i, country: "China", code: "CN", flag: "🇨🇳" },
  { match: /minimax|hailuo/i, country: "China", code: "CN", flag: "🇨🇳" },
  { match: /baidu|ernie/i, country: "China", code: "CN", flag: "🇨🇳" },
  { match: /01\.ai|01-ai|yi-/i, country: "China", code: "CN", flag: "🇨🇳" },
  { match: /doubao|bytedance/i, country: "China", code: "CN", flag: "🇨🇳" },
  { match: /taiwan/i, country: "Taiwan", code: "TW", flag: "🇹🇼" },
  { match: /mediatek|breeze/i, country: "Taiwan", code: "TW", flag: "🇹🇼" },
  { match: /appier/i, country: "Taiwan", code: "TW", flag: "🇹🇼" },
  { match: /sakana|fugaku|preferred networks|plamo|clova/i, country: "Japan", code: "JP", flag: "🇯🇵" },
  { match: /falcon|jais|core42/i, country: "United Arab Emirates", code: "AE", flag: "🇦🇪" },
  { match: /deepmind|synthesia/i, country: "United Kingdom", code: "GB", flag: "🇬🇧" },
  { match: /mistral|kyutai/i, country: "France", code: "FR", flag: "🇫🇷" },
  { match: /deepl|aleph alpha|flux|black forest/i, country: "Germany", code: "DE", flag: "🇩🇪" },
  { match: /canva/i, country: "Australia", code: "AU", flag: "🇦🇺" },
  { match: /cohere/i, country: "Canada", code: "CA", flag: "🇨🇦" },
  { match: /hyperclova|upstage|solar/i, country: "South Korea", code: "KR", flag: "🇰🇷" },
  { match: /krutrim|sarvam|bharat/i, country: "India", code: "IN", flag: "🇮🇳" },
];

function determineCountry(toolBlock) {
  for (const r of countryRules) {
    if (r.match.test(toolBlock)) {
      return { country: r.country, code: r.code, flag: r.flag };
    }
  }
  return { country: "United States", code: "US", flag: "🇺🇸" };
}

// Replace each object in AI_TOOLS_DATABASE that doesn't have `country:`
const updatedContent = content.replace(/(\{\s*id:\s*['"][^'"]+['"][\s\S]*?launchYear:\s*\d+,\s*\n)(\s*\},)/g, (fullMatch, prefix, suffix) => {
  if (prefix.includes('country:')) {
    return fullMatch;
  }
  const geo = determineCountry(prefix);
  const enrichment = `    country: ${JSON.stringify(geo.country)},
    countryCode: ${JSON.stringify(geo.code)},
    flagEmoji: ${JSON.stringify(geo.flag)},
    status: "launched",
    roadmapInfo: "Live in Production",
  `;
  return `${prefix}${enrichment}${suffix}`;
});

fs.writeFileSync(DB_PATH, updatedContent, 'utf-8');
console.log('Successfully enriched all AI tools in database.ts with country and status metadata!');
