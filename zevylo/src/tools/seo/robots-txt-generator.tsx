'use client';
import React, { useState } from 'react';
import { copyToClipboard, downloadFile } from '@/lib/utils';

export default function RobotsTxtGenerator() {
  const [userAgent, setUserAgent] = useState('*');
  const [rules, setRules] = useState<{type: 'Allow' | 'Disallow', path: string}[]>([]);
  const [sitemap, setSitemap] = useState('');
  const [crawlDelay, setCrawlDelay] = useState('');
  
  const [newRulePath, setNewRulePath] = useState('/');
  const [newRuleType, setNewRuleType] = useState<'Allow' | 'Disallow'>('Disallow');

  const addRule = () => {
    if (newRulePath) setRules([...rules, { type: newRuleType, path: newRulePath }]);
    setNewRulePath('/');
  };

  const removeRule = (index: number) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  const generateContent = () => {
    let content = `User-agent: ${userAgent}\n`;
    if (crawlDelay) content += `Crawl-delay: ${crawlDelay}\n`;
    rules.forEach(r => {
      content += `${r.type}: ${r.path}\n`;
    });
    if (sitemap) content += `\nSitemap: ${sitemap}\n`;
    return content;
  };

  const applyPreset = (preset: 'allowAll' | 'blockAll') => {
    setUserAgent('*');
    if (preset === 'allowAll') setRules([]);
    if (preset === 'blockAll') setRules([{ type: 'Disallow', path: '/' }]);
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-4 rounded-xl border p-4 bg-white dark:bg-gray-900">
        <h2 className="text-xl font-bold">Configuration</h2>
        
        <div className="flex gap-2">
            <button onClick={() => applyPreset('allowAll')} className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm hover:bg-green-200">Allow All</button>
            <button onClick={() => applyPreset('blockAll')} className="px-3 py-1 bg-red-100 text-red-800 rounded text-sm hover:bg-red-200">Block All</button>
        </div>

        <div>
          <label className="block text-sm font-medium">User-agent</label>
          <input className="w-full border p-2 rounded dark:bg-gray-800" value={userAgent} onChange={e => setUserAgent(e.target.value)} />
        </div>
        
        <div>
          <label className="block text-sm font-medium">Sitemap URL</label>
          <input className="w-full border p-2 rounded dark:bg-gray-800" value={sitemap} onChange={e => setSitemap(e.target.value)} placeholder="https://example.com/sitemap.xml" />
        </div>

        <div>
          <label className="block text-sm font-medium">Crawl-delay (seconds)</label>
          <input type="number" className="w-full border p-2 rounded dark:bg-gray-800" value={crawlDelay} onChange={e => setCrawlDelay(e.target.value)} placeholder="e.g. 10" />
        </div>

        <div className="border-t pt-4">
          <label className="block text-sm font-medium mb-2">Rules</label>
          <div className="flex gap-2 mb-4">
            <select className="border p-2 rounded dark:bg-gray-800" value={newRuleType} onChange={e => setNewRuleType(e.target.value as 'Disallow' | 'Allow')}>
              <option value="Disallow">Disallow</option>
              <option value="Allow">Allow</option>
            </select>
            <input className="flex-1 border p-2 rounded dark:bg-gray-800" value={newRulePath} onChange={e => setNewRulePath(e.target.value)} placeholder="/path/" />
            <button onClick={addRule} className="px-4 py-2 bg-blue-600 text-white rounded">Add</button>
          </div>
          <ul className="space-y-2">
            {rules.map((rule, idx) => (
              <li key={idx} className="flex justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded border">
                <span><strong>{rule.type}:</strong> {rule.path}</span>
                <button onClick={() => removeRule(idx)} className="text-red-500 hover:text-red-700 font-bold">X</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="rounded-xl border p-4 bg-gray-50 dark:bg-gray-800">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold">Generated File</h2>
            <div className="space-x-2">
              <button onClick={() => copyToClipboard(generateContent())} className="px-3 py-1 bg-blue-600 text-white rounded">Copy</button>
              <button onClick={() => downloadFile(generateContent(), 'robots.txt', 'text/plain')} className="px-3 py-1 bg-green-600 text-white rounded">Download</button>
            </div>
          </div>
          <pre className="p-4 bg-white dark:bg-gray-900 border rounded overflow-x-auto text-sm font-mono whitespace-pre-wrap">
            {generateContent()}
          </pre>
        </div>
      </div>
    </div>
  );
}
