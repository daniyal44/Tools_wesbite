# MP4 to MP3 Converter Tool

## Overview
Extracts audio from MP4 video files and saves as MP3 audio format. Commonly used for extracting soundtracks or creating audio versions of videos.

## Key Features
- **Audio extraction**: Extract audio track from MP4 video
- **Quality selection**: Choose MP3 bitrate (128kbps, 192kbps, 320kbps)
- **Trimming**: Select audio segment to extract
- **Download**: Export MP3 file for download

## Technical Details
- **Location**: `src/tools/video/mp4-to-mp3.definition.ts`, `src/tools/video/mp4-to-mp3.tsx`
- **Dependencies**: 
  - `@ffmpeg/ffmpeg` - FFmpeg core library
  - `@ffmpeg/util` - FFmpeg utilities
  - `react`, `react-dom`
- **Component Type**: Client-side audio extraction

## Performance Considerations
- Audio extraction is less CPU-intensive than video processing
- Still code-split for lazy loading
- Bitrate selection impacts final file size

## Usage
```tsx
import { MP4ToMP3 } from '@/tools/video/mp4-to-mp3.definition'

<MP4ToMP3 videoId={params.id} bitrate="320kbps" />
```