import { NextResponse } from 'next/server';
import '@/tools';
import { getAllTools } from '@/lib/tools/registry';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://zevylo.netlify.app';
  const tools = getAllTools();
  const buildDate = new Date().toUTCString();

  const items = tools
    .map((t) => {
      const url = `${baseUrl}/tools/${t.category}/${t.slug}`;
      const title = escapeXml(t.name);
      const desc = escapeXml(t.shortDescription || t.longDescription);
      const cat = escapeXml(t.category);

      return `    <item>
      <title>${title}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${desc}</description>
      <category>${cat}</category>
      <pubDate>${buildDate}</pubDate>
    </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Zevylo — Free Online Utilities &amp; Tools</title>
    <link>${baseUrl}</link>
    <description>Fast, private, 100% browser-based tools for developers, creators, and professionals.</description>
    <language>en-us</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
    },
  });
}

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
