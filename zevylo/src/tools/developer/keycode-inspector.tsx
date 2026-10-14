'use client';

import React, { useState, useEffect } from 'react';
import { Keyboard, Copy, Check } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

interface KeyInfo {
  key: string;
  code: string;
  keyCode: number;
  which: number;
  location: number;
  shiftKey: boolean;
  ctrlKey: boolean;
  altKey: boolean;
  metaKey: boolean;
}

export default function KeycodeInspector() {
  const [keyInfo, setKeyInfo] = useState<KeyInfo>({
    key: 'Enter',
    code: 'Enter',
    keyCode: 13,
    which: 13,
    location: 0,
    shiftKey: false,
    ctrlKey: false,
    altKey: false,
    metaKey: false,
  });
  const [copiedField, setCopiedField] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default only for tab or backspace if wanted, but keep it responsive
      setKeyInfo({
        key: e.key,
        code: e.code,
        keyCode: e.keyCode,
        which: e.which,
        location: e.location,
        shiftKey: e.shiftKey,
        ctrlKey: e.ctrlKey,
        altKey: e.altKey,
        metaKey: e.metaKey,
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const copyVal = async (field: string, val: string) => {
    await copyToClipboard(val);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 1500);
  };

  const LOCATIONS: Record<number, string> = {
    0: 'Standard (0)',
    1: 'Left (1)',
    2: 'Right (2)',
    3: 'Numpad (3)',
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Big Press Indicator Card */}
      <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-gradient-to-b from-blue-50/50 to-indigo-50/30 dark:from-blue-950/20 dark:to-indigo-950/10 p-10 text-center space-y-4 shadow-sm">
        <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-extrabold text-blue-600 dark:text-blue-400">
          <Keyboard className="w-4 h-4 animate-pulse" />
          Press any key on your keyboard
        </div>

        <div className="inline-block px-10 py-6 rounded-3xl bg-white dark:bg-gray-900 border border-blue-200 dark:border-blue-900/60 shadow-xl">
          <span className="text-6xl sm:text-7xl font-black text-gray-900 dark:text-gray-100 font-mono">
            {keyInfo.keyCode}
          </span>
          <span className="text-xs font-bold uppercase tracking-widest text-gray-400 block mt-2">
            Legacy JavaScript KeyCode
          </span>
        </div>
      </div>

      {/* Grid of Key Properties */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'event.key', val: keyInfo.key, desc: 'Value of pressed key' },
          { label: 'event.code', val: keyInfo.code, desc: 'Physical key position' },
          { label: 'event.which', val: String(keyInfo.which), desc: 'Legacy ASCII / code' },
          { label: 'event.location', val: LOCATIONS[keyInfo.location] || '0', desc: 'Key position' },
        ].map((item) => (
          <div
            key={item.label}
            onClick={() => copyVal(item.label, item.val)}
            className="cursor-pointer group rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-2 hover:border-blue-500 transition-all shadow-sm"
          >
            <div className="flex justify-between items-center text-xs font-bold text-gray-400">
              <span className="font-mono">{item.label}</span>
              <span className="opacity-0 group-hover:opacity-100 text-blue-600 transition-opacity">
                {copiedField === item.label ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
              </span>
            </div>
            <div className="text-xl font-black font-mono text-gray-900 dark:text-gray-100 truncate">
              {item.val}
            </div>
            <p className="text-xs text-gray-400">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Modifier Flags */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-3">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-gray-500">
          Modifier Keys State
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs font-bold">
          <div className={`p-3 rounded-xl border text-center transition-all ${keyInfo.shiftKey ? 'border-green-500 bg-green-50 dark:bg-green-950/40 text-green-600' : 'border-gray-100 dark:border-gray-800 text-gray-400'}`}>
            Shift: {keyInfo.shiftKey ? 'TRUE' : 'FALSE'}
          </div>
          <div className={`p-3 rounded-xl border text-center transition-all ${keyInfo.ctrlKey ? 'border-green-500 bg-green-50 dark:bg-green-950/40 text-green-600' : 'border-gray-100 dark:border-gray-800 text-gray-400'}`}>
            Ctrl: {keyInfo.ctrlKey ? 'TRUE' : 'FALSE'}
          </div>
          <div className={`p-3 rounded-xl border text-center transition-all ${keyInfo.altKey ? 'border-green-500 bg-green-50 dark:bg-green-950/40 text-green-600' : 'border-gray-100 dark:border-gray-800 text-gray-400'}`}>
            Alt / Option: {keyInfo.altKey ? 'TRUE' : 'FALSE'}
          </div>
          <div className={`p-3 rounded-xl border text-center transition-all ${keyInfo.metaKey ? 'border-green-500 bg-green-50 dark:bg-green-950/40 text-green-600' : 'border-gray-100 dark:border-gray-800 text-gray-400'}`}>
            Meta / Cmd: {keyInfo.metaKey ? 'TRUE' : 'FALSE'}
          </div>
        </div>
      </div>
    </div>
  );
}
