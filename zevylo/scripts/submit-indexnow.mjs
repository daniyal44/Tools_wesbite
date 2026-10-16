#!/usr/bin/env node
/**
 * submit-indexnow.mjs
 * -------------------------------------------------------------
 * Automatically extracts all URLs from Zevylo sitemap and submits
 * them to the IndexNow API (Bing, Yandex, Seznam, Naver) and search engine pings.
 *
 * Run: node scripts/submit-indexnow.mjs
 * -------------------------------------------------------------
 */

const HOST = 'zevylo.netlify.app';
const BASE_URL = `https://${HOST}`;
const KEY = 'a8f4c2e6b10d48729548b29c01f65492';
const KEY_LOCATION = `${BASE_URL}/a8f4c2e6b10d48729548b29c01f65492.txt`;
const SITEMAP_URL = `${BASE_URL}/sitemap.xml`;

async function fetchSitemapUrls() {
  console.log(`[1/3] Fetching live sitemap from ${SITEMAP_URL}...`);
  try {
    const res = await fetch(SITEMAP_URL);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText}`);
    }
    const text = await res.text();
    const matches = [...text.matchAll(/<loc>(https?:\/\/[^<]+)<\/loc>/g)];
    const urls = Array.from(new Set(matches.map(m => m[1])));
    console.log(`[1/3] Successfully parsed ${urls.length} URLs from sitemap.`);
    return urls;
  } catch (err) {
    console.warn(`[!] Warning: Could not fetch remote sitemap (${err.message}). Using fallback core URLs.`);
    return [
      `${BASE_URL}/`,
      `${BASE_URL}/tools`,
      `${BASE_URL}/ai-tools`,
      `${BASE_URL}/categories`,
      `${BASE_URL}/articles`,
      `${BASE_URL}/blog`,
      `${BASE_URL}/resources`,
      `${BASE_URL}/about`,
      `${BASE_URL}/contact`,
      `${BASE_URL}/privacy`,
      `${BASE_URL}/terms`,
      `${BASE_URL}/llms.txt`,
    ];
  }
}

async function submitToIndexNow(urls) {
  console.log(`[2/3] Submitting ${urls.length} URLs to IndexNow endpoints...`);

  // IndexNow accepts up to 10,000 URLs per batch
  const batchSize = 500;
  const endpoints = [
    'https://api.indexnow.org/indexnow',
    'https://www.bing.com/indexnow',
    'https://yandex.com/indexnow',
  ];

  for (let i = 0; i < urls.length; i += batchSize) {
    const batch = urls.slice(i, i + batchSize);
    const payload = {
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: batch,
    };

    for (const endpoint of endpoints) {
      try {
        console.log(` -> Submitting batch ${Math.floor(i / batchSize) + 1} (${batch.length} URLs) to ${endpoint}...`);
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify(payload),
        });

        if (res.status === 200 || res.status === 202) {
          console.log(`    ✅ Success: ${endpoint} responded with HTTP ${res.status}`);
        } else {
          const body = await res.text().catch(() => '');
          console.log(`    ⚠️ Status ${res.status} from ${endpoint}: ${body.slice(0, 100)}`);
        }
      } catch (e) {
        console.error(`    ❌ Error submitting to ${endpoint}:`, e.message);
      }
    }
  }
}

async function pingSearchEngines() {
  console.log(`[3/3] Pinging Search Engine sitemap endpoints...`);
  const pingUrls = [
    `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
    `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`,
  ];

  for (const url of pingUrls) {
    try {
      const res = await fetch(url);
      console.log(` -> Ping ${url.split('?')[0]} => HTTP ${res.status}`);
    } catch (e) {
      console.log(` -> Ping ${url.split('?')[0]} failed (${e.message})`);
    }
  }
}

async function main() {
  console.log(`=== Zevylo IndexNow & Search Engine Automation ===`);
  const urls = await fetchSitemapUrls();
  if (urls.length > 0) {
    await submitToIndexNow(urls);
  }
  await pingSearchEngines();
  console.log(`=== Done! IndexNow submission completed. ===\n`);
}

main().catch(err => {
  console.error('Fatal error during IndexNow submission:', err);
  process.exit(1);
});
