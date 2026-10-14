'use client';

import React, { useState, useMemo, useRef } from 'react';
import { Subtitles, Copy, Check, Download, Upload, ArrowRightLeft } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

export default function SrtToVttConverter() {
  const [direction, setDirection] = useState<'srtToVtt' | 'vttToSrt'>('srtToVtt');
  const [input, setInput] = useState(`1
00:00:01,000 --> 00:00:04,500
Welcome to our introductory tutorial video.

2
00:00:05,000 --> 00:00:09,200
In this video, we explore modern client-side web development tools.`);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const converted = useMemo(() => {
    if (!input.trim()) return '';

    if (direction === 'srtToVtt') {
      // Convert SRT to VTT
      // 1. Replace commas in timestamps with periods
      const fixedTimestamps = input.replace(
        /(\d{2}:\d{2}:\d{2}),(\d{3})/g,
        '$1.$2'
      );
      // 2. Prepend WEBVTT header
      return `WEBVTT\n\n${fixedTimestamps.trim()}`;
    } else {
      // Convert VTT to SRT
      // 1. Remove WEBVTT header
      let cleaned = input.replace(/^WEBVTT[^\n]*\n+/i, '').trim();
      // 2. Replace periods in timestamps with commas
      cleaned = cleaned.replace(
        /(\d{2}:\d{2}:\d{2})\.(\d{3})/g,
        '$1,$2'
      );
      return cleaned;
    }
  }, [input, direction]);

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      if (text) {
        setInput(text);
        if (file.name.endsWith('.vtt')) {
          setDirection('vttToSrt');
        } else {
          setDirection('srtToVtt');
        }
      }
    };
    reader.readAsText(file);
  };

  const handleDownload = () => {
    const ext = direction === 'srtToVtt' ? 'vtt' : 'srt';
    const blob = new Blob([converted], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `subtitles.${ext}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = async () => {
    await copyToClipboard(converted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Direction & File Upload Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
          <button
            onClick={() => setDirection('srtToVtt')}
            className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
              direction === 'srtToVtt'
                ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            SRT → WebVTT (.vtt)
          </button>
          <button
            onClick={() => setDirection('vttToSrt')}
            className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
              direction === 'vttToSrt'
                ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            WebVTT → SRT (.srt)
          </button>
        </div>

        <div className="flex items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept=".srt,.vtt,.txt"
            className="hidden"
            onChange={(e) => {
              if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
            }}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-50 text-xs font-bold text-gray-700 dark:text-gray-300"
          >
            <Upload className="w-3.5 h-3.5" />
            Upload File
          </button>
          <button
            onClick={() => {
              if (converted) setInput(converted);
              setDirection((prev) => (prev === 'srtToVtt' ? 'vttToSrt' : 'srtToVtt'));
            }}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-800 hover:bg-gray-50 text-xs font-bold text-gray-700 dark:text-gray-300"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            Swap
          </button>
        </div>
      </div>

      {/* Editor Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Input */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-3">
          <div className="flex justify-between items-center text-xs font-bold text-gray-500">
            <span>{direction === 'srtToVtt' ? 'Input SRT Subtitles' : 'Input WebVTT Subtitles'}</span>
            <span className="font-mono text-gray-400">{input.length} chars</span>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={12}
            className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 font-mono text-xs leading-relaxed"
            placeholder="Paste subtitles or drop file..."
          />
        </div>

        {/* Output */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-3">
          <div className="flex justify-between items-center text-xs font-bold text-gray-500">
            <span className="flex items-center gap-1.5 text-blue-600">
              <Subtitles className="w-4 h-4" />
              {direction === 'srtToVtt' ? 'WebVTT Output' : 'SRT Output'}
            </span>
            <div className="flex gap-2">
              <button
                onClick={handleDownload}
                className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 text-gray-600 dark:text-gray-300"
              >
                <Download className="w-3.5 h-3.5" />
                Download
              </button>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-300" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
          <textarea
            readOnly
            value={converted}
            rows={12}
            className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 font-mono text-xs text-blue-600 dark:text-blue-400 leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
}
