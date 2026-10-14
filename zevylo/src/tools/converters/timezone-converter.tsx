'use client';

import React, { useState, useMemo } from 'react';
import { Clock, Plus, Trash2, RotateCcw, Calendar, Sun, Moon } from 'lucide-react';

interface ZoneItem {
  id: string;
  name: string;
  zone: string;
  city: string;
}

const DEFAULT_ZONES: ZoneItem[] = [
  { id: 'utc', name: 'UTC (Coordinated Universal Time)', zone: 'UTC', city: 'Greenwich' },
  { id: 'est', name: 'New York (EDT/EST)', zone: 'America/New_York', city: 'New York' },
  { id: 'pst', name: 'Los Angeles (PDT/PST)', zone: 'America/Los_Angeles', city: 'Los Angeles' },
  { id: 'gmt', name: 'London (BST/GMT)', zone: 'Europe/London', city: 'London' },
  { id: 'cet', name: 'Paris / Berlin (CET/CEST)', zone: 'Europe/Paris', city: 'Paris' },
  { id: 'gst', name: 'Dubai (GST)', zone: 'Asia/Dubai', city: 'Dubai' },
  { id: 'pkt', name: 'Karachi / Islamabad (PKT)', zone: 'Asia/Karachi', city: 'Karachi' },
  { id: 'ist', name: 'India (IST)', zone: 'Asia/Kolkata', city: 'New Delhi' },
  { id: 'sgt', name: 'Singapore (SGT)', zone: 'Asia/Singapore', city: 'Singapore' },
  { id: 'jst', name: 'Tokyo (JST)', zone: 'Asia/Tokyo', city: 'Tokyo' },
  { id: 'aest', name: 'Sydney (AEST/AEDT)', zone: 'Australia/Sydney', city: 'Sydney' },
];

export default function TimezoneConverter() {
  const [baseDate, setBaseDate] = useState<string>(() => {
    const d = new Date();
    return d.toISOString().split('T')[0];
  });
  const [baseHour, setBaseHour] = useState<number>(() => new Date().getHours());
  const [baseMinute, setBaseMinute] = useState<number>(() => Math.floor(new Date().getMinutes() / 15) * 15);
  const activeZone = 'UTC';
  const [selectedZones, setSelectedZones] = useState<ZoneItem[]>([
    DEFAULT_ZONES[0], // UTC
    DEFAULT_ZONES[1], // New York
    DEFAULT_ZONES[3], // London
    DEFAULT_ZONES[6], // Karachi
    DEFAULT_ZONES[7], // India
    DEFAULT_ZONES[9], // Tokyo
  ]);

  const nowTimestamp = useMemo(() => {
    // Construct base UTC or target date
    const [year, month, day] = baseDate.split('-').map(Number);
    const d = new Date(Date.UTC(year, month - 1, day, baseHour, baseMinute, 0));
    return d.getTime();
  }, [baseDate, baseHour, baseMinute]);

  const resetToNow = () => {
    const d = new Date();
    setBaseDate(d.toISOString().split('T')[0]);
    setBaseHour(d.getHours());
    setBaseMinute(Math.floor(d.getMinutes() / 15) * 15);
  };

  const addZone = (zoneItem: ZoneItem) => {
    if (!selectedZones.some((z) => z.zone === zoneItem.zone)) {
      setSelectedZones([...selectedZones, zoneItem]);
    }
  };

  const removeZone = (zone: string) => {
    if (selectedZones.length > 1) {
      setSelectedZones(selectedZones.filter((z) => z.zone !== zone));
    }
  };

  const availableToAdd = DEFAULT_ZONES.filter((z) => !selectedZones.some((sz) => sz.zone === z.zone));

  return (
    <div className="space-y-8">
      {/* Time scrubber controller */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              Global Meeting Planner & Time Scrubber
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Drag the 24-hour timeline to find ideal meeting times across continents
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={resetToNow}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Snap to Now
            </button>
            <div className="flex items-center gap-2 rounded-lg border border-gray-200 dark:border-gray-700 px-2.5 py-1 text-xs">
              <Calendar className="h-3.5 w-3.5 text-gray-400" />
              <input
                type="date"
                value={baseDate}
                onChange={(e) => setBaseDate(e.target.value)}
                className="bg-transparent text-gray-900 dark:text-white focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* 24-hour Slider */}
        <div className="space-y-3">
          <div className="flex justify-between text-xs font-bold text-gray-500 dark:text-gray-400">
            <span>
              Base Time: {String(baseHour).padStart(2, '0')}:{String(baseMinute).padStart(2, '0')} ({activeZone})
            </span>
            <span>
              {baseHour >= 9 && baseHour < 17 ? (
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <Sun className="h-3.5 w-3.5" /> Working Hours (9 AM - 5 PM)
                </span>
              ) : (
                <span className="text-amber-600 dark:text-amber-400 flex items-center gap-1">
                  <Moon className="h-3.5 w-3.5" /> Outside Working Hours
                </span>
              )}
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="23"
            step="1"
            value={baseHour}
            onChange={(e) => setBaseHour(parseInt(e.target.value, 10))}
            className="w-full accent-blue-600 cursor-pointer h-2 bg-gray-200 dark:bg-gray-700 rounded-lg"
          />

          <div className="flex justify-between text-[11px] text-gray-400 font-mono">
            <span>12 AM</span>
            <span>3 AM</span>
            <span>6 AM</span>
            <span>9 AM</span>
            <span>12 PM</span>
            <span>3 PM</span>
            <span>6 PM</span>
            <span>9 PM</span>
            <span>11 PM</span>
          </div>
        </div>
      </div>

      {/* Timezone Cards List */}
      <div className="space-y-3">
        {selectedZones.map((z) => {
          const dateObj = new Date(nowTimestamp);
          const timeStr = dateObj.toLocaleTimeString('en-US', {
            timeZone: z.zone,
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          });
          const time24Str = dateObj.toLocaleTimeString('en-US', {
            timeZone: z.zone,
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          });
          const dateStr = dateObj.toLocaleDateString('en-US', {
            timeZone: z.zone,
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          });
          const targetHour = parseInt(time24Str.split(':')[0], 10);
          const isBusinessHours = targetHour >= 9 && targetHour < 17;
          const isSleep = targetHour >= 22 || targetHour < 7;

          return (
            <div
              key={z.zone}
              className={`flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 rounded-xl border transition-all ${
                isBusinessHours
                  ? 'border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/20 dark:bg-emerald-950/10'
                  : isSleep
                  ? 'border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50'
                  : 'border-blue-100 dark:border-blue-900/30 bg-white dark:bg-gray-900'
              }`}
            >
              <div className="flex items-center gap-3 mb-2 sm:mb-0">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-lg font-bold text-xs ${
                    isBusinessHours
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
                      : isSleep
                      ? 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300'
                  }`}
                >
                  {isBusinessHours ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-gray-900 dark:text-white">{z.city}</span>
                    <span className="text-xs text-gray-400 font-mono">({z.zone})</span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{dateStr}</span>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6">
                <div className="text-right">
                  <div className="text-xl font-black text-gray-900 dark:text-white font-mono">{timeStr}</div>
                  <div className="text-[11px] font-medium text-gray-400">
                    {isBusinessHours ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-semibold">● Office Hours</span>
                    ) : isSleep ? (
                      <span className="text-gray-400">● Night / Sleep</span>
                    ) : (
                      <span className="text-blue-500">● Waking hours</span>
                    )}
                  </div>
                </div>

                {selectedZones.length > 1 && (
                  <button
                    onClick={() => removeZone(z.zone)}
                    title="Remove timezone"
                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Add more time zones */}
      {availableToAdd.length > 0 && (
        <div className="rounded-xl border border-dashed border-gray-300 dark:border-gray-800 p-4">
          <span className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
            Add Another Major Time Zone:
          </span>
          <div className="flex flex-wrap gap-2">
            {availableToAdd.map((z) => (
              <button
                key={z.zone}
                onClick={() => addZone(z)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 hover:border-blue-500 hover:text-blue-600"
              >
                <Plus className="h-3 w-3" />
                {z.city} ({z.zone})
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
