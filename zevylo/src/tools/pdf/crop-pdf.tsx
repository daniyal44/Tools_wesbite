'use client';

import React, { useState } from 'react';
import { 
  Crop, 
  Upload, 
  Download, 
  CheckCircle, 
  ShieldCheck, 
  Sparkles 
} from 'lucide-react';
import { formatBytes } from '@/lib/utils';
import { PDFDocument } from 'pdf-lib';

export default function CropPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [trimMargin, setTrimMargin] = useState<number>(36); // in points (36 pt = 0.5 in)
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f && (f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf'))) {
      setFile(f);
      setSuccess(false);
    }
  };

  const cropAndDownload = async () => {
    if (!file) return;
    setIsProcessing(true);

    try {
      const buffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const m = trimMargin;

      // Inset the crop box by the chosen margin on every side, relative to each
      // page's own media box, clamped so the box never collapses.
      for (const page of pdfDoc.getPages()) {
        const { x, y, width, height } = page.getMediaBox();
        const nw = Math.max(1, width - m * 2);
        const nh = Math.max(1, height - m * 2);
        page.setCropBox(x + m, y + m, nw, nh);
      }

      const bytes = await pdfDoc.save();
      const blob = new Blob([bytes as BlobPart], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${file.name.replace(/\.pdf$/i, '')}_cropped.pdf`;
      link.click();
      URL.revokeObjectURL(url);
      setSuccess(true);
    } catch {
      alert('Error cropping PDF. Please ensure the file is a valid, unencrypted PDF document.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Upload Zone */}
      <div className="p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-4 rounded-2xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
            <Crop className="w-8 h-8" />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Crop PDF Online (Ezgif PDF Cropper)</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Trim page margins, remove extra blank white borders, or specify custom crop boxes.
          </p>
        </div>

        <label className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-500 hover:bg-red-400 text-white text-sm font-bold cursor-pointer transition-colors shadow-md">
          <Upload className="w-4 h-4" />
          Select PDF File
          <input type="file" accept="application/pdf,.pdf" onChange={handleFileChange} className="hidden" />
        </label>

        {file && (
          <div className="text-xs text-gray-600 dark:text-gray-300 font-mono">
            {file.name} ({formatBytes(file.size)})
          </div>
        )}
      </div>

      {file && (
        <div className="space-y-6">
          {/* Margins Bar */}
          <div className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-3">
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span className="font-semibold uppercase tracking-wider">Trim Margin Width:</span>
              <span className="text-gray-900 dark:text-white font-bold">{trimMargin} pt (~{(trimMargin / 72).toFixed(2)} inches)</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { label: 'Light (18 pt)', val: 18 },
                { label: 'Standard (36 pt)', val: 36 },
                { label: 'Moderate (54 pt)', val: 54 },
                { label: 'Heavy (72 pt)', val: 72 },
              ].map((m) => (
                <button
                  key={m.val}
                  type="button"
                  onClick={() => {
                    setTrimMargin(m.val);
                    setSuccess(false);
                  }}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold transition-colors ${
                    trimMargin === m.val ? 'bg-red-500 text-white' : 'bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-white/20'
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              100% In-browser PDF CropBox adjustment · Zero server uploads
            </div>

            <button
              type="button"
              onClick={cropAndDownload}
              disabled={isProcessing}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-red-500 hover:bg-red-400 disabled:opacity-50 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors"
            >
              {isProcessing ? (
                'Cropping...'
              ) : success ? (
                <>
                  <CheckCircle className="w-4 h-4 text-white" />
                  PDF Cropped & Downloaded!
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <Download className="w-4 h-4" />
                  Crop & Download PDF
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
