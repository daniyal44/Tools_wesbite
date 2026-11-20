# Video to PNG Converter Tool

## Overview
Extracts PNG thumbnail images from video files at specified timestamps. Similar to JPG converter but outputs PNG format for lossless quality.

## Key Features
- **Timestamp-based extraction**: Extract PNG at specific video timestamps
- **Time range**: Extract PNGs across a time range with intervals
- **Multiple frames**: Extract multiple PNG frames at once
- **Resolution selection**: Choose thumbnail resolution
- **Lossless quality**: PNG format preserves original quality
- **Download**: Export extracted PNGs (possibly as ZIP archive)

## Technical Details
- **Location**: `src/tools/video/video-to-png.definition.ts`, `src/tools/video/video-to-png.tsx`
- **Dependencies**: 
  - `@ffmpeg/ffmpeg` - FFmpeg core library
  - `@ffmpeg/util` - FFmpeg utilities
  - `react`, `react-dom`
  - `jszip` (for multi-frame export as archive)
- **Component Type**: Client-side video-to-image extraction

## Performance Considerations
- Single frame extraction is fast
- PNG format produces larger files than JPG for same quality perception
- Multiple frames increase processing time
- Consider JPG for thumbnails, PNG for screenshots needing transparency/quality

## Usage
```tsx
import { VideoToPNG } from '@/tools/video/video-to-png.definition'

<VideoToPNG videoId={params.id} 
              timestamps={["00:00:01", "00:00:05"]} 
              resolution={1080} />
```