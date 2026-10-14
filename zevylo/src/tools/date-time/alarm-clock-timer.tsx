'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Bell, Play, Pause, RotateCcw, Clock, Volume2, Flag } from 'lucide-react';

export default function AlarmClockTimer() {
  const [activeTab, setActiveTab] = useState<'alarm' | 'timer' | 'stopwatch'>('timer');
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  // Alarm State
  const [alarmTime, setAlarmTime] = useState<string>('08:00');
  const [alarmLabel, setAlarmLabel] = useState<string>('Morning Focus');
  const [alarmActive, setAlarmActive] = useState<boolean>(false);
  const [alarmTriggered, setAlarmTriggered] = useState<boolean>(false);

  // Timer State
  const [timerMinutes, setTimerMinutes] = useState<number>(15);
  const [timerSeconds, setTimerSeconds] = useState<number>(0);
  const [timerRemaining, setTimerRemaining] = useState<number>(15 * 60);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);

  // Stopwatch State
  const [stopwatchMs, setStopwatchMs] = useState<number>(0);
  const [stopwatchRunning, setStopwatchRunning] = useState<boolean>(false);
  const [laps, setLaps] = useState<number[]>([]);

  const audioCtxRef = useRef<AudioContext | null>(null);

  // Play synthetic chime sound via Web Audio API
  const playChime = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.15);

        gain.gain.setValueAtTime(0.3, ctx.currentTime + idx * 0.15);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.15 + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.15);
        osc.stop(ctx.currentTime + idx * 0.15 + 0.45);
      });
    } catch {
      // Audio playback fallback
    }
  };

  // Clock ticker & Alarm Checker
  useEffect(() => {
    const timeout = setTimeout(() => setCurrentTime(new Date()), 0);
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);

      if (alarmActive && !alarmTriggered) {
        const hours = String(now.getHours()).padStart(2, '0');
        const mins = String(now.getMinutes()).padStart(2, '0');
        const currentHM = `${hours}:${mins}`;

        if (currentHM === alarmTime && now.getSeconds() === 0) {
          setAlarmTriggered(true);
          playChime();
        }
      }
    }, 1000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [alarmActive, alarmTime, alarmTriggered]);

  // Timer Ticker
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (timerRunning) {
      interval = setInterval(() => {
        setTimerRemaining((prev) => {
          if (prev <= 1) {
            setTimerRunning(false);
            playChime();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerRunning]);

  // Stopwatch Ticker
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (stopwatchRunning) {
      const startTime = performance.now() - stopwatchMs;
      interval = setInterval(() => {
        setStopwatchMs(performance.now() - startTime);
      }, 50);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [stopwatchRunning, stopwatchMs]);

  const handleStartTimer = () => {
    if (timerRemaining === 0) {
      setTimerRemaining(timerMinutes * 60 + timerSeconds);
    }
    setTimerRunning(true);
  };

  const handleResetTimer = () => {
    setTimerRunning(false);
    setTimerRemaining(timerMinutes * 60 + timerSeconds);
  };

  const formatTimerDigits = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const formatStopwatch = (ms: number) => {
    const totalSecs = Math.floor(ms / 1000);
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    const hundredths = Math.floor((ms % 1000) / 10);
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${String(hundredths).padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8">
      {/* Live Digital Clock Banner */}
      <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <Clock className="w-6 h-6 text-amber-400" />
          <div>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-gray-900 dark:text-white tracking-wider">
              {currentTime ? currentTime.toLocaleTimeString() : '--:--:--'}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {currentTime ? currentTime.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) : ''}
            </div>
          </div>
        </div>

        <button
          onClick={playChime}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-white/10 hover:bg-white/20 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:text-white text-xs font-medium transition-colors"
        >
          <Volume2 className="w-4 h-4 text-amber-400" />
          Test Chime Sound
        </button>
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-2 p-1.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 max-w-md">
        {(['timer', 'stopwatch', 'alarm'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${
              activeTab === tab
                ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:text-white hover:bg-white dark:bg-gray-900'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab 1: Timer */}
      {activeTab === 'timer' && (
        <div className="p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center space-y-6">
          <div className="text-6xl sm:text-7xl font-mono font-extrabold text-gray-900 dark:text-white tracking-widest">
            {formatTimerDigits(timerRemaining)}
          </div>

          <div className="flex justify-center gap-4">
            {!timerRunning ? (
              <button
                onClick={handleStartTimer}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm transition-colors shadow-lg shadow-amber-500/20"
              >
                <Play className="w-4 h-4" /> Start
              </button>
            ) : (
              <button
                onClick={() => setTimerRunning(false)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-sm transition-colors border border-amber-500/30"
              >
                <Pause className="w-4 h-4" /> Pause
              </button>
            )}

            <button
              onClick={handleResetTimer}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-white/20 text-gray-900 dark:text-white font-semibold text-sm transition-colors"
            >
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
          </div>

          {/* Quick Preset Buttons */}
          <div className="flex justify-center flex-wrap gap-2 pt-4 border-t border-gray-200 dark:border-gray-800">
            {[5, 10, 15, 25, 30, 45, 60].map((mins) => (
              <button
                key={mins}
                onClick={() => {
                  setTimerMinutes(mins);
                  setTimerSeconds(0);
                  setTimerRemaining(mins * 60);
                  setTimerRunning(false);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors ${
                  timerMinutes === mins && timerSeconds === 0
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800'
                }`}
              >
                {mins}m
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Stopwatch */}
      {activeTab === 'stopwatch' && (
        <div className="p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center space-y-6">
          <div className="text-6xl sm:text-7xl font-mono font-extrabold text-gray-900 dark:text-white tracking-widest">
            {formatStopwatch(stopwatchMs)}
          </div>

          <div className="flex justify-center gap-4">
            {!stopwatchRunning ? (
              <button
                onClick={() => setStopwatchRunning(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-sm transition-colors shadow-lg shadow-amber-500/20"
              >
                <Play className="w-4 h-4" /> Start
              </button>
            ) : (
              <button
                onClick={() => setStopwatchRunning(false)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-sm transition-colors border border-amber-500/30"
              >
                <Pause className="w-4 h-4" /> Stop
              </button>
            )}

            {stopwatchRunning && (
              <button
                onClick={() => setLaps([stopwatchMs, ...laps])}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 font-semibold text-sm transition-colors border border-sky-500/30"
              >
                <Flag className="w-4 h-4" /> Lap
              </button>
            )}

            <button
              onClick={() => {
                setStopwatchRunning(false);
                setStopwatchMs(0);
                setLaps([]);
              }}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-white/20 text-gray-900 dark:text-white font-semibold text-sm transition-colors"
            >
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
          </div>

          {laps.length > 0 && (
            <div className="max-w-md mx-auto pt-6 border-t border-gray-200 dark:border-gray-800 space-y-2 text-left">
              <h4 className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Recorded Laps</h4>
              <div className="max-h-48 overflow-y-auto space-y-1.5 font-mono text-xs">
                {laps.map((lap, idx) => (
                  <div key={idx} className="flex justify-between p-2 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-800">
                    <span className="text-gray-400 dark:text-gray-500">Lap #{laps.length - idx}</span>
                    <span className="text-zinc-200 font-bold">{formatStopwatch(lap)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Alarm */}
      {activeTab === 'alarm' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                Alarm Target Time
              </label>
              <input
                type="time"
                value={alarmTime}
                onChange={(e) => {
                  setAlarmTime(e.target.value);
                  setAlarmTriggered(false);
                }}
                className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-lg font-mono focus:outline-none focus:border-amber-500/50"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
                Alarm Label / Note
              </label>
              <input
                type="text"
                value={alarmLabel}
                onChange={(e) => setAlarmLabel(e.target.value)}
                placeholder="e.g. Daily Standup Meeting"
                className="w-full px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-amber-500/50"
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <Bell className={`w-5 h-5 ${alarmActive ? 'text-amber-400 animate-pulse' : 'text-gray-400 dark:text-gray-500'}`} />
              <div>
                <div className="text-sm font-bold text-gray-900 dark:text-white">
                  {alarmActive ? `Alarm Armed for ${alarmTime}` : 'Alarm is Disarmed'}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{alarmLabel}</div>
              </div>
            </div>

            <button
              onClick={() => {
                setAlarmActive(!alarmActive);
                setAlarmTriggered(false);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                alarmActive
                  ? 'bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30'
                  : 'bg-amber-500 hover:bg-amber-400 text-black shadow-lg shadow-amber-500/20'
              }`}
            >
              {alarmActive ? 'Turn Off Alarm' : 'Set Alarm'}
            </button>
          </div>

          {alarmTriggered && (
            <div className="p-4 rounded-xl bg-red-500/20 border border-red-500/40 text-center animate-bounce">
              <h3 className="text-lg font-bold text-red-200">⏰ WAKE UP! {alarmLabel}</h3>
              <p className="text-xs text-red-300 mt-1">Alarm time reached ({alarmTime})</p>
              <button
                onClick={() => setAlarmTriggered(false)}
                className="mt-3 px-4 py-1.5 rounded-lg bg-red-500 text-white text-xs font-bold"
              >
                Dismiss Alarm
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
