'use client';

import React, { useState, useEffect } from 'react';
import { copyToClipboard } from '@/lib/utils';
import { Check, Copy, Info, Clock, Calendar } from 'lucide-react';

interface CopyButtonProps {
  text: string;
  id: string;
  copied: boolean;
  onCopy: (text: string, id: string) => void;
}

function CopyButton({ text, id, copied, onCopy }: CopyButtonProps) {
  return (
    <button
      onClick={() => onCopy(text, id)}
      className="p-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 rounded-md transition-colors"
      title="Copy"
    >
      {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
    </button>
  );
}

export default function TimestampConverter() {
  const [timestamp, setTimestamp] = useState('');
  const [dateInput, setDateInput] = useState('');
  const [currentNow, setCurrentNow] = useState<number | null>(null);
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const initTimer = setTimeout(() => setCurrentNow(Date.now()), 0);
    const intervalTimer = setInterval(() => setCurrentNow(Date.now()), 1000);
    return () => {
      clearTimeout(initTimer);
      clearInterval(intervalTimer);
    };
  }, []);

  // Parse input timestamp
  let parsedDate: Date | null = null;
  const num = parseInt(timestamp, 10);
  if (!isNaN(num)) {
    // auto-detect seconds vs ms based on length. Unix time in seconds for year 2286 is 10 digits
    if (timestamp.length <= 11) {
      parsedDate = new Date(num * 1000);
    } else {
      parsedDate = new Date(num);
    }
  }

  // Parse date input
  let parsedFromDate: Date | null = null;
  if (dateInput) {
    const d = new Date(dateInput);
    if (!isNaN(d.getTime())) parsedFromDate = d;
  }

  const handleCopy = async (text: string, id: string) => {
    await copyToClipboard(text);
    setCopiedStates({ ...copiedStates, [id]: true });
    setTimeout(() => {
      setCopiedStates(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
        <Info className="w-4 h-4" />
        Processed locally in your browser
      </div>

      <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Current Epoch Unix Timestamp</p>
            <p className="text-2xl font-mono font-bold text-gray-900 dark:text-white">
              {currentNow !== null ? Math.floor(currentNow / 1000) : '—'}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            disabled={currentNow === null}
            onClick={() => currentNow !== null && handleCopy(String(Math.floor(currentNow / 1000)), 'curr-sec')} 
            className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
          >
            Copy Seconds
          </button>
          <button 
            disabled={currentNow === null}
            onClick={() => currentNow !== null && handleCopy(String(currentNow), 'curr-ms')} 
            className="px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
          >
            Copy Milliseconds
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2 border-b pb-2 dark:border-gray-700">
            <Clock className="w-5 h-5" />
            Timestamp to Date
          </h3>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Unix Timestamp</label>
            <input type="number" value={timestamp} onChange={e => setTimestamp(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 font-mono" placeholder="e.g. 1672531200" />
          </div>

          {parsedDate && (
            <div className="space-y-3 mt-4">
              <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <div>
                  <span className="text-xs text-gray-500 block mb-1">Local Time</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">{parsedDate.toLocaleString()}</span>
                </div>
                <CopyButton text={parsedDate.toLocaleString()} id="local" copied={!!copiedStates['local']} onCopy={handleCopy} />
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <div>
                  <span className="text-xs text-gray-500 block mb-1">UTC / GMT</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">{parsedDate.toUTCString()}</span>
                </div>
                <CopyButton text={parsedDate.toUTCString()} id="utc" copied={!!copiedStates['utc']} onCopy={handleCopy} />
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <div>
                  <span className="text-xs text-gray-500 block mb-1">ISO 8601</span>
                  <span className="font-mono text-sm text-gray-900 dark:text-gray-100">{parsedDate.toISOString()}</span>
                </div>
                <CopyButton text={parsedDate.toISOString()} id="iso" copied={!!copiedStates['iso']} onCopy={handleCopy} />
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2 border-b pb-2 dark:border-gray-700">
            <Calendar className="w-5 h-5" />
            Date to Timestamp
          </h3>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Local Date & Time</label>
            <input type="datetime-local" value={dateInput} onChange={e => setDateInput(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700" />
          </div>

          {parsedFromDate && (
            <div className="space-y-3 mt-4">
              <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <div>
                  <span className="text-xs text-gray-500 block mb-1">Timestamp in Seconds</span>
                  <span className="font-mono font-bold text-gray-900 dark:text-gray-100">{Math.floor(parsedFromDate.getTime() / 1000)}</span>
                </div>
                <CopyButton text={String(Math.floor(parsedFromDate.getTime() / 1000))} id="from-sec" copied={!!copiedStates['from-sec']} onCopy={handleCopy} />
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <div>
                  <span className="text-xs text-gray-500 block mb-1">Timestamp in Milliseconds</span>
                  <span className="font-mono font-bold text-gray-900 dark:text-gray-100">{parsedFromDate.getTime()}</span>
                </div>
                <CopyButton text={String(parsedFromDate.getTime())} id="from-ms" copied={!!copiedStates['from-ms']} onCopy={handleCopy} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
