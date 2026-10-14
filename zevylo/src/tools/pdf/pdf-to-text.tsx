'use client';

import React, { useState } from 'react';
import { Upload, FileText, Copy, Check, Download, Search, ShieldCheck } from 'lucide-react';
import { formatBytes } from '@/lib/utils';
import * as pdfjsLib from 'pdfjs-dist';

if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
}

export default function PdfToText() {
  const [file, setFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const extractTextFromBuffer = async (buffer: ArrayBuffer): Promise<string> => {
    const loadingTask = pdfjsLib.getDocument({ data: buffer });
    const pdf = await loadingTask.promise;
    const numPages = pdf.numPages;
    const textChunks: string[] = [];

    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      textChunks.push(pageText);
    }

    return textChunks.join('\n\n').replace(/(\s{2,}|\n\s*)/g, '\n\n').trim();
  };

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setIsProcessing(true);

    try {
      const buffer = await f.arrayBuffer();
      const text = await extractTextFromBuffer(buffer);
      setExtractedText(text || 'No readable text content found in this PDF (document may be a scanned image or encrypted).');
    } catch {
      setExtractedText('Failed to extract text from PDF document.');
    } finally {
      setIsProcessing(false);
    }
  };

  const wordCount = extractedText ? extractedText.trim().split(/\s+/).filter(Boolean).length : 0;
  const charCount = extractedText.length;

  const handleCopy = () => {
    navigator.clipboard.writeText(extractedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadTxt = () => {
    const blob = new Blob([extractedText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${file?.name.replace(/\.pdf$/i, '') || 'extracted_text'}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Upload Zone */}
      <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 text-center hover:border-red-500 transition-colors shadow-sm">
        <Upload className="h-10 w-10 text-red-500 mx-auto mb-3" />
        <h3 className="text-base font-bold text-gray-900 dark:text-white">
          {file ? file.name : 'Upload PDF Document to Extract Text'}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 mb-4">
          {file
            ? `Size: ${formatBytes(file.size)} | ${wordCount} words extracted`
            : 'Extract paragraphs and text without sending confidential data to any cloud server.'}
        </p>

        <label className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold cursor-pointer shadow-sm transition-all active:scale-95">
          <FileText className="h-4 w-4" /> {file ? 'Select Another PDF' : 'Choose PDF File'}
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFile}
            className="hidden"
          />
        </label>
      </div>

      {isProcessing && (
        <div className="p-8 text-center bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-red-600 border-t-transparent mx-auto mb-2" />
          <p className="text-xs text-gray-500">Extracting text streams client-side...</p>
        </div>
      )}

      {extractedText && !isProcessing && (
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span>Words: <strong className="text-gray-900 dark:text-white tabular-nums">{wordCount.toLocaleString()}</strong></span>
              <span>Characters: <strong className="text-gray-900 dark:text-white tabular-nums">{charCount.toLocaleString()}</strong></span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-xs font-semibold text-gray-700 dark:text-gray-300 transition-colors"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? 'Copied' : 'Copy Text'}
              </button>
              <button
                onClick={downloadTxt}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-sm transition-colors"
              >
                <Download className="h-3.5 w-3.5" /> Download .txt
              </button>
            </div>
          </div>

          {/* Quick Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Filter or search in extracted text..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 pl-9 pr-3 py-2 text-gray-900 dark:text-white outline-none focus:border-red-500"
            />
          </div>

          {/* Text Output Box */}
          <div className="w-full h-80 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4 text-xs font-mono text-gray-900 dark:text-white overflow-y-auto whitespace-pre-wrap select-all leading-relaxed">
            {searchQuery
              ? extractedText
                  .split('\n\n')
                  .filter(para => para.toLowerCase().includes(searchQuery.toLowerCase()))
                  .join('\n\n') || 'No matching paragraphs found.'
              : extractedText}
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-gray-400">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
            <span>Document processed in browser memory only. Never uploaded to external servers.</span>
          </div>
        </div>
      )}
    </div>
  );
}
