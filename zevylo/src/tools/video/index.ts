import { videoToFramesDefinition } from './video-to-frames.definition';
import { videoToJpgDefinition } from './video-to-jpg.definition';
import { videoToPngDefinition } from './video-to-png.definition';
import { videoCompressorDefinition } from './video-compressor.definition';
import { videoTrimmerDefinition } from './video-trimmer.definition';
import { videoQualityCheckerDefinition } from './video-quality-checker.definition';
import { videoToGifDefinition } from './video-to-gif.definition';
import { gifToMp4Definition } from './gif-to-mp4.definition';
import { rotateVideoDefinition } from './rotate-video.definition';
import { reverseVideoDefinition } from './reverse-video.definition';
import { videoSpeedChangerDefinition } from './video-speed-changer.definition';
import { muteVideoDefinition } from './mute-video.definition';
import { screenRecorderDefinition } from './screen-recorder.definition';
import { cropVideoDefinition } from './crop-video.definition';
import { videoToMp4Definition } from './video-to-mp4.definition';
import { mp4ToMp3Definition } from './mp4-to-mp3.definition';
import { cutVideoDefinition } from './cut-video.definition';
import { registerTools } from '@/lib/tools/registry';

export const videoTools = [
  videoToFramesDefinition,
  videoToJpgDefinition,
  videoToPngDefinition,
  videoCompressorDefinition,
  videoTrimmerDefinition,
  videoQualityCheckerDefinition,
  videoToGifDefinition,
  gifToMp4Definition,
  rotateVideoDefinition,
  reverseVideoDefinition,
  videoSpeedChangerDefinition,
  muteVideoDefinition,
  screenRecorderDefinition,
  cropVideoDefinition,
  videoToMp4Definition,
  mp4ToMp3Definition,
  cutVideoDefinition,
];

registerTools(videoTools);

export {
  videoToFramesDefinition,
  videoToJpgDefinition,
  videoToPngDefinition,
  videoCompressorDefinition,
  videoTrimmerDefinition,
  videoQualityCheckerDefinition,
  videoToGifDefinition,
  gifToMp4Definition,
  rotateVideoDefinition,
  reverseVideoDefinition,
  videoSpeedChangerDefinition,
  muteVideoDefinition,
  screenRecorderDefinition,
  cropVideoDefinition,
  videoToMp4Definition,
  mp4ToMp3Definition,
  cutVideoDefinition,
};
