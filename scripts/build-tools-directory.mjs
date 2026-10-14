import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const toolsDir = join(process.cwd(), 'zevylo', 'src', 'tools');

function findDefinitions(dir) {
  let out = [];
  for (const e of readdirSync(dir)) {
    const full = join(dir, e);
    const st = statSync(full);
    if (st.isDirectory()) out.push(...findDefinitions(full));
    else if (e.endsWith('.definition.ts')) out.push(full);
  }
  return out;
}

const defs = findDefinitions(toolsDir);
const tools = defs.map(file => {
  const content = readFileSync(file, 'utf8');
  const getF = re => {
    const m = content.match(re);
    return m ? m[1].replace(/\\'/g, "'").trim() : '';
  };
  return {
    id: getF(/id:\s*'([^']+)'/),
    slug: getF(/slug:\s*'([^']+)'/),
    name: getF(/name:\s*'((?:[^'\\]|\\.)*)'/),
    category: getF(/category:\s*'([^']+)'/) || 'other',
    shortDesc: getF(/shortDescription:\s*'((?:[^'\\]|\\.)*)'/)
  };
});

const cats = {};
tools.forEach(t => {
  if (!cats[t.category]) cats[t.category] = [];
  cats[t.category].push(t);
});

let md = '# 🧰 Master Tools Directory (206+ Built-in Utilities)\n\n';
md += '> All 206 tools execute **100% client-side** inside your web browser. Zero cloud uploads, zero data tracking.\n\n---\n\n';
md += '## 📑 Quick Category Jump\n\n';
const sortedCats = Object.keys(cats).sort((a, b) => cats[b].length - cats[a].length);
md += sortedCats.map(c => `[**${c.toUpperCase()} (${cats[c].length})**](#category-${c.toLowerCase()})`).join(' • ') + '\n\n---\n\n';

for (const c of sortedCats) {
  md += `## <a id="category-${c.toLowerCase()}"></a>📁 ${c.toUpperCase()} (${cats[c].length} Tools)\n\n`;
  md += '| Tool Name | Route Slug | Description |\n';
  md += '|:---|:---|:---|\n';
  cats[c].sort((a, b) => a.name.localeCompare(b.name)).forEach(t => {
    md += `| **${t.name}** | [\`/tool/${t.slug}\`](zevylo/src/tools/${c}/${t.slug}.tsx) | ${t.shortDesc} |\n`;
  });
  md += '\n---\n\n';
}

writeFileSync('TOOLS_DIRECTORY.md', md, 'utf8');
console.log(`Successfully generated TOOLS_DIRECTORY.md with ${tools.length} tools across ${sortedCats.length} categories.`);
