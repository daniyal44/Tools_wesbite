import { ToolDefinition } from '@/lib/tools/types';

export const srtToVttConverterDefinition: ToolDefinition = {
  id: 'srt-to-vtt-converter',
  slug: 'srt-to-vtt-converter',
  name: 'SRT to VTT & VTT to SRT Subtitle Converter',
  shortDescription: 'Convert video subtitle files between SubRip (.srt) and WebVTT (.vtt) formats online.',
  longDescription: 'Easily convert subtitle caption files for HTML5 video players, YouTube, and Vimeo. Converts SubRip comma timestamps (00:01:20,500) to WebVTT period timestamps (00:01:20.500) and vice versa with automatic WEBVTT header management and file download.',
  category: 'converters',
  icon: 'subtitles',
  keywords: ['srt to vtt', 'vtt to srt', 'subtitle converter', 'webvtt converter', 'caption converter', 'it-tools alternative'],
  searchableText: 'srt to vtt converter subtitle captions webvtt video timestamp vtt to srt download',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'SRT to VTT Converter — Convert Video Subtitles to WebVTT Online | Zevylo',
    description: 'Convert SRT to WebVTT (.vtt) subtitle files online. Fix timestamps and format captions for HTML5 video. Free and client-side.',
  },
  faq: [
    {
      question: 'What is the key difference between SRT and VTT subtitles?',
      answer: 'WebVTT files must start with the header line "WEBVTT" and use periods for milliseconds (00:00:01.000), whereas SRT files use commas (00:00:01,000) and require sequential number cues.',
    },
    {
      question: 'Can I upload an .srt file directly?',
      answer: 'Yes! Drag and drop or choose any .srt or .vtt file to convert and download the converted subtitle file in one click.',
    },
  ],
  relatedTools: ['lorem-ipsum-generator', 'slug-generator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 37,
  component: 'srt-to-vtt-converter',
};
