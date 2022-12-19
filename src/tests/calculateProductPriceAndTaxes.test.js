import { calculateProductItemTaxes } from '../js/taxes/index.js';
import describe from './utils/index.js';
import {
  allTaxExempt,
  importedBasicTaxExempt,
  nonBasicTaxExempt,
  importedNonBasicTaxExempt,
} from './data/itemsCases.js';

describe('Product final value (price + taxes)', {
  'should calculate the correct final value for items with all tax exempt': () => {
    const [{ totalValue, unitPrice, quantity }] = calculateProductItemTaxes([allTaxExempt]);

    return {
      value: totalValue,
      expected: +Number(unitPrice * quantity).toFixed(2),
    };
  },
  'should calculate the correct final value for imported items with basic tax exempt': () => {
    const [{ totalValue, unitPrice, salesTaxes, quantity }] = calculateProductItemTaxes([
      importedBasicTaxExempt,
    ]);

    return {
      value: totalValue,
      expected: +Number((unitPrice + salesTaxes) * quantity).toFixed(2),
    };
  },
  'should calculate the correct final value for items non exempt from basic sales tax': () => {
    const [{ totalValue, unitPrice, salesTaxes, quantity }] = calculateProductItemTaxes([
      nonBasicTaxExempt,
    ]);

    return {
      value: totalValue,
      expected: +Number((unitPrice + salesTaxes) * quantity).toFixed(2),
    };
  },
  'should calculate the correct final value for imported items non exempt from basic sales tax':
    () => {
      const [{ totalValue, unitPrice, salesTaxes, quantity }] = calculateProductItemTaxes([
        importedNonBasicTaxExempt,
      ]);

      return {
        value: totalValue,
        expected: +Number((unitPrice + salesTaxes) * quantity).toFixed(2),
      };
    },
});
