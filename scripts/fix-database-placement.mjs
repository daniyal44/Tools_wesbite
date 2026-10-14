import fs from 'fs';
import path from 'path';

const DB_PATH = path.resolve('zevylo/src/lib/ai-directory/database.ts');
let content = fs.readFileSync(DB_PATH, 'utf-8');

const markerStart = '// --- 2025/2026 LATEST MARKET BREAKTHROUGH TOOLS ---';
const markerEnd = '    articleSlug: "ollama-ai",\n  },';

const startIndex = content.indexOf(markerStart);
const endIndex = content.indexOf(markerEnd) + markerEnd.length;

if (startIndex === -1 || endIndex === -1) {
  console.error('Markers not found!');
  process.exit(1);
}

const extractedTools = content.substring(startIndex, endIndex);

// Remove the tools block and the trailing ]; from inside searchAITools
// Currently line 8706 has:
//   let results = [...AI_TOOLS_DATABASE
// followed by extractedTools and then \n];
const corruptSearchPattern = /let results = \[\.\.\.AI_TOOLS_DATABASE\s*\/\/ --- 2025\/2026 LATEST MARKET BREAKTHROUGH TOOLS ---[\s\S]*?articleSlug: "ollama-ai",\s*\},?\s*\];/;

if (!corruptSearchPattern.test(content)) {
  console.error('corruptSearchPattern did not match!');
  process.exit(1);
}

// Clean up searchAITools
content = content.replace(corruptSearchPattern, 'let results = [...AI_TOOLS_DATABASE];');

// Now insert extractedTools right before the end of AI_TOOLS_DATABASE array
// The end of AI_TOOLS_DATABASE was right before "export function getAllAITools(): AITool[]"
const dbEndMarker = 'export function getAllAITools(): AITool[]';
const dbEndIndex = content.indexOf(dbEndMarker);

if (dbEndIndex === -1) {
  console.error('dbEndMarker not found!');
  process.exit(1);
}

// Find the last '];' before getAllAITools
const lastBracketBeforeFunctions = content.lastIndexOf('];', dbEndIndex);

if (lastBracketBeforeFunctions === -1) {
  console.error('Bracket before functions not found!');
  process.exit(1);
}

const beforeBracket = content.substring(0, lastBracketBeforeFunctions);
const afterBracket = content.substring(lastBracketBeforeFunctions);

content = beforeBracket + '\n  ' + extractedTools + '\n' + afterBracket;

fs.writeFileSync(DB_PATH, content, 'utf-8');
console.log('Successfully moved the 16 tools into AI_TOOLS_DATABASE array and restored searchAITools!');
