'use client';

import React, { useState, useMemo } from 'react';
import { copyToClipboard } from '@/lib/utils';

// Decode a base64url segment to a UTF-8 string. Bare atob() returns a latin1
// binary string, which garbles any non-ASCII claim (names, CJK, emoji); decode
// the bytes through TextDecoder instead, and restore stripped '=' padding.
function b64urlToUtf8(part: string): string {
  let b64 = part.replace(/-/g, '+').replace(/_/g, '/');
  while (b64.length % 4) b64 += '=';
  const bin = atob(b64);
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder('utf-8').decode(bytes);
}

interface DecodedState {
  header: string;
  payload: string;
  signature: string;
  error: string | null;
  expStatus: 'valid' | 'expired' | 'none';
  dates: { iat?: string; exp?: string };
}

export default function JwtDecoder() {
  const [token, setToken] = useState('');

  const { header, payload, signature, error, expStatus, dates } = useMemo<DecodedState>(() => {
    if (!token.trim()) {
      return {
        header: '',
        payload: '',
        signature: '',
        error: null,
        expStatus: 'none',
        dates: {},
      };
    }

    const parts = token.split('.');
    if (parts.length !== 3) {
      return {
        header: '',
        payload: '',
        signature: '',
        error: 'Invalid JWT structure (must have 3 parts)',
        expStatus: 'none',
        dates: {},
      };
    }

    try {
      const decHeader = JSON.parse(b64urlToUtf8(parts[0]));
      const decPayload = JSON.parse(b64urlToUtf8(parts[1]));
      
      const d: Record<string, string> = {};
      let isExpired = false;
      let hasExp = false;

      if (decPayload.exp) {
        hasExp = true;
        const expDate = new Date(decPayload.exp * 1000);
        d.exp = expDate.toLocaleString();
        if (expDate < new Date()) {
          isExpired = true;
        }
      }
      if (decPayload.iat) {
        d.iat = new Date(decPayload.iat * 1000).toLocaleString();
      }

      return {
        header: JSON.stringify(decHeader, null, 2),
        payload: JSON.stringify(decPayload, null, 2),
        signature: parts[2],
        error: null,
        expStatus: hasExp ? (isExpired ? ('expired' as const) : ('valid' as const)) : ('none' as const),
        dates: d,
      };
    } catch {
      return {
        header: '',
        payload: '',
        signature: '',
        error: 'Failed to parse token parts. Ensure it is a valid base64url encoded string.',
        expStatus: 'none' as const,
        dates: {},
      };
    }
  }, [token]);

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold dark:text-white">JWT Decoder</h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">Processed locally in your browser. Signatures are NOT verified.</span>
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-semibold dark:text-white">Encoded Token</label>
        <textarea
          className="w-full h-32 p-4 border rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white dark:border-gray-700 font-mono break-all"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="ey..."
        />
      </div>

      {error ? (
        <div className="p-4 bg-red-100 text-red-800 rounded-lg">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="font-semibold text-red-600 dark:text-red-400">Header (Algorithm & Token Type)</label>
                <button onClick={() => copyToClipboard(header)} className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">Copy</button>
              </div>
              <pre className="p-4 bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-lg font-mono text-sm dark:text-gray-300 overflow-auto">
                {header || '{}'}
              </pre>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="font-semibold text-purple-600 dark:text-purple-400">Payload (Data)</label>
                <button onClick={() => copyToClipboard(payload)} className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded">Copy</button>
              </div>
              <pre className="p-4 bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-lg font-mono text-sm dark:text-gray-300 overflow-auto h-64">
                {payload || '{}'}
              </pre>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="font-semibold text-blue-600 dark:text-blue-400">Signature</label>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-900 border dark:border-gray-700 rounded-lg font-mono text-sm dark:text-gray-300 break-all">
                {signature || '...'}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 p-4 border dark:border-gray-700 rounded-lg h-fit bg-gray-50 dark:bg-gray-800">
            <h3 className="font-bold text-lg dark:text-white">Token Information</h3>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between border-b dark:border-gray-700 pb-2">
                <span className="font-semibold dark:text-gray-300">Status</span>
                <span>
                  {expStatus === 'valid' && <span className="text-green-600 bg-green-100 px-2 py-1 rounded text-sm">Valid</span>}
                  {expStatus === 'expired' && <span className="text-red-600 bg-red-100 px-2 py-1 rounded text-sm">Expired</span>}
                  {expStatus === 'none' && <span className="text-gray-500 dark:text-gray-400 text-sm">No Expiration Claim</span>}
                </span>
              </div>
              
              {dates.iat && (
                <div className="flex justify-between border-b dark:border-gray-700 pb-2 text-sm dark:text-gray-300">
                  <span className="font-semibold">Issued At (iat)</span>
                  <span>{dates.iat}</span>
                </div>
              )}
              
              {dates.exp && (
                <div className="flex justify-between border-b dark:border-gray-700 pb-2 text-sm dark:text-gray-300">
                  <span className="font-semibold">Expires (exp)</span>
                  <span>{dates.exp}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
