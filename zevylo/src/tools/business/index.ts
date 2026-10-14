import { ToolDefinition } from '@/lib/tools/types';
import { registerTools } from '@/lib/tools/registry';
import { resumeCvBuilderDefinition } from './resume-cv-builder.definition';
import { priceEstimatorDefinition } from './price-estimator.definition';

export const businessTools: ToolDefinition[] = [
  resumeCvBuilderDefinition,
  priceEstimatorDefinition,
];

registerTools(businessTools);

export {
  resumeCvBuilderDefinition,
  priceEstimatorDefinition,
};
