#!/usr/bin/env node
/** 
 * generate-blog.mjs
 * -------------------------------------------------------------
 * Generates Markdown blog posts for AI tools from the database.
 * Output lands in public/blog/<slug>.md plus a public/blog/index.md.
 * Also submits updated posts to IndexNow for search engine indexing.
 *
 * Run: node scripts/generate-blog.mjs
 *
 * This generates SEO-friendly blog posts that can be indexed by
 * search engines and displayed on the /blog page.
 * -------------------------------------------------------------
 */

import { readFileSync, writeFileSync, mkdirSync, statSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DB_PATH = join(ROOT, 'src', 'lib', 'ai-directory', 'database.ts');
const BLOG_DIR = join(ROOT, 'public', 'blog');

/** Parse tools from database using line-by-line approach */
function parseDatabase() {
  const src = readFileSync(DB_PATH, 'utf8');
  const lines = src.split('\n');
  const tools = [];
  
  // State machine to track when we're inside a tool object
  let inTool = false;
  let currentTool = {};
  let toolCount = 0;
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    // Start of a new tool object (id: '...' at the beginning of a line or after whitespace)
    if (trimmed.startsWith("id: '") || trimmed.startsWith('id: "')) {
      // Save previous tool if it exists and has valid data
      if (inTool && currentTool.id && currentTool.name && currentTool.slug) {
        tools.push(currentTool);
        toolCount++;
      }
      inTool = true;
      currentTool = {
        id: '',
        name: '',
        slug: '',
        company: 'Unknown',
        category: 'Uncategorized',
        tagline: '',
        description: '',
        pricing: 'freemium',
        status: 'launched',
      };
    }
    
    if (!inTool) continue;
    
    // Extract fields
    // id:
    if (trimmed.startsWith("id:")) {
      const match = trimmed.match(/id:\s*['\"]([^'\"]+)'?/);
      if (match) currentTool.id = match[1];
    }
    // name:
    else if (trimmed.startsWith("name:")) {
      const match = trimmed.match(/name:\s*['\"]([^'\"]+)'?/);
      if (match) currentTool.name = match[1];
    }
    // slug:
    else if (trimmed.startsWith("slug:")) {
      const match = trimmed.match(/slug:\s*['\"]([^'\"]+)'?/);
      if (match) currentTool.slug = match[1];
    }
    // company:
    else if (trimmed.startsWith("company:")) {
      const match = trimmed.match(/company:\s*['\"]([^'\"]+)'?/);
      if (match) currentTool.company = match[1];
      // Also try unquoted: company: OpenAI
      else {
        const unquotedMatch = trimmed.match(/company:\s*([A-Za-z]+)/);
        if (unquotedMatch) currentTool.company = unquotedMatch[1];
      }
    }
    // category:
    else if (trimmed.startsWith("category:")) {
      const match = trimmed.match(/category:\s*['\"]([^'\"]+)'?/);
      if (match) currentTool.category = match[1];
    }
    // tagline:
    else if (trimmed.startsWith("tagline:")) {
      const match = trimmed.match(/tagline:\s*['\"]([^'\"]+)'?/);
      if (match) currentTool.tagline = match[1];
    }
    // description:
    else if (trimmed.startsWith("description:")) {
      currentTool.description = trimmed.substring("description:".length).trim();
    }
    // pricing:
    else if (trimmed.startsWith("pricing:")) {
      const match = trimmed.match(/pricing:\s*['\"]([^'\"]+)'?/);
      if (match) currentTool.pricing = match[1];
    }
    // status:
    else if (trimmed.startsWith("status:")) {
      const match = trimmed.match(/status:\s*['\"]([^'\"]+)'?/);
      if (match) currentTool.status = match[1];
    }
    // tags:
    else if (trimmed.startsWith("tags:")) {
      const match = trimmed.match(/tags:\s*\[([^\]]+)\]/);
      if (match) {
        const tagsContent = match[1];
        currentTool.tags = tagsContent.split(',').map(t => t.replace(/['"]/g, '').trim()).filter(t => t.length > 0);
      }
    }
    // Object end
    else if (trimmed === '}' || trimmed === '},') {
      if (currentTool.id && currentTool.name && currentTool.slug) {
        tools.push(currentTool);
        toolCount++;
      }
      inTool = false;
      currentTool = {};
    }
  }
  
  // Don't forget the last tool
  if (inTool && currentTool.id && currentTool.name && currentTool.slug) {
    tools.push(currentTool);
    toolCount++;
  }
  
  console.log(`Parsed ${tools.length} tools from database (via line-by-line)`);
  return tools;
}

/** Generate a Markdown blog post for a single tool */
function generateBlogPost(tool) {
  const date = new Date();
  const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  
  return [
    `---`,
    `title: "${tool.name} - AI Tool Review"`,
    `date: "${formattedDate}"`,
    `slug: "${tool.slug}"`,
    `company: "${tool.company}"`,
    `categories: ["AI", "${tool.category.toLowerCase().replace(/\s+/g, '-')}", "${tool.company.toLowerCase().replace(/\s+/g, '-')}"]`,
    `tags: [<code>#AI</code>]`,
    `featured: true`,
    `---`,
    ``,
    `# ${tool.name}`,
    ``,
    `<div className="bg-blue-50 border border-blue-200 dark:bg-blue-950/40 dark:border-blue-800 rounded-lg p-4 mb-6 text-sm">
<p className="font-bold text-blue-800 dark:text-blue-300">Company: ${tool.company}</p>
<p className="text-gray-600 dark:text-gray-300">${tool.tagline}</p>
</div>`,
    ``,
    '## Overview',
    ``,
    tool.description || 'No description available.',
    ``,
    '## Key Features',
    ``,
    `- **Category**: ${tool.category}`,
    `- **Pricing**: ${tool.pricing}`,
    `- **Status**: ${tool.status}`,
    `- **Company**: ${tool.company}`,
    ``,
    '## Usage',
    ``,
    `This tool is available at [${tool.name}](/${tool.slug}) and can be integrated into various workflows depending on the use case.`,
    ``,
    '## Pricing',
    ``,
    `- ${tool.pricing.charAt(0).toUpperCase() + tool.pricing.slice(1)} tier available`,
    ``,
    '---',
    ``,
    `_Auto-generated by \`scripts/generate-blog.mjs\` on ${formattedDate}. For updates, regenerate with the script.`,
    ``
  ].filter(Boolean).join('\n');
}

/** Ensure blog directory exists */
function ensureBlogDir() {
  mkdirSync(BLOG_DIR, { recursive: true });
}

/** Generate the blog index */
function generateBlogIndex(tools) {
  const sortedTools = tools.sort((a, b) => b.name.localeCompare(a.name));
  
  const items = sortedTools.map(tool => {
    const companyTag = tool.company !== 'Unknown' ? ` (${tool.company})` : '';
    const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    return `- [${tool.name}](${tool.slug}.md)${companyTag} — ${date}`;
  });
  
  return [
    `# AI Tools Blog`,
    ``,
    `Latest additions and updates to the Zevylo AI tools directory. Total tools: ${sortedTools.length}`,
    ``,
    '## Recent Additions',
    ``,
    ...items.slice(0, 10),
    ``,
    '## All Tools',
    ``,
    ...items.map(item => item).join('\n'),
    ``,
    '_Generated automatically from the AI tools database. Last updated: new tool additions generate posts automatically._',
    ``
  ].filter(Boolean).join('\n');
}

/** Submit updated URLs to IndexNow after blog generation */
async function submitIndexNow() {
  console.log('\n=== IndexNow Submission ===');
  
  // Read the sitemap to get all URLs
  const sitemapPath = join(ROOT, 'public', 'sitemap.xml');
  let sitemapContent = '';
  
  try {
    sitemapContent = readFileSync(sitemapPath, 'utf8');
  } catch {
    console.warn('⚠️  Could not read sitemap.xml, using fallback URLs');
    sitemapContent = '';
  }
  
  // Extract URLs from sitemap - simpler approach
  const urlPattern = /<loc><!(--_START--)>(https?:[^<]+)<!\/(--_END-->)>/g;
  const urlMatches = sitemapContent.match(/<loc>(https?:[^<]+)<\/loc>/g) || [];
  const sitemapUrls = new Set();
  
  for (const match of urlMatches) {
    const urlMatch = match.match(/<loc>(https?:[^<]+)<\/loc>/);
    if (urlMatch) {
      sitemapUrls.add(urlMatch[1]);
    }
  }
  
  // Add blog URLs that were just generated
  let blogUrls = new Set();
  try {
    const blogFiles = require('fs').readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'));
    blogFiles.forEach(f => {
      blogUrls.add(`https://zevylo.netlify.app/blog/${f.replace('.md', '')}`);
    });
  } catch {
    console.warn('⚠️  Could not read blog directory');
  }
  
  // Combine all URLs (deduplicate)
  const allUrls = [...new Set([...sitemapUrls, ...blogUrls])];
  
  if (allUrls.size === 0) {
    console.log('⚠️  No URLs found for IndexNow submission');
    return;
  }
  
  console.log(`[1/3] Found ${allUrls.size} URLs to submit to IndexNow`);
  
  // IndexNow API configuration
  const HOST = 'zevylo.netlify.app';
  const KEY = 'a8f4c2e6b10d48729548b29c01f65492';
  const KEY_LOCATION = `https://zevylo.netlify.app/a8f4c2e6b10d48729548b29c01f65492.txt`;
  const ENDPOINTS = [
    'https://api.indexnow.org/indexnow',
    'https://www.bing.com/indexnow',
    'https://yandex.com/indexnow',
  ];
  
  // Submit in batches of 500 (IndexNow limit)
  const batchSize = 500;
  const urlArray = [...allUrls];
  
  for (let i = 0; i < urlArray.length; i += batchSize) {
    const batch = urlArray.slice(i, i + batchSize);
    
    const payload = {
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: batch,
    };
    
    console.log(`[2/3] Submitting batch ${Math.floor(i / batchSize) + 1} (${batch.length} URLs)...`);
    
    for (const endpoint of ENDPOINTS) {
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify(payload),
        });
        
        if (res.status === 200 || res.status === 202) {
          console.log(`  ✅ ${endpoint}: Success (HTTP ${res.status})`);
        } else {
          const body = await res.text().catch(() => 'No response');
          console.log(`  ⚠️ ${endpoint}: HTTP ${res.status} - ${body.slice(0, 100)}`);
        }
      } catch (e) {
        console.error(`  ❌ ${endpoint}: Error - ${e.message}`);
      }
    }
  }
  
  // Ping search engines
  console.log('[3/3] Pinging search engines...');
  
  const pingUrls = [
    `https://www.google.com/ping?sitemap=https://zevylo.netlify.app/sitemap.xml`,
    `https://www.bing.com/ping?sitemap=https://zevylo.netlify.app/sitemap.xml`,
  ];
  
  for (const url of pingUrls) {
    try {
      const res = await fetch(url);
      console.log(`  → ${url.split('?')[0]} => HTTP ${res.status}`);
    } catch (e) {
      console.log(`  → ${url.split('?')[0]} failed (${e.message})`);
    }
  }
  
  console.log('=== IndexNow Submission Complete ===\n');
}

/** Main function */
async function main() {
  console.log('=== Zevylo Blog Generator ===');
  
  // Parse tools from database
  const tools = parseDatabase();
  console.log(`Parsed ${tools.length} tools from database`);
  
  if (tools.length === 0) {
    console.warn('No tools found in database');
    return;
  }
  
  // Ensure blog directory exists
  ensureBlogDir();
  
  // Generate individual blog posts
  let generated = 0;
  for (const tool of tools) {
    // Check if blog post already exists
    const blogPath = join(BLOG_DIR, `${tool.slug}.md`);
    let exists = false;
    try {
      statSync(blogPath);
      exists = true;
    } catch {
      exists = false;
    }
    
    if (!exists) {
      const md = generateBlogPost(tool);
      writeFileSync(blogPath, md, 'utf8');
      generated++;
      console.log(`✅ Generated: ${tool.name} (${tool.slug}) - Company: ${tool.company}`);
    } else {
      console.log(`⏭️  Already exists: ${tool.name} (${tool.slug})`);
    }
  }
  
  // Generate blog index
  const indexMd = generateBlogIndex(tools);
  writeFileSync(join(BLOG_DIR, 'index.md'), indexMd, 'utf8');
  
  console.log(`\n=== Blog Generation Complete ===`);
  console.log(`Generated: ${generated} new blog posts`);
  console.log(`Total tools in database: ${tools.length}`);
  
  // Submit to IndexNow after blog generation
  if (generated > 0) {
    await submitIndexNow();
  } else {
    console.log('ℹ️  No new posts generated, skipping IndexNow submission');
  }
  
  console.log(`Blog directory: ${BLOG_DIR}`);
  console.log(`\nRun \`node scripts/generate-blog.mjs\` to regenerate or update posts.`);
}

main().catch(err => {
  console.error('Fatal error during blog generation:', err);
  process.exit(1);
});