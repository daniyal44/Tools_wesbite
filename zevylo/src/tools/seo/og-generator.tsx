'use client';
import React, { useState } from 'react';
import { copyToClipboard, downloadFile } from '@/lib/utils';

export default function OgGenerator() {
  const [data, setData] = useState({
    title: '',
    description: '',
    url: '',
    image: '',
    type: 'website',
    siteName: '',
    locale: 'en_US'
  });

  const generateTags = () => {
    return [
      data.title && `<meta property="og:title" content="${data.title}">`,
      data.description && `<meta property="og:description" content="${data.description}">`,
      data.url && `<meta property="og:url" content="${data.url}">`,
      data.image && `<meta property="og:image" content="${data.image}">`,
      data.type && `<meta property="og:type" content="${data.type}">`,
      data.siteName && `<meta property="og:site_name" content="${data.siteName}">`,
      data.locale && `<meta property="og:locale" content="${data.locale}">`,
      data.title && `<meta name="twitter:title" content="${data.title}">`,
      data.description && `<meta name="twitter:description" content="${data.description}">`,
      data.image && `<meta name="twitter:image" content="${data.image}">`,
      `<meta name="twitter:card" content="summary_large_image">`
    ].filter(Boolean).join('\n');
  };

  const handleCopy = () => copyToClipboard(generateTags());
  const handleDownload = () => downloadFile(generateTags(), 'open-graph-tags.html', 'text/html');

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4 rounded-xl border p-4 bg-white dark:bg-gray-900">
        <h2 className="text-xl font-bold">Open Graph Details</h2>
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input className="w-full border p-2 rounded dark:bg-gray-800" value={data.title} onChange={e => setData({...data, title: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea className="w-full border p-2 rounded dark:bg-gray-800" value={data.description} onChange={e => setData({...data, description: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-medium">Image URL</label>
          <input className="w-full border p-2 rounded dark:bg-gray-800" value={data.image} onChange={e => setData({...data, image: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-medium">Page URL</label>
          <input className="w-full border p-2 rounded dark:bg-gray-800" value={data.url} onChange={e => setData({...data, url: e.target.value})} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Type</label>
            <select className="w-full border p-2 rounded dark:bg-gray-800" value={data.type} onChange={e => setData({...data, type: e.target.value})}>
              <option value="website">Website</option>
              <option value="article">Article</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Site Name</label>
            <input className="w-full border p-2 rounded dark:bg-gray-800" value={data.siteName} onChange={e => setData({...data, siteName: e.target.value})} />
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="rounded-xl border p-4 bg-gray-50 dark:bg-gray-800">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold">Generated HTML</h2>
            <div className="space-x-2">
              <button onClick={handleCopy} className="px-3 py-1 bg-blue-600 text-white rounded">Copy</button>
              <button onClick={handleDownload} className="px-3 py-1 bg-green-600 text-white rounded">Download</button>
            </div>
          </div>
          <pre className="p-4 bg-gray-900 text-green-400 rounded overflow-x-auto text-sm">
            {generateTags() || '<!-- Enter details to generate tags -->'}
          </pre>
        </div>
        <div className="border rounded-xl p-4 bg-white dark:bg-gray-900">
            <h3 className="font-bold mb-2">Social Preview</h3>
            <div className="border rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {data.image ? <img src={data.image} alt="OG Preview" className="w-full h-48 object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} /> : <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500">No Image Preview</div>}
                <div className="p-3">
                    <div className="text-xs text-gray-500 uppercase">{new URL(data.url || 'https://example.com').hostname}</div>
                    <div className="font-bold text-gray-900 dark:text-white truncate">{data.title || 'Your Title'}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{data.description || 'Description of your page...'}</div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
