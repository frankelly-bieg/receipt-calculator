import { calculateProductItemTaxes, getSummary } from '../taxes';

export const productSchema = {
  quantity: 'number',
  type: 'text',
  description: 'text',
  unitPrice: 'number',
  isImported: 'boolean',
};
export const PRODUCTS_IDS = Object.keys(productSchema);
export const PRODUCT_CLASS = 'product-item';

export const getAllProductItemsAsJSON = () => {
  const items = document.querySelectorAll(`.${PRODUCT_CLASS}`);
  // get items as JSON
  const itemsJSON = [...items].map(item => {
    const itemJSON = {};

    itemJSON.id = item.id;

    PRODUCTS_IDS.forEach(id => {
      const element = item.querySelector(`.${id}-item`);

      if (id === 'isImported') {
        itemJSON[id] = element.innerHTML === 'Yes';
      } else if (productSchema[id] === 'number') {
        itemJSON[id] = Number(element.innerHTML);
      } else {
        itemJSON[id] = element.innerHTML;
      }
    });

    return itemJSON;
  });

  return itemsJSON;
};

/**
 * @returns {void}
 * */
export const getAddRowValues = () => {
  const values = {};

  PRODUCTS_IDS.forEach(id => {
    values[id] = document.getElementById(id).value;

    if (id === 'isImported') {
      values[id] = values[id] === '1' ? 'Yes' : 'No';
    }
  });

  return values;
};

/**
 * @returns {void}
 * */
export const clearAddRowValues = () => {
  PRODUCTS_IDS.forEach(id => {
    const element = document.getElementById(id);

    if (element.type === 'number') {
      element.value = 1;
    } else if (element.min) {
      element.value = element.min;
    } else if (!['type'].includes(id)) {
      element.value = '';
    }
  });
};

/** 
  * @param {HTMLElement} tr
  * @param {String} value
  * @param {String} className
  * @param {HTMLElement} appendItem

  * @returns {void}
*/
export const addTd = (tr, value, className, appendItem) => {
  const item = document.createElement('td');
  item.classList.add(className);
  item.innerHTML = value === null ? '' : value || '0';

  if (appendItem) {
    item.appendChild(appendItem);
  }

  tr.appendChild(item);
};

/**
 * Update the sub-total, sales taxes and total values in the UI
 *
 * @return {void}
 * */
export const updateSummary = () => {
  const productItems = getAllProductItemsAsJSON();
  const productItemsWithTaxes = calculateProductItemTaxes(productItems);
  const summary = getSummary(productItemsWithTaxes);

  document.getElementById('sub-total').innerHTML = Number(summary.subTotal).toFixed(2);
  document.getElementById('sales-taxes').innerHTML = Number(summary.salesTaxes).toFixed(2);
  document.getElementById('total').innerHTML = Number(summary.total).toFixed(2);
};

/**
 *  Update the receipt details section
 *
 * @returns {void}
 */
export const updateReceipt = () => {
  const productItems = getAllProductItemsAsJSON();
  const productItemsWithTaxes = calculateProductItemTaxes(productItems);
  const receipt = document.getElementById('receipt');

  receipt.innerHTML = '';

  productItemsWithTaxes.forEach(({ quantity, description, isImported, totalValue }) => {
    const p = document.createElement('p');
    const imported = isImported ? 'imported ' : ' ';

    p.innerHTML = `${quantity} ${imported}${description}: ${Number(totalValue).toFixed(2)} `;

    receipt.appendChild(p);
  });
};

/**
 * Take all the values from .add-row and add a new <tr> element to the table
 *
 * @param {Object} addRow
 * @returns {void}
 * */
export const addNewProduct = addRow => {
  // Product container
  let tr = document.createElement('tr');
  tr.id = `${new Date().getTime()}`;
  tr.classList.add(PRODUCT_CLASS);

  // All product info. To add a new column just add a new item to productSchema
  PRODUCTS_IDS.forEach(id => addTd(tr, addRow[id], `${id}-item`));

  const removeButton = document.createElement('button');
  removeButton.type = 'button';
  removeButton.innerHTML = 'Remove';
  removeButton.addEventListener('click', function () {
    document.getElementById(tr.id).remove();
    updateReceipt();
  });

  addTd(tr, null, 'action-item', removeButton);

  document.querySelector('.add-row').insertAdjacentElement('beforebegin', tr);

  clearAddRowValues();
  updateSummary();
  updateReceipt();
};
