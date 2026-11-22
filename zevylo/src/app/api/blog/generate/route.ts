import { NextResponse } from 'next/server';
import { AI_TOOLS_DATABASE } from '@/lib/ai-directory/database';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const DB_PATH = join(ROOT, 'src', 'lib', 'ai-directory', 'database.ts');
const BLOG_DIR = join(ROOT, 'public', 'blog');

/** Extract tool data from the database file using regex */
function parseDatabase() {
  const src = readFileSync(DB_PATH, 'utf8');
  
  // Match individual tool objects using the proven pattern
  const toolRegex = /\{\s*id\s*:\s*['\"]([^'\"]+)['\"],\s*name\s*:\s*['\"]([^'\"]+)['\"],\s*slug\s*:\s*['\"]([^'\"]+)['\"]/g;
  
  const tools = [];
  let match;
  
  while ((match = toolRegex.exec(src)) !== null) {
    const id = match[1];
    const name = match[2];
    const slug = match[3];
    
    if (!id || !name || !slug) continue;
    
    // Find the tool object content
    let objStart = src.indexOf('{', match.index);
    if (objStart === -1) continue;
    
    let braceCount = 0;
    let objEnd = -1;
    for (let i = objStart; i < src.length; i++) {
      if (src[i] === '{') braceCount++;
      if (src[i] === '}') {
        braceCount--;
        if (braceCount === 0) {
          objEnd = i;
          break;
        }
      }
    }
    
    if (objEnd === -1) continue;
    
    const objContent = src.substring(objStart, objEnd + 1);
    
    // Extract fields
    const extractField = (fieldName: string) => {
      const regex = new RegExp(`${fieldName}\\s*:\\s*['\"]([^'\"]+)['\"]`, 'g');
      const m = objContent.match(regex);
      return m ? m[1] : null;
    };
    
    let company = 'Unknown';
    const companyMatch = objContent.match(/company\s*:\s*['\"]([^'\"]+)['\"]/);
    if (companyMatch) {
      company = companyMatch[1];
    } else {
      const companyAlt = objContent.match(/company\s*:\s*([^\s,;]+)/);
      if (companyAlt) {
        company = companyAlt[1].trim();
      }
    }
    
    tools.push({
      id,
      name,
      slug,
      company: company,
      category: extractField('category') || 'Uncategorized',
      tagline: extractField('tagline') || '',
      description: extractField('description') || '',
      pricing: extractField('pricing') || 'freemium',
      status: extractField('status') || 'launched',
      tags: []
    });
  }
  
  return tools;
}

/** Generate a Markdown blog post for a single tool */
function generateBlogPost(tool: AITool) {
  const date = new Date();
  const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  
  const tagsHtml = tool.tags?.length ? tool.tags.slice(0, 5).map((tag: string) => `<code>#${tag}</code>`).join(' ') : '<code>#AI</code>';
  
  return [
    `---`,
    `title: "${tool.name} - AI Tool Review"`,
    `date: "${formattedDate}"`,
    `slug: "${tool.slug}"`,
    `company: "${tool.company}"`,
    `categories: ["AI", "${tool.category.toLowerCase().replace(/\s+/g, '-')}", "${tool.company.toLowerCase().replace(/\s+/g, '-')}"]`,
    `tags: [${tagsHtml}]`,
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
    ...(tool.tags?.length ? [`- **Tags**: ${tool.tags.slice(0, 5).map((t: string) => `\`${t}\``).join(', ')}`] : []),
    ``,
    '## Categories & Sub-models',
    ``,
    ...(tool.company === 'OpenAI' ? [
      '- **ChatGPT**: GPT-4o, GPT-4, GPT-3.5 Turbo',
      '- **DALL-E 3**: Text-to-image generation',
      '- **Whisper**: Speech-to-text transcription',
      '- **Sora**: Text-to-video generation'
    ] : ''),
    ...(tool.company === 'Google' ? [
      '- **Gemini Nano**: On-device AI',
      '- **Gemini Flash**: Fast Gemini model',
      '- **Gemini Pro**: Advanced Gemini model',
      '- **NotebookLM**: AI-powered notebook'
    ] : ''),
    ...(tool.company === 'Anthropic' ? [
      '- **Claude 3 Opus**: Latest reasoning model',
      '- **Claude 3 Sonnet**: Balanced performance',
      '- **Claude 3 Haiku**: Fastest model'
    ] : ''),
    ...(tool.company === 'Meta' ? [
      '- **AudioCraft**: AI audio generation',
      '- **Llama 3**: Large language model'
    ] : ''),
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

export async function POST() {
  try {
    // Parse tools from database
    const tools = parseDatabase();
    console.log(`Generated blog: Parsed ${tools.length} tools`);
    
    // Ensure blog directory exists
    mkdirSync(BLOG_DIR, { recursive: true });
    
    // Generate individual blog posts
    let generated = 0;
    for (const tool of tools) {
      const blogPath = join(BLOG_DIR, `${tool.slug}.md`);
      let exists = false;
      try {
        readFileSync(blogPath);
        exists = true;
      } catch {
        exists = false;
      }
      
      if (!exists) {
        const md = generateBlogPost(tool);
        writeFileSync(blogPath, md, 'utf8');
        generated++;
        console.log(`✅ Generated: ${tool.name} (${tool.slug})`);
      }
    }
    
    // Generate blog index
    const sortedTools = tools.sort((a, b) => b.name.localeCompare(a.name));
    const indexItems = sortedTools.map(tool => {
      const companyTag = tool.company !== 'Unknown' ? ` (${tool.company})` : '';
      const date = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      return `- [${tool.name}](${tool.slug}.md)${companyTag} — ${date}`;
    });
    
    const indexMd = [
      `# AI Tools Blog`,
      ``,
      `Latest additions and updates to the Zevylo AI tools directory. Total tools: ${sortedTools.length}`,
      ``,
      '## Recent Additions',
      ``,
      ...indexItems.slice(0, 10),
      ``,
      '## All Tools',
      ``,
      ...indexItems.map(item => item).join('\n'),
      ``,
      '_Generated automatically from the AI tools database. Last updated: new tool additions generate posts automatically._',
      ``
    ].filter(Boolean).join('\n');
    
    writeFileSync(join(BLOG_DIR, 'index.md'), indexMd, 'utf8');
    
    return NextResponse.json({
      success: true,
      message: `Blog generation complete: ${generated} new posts generated`,
      totalTools: tools.length
    });
  } catch (error: any) {
    console.error('Blog generation error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}