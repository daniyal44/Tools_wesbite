'use client';

import React, { useState, useMemo } from 'react';
import { Terminal, Copy, Check } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

export default function ChmodCalculator() {
  // Permissions state: [read, write, execute]
  const [owner, setOwner] = useState({ r: true, w: true, x: true }); // 7
  const [group, setGroup] = useState({ r: true, w: false, x: true }); // 5
  const [publicOthers, setPublicOthers] = useState({ r: true, w: false, x: true }); // 5
  const [filename, setFilename] = useState('script.sh');
  const [copied, setCopied] = useState(false);

  const calcOctal = (perm: { r: boolean; w: boolean; x: boolean }) => {
    let sum = 0;
    if (perm.r) sum += 4;
    if (perm.w) sum += 2;
    if (perm.x) sum += 1;
    return sum;
  };

  const calcSymbolic = (perm: { r: boolean; w: boolean; x: boolean }) => {
    return `${perm.r ? 'r' : '-'}${perm.w ? 'w' : '-'}${perm.x ? 'x' : '-'}`;
  };

  const results = useMemo(() => {
    const oVal = calcOctal(owner);
    const gVal = calcOctal(group);
    const pVal = calcOctal(publicOthers);
    const octal = `${oVal}${gVal}${pVal}`;
    const symbolic = `-${calcSymbolic(owner)}${calcSymbolic(group)}${calcSymbolic(publicOthers)}`;
    const command = `chmod ${octal} ${filename || 'filename'}`;

    return {
      octal,
      symbolic,
      command,
    };
  }, [owner, group, publicOthers, filename]);

  const applyPreset = (octalStr: string) => {
    const o = parseInt(octalStr[0], 10);
    const g = parseInt(octalStr[1], 10);
    const p = parseInt(octalStr[2], 10);

    setOwner({ r: (o & 4) !== 0, w: (o & 2) !== 0, x: (o & 1) !== 0 });
    setGroup({ r: (g & 4) !== 0, w: (g & 2) !== 0, x: (g & 1) !== 0 });
    setPublicOthers({ r: (p & 4) !== 0, w: (p & 2) !== 0, x: (p & 1) !== 0 });
  };

  const handleCopy = async () => {
    await copyToClipboard(results.command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Visual Command Output Banner */}
      <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-gray-900 text-white p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <span className="text-xs uppercase font-extrabold tracking-wider text-green-400 font-mono">
            Linux Shell Command
          </span>
          <div className="text-2xl sm:text-3xl font-mono font-bold text-gray-100">
            $ {results.command}
          </div>
          <div className="text-xs font-mono text-gray-400">
            Symbolic: {results.symbolic} • Numeric: {results.octal}
          </div>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all shrink-0"
        >
          {copied ? <Check className="w-4 h-4 text-green-300" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied' : 'Copy Command'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Permission Grid */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-6">
          <h2 className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Terminal className="w-5 h-5 text-blue-600" />
            Permission Matrix
          </h2>

          <div className="space-y-5">
            {/* Owner */}
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-gray-900 dark:text-gray-100">
                <span>Owner (User)</span>
                <span className="font-mono text-blue-600 font-bold">{calcOctal(owner)}</span>
              </div>
              <div className="flex gap-4 text-xs font-medium">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={owner.r}
                    onChange={(e) => setOwner({ ...owner, r: e.target.checked })}
                    className="w-4 h-4 rounded text-blue-600 accent-blue-600"
                  />
                  Read (4)
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={owner.w}
                    onChange={(e) => setOwner({ ...owner, w: e.target.checked })}
                    className="w-4 h-4 rounded text-blue-600 accent-blue-600"
                  />
                  Write (2)
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={owner.x}
                    onChange={(e) => setOwner({ ...owner, x: e.target.checked })}
                    className="w-4 h-4 rounded text-blue-600 accent-blue-600"
                  />
                  Execute (1)
                </label>
              </div>
            </div>

            {/* Group */}
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-gray-900 dark:text-gray-100">
                <span>Group</span>
                <span className="font-mono text-blue-600 font-bold">{calcOctal(group)}</span>
              </div>
              <div className="flex gap-4 text-xs font-medium">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={group.r}
                    onChange={(e) => setGroup({ ...group, r: e.target.checked })}
                    className="w-4 h-4 rounded text-blue-600 accent-blue-600"
                  />
                  Read (4)
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={group.w}
                    onChange={(e) => setGroup({ ...group, w: e.target.checked })}
                    className="w-4 h-4 rounded text-blue-600 accent-blue-600"
                  />
                  Write (2)
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={group.x}
                    onChange={(e) => setGroup({ ...group, x: e.target.checked })}
                    className="w-4 h-4 rounded text-blue-600 accent-blue-600"
                  />
                  Execute (1)
                </label>
              </div>
            </div>

            {/* Public */}
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-gray-900 dark:text-gray-100">
                <span>Public / Others</span>
                <span className="font-mono text-blue-600 font-bold">{calcOctal(publicOthers)}</span>
              </div>
              <div className="flex gap-4 text-xs font-medium">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={publicOthers.r}
                    onChange={(e) => setPublicOthers({ ...publicOthers, r: e.target.checked })}
                    className="w-4 h-4 rounded text-blue-600 accent-blue-600"
                  />
                  Read (4)
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={publicOthers.w}
                    onChange={(e) => setPublicOthers({ ...publicOthers, w: e.target.checked })}
                    className="w-4 h-4 rounded text-blue-600 accent-blue-600"
                  />
                  Write (2)
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={publicOthers.x}
                    onChange={(e) => setPublicOthers({ ...publicOthers, x: e.target.checked })}
                    className="w-4 h-4 rounded text-blue-600 accent-blue-600"
                  />
                  Execute (1)
                </label>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Target Filename
              </label>
              <input
                type="text"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs font-mono font-medium"
                placeholder="script.sh"
              />
            </div>
          </div>
        </div>

        {/* Presets & Reference */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-5">
          <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">
            Common Linux Presets
          </h2>

          <div className="space-y-3">
            {[
              { code: '755', name: 'Executables / Web Directories', desc: 'Owner has full control; others can read and execute.' },
              { code: '644', name: 'Standard Files (Read-Only to Others)', desc: 'Owner can read/write; others can only read.' },
              { code: '777', name: 'Full Read/Write/Execute to Everyone', desc: 'Dangerous: Anyone can modify or run the file.' },
              { code: '600', name: 'Private Sensitive File (.ssh keys)', desc: 'Only the owner has read and write permissions.' },
              { code: '700', name: 'Private Executable Directory', desc: 'Only the owner has full read, write, and execute permissions.' },
            ].map((p) => (
              <button
                key={p.code}
                onClick={() => applyPreset(p.code)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all ${
                  results.octal === p.code
                    ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/30'
                    : 'border-gray-200 dark:border-gray-800 hover:border-blue-400'
                }`}
              >
                <div className="flex justify-between items-center mb-0.5">
                  <span className="text-xs font-bold text-gray-900 dark:text-gray-100">{p.name}</span>
                  <span className="font-mono font-black text-xs text-blue-600 bg-blue-100 dark:bg-blue-900/40 px-2 py-0.5 rounded">
                    chmod {p.code}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">{p.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
