# Screen Recorder Tool

## Overview
Records user screen or tab activity. Useful for creating video tutorials, demonstrations, or capturing gameplay.

## Key Features
- **Screen or tab selection**: Record entire screen or specific browser tab
- **Audio recording**: Option to capture system audio or microphone
- **Recording timer**: Shows duration during recording
- **Stop and export**: Stop recording and export as WebM/MP4 video

## Technical Details
- **Location**: `src/tools/video/screen-recorder.definition.ts`, `src/tools/video/screen-recorder.tsx`
- **Dependencies**: 
  - `react`, `react-dom`
  - MediaStream API (browser-native, no FFmpeg dependency)
  - `ffmpeg.js` optional for post-processing
- **Component Type**: Browser API-based recording

## Performance Considerations
- Screen recording is browser-native; lightweight initial load
- Large recordings consume memory; consider blob management
- Request permission gracefully with user prompt
- Optimize exported file size for web delivery

## Usage
```tsx
import { ScreenRecorder } from '@/tools/video/screen-recorder.definition'

<ScreenRecorder 
  onVideoReady={(blob) => { /* handle video blob */ }}
  audioSource="microphone" 
  videoSource="screen" />
```