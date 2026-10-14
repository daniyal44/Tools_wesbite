import { ToolDefinition } from '@/lib/tools/types';
import { registerTools } from '@/lib/tools/registry';
import { assignmentWritingHelperDefinition } from './assignment-writing-helper.definition';
import { handwritingGeneratorDefinition } from './handwriting-generator.definition';

export const educationTools: ToolDefinition[] = [
  assignmentWritingHelperDefinition,
  handwritingGeneratorDefinition,
];

registerTools(educationTools);

export {
  assignmentWritingHelperDefinition,
  handwritingGeneratorDefinition,
};
