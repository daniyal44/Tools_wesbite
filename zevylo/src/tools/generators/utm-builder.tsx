'use client';
import React, { useState, useMemo } from 'react';
import { copyToClipboard } from '@/lib/utils';

export default function UtmBuilder() {
  const [baseUrl, setBaseUrl] = useState('');
  const [source, setSource] = useState('');
  const [medium, setMedium] = useState('');
  const [campaign, setCampaign] = useState('');
  const [term, setTerm] = useState('');
  const [content, setContent] = useState('');

  const generatedUrl = useMemo(() => {
    if (!baseUrl) return '';

    try {
      // Validate and pad url
      const urlObj = new URL(baseUrl.startsWith('http') ? baseUrl : `https://${baseUrl}`);
      
      if (source) urlObj.searchParams.set('utm_source', source);
      else urlObj.searchParams.delete('utm_source');
      
      if (medium) urlObj.searchParams.set('utm_medium', medium);
      else urlObj.searchParams.delete('utm_medium');
      
      if (campaign) urlObj.searchParams.set('utm_campaign', campaign);
      else urlObj.searchParams.delete('utm_campaign');
      
      if (term) urlObj.searchParams.set('utm_term', term);
      else urlObj.searchParams.delete('utm_term');
      
      if (content) urlObj.searchParams.set('utm_content', content);
      else urlObj.searchParams.delete('utm_content');

      return urlObj.toString();
    } catch {
      return 'Invalid URL';
    }
  }, [baseUrl, source, medium, campaign, term, content]);

  const presetSource = (s: string, m: string) => {
    setSource(s);
    setMedium(m);
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4 rounded-xl border p-4 bg-white dark:bg-gray-900">
        <h2 className="text-xl font-bold">UTM Parameters</h2>
        
        <div>
          <label className="block text-sm font-medium">Website URL *</label>
          <input className="w-full border p-2 rounded dark:bg-gray-800" value={baseUrl} onChange={e => setBaseUrl(e.target.value)} placeholder="https://example.com" />
        </div>

        <div className="pt-2 border-t">
          <label className="block text-sm font-medium mb-2">Quick Presets</label>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => presetSource('google', 'cpc')} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded hover:bg-gray-200">Google Ads</button>
            <button onClick={() => presetSource('facebook', 'social')} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded hover:bg-gray-200">Facebook Social</button>
            <button onClick={() => presetSource('twitter', 'social')} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded hover:bg-gray-200">Twitter Social</button>
            <button onClick={() => presetSource('newsletter', 'email')} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded hover:bg-gray-200">Email Newsletter</button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Campaign Source (utm_source) *</label>
          <input className="w-full border p-2 rounded dark:bg-gray-800" value={source} onChange={e => setSource(e.target.value)} placeholder="e.g. google, newsletter" />
        </div>

        <div>
          <label className="block text-sm font-medium">Campaign Medium (utm_medium)</label>
          <input className="w-full border p-2 rounded dark:bg-gray-800" value={medium} onChange={e => setMedium(e.target.value)} placeholder="e.g. cpc, banner, email" />
        </div>

        <div>
          <label className="block text-sm font-medium">Campaign Name (utm_campaign)</label>
          <input className="w-full border p-2 rounded dark:bg-gray-800" value={campaign} onChange={e => setCampaign(e.target.value)} placeholder="e.g. spring_sale" />
        </div>

        <div>
          <label className="block text-sm font-medium">Campaign Term (utm_term)</label>
          <input className="w-full border p-2 rounded dark:bg-gray-800" value={term} onChange={e => setTerm(e.target.value)} placeholder="Identify paid keywords" />
        </div>

        <div>
          <label className="block text-sm font-medium">Campaign Content (utm_content)</label>
          <input className="w-full border p-2 rounded dark:bg-gray-800" value={content} onChange={e => setContent(e.target.value)} placeholder="Use to differentiate ads" />
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="rounded-xl border p-4 bg-gray-50 dark:bg-gray-800 sticky top-4">
          <h2 className="text-xl font-bold mb-4">Generated Campaign URL</h2>
          
          <div className="p-4 bg-white dark:bg-gray-900 border rounded-xl break-all font-mono text-sm mb-4 min-h-[100px]">
            {generatedUrl && generatedUrl !== 'Invalid URL' ? generatedUrl : <span className="text-gray-400">Enter a valid URL to generate...</span>}
            {generatedUrl === 'Invalid URL' && <span className="text-red-500">Please enter a valid base URL (e.g., example.com)</span>}
          </div>

          <button 
            onClick={() => generatedUrl && generatedUrl !== 'Invalid URL' && copyToClipboard(generatedUrl)} 
            disabled={!generatedUrl || generatedUrl === 'Invalid URL'}
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Copy URL
          </button>
        </div>
      </div>
    </div>
  );
}
