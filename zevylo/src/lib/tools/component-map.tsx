'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const LoadingFallback = () => (
  <div className="flex h-64 w-full items-center justify-center rounded-xl border border-dashed border-gray-300 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
    <div className="flex flex-col items-center gap-3">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Loading tool...</span>
    </div>
  </div>
);

export const toolComponentMap: Record<string, React.ComponentType<object>> = {
  // Recently added
  'pomodoro-timer': dynamic(() => import('@/tools/productivity/pomodoro-timer'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'color-contrast-checker': dynamic(() => import('@/tools/color/color-contrast-checker'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'css-clamp-generator': dynamic(() => import('@/tools/developer/css-clamp-generator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'countdown-timer': dynamic(() => import('@/tools/date-time/countdown-timer'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  // Developer (added)
  'number-base-converter': dynamic(() => import('@/tools/developer/number-base-converter'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'csv-json-converter': dynamic(() => import('@/tools/developer/csv-json-converter'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'remove-duplicate-lines': dynamic(() => import('@/tools/text/remove-duplicate-lines'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'find-replace': dynamic(() => import('@/tools/text/find-replace'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'random-number-generator': dynamic(() => import('@/tools/generators/random-number-generator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'text-sorter': dynamic(() => import('@/tools/text/text-sorter'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'roman-numeral-converter': dynamic(() => import('@/tools/converters/roman-numeral-converter'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'whitespace-cleaner': dynamic(() => import('@/tools/text/whitespace-cleaner'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'text-repeater': dynamic(() => import('@/tools/text/text-repeater'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'markdown-previewer': dynamic(() => import('@/tools/text/markdown-previewer'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'number-to-words': dynamic(() => import('@/tools/converters/number-to-words'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'average-calculator': dynamic(() => import('@/tools/calculators/average-calculator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'xml-formatter': dynamic(() => import('@/tools/developer/xml-formatter'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  // Calculators
  'percentage-calculator': dynamic(() => import('@/tools/calculators/percentage-calculator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'profit-margin-calculator': dynamic(() => import('@/tools/calculators/profit-margin-calculator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'roi-calculator': dynamic(() => import('@/tools/calculators/roi-calculator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'loan-emi-calculator': dynamic(() => import('@/tools/calculators/loan-emi-calculator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'compound-interest-calculator': dynamic(() => import('@/tools/calculators/compound-interest-calculator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'sales-tax-calculator': dynamic(() => import('@/tools/calculators/sales-tax-calculator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'salary-calculator': dynamic(() => import('@/tools/calculators/salary-calculator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'gpa-calculator': dynamic(() => import('@/tools/calculators/gpa-calculator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'fuel-cost-calculator': dynamic(() => import('@/tools/calculators/fuel-cost-calculator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'date-difference-calculator': dynamic(() => import('@/tools/calculators/date-difference-calculator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'tdee-calculator': dynamic(() => import('@/tools/calculators/tdee-calculator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'scientific-calculator': dynamic(() => import('@/tools/calculators/scientific-calculator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'dice-roller': dynamic(() => import('@/tools/calculators/dice-roller'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'age-calculator': dynamic(() => import('@/tools/calculators/age-calculator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'discount-calculator': dynamic(() => import('@/tools/calculators/discount-calculator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'tip-calculator': dynamic(() => import('@/tools/calculators/tip-calculator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'bmi-calculator': dynamic(() => import('@/tools/calculators/bmi-calculator'), {
    ssr: false,
    loading: LoadingFallback,
  }),

  // Converters
  'data-size-converter': dynamic(() => import('@/tools/converters/data-size-converter'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'timestamp-converter': dynamic(() => import('@/tools/converters/timestamp-converter'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'unit-converter': dynamic(() => import('@/tools/converters/unit-converter'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'binary-text-converter': dynamic(() => import('@/tools/converters/binary-text-converter'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'rot13-encoder': dynamic(() => import('@/tools/converters/rot13-encoder'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'srt-to-vtt-converter': dynamic(() => import('@/tools/converters/srt-to-vtt-converter'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'morse-code-translator': dynamic(() => import('@/tools/converters/morse-code-translator'), {
    ssr: false,
    loading: LoadingFallback,
  }),

  // Developer
  'base64': dynamic(() => import('@/tools/developer/base64'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'hash-generator': dynamic(() => import('@/tools/developer/hash-generator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'json-formatter': dynamic(() => import('@/tools/developer/json-formatter'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'jwt-decoder': dynamic(() => import('@/tools/developer/jwt-decoder'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'regex-tester': dynamic(() => import('@/tools/developer/regex-tester'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'code-to-image': dynamic(() => import('@/tools/developer/code-to-image'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'json-to-typescript': dynamic(() => import('@/tools/developer/json-to-typescript'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'cron-generator': dynamic(() => import('@/tools/developer/cron-generator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'url-encoder': dynamic(() => import('@/tools/developer/url-encoder'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'html-entity-encoder': dynamic(() => import('@/tools/developer/html-entity-encoder'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'css-gradient-generator': dynamic(() => import('@/tools/developer/css-gradient-generator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'css-box-shadow-generator': dynamic(() => import('@/tools/developer/css-box-shadow-generator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'css-glassmorphism-generator': dynamic(() => import('@/tools/developer/css-glassmorphism-generator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'sql-formatter': dynamic(() => import('@/tools/developer/sql-formatter'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'yaml-json-converter': dynamic(() => import('@/tools/developer/yaml-json-converter'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'chmod-calculator': dynamic(() => import('@/tools/developer/chmod-calculator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'keycode-inspector': dynamic(() => import('@/tools/developer/keycode-inspector'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'code-minifier': dynamic(() => import('@/tools/developer/code-minifier'), {
    ssr: false,
    loading: LoadingFallback,
  }),

  // Generators
  'password-generator': dynamic(() => import('@/tools/generators/password-generator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'qr-code-generator': dynamic(() => import('@/tools/generators/qr-code-generator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'utm-builder': dynamic(() => import('@/tools/generators/utm-builder'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'uuid-generator': dynamic(() => import('@/tools/generators/uuid-generator'), {
    ssr: false,
    loading: LoadingFallback,
  }),

  // Images
  'image-compressor': dynamic(() => import('@/tools/images/image-compressor'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'sketch-canvas': dynamic(() => import('@/tools/images/sketch-canvas'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'aspect-ratio-calculator': dynamic(() => import('@/tools/images/aspect-ratio-calculator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'image-cropper': dynamic(() => import('@/tools/images/image-cropper'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'svg-to-png': dynamic(() => import('@/tools/images/svg-to-png'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'favicon-generator': dynamic(() => import('@/tools/images/favicon-generator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'meme-generator': dynamic(() => import('@/tools/images/meme-generator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'image-filters': dynamic(() => import('@/tools/images/image-filters'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'ascii-art-generator': dynamic(() => import('@/tools/images/ascii-art-generator'), {
    ssr: false,
    loading: LoadingFallback,
  }),

  // Image & file converters (Wave 1)
  'png-to-jpg': dynamic(() => import('@/tools/images/png-to-jpg'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'png-to-webp': dynamic(() => import('@/tools/images/png-to-webp'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'jpg-to-png': dynamic(() => import('@/tools/images/jpg-to-png'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'jpg-to-webp': dynamic(() => import('@/tools/images/jpg-to-webp'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'webp-to-png': dynamic(() => import('@/tools/images/webp-to-png'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'webp-to-jpg': dynamic(() => import('@/tools/images/webp-to-jpg'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'png-to-ico': dynamic(() => import('@/tools/images/png-to-ico'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'jpg-to-ico': dynamic(() => import('@/tools/images/jpg-to-ico'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'webp-to-ico': dynamic(() => import('@/tools/images/webp-to-ico'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'image-to-pdf': dynamic(() => import('@/tools/images/image-to-pdf'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'image-resizer': dynamic(() => import('@/tools/images/image-resizer'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'image-size-checker': dynamic(() => import('@/tools/images/image-size-checker'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'image-combiner': dynamic(() => import('@/tools/images/image-combiner'), {
    ssr: false,
    loading: LoadingFallback,
  }),

  // PDF
  'pdf-merge-split': dynamic(() => import('@/tools/pdf/pdf-merge-split'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'pdf-rotator': dynamic(() => import('@/tools/pdf/pdf-rotator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'pdf-to-text': dynamic(() => import('@/tools/pdf/pdf-to-text'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'pdf-watermark': dynamic(() => import('@/tools/pdf/pdf-watermark'), {
    ssr: false,
    loading: LoadingFallback,
  }),

  // Security
  'password-strength': dynamic(() => import('@/tools/security/password-strength'), {
    ssr: false,
    loading: LoadingFallback,
  }),

  // SEO
  'meta-tag-generator': dynamic(() => import('@/tools/seo/meta-tag-generator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'og-generator': dynamic(() => import('@/tools/seo/og-generator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'robots-txt-generator': dynamic(() => import('@/tools/seo/robots-txt-generator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'serp-preview': dynamic(() => import('@/tools/seo/serp-preview'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'keyword-density-analyzer': dynamic(() => import('@/tools/seo/keyword-density-analyzer'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'sitemap-generator': dynamic(() => import('@/tools/seo/sitemap-generator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'serp-pixel-checker': dynamic(() => import('@/tools/seo/serp-pixel-checker'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'twitter-card-preview': dynamic(() => import('@/tools/seo/twitter-card-preview'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'url-cleaner': dynamic(() => import('@/tools/seo/url-cleaner'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'hreflang-generator': dynamic(() => import('@/tools/seo/hreflang-generator'), {
    ssr: false,
    loading: LoadingFallback,
  }),

  // Text
  'case-converter': dynamic(() => import('@/tools/text/case-converter'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'text-diff': dynamic(() => import('@/tools/text/text-diff'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'word-counter': dynamic(() => import('@/tools/text/word-counter'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'lorem-ipsum-generator': dynamic(() => import('@/tools/text/lorem-ipsum-generator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'slug-generator': dynamic(() => import('@/tools/text/slug-generator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'readability-calculator': dynamic(() => import('@/tools/text/readability-calculator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'markdown-table-generator': dynamic(() => import('@/tools/text/markdown-table-generator'), {
    ssr: false,
    loading: LoadingFallback,
  }),

  // Audio
  'tap-bpm': dynamic(() => import('@/tools/audio/tap-bpm'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'metronome': dynamic(() => import('@/tools/audio/metronome'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'tone-generator': dynamic(() => import('@/tools/audio/tone-generator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'piano-chords': dynamic(() => import('@/tools/audio/piano-chords'), {
    ssr: false,
    loading: LoadingFallback,
  }),

  // Productivity
  'stl-viewer': dynamic(() => import('@/tools/productivity/stl-viewer'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'sprint-retro-board': dynamic(() => import('@/tools/productivity/sprint-retro-board'), {
    ssr: false,
    loading: LoadingFallback,
  }),

  // Color
  'color-converter': dynamic(() => import('@/tools/color/color-converter'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'color-palette-extractor': dynamic(() => import('@/tools/color/color-palette-extractor'), {
    ssr: false,
    loading: LoadingFallback,
  }),

  // Wave 2 additions
  'currency-converter': dynamic(() => import('@/tools/converters/currency-converter'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'timezone-converter': dynamic(() => import('@/tools/converters/timezone-converter'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'steps-to-distance': dynamic(() => import('@/tools/calculators/steps-to-distance'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'profit-loss-calculator': dynamic(() => import('@/tools/calculators/profit-loss-calculator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'barcode-generator': dynamic(() => import('@/tools/generators/barcode-generator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'stylish-text-generator': dynamic(() => import('@/tools/text/stylish-text-generator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'text-extractor': dynamic(() => import('@/tools/text/text-extractor'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'text-to-speech': dynamic(() => import('@/tools/audio/text-to-speech'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'coin-flip': dynamic(() => import('@/tools/productivity/coin-flip'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'color-generator': dynamic(() => import('@/tools/color/color-generator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'invoice-generator': dynamic(() => import('@/tools/productivity/invoice-generator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'signature-pad': dynamic(() => import('@/tools/productivity/signature-pad'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'hashtag-generator': dynamic(() => import('@/tools/seo/hashtag-generator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'image-comparator': dynamic(() => import('@/tools/images/image-comparator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'prompt-enhancer': dynamic(() => import('@/tools/developer/prompt-enhancer'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  // Video tools
  'video-to-frames': dynamic(() => import('@/tools/video/video-to-frames'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'video-to-jpg': dynamic(() => import('@/tools/video/video-to-jpg'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'video-to-png': dynamic(() => import('@/tools/video/video-to-png'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'video-compressor': dynamic(() => import('@/tools/video/video-compressor'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'video-trimmer': dynamic(() => import('@/tools/video/video-trimmer'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'video-quality-checker': dynamic(() => import('@/tools/video/video-quality-checker'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'video-to-gif': dynamic(() => import('@/tools/video/video-to-gif'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'gif-to-mp4': dynamic(() => import('@/tools/video/gif-to-mp4'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'rotate-video': dynamic(() => import('@/tools/video/rotate-video'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'reverse-video': dynamic(() => import('@/tools/video/reverse-video'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'video-speed-changer': dynamic(() => import('@/tools/video/video-speed-changer'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'mute-video': dynamic(() => import('@/tools/video/mute-video'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'screen-recorder': dynamic(() => import('@/tools/video/screen-recorder'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'crop-video': dynamic(() => import('@/tools/video/crop-video'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'video-to-mp4': dynamic(() => import('@/tools/video/video-to-mp4'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'mp4-to-mp3': dynamic(() => import('@/tools/video/mp4-to-mp3'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'cut-video': dynamic(() => import('@/tools/video/cut-video'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  // AI tools
  'ai-prompt-generator': dynamic(() => import('@/tools/ai/ai-prompt-generator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'ai-humanizer': dynamic(() => import('@/tools/ai/ai-humanizer'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'ai-content-detector': dynamic(() => import('@/tools/ai/ai-content-detector'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'ai-code-assistant': dynamic(() => import('@/tools/ai/ai-code-assistant'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'ai-sql-regex-generator': dynamic(() => import('@/tools/ai/ai-sql-regex-generator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'ai-social-hook-generator': dynamic(() => import('@/tools/ai/ai-social-hook-generator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'ai-story-generator': dynamic(() => import('@/tools/ai/ai-story-generator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'ai-business-name-generator': dynamic(() => import('@/tools/ai/ai-business-name-generator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'ai-article-writer': dynamic(() => import('@/tools/ai/ai-article-writer'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'geo-aeo-optimizer': dynamic(() => import('@/tools/ai/geo-aeo-optimizer'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'youtube-summarizer': dynamic(() => import('@/tools/ai/youtube-summarizer'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'ai-presentation-generator': dynamic(() => import('@/tools/ai/ai-presentation-generator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'ai-email-subject-line-generator': dynamic(() => import('@/tools/ai/ai-email-subject-line-generator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'ai-bio-generator': dynamic(() => import('@/tools/ai/ai-bio-generator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'ai-excel-formula-generator': dynamic(() => import('@/tools/ai/ai-excel-formula-generator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'ai-faq-schema-generator': dynamic(() => import('@/tools/ai/ai-faq-schema-generator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'color-palette-generator': dynamic(() => import('@/tools/color/color-palette-generator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'html-to-markdown': dynamic(() => import('@/tools/converters/html-to-markdown'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'slug-to-title-converter': dynamic(() => import('@/tools/text/slug-to-title-converter'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  // Marketing tools
  'youtube-tag-generator': dynamic(() => import('@/tools/marketing/youtube-tag-generator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'social-video-downloader-helper': dynamic(() => import('@/tools/marketing/social-video-downloader-helper'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'bulk-email-generator': dynamic(() => import('@/tools/marketing/bulk-email-generator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  // Business tools
  'resume-cv-builder': dynamic(() => import('@/tools/business/resume-cv-builder'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'price-estimator': dynamic(() => import('@/tools/business/price-estimator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  // Education tools
  'assignment-writing-helper': dynamic(() => import('@/tools/education/assignment-writing-helper'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'handwriting-generator': dynamic(() => import('@/tools/education/handwriting-generator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  // Date & Time tools
  'alarm-clock-timer': dynamic(() => import('@/tools/date-time/alarm-clock-timer'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'birthday-calculator': dynamic(() => import('@/tools/date-time/birthday-calculator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  // PDF & Audio & Image utilities
  'pdf-to-image': dynamic(() => import('@/tools/pdf/pdf-to-image'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'voice-to-text': dynamic(() => import('@/tools/audio/voice-to-text'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'image-background-remover': dynamic(() => import('@/tools/image/image-background-remover'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'gif-maker': dynamic(() => import('@/tools/image/gif-maker'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'exif-remover': dynamic(() => import('@/tools/image/exif-remover'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'image-to-datauri': dynamic(() => import('@/tools/image/image-to-datauri'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'jpg-to-pdf': dynamic(() => import('@/tools/images/jpg-to-pdf'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'avif-to-jpg': dynamic(() => import('@/tools/images/avif-to-jpg'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'heic-to-jpg': dynamic(() => import('@/tools/images/heic-to-jpg'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'bmp-to-png': dynamic(() => import('@/tools/images/bmp-to-png'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'bulk-image-converter': dynamic(() => import('@/tools/images/bulk-image-converter'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'bulk-rename': dynamic(() => import('@/tools/productivity/bulk-rename'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'crop-pdf': dynamic(() => import('@/tools/pdf/crop-pdf'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'view-metadata': dynamic(() => import('@/tools/image/view-metadata'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'lottie-to-gif': dynamic(() => import('@/tools/image/lottie-to-gif'), {
    ssr: false,
    loading: LoadingFallback,
  }),

  // PDF Suite (Search Engine Benchmark)
  'pdf-page-numberer': dynamic(() => import('@/tools/pdf/pdf-page-numberer'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'protect-pdf': dynamic(() => import('@/tools/pdf/protect-pdf'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'pdf-metadata-editor': dynamic(() => import('@/tools/pdf/pdf-metadata-editor'), {
    ssr: false,
    loading: LoadingFallback,
  }),

  // Developer & Security Suite
  'subnet-calculator': dynamic(() => import('@/tools/developer/subnet-calculator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'curl-to-fetch-converter': dynamic(() => import('@/tools/developer/curl-to-fetch-converter'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'hmac-generator': dynamic(() => import('@/tools/security/hmac-generator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'css-neumorphism-generator': dynamic(() => import('@/tools/developer/css-neumorphism-generator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'css-border-radius-generator': dynamic(() => import('@/tools/developer/css-border-radius-generator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'css-flexbox-playground': dynamic(() => import('@/tools/developer/css-flexbox-playground'), {
    ssr: false,
    loading: LoadingFallback,
  }),

  // Text & Reading Suite
  'bionic-reading-converter': dynamic(() => import('@/tools/text/bionic-reading-converter'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'upside-down-text-generator': dynamic(() => import('@/tools/text/upside-down-text-generator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'zalgo-glitch-text-generator': dynamic(() => import('@/tools/text/zalgo-glitch-text-generator'), {
    ssr: false,
    loading: LoadingFallback,
  }),

  // Finance & Inflation Calculators
  'crypto-profit-calculator': dynamic(() => import('@/tools/calculators/crypto-profit-calculator'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'inflation-calculator': dynamic(() => import('@/tools/calculators/inflation-calculator'), {
    ssr: false,
    loading: LoadingFallback,
  }),

  // Audio Suite
  'audio-trimmer': dynamic(() => import('@/tools/audio/audio-trimmer'), {
    ssr: false,
    loading: LoadingFallback,
  }),
  'audio-speed-changer': dynamic(() => import('@/tools/audio/audio-speed-changer'), {
    ssr: false,
    loading: LoadingFallback,
  }),
};


