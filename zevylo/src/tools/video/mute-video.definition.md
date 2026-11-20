# Mute Video Tool

## Overview
Allows users to mute or unmute video files. Can remove audio track from video or add muted state.

## Key Features
- **Mute/Unmute**: Toggle audio on/off for videos
- **Audio removal**: Permanently remove audio track
- **Keep original**: Option to keep original audio track
- **Download**: Export muted video file

## Technical Details
- **Location**: `src/tools/video/mute-video.definition.ts`, `src/tools/video/mute-video.tsx`
- **Dependencies**: 
  - `@ffmpeg/ffmpeg` - FFmpeg core library
  - `@ffmpeg/util` - FFmpeg utilities
  - `react`, `react-dom`
- **Component Type**: Client-side video audio manipulation

## Performance Considerations
- Audio manipulation is relatively lightweight compared to full video conversion
- Still should be code-split and lazy-loaded
- User feedback during processing is important

## Usage
```tsx
import { MuteVideo } from '@/tools/video/mute-video.definition'

<MuteVideo videoId={params.id} mute={true} />
```