import { NextResponse } from 'next/server';
import { AI_TOOLS_DATABASE } from '@/lib/ai-directory/database';

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://zevylo.netlify.app';

export async function GET() {
  const tools = AI_TOOLS_DATABASE;
  
  // Generate RSS items for each tool
  const items = tools.map((tool) => {
    const pubDate = new Date();
    const category = tool.category || 'AI';
    const company = tool.company || '';
    const author = company || 'Zevylo Team';
    
    return `
    <item>
      <title>${tool.name} - ${tool.tagline || ''}</title>
      <description>${tool.description || 'No description available.'}</description>
      <link>${SITE_URL}/ai-tools/tool/${tool.slug}</link>
      <guid>${SITE_URL}/ai-tools/tool/${tool.slug}</guid>
      <pubDate>${pubDate.toUTCString()}</pubDate>
      <author>${author}</author>
      <category>${category}</category>
    </item>`;
  });
  
  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Zevylo AI Tools Blog</title>
    <description>Discover and explore AI tools and utilities from around the world</description>
    <link>${SITE_URL}/ai-tools</link>
    <description>Latest AI tools, models, and utilities indexed by company and category</description>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <ttl>60</ttl>
    ${items.join('')}
  </channel>
</rss>`;
  
  return new NextResponse(rssFeed, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}