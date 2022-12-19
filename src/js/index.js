import { getAddRowValues, addNewProduct } from './utils/domUtils';

// when #add is clicked add a tr element before .add-row
document.getElementById('add').addEventListener('click', function () {
  const addRow = getAddRowValues();

  if (addRow.description) {
    addNewProduct(addRow);
  } else {
    alert('Please fill in all the fields');
  }
});
