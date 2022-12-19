/**
 * Get a tax rate for a product item and round it up to the nearest 0.05
 *
 * @param {number} number
 * @returns {number}
 */
export const roundNumber = number => {
  // Example: 7.13 --> 713
  let num = Math.trunc(Math.round(number * 100));
  // 713 % 5 = 3
  const missingCents = num % 5;

  // We want to always round up to the nearest 0.05
  if (missingCents > 0) {
    num += 5 - missingCents;
  }

  return num / 100;
};

/**
 * Get the tax rate for a product item
 *
 * @param {*} productItem
 * @returns {Number}
 */
export const getSalesTaxes = productItem => {
  const { unitPrice, isImported, type } = productItem;

  const basicSaleTaxRate = ['book', 'food', 'medical'].includes(type.toLowerCase()) ? 0 : 0.1;
  const importTaxRate = isImported ? 0.05 : 0;

  const totalTaxRate = basicSaleTaxRate + importTaxRate;
  const tax = unitPrice * totalTaxRate;

  return roundNumber(tax);
};

/**
 * Get the sub-total, total and sales taxes of the current receipt
 *
 * @param {Array} productItems
 * @returns {Object}
 * */
export const getSummary = productItems => {
  const summary = productItems.reduce(
    (acc, item) => {
      acc.subTotal += item.quantity * item.unitPrice;
      acc.salesTaxes += item.quantity * item.salesTaxes;
      acc.total += item.totalValue;

      return acc;
    },
    { subTotal: 0, salesTaxes: 0, total: 0 }
  );

  return summary;
};

export const calculateProductItemTaxes = productItems => {
  const itemsWithTaxes = productItems.map(item => {
    const taxes = getSalesTaxes(item);

    return {
      ...item,
      salesTaxes: taxes,
      totalValue: +Number.parseFloat((item.unitPrice + taxes) * item.quantity).toFixed(2),
    };
  });

  return itemsWithTaxes;
};
