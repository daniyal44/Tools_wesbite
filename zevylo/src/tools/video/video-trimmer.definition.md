# Video Trimmer Tool

## Overview
A video trimming tool that allows users to cut and trim video files. Built with React and FFmpeg integration.

## Key Features
- **Trim video**: Select start and end points to trim video segments
- **Preview**: Real-time preview of trimmed segments
- **Multiple formats**: Support for various video formats via FFmpeg
- **Download**: Export trimmed video as downloadable file

## Technical Details
- **Location**: `src/tools/video/video-trimmer.definition.ts`, `src/tools/video/video-trimmer.tsx`
- **Dependencies**: 
  - `@ffmpeg/ffmpeg` - FFmpeg core library
  - `@ffmpeg/util` - FFmpeg utilities
  - `react` 
  - `react-dom`
- **Component Type**: Client-side video processing

## API Endpoints (if applicable)
- None (client-side processing with FFmpeg)

## Performance Considerations
- FFmpeg initialization can be heavy; consider code-splitting
- Video processing happens client-side; monitor main thread blocking
- Recommended to lazy-load this component

## Usage
```tsx
import { VideoTrimmer } from '@/tools/video/video-trimmer.definition'

// Usage in a page or component
<VideoTrimmer videoId={params.id} />
```