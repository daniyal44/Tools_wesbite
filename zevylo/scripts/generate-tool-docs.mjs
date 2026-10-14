#!/usr/bin/env node
/**
 * generate-tool-docs.mjs
 * -------------------------------------------------------------
 * Generates one Markdown reference file per tool from the
 * `*.definition.ts` files under src/tools (the single source of
 * truth). Output lands in docs/tools/<category>/<slug>.md plus a
 * docs/tools/README.md index.
 *
 * Run:  node scripts/generate-tool-docs.mjs
 *
 * This parses the definition object literals directly (no build
 * step / no ts-node needed) so it works even before `npm install`.
 * It is tolerant: a field it cannot parse is simply left blank.
 * -------------------------------------------------------------
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const TOOLS_DIR = join(ROOT, 'src', 'tools');
const OUT_DIR = join(ROOT, 'docs', 'tools');

/** Recursively collect every *.definition.ts path. */
function findDefinitions(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) out.push(...findDefinitions(full));
    else if (entry.endsWith('.definition.ts')) out.push(full);
  }
  return out;
}

/** Unescape a single-quoted TS string literal body. */
function unquote(s) {
  if (s == null) return '';
  return s
    .replace(/\\'/g, "'")
    .replace(/\\"/g, '"')
    .replace(/\\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const one = (src, re) => {
  const m = src.match(re);
  return m ? unquote(m[1]) : '';
};

/** Parse a `key: [ ... ]` string-array into a JS array. */
function arrayField(src, key) {
  const m = src.match(new RegExp(key + '\\s*:\\s*\\[([\\s\\S]*?)\\]'));
  if (!m) return [];
  const items = [];
  const re = /'((?:[^'\\]|\\.)*)'/g;
  let x;
  while ((x = re.exec(m[1])) !== null) items.push(unquote(x[1]));
  return items;
}

/** Parse the faq: [ { question, answer }, ... ] block. */
function faqField(src) {
  const block = src.match(/faq\s*:\s*\[([\s\S]*?)\n\s*\]\s*,/);
  if (!block) return [];
  const out = [];
  const re = /question:\s*'((?:[^'\\]|\\.)*)'[\s\S]*?answer:\s*'((?:[^'\\]|\\.)*)'/g;
  let m;
  while ((m = re.exec(block[1])) !== null) {
    out.push({ q: unquote(m[1]), a: unquote(m[2]) });
  }
  return out;
}

/** longDescription may be single- or multi-line concatenated strings. */
function longDescription(src) {
  const m = src.match(/longDescription:\s*([\s\S]*?),\s*\n\s*category:/);
  if (!m) return '';
  const parts = [];
  const re = /'((?:[^'\\]|\\.)*)'/g;
  let x;
  while ((x = re.exec(m[1])) !== null) parts.push(x[1]);
  return unquote(parts.join(''));
}

/** Build one tool record from a definition file. */
function parseDefinition(file) {
  const src = readFileSync(file, 'utf8');
  return {
    id: one(src, /id:\s*'([^']+)'/),
    slug: one(src, /slug:\s*'([^']+)'/),
    name: one(src, /name:\s*'((?:[^'\\]|\\.)*)'/),
    shortDescription: one(src, /shortDescription:\s*'((?:[^'\\]|\\.)*)'/),
    longDescription: longDescription(src),
    category: one(src, /category:\s*'([^']+)'/),
    subcategory: one(src, /subcategory:\s*'([^']+)'/),
    icon: one(src, /\bicon:\s*'([^']+)'/),
    executionMode: one(src, /executionMode:\s*'([^']+)'/),
    status: one(src, /status:\s*'([^']+)'/),
    visibility: one(src, /visibility:\s*'([^']+)'/),
    version: one(src, /version:\s*'([^']+)'/),
    component: one(src, /component:\s*'([^']+)'/),
    requiresUpload: /requiresUpload:\s*true/.test(src),
    supportsBatch: /supportsBatch:\s*true/.test(src),
    supportsDownload: /supportsDownload:\s*true/.test(src),
    supportsCopy: /supportsCopy:\s*true/.test(src),
    seoTitle: one(src, /title:\s*'((?:[^'\\]|\\.)*)'/),
    seoDescription: one(src, /description:\s*'((?:[^'\\]|\\.)*)'/),
    keywords: arrayField(src, 'keywords'),
    relatedTools: arrayField(src, 'relatedTools'),
    faq: faqField(src),
    sourceFile: relative(ROOT, file).replace(/\\/g, '/'),
  };
}

/** Render a single tool's Markdown doc. */
function renderTool(t) {
  const L = [];
  const yes = (b) => (b ? 'Yes' : 'No');
  L.push(`# ${t.name || t.slug}`, '');
  L.push(`> ${t.shortDescription || ''}`, '');
  L.push('| Field | Value |', '| --- | --- |');
  L.push(`| Tool ID | \`${t.id}\` |`);
  L.push(`| Slug / URL | \`/tools/${t.slug}\` |`);
  L.push(`| Category | \`${t.category}\`${t.subcategory ? ` › \`${t.subcategory}\`` : ''} |`);
  L.push(`| Execution | \`${t.executionMode}\`${t.executionMode === 'client' ? ' (runs 100% in the browser)' : ''} |`);
  L.push(`| Status | \`${t.status}\` · ${t.visibility} |`);
  L.push(`| Version | ${t.version || '—'} |`);
  L.push(`| Component | \`${t.component}\` → \`src/tools/${t.category}/${t.component}.tsx\` |`);
  L.push(`| Definition | \`${t.sourceFile}\` |`);
  L.push(`| Icon key | \`${t.icon}\` |`);
  L.push('');
  L.push('## Capabilities', '');
  L.push(`- Requires file upload: **${yes(t.requiresUpload)}**`);
  L.push(`- Batch processing: **${yes(t.supportsBatch)}**`);
  L.push(`- Download output: **${yes(t.supportsDownload)}**`);
  L.push(`- Copy to clipboard: **${yes(t.supportsCopy)}**`);
  L.push('');
  if (t.longDescription) {
    L.push('## What it does', '', t.longDescription, '');
  }
  if (t.keywords.length) {
    L.push('## Target keywords', '', t.keywords.map((k) => `\`${k}\``).join(' · '), '');
  }
  if (t.faq.length) {
    L.push('## FAQ', '');
    for (const f of t.faq) L.push(`**${f.q}**`, '', f.a, '');
  }
  if (t.relatedTools.length) {
    L.push('## Related tools', '', t.relatedTools.map((r) => `- [\`${r}\`](../_by-slug/${r}.md)`).join('\n'), '');
  }
  L.push('## For maintainers', '');
  L.push('When editing this tool, keep these in sync:');
  L.push(`1. **Component** — \`src/tools/${t.category}/${t.component}.tsx\` (the UI + logic).`);
  L.push(`2. **Definition** — \`${t.sourceFile}\` (registry metadata, SEO, FAQ).`);
  L.push(`3. **Category index** — \`src/tools/${t.category}/index.ts\` (import + both arrays).`);
  L.push('4. **Component map** — `src/lib/tools/component-map.tsx` (slug → dynamic import).');
  L.push('5. **Icon map** — `src/components/tools/tool-icon.tsx` (slug → lucide icon).');
  L.push('');
  L.push('_Auto-generated by `scripts/generate-tool-docs.mjs` — edit the definition, not this file._');
  L.push('');
  return L.join('\n');
}

/** Render the top-level index grouped by category. */
function renderIndex(tools) {
  const L = [];
  L.push('# Tool Reference Index', '');
  L.push(`Auto-generated catalog of **${tools.length}** tools. One file per tool lives in`);
  L.push('`docs/tools/<category>/<slug>.md`. Regenerate with `node scripts/generate-tool-docs.mjs`.', '');
  const byCat = {};
  for (const t of tools) (byCat[t.category] ||= []).push(t);
  for (const cat of Object.keys(byCat).sort()) {
    const list = byCat[cat].sort((a, b) => a.slug.localeCompare(b.slug));
    L.push(`## ${cat} (${list.length})`, '');
    for (const t of list) {
      L.push(`- [${t.name}](${cat}/${t.slug}.md) — ${t.shortDescription}`);
    }
    L.push('');
  }
  return L.join('\n');
}

function main() {
  const files = findDefinitions(TOOLS_DIR);
  const tools = [];
  const seen = new Map();
  let dupes = 0;
  for (const f of files) {
    try {
      const t = parseDefinition(f);
      if (!t.slug) continue;
      if (seen.has(t.slug)) {
        dupes++;
        console.warn(`DUPLICATE slug "${t.slug}": ${t.sourceFile} vs ${seen.get(t.slug)}`);
      }
      seen.set(t.slug, t.sourceFile);
      tools.push(t);
    } catch (e) {
      console.warn(`Skipped ${f}: ${e.message}`);
    }
  }

  mkdirSync(OUT_DIR, { recursive: true });
  mkdirSync(join(OUT_DIR, '_by-slug'), { recursive: true });
  for (const t of tools) {
    const catDir = join(OUT_DIR, t.category);
    mkdirSync(catDir, { recursive: true });
    const md = renderTool(t);
    writeFileSync(join(catDir, `${t.slug}.md`), md, 'utf8');
    // flat mirror so related-tool links resolve regardless of category
    writeFileSync(join(OUT_DIR, '_by-slug', `${t.slug}.md`), md, 'utf8');
  }
  writeFileSync(join(OUT_DIR, 'README.md'), renderIndex(tools), 'utf8');

  console.log(`Generated ${tools.length} tool docs into ${relative(ROOT, OUT_DIR)}`);
  console.log(`Duplicate slugs: ${dupes}`);
}

main();



