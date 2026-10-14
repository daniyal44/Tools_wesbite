import fs from 'node:fs';
import path from 'node:path';

const ROOT_DIR = process.cwd();
const OLD_DOMAIN_HTTPS = 'https://zevylo.com';
const NEW_DOMAIN_HTTPS = 'https://zevylo.netlify.app';
const OLD_DOMAIN_RAW = 'zevylo.com';
const NEW_DOMAIN_RAW = 'zevylo.netlify.app';

const EXCLUDE_DIRS = new Set([
  '.git',
  'node_modules',
  '.next',
  'dist',
  '.gemini',
  'build'
]);

let modifiedCount = 0;
let totalReplacements = 0;

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (!EXCLUDE_DIRS.has(entry.name)) {
        walk(path.join(dir, entry.name));
      }
    } else if (entry.isFile()) {
      processFile(path.join(dir, entry.name));
    }
  }
}

function processFile(filePath) {
  // Don't process binary files or this script itself
  if (filePath.endsWith('.png') || filePath.endsWith('.ico') || filePath.endsWith('.svg') ||
      filePath.endsWith('.woff') || filePath.endsWith('.woff2') || filePath.endsWith('.wasm') ||
      filePath.endsWith('update-domain.mjs')) {
    return;
  }

  let content;
  try {
    content = fs.readFileSync(filePath, 'utf8');
  } catch {
    return;
  }

  if (!content.includes(OLD_DOMAIN_RAW)) {
    return;
  }

  // Count occurrences
  const matches = (content.match(new RegExp(OLD_DOMAIN_RAW, 'g')) || []).length;
  if (matches === 0) return;

  // Replace HTTPS first, then any remaining raw domains
  let updated = content.replaceAll(OLD_DOMAIN_HTTPS, NEW_DOMAIN_HTTPS);
  updated = updated.replaceAll(OLD_DOMAIN_RAW, NEW_DOMAIN_RAW);

  if (updated !== content) {
    fs.writeFileSync(filePath, updated, 'utf8');
    const relPath = path.relative(ROOT_DIR, filePath);
    console.log(`Updated (${matches}x): ${relPath}`);
    modifiedCount++;
    totalReplacements += matches;
  }
}

console.log(`Starting domain replacement across repository...`);
walk(ROOT_DIR);
console.log(`\nFinished! Modified ${modifiedCount} files with ${totalReplacements} total replacements.`);
