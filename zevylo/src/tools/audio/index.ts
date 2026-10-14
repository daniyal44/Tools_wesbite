import { tapBpmDefinition } from './tap-bpm.definition';
import { metronomeDefinition } from './metronome.definition';
import { toneGeneratorDefinition } from './tone-generator.definition';
import { pianoChordsDefinition } from './piano-chords.definition';
import { textToSpeechDefinition } from './text-to-speech.definition';
import { voiceToTextDefinition } from './voice-to-text.definition';
import { audioTrimmerDefinition } from './audio-trimmer.definition';
import { audioSpeedChangerDefinition } from './audio-speed-changer.definition';
import { registerTools } from '@/lib/tools/registry';

export const audioTools = [
  tapBpmDefinition,
  metronomeDefinition,
  toneGeneratorDefinition,
  pianoChordsDefinition,
  textToSpeechDefinition,
  voiceToTextDefinition,
  audioTrimmerDefinition,
  audioSpeedChangerDefinition,
];

registerTools(audioTools);

export {
  tapBpmDefinition,
  metronomeDefinition,
  toneGeneratorDefinition,
  pianoChordsDefinition,
  textToSpeechDefinition,
  voiceToTextDefinition,
  audioTrimmerDefinition,
  audioSpeedChangerDefinition,
};

