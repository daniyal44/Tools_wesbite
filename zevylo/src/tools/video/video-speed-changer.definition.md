# Video Speed Changer Tool

## Overview
Changes video playback speed (slow motion, fast forward). Supports common speed multipliers and custom speed values.

## Key Features
- **Speed presets**: 0.5x, 0.75x, 1x, 1.25x, 1.5x, 2x speed options
- **Custom speed**: Enter custom speed multiplier
- **Audio pitch preservation**: Option to preserve or alter audio pitch
- **Preview**: Preview speed-changed video before exporting
- **Export**: Save speed-modified video

## Technical Details
- **Location**: `src/tools/video/video-speed-changer.definition.ts`, `src/tools/video/video-speed-changer.tsx`
- **Dependencies**: 
  - `@ffmpeg/ffmpeg` - FFmpeg core library
  - `@ffmpeg/util` - FFmpeg utilities
  - `react`, `react-dom`
- **Component Type**: Client-side video speed modification

## Performance Considerations
- Speed change is a relatively fast FFmpeg filter operation
- Still code-split for lazy loading
- Audio pitch preservation may add slight processing overhead

## Usage
```tsx
import { VideoSpeedChanger } from '@/tools/video/video-speed-changer.definition'

<VideoSpeedChanger videoId={params.id} speed={1.5} preservePitch={true} />
```