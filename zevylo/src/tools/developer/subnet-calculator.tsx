'use client';

import React, { useState, useMemo } from 'react';
import { Network, Copy, Check, Info, Server, Cpu, Layers } from 'lucide-react';

function ipToUint(ip: string): number | null {
  const parts = ip.trim().split('.');
  if (parts.length !== 4) return null;
  let num = 0;
  for (const p of parts) {
    if (!/^\d+$/.test(p)) return null;
    const n = parseInt(p, 10);
    if (n < 0 || n > 255) return null;
    num = (num << 8) + n;
  }
  return num >>> 0;
}

function uintToIp(uint: number): string {
  return [
    (uint >>> 24) & 255,
    (uint >>> 16) & 255,
    (uint >>> 8) & 255,
    uint & 255,
  ].join('.');
}

function uintToBinary(uint: number): string {
  return [
    ((uint >>> 24) & 255).toString(2).padStart(8, '0'),
    ((uint >>> 16) & 255).toString(2).padStart(8, '0'),
    ((uint >>> 8) & 255).toString(2).padStart(8, '0'),
    (uint & 255).toString(2).padStart(8, '0'),
  ].join('.');
}

export default function SubnetCalculator() {
  const [ipInput, setIpInput] = useState('192.168.1.10');
  const [cidr, setCidr] = useState(24);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const result = useMemo(() => {
    const cleanIp = ipInput.trim().split('/')[0];
    const ipUint = ipToUint(cleanIp);
    if (ipUint === null) return null;

    const netmaskUint = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
    const wildcardUint = ~netmaskUint >>> 0;
    const networkUint = (ipUint & netmaskUint) >>> 0;
    const broadcastUint = (networkUint | wildcardUint) >>> 0;

    const totalIps = Math.pow(2, 32 - cidr);
    let usableHosts = 0;
    let firstUsable = '';
    let lastUsable = '';

    if (cidr === 32) {
      usableHosts = 1;
      firstUsable = uintToIp(networkUint);
      lastUsable = uintToIp(networkUint);
    } else if (cidr === 31) {
      usableHosts = 2;
      firstUsable = uintToIp(networkUint);
      lastUsable = uintToIp(broadcastUint);
    } else {
      usableHosts = totalIps - 2;
      firstUsable = uintToIp(networkUint + 1);
      lastUsable = uintToIp(broadcastUint - 1);
    }

    const firstOctet = (ipUint >>> 24) & 255;
    let ipClass = 'Class A';
    if (firstOctet >= 128 && firstOctet <= 191) ipClass = 'Class B';
    else if (firstOctet >= 192 && firstOctet <= 223) ipClass = 'Class C';
    else if (firstOctet >= 224 && firstOctet <= 239) ipClass = 'Class D (Multicast)';
    else if (firstOctet >= 240) ipClass = 'Class E (Experimental)';

    // Private IP check (RFC 1918)
    let isPrivate = false;
    if (firstOctet === 10) isPrivate = true;
    else if (firstOctet === 172 && ((ipUint >>> 16) & 255) >= 16 && ((ipUint >>> 16) & 255) <= 31) isPrivate = true;
    else if (firstOctet === 192 && ((ipUint >>> 16) & 255) === 168) isPrivate = true;

    return {
      ip: cleanIp,
      cidr,
      netmask: uintToIp(netmaskUint),
      wildcard: uintToIp(wildcardUint),
      networkAddress: uintToIp(networkUint),
      broadcastAddress: uintToIp(broadcastUint),
      usableRange: `${firstUsable} — ${lastUsable}`,
      usableHosts: usableHosts.toLocaleString(),
      totalIps: totalIps.toLocaleString(),
      ipBinary: uintToBinary(ipUint),
      netmaskBinary: uintToBinary(netmaskUint),
      networkBinary: uintToBinary(networkUint),
      ipClass,
      isPrivate,
    };
  }, [ipInput, cidr]);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const commonSubnets = [
    { label: '/24 (254 Hosts)', cidr: 24 },
    { label: '/16 (65,534 Hosts)', cidr: 16 },
    { label: '/28 (14 Hosts)', cidr: 28 },
    { label: '/30 (2 Point-to-Point)', cidr: 30 },
    { label: '/8 (16.7M Hosts)', cidr: 8 },
  ];

  return (
    <div className="space-y-8">
      {/* Controls */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1.5 flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-blue-500" />
              IPv4 Address
            </label>
            <input
              type="text"
              value={ipInput}
              onChange={(e) => setIpInput(e.target.value)}
              placeholder="e.g. 192.168.1.1"
              className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 px-4 py-2.5 font-mono text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5 text-xs font-bold text-gray-700 dark:text-gray-300">
              <label>Subnet Mask / CIDR Prefix</label>
              <span className="font-mono text-blue-600 dark:text-blue-400">/{cidr}</span>
            </div>
            <select
              value={cidr}
              onChange={(e) => setCidr(Number(e.target.value))}
              className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 px-4 py-2.5 font-mono text-xs text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Array.from({ length: 33 }, (_, i) => 32 - i).map((c) => {
                const maskUint = c === 0 ? 0 : (~0 << (32 - c)) >>> 0;
                return (
                  <option key={c} value={c}>
                    /{c} — {uintToIp(maskUint)}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center gap-2 flex-wrap text-xs text-gray-500">
          <span className="font-semibold">Quick Subnets:</span>
          {commonSubnets.map((sub, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCidr(sub.cidr)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-colors ${
                cidr === sub.cidr
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
              }`}
            >
              {sub.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Display */}
      {result ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 space-y-1">
              <span className="text-[11px] font-bold text-gray-400 uppercase">Network Address</span>
              <p className="text-lg font-black font-mono text-blue-600 dark:text-blue-400">{result.networkAddress}</p>
              <span className="text-[10px] text-gray-400">/{result.cidr} CIDR Route</span>
            </div>

            <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 space-y-1">
              <span className="text-[11px] font-bold text-gray-400 uppercase">Broadcast Address</span>
              <p className="text-lg font-black font-mono text-gray-900 dark:text-gray-100">{result.broadcastAddress}</p>
              <span className="text-[10px] text-gray-400">Subnet Boundary</span>
            </div>

            <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 space-y-1">
              <span className="text-[11px] font-bold text-gray-400 uppercase">Usable Hosts</span>
              <p className="text-lg font-black font-mono text-emerald-600">{result.usableHosts}</p>
              <span className="text-[10px] text-gray-400">{result.totalIps} Total Addresses</span>
            </div>

            <div className="p-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 space-y-1">
              <span className="text-[11px] font-bold text-gray-400 uppercase">IP Scope &amp; Class</span>
              <p className="text-lg font-black text-gray-900 dark:text-gray-100">{result.ipClass}</p>
              <span className={`text-[10px] font-bold ${result.isPrivate ? 'text-emerald-500' : 'text-blue-500'}`}>
                {result.isPrivate ? 'RFC 1918 Private IP' : 'Public Routable IP'}
              </span>
            </div>
          </div>

          {/* Details Table */}
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-4">
            <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider flex items-center gap-2">
              <Network className="w-4 h-4 text-blue-500" /> Subnet Specification Breakdown
            </h3>

            <div className="divide-y divide-gray-100 dark:divide-gray-800 text-xs">
              <div className="py-2.5 flex items-center justify-between">
                <span className="text-gray-500">Subnet Netmask</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-gray-900 dark:text-gray-100">{result.netmask}</span>
                  <button onClick={() => copyToClipboard(result.netmask, 'netmask')} className="text-gray-400 hover:text-blue-500">
                    {copiedKey === 'netmask' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="py-2.5 flex items-center justify-between">
                <span className="text-gray-500">Wildcard Mask</span>
                <span className="font-mono font-bold text-gray-900 dark:text-gray-100">{result.wildcard}</span>
              </div>

              <div className="py-2.5 flex items-center justify-between">
                <span className="text-gray-500">Usable Host IP Range</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{result.usableRange}</span>
                  <button onClick={() => copyToClipboard(result.usableRange, 'range')} className="text-gray-400 hover:text-blue-500">
                    {copiedKey === 'range' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="py-2.5 flex items-center justify-between">
                <span className="text-gray-500">CIDR Route Notation</span>
                <span className="font-mono font-bold text-gray-900 dark:text-gray-100">{result.networkAddress}/{result.cidr}</span>
              </div>
            </div>

            {/* Binary Representations */}
            <div className="pt-3 border-t border-gray-100 dark:border-gray-800 space-y-2">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">
                Binary Bitstream View (32-bit)
              </span>
              <div className="space-y-1.5 font-mono text-xs">
                <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-950 flex justify-between items-center">
                  <span className="text-gray-500">IP Bits:</span>
                  <span className="text-blue-600 dark:text-blue-400">{result.ipBinary}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-gray-950 flex justify-between items-center">
                  <span className="text-gray-500">Mask Bits:</span>
                  <span className="text-amber-600 dark:text-amber-400">{result.netmaskBinary}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 rounded-2xl border border-red-200 dark:border-red-900/40 bg-red-50/50 dark:bg-red-950/20 text-xs text-red-600 dark:text-red-400">
          Invalid IPv4 address format. Please enter four octets separated by dots (e.g. 192.168.1.1).
        </div>
      )}
    </div>
  );
}
