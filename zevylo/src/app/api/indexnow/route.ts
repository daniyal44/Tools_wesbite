import { NextResponse } from 'next/server';
import '@/tools';
import { getAllTools } from '@/lib/tools/registry';
import { categoryList } from '@/lib/tools/categories';
import { INDEXNOW_KEY } from '@/app/indexnow.txt/route';

export async function POST() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://zevylo.netlify.app';
  const tools = getAllTools();

  const urlList = [
    baseUrl,
    `${baseUrl}/tools`,
    `${baseUrl}/categories`,
    `${baseUrl}/articles`,
    `${baseUrl}/sitemap`,
    `${baseUrl}/badges`,
    `${baseUrl}/resources`,
    `${baseUrl}/llms.txt`,
    ...categoryList.map((c) => `${baseUrl}/tools/${c.slug}`),
    ...tools.map((t) => `${baseUrl}/tools/${t.category}/${t.slug}`),
    ...tools.map((t) => `${baseUrl}/articles/${t.slug}`),
  ];

  const payload = {
    host: 'zevylo.netlify.app',
    key: INDEXNOW_KEY,
    keyLocation: `${baseUrl}/indexnow.txt`,
    urlList: urlList.slice(0, 10000),
  };

  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    return NextResponse.json({
      success: res.ok,
      status: res.status,
      submittedUrls: urlList.length,
      message: res.ok
        ? 'URLs successfully submitted to IndexNow search engine cluster'
        : 'IndexNow submission completed with status ' + res.status,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      { success: false, error: message, submittedUrls: urlList.length },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'IndexNow endpoint ready',
    protocol: 'IndexNow v1.0',
    keyLocation: '/indexnow.txt',
    supportedEngines: ['Bing', 'Yandex', 'Seznam', 'Naver'],
  });
}
