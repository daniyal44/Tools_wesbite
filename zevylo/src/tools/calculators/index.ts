import { registerTools } from '@/lib/tools/registry';
import { percentageCalculatorDefinition } from './percentage-calculator.definition';
import { roiCalculatorDefinition } from './roi-calculator.definition';
import { profitMarginCalculatorDefinition } from './profit-margin-calculator.definition';
import { loanEmiCalculatorDefinition } from './loan-emi-calculator.definition';
import { compoundInterestCalculatorDefinition } from './compound-interest-calculator.definition';
import { salesTaxCalculatorDefinition } from './sales-tax-calculator.definition';
import { salaryCalculatorDefinition } from './salary-calculator.definition';
import { gpaCalculatorDefinition } from './gpa-calculator.definition';
import { fuelCostCalculatorDefinition } from './fuel-cost-calculator.definition';
import { dateDifferenceCalculatorDefinition } from './date-difference-calculator.definition';
import { tdeeCalculatorDefinition } from './tdee-calculator.definition';
import { scientificCalculatorDefinition } from './scientific-calculator.definition';
import { diceRollerDefinition } from './dice-roller.definition';
import { ageCalculatorDefinition } from './age-calculator.definition';
import { discountCalculatorDefinition } from './discount-calculator.definition';
import { tipCalculatorDefinition } from './tip-calculator.definition';
import { bmiCalculatorDefinition } from './bmi-calculator.definition';
import { stepsToDistanceDefinition } from './steps-to-distance.definition';
import { profitLossCalculatorDefinition } from './profit-loss-calculator.definition';
import { averageCalculatorDefinition } from './average-calculator.definition';
import { cryptoProfitCalculatorDefinition } from './crypto-profit-calculator.definition';
import { inflationCalculatorDefinition } from './inflation-calculator.definition';

export const calculatorTools = [
  percentageCalculatorDefinition,
  roiCalculatorDefinition,
  profitMarginCalculatorDefinition,
  loanEmiCalculatorDefinition,
  compoundInterestCalculatorDefinition,
  salesTaxCalculatorDefinition,
  salaryCalculatorDefinition,
  gpaCalculatorDefinition,
  fuelCostCalculatorDefinition,
  dateDifferenceCalculatorDefinition,
  tdeeCalculatorDefinition,
  scientificCalculatorDefinition,
  diceRollerDefinition,
  ageCalculatorDefinition,
  discountCalculatorDefinition,
  tipCalculatorDefinition,
  bmiCalculatorDefinition,
  stepsToDistanceDefinition,
  profitLossCalculatorDefinition,
  averageCalculatorDefinition,
  cryptoProfitCalculatorDefinition,
  inflationCalculatorDefinition,
];

registerTools(calculatorTools);

export {
  percentageCalculatorDefinition,
  roiCalculatorDefinition,
  profitMarginCalculatorDefinition,
  loanEmiCalculatorDefinition,
  compoundInterestCalculatorDefinition,
  salesTaxCalculatorDefinition,
  salaryCalculatorDefinition,
  gpaCalculatorDefinition,
  fuelCostCalculatorDefinition,
  dateDifferenceCalculatorDefinition,
  tdeeCalculatorDefinition,
  scientificCalculatorDefinition,
  diceRollerDefinition,
  ageCalculatorDefinition,
  discountCalculatorDefinition,
  tipCalculatorDefinition,
  bmiCalculatorDefinition,
  stepsToDistanceDefinition,
  profitLossCalculatorDefinition,
  averageCalculatorDefinition,
  cryptoProfitCalculatorDefinition,
  inflationCalculatorDefinition,
};

