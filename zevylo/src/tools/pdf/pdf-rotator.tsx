'use client';

import React, { useState } from 'react';
import { RotateCw, Upload, Download, FileText, CheckCircle, Shield } from 'lucide-react';
import { PDFDocument, degrees } from 'pdf-lib';
import { formatBytes } from '@/lib/utils';

export default function PdfRotator() {
  const [file, setFile] = useState<File | null>(null);
  const [rotationAngle, setRotationAngle] = useState<number>(90);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f && (f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf'))) {
      setFile(f);
      setSuccess(false);
    }
  };

  const rotateAndDownload = async () => {
    if (!file) return;
    setIsProcessing(true);

    try {
      const buffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });

      // Add the chosen rotation on top of each page's existing rotation.
      for (const page of pdfDoc.getPages()) {
        const current = page.getRotation().angle;
        page.setRotation(degrees((current + rotationAngle) % 360));
      }

      const bytes = await pdfDoc.save();
      const blob = new Blob([bytes as BlobPart], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${file.name.replace(/\.pdf$/i, '')}_rotated_${rotationAngle}deg.pdf`;
      link.click();
      URL.revokeObjectURL(url);
      setSuccess(true);
    } catch {
      alert('Error rotating PDF. Please ensure the file is a valid, unencrypted PDF document.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Upload Box */}
      <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 text-center hover:border-red-500 transition-colors shadow-sm">
        <Upload className="h-10 w-10 text-red-500 mx-auto mb-3" />
        <h3 className="text-base font-bold text-gray-900 dark:text-white">
          {file ? file.name : 'Select PDF Document to Rotate'}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 mb-4">
          {file
            ? `File size: ${formatBytes(file.size)} | Ready to apply ${rotationAngle}° rotation`
            : 'Rotate all pages 90°, 180°, or 270°. Processed 100% in your browser for absolute privacy.'}
        </p>

        <label className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold cursor-pointer shadow-sm transition-all active:scale-95">
          <FileText className="h-4 w-4" /> {file ? 'Change PDF File' : 'Choose PDF File'}
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      {file && (
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm space-y-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">
              Choose Rotation Angle
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { angle: 90, label: '90° Clockwise', desc: 'Turn right' },
                { angle: 180, label: '180° Flip', desc: 'Upside down' },
                { angle: 270, label: '270° Counter-Clockwise', desc: 'Turn left' },
              ].map((opt) => (
                <button
                  key={opt.angle}
                  onClick={() => setRotationAngle(opt.angle)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    rotationAngle === opt.angle
                      ? 'border-red-600 bg-red-50/50 dark:bg-red-950/20 text-red-600 dark:text-red-400 font-bold'
                      : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <RotateCw className={`h-5 w-5 mb-2 ${rotationAngle === opt.angle ? 'text-red-600' : 'text-gray-400'}`} />
                  <div className="text-sm font-semibold">{opt.label}</div>
                  <div className="text-[11px] text-gray-400 mt-0.5">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Shield className="h-4 w-4 text-emerald-500" />
              <span>Zero server upload: instant client-side processing</span>
            </div>

            <button
              onClick={rotateAndDownload}
              disabled={isProcessing}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition-all active:scale-95 disabled:opacity-50"
            >
              <Download className="h-4 w-4" />
              {isProcessing ? 'Rotating PDF...' : `Download ${rotationAngle}° Rotated PDF`}
            </button>
          </div>

          {success && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-300">
              <CheckCircle className="h-4 w-4 shrink-0" />
              <span>PDF successfully rotated and downloaded!</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
