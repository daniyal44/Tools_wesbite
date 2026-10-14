'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  ArrowRight, 
  Trash2, 
  ShieldCheck, 
  Plus 
} from 'lucide-react';
import { formatBytes } from '@/lib/utils';

export default function BulkRename() {
  const [files, setFiles] = useState<File[]>([]);
  const [prefix, setPrefix] = useState<string>('');
  const [suffix, setSuffix] = useState<string>('');
  const [findText, setFindText] = useState<string>('');
  const [replaceText, setReplaceText] = useState<string>('');
  const [caseMode, setCaseMode] = useState<'original' | 'lower' | 'upper' | 'capitalize'>('original');
  const [addNumbering, setAddNumbering] = useState<boolean>(false);
  const [startNumber, setStartNumber] = useState<number>(1);
  const [zeroPad, setZeroPad] = useState<number>(3);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;
    setFiles((prev) => [...prev, ...Array.from(fileList)]);
  };

  const removeFile = (idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const clearAll = () => {
    setFiles([]);
  };

  const computeNewName = (file: File, index: number): string => {
    const lastDotIndex = file.name.lastIndexOf('.');
    let base = lastDotIndex !== -1 ? file.name.substring(0, lastDotIndex) : file.name;
    const ext = lastDotIndex !== -1 ? file.name.substring(lastDotIndex) : '';

    if (findText) {
      base = base.split(findText).join(replaceText);
    }

    if (caseMode === 'lower') base = base.toLowerCase();
    if (caseMode === 'upper') base = base.toUpperCase();
    if (caseMode === 'capitalize') {
      base = base.charAt(0).toUpperCase() + base.slice(1);
    }

    let numStr = '';
    if (addNumbering) {
      const num = startNumber + index;
      numStr = `_${num.toString().padStart(zeroPad, '0')}`;
    }

    return `${prefix}${base}${suffix}${numStr}${ext}`;
  };

  const downloadRenamedFile = (file: File, index: number) => {
    const newName = computeNewName(file, index);
    const blob = file.slice(0, file.size, file.type);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = newName;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadAll = () => {
    files.forEach((file, index) => {
      setTimeout(() => {
        downloadRenamedFile(file, index);
      }, index * 100);
    });
  };

  return (
    <div className="space-y-8">
      {/* Upload Zone */}
      <div className="p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-4 rounded-2xl bg-amber-500/10 text-amber-400">
            <FileText className="w-8 h-8" />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Bulk File Renamer (Ezgif Bulk Renamer)</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Rename dozens or hundreds of files with custom prefixes, suffixes, numbering, and find-and-replace rules.
          </p>
        </div>

        <label className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-sm font-bold cursor-pointer transition-colors shadow-lg shadow-amber-500/20">
          <Plus className="w-4 h-4" />
          Select Files to Rename
          <input type="file" multiple onChange={handleFileChange} className="hidden" />
        </label>
      </div>

      {files.length > 0 && (
        <div className="space-y-6">
          {/* Rules Configuration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">Prefix</label>
              <input
                type="text"
                placeholder="e.g. photo_"
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">Suffix</label>
              <input
                type="text"
                placeholder="e.g. _v1"
                value={suffix}
                onChange={(e) => setSuffix(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">Find Text</label>
              <input
                type="text"
                placeholder="Text to replace"
                value={findText}
                onChange={(e) => setFindText(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">Replace With</label>
              <input
                type="text"
                placeholder="Replacement"
                value={replaceText}
                onChange={(e) => setReplaceText(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 items-end">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">Letter Case</label>
              <div className="flex gap-2">
                {[
                  { label: 'Original', val: 'original' as const },
                  { label: 'lower', val: 'lower' as const },
                  { label: 'UPPER', val: 'upper' as const },
                ].map((c) => (
                  <button
                    key={c.val}
                    type="button"
                    onClick={() => setCaseMode(c.val)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      caseMode === c.val ? 'bg-amber-500 text-black' : 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
                Sequential Numbering
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setAddNumbering(!addNumbering)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                    addNumbering ? 'bg-amber-500 text-black' : 'bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 hover:bg-white/20'
                  }`}
                >
                  {addNumbering ? 'Enabled (001)' : 'Disabled'}
                </button>
                {addNumbering && (
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      min="1"
                      value={startNumber}
                      onChange={(e) => setStartNumber(parseInt(e.target.value) || 1)}
                      className="w-16 text-xs px-2 py-1.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                      title="Start from number"
                    />
                    <select
                      value={zeroPad}
                      onChange={(e) => setZeroPad(parseInt(e.target.value) || 3)}
                      className="text-xs px-2 py-1.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
                      title="Padding digits"
                    >
                      <option value="1">1, 2, 3</option>
                      <option value="2">01, 02, 03</option>
                      <option value="3">001, 002</option>
                      <option value="4">0001, 0002</option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={clearAll}
                className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-white/20 text-xs text-gray-600 dark:text-gray-300 font-semibold"
              >
                Clear All ({files.length})
              </button>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              100% In-browser file renaming · No cloud transfer
            </div>

            <button
              type="button"
              onClick={downloadAll}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              Download All Renamed Files ({files.length})
            </button>
          </div>

          {/* Preview Table */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Rename Preview Table ({files.length} files)
            </h4>
            <div className="space-y-2">
              {files.map((f, idx) => {
                const newName = computeNewName(f, idx);
                return (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="min-w-0 flex-1 flex items-center gap-3">
                      <span className="text-gray-500 dark:text-gray-400 truncate max-w-xs">{f.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500 flex-shrink-0" />
                      <span className="text-emerald-400 font-bold truncate max-w-xs">{newName}</span>
                      <span className="text-gray-400 dark:text-gray-500 text-[11px] hidden sm:inline">({formatBytes(f.size)})</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => downloadRenamedFile(f, idx)}
                        className="px-2.5 py-1.5 rounded-lg bg-gray-100 dark:bg-white/10 hover:bg-white/20 text-gray-900 dark:text-white text-xs font-semibold flex items-center gap-1 transition-colors"
                      >
                        <Download className="w-3 h-3" /> Save
                      </button>
                      <button
                        type="button"
                        onClick={() => removeFile(idx)}
                        className="p-1 rounded text-gray-400 dark:text-gray-500 hover:text-red-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
