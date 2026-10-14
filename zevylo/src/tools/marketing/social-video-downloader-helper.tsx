'use client';

import React, { useState, useMemo } from 'react';
import { Video, Download, Copy, Check, Terminal, ShieldAlert } from 'lucide-react';

export default function SocialVideoDownloaderHelper() {
  const [videoUrl, setVideoUrl] = useState<string>('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyText = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const parsedInfo = useMemo(() => {
    const raw = videoUrl.trim();
    if (!raw) return null;

    let platform = 'Unknown Web Video';
    let videoId = '';
    let thumbnail = '';

    if (raw.includes('youtube.com') || raw.includes('youtu.be')) {
      platform = 'YouTube';
      const ytMatch = raw.match(/(?:youtu\.be\/|v=|\/embed\/|shorts\/)([a-zA-Z0-9_-]{11})/);
      if (ytMatch && ytMatch[1]) {
        videoId = ytMatch[1];
        thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
      }
    } else if (raw.includes('tiktok.com')) {
      platform = 'TikTok';
      const ttMatch = raw.match(/video\/([0-9]+)/);
      if (ttMatch) videoId = ttMatch[1];
    } else if (raw.includes('instagram.com')) {
      platform = 'Instagram (Reel/Post)';
      const igMatch = raw.match(/(?:reel|p)\/([a-zA-Z0-9_-]+)/);
      if (igMatch) videoId = igMatch[1];
    } else if (raw.includes('facebook.com') || raw.includes('fb.watch')) {
      platform = 'Facebook Video';
    } else if (raw.includes('twitter.com') || raw.includes('x.com')) {
      platform = 'X (Twitter)';
    }

    const ytdlpCommand = `yt-dlp -f "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best" "${raw}"`;
    const ytdlpAudioCommand = `yt-dlp -x --audio-format mp3 "${raw}"`;

    return {
      platform,
      videoId,
      thumbnail,
      rawUrl: raw,
      ytdlpCommand,
      ytdlpAudioCommand,
    };
  }, [videoUrl]);

  return (
    <div className="space-y-8">
      {/* URL Input */}
      <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-4">
        <label className="block text-sm font-semibold text-gray-700 dark:text-zinc-200">
          Paste Social Video URL (YouTube, TikTok, Instagram, Facebook, X)
        </label>
        <div className="flex gap-2">
          <input
            type="url"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=... or https://www.tiktok.com/@user/video/..."
            className="flex-1 px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-amber-500/50"
          />
          {videoUrl && (
            <button
              onClick={() => setVideoUrl('')}
              className="px-4 py-3 rounded-xl bg-white dark:bg-gray-900 hover:bg-white/10 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:text-white text-xs font-semibold"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {parsedInfo && (
        <div className="space-y-6">
          {/* Platform Identification Badge */}
          <div className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
                <Video className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">{parsedInfo.platform} Detected</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 break-all">{parsedInfo.rawUrl}</p>
              </div>
            </div>
            {parsedInfo.videoId && (
              <span className="text-xs font-mono px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-800">
                ID: {parsedInfo.videoId}
              </span>
            )}
          </div>

          {/* YouTube Thumbnail Downloader */}
          {parsedInfo.thumbnail && (
            <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-gray-900 dark:text-white">Full HD (1080p) Cover Thumbnail</h3>
                <a
                  href={parsedInfo.thumbnail}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-white/10 hover:bg-white/20 text-gray-900 dark:text-white text-xs font-semibold transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  Open High-Res Image
                </a>
              </div>
              <div className="relative aspect-video max-w-md rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-black">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={parsedInfo.thumbnail}
                  alt="Video thumbnail preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}

          {/* Lossless CLI Download Command (yt-dlp) */}
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-4">
            <div className="flex items-center gap-2">
              <Terminal className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-bold text-gray-900 dark:text-white">Lossless Direct Video Downloader (Free & Safe)</h3>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Third-party ad-ridden download websites inject malicious popups and compress your video. Use the open-source industry standard <code className="text-emerald-400">yt-dlp</code> tool directly on your device with 1 click:
            </p>

            <div className="space-y-3">
              <div className="p-3.5 rounded-xl bg-black/50 border border-gray-200 dark:border-gray-800 flex items-center justify-between gap-4">
                <div className="overflow-x-auto text-xs font-mono text-gray-600 dark:text-gray-300">
                  <span className="text-emerald-400 font-bold"># Highest Quality Video (4K/1080p MP4)</span>
                  <div className="text-gray-900 dark:text-white mt-1">{parsedInfo.ytdlpCommand}</div>
                </div>
                <button
                  onClick={() => copyText('video-cmd', parsedInfo.ytdlpCommand)}
                  className="shrink-0 p-2 rounded-lg bg-gray-100 dark:bg-white/10 hover:bg-white/20 text-gray-900 dark:text-white transition-colors"
                  title="Copy command"
                >
                  {copiedKey === 'video-cmd' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="p-3.5 rounded-xl bg-black/50 border border-gray-200 dark:border-gray-800 flex items-center justify-between gap-4">
                <div className="overflow-x-auto text-xs font-mono text-gray-600 dark:text-gray-300">
                  <span className="text-sky-400 font-bold"># Audio Only (Lossless MP3)</span>
                  <div className="text-gray-900 dark:text-white mt-1">{parsedInfo.ytdlpAudioCommand}</div>
                </div>
                <button
                  onClick={() => copyText('audio-cmd', parsedInfo.ytdlpAudioCommand)}
                  className="shrink-0 p-2 rounded-lg bg-gray-100 dark:bg-white/10 hover:bg-white/20 text-gray-900 dark:text-white transition-colors"
                  title="Copy command"
                >
                  {copiedKey === 'audio-cmd' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Privacy & Safety Notice */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3 text-xs text-amber-200">
            <ShieldAlert className="w-5 h-5 shrink-0 text-amber-400 mt-0.5" />
            <div>
              <strong className="block font-semibold mb-1 text-amber-300">Client-Side Privacy Guarantee</strong>
              Zevylo parses links directly in your browser. We never track your URLs, store your video history, or proxy your IP address. Always respect copyright and content creators terms of service when saving public educational media.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
