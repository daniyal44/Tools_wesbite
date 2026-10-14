import fs from 'fs';
import path from 'path';

const DB_PATH = path.resolve('zevylo/src/lib/ai-directory/database.ts');
const SITEMAP_PATH = path.resolve('sitemap.xml');

// Read database.ts and extract all tools
const dbContent = fs.readFileSync(DB_PATH, 'utf-8');

const dbTools = [];
const seenSlugs = new Set();

// More robust regex parsing for AI tools in database.ts
const blocks = dbContent.split(/\{\s*id:\s*['"]/);
for (const block of blocks.slice(1)) {
  const nameMatch = block.match(/name:\s*['"]([^'"]+)['"]/);
  const slugMatch = block.match(/slug:\s*['"]([^'"]+)['"]/);
  if (nameMatch && slugMatch) {
    const name = nameMatch[1];
    const slug = slugMatch[1];
    if (!seenSlugs.has(slug)) {
      seenSlugs.add(slug);
      dbTools.push({ name, slug });
    }
  }
}

console.log(`Parsed ${dbTools.length} unique AI tools from database.ts.`);

// Read existing sitemap.xml
let sitemap = fs.readFileSync(SITEMAP_PATH, 'utf-8');

// Sort dbTools alphabetically by slug
dbTools.sort((a, b) => a.slug.localeCompare(b.slug));

const LANGUAGES = ['x-default', 'en', 'es', 'fr', 'de', 'pt', 'ar', 'hi', 'id', 'ja', 'ru', 'zh'];

function escapeXml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

// 1. AI Tool Profiles Block
const aiProfilesXml = dbTools.map(tool => {
  const cleanName = escapeXml(tool.name);
  let block = `  <url>\n`;
  block += `    <loc>https://zevylo.netlify.app/ai-tools/tool/${tool.slug}</loc>\n`;
  block += `    <lastmod>2026-10-15</lastmod>\n`;
  block += `    <changefreq>weekly</changefreq>\n`;
  block += `    <priority>0.8</priority>\n`;
  block += `    <image:image>\n`;
  block += `      <image:loc>https://zevylo.netlify.app/images/Zevylo_logo.png</image:loc>\n`;
  block += `      <image:title>${cleanName} Review, Pricing &amp; Features — Zevylo AI Directory</image:title>\n`;
  block += `      <image:caption>Complete verified review, pricing, user rating, and alternatives for ${cleanName}.</image:caption>\n`;
  block += `    </image:image>\n`;
  for (const lang of LANGUAGES) {
    block += `    <xhtml:link rel="alternate" hreflang="${lang}" href="https://zevylo.netlify.app/ai-tools/tool/${tool.slug}" />\n`;
  }
  block += `  </url>`;
  return block;
}).join('\n');

const section5Header = `  <!-- ========================================================================== -->\n  <!-- 5. AI TOOLS DATABASE (${dbTools.length} CURATED AI TOOLS)                                -->\n  <!-- ========================================================================== -->\n\n`;
const fullSection5 = `${section5Header}${aiProfilesXml}\n\n`;

// 2. AI Dedicated Articles Block
const aiArticlesXml = dbTools.map(tool => {
  const cleanName = escapeXml(tool.name);
  let block = `  <url>\n`;
  block += `    <loc>https://zevylo.netlify.app/ai-tools/article/${tool.slug}</loc>\n`;
  block += `    <lastmod>2026-10-15</lastmod>\n`;
  block += `    <changefreq>weekly</changefreq>\n`;
  block += `    <priority>0.85</priority>\n`;
  block += `    <image:image>\n`;
  block += `      <image:loc>https://zevylo.netlify.app/images/Zevylo_logo.png</image:loc>\n`;
  block += `      <image:title>${cleanName} In-Depth Technical Review, Benchmark &amp; Architecture Guide | Zevylo AI</image:title>\n`;
  block += `      <image:caption>Complete engineering review, benchmarks, API pricing, workflow guide, and release roadmap for ${cleanName}.</image:caption>\n`;
  block += `    </image:image>\n`;
  for (const lang of LANGUAGES) {
    block += `    <xhtml:link rel="alternate" hreflang="${lang}" href="https://zevylo.netlify.app/ai-tools/article/${tool.slug}" />\n`;
  }
  block += `  </url>`;
  return block;
}).join('\n');

const section7Header = `  <!-- ========================================================================== -->\n  <!-- 7. DEDICATED AI TECHNICAL ARTICLES & DEEP REVIEWS (${dbTools.length} AI ARTICLES)          -->\n  <!-- ========================================================================== -->\n\n`;
const fullSection7 = `${section7Header}${aiArticlesXml}\n\n`;

// Match Section 5 start and Section 6 start
const section5StartPattern = /<!-- =+ -->\s*<!-- 5\. AI TOOLS DATABASE[^\n]*-->\s*<!-- =+ -->/;
const section6StartPattern = /<!-- =+ -->\s*<!-- 6\. TECHNICAL ARTICLES/;

const startMatch = sitemap.match(section5StartPattern);
const endMatch = sitemap.match(section6StartPattern);

if (!startMatch || !endMatch) {
  console.error("Could not find Section 5 or Section 6 boundary in sitemap.xml!");
  process.exit(1);
}

// Replace Section 5
sitemap = sitemap.substring(0, startMatch.index) + fullSection5 + sitemap.substring(endMatch.index);

// Now handle Section 7 (Dedicated AI Articles) and Section 8 (Platform Information)
// Check if dedicated AI articles section already exists or if we need to replace before Platform Information
const aiArticlesSectionPattern = /<!-- =+ -->\s*<!-- 7\. DEDICATED AI TECHNICAL ARTICLES[^\n]*-->\s*<!-- =+ -->[\s\S]*?(?=<!-- =+ -->\s*<!-- \d+\. PLATFORM INFORMATION)/;
const platformInfoPattern = /<!-- =+ -->\s*<!-- \d+\. PLATFORM INFORMATION, RESOURCES & COMPLIANCE\s*-->\s*<!-- =+ -->/;

if (aiArticlesSectionPattern.test(sitemap)) {
  sitemap = sitemap.replace(aiArticlesSectionPattern, fullSection7);
} else {
  const platformMatch = sitemap.match(platformInfoPattern);
  if (platformMatch) {
    const platformHeader = `  <!-- ========================================================================== -->\n  <!-- 8. PLATFORM INFORMATION, RESOURCES & COMPLIANCE                            -->\n  <!-- ========================================================================== -->`;
    sitemap = sitemap.substring(0, platformMatch.index) + fullSection7 + platformHeader + sitemap.substring(platformMatch.index + platformMatch[0].length);
  }
}

fs.writeFileSync(SITEMAP_PATH, sitemap, 'utf-8');
console.log(`Successfully updated sitemap.xml with ${dbTools.length} AI tools and ${dbTools.length} dedicated AI articles!`);
