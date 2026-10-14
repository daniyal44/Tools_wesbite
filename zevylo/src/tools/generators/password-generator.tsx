'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { copyToClipboard } from '@/lib/utils';

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [count, setCount] = useState(1);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    excludeAmbiguous: false
  });
  const [passwords, setPasswords] = useState<string[]>([]);
  const [entropy, setEntropy] = useState(0);

  const generatePasswords = useCallback(() => {
    let charset = '';
    if (options.uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (options.lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (options.numbers) charset += '0123456789';
    if (options.symbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    
    if (options.excludeAmbiguous) {
      charset = charset.replace(/[0OIl1]/g, '');
    }

    if (!charset) {
      setPasswords([]);
      setEntropy(0);
      return;
    }

    const newPasswords: string[] = [];
    const charsetLength = charset.length;
    
    // Calculate entropy: E = L * log2(R)
    const currentEntropy = length * Math.log2(charsetLength);
    setEntropy(currentEntropy);

    for (let i = 0; i < count; i++) {
      let password = '';
      const array = new Uint32Array(length);
      window.crypto.getRandomValues(array);
      
      for (let j = 0; j < length; j++) {
        password += charset[array[j] % charsetLength];
      }
      newPasswords.push(password);
    }
    setPasswords(newPasswords);
  }, [length, options, count]);

  useEffect(() => {
    const timer = setTimeout(() => {
      generatePasswords();
    }, 0);
    return () => clearTimeout(timer);
  }, [generatePasswords]);

  const getStrengthLabel = () => {
    if (entropy < 40) return { label: 'Weak', color: 'text-red-500' };
    if (entropy < 60) return { label: 'Fair', color: 'text-yellow-500' };
    if (entropy < 80) return { label: 'Good', color: 'text-blue-500' };
    return { label: 'Strong', color: 'text-green-500' };
  };

  const strength = getStrengthLabel();

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-6 rounded-xl border p-4 bg-white dark:bg-gray-900">
        <h2 className="text-xl font-bold">Settings</h2>
        
        <div>
          <div className="flex justify-between mb-2">
            <label className="text-sm font-medium">Password Length</label>
            <span className="font-bold">{length}</span>
          </div>
          <input type="range" min="4" max="128" value={length} onChange={e => setLength(parseInt(e.target.value))} className="w-full" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Number of Passwords</label>
          <input type="number" min="1" max="50" value={count} onChange={e => setCount(Math.max(1, Math.min(50, parseInt(e.target.value) || 1)))} className="w-full border p-2 rounded dark:bg-gray-800" />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={options.uppercase} onChange={e => setOptions({...options, uppercase: e.target.checked})} />
            Uppercase (A-Z)
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={options.lowercase} onChange={e => setOptions({...options, lowercase: e.target.checked})} />
            Lowercase (a-z)
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={options.numbers} onChange={e => setOptions({...options, numbers: e.target.checked})} />
            Numbers (0-9)
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={options.symbols} onChange={e => setOptions({...options, symbols: e.target.checked})} />
            Symbols (!@#$...)
          </label>
          <label className="flex items-center gap-2 mt-4 pt-2 border-t">
            <input type="checkbox" checked={options.excludeAmbiguous} onChange={e => setOptions({...options, excludeAmbiguous: e.target.checked})} />
            Exclude Ambiguous Characters (i, l, 1, L, o, 0, O)
          </label>
        </div>
        
        <button onClick={generatePasswords} className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Regenerate</button>
      </div>
      
      <div className="space-y-4">
        <div className="rounded-xl border p-4 bg-gray-50 dark:bg-gray-800">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Generated Passwords</h2>
            {passwords.length > 1 && (
              <button onClick={() => copyToClipboard(passwords.join('\n'))} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm hover:bg-gray-300 dark:hover:bg-gray-600">Copy All</button>
            )}
          </div>
          
          <div className="space-y-2 max-h-[400px] overflow-y-auto">
            {passwords.length > 0 ? passwords.map((pwd, idx) => (
              <div key={idx} className="flex justify-between items-center p-3 bg-white dark:bg-gray-900 border rounded font-mono text-sm break-all">
                <span>{pwd}</span>
                <button onClick={() => copyToClipboard(pwd)} className="ml-4 px-2 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 shrink-0">Copy</button>
              </div>
            )) : (
              <div className="text-gray-500">Select at least one character type.</div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Password Strength:</span>
              <span className={`font-bold ${strength.color}`}>{strength.label}</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">Entropy: ~{Math.round(entropy)} bits</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className={`h-2 rounded-full ${strength.color.replace('text-', 'bg-')}`} style={{ width: `${Math.min(100, (entropy / 100) * 100)}%` }}></div>
            </div>
          </div>
        </div>
        <div className="text-sm text-green-600 dark:text-green-400 font-medium text-center">
          Processed locally in your browser. No data is sent to our servers.
        </div>
      </div>
    </div>
  );
}
