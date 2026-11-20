# Video to Frames Converter Tool

## Overview
Extracts individual frames from video files as image outputs. Supports timestamp-based and time-range-based extraction.

## Key Features
- **Timestamp extraction**: Extract frames at specific timestamps
- **Time range**: Extract frames between start and end times
- **Batch extraction**: Multiple frames at intervals
- **Image output**: PNG, JPG, or WebP format selection
- **Download ZIP**: Export all frames as a compressed archive

## Technical Details
- **Location**: `src/tools/video/video-to-frames.definition.ts`, `src/tools/video/video-to-frames.tsx`
- **Dependencies**: 
  - `@ffmpeg/ffmpeg` - FFmpeg core library
  - `@ffmpeg/util` - FFmpeg utilities
  - `react`, `react-dom`
  - `jszip` (for archive creation)
- **Component Type**: Client-side frame extraction

## Performance Considerations
- Number of frames impacts processing time and memory
- Higher resolution frames = larger output files
- Consider limiting frame count for better performance

## Usage
```tsx
import { VideoToFrames } from '@/tools/video/video-to-frames.definition'

<VideoToFrames videoId={params.id} 
               format="png" 
               timestamps={["00:00:01", "00:00:05", "00:00:10"]} />
```