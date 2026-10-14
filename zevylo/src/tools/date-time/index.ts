import { ToolDefinition } from '@/lib/tools/types';
import { registerTools } from '@/lib/tools/registry';
import { alarmClockTimerDefinition } from './alarm-clock-timer.definition';
import { birthdayCalculatorDefinition } from './birthday-calculator.definition';
import { countdownTimerDefinition } from './countdown-timer.definition';

export const dateTimeTools: ToolDefinition[] = [
  alarmClockTimerDefinition,
  birthdayCalculatorDefinition,
  countdownTimerDefinition,
];

registerTools(dateTimeTools);

export {
  alarmClockTimerDefinition,
  birthdayCalculatorDefinition,
  countdownTimerDefinition,
};
