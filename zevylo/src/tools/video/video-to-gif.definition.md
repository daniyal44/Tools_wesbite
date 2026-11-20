# Video to GIF Converter Tool

## Overview
Converts video files to animated GIF format. Useful for creating short loops from video content.

## Key Features
- **Video to GIF**: Convert any video segment to animated GIF
- **Frame rate control**: Adjust GIF frame rate for quality/size balance
- **Size trimming**: Crop video before conversion
- **Optimized output**: Automatic GIF optimization for smaller file size

## Technical Details
- **Location**: `src/tools/video/video-to-gif.definition.ts`, `src/tools/video/video-to-gif.tsx`
- **Dependencies**: 
  - `@ffmpeg/ffmpeg` - FFmpeg core library
  - `@ffmpeg/util` - FFmpeg utilities
  - `react`, `react-dom`
- **Component Type**: Client-side video-to-GIF conversion

## Performance Considerations
- GIF generation can be memory-intensive
- Frame rate selection significantly impacts final file size
- Consider limiting GIF duration for performance

## Usage
```tsx
import { VideoToGIF } from '@/tools/video/video-to-gif.definition'

<VideoToGIF videoId={params.id} fps={2} maxDuration={5} />
```