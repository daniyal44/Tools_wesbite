'use client';
import React, { useState } from 'react';
import { copyToClipboard, downloadFile } from '@/lib/utils';

export default function MetaTagGenerator() {
  const [data, setData] = useState({
    title: '',
    description: '',
    keywords: '',
    author: '',
    robots: 'index, follow',
    viewport: 'width=device-width, initial-scale=1.0',
    canonical: '',
    ogTitle: '',
    ogDesc: '',
    ogImage: '',
    twitterCard: 'summary',
  });

  const generateTags = () => {
    let html = '';
    if (data.title) html += `<title>${data.title}</title>\n`;
    if (data.description) html += `<meta name="description" content="${data.description}">\n`;
    if (data.keywords) html += `<meta name="keywords" content="${data.keywords}">\n`;
    if (data.author) html += `<meta name="author" content="${data.author}">\n`;
    if (data.viewport) html += `<meta name="viewport" content="${data.viewport}">\n`;
    if (data.robots) html += `<meta name="robots" content="${data.robots}">\n`;
    if (data.canonical) html += `<link rel="canonical" href="${data.canonical}">\n`;
    if (data.ogTitle) html += `<meta property="og:title" content="${data.ogTitle}">\n`;
    if (data.ogDesc) html += `<meta property="og:description" content="${data.ogDesc}">\n`;
    if (data.ogImage) html += `<meta property="og:image" content="${data.ogImage}">\n`;
    if (data.twitterCard) html += `<meta name="twitter:card" content="${data.twitterCard}">\n`;
    return html;
  };

  const handleCopy = () => copyToClipboard(generateTags());
  const handleDownload = () => downloadFile(generateTags(), 'meta-tags.html', 'text/html');

  return (
    <div className="flex flex-col gap-6 md:flex-row">
      <div className="flex-1 space-y-4 rounded-xl border p-4 bg-white dark:bg-gray-900">
        <h2 className="text-xl font-bold">Meta Tag Details</h2>
        <div>
          <label className="block text-sm font-medium">Title ({data.title.length}/60)</label>
          <input className="w-full border p-2 rounded dark:bg-gray-800" value={data.title} onChange={e => setData({...data, title: e.target.value})} placeholder="Page Title" />
        </div>
        <div>
          <label className="block text-sm font-medium">Description ({data.description.length}/160)</label>
          <textarea className="w-full border p-2 rounded dark:bg-gray-800" value={data.description} onChange={e => setData({...data, description: e.target.value})} placeholder="Page Description" />
        </div>
        <div>
          <label className="block text-sm font-medium">Keywords</label>
          <input className="w-full border p-2 rounded dark:bg-gray-800" value={data.keywords} onChange={e => setData({...data, keywords: e.target.value})} placeholder="keyword1, keyword2" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Author</label>
            <input className="w-full border p-2 rounded dark:bg-gray-800" value={data.author} onChange={e => setData({...data, author: e.target.value})} placeholder="Author Name" />
          </div>
          <div>
            <label className="block text-sm font-medium">Robots</label>
            <select className="w-full border p-2 rounded dark:bg-gray-800" value={data.robots} onChange={e => setData({...data, robots: e.target.value})}>
              <option value="index, follow">index, follow</option>
              <option value="noindex, follow">noindex, follow</option>
              <option value="index, nofollow">index, nofollow</option>
              <option value="noindex, nofollow">noindex, nofollow</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">OG Title</label>
            <input className="w-full border p-2 rounded dark:bg-gray-800" value={data.ogTitle} onChange={e => setData({...data, ogTitle: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium">Twitter Card</label>
            <select className="w-full border p-2 rounded dark:bg-gray-800" value={data.twitterCard} onChange={e => setData({...data, twitterCard: e.target.value})}>
              <option value="summary">Summary</option>
              <option value="summary_large_image">Summary Large Image</option>
            </select>
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4">
        <div className="rounded-xl border p-4 bg-gray-50 dark:bg-gray-800">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold">Generated HTML</h2>
            <div className="space-x-2">
              <button onClick={handleCopy} className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Copy</button>
              <button onClick={handleDownload} className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700">Download</button>
            </div>
          </div>
          <pre className="p-4 bg-gray-900 text-green-400 rounded overflow-x-auto text-sm">
            {generateTags() || '<!-- Enter details to generate meta tags -->'}
          </pre>
        </div>
        <div className="text-sm text-gray-500">Processed locally in your browser.</div>
      </div>
    </div>
  );
}
