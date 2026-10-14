'use client';

import React from 'react';
import VideoFrameExtractor from './_shared/video-frame-extractor';

export default function VideoToFrames() {
  return (
    <VideoFrameExtractor
      toolSlug="video-to-frames"
      toolTitle="Video to Frames Extractor (Multi-Format Sequence Studio)"
      toolDescription="Deconstruct any video into high-resolution JPG, PNG, or WebP picture sequences. Capture instant snapshots or batch extract hundreds of frames with custom time ranges, exact intervals, and 1-click ZIP export."
      badgeTitle="Video to JPG / Frame Extractor Pro"
      defaultFormat="jpg"
      lockFormat={false}
    />
  );
}
