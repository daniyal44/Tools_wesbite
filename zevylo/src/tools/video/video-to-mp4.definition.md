# Video to MP4 Converter Tool

## Overview
Converts video files to MP4 format using FFmpeg. Supports various input formats output to MP4.

## Key Features
- **Format conversion**: Convert videos from WebM, AVI, MOV, MKV to MP4
- **Quality presets**: Multiple quality options (low, medium, high)
- **Progress indication**: Visual progress during conversion
- **Download link**: Export converted MP4 file

## Technical Details
- **Location**: `src/tools/video/video-to-mp4.definition.ts`, `src/tools/video/video-to-mp4.tsx`
- **Dependencies**: 
  - `@ffmpeg/ffmpeg` - FFmpeg core library
  - `@ffmpeg/util` - FFmpeg utilities
  - `react`, `react-dom`
- **Component Type**: Client-side video format conversion

## Performance Considerations
- MP4 conversion is CPU-intensive; code-split for on-demand loading
- Large files may cause main thread blocking; consider worker threads
- Recommended to show loading state during conversion

## Usage
```tsx
import { VideoToMP4 } from '@/tools/video/video-to-mp4.definition'

<VideoToMP4 videoId={params.id} quality="high" />
```