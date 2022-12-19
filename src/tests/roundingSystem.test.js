import { roundNumber } from '../js/taxes/index.js';
import describe from './utils/index.js';

describe('Rounding system', {
  'should round up to the nearest 0.05': () => {
    const roundedNumber = roundNumber(1.01);

    return {
      value: roundedNumber,
      expected: 1.05,
    };
  },
  'should round up to the nearest 0.05 even if the number is less than 1': () => {
    const roundedNumber = roundNumber(0.5625);

    return {
      value: roundedNumber,
      expected: 0.6,
    };
  },
  'should not round up if the number is already rounded': () => {
    const roundedNumber = roundNumber(1.05);

    return {
      value: roundedNumber,
      expected: 1.05,
    };
  },
  'should not round up if the number does not have decimals': () => {
    const roundedNumber = roundNumber(1);

    return {
      value: roundedNumber,
      expected: 1,
    };
  },
});
