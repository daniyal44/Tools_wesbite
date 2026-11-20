# Crop Video Tool

## Overview
Crops video to remove unwanted areas and focus on specific regions. Useful for removing black bars, adjusting aspect ratio, or focusing on subject matter.

## Key Features
- **Aspect ratio presets**: Quick crop to common ratios (16:9, 4:3, 1:1, 9:16)
- **Custom dimensions**: Specify exact crop width and height
- **Drag-and-select**: Interactive crop selection (if UI includes this)
- **Preview**: Preview cropped video before exporting
- **Export**: Save cropped video file

## Technical Details
- **Location**: `src/tools/video/crop-video.definition.ts`, `src/tools/video/crop-video.tsx`
- **Dependencies**: 
  - `@ffmpeg/ffmpeg` - FFmpeg core library
  - `@ffmpeg/util` - FFmpeg utilities
  - `react`, `react-dom`
- **Component Type**: Client-side video cropping

## Performance Considerations
- Cropping is a moderate FFmpeg operation
- Key factor: output resolution affects file size and processing time
- Maintains original quality within cropped area
- Code-split for lazy loading recommended

## Usage
```tsx
import { CropVideo } from '@/tools/video/crop-video.definition'

<CropVideo videoId={params.id} 
           width={1920} 
           height={1080} 
           x={0} 
           y={0} />
```