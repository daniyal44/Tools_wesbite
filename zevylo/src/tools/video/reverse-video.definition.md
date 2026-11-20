# Reverse Video Tool

## Overview
Reverses video playback, playing the video from end to start. Creative tool for video effects and editing.

## Key Features
- **Video reversal**: Play video backwards from end to start
- **Preview**: Preview reversed video before exporting
- **Speed control**: Option to reverse at normal or adjusted speed
- **Download**: Export reversed video file

## Technical Details
- **Location**: `src/tools/video/reverse-video.definition.ts`, `src/tools/video/reverse-video.tsx`
- **Dependencies**: 
  - `@ffmpeg/ffmpeg` - FFmpeg core library
  - `@ffmpeg/util` - FFmpeg utilities
  - `react`, `react-dom`
- **Component Type**: Client-side video reversal

## Performance Considerations
- Video reversal requires full processing; code-split for on-demand loading
- Can be CPU-intensive for longer videos
- User should be informed about processing time

## Usage
```tsx
import { ReverseVideo } from '@/tools/video/reverse-video.definition'

<ReverseVideo videoId={params.id} speed={1} />
```