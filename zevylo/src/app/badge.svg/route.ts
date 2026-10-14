import { NextResponse } from 'next/server';

export async function GET() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="34" viewBox="0 0 180 34" fill="none">
    <rect width="180" height="34" rx="8" fill="#0F172A"/>
    <rect x="0.5" y="0.5" width="179" height="33" rx="7.5" stroke="#334155"/>
    <circle cx="17" cy="17" r="7" fill="#3B82F6"/>
    <path d="M14 17L16 19L20 14" stroke="white" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
    <text x="32" y="21" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="600" fill="#94A3B8">FEATURED ON</text>
    <text x="115" y="21" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="12" font-weight="800" fill="#38BDF8">ZEVYLO</text>
  </svg>`;

  return new NextResponse(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=604800',
    },
  });
}
