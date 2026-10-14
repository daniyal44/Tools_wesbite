'use client';

import React from 'react';
import VideoFrameExtractor from './_shared/video-frame-extractor';

export default function VideoToPng() {
  return (
    <VideoFrameExtractor
      toolSlug="video-to-png"
      toolTitle="Video to PNG Converter (Lossless Frame Extractor)"
      toolDescription="Extract lossless, crystal-clear PNG frame sequences and image snapshots from MP4, WebM, MOV, and AVI videos. Zero compression artifacts, maximum pixel fidelity, instant frame copy, and batch ZIP export."
      badgeTitle="Lossless PNG Frame Studio"
      defaultFormat="png"
      lockFormat={true}
    />
  );
}
