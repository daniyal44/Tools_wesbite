'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Copy, Check, Download, RotateCcw, ShieldCheck } from 'lucide-react';

interface SpeechRecognitionEvent {
  resultIndex: number;
  results: {
    [key: number]: {
      [key: number]: {
        transcript: string;
      };
      isFinal: boolean;
      length: number;
    };
    length: number;
  };
}

interface SpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  abort: () => void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
}

export default function VoiceToText() {
  const [isListening, setIsListening] = useState<boolean>(false);
  const [transcript, setTranscript] = useState<string>('');
  const [interimText, setInterimText] = useState<string>('');
  const [language, setLanguage] = useState<string>('en-US');
  const [isSupported, setIsSupported] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  useEffect(() => {
    // Check Web Speech API support
    const SpeechRecognition =
      (window as unknown as { SpeechRecognition?: new () => SpeechRecognitionInstance }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: new () => SpeechRecognitionInstance }).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setTimeout(() => setIsSupported(false), 0);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = language;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let finalStr = '';
      let interimStr = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const item = event.results[i];
        if (item.isFinal) {
          finalStr += item[0].transcript + ' ';
        } else {
          interimStr += item[0].transcript;
        }
      }

      if (finalStr) {
        setTranscript((prev) => prev + finalStr);
      }
      setInterimText(interimStr);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
      setInterimText('');
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.abort();
    };
  }, [language]);

  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setInterimText('');
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(transcript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([transcript], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `voice-transcript-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const wordCount = transcript.trim() ? transcript.trim().split(/\s+/).length : 0;
  const charCount = transcript.length;

  return (
    <div className="space-y-8">
      {/* Top Banner & Language Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 items-end">
        <div className="sm:col-span-2">
          <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1.5 uppercase tracking-wider">
            Dictation Language
          </label>
          <select
            value={language}
            disabled={isListening}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-amber-500/50 disabled:opacity-50"
          >
            <option value="en-US">English (United States)</option>
            <option value="en-GB">English (United Kingdom)</option>
            <option value="es-ES">Spanish (Spain)</option>
            <option value="fr-FR">French (France)</option>
            <option value="de-DE">German (Germany)</option>
            <option value="ur-PK">Urdu (Pakistan)</option>
            <option value="hi-IN">Hindi (India)</option>
            <option value="ar-SA">Arabic (Saudi Arabia)</option>
            <option value="zh-CN">Chinese (Mandarin)</option>
            <option value="ja-JP">Japanese (Japan)</option>
          </select>
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={() => {
              setTranscript('');
              setInterimText('');
            }}
            disabled={isListening || !transcript}
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white dark:bg-gray-900 hover:bg-white/10 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:text-white text-xs font-semibold disabled:opacity-30"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Clear
          </button>
        </div>
      </div>

      {!isSupported ? (
        <div className="p-6 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-center space-y-2">
          <h3 className="text-base font-bold text-amber-300">Speech Recognition Not Supported</h3>
          <p className="text-xs text-amber-200/80">
            Your current browser does not support the Web Speech API. Please open this page in Google Chrome, Microsoft Edge, or Safari.
          </p>
        </div>
      ) : (
        /* Dictation Studio */
        <div className="p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center space-y-6">
          <div className="flex justify-center">
            <button
              onClick={toggleListening}
              className={`p-6 rounded-full transition-all duration-300 shadow-2xl ${
                isListening
                  ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse ring-8 ring-red-500/30'
                  : 'bg-amber-500 hover:bg-amber-400 text-black ring-8 ring-amber-500/20'
              }`}
            >
              {isListening ? <Mic className="w-10 h-10" /> : <MicOff className="w-10 h-10" />}
            </button>
          </div>

          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              {isListening ? 'Listening... Speak into your microphone' : 'Click the Microphone to Start Dictating'}
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Words are transcribed in real-time with automatic punctuation and language recognition.
            </p>
          </div>

          {/* Transcript Box */}
          <div className="p-6 rounded-2xl bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-left min-h-[220px] max-h-[400px] overflow-y-auto space-y-2 font-sans">
            <p className="text-sm text-zinc-100 whitespace-pre-wrap leading-relaxed">
              {transcript}
              <span className="text-amber-400 italic font-medium ml-1">{interimText}</span>
              {!transcript && !interimText && (
                <span className="text-zinc-600 italic">Transcribed voice text will appear here...</span>
              )}
            </p>
          </div>

          {/* Action Footer */}
          <div className="flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 font-mono">
              <span>{wordCount} words</span>
              <span>•</span>
              <span>{charCount} characters</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                disabled={!transcript}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-white/20 text-gray-900 dark:text-white text-xs font-semibold transition-colors disabled:opacity-30"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                Copy Text
              </button>

              <button
                onClick={handleDownload}
                disabled={!transcript}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-colors disabled:opacity-30 shadow-lg shadow-amber-500/20"
              >
                <Download className="w-3.5 h-3.5" />
                Download TXT
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Notice */}
      <div className="p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
        <span>100% Private Voice Dictation: Speech recognition is executed locally via your browser engine. We never record or save your audio data.</span>
      </div>
    </div>
  );
}
