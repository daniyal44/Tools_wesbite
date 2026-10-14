import { NextResponse } from 'next/server';

export const INDEXNOW_KEY = 'a8f4c2e6b10d48729548b29c01f65492';

export async function GET() {
  return new NextResponse(INDEXNOW_KEY, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
