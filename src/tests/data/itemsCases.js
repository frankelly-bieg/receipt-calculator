/*
  Taxes: 
    - Basic Sales Tax (10%)
      -> Exempt: Food, Medical, Books
    - Import Duty (5%)
      -> Exempt: None
*/

// This item is exempt from basic sales tax and it is not imported. Will not be charge any taxes
export const allTaxExempt = {
  id: '1671391472516',
  quantity: 3,
  type: 'food',
  description: 'boxes of chocolates',
  unitPrice: 11.25,
  isImported: false,
};

// Exempt from basic sales tax, but it is imported. Will be charge 5% on Import duty taxes
export const importedBasicTaxExempt = {
  id: '1671391472515',
  quantity: 3,
  type: 'food',
  description: 'boxes of chocolates',
  unitPrice: 11.25,
  isImported: true,
};

// Not exempt from basic sales tax, but it is not imported. Will be charge 10% on Basic sales tax
export const nonBasicTaxExempt = {
  id: '1671391413630',
  quantity: 1,
  type: 'other',
  description: 'bottle of perfume',
  unitPrice: 18.99,
  isImported: false,
};

// Not exempt from basic sales tax, and it is imported. Will be charge 10% on Basic sales tax and 5% on Import duty taxes
export const importedNonBasicTaxExempt = {
  id: '1671391386993',
  quantity: 1,
  type: 'other',
  description: 'bottle of perfume',
  unitPrice: 27.99,
  isImported: true,
};
