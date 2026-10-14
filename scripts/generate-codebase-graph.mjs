#!/usr/bin/env node
/**
 * scripts/generate-codebase-graph.mjs
 * -------------------------------------------------------------
 * Automated Codebase Graph & Statistics Generator for Zevylo (Tools Website).
 *
 * Scans `zevylo/src/tools` for all tool definitions, tallies category counts,
 * constructs an updated Mermaid architecture graph, and updates:
 *   - ARCHITECTURE.md (at root)
 *   - README.md (at root)
 *
 * Run manually:
 *   node scripts/generate-codebase-graph.mjs
 * Or automatically via:
 *   github.bat  /  GitHub Actions CI workflow
 * -------------------------------------------------------------
 */

import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const ZEVYLO_ROOT = join(ROOT, 'zevylo');
const TOOLS_DIR = join(ZEVYLO_ROOT, 'src', 'tools');
const ARCHITECTURE_PATH = join(ROOT, 'ARCHITECTURE.md');
const README_PATH = join(ROOT, 'README.md');

// 1. Recursive scan for all *.definition.ts
function findDefinitions(dir) {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      out.push(...findDefinitions(full));
    } else if (entry.endsWith('.definition.ts')) {
      out.push(full);
    }
  }
  return out;
}

// 2. Parse basic fields from definition files
function parseDefinition(filePath) {
  const content = readFileSync(filePath, 'utf8');
  const getField = (pattern) => {
    const m = content.match(pattern);
    return m ? m[1].replace(/\\'/g, "'").trim() : '';
  };

  const id = getField(/id:\s*'([^']+)'/);
  const slug = getField(/slug:\s*'([^']+)'/);
  const name = getField(/name:\s*'([^']+)'/);
  const category = getField(/category:\s*'([^']+)'/) || 'other';

  return { id, slug, name, category, filePath };
}

// 3. Main execution
function main() {
  const defFiles = findDefinitions(TOOLS_DIR);
  const tools = defFiles.map(parseDefinition);
  const totalTools = tools.length;

  // Group by category
  const categories = {};
  for (const t of tools) {
    if (!categories[t.category]) {
      categories[t.category] = [];
    }
    categories[t.category].push(t);
  }

  const sortedCategories = Object.keys(categories).sort((a, b) => categories[b].length - categories[a].length);

  // Generate Mermaid Diagram
  const now = new Date().toISOString().split('T')[0];
  const mermaidGraph = `\`\`\`mermaid
%% Dynamic Codebase Graph — Generated on ${now} (${totalTools} tools across ${sortedCategories.length} categories)
flowchart TB
    subgraph ClientLayer["Client-Side Browser Execution (Zero-Upload Privacy Sandbox)"]
        UserBrowser["🌐 User Web Browser"]
    end

    subgraph AppRouter["Next.js 16 App Router (zevylo/src/app)"]
        Landing["/ — Main Catalog & Hub"]
        CategoryPage["/[category] — Category Portals"]
        ToolDynamicRoute["/tool/[slug] — Universal Dynamic Tool Engine"]
        AIPage["/ai-tools — AI Frontier Directory (A-to-Z)"]
    end

    subgraph CoreComponents["Core UI & Layout Architecture (zevylo/src/components)"]
        Header["Header & Theme Provider"]
        SearchFilter["Global Live Search & Filter Bar"]
        CategoryGrid["Categorized Tool Grid & Badges"]
        ToolWrapper["Tool Playground Shell (Fullscreen, Reset, Export)"]
    end

    subgraph ToolRegistry["Tool Registry & Dynamic Loader (zevylo/src/lib/tools)"]
        ComponentMap["component-map.tsx (Lazy Dynamic Imports)"]
        DefinitionRegistry["*.definition.ts (Metadata, SEO, FAQ, Inputs)"]
    end

    subgraph ToolCategories["Active Tool Suites (${totalTools} In-Browser Tools)"]
        CAT_Image["🖼️ Image Suite (${categories['image']?.length || 0} tools)"]
        CAT_Dev["💻 Developer Suite (${categories['developer']?.length || 0} tools)"]
        CAT_Calc["🧮 Calculator Suite (${categories['calculators']?.length || 0} tools)"]
        CAT_Text["📝 Text & Markdown Suite (${categories['text']?.length || 0} tools)"]
        CAT_Video["🎥 Video & GIF Suite (${categories['video']?.length || 0} tools)"]
        CAT_AI["🤖 AI Utility Suite (${categories['ai']?.length || 0} tools)"]
        CAT_Convert["🔄 Converters Suite (${categories['converters']?.length || 0} tools)"]
        CAT_SEO["📈 SEO & Web Suite (${categories['seo']?.length || 0} tools)"]
        CAT_PDF["📄 PDF Document Suite (${categories['pdf']?.length || 0} tools)"]
        CAT_Audio["🎵 Audio Suite (${categories['audio']?.length || 0} tools)"]
        CAT_Prod["⚡ Productivity Suite (${categories['productivity']?.length || 0} tools)"]
        CAT_Gen["🎲 Generators Suite (${categories['generators']?.length || 0} tools)"]
        CAT_Color["🎨 Color Suite (${categories['color']?.length || 0} tools)"]
        CAT_Other["🛠️ Date, Math, Security, Marketing (${(categories['date-time']?.length || 0) + (categories['marketing']?.length || 0) + (categories['education']?.length || 0) + (categories['security']?.length || 0) + (categories['business']?.length || 0)} tools)"]
    end

    subgraph ProcessingEngines["Browser Processing Engines (No Cloud Server Needed)"]
        WASM["⚙️ FFmpeg WebAssembly (Video/Audio Decoding/Encoding)"]
        CanvasAPI["🎨 HTML5 Canvas 2D Engine (Image Resizing, Filters, Icons)"]
        PDFLib["📑 PDF-Lib / PDFJS (Client-side Merging, Splitting, Watermarking)"]
        WebCrypto["🔐 Web Crypto API (Hashes, HMAC, Password Generator)"]
        ClientStorage["💾 IndexedDB / LocalStorage (Offline State & Favorites)"]
    end

    UserBrowser --> AppRouter
    AppRouter --> CoreComponents
    CoreComponents --> ToolWrapper
    ToolWrapper --> ToolRegistry
    ToolRegistry --> ToolCategories
    ToolCategories --> ProcessingEngines

    classDef modern fill:#1e293b,stroke:#3b82f6,stroke-width:2px,color:#f8fafc;
    classDef engine fill:#0f172a,stroke:#10b981,stroke-width:2px,color:#f8fafc;
    classDef client fill:#0369a1,stroke:#38bdf8,stroke-width:2px,color:#ffffff;
    class UserBrowser client;
    class WASM,CanvasAPI,PDFLib,WebCrypto,ClientStorage engine;
    class Landing,CategoryPage,ToolDynamicRoute,AIPage,ComponentMap,DefinitionRegistry modern;
\`\`\``;

  // Category summary markdown table
  let categoryTable = '| Category | Tool Count | Sample Tools | Directory |\n';
  categoryTable += '|:---|:---:|:---|:---|\n';
  for (const cat of sortedCategories) {
    const list = categories[cat];
    const samples = list.slice(0, 3).map(t => `\`${t.slug}\``).join(', ');
    categoryTable += `| **${cat.toUpperCase()}** | ${list.length} | ${samples}... | [\`zevylo/src/tools/${cat}\`](zevylo/src/tools/${cat}) |\n`;
  }
  categoryTable += `| **TOTAL** | **${totalTools}** | *Fully client-side & in-browser* | 18 Active Suites |\n`;

  console.log(`[OK] Scanned ${totalTools} tool definitions across ${sortedCategories.length} categories.`);

  // Update ARCHITECTURE.md if present
  if (existsSync(ARCHITECTURE_PATH)) {
    let archContent = readFileSync(ARCHITECTURE_PATH, 'utf8');
    const graphMarkerStart = '<!-- BEGIN_DYNAMIC_CODEBASE_GRAPH -->';
    const graphMarkerEnd = '<!-- END_DYNAMIC_CODEBASE_GRAPH -->';
    const tableMarkerStart = '<!-- BEGIN_CATEGORY_TABLE -->';
    const tableMarkerEnd = '<!-- END_CATEGORY_TABLE -->';

    if (archContent.includes(graphMarkerStart) && archContent.includes(graphMarkerEnd)) {
      const regex = new RegExp(`${graphMarkerStart}[\\s\\S]*?${graphMarkerEnd}`);
      archContent = archContent.replace(regex, `${graphMarkerStart}\n${mermaidGraph}\n${graphMarkerEnd}`);
    }

    if (archContent.includes(tableMarkerStart) && archContent.includes(tableMarkerEnd)) {
      const regex = new RegExp(`${tableMarkerStart}[\\s\\S]*?${tableMarkerEnd}`);
      archContent = archContent.replace(regex, `${tableMarkerStart}\n${categoryTable}\n${tableMarkerEnd}`);
    }

    writeFileSync(ARCHITECTURE_PATH, archContent, 'utf8');
    console.log('[OK] Updated ARCHITECTURE.md with latest codebase graph and category table.');
  }

  // Update README.md if present
  if (existsSync(README_PATH)) {
    let readmeContent = readFileSync(README_PATH, 'utf8');
    const graphMarkerStart = '<!-- BEGIN_DYNAMIC_CODEBASE_GRAPH -->';
    const graphMarkerEnd = '<!-- END_DYNAMIC_CODEBASE_GRAPH -->';
    const tableMarkerStart = '<!-- BEGIN_CATEGORY_TABLE -->';
    const tableMarkerEnd = '<!-- END_CATEGORY_TABLE -->';

    if (readmeContent.includes(graphMarkerStart) && readmeContent.includes(graphMarkerEnd)) {
      const regex = new RegExp(`${graphMarkerStart}[\\s\\S]*?${graphMarkerEnd}`);
      readmeContent = readmeContent.replace(regex, `${graphMarkerStart}\n${mermaidGraph}\n${graphMarkerEnd}`);
    }

    if (readmeContent.includes(tableMarkerStart) && readmeContent.includes(tableMarkerEnd)) {
      const regex = new RegExp(`${tableMarkerStart}[\\s\\S]*?${tableMarkerEnd}`);
      readmeContent = readmeContent.replace(regex, `${tableMarkerStart}\n${categoryTable}\n${tableMarkerEnd}`);
    }

    writeFileSync(README_PATH, readmeContent, 'utf8');
    console.log('[OK] Updated README.md with latest codebase graph and category table.');
  }

  return { totalTools, sortedCategories, mermaidGraph, categoryTable };
}

main();
