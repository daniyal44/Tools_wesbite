'use client';

import React, { useState } from 'react';
import { Upload, Download, FileText, CheckCircle2, ShieldCheck, Trash2, Edit3, AlertCircle } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import { formatBytes } from '@/lib/utils';

export default function PdfMetadataEditor() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [subject, setSubject] = useState('');
  const [keywords, setKeywords] = useState('');
  const [creator, setCreator] = useState('');
  const [producer, setProducer] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f && (f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf'))) {
      setFile(f);
      setError(null);
      setSuccess(false);

      try {
        const buffer = await f.arrayBuffer();
        const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });

        setTitle(doc.getTitle() || '');
        setAuthor(doc.getAuthor() || '');
        setSubject(doc.getSubject() || '');
        const kws = doc.getKeywords();
        setKeywords(Array.isArray(kws) ? kws.join(', ') : kws || '');
        setCreator(doc.getCreator() || '');
        setProducer(doc.getProducer() || '');
      } catch (err: any) {
        setError('Error reading PDF metadata: ' + (err.message || 'Corrupt or unsupported PDF'));
      }
    }
  };

  const handleClearAll = () => {
    setTitle('');
    setAuthor('');
    setSubject('');
    setKeywords('');
    setCreator('');
    setProducer('');
  };

  const handleSaveAndDownload = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError(null);

    try {
      const buffer = await file.arrayBuffer();
      const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });

      doc.setTitle(title.trim());
      doc.setAuthor(author.trim());
      doc.setSubject(subject.trim());
      const kwArray = keywords
        .split(',')
        .map((k) => k.trim())
        .filter(Boolean);
      doc.setKeywords(kwArray);
      doc.setCreator(creator.trim());
      doc.setProducer(producer.trim());
      doc.setModificationDate(new Date());

      const bytes = await doc.save();
      const blob = new Blob([bytes as BlobPart], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `updated-${file.name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setSuccess(true);
    } catch (err: any) {
      setError('Failed to update PDF: ' + (err.message || 'Unknown error'));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* File Upload */}
      <div className="rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 text-center transition-all hover:border-blue-500">
        <input
          type="file"
          id="metadata-pdf-upload"
          accept=".pdf,application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />
        <label htmlFor="metadata-pdf-upload" className="cursor-pointer space-y-3 block">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
            <Upload className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-bold text-base text-gray-900 dark:text-gray-100">
              {file ? file.name : 'Upload PDF Document to Inspect Metadata'}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              {file
                ? `${formatBytes(file.size)} • Metadata loaded below`
                : 'Drag and drop your PDF here to view and edit embedded document properties'}
            </p>
          </div>
        </label>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs text-red-600 dark:text-red-400 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {file && (
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-blue-500" />
              Embedded Document Properties
            </h3>
            <button
              type="button"
              onClick={handleClearAll}
              className="text-xs font-semibold text-red-600 hover:text-red-700 dark:text-red-400 flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Strip All Metadata</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
            <div>
              <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Document Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Annual Financial Report 2026"
                className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 px-4 py-2.5 font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Author / Creator Name</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. John Doe, Lead Analyst"
                className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 px-4 py-2.5 font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Subject / Summary</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Comprehensive corporate quarterly audit"
                className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 px-4 py-2.5 font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Keywords (Comma-separated)</label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="e.g. finance, audit, 2026, taxes, quarterly"
                className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 px-4 py-2.5 font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Software Creator</label>
              <input
                type="text"
                value={creator}
                onChange={(e) => setCreator(e.target.value)}
                placeholder="e.g. Microsoft Word, LaTeX, Zevylo"
                className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 px-4 py-2.5 font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">PDF Producer</label>
              <input
                type="text"
                value={producer}
                onChange={(e) => setProducer(e.target.value)}
                placeholder="e.g. Adobe Acrobat Distiller"
                className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 px-4 py-2.5 font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between flex-wrap gap-4">
            <span className="text-xs text-gray-500 flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              100% In-Browser Privacy • Client-side metadata rewrite
            </span>

            <button
              onClick={handleSaveAndDownload}
              disabled={isProcessing}
              className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-500 disabled:opacity-50 transition-colors flex items-center gap-2 shadow-lg shadow-blue-600/20"
            >
              <Download className="w-4 h-4" />
              <span>{isProcessing ? 'Saving...' : 'Save & Download Updated PDF'}</span>
            </button>
          </div>

          {success && (
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
              <span>Metadata updated successfully! Download started.</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
