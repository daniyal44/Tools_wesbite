'use client';

import React, { useState } from 'react';
import { copyToClipboard } from '@/lib/utils';
import { Check, Copy, Info } from 'lucide-react';

const SIZES = [
  { name: 'Bit', symbol: 'bit', type: 'base' },
  { name: 'Byte', symbol: 'B', type: 'base' },
  { name: 'Kilobyte', symbol: 'KB', type: 'decimal' },
  { name: 'Megabyte', symbol: 'MB', type: 'decimal' },
  { name: 'Gigabyte', symbol: 'GB', type: 'decimal' },
  { name: 'Terabyte', symbol: 'TB', type: 'decimal' },
  { name: 'Petabyte', symbol: 'PB', type: 'decimal' },
  { name: 'Kibibyte', symbol: 'KiB', type: 'binary' },
  { name: 'Mebibyte', symbol: 'MiB', type: 'binary' },
  { name: 'Gibibyte', symbol: 'GiB', type: 'binary' },
  { name: 'Tebibyte', symbol: 'TiB', type: 'binary' },
  { name: 'Pebibyte', symbol: 'PiB', type: 'binary' },
];

export default function DataSizeConverter() {
  const [value, setValue] = useState('1');
  const [fromUnit, setFromUnit] = useState('GB');
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  // Base is Bytes.
  const getBytes = (val: number, unit: string) => {
    switch (unit) {
      case 'bit': return val / 8;
      case 'B': return val;
      // Decimal
      case 'KB': return val * 1e3;
      case 'MB': return val * 1e6;
      case 'GB': return val * 1e9;
      case 'TB': return val * 1e12;
      case 'PB': return val * 1e15;
      // Binary
      case 'KiB': return val * 1024;
      case 'MiB': return val * 1024 ** 2;
      case 'GiB': return val * 1024 ** 3;
      case 'TiB': return val * 1024 ** 4;
      case 'PiB': return val * 1024 ** 5;
      default: return val;
    }
  };

  const getFromBytes = (bytes: number, unit: string) => {
    switch (unit) {
      case 'bit': return bytes * 8;
      case 'B': return bytes;
      // Decimal
      case 'KB': return bytes / 1e3;
      case 'MB': return bytes / 1e6;
      case 'GB': return bytes / 1e9;
      case 'TB': return bytes / 1e12;
      case 'PB': return bytes / 1e15;
      // Binary
      case 'KiB': return bytes / 1024;
      case 'MiB': return bytes / (1024 ** 2);
      case 'GiB': return bytes / (1024 ** 3);
      case 'TiB': return bytes / (1024 ** 4);
      case 'PiB': return bytes / (1024 ** 5);
      default: return bytes;
    }
  };

  const numValue = parseFloat(value);
  const bytes = isNaN(numValue) ? 0 : getBytes(numValue, fromUnit);

  const handleCopy = async (text: string, id: string) => {
    await copyToClipboard(text);
    setCopiedStates({ ...copiedStates, [id]: true });
    setTimeout(() => {
      setCopiedStates(prev => ({ ...prev, [id]: false }));
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
        <Info className="w-4 h-4" />
        Processed locally in your browser
      </div>

      <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col md:flex-row gap-4 items-end">
        <div className="w-full space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Amount</label>
          <input type="number" value={value} onChange={e => setValue(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700" placeholder="0" />
        </div>
        <div className="w-full space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">From Unit</label>
          <select value={fromUnit} onChange={e => setFromUnit(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700">
            {SIZES.map(s => <option key={s.symbol} value={s.symbol}>{s.name} ({s.symbol})</option>)}
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Decimal (SI Standard)</h3>
          <p className="text-xs text-gray-500 mb-3">Base 10: 1 KB = 1000 Bytes (Used by storage manufacturers)</p>
          <div className="space-y-2">
            {SIZES.filter(s => s.type === 'base' || s.type === 'decimal').map(s => {
              const res = getFromBytes(bytes, s.symbol);
              const displayRes = res < 0.0001 || res > 1e15 ? res.toExponential(4) : Number.isInteger(res) ? res : res.toPrecision(7).replace(/\.?0+$/, '');
              return (
                <div key={s.symbol} className="flex justify-between items-center p-3 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
                  <div className="flex gap-2 items-center">
                    <span className="font-medium w-10 text-gray-500">{s.symbol}</span>
                    <span className="text-gray-900 dark:text-gray-100">{displayRes}</span>
                  </div>
                  <button onClick={() => handleCopy(String(res), s.symbol)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    {copiedStates[s.symbol] ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">Binary (IEC Standard)</h3>
          <p className="text-xs text-gray-500 mb-3">Base 2: 1 KiB = 1024 Bytes (Used by operating systems)</p>
          <div className="space-y-2">
            {SIZES.filter(s => s.type === 'binary').map(s => {
              const res = getFromBytes(bytes, s.symbol);
              const displayRes = res < 0.0001 || res > 1e15 ? res.toExponential(4) : Number.isInteger(res) ? res : res.toPrecision(7).replace(/\.?0+$/, '');
              return (
                <div key={s.symbol} className="flex justify-between items-center p-3 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-lg hover:border-gray-300 dark:hover:border-gray-600 transition-colors">
                  <div className="flex gap-2 items-center">
                    <span className="font-medium w-10 text-gray-500">{s.symbol}</span>
                    <span className="text-gray-900 dark:text-gray-100">{displayRes}</span>
                  </div>
                  <button onClick={() => handleCopy(String(res), s.symbol)} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    {copiedStates[s.symbol] ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
