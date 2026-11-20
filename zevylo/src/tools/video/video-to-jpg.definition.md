# Video to JPG Converter Tool

## Overview
Extracts JPG thumbnail images from video files at specified timestamps. Useful for creating video previews or galleries.

## Key Features
- **Timestamp-based extraction**: Extract JPG at specific video timestamps
- **Time range**: Extract JPGs across a time range with intervals
- **Multiple frames**: Extract multiple frames at once
- **Resolution selection**: Choose thumbnail resolution
- **Download**: Export extracted JPGs

## Technical Details
- **Location**: `src/tools/video/video-to-jpg.definition.ts`, `src/tools/video/video-to-jpg.tsx`
- **Dependencies**: 
  - `@ffmpeg/ffmpeg` - FFmpeg core library
  - `@ffmpeg/util` - FFmpeg utilities
  - `react`, `react-dom`
- **Component Type**: Client-side video-to-image extraction

## Performance Considerations
- Single frame extraction is fast
- Multiple frames increase processing time proportionally
- Resolution selection impacts output file size significantly
- Code-split for on-demand loading recommended

## Usage
```tsx
import { VideoToJPG } from '@/tools/video/video-to-jpg.definition'

<VideoToJPG videoId={params.id} 
              timestamps={["00:00:01", "00:00:05"]} 
              resolution={360} />
```