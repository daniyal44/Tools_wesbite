'use client';
import React, { useState } from 'react';
import { copyToClipboard } from '@/lib/utils';

export default function UuidGenerator() {
  const [count, setCount] = useState(1);
  const [format, setFormat] = useState<'standard' | 'uppercase' | 'nodashes'>('standard');

  const createUUIDs = (c: number, f: 'standard' | 'uppercase' | 'nodashes') => {
    const newUuids = [];
    for (let i = 0; i < c; i++) {
      let uuid = crypto.randomUUID();
      if (f === 'uppercase') uuid = uuid.toUpperCase();
      if (f === 'nodashes') uuid = uuid.replace(/-/g, '');
      newUuids.push(uuid);
    }
    return newUuids;
  };

  const [uuids, setUuids] = useState<string[]>(() => {
    try {
      if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return [crypto.randomUUID()];
      }
    } catch {}
    return [];
  });
  const [validateInput, setValidateInput] = useState('');
  const [validationResult, setValidationResult] = useState<boolean | null>(null);

  const generateUUIDs = () => {
    setUuids(createUUIDs(count, format));
  };

  const handleFormatChange = (newFormat: 'standard' | 'uppercase' | 'nodashes') => {
    setFormat(newFormat);
    setUuids(createUUIDs(count, newFormat));
  };

  const handleCountChange = (newCount: number) => {
    const validCount = Math.min(500, Math.max(1, newCount));
    setCount(validCount);
    setUuids(createUUIDs(validCount, format));
  };

  const handleValidate = (val: string) => {
    setValidateInput(val);
    if (!val) {
      setValidationResult(null);
      return;
    }
    const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    setValidationResult(regex.test(val));
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6 rounded-xl border p-4 bg-white dark:bg-gray-900">
          <h2 className="text-xl font-bold">Generator Settings</h2>
          
          <div>
            <label className="block text-sm font-medium mb-2">How many UUIDs?</label>
            <input
              type="number"
              min="1"
              max="500"
              value={count}
              onChange={e => handleCountChange(parseInt(e.target.value) || 1)}
              className="w-full border p-2 rounded dark:bg-gray-800"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Format</label>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={format === 'standard'}
                  onChange={() => handleFormatChange('standard')}
                  name="format"
                />
                Standard (e.g. 123e4567-e89b-12d3-a456-426614174000)
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={format === 'uppercase'}
                  onChange={() => handleFormatChange('uppercase')}
                  name="format"
                />
                Uppercase
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={format === 'nodashes'}
                  onChange={() => handleFormatChange('nodashes')}
                  name="format"
                />
                No Dashes
              </label>
            </div>
          </div>
          
          <button onClick={generateUUIDs} className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Regenerate</button>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border p-4 bg-gray-50 dark:bg-gray-800">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Generated UUIDs (v4)</h2>
              <button onClick={() => copyToClipboard(uuids.join('\\n'))} className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700">Copy All</button>
            </div>
            
            <textarea 
              className="w-full h-48 border p-3 rounded font-mono text-sm dark:bg-gray-900 bg-white"
              readOnly
              value={uuids.join('\\n')}
            />
            <div className="text-xs text-gray-500 mt-2">Generated locally in your browser using crypto.randomUUID()</div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border p-6 bg-white dark:bg-gray-900">
        <h2 className="text-xl font-bold mb-4">UUID v4 Validator</h2>
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <input 
            type="text" 
            placeholder="Paste a UUID to validate..." 
            className="flex-1 border p-2 rounded dark:bg-gray-800 w-full"
            value={validateInput}
            onChange={e => handleValidate(e.target.value)}
          />
          {validationResult !== null && (
            <div className={`px-4 py-2 rounded font-bold shrink-0 ${validationResult ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {validationResult ? 'Valid v4 UUID' : 'Invalid v4 UUID'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
