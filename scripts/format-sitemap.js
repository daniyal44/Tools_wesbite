const fs = require('fs');
const path = require('path');

const sitemapPath = path.resolve(__dirname, '..', 'sitemap.xml');
const xml = fs.readFileSync(sitemapPath, 'utf8');

const urlRegex = /<url>([\s\S]*?)<\/url>/g;
let match;
const urls = [];

while ((match = urlRegex.exec(xml)) !== null) {
  const block = match[1];
  const locMatch = block.match(/<loc>(.*?)<\/loc>/);
  if (!locMatch) continue;
  const loc = locMatch[1].trim();
  const lastmod = '2026-10-15';
  const changefreq = (block.match(/<changefreq>(.*?)<\/changefreq>/) || [])[1] || 'weekly';
  const priority = (block.match(/<priority>(.*?)<\/priority>/) || [])[1] || '0.8';
  
  const alternates = [];
  const altRegex = /<xhtml:link[\s\S]*?\/>/g;
  let altMatch;
  while ((altMatch = altRegex.exec(block)) !== null) {
    alternates.push(altMatch[0].trim());
  }
  urls.push({ loc, lastmod, changefreq, priority, alternates });
}

// Groupings
const coreUrls = [
  'https://zevylo.netlify.app',
  'https://zevylo.netlify.app/tools',
  'https://zevylo.netlify.app/ai-tools',
  'https://zevylo.netlify.app/ai-tools/categories',
  'https://zevylo.netlify.app/categories',
  'https://zevylo.netlify.app/articles',
  'https://zevylo.netlify.app/sitemap',
];

const legalUrls = [
  'https://zevylo.netlify.app/resources',
  'https://zevylo.netlify.app/llms.txt',
  'https://zevylo.netlify.app/badges',
  'https://zevylo.netlify.app/about',
  'https://zevylo.netlify.app/contact',
  'https://zevylo.netlify.app/privacy',
  'https://zevylo.netlify.app/terms',
];

const core = [];
const toolCategories = [];
const toolsMap = {};
const aiCategories = [];
const aiTools = [];
const articles = [];
const legal = [];

for (const u of urls) {
  const urlPath = u.loc.replace('https://zevylo.netlify.app', '');
  if (coreUrls.includes(u.loc)) {
    core.push(u);
  } else if (legalUrls.includes(u.loc)) {
    legal.push(u);
  } else if (urlPath.startsWith('/tools/')) {
    const parts = urlPath.split('/').filter(Boolean);
    if (parts.length === 2) {
      toolCategories.push(u);
    } else if (parts.length === 3) {
      const cat = parts[1];
      if (!toolsMap[cat]) toolsMap[cat] = [];
      toolsMap[cat].push(u);
    }
  } else if (urlPath.startsWith('/ai-tools/tool/')) {
    aiTools.push(u);
  } else if (urlPath.startsWith('/ai-tools/')) {
    aiCategories.push(u);
  } else if (urlPath.startsWith('/articles/')) {
    articles.push(u);
  } else {
    core.push(u);
  }
}

// Sort in alphabetical / logical order
toolCategories.sort((a, b) => a.loc.localeCompare(b.loc));
aiCategories.sort((a, b) => a.loc.localeCompare(b.loc));
aiTools.sort((a, b) => a.loc.localeCompare(b.loc));
articles.sort((a, b) => a.loc.localeCompare(b.loc));
for (const cat of Object.keys(toolsMap)) {
  toolsMap[cat].sort((a, b) => a.loc.localeCompare(b.loc));
}

function formatUrl(item) {
  let out = '  <url>\n';
  out += '    <loc>' + item.loc + '</loc>\n';
  out += '    <lastmod>' + item.lastmod + '</lastmod>\n';
  out += '    <changefreq>' + item.changefreq + '</changefreq>\n';
  out += '    <priority>' + item.priority + '</priority>\n';
  for (const alt of item.alternates) {
    out += '    ' + alt + '\n';
  }
  out += '  </url>\n';
  return out;
}

let result = '<?xml version="1.0" encoding="UTF-8"?>\n';
result += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
result += '        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n\n';

result += '  <!-- ========================================================================== -->\n';
result += '  <!-- 1. CORE PLATFORM & DISCOVERY HUBS                                          -->\n';
result += '  <!-- ========================================================================== -->\n\n';
for (const u of core) {
  result += formatUrl(u);
}

result += '\n  <!-- ========================================================================== -->\n';
result += '  <!-- 2. TOOL CATEGORY DIRECTORIES (18 CATEGORIES)                               -->\n';
result += '  <!-- ========================================================================== -->\n\n';
for (const u of toolCategories) {
  result += formatUrl(u);
}

result += '\n  <!-- ========================================================================== -->\n';
result += '  <!-- 3. CLIENT-SIDE WEB UTILITIES (206 IN-BROWSER TOOLS)                        -->\n';
result += '  <!-- ========================================================================== -->\n\n';

const sortedCats = Object.keys(toolsMap).sort();
for (const cat of sortedCats) {
  const catTools = toolsMap[cat];
  result += '  <!-- Category: ' + cat.toUpperCase() + ' (' + catTools.length + ' tools) -->\n';
  for (const u of catTools) {
    result += formatUrl(u);
  }
  result += '\n';
}

result += '  <!-- ========================================================================== -->\n';
result += '  <!-- 4. AI DIRECTORY CATEGORIES (24 CATEGORIES)                                 -->\n';
result += '  <!-- ========================================================================== -->\n\n';
for (const u of aiCategories) {
  result += formatUrl(u);
}

result += '\n  <!-- ========================================================================== -->\n';
result += '  <!-- 5. AI TOOLS DATABASE (107 CURATED AI TOOLS)                                -->\n';
result += '  <!-- ========================================================================== -->\n\n';
for (const u of aiTools) {
  result += formatUrl(u);
}

result += '\n  <!-- ========================================================================== -->\n';
result += '  <!-- 6. TECHNICAL ARTICLES & ENGINEERING GUIDES (206 ARTICLES)                  -->\n';
result += '  <!-- ========================================================================== -->\n\n';
for (const u of articles) {
  result += formatUrl(u);
}

result += '\n  <!-- ========================================================================== -->\n';
result += '  <!-- 7. PLATFORM INFORMATION, RESOURCES & COMPLIANCE                            -->\n';
result += '  <!-- ========================================================================== -->\n\n';
for (const u of legal) {
  result += formatUrl(u);
}

result += '</urlset>\n';

fs.writeFileSync(sitemapPath, result, 'utf8');
console.log('Successfully formatted sitemap.xml! Total size: ' + result.length + ' bytes.');
