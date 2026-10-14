'use client';

import React, { useState, useRef } from 'react';
import { Plus, Trash2, Download, ShieldCheck, ArrowUpDown, FileCheck, Layers } from 'lucide-react';
import { PDFDocument } from 'pdf-lib';
import { formatBytes } from '@/lib/utils';

interface PdfFileItem {
  id: string;
  file: File;
  name: string;
  size: number;
  lastModified: number;
}

export default function PdfMergeSplit() {
  const [files, setFiles] = useState<PdfFileItem[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (newFiles: FileList | File[]) => {
    const validPdfs: PdfFileItem[] = [];
    for (let i = 0; i < newFiles.length; i++) {
      const f = newFiles[i];
      if (f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf')) {
        validPdfs.push({
          id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
          file: f,
          name: f.name,
          size: f.size,
          lastModified: f.lastModified,
        });
      }
    }

    if (validPdfs.length === 0) {
      alert('Please upload valid PDF documents.');
      return;
    }

    setFiles((prev) => [...prev, ...validPdfs]);
  };

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const moveUp = (index: number) => {
    if (index <= 0) return;
    setFiles((prev) => {
      const copy = [...prev];
      const temp = copy[index - 1];
      copy[index - 1] = copy[index];
      copy[index] = temp;
      return copy;
    });
  };

  const moveDown = (index: number) => {
    if (index >= files.length - 1) return;
    setFiles((prev) => {
      const copy = [...prev];
      const temp = copy[index + 1];
      copy[index + 1] = copy[index];
      copy[index] = temp;
      return copy;
    });
  };

  const handleMergeAndDownload = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);

    try {
      // Properly merge documents: copy every page of each source into one new PDF.
      const merged = await PDFDocument.create();
      for (const item of files) {
        const buf = await item.file.arrayBuffer();
        const src = await PDFDocument.load(buf, { ignoreEncryption: true });
        const copied = await merged.copyPages(src, src.getPageIndices());
        copied.forEach((p) => merged.addPage(p));
      }

      const bytes = await merged.save();
      const mergedBlob = new Blob([bytes as BlobPart], { type: 'application/pdf' });
      const url = URL.createObjectURL(mergedBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `zevylo-merged-${Date.now()}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch {
      alert('Could not merge these PDFs. One or more files may be encrypted or corrupted.');
    } finally {
      setIsProcessing(false);
    }
  };

  const totalBytes = files.reduce((sum, f) => sum + f.size, 0);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Upload Banner */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);
          if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
        }}
        onClick={() => fileInputRef.current?.click()}
        className={`cursor-pointer rounded-3xl border-2 border-dashed p-10 text-center transition-all ${
          dragActive
            ? 'border-red-500 bg-red-50/50 dark:bg-red-950/20'
            : 'border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-red-400'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          multiple
          className="hidden"
          onChange={(e) => {
            if (e.target.files) handleFiles(e.target.files);
          }}
        />
        <div className="max-w-md mx-auto space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto">
            <Layers className="w-7 h-7" />
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900 dark:text-gray-100">
              Select or Drag & Drop PDF Files
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Select multiple PDF files to arrange, merge, and download as one document.
            </p>
          </div>
          <button className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold text-xs shadow-sm transition-colors">
            Choose PDF Documents
          </button>
        </div>
      </div>

      {/* PDF Document List */}
      {files.length > 0 && (
        <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
            <div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-red-600" />
                <span>Documents Queue ({files.length})</span>
              </h3>
              <p className="text-xs text-gray-400">Total Size: {formatBytes(totalBytes)}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setFiles([])}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
              >
                Clear All
              </button>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-semibold border border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950/20"
              >
                <Plus className="w-4 h-4" />
                <span>Add More</span>
              </button>
              <button
                onClick={handleMergeAndDownload}
                disabled={isProcessing}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold bg-red-600 hover:bg-red-700 text-white shadow-sm transition-colors disabled:opacity-50"
              >
                <Download className="w-4 h-4" />
                <span>Merge & Download PDF</span>
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {files.map((item, index) => (
              <div
                key={item.id}
                className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/40 p-4 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <span className="w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 text-xs font-bold flex items-center justify-center shrink-0">
                    {index + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="font-bold text-sm text-gray-900 dark:text-gray-100 truncate">{item.name}</p>
                    <p className="text-xs text-gray-400 font-mono">{formatBytes(item.size)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => moveUp(index)}
                    disabled={index === 0}
                    className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 text-gray-600 dark:text-gray-400"
                    title="Move Up"
                  >
                    <ArrowUpDown className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => moveDown(index)}
                    disabled={index === files.length - 1}
                    className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30 text-gray-600 dark:text-gray-400"
                    title="Move Down"
                  >
                    <ArrowUpDown className="w-4 h-4 rotate-180" />
                  </button>
                  <button
                    onClick={() => removeFile(item.id)}
                    className="p-1.5 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900/50 dark:hover:bg-red-950/20"
                    title="Remove File"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Privacy Guarantee */}
      <div className="rounded-2xl border border-green-200 dark:border-green-900/50 bg-green-50/60 dark:bg-green-950/20 p-5 flex items-center gap-3.5 text-sm text-green-800 dark:text-green-300">
        <ShieldCheck className="w-6 h-6 shrink-0" />
        <span>
          <strong>Zero Server Storage:</strong> Your confidential PDF documents are merged directly in your browser memory. Unlike online PDF services that store files on remote servers, your files never leave your computer.
        </span>
      </div>
    </div>
  );
}
