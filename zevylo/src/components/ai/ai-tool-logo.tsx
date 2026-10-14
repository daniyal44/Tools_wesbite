'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface AIToolLogoProps {
  name: string;
  slug: string;
  url: string;
  logoUrl?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8 rounded-xl text-xs',
  md: 'w-12 h-12 rounded-2xl text-base',
  lg: 'w-14 h-14 rounded-2xl text-lg',
  xl: 'w-20 h-20 rounded-3xl text-3xl',
};

const iconPixelSizes = {
  sm: 24,
  md: 32,
  lg: 40,
  xl: 56,
};

// Top Tier AI Brands with Official Vector SVGs
function renderOfficialSVG(rawSlug: string, pixelSize: number): React.ReactNode | null {
  const s = pixelSize;
  const slug = rawSlug.toLowerCase();

  // 1. Google Gemini
  if (slug.includes('gemini') || slug === 'google-gemini') {
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="gemini-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1BA1E3" />
            <stop offset="45%" stopColor="#5B7FFF" />
            <stop offset="75%" stopColor="#9B72CB" />
            <stop offset="100%" stopColor="#D96570" />
          </linearGradient>
          <radialGradient id="gemini-center" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#5B7FFF" stopOpacity="0" />
          </radialGradient>
        </defs>
        <path
          d="M24 0C24 13.255 13.255 24 0 24C13.255 24 24 34.745 24 48C24 34.745 34.745 24 48 24C34.745 24 24 13.255 24 0Z"
          fill="url(#gemini-grad-1)"
        />
        <circle cx="24" cy="24" r="10" fill="url(#gemini-center)" />
      </svg>
    );
  }

  // 2. OpenAI / ChatGPT / Sora / DALL-E
  if (slug.includes('chatgpt') || slug.includes('openai') || slug.includes('dall-e') || slug.includes('sora') || slug.includes('searchgpt')) {
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M42.5 20.3a11.9 11.9 0 0 0-.9-9.1 12.1 12.1 0 0 0-10.9-6.3 12 12 0 0 0-3.6.5A12 12 0 0 0 17.5 2a12.1 12.1 0 0 0-11.6 8.7 11.9 11.9 0 0 0 2 12.5 12 12 0 0 0-.9 9.1 12.1 12.1 0 0 0 10.9 6.3c1.2 0 2.4-.2 3.6-.5a12 12 0 0 0 9.6 3.4 12.1 12.1 0 0 0 11.6-8.7 11.9 11.9 0 0 0-2-12.5h.2v.001ZM24 28a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z"
          fill="#10A37F"
        />
      </svg>
    );
  }

  // 3. Anthropic Claude
  if (slug.includes('claude') || slug.includes('anthropic')) {
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="23" fill="#D97757" />
        <path
          d="M25.5 10L27 19.5L36.5 17L30 24L37 29L27.5 28L25.5 38L22.5 28.5L13 31L19.5 24L12.5 19L22 20L25.5 10Z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // 4. Midjourney
  if (slug.includes('midjourney')) {
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="14" fill="#0E1117" />
        <path
          d="M24 10L36 34H12L24 10Z"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path
          d="M24 10V34M12 34C16 38 32 38 36 34"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  // 5. Perplexity
  if (slug.includes('perplexity')) {
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="14" fill="#20B2AA" fillOpacity="0.15" />
        <path
          d="M24 8V40M13 13L35 35M8 24H40M13 35L35 13"
          stroke="#20B2AA"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <circle cx="24" cy="24" r="6" fill="#20B2AA" />
      </svg>
    );
  }

  // 6. DeepSeek
  if (slug.includes('deepseek')) {
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="14" fill="#1E88E5" fillOpacity="0.12" />
        <path
          d="M10 26C12 18 20 12 32 12C38 12 40 14 40 16C40 22 36 32 26 34C18 36 12 34 8 28C12 28 16 30 20 28"
          stroke="#1E88E5"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M32 12L42 8C40 12 40 16 42 20L36 16"
          fill="#1E88E5"
        />
        <circle cx="20" cy="20" r="2.5" fill="#1E88E5" />
      </svg>
    );
  }

  // 7. Cursor
  if (slug.includes('cursor')) {
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="14" fill="#000000" />
        <path
          d="M24 10L37 17.5V32.5L24 40L11 32.5V17.5L24 10Z"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <path
          d="M24 10V25M37 17.5L24 25M11 17.5L24 25"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  // 8. GitHub Copilot
  if (slug.includes('copilot')) {
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="14" fill="#6E40C9" fillOpacity="0.15" />
        <path
          d="M12 20C12 15 17 12 24 12C31 12 36 15 36 20V28C36 33 31 36 24 36C17 36 12 33 12 28V20Z"
          stroke="#6E40C9"
          strokeWidth="3"
          fill="#FFFFFF"
        />
        <ellipse cx="19" cy="24" rx="2.5" ry="3.5" fill="#6E40C9" />
        <ellipse cx="29" cy="24" rx="2.5" ry="3.5" fill="#6E40C9" />
        <path d="M19 12V8M29 12V8" stroke="#6E40C9" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }

  // 9. Runway
  if (slug.includes('runway')) {
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="14" fill="#111111" />
        <path
          d="M16 12H27C31.5 12 34 14.5 34 18.5C34 22.5 31.5 25 27 25H20V36H16V12ZM20 21.5H26.5C28.8 21.5 30 20.3 30 18.5C30 16.7 28.8 15.5 26.5 15.5H20V21.5ZM26 25L34 36H29L21.5 25.5L26 25Z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // 10. ElevenLabs
  if (slug.includes('elevenlabs') || slug.includes('eleven-labs')) {
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="14" fill="#000000" />
        <rect x="18" y="12" width="4" height="24" rx="2" fill="#FFFFFF" />
        <rect x="26" y="12" width="4" height="24" rx="2" fill="#FFFFFF" />
      </svg>
    );
  }

  // 11. Grok (xAI)
  if (slug.includes('grok') || slug.includes('xai')) {
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="14" fill="#000000" />
        <path d="M14 36L34 12" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" />
        <circle cx="16" cy="14" r="3" fill="#FFFFFF" />
        <circle cx="32" cy="34" r="3" fill="#FFFFFF" />
      </svg>
    );
  }

  // 12. Mistral
  if (slug.includes('mistral')) {
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="14" fill="#FA521E" fillOpacity="0.12" />
        <rect x="12" y="12" width="7" height="7" fill="#FA521E" />
        <rect x="29" y="12" width="7" height="7" fill="#FA521E" />
        <rect x="12" y="19" width="7" height="7" fill="#FA521E" />
        <rect x="19" y="19" width="10" height="7" fill="#FF8400" />
        <rect x="29" y="19" width="7" height="7" fill="#FA521E" />
        <rect x="19" y="26" width="10" height="7" fill="#FA521E" />
        <rect x="19" y="33" width="10" height="7" fill="#FA521E" />
      </svg>
    );
  }

  // 13. Meta Llama
  if (slug.includes('llama') || slug.includes('meta-llama')) {
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="meta-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0081FB" />
            <stop offset="100%" stopColor="#0064E0" />
          </linearGradient>
        </defs>
        <rect width="48" height="48" rx="14" fill="#0081FB" fillOpacity="0.12" />
        <path
          d="M33.5 18C30.5 18 28 20.5 25.5 23.5C23 20.5 20.5 18 17.5 18C12.5 18 9 22 9 27C9 32 12.5 36 17.5 36C20.5 36 23 33.5 25.5 30.5C28 33.5 30.5 36 33.5 36C38.5 36 42 32 42 27C42 22 38.5 18 33.5 18ZM17.5 32C14.5 32 12.5 29.5 12.5 27C12.5 24.5 14.5 22 17.5 22C19.5 22 21.5 23.5 23.5 26.5C22 29.5 20 32 17.5 32ZM33.5 32C31 32 29 29.5 27.5 26.5C29.5 23.5 31.5 22 33.5 22C36.5 22 38.5 24.5 38.5 27C38.5 29.5 36.5 32 33.5 32Z"
          fill="url(#meta-grad)"
        />
      </svg>
    );
  }

  // 14. Hugging Face
  if (slug.includes('hugging')) {
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="20" fill="#FFD21E" />
        <circle cx="18" cy="21" r="2.5" fill="#000000" />
        <circle cx="30" cy="21" r="2.5" fill="#000000" />
        <ellipse cx="14" cy="25" rx="2.5" ry="1.5" fill="#FF8C00" opacity="0.6" />
        <ellipse cx="34" cy="25" rx="2.5" ry="1.5" fill="#FF8C00" opacity="0.6" />
        <path d="M19 27C21 30 27 30 29 27" stroke="#000000" strokeWidth="2" strokeLinecap="round" />
        <path d="M8 26C10 24 14 28 16 30" stroke="#FF9900" strokeWidth="3" strokeLinecap="round" />
        <path d="M40 26C38 24 34 28 32 30" stroke="#FF9900" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  // 15. v0
  if (slug.includes('v0')) {
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="14" fill="#000000" />
        <path d="M24 12L36 34H12L24 12Z" fill="#FFFFFF" />
      </svg>
    );
  }

  // 16. Bolt
  if (slug.includes('bolt')) {
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="14" fill="#1C1917" />
        <path d="M26 8L12 26H24L20 40L36 22H24L26 8Z" fill="#FACC15" />
      </svg>
    );
  }

  // 17. Lovable
  if (slug.includes('lovable')) {
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="lovable-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EC4899" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
        <rect width="48" height="48" rx="14" fill="url(#lovable-grad)" />
        <path
          d="M24 34L15 25C12 22 12 17 15 14C18 11 23 11 24 15C25 11 30 11 33 14C36 17 36 22 33 25L24 34Z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // 18. Suno
  if (slug.includes('suno')) {
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="14" fill="#18181B" />
        <rect x="10" y="14" width="28" height="20" rx="3" stroke="#F43F5E" strokeWidth="2.5" />
        <circle cx="18" cy="24" r="3" fill="#F43F5E" />
        <circle cx="30" cy="24" r="3" fill="#F43F5E" />
        <path d="M18 24H30" stroke="#F43F5E" strokeWidth="2" />
      </svg>
    );
  }

  // 19. Udio
  if (slug.includes('udio')) {
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="14" fill="#7C3AED" />
        <path
          d="M16 16V26C16 30 19 33 24 33C29 33 32 30 32 26V16"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <circle cx="24" cy="24" r="2" fill="#FFFFFF" />
      </svg>
    );
  }

  // 20. Notion AI
  if (slug.includes('notion')) {
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="14" fill="#000000" />
        <path
          d="M15 14H20L30 28V14H34V34H29L19 20V34H15V14Z"
          fill="#FFFFFF"
        />
        <path d="M35 10L36 13L39 14L36 15L35 18L34 15L31 14L34 13L35 10Z" fill="#FBBF24" />
      </svg>
    );
  }

  // 21. Grammarly
  if (slug.includes('grammarly')) {
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="14" fill="#15C39A" fillOpacity="0.15" />
        <circle cx="24" cy="24" r="14" stroke="#15C39A" strokeWidth="3" />
        <path d="M24 16C29 16 32 20 32 24C32 29 28 32 24 32C19 32 16 28 16 24" stroke="#15C39A" strokeWidth="3" strokeLinecap="round" />
        <path d="M26 24H32" stroke="#15C39A" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }

  // 22. QuillBot
  if (slug.includes('quillbot')) {
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="14" fill="#48A742" fillOpacity="0.15" />
        <path
          d="M34 12C28 12 18 18 14 28L18 30C22 24 28 20 34 18V12Z"
          fill="#48A742"
        />
        <path d="M14 28L12 36L20 34" stroke="#48A742" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  // 23. Canva
  if (slug.includes('canva')) {
    return (
      <svg width={s} height={s} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="48" height="48" rx="14" fill="#00C4CC" />
        <path
          d="M28 16C20 16 16 22 16 28C16 33 19 36 24 36C29 36 32 33 33 29"
          stroke="#FFFFFF"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return null;
}

// Extract domain cleanly from URL
function getCleanDomain(rawUrl: string): string {
  try {
    const parsed = new URL(rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`);
    return parsed.hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
}

export function AIToolLogo({
  name,
  slug,
  url,
  logoUrl,
  size = 'md',
  className = '',
}: AIToolLogoProps) {
  const [imageError, setImageError] = useState(false);
  const pixelSize = iconPixelSizes[size];
  const sizeClass = sizeClasses[size];

  // 1. Check if official high-fidelity vector SVG exists
  const officialSVG = renderOfficialSVG(slug, pixelSize);
  if (officialSVG) {
    return (
      <div
        className={`flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${sizeClass} ${className}`}
      >
        {officialSVG}
      </div>
    );
  }

  // 2. High-resolution domain icon from verified sources
  const domain = getCleanDomain(url);
  const iconSrc = logoUrl || (domain ? `https://www.google.com/s2/favicons?domain=${domain}&sz=128` : '');

  if (iconSrc && !imageError) {
    return (
      <div
        className={`relative flex items-center justify-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm shrink-0 overflow-hidden transition-transform group-hover:scale-105 p-1.5 ${sizeClass} ${className}`}
      >
        <Image
          src={iconSrc}
          alt={`${name} Official Logo`}
          width={pixelSize}
          height={pixelSize}
          className="w-full h-full object-contain rounded-lg"
          onError={() => setImageError(true)}
          unoptimized
        />
      </div>
    );
  }

  // 3. Graceful Fallback: Polished brand gradient monogram
  const initial = name.charAt(0).toUpperCase();
  return (
    <div
      className={`bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-black flex items-center justify-center shrink-0 shadow-md transition-transform group-hover:scale-105 ${sizeClass} ${className}`}
    >
      {initial}
    </div>
  );
}
