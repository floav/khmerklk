const items = [];
const subItems = {
  'Woodfree': [
    { value: 'Woodfree_70g', weight: '70', width: '63.5', height: '90', text: 'Woodfree 70g 63.5cm x 90cm', name: 'Woodfree' },
    { value: 'Woodfree_60g', weight: '60', width: '63.5', height: '90', text: 'Woodfree 60g 63.5cm x 90cm', name: 'Woodfree' },
    { value: 'Woodfree_120g', weight: '120', width: '63.5', height: '90', text: 'Woodfree 120g 63.5cm x 90cm', name: 'Woodfree' }
  ],
  'Art glossy': [
    { value: 'Art_glossy_300g', weight: '300', width: '63.5', height: '90', text: 'Art glossy 300g 63.5cm x 90cm', name: 'Art glossy' },
    { value: 'Art_glossy_150g', weight: '150', width: '63.5', height: '90', text: 'Art glossy 150g 63.5cm x 90cm', name: 'Art glossy' }
  ],
  'Ivory': [
    { value: 'Ivory_300g', weight: '300', width: '63.5', height: '90', text: 'Ivory 300g 63.5cm x 90cm', name: 'Ivory' }
  ],
  'កាបោន': [
    { value: 'Carbon_White_Top', weight: '', width: '', height: '', text: 'កាបោនសរ', name: 'កាបោនសរ' },
    { value: 'Carbon_Blue_Middle', weight: '', width: '', height: '', text: 'កាបោនខៀវកណ្ដាល', name: 'កាបោនខៀវកណ្ដាល' },
    { value: 'Carbon_Blue_Bottom', weight: '', width: '', height: '', text: 'កាបោនខៀវក្រោម', name: 'កាបោនខៀវក្រោម' },
    { value: 'Carbon_Pink_Middle', weight: '', width: '', height: '', text: 'កាបោនឈូកកណ្ដាល', name: 'កាបោនឈូកកណ្ដាល' },
    { value: 'Carbon_Pink_Bottom', weight: '', width: '', height: '', text: 'កាបោនឈូកក្រោម', name: 'កាបោនឈូកក្រោម' },
    { value: 'Carbon_Yellow_Middle', weight: '', width: '', height: '', text: 'កាបោនលឿងកណ្ដាល', name: 'កាបោនលឿងកណ្ដាល' },
    { value: 'Carbon_Red_Middle', weight: '', width: '', height: '', text: 'កាបោនក្រហមកណ្ដាល', name: 'កាបោនក្រហមកណ្ដាល' },
    { value: 'Carbon_Red_Bottom', weight: '', width: '', height: '', text: 'កាបោនក្រហមក្រោម', name: 'កាបោនក្រហមក្រោម' }
  ]
};

// Helper function to get week of the year
function getWeekOfYear(date) {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const diff = date - startOfYear;
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  return Math.ceil((diff + startOfYear.getDay() * 1000 * 60 * 60 * 24) / oneWeek);
}

// Helper function to format date in English
function formatDate(date) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayName = days[date.getDay()];
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours() % 12 || 12).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
  const week = getWeekOfYear(date);
  return `${dayName}, ${day}/${month}/${year} ${hours}:${minutes} ${ampm} (Week ${week})`;
}

// Set initial date
const currentDate = new Date('2025-09-09T18:19:00+07:00');
document.getElementById('dateDisplay').textContent = formatDate(currentDate);

// Fixed date for copy
const fixedCopyDate = "Monday 30/02/2025 01:12 PM";

// Validate and update button state
function validateForm() {
  const categorySelect = document.getElementById('categorySelect');
  const subItemSelect = document.getElementById('subItemSelect');
  const weightInput = document.getElementById('weightInput');
  const widthInput = document.getElementById('widthInput');
  const heightInput = document.getElementById('heightInput');
  const quantityInput = document.getElementById('quantityInput');
  const saveButton = document.getElementById('saveButton');

  const categoryFeedback = document.getElementById('categoryFeedback');
  const subItemFeedback = document.getElementById('subItemFeedback');
  const weightFeedback = document.getElementById('weightFeedback');
  const widthFeedback = document.getElementById('widthFeedback');
  const heightFeedback = document.getElementById('heightFeedback');
  const quantityFeedback = document.getElementById('quantityFeedback');

  let isValid = true;

  if (!categorySelect.value) {
    categoryFeedback.style.display = 'block';
    isValid = false;
  } else {
    categoryFeedback.style.display = 'none';
  }

  if (!subItemSelect.value && subItemSelect.style.display !== 'none') {
    subItemFeedback.style.display = 'block';
    isValid = false;
  } else {
    subItemFeedback.style.display = 'none';
  }

  if (weightInput.value < 0) {
    weightFeedback.textContent = 'Weight cannot be negative!';
    weightFeedback.style.display = 'block';
  } else {
    weightFeedback.style.display = 'none';
  }

  if (widthInput.value < 0) {
    widthFeedback.textContent = 'Width cannot be negative!';
    widthFeedback.style.display = 'block';
  } else {
    widthFeedback.style.display = 'none';
  }

  if (heightInput.value < 0) {
    heightFeedback.textContent = 'Height cannot be negative!';
    heightFeedback.style.display = 'block';
  } else {
    heightFeedback.style.display = 'none';
  }

  if (quantityInput.value === '' || quantityInput.value <= 0) {
    quantityFeedback.style.display = 'block';
    isValid = false;
  } else {
    quantityFeedback.style.display = 'none';
  }

  saveButton.disabled = !isValid;
}

// Update sub-items based on category selection
document.getElementById('categorySelect').addEventListener('change', function() {
  const category = this.value;
  const subItemSelect = document.getElementById('subItemSelect');
  const customizeSection = document.getElementById('customizeSection');
  const saveButton = document.getElementById('saveButton');
  const subItemSection = document.getElementById('subItemSection');

  subItemSelect.innerHTML = '<option value="">Select Sub-Item</option>';
  if (category) {
    subItemSection.style.display = 'block';
    subItems[category].forEach(item => {
      const option = document.createElement('option');
      option.value = item.value;
      option.setAttribute('data-weight', item.weight);
      option.setAttribute('data-width', item.width);
      option.setAttribute('data-height', item.height);
      option.textContent = item.text;
      subItemSelect.appendChild(option);
    });
    customizeSection.style.display = 'block';
    saveButton.style.display = 'block';
  } else {
    subItemSection.style.display = 'none';
    customizeSection.style.display = 'none';
    saveButton.style.display = 'none';
  }
  validateForm();
});

// Add event listeners for input changes
['subItemSelect', 'weightInput', 'widthInput', 'heightInput', 'quantityInput'].forEach(id => {
  document.getElementById(id).addEventListener('input', validateForm);
});

// Save button event
document.getElementById('saveButton').addEventListener('click', () => {
  const subItemSelect = document.getElementById('subItemSelect');
  const weightInput = document.getElementById('weightInput');
  const widthInput = document.getElementById('widthInput');
  const heightInput = document.getElementById('heightInput');
  const quantityInput = document.getElementById('quantityInput');

  const selectedOption = subItemSelect.options[subItemSelect.selectedIndex];
  if (!selectedOption.value) {
    alert('Please select a sub-item!');
    return;
  }

  const weight = weightInput.value || selectedOption.getAttribute('data-weight');
  const width = widthInput.value || selectedOption.getAttribute('data-width');
  const height = heightInput.value || selectedOption.getAttribute('data-height');
  const quantity = quantityInput.value;

  items.push({
    item: selectedOption.value,
    size: `${width}cm x ${height}cm`,
    weight: weight,
    quantity: quantity
  });

  updateTable();
  subItemSelect.value = '';
  weightInput.value = '';
  widthInput.value = '';
  heightInput.value = '';
  quantityInput.value = '';
  validateForm();
});

// Update table
function updateTable() {
  const tableBody = document.getElementById('tableBody');
  tableBody.innerHTML = '';
  items.forEach((item, index) => {
    const subItem = subItems[Object.keys(subItems).find(category => 
      subItems[category].some(sub => sub.value === item.item))].find(sub => sub.value === item.item);
    const itemName = subItem.name;
    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="border p-2">${index + 1}</td>
      <td class="border p-2">${itemName}</td>
      <td class="border p-2">${item.size}</td>
      <td class="border p-2">${item.weight || 'N/A'}</td>
      <td class="border p-2">${item.quantity}</td>
      <td class="border p-2"><button class="delete-btn text-red-500 hover:text-red-700 text-xs" data-index="${index}">X</button></td>
    `;
    tableBody.appendChild(row);
  });
}

// Delete button event (for each row)
document.getElementById('resultTable').addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    const index = e.target.getAttribute('data-index');
    items.splice(index, 1);
    updateTable();
  }
});

// Sort button event
document.getElementById('sortButton').addEventListener('click', () => {
  items.sort((a, b) => a.item.localeCompare(b.item));
  updateTable();
});

// Copy button event
document.getElementById('copyButton').addEventListener('click', () => {
  const text = `${fixedCopyDate}\nមេនេះជាចំនួនក្រដាស់មាននៅកន្លែងយើង គឺមាន\n` + 
    items.map((item, index) => {
      const subItem = subItems[Object.keys(subItems).find(category => 
        subItems[category].some(sub => sub.value === item.item))].find(sub => sub.value === item.item);
      const weightText = item.weight ? `${item.weight}g` : '';
      const sizeText = item.size && item.size !== 'cm x cm' ? item.size : '';
      return `${index + 1}. ${subItem.name} ${weightText} ${sizeText} = ${item.quantity} កញ្ចប់`;
    }).join('\n');
  navigator.clipboard.writeText(text).then(() => {
    alert('Copied to Clipboard!');
  });
});

// Delete all button event
document.getElementById('deleteButton').addEventListener('click', () => {
  items.length = 0;
  updateTable();
});
