'use client';

import React from 'react';
import VideoFrameExtractor from './_shared/video-frame-extractor';

export default function VideoToJpg() {
  return (
    <VideoFrameExtractor
      toolSlug="video-to-jpg"
      toolTitle="Video to JPG Converter"
      toolDescription="Convert MP4, WebM, MOV, and AVI videos into high-quality JPEG picture sequences online for free. Set start/end time, customize extraction rate (every 0.1s to 10s), adjust JPEG compression quality, and download all frames as a single ZIP."
      badgeTitle="High-Resolution Frame Extractor"
      defaultFormat="jpg"
      lockFormat={true}
    />
  );
}
