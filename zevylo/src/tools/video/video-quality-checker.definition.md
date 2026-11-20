# Video Quality Checker Tool

## Overview
Analyzes video quality metrics and provides reports on video properties. Useful for assessing video before processing or uploading.

## Key Features
- **Video metadata**: Display resolution, duration, codec, bitrate, frame rate
- **Quality assessment**: Rate video quality (poor, fair, good, excellent)
- **Technical details**: Show all FFmpeg probe information
- **Compression suggestions**: Recommend optimal compression settings

## Technical Details
- **Location**: `src/tools/video/video-quality-checker.definition.ts`, `src/tools/video/video-quality-checker.tsx`
- **Dependencies**: 
  - `@ffmpeg/ffmpeg` - FFmpeg core library
  - `@ffmpeg/util` - FFmpeg utilities
  - `react`, `react-dom`
- **Component Type**: Client-side video analysis

## Performance Considerations
- Video metadata extraction is relatively fast
- Uses FFmpeg probe; code-split for on-demand loading
- No heavy processing; can load relatively early

## Usage
```tsx
import { VideoQualityChecker } from '@/tools/video/video-quality-checker.definition'

<VideoQualityChecker videoId={params.id} />
```