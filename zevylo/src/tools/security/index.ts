import { registerTools } from '@/lib/tools/registry';
import { passwordStrengthDefinition } from './password-strength.definition';
import { hmacGeneratorDefinition } from './hmac-generator.definition';

export const securityTools = [
  passwordStrengthDefinition,
  hmacGeneratorDefinition,
];

registerTools(securityTools);

export {
  passwordStrengthDefinition,
  hmacGeneratorDefinition,
};

