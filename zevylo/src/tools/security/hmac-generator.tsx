'use client';

import React, { useState, useEffect } from 'react';
import { Copy, Check, KeyRound, ShieldCheck, RefreshCw, AlertCircle } from 'lucide-react';

export default function HmacGenerator() {
  const [message, setMessage] = useState<string>('The quick brown fox jumps over the lazy dog');
  const [secretKey, setSecretKey] = useState<string>('secret-signing-key-xyz');
  const [algorithm, setAlgorithm] = useState<'SHA-256' | 'SHA-384' | 'SHA-512'>('SHA-256');
  const [outputFormat, setOutputFormat] = useState<'hex' | 'base64'>('hex');
  const [uppercase, setUppercase] = useState<boolean>(false);
  const [hmacOutput, setHmacOutput] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [verifyHash, setVerifyHash] = useState<string>('');

  useEffect(() => {
    let isCancelled = false;

    async function calculateHmac() {
      if (!secretKey) {
        setHmacOutput('');
        return;
      }

      try {
        const encoder = new TextEncoder();
        const keyData = encoder.encode(secretKey);
        const msgData = encoder.encode(message);

        const cryptoKey = await window.crypto.subtle.importKey(
          'raw',
          keyData,
          { name: 'HMAC', hash: { name: algorithm } },
          false,
          ['sign']
        );

        const signatureBuffer = await window.crypto.subtle.sign('HMAC', cryptoKey, msgData);
        if (isCancelled) return;

        const byteArray = new Uint8Array(signatureBuffer);

        if (outputFormat === 'hex') {
          let hex = Array.from(byteArray)
            .map((b) => b.toString(16).padStart(2, '0'))
            .join('');
          if (uppercase) hex = hex.toUpperCase();
          setHmacOutput(hex);
        } else {
          let binary = '';
          for (let i = 0; i < byteArray.byteLength; i++) {
            binary += String.fromCharCode(byteArray[i]);
          }
          setHmacOutput(btoa(binary));
        }
      } catch (err) {
        console.error('HMAC calculation failed', err);
        setHmacOutput('Error calculating HMAC');
      }
    }

    calculateHmac();

    return () => {
      isCancelled = true;
    };
  }, [message, secretKey, algorithm, outputFormat, uppercase]);

  const generateRandomKey = () => {
    const array = new Uint8Array(32);
    window.crypto.getRandomValues(array);
    const key = Array.from(array)
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
    setSecretKey(key);
  };

  const handleCopy = () => {
    if (!hmacOutput) return;
    navigator.clipboard.writeText(hmacOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isMatch = verifyHash.trim()
    ? verifyHash.trim().toLowerCase() === hmacOutput.toLowerCase()
    : null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Configuration bar */}
      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">
              Algorithm
            </label>
            <div className="inline-flex rounded-lg bg-gray-100 dark:bg-gray-700 p-1 text-xs font-medium">
              {(['SHA-256', 'SHA-384', 'SHA-512'] as const).map((algo) => (
                <button
                  key={algo}
                  onClick={() => setAlgorithm(algo)}
                  className={`px-3 py-1.5 rounded-md transition ${
                    algorithm === algo
                      ? 'bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 font-semibold shadow-sm'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {algo}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">
              Encoding Format
            </label>
            <div className="inline-flex rounded-lg bg-gray-100 dark:bg-gray-700 p-1 text-xs font-medium">
              <button
                onClick={() => setOutputFormat('hex')}
                className={`px-3 py-1.5 rounded-md transition ${
                  outputFormat === 'hex'
                    ? 'bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 font-semibold shadow-sm'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                HEX
              </button>
              <button
                onClick={() => setOutputFormat('base64')}
                className={`px-3 py-1.5 rounded-md transition ${
                  outputFormat === 'base64'
                    ? 'bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 font-semibold shadow-sm'
                    : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                Base64
              </button>
            </div>
          </div>

          {outputFormat === 'hex' && (
            <div className="flex items-center gap-2 pt-5">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={uppercase}
                  onChange={(e) => setUppercase(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                <span className="ml-2 text-xs font-medium text-gray-700 dark:text-gray-300">
                  Uppercase HEX
                </span>
              </label>
            </div>
          )}
        </div>

        {/* Secret key input */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <KeyRound className="w-3.5 h-3.5 text-indigo-500" /> Secret Key (HMAC Key)
            </label>
            <button
              onClick={generateRandomKey}
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" /> Generate 256-bit Random Key
            </button>
          </div>
          <input
            type="text"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            placeholder="Enter secret key string..."
            className="w-full font-mono text-sm px-3.5 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Message input */}
      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-2">
        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Message to Sign
        </label>
        <textarea
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter text or payload to compute HMAC..."
          className="w-full font-mono text-sm p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-y"
        />
      </div>

      {/* HMAC Output Result */}
      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            Computed HMAC ({algorithm} • {outputFormat.toUpperCase()})
          </span>
          <button
            onClick={handleCopy}
            disabled={!hmacOutput}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white transition shadow-sm"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-300" /> Copied!
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" /> Copy Signature
              </>
            )}
          </button>
        </div>

        <div className="p-4 bg-gray-900 rounded-lg border border-gray-800 overflow-x-auto">
          <code className="font-mono text-sm text-emerald-400 break-all select-all">
            {hmacOutput || '// Provide a secret key to compute hash'}
          </code>
        </div>
      </div>

      {/* Verify Hash / Signature checker */}
      <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-3">
        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Verify Existing Signature (Optional)
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={verifyHash}
            onChange={(e) => setVerifyHash(e.target.value)}
            placeholder="Paste HMAC here to verify against generated output..."
            className="flex-1 font-mono text-sm px-3.5 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        {verifyHash.trim() && (
          <div
            className={`p-3 rounded-lg text-xs font-medium flex items-center gap-2 ${
              isMatch
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                : 'bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'
            }`}
          >
            {isMatch ? (
              <>
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Signatures match perfectly! Valid message authenticity.
              </>
            ) : (
              <>
                <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                Signature mismatch! The provided hash does not match computed HMAC.
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
