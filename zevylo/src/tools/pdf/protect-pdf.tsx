'use client';

import React, { useState } from 'react';
import { Lock, Unlock, Upload, Download, ShieldCheck, Key, Eye, EyeOff, CheckCircle2, AlertCircle } from 'lucide-react';
import { formatBytes } from '@/lib/utils';

export default function ProtectPdf() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [hint, setHint] = useState('');
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [decryptPassword, setDecryptPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      setError(null);
      setSuccess(null);
      if (f.name.endsWith('.enc') || f.name.includes('.protected.')) {
        setMode('decrypt');
      } else {
        setMode('encrypt');
      }
    }
  };

  // Derive cryptographic key from password using PBKDF2
  const deriveKey = async (pass: string, salt: Uint8Array): Promise<CryptoKey> => {
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      enc.encode(pass),
      { name: 'PBKDF2' },
      false,
      ['deriveKey']
    );

    return crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt as BufferSource,
        iterations: 100000,
        hash: 'SHA-256',
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
  };

  const handleEncrypt = async () => {
    if (!file) return;
    if (!password) {
      setError('Please enter a secure password');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const fileData = await file.arrayBuffer();
      const salt = crypto.getRandomValues(new Uint8Array(16));
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const key = await deriveKey(password, salt);

      // Encrypt file bytes with AES-GCM
      const encryptedData = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv },
        key,
        fileData
      );

      // Header: "ZEVENC" (6 bytes) + salt (16 bytes) + iv (12 bytes) + hint length (2 bytes) + hint + ciphertext
      const hintBytes = new TextEncoder().encode(hint.trim());
      const headerLength = 6 + 16 + 12 + 2 + hintBytes.length;
      const combined = new Uint8Array(headerLength + encryptedData.byteLength);

      let offset = 0;
      combined.set(new TextEncoder().encode('ZEVENC'), offset);
      offset += 6;
      combined.set(salt, offset);
      offset += 16;
      combined.set(iv, offset);
      offset += 12;

      // 2 bytes for hint length
      combined[offset] = (hintBytes.length >> 8) & 0xff;
      combined[offset + 1] = hintBytes.length & 0xff;
      offset += 2;

      if (hintBytes.length > 0) {
        combined.set(hintBytes, offset);
        offset += hintBytes.length;
      }

      combined.set(new Uint8Array(encryptedData), offset);

      const blob = new Blob([combined as BlobPart], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${file.name.replace(/\.pdf$/i, '')}.protected.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setSuccess('PDF successfully encrypted with military-grade AES-256 GCM! File downloaded.');
    } catch (err: any) {
      setError('Encryption failed: ' + (err.message || 'Unknown error'));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDecrypt = async () => {
    if (!file) return;
    if (!decryptPassword) {
      setError('Please enter the decryption password');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const buffer = await file.arrayBuffer();
      const bytes = new Uint8Array(buffer);

      // Check header
      const magic = new TextDecoder().decode(bytes.slice(0, 6));
      if (magic !== 'ZEVENC') {
        throw new Error('This file does not appear to be encrypted with Zevylo Protect PDF.');
      }

      const salt = bytes.slice(6, 22);
      const iv = bytes.slice(22, 34);
      const hintLen = (bytes[34] << 8) | bytes[35];
      let offset = 36 + hintLen;

      const ciphertext = bytes.slice(offset);
      const key = await deriveKey(decryptPassword, salt);

      const decrypted = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv },
        key,
        ciphertext
      );

      const blob = new Blob([decrypted as BlobPart], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name.replace(/\.protected\.pdf$/i, '.pdf').replace(/\.enc$/i, '.pdf');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setSuccess('Decryption successful! Unlocked PDF document downloaded.');
    } catch (err: any) {
      setError('Decryption failed. Please verify that your password is correct.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Upload Banner */}
      <div className="rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 text-center transition-all hover:border-blue-500">
        <input
          type="file"
          id="protect-pdf-upload"
          accept=".pdf,.enc,application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />
        <label htmlFor="protect-pdf-upload" className="cursor-pointer space-y-3 block">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-bold text-base text-gray-900 dark:text-gray-100">
              {file ? file.name : 'Upload PDF to Encrypt or Unlock'}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              {file
                ? `${formatBytes(file.size)} • Ready for processing`
                : 'Select any PDF to lock with AES-256 password security, or unlock an encrypted file'}
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

      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
          <span>{success}</span>
        </div>
      )}

      {/* Mode Controls */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-6">
        <div className="flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 pb-4">
          <button
            type="button"
            onClick={() => {
              setMode('encrypt');
              setError(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              mode === 'encrypt'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Lock &amp; Encrypt PDF</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('decrypt');
              setError(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              mode === 'decrypt'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
            }`}
          >
            <Unlock className="w-3.5 h-3.5" />
            <span>Unlock Encrypted PDF</span>
          </button>
        </div>

        {mode === 'encrypt' ? (
          <div className="space-y-4 max-w-lg">
            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Set Document Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter strong encryption password..."
                  className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 px-4 py-2.5 text-xs text-gray-900 dark:text-gray-100 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Confirm Password *
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-type password to confirm..."
                className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 px-4 py-2.5 text-xs text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Password Hint (Optional)
              </label>
              <input
                type="text"
                value={hint}
                onChange={(e) => setHint(e.target.value)}
                placeholder="e.g. My university ID number"
                className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 px-4 py-2.5 text-xs text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleEncrypt}
                disabled={!file || isProcessing}
                className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-500 disabled:opacity-50 transition-colors flex items-center gap-2 shadow-lg shadow-blue-600/20"
              >
                <Lock className="w-4 h-4" />
                <span>{isProcessing ? 'Encrypting File...' : 'Encrypt & Download Protected PDF'}</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 max-w-lg">
            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Enter Password to Unlock *
              </label>
              <input
                type="password"
                value={decryptPassword}
                onChange={(e) => setDecryptPassword(e.target.value)}
                placeholder="Enter the password used to encrypt this file..."
                className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 px-4 py-2.5 text-xs text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleDecrypt}
                disabled={!file || isProcessing}
                className="px-6 py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-500 disabled:opacity-50 transition-colors flex items-center gap-2 shadow-lg shadow-emerald-600/20"
              >
                <Unlock className="w-4 h-4" />
                <span>{isProcessing ? 'Decrypting File...' : 'Unlock & Download Original PDF'}</span>
              </button>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center gap-2 text-xs text-gray-400">
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
          <span>Industry-standard AES-256 GCM encryption. Key is computed locally with PBKDF2 (100k cycles).</span>
        </div>
      </div>
    </div>
  );
}
