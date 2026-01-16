let items = JSON.parse(localStorage.getItem('items')) || [];

// Fixed: Unique values for each sub-item in 'កាបោន' category
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
    // Fixed: Each item now has a unique value
    { value: 'Carbon_White_Top', weight: '', width: '', height: '', text: 'កាបោនសរ', name: 'កាបោនសរ' },
    { value: 'Carbon_White_Middle', weight: '', width: '', height: '', text: 'កាបោនសរកណ្ដាល', name: 'កាបោនសរកណ្ដាល' },
    { value: 'Carbon_White_Bottom', weight: '', width: '', height: '', text: 'កាបោនសរក្រោម', name: 'កាបោនសរក្រោម' },
    { value: 'Carbon_Blue_Top', weight: '', width: '', height: '', text: 'កាបោនខៀវ', name: 'កាបោនខៀវ' },
    { value: 'Carbon_Blue_Middle', weight: '', width: '', height: '', text: 'កាបោនខៀវកណ្ដាល', name: 'កាបោនខៀវកណ្ដាល' },
    { value: 'Carbon_Blue_Bottom', weight: '', width: '', height: '', text: 'កាបោនខៀវក្រោម', name: 'កាបោនខៀវក្រោម' },
    { value: 'Carbon_Pink_Top', weight: '', width: '', height: '', text: 'កាបោនឈូក', name: 'កាបោនឈូក' },
    { value: 'Carbon_Pink_Middle', weight: '', width: '', height: '', text: 'កាបោនឈូកកណ្ដាល', name: 'កាបោនឈូកកណ្ដាល' },
    { value: 'Carbon_Pink_Bottom', weight: '', width: '', height: '', text: 'កាបោនឈូកក្រោម', name: 'កាបោនឈូកក្រោម' },
    { value: 'Carbon_Yellow_Top', weight: '', width: '', height: '', text: 'កាបោនលឿង', name: 'កាបោនលឿង' },
    { value: 'Carbon_Yellow_Middle', weight: '', width: '', height: '', text: 'កាបោនលឿងកណ្ដាល', name: 'កាបោនលឿងកណ្ដាល' },
    { value: 'Carbon_Yellow_Bottom', weight: '', width: '', height: '', text: 'កាបោនលឿងក្រោម', name: 'កាបោនលឿងក្រោម' },
    { value: 'Carbon_Red_Top', weight: '', width: '', height: '', text: 'កាបោនក្រហម', name: 'កាបោនក្រហម' },
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
document.getElementById('dateDisplay').textContent = formatDate(new Date());

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

  // Category validation
  if (!categorySelect.value) {
    categoryFeedback.style.display = 'block';
    isValid = false;
  } else {
    categoryFeedback.style.display = 'none';
  }

  // Sub-item validation (only if sub-item section is visible)
  if (subItemSelect.style.display !== 'none' && !subItemSelect.value) {
    subItemFeedback.style.display = 'block';
    isValid = false;
  } else {
    subItemFeedback.style.display = 'none';
  }

  // Weight validation - fixed: prevent saving if negative
  if (weightInput.value < 0) {
    weightFeedback.textContent = 'Weight cannot be negative!';
    weightFeedback.style.display = 'block';
    isValid = false;
  } else {
    weightFeedback.style.display = 'none';
  }

  // Width validation - fixed: prevent saving if negative
  if (widthInput.value < 0) {
    widthFeedback.textContent = 'Width cannot be negative!';
    widthFeedback.style.display = 'block';
    isValid = false;
  } else {
    widthFeedback.style.display = 'none';
  }

  // Height validation - fixed: prevent saving if negative
  if (heightInput.value < 0) {
    heightFeedback.textContent = 'Height cannot be negative!';
    heightFeedback.style.display = 'block';
    isValid = false;
  } else {
    heightFeedback.style.display = 'none';
  }

  // Quantity validation
  if (quantityInput.value === '' || quantityInput.value <= 0) {
    quantityFeedback.style.display = 'block';
    isValid = false;
  } else {
    quantityFeedback.style.display = 'none';
  }

  saveButton.disabled = !isValid;
  return isValid;
}

// Update sub-items based on category selection
document.getElementById('categorySelect').addEventListener('change', function() {
  const category = this.value;
  const subItemSelect = document.getElementById('subItemSelect');
  const customizeSection = document.getElementById('customizeSection');
  const saveButton = document.getElementById('saveButton');
  const subItemSection = document.getElementById('subItemSection');

  subItemSelect.innerHTML = '<option value="">Select Sub-Item</option>';
  
  // Clear custom inputs
  document.getElementById('weightInput').value = '';
  document.getElementById('widthInput').value = '';
  document.getElementById('heightInput').value = '';
  document.getElementById('quantityInput').value = '';
  
  if (category && subItems[category]) {
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

// Update custom inputs when sub-item is selected
document.getElementById('subItemSelect').addEventListener('change', function() {
  const selectedOption = this.options[this.selectedIndex];
  if (selectedOption.value) {
    const weight = selectedOption.getAttribute('data-weight');
    const width = selectedOption.getAttribute('data-width');
    const height = selectedOption.getAttribute('data-height');
    
    // Only auto-fill if the fields are empty or contain default values
    const weightInput = document.getElementById('weightInput');
    const widthInput = document.getElementById('widthInput');
    const heightInput = document.getElementById('heightInput');
    
    if (!weightInput.value && weight) weightInput.value = weight;
    if (!widthInput.value && width) widthInput.value = width;
    if (!heightInput.value && height) heightInput.value = height;
  }
  validateForm();
});

// Add event listeners for input changes
['weightInput', 'widthInput', 'heightInput', 'quantityInput'].forEach(id => {
  document.getElementById(id).addEventListener('input', validateForm);
});

// Save button event
document.getElementById('saveButton').addEventListener('click', () => {
  // Validate before saving
  if (!validateForm()) {
    alert('Please fix all errors before saving!');
    return;
  }
  
  const categorySelect = document.getElementById('categorySelect');
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
    quantity: quantity,
    category: categorySelect.value // Store category for easier lookup
  });

  // Save items to localStorage
  localStorage.setItem('items', JSON.stringify(items));

  updateTable();
  // Clear form but keep category selected
  subItemSelect.value = '';
  weightInput.value = '';
  widthInput.value = '';
  heightInput.value = '';
  quantityInput.value = '';
  validateForm();
});

// Update table - Fixed: Better logic for finding sub-item
function updateTable() {
  const tableBody = document.getElementById('tableBody');
  tableBody.innerHTML = '';
  
  items.forEach((item, index) => {
    let itemName = 'Unknown';
    let subItemFound = null;
    
    // Search through all categories to find the matching sub-item
    for (const category in subItems) {
      subItemFound = subItems[category].find(sub => sub.value === item.item);
      if (subItemFound) {
        itemName = subItemFound.name;
        break;
      }
    }
    
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
    localStorage.setItem('items', JSON.stringify(items));
    updateTable();
  }
});

// Sort button event
document.getElementById('sortButton').addEventListener('click', () => {
  items.sort((a, b) => {
    // Sort by category first, then by item name
    const categoryA = a.category || '';
    const categoryB = b.category || '';
    
    if (categoryA !== categoryB) {
      return categoryA.localeCompare(categoryB);
    }
    
    // Find item names for comparison
    let nameA = 'Unknown';
    let nameB = 'Unknown';
    
    for (const category in subItems) {
      const subItemA = subItems[category].find(sub => sub.value === a.item);
      const subItemB = subItems[category].find(sub => sub.value === b.item);
      
      if (subItemA) nameA = subItemA.name;
      if (subItemB) nameB = subItemB.name;
    }
    
    return nameA.localeCompare(nameB);
  });
  
  localStorage.setItem('items', JSON.stringify(items));
  updateTable();
});

// Copy button event
document.getElementById('copyButton').addEventListener('click', () => {
  const currentDate = new Date();
  let text = `${formatDate(currentDate)}\nCheking Papper Size... \n\n`;
  
  // Group items by category for better organization
  const groupedItems = {};
  items.forEach(item => {
    let itemName = 'Unknown';
    let category = 'Unknown';
    
    // Find the item details
    for (const cat in subItems) {
      const subItem = subItems[cat].find(sub => sub.value === item.item);
      if (subItem) {
        itemName = subItem.name;
        category = cat;
        break;
      }
    }
    
    if (!groupedItems[category]) {
      groupedItems[category] = [];
    }
    
    const weightText = item.weight ? `${item.weight}g` : '';
    const sizeText = item.size && item.size !== 'cm x cm' ? item.size : '';
    groupedItems[category].push(`${itemName} ${weightText} ${sizeText} = ${item.quantity} កញ្ចប់`);
  });
  
  // Build the text with categories
  let itemCount = 1;
  for (const category in groupedItems) {
    if (groupedItems[category].length > 0) {
      text += `\n${category}:\n`;
      groupedItems[category].forEach(itemText => {
        text += `${itemCount}. ${itemText}\n`;
        itemCount++;
      });
    }
  }
  
  navigator.clipboard.writeText(text).then(() => {
    alert('Copied to Clipboard!');
  });
});

// Delete all button event
document.getElementById('deleteButton').addEventListener('click', () => {
  if (confirm('Are you sure you want to delete all items?')) {
    items.length = 0;
    localStorage.setItem('items', JSON.stringify(items));
    updateTable();
  }
});

// Initial table update
updateTable();
