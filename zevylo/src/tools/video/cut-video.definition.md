# Cut Video Tool

## Overview
Allows users to cut/slice video files into specific segments. Useful for extracting particular portions of longer videos.

## Key Features
- **Precise cutting**: Set exact start and end times for video segments
- **Multiple segments**: Cut multiple portions from one video
- **Preview**: Preview cuts before applying
- **Export**: Download cut segments individually or combined

## Technical Details
- **Location**: `src/tools/video/cut-video.definition.ts`, `src/tools/video/cut-video.tsx`
- **Dependencies**: 
  - `@ffmpeg/ffmpeg` - FFmpeg core library
  - `@ffmpeg/util` - FFmpeg utilities
  - `react`, `react-dom`
- **Component Type**: Client-side video cutting

## Performance Considerations
- Similar to video trimming; code-split for lazy loading
- Multiple cuts increase processing time
- User should be warned about large video files

## Usage
```tsx
import { CutVideo } from '@/tools/video/cut-video.definition'

<CutVideo videoId={params.id} 
          startTime="00:00:10" 
          endTime="00:00:30" />
```