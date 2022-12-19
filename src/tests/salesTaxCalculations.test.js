import { roundNumber, getSalesTaxes } from '../js/taxes/index.js';
import describe from './utils/index.js';
import {
  allTaxExempt,
  importedBasicTaxExempt,
  nonBasicTaxExempt,
  importedNonBasicTaxExempt,
} from './data/itemsCases.js';

describe('Tax calculations', {
  'should calculate the correct taxes for items with all tax exempt': () => {
    const taxes = getSalesTaxes(allTaxExempt);

    return {
      value: taxes,
      expected: 0,
    };
  },
  'should calculate the correct taxes for imported items with basic tax exempt': () => {
    const taxes = getSalesTaxes(importedBasicTaxExempt);

    return {
      value: taxes,
      expected: roundNumber(importedBasicTaxExempt.unitPrice * 0.05),
    };
  },
  'should calculate the correct taxes for items non exempt from basic sales tax': () => {
    const taxes = getSalesTaxes(nonBasicTaxExempt);

    return {
      value: taxes,
      expected: roundNumber(nonBasicTaxExempt.unitPrice * 0.1),
    };
  },
  'should calculate the correct taxes for imported items non exempt from basic sales tax': () => {
    const taxes = getSalesTaxes(importedNonBasicTaxExempt);

    return {
      value: taxes,
      expected: roundNumber(importedNonBasicTaxExempt.unitPrice * 0.15),
    };
  },
});
