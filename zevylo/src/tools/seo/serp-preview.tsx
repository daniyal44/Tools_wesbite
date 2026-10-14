'use client';
import React, { useState } from 'react';

export default function SerpPreview() {
  const [data, setData] = useState({
    title: 'Your Page Title',
    url: 'https://example.com/your-page',
    description: 'This is an example meta description. Optimize this text to improve click-through rates from Google search results. Keep it compelling and under 160 characters.'
  });
  const [isMobile, setIsMobile] = useState(false);

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4 rounded-xl border p-4 bg-white dark:bg-gray-900">
          <h2 className="text-xl font-bold">Input Details</h2>
          <div>
            <label className="block text-sm font-medium">Title ({data.title.length}/60)</label>
            <input className="w-full border p-2 rounded dark:bg-gray-800" value={data.title} onChange={e => setData({...data, title: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium">URL</label>
            <input className="w-full border p-2 rounded dark:bg-gray-800" value={data.url} onChange={e => setData({...data, url: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium">Description ({data.description.length}/160)</label>
            <textarea className="w-full border p-2 rounded dark:bg-gray-800" rows={4} value={data.description} onChange={e => setData({...data, description: e.target.value})} />
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Live Preview</h2>
            <div className="flex gap-2 bg-gray-200 dark:bg-gray-700 p-1 rounded-lg">
              <button className={`px-3 py-1 rounded ${!isMobile ? 'bg-white text-black shadow' : 'text-gray-500'}`} onClick={() => setIsMobile(false)}>Desktop</button>
              <button className={`px-3 py-1 rounded ${isMobile ? 'bg-white text-black shadow' : 'text-gray-500'}`} onClick={() => setIsMobile(true)}>Mobile</button>
            </div>
          </div>
          <div className={`p-4 bg-white dark:bg-[#202124] rounded-xl shadow border max-w-2xl mx-auto ${isMobile ? 'max-w-[375px]' : ''}`}>
            {isMobile ? (
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                  <div className="text-sm text-[#202124] dark:text-[#dadce0] truncate max-w-full">{data.url}</div>
                </div>
                <div className="text-lg text-[#1a0dab] dark:text-[#8ab4f8] cursor-pointer hover:underline truncate">{data.title || 'Page Title'}</div>
                <div className="text-sm text-[#4d5156] dark:text-[#bdc1c6] line-clamp-3 leading-snug">{data.description || 'Page description...'}</div>
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                <div className="text-sm text-[#202124] dark:text-[#dadce0] truncate max-w-full flex items-center gap-2">
                  <span>{data.url}</span>
                </div>
                <div className="text-xl text-[#1a0dab] dark:text-[#8ab4f8] cursor-pointer hover:underline truncate">{data.title || 'Page Title'}</div>
                <div className="text-sm text-[#4d5156] dark:text-[#bdc1c6] line-clamp-2 leading-snug max-w-[600px]">{data.description || 'Page description...'}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
