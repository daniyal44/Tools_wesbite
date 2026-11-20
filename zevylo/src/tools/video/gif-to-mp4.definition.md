# GIF to MP4 Converter Tool

## Overview
Converts animated GIF files to MP4 video format. Useful for reducing file size and improving compatibility.

## Key Features
- **GIF to MP4**: Convert animated GIFs to MP4 video format
- **Quality adjustment**: Select output quality and file size
- **Frame rate control**: Adjust MP4 frame rate from GIF source
- **Download link**: Export converted MP4 file

## Technical Details
- **Location**: `src/tools/video/gif-to-mp4.definition.ts`, `src/tools/video/gif-to-mp4.tsx`
- **Dependencies**: 
  - `@ffmpeg/ffmpeg` - FFmpeg core library
  - `@ffmpeg/util` - FFmpeg utilities
  - `react`, `react-dom`
- **Component Type**: Client-side GIF-to-MP4 conversion

## Performance Considerations
- GIFs with many frames can be large when converted
- Frame rate selection impacts final video size and smoothness
- Consider limiting GIF duration for better performance

## Usage
```tsx
import { GIFToMP4 } from '@/tools/video/gif-to-mp4.definition'

<GIFToMP4 gifId={params.id} fps={30} quality="high" />
```