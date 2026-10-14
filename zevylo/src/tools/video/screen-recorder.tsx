'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  MonitorPlay, 
  CircleDot, 
  Square, 
  Pause, 
  Play, 
  Download, 
  RotateCcw, 
  ShieldCheck 
} from 'lucide-react';
import { formatBytes } from '@/lib/utils';

export default function ScreenRecorder() {
  const [recordingState, setRecordingState] = useState<'idle' | 'recording' | 'paused' | 'finished'>('idle');
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null);
  const [recordedSize, setRecordedSize] = useState<number>(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const hrs = Math.floor(mins / 60);
    const remMins = mins % 60;
    return `${hrs > 0 ? `${hrs.toString().padStart(2, '0')}:` : ''}${remMins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const startRecording = async () => {
    setError(null);
    setRecordedUrl(null);
    setRecordedSize(0);
    chunksRef.current = [];
    setDuration(0);

    if (!navigator.mediaDevices?.getDisplayMedia) {
      setError('Screen recording is not supported in this browser. Please use Chrome, Edge, or Firefox.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          displaySurface: 'monitor',
        },
        audio: true
      });

      streamRef.current = stream;

      stream.getVideoTracks()[0].onended = () => {
        stopRecording();
      };

      const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
        ? 'video/webm;codecs=vp9'
        : 'video/webm';

      const recorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setRecordedUrl(url);
        setRecordedSize(blob.size);
        setRecordingState('finished');
        if (timerRef.current) clearInterval(timerRef.current);
      };

      recorder.start(1000);
      setRecordingState('recording');

      timerRef.current = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
    } catch {
      // User cancelled picker
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && recordingState === 'recording') {
      mediaRecorderRef.current.pause();
      setRecordingState('paused');
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && recordingState === 'paused') {
      mediaRecorderRef.current.resume();
      setRecordingState('recording');
      timerRef.current = setInterval(() => {
        setDuration((prev) => prev + 1);
      }, 1000);
    }
  };

  const stopRecording = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
  };

  const handleReset = () => {
    setRecordingState('idle');
    setRecordedUrl(null);
    setRecordedSize(0);
    setDuration(0);
    setError(null);
  };

  return (
    <div className="space-y-8">
      {/* Upload/Record Hero */}
      <div className="p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-4 rounded-2xl bg-rose-500/10 text-rose-400">
            <MonitorPlay className="w-8 h-8" />
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Free Online Screen Recorder (No Watermark)</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Capture full screen, specific window, or browser tab with optional audio. Zero watermarks and no installation.
          </p>
        </div>

        {recordingState === 'idle' && (
          <button
            type="button"
            onClick={startRecording}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-sm font-bold cursor-pointer transition-colors shadow-lg shadow-rose-600/20"
          >
            <CircleDot className="w-4 h-4 animate-pulse" />
            Start Screen Recording
          </button>
        )}
      </div>

      {(recordingState === 'recording' || recordingState === 'paused') && (
        <div className="p-10 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center space-y-6">
          <div className="flex items-center justify-center gap-2">
            <div className={`w-3 h-3 rounded-full ${recordingState === 'recording' ? 'bg-red-500 animate-ping' : 'bg-amber-500'}`} />
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              {recordingState === 'recording' ? 'Recording live stream' : 'Recording paused'}
            </span>
          </div>

          <div className="text-5xl font-mono font-extrabold text-gray-900 dark:text-white">
            {formatTime(duration)}
          </div>

          <div className="flex items-center justify-center gap-3">
            {recordingState === 'recording' ? (
              <button
                type="button"
                onClick={pauseRecording}
                className="px-5 py-2.5 rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-white/20 text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5"
              >
                <Pause className="w-4 h-4" /> Pause
              </button>
            ) : (
              <button
                type="button"
                onClick={resumeRecording}
                className="px-5 py-2.5 rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-white/20 text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5"
              >
                <Play className="w-4 h-4" /> Resume
              </button>
            )}

            <button
              type="button"
              onClick={stopRecording}
              className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-xs font-bold text-white flex items-center gap-1.5"
            >
              <Square className="w-4 h-4 fill-current" /> Stop Recording
            </button>
          </div>
        </div>
      )}

      {recordingState === 'finished' && recordedUrl && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-gray-100 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 flex items-center justify-center min-h-[340px] overflow-hidden">
            <video
              src={recordedUrl}
              controls
              className="max-h-[440px] max-w-full rounded-xl"
              playsInline
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Duration: {formatTime(duration)} ({formatBytes(recordedSize)}) · 100% Client-side
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <a
                href={recordedUrl}
                download="screen-recording.webm"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download Recording
              </a>

              <button
                type="button"
                onClick={handleReset}
                className="px-4 py-3 rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-white/20 text-gray-600 dark:text-gray-300 font-bold text-sm flex items-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" /> Record Again
              </button>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-xl bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs text-center border border-red-500/20">
          {error}
        </div>
      )}
    </div>
  );
}
