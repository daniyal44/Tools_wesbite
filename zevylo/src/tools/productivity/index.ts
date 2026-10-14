import { stlViewerDefinition } from './stl-viewer.definition';
import { sprintRetroBoardDefinition } from './sprint-retro-board.definition';
import { coinFlipDefinition } from './coin-flip.definition';
import { invoiceGeneratorDefinition } from './invoice-generator.definition';
import { signaturePadDefinition } from './signature-pad.definition';
import { bulkRenameDefinition } from './bulk-rename.definition';
import { pomodoroTimerDefinition } from './pomodoro-timer.definition';
import { registerTools } from '@/lib/tools/registry';

export const productivityTools = [
  stlViewerDefinition,
  sprintRetroBoardDefinition,
  coinFlipDefinition,
  invoiceGeneratorDefinition,
  signaturePadDefinition,
  bulkRenameDefinition,
  pomodoroTimerDefinition,
];

registerTools(productivityTools);

export {
  stlViewerDefinition,
  sprintRetroBoardDefinition,
  coinFlipDefinition,
  invoiceGeneratorDefinition,
  signaturePadDefinition,
  bulkRenameDefinition,
  pomodoroTimerDefinition,
};
