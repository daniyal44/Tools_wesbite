'use client';
/* eslint-disable @next/next/no-img-element */

import React, { useState } from 'react';
import { 
  Code, 
  Copy, 
  Check, 
  FileCode, 
  Download, 
  RotateCcw, 
  Layers, 
  ArrowRight,
  ShieldCheck,
  Plus
} from 'lucide-react';
import { formatBytes } from '@/lib/utils';

export default function ImageToDataUri() {
  const [file, setFile] = useState<File | null>(null);
  const [dataUri, setDataUri] = useState<string | null>(null);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = () => {
      setDataUri(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => {
      setCopiedType(null);
    }, 2000);
  };

  const downloadText = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const rawBase64 = dataUri ? dataUri.split(',')[1] || '' : '';
  const htmlTag = dataUri ? `<img src="${dataUri}" alt="${file?.name || 'image'}" />` : '';
  const cssBackground = dataUri ? `background-image: url('${dataUri}');` : '';

  return (
    <div className="space-y-8">
      {/* Upload Zone */}
      <div className="p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-4 rounded-2xl bg-cyan-500/10 text-cyan-400">
            <Code className="w-8 h-8" />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Image to Data URI & Base64 Converter</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Convert images into base64 Data URIs to embed directly in HTML documents, CSS stylesheets, or emails.
          </p>
        </div>

        <label className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black text-sm font-bold cursor-pointer transition-colors shadow-lg shadow-cyan-500/20">
          <Plus className="w-4 h-4" />
          Select Image File
          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        </label>
      </div>

      {dataUri && (
        <div className="space-y-6">
          {/* Header Stats */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex-shrink-0 flex items-center justify-center border border-gray-200 dark:border-gray-800">
                <img
                  src={dataUri}
                  alt="Preview"
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <div>
                <h4 className="font-semibold text-sm text-gray-900 dark:text-white truncate max-w-xs">{file?.name}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Original: {file ? formatBytes(file.size) : 0} · Base64 Size: {formatBytes(dataUri.length)}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setFile(null);
                setDataUri(null);
              }}
              className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-white/10 hover:bg-white/20 text-xs text-gray-600 dark:text-gray-300 flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Convert Another
            </button>
          </div>

          {/* Formats Grid */}
          <div className="space-y-4">
            {/* 1. Full Data URI */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-gray-900 dark:text-white flex items-center gap-1.5">
                  <Code className="w-3.5 h-3.5 text-cyan-400" /> Full Data URI
                </span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(dataUri, 'datauri')}
                  className="text-cyan-400 hover:underline flex items-center gap-1 text-xs"
                >
                  {copiedType === 'datauri' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedType === 'datauri' ? 'Copied URI!' : 'Copy URI'}
                </button>
              </div>
              <textarea
                readOnly
                value={dataUri}
                rows={3}
                className="w-full text-xs font-mono p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 focus:outline-none select-all"
              />
            </div>

            {/* 2. HTML Tag */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-gray-900 dark:text-white flex items-center gap-1.5">
                  <FileCode className="w-3.5 h-3.5 text-orange-400" /> HTML &lt;img&gt; Tag
                </span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(htmlTag, 'html')}
                  className="text-orange-400 hover:underline flex items-center gap-1 text-xs"
                >
                  {copiedType === 'html' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedType === 'html' ? 'Copied HTML!' : 'Copy HTML'}
                </button>
              </div>
              <textarea
                readOnly
                value={htmlTag}
                rows={2}
                className="w-full text-xs font-mono p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 focus:outline-none select-all"
              />
            </div>

            {/* 3. CSS Background */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-gray-900 dark:text-white flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-blue-400" /> CSS background-image
                </span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(cssBackground, 'css')}
                  className="text-blue-400 hover:underline flex items-center gap-1 text-xs"
                >
                  {copiedType === 'css' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedType === 'css' ? 'Copied CSS!' : 'Copy CSS'}
                </button>
              </div>
              <textarea
                readOnly
                value={cssBackground}
                rows={2}
                className="w-full text-xs font-mono p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 focus:outline-none select-all"
              />
            </div>

            {/* 4. Raw Base64 */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-gray-900 dark:text-white flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-400" /> Raw Base64 (Without MIME header)
                </span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(rawBase64, 'raw')}
                  className="text-emerald-400 hover:underline flex items-center gap-1 text-xs"
                >
                  {copiedType === 'raw' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedType === 'raw' ? 'Copied Base64!' : 'Copy Base64'}
                </button>
              </div>
              <textarea
                readOnly
                value={rawBase64}
                rows={2}
                className="w-full text-xs font-mono p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 focus:outline-none select-all"
              />
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              100% In-browser conversion · No network upload
            </div>

            <button
              type="button"
              onClick={() => downloadText(dataUri, `${file?.name || 'image'}-datauri.txt`)}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-sm flex items-center justify-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4" /> Download as Text (.txt)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
