# Rotate Video Tool

## Overview
Rotates video by specified angles (90°, 180°, 270°). Useful for correcting video orientation.

## Key Features
- **Angle selection**: Rotate 90°, 180°, or 270°
- **Custom angle**: Specify custom rotation angle
- **Preview**: Preview rotated video before exporting
- **Maintain quality**: Preserve video quality during rotation

## Technical Details
- **Location**: `src/tools/video/rotate-video.definition.ts`, `src/tools/video/rotate-video.tsx`
- **Dependencies**: 
  - `@ffmpeg/ffmpeg` - FFmpeg core library
  - `@ffmpeg/util` - FFmpeg utilities
  - `react`, `react-dom`
- **Component Type**: Client-side video rotation

## Performance Considerations
- Rotation is relatively fast FFmpeg operation
- Still code-split for lazy loading
- Maintains video quality without re-encoding when possible

## Usage
```tsx
import { RotateVideo } from '@/tools/video/rotate-video.definition'

<RotateVideo videoId={params.id} angle={90} />
```