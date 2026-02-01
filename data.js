let items = JSON.parse(localStorage.getItem('items')) || [];

// Khmer weekday names
const khmerDays = ["អាទិត្យ", "ច័ន្ទ", "អង្គារ", "ពុធ", "ព្រហស្បតិ៍", "សុក្រ", "សៅរ៍"];

// Updated subItems with additional Ivory 250g size
const subItems = {
  'Woodfree': [
    { value: 'Woodfree_70g',   weight: '70',  width: '63.5', height: '90', text: 'Woodfree 70g 63.5cm x 90cm',   name: 'Woodfree' },
    { value: 'Woodfree_60g',   weight: '60',  width: '63.5', height: '90', text: 'Woodfree 60g 63.5cm x 90cm',   name: 'Woodfree' },
    { value: 'Woodfree_120g',  weight: '120', width: '63.5', height: '90', text: 'Woodfree 120g 63.5cm x 90cm',  name: 'Woodfree' }
  ],
  'Art glossy': [
    { value: 'Art_glossy_300g', weight: '300', width: '63.5', height: '90', text: 'Art glossy 300g 63.5cm x 90cm', name: 'Art glossy' },
    { value: 'Art_glossy_150g', weight: '150', width: '63.5', height: '90', text: 'Art glossy 150g 63.5cm x 90cm', name: 'Art glossy' }
  ],
  'Ivory': [
    { value: 'Ivory_300g',        weight: '300', width: '63.5', height: '90',  text: 'Ivory 300g 63.5cm x 90cm',   name: 'Ivory' },
    { value: 'Ivory_300g_109x79', weight: '300', width: '109', height: '79',  text: 'Ivory 300g 109cm x 79cm',    name: 'Ivory' },
    { value: 'Ivory_250g_109x79', weight: '250', width: '109', height: '79',  text: 'Ivory 250g 109cm x 79cm',    name: 'Ivory' } // បន្ថែម Ivory 250g 109cm x 79cm
  ],
  'កាបោន': [
    { value: 'Carbon_White_Top',    weight: '', width: '', height: '', text: 'កាបោនសរ',          name: 'កាបោនសរ' },
    { value: 'Carbon_White_Middle', weight: '', width: '', height: '', text: 'កាបោនសរកណ្ដាល',    name: 'កាបោនសរកណ្ដាល' },
    { value: 'Carbon_White_Bottom', weight: '', width: '', height: '', text: 'កាបោនសរក្រោម',     name: 'កាបោនសរក្រោម' },
    { value: 'Carbon_Blue_Top',     weight: '', width: '', height: '', text: 'កាបោនខៀវ',         name: 'កាបោនខៀវ' },
    { value: 'Carbon_Blue_Middle',  weight: '', width: '', height: '', text: 'កាបោនខៀវកណ្ដាល',   name: 'កាបោនខៀវកណ្ដាល' },
    { value: 'Carbon_Blue_Bottom',  weight: '', width: '', height: '', text: 'កាបោនខៀវក្រោម',    name: 'កាបោនខៀវក្រោម' },
    { value: 'Carbon_Pink_Top',     weight: '', width: '', height: '', text: 'កាបោនឈូក',         name: 'កាបោនឈូក' },
    { value: 'Carbon_Pink_Middle',  weight: '', width: '', height: '', text: 'កាបោនឈូកកណ្ដាល',  name: 'កាបោនឈូកកណ្ដាល' },
    { value: 'Carbon_Pink_Bottom',  weight: '', width: '', height: '', text: 'កាបោនឈូកក្រោម',   name: 'កាបោនឈូកក្រោម' },
    { value: 'Carbon_Yellow_Top',   weight: '', width: '', height: '', text: 'កាបោនលឿង',        name: 'កាបោនលឿង' },
    { value: 'Carbon_Yellow_Middle',weight: '', width: '', height: '', text: 'កាបោនលឿងកណ្ដាល', name: 'កាបោនលឿងកណ្ដាល' },
    { value: 'Carbon_Yellow_Bottom',weight: '', width: '', height: '', text: 'កាបោនលឿងក្រោម',  name: 'កាបោនលឿងក្រោម' },
    { value: 'Carbon_Red_Top',      weight: '', width: '', height: '', text: 'កាបោនក្រហម',       name: 'កាបោនក្រហម' },
    { value: 'Carbon_Red_Middle',   weight: '', width: '', height: '', text: 'កាបោនក្រហមកណ្ដាល',name: 'កាបោនក្រហមកណ្ដាល' },
    { value: 'Carbon_Red_Bottom',   weight: '', width: '', height: '', text: 'កាបោនក្រហមក្រោម', name: 'កាបោនក្រហមក្រោម' }
  ]
};

// Helper: Get week of the year
function getWeekOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 1);
  const diff = date - start;
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  return Math.ceil((diff + start.getDay() * 86400000) / oneWeek);
}

// Format date like: អង្គារ 21.01.26 11:08 AM
function formatDate(date) {
  const dayName = khmerDays[date.getDay()];
  const d = String(date.getDate()).padStart(2, '0');
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const y = String(date.getFullYear()).slice(-2);
  const h = String(date.getHours() % 12 || 12).padStart(2, '0');
  const min = String(date.getMinutes()).padStart(2, '0');
  const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
  const week = getWeekOfYear(date);
  return `${dayName} ${d}.${m}.${y} ${h}:${min} ${ampm} (Week ${week})`;
}

// Display current date
document.getElementById('dateDisplay').textContent = formatDate(new Date());

// Form validation
function validateForm() {
  const category = document.getElementById('categorySelect').value;
  const subItem = document.getElementById('subItemSelect').value;
  const weight = parseFloat(document.getElementById('weightInput').value) || 0;
  const width  = parseFloat(document.getElementById('widthInput').value)  || 0;
  const height = parseFloat(document.getElementById('heightInput').value) || 0;
  const qty    = parseInt(document.getElementById('quantityInput').value) || 0;

  let valid = true;

  document.getElementById('categoryFeedback').style.display = category ? 'none' : 'block';
  document.getElementById('subItemFeedback').style.display = (subItem || document.getElementById('subItemSection').style.display === 'none') ? 'none' : 'block';

  document.getElementById('weightFeedback').style.display  = (weight < 0) ? 'block' : 'none';
  document.getElementById('widthFeedback').style.display   = (width  < 0) ? 'block' : 'none';
  document.getElementById('heightFeedback').style.display  = (height < 0) ? 'block' : 'none';
  document.getElementById('quantityFeedback').style.display = (qty <= 0) ? 'block' : 'none';

  valid = category && (document.getElementById('subItemSection').style.display === 'none' || subItem) 
          && weight >= 0 && width >= 0 && height >= 0 && qty > 0;

  document.getElementById('saveButton').disabled = !valid;
  return valid;
}

// Category change → populate sub-items
document.getElementById('categorySelect').addEventListener('change', function() {
  const cat = this.value;
  const subSelect = document.getElementById('subItemSelect');
  const subSection = document.getElementById('subItemSection');
  const custom = document.getElementById('customizeSection');
  const saveBtn = document.getElementById('saveButton');

  subSelect.innerHTML = '<option value="">ជ្រើសរើស Sub-Item</option>';

  // Reset fields
  ['weightInput','widthInput','heightInput','quantityInput'].forEach(id => 
    document.getElementById(id).value = ''
  );

  if (cat && subItems[cat]) {
    subSection.style.display = 'block';
    subItems[cat].forEach(it => {
      const opt = document.createElement('option');
      opt.value = it.value;
      opt.textContent = it.text;
      opt.dataset.weight = it.weight;
      opt.dataset.width  = it.width;
      opt.dataset.height = it.height;
      subSelect.appendChild(opt);
    });
    custom.style.display = 'block';
    saveBtn.style.display = 'block';
  } else {
    subSection.style.display = 'none';
    custom.style.display = 'none';
    saveBtn.style.display = 'none';
  }
  validateForm();
});

// Auto-fill dimensions when sub-item selected
document.getElementById('subItemSelect').addEventListener('change', function() {
  const opt = this.options[this.selectedIndex];
  if (opt.value) {
    const w = opt.dataset.weight;
    const wd = opt.dataset.width;
    const h = opt.dataset.height;
    const wi = document.getElementById('weightInput');
    const widthi = document.getElementById('widthInput');
    const hi = document.getElementById('heightInput');

    // ALWAYS update the fields with the selected sub-item's values
    wi.value = w;
    widthi.value = wd;
    hi.value = h;
  }
  validateForm();
});

// Real-time validation
['weightInput','widthInput','heightInput','quantityInput'].forEach(id => {
  document.getElementById(id).addEventListener('input', validateForm);
});

// Save item
document.getElementById('saveButton').addEventListener('click', () => {
  if (!validateForm()) {
    alert('សូមបំពេញព័ត៌មានឱ្យត្រឹមត្រូវ!');
    return;
  }

  const cat = document.getElementById('categorySelect').value;
  const sub = document.getElementById('subItemSelect');
  const opt = sub.options[sub.selectedIndex];
  const w  = document.getElementById('weightInput').value;
  const wd = document.getElementById('widthInput').value;
  const h  = document.getElementById('heightInput').value;
  const q  = document.getElementById('quantityInput').value;

  const itemName = opt.value;
  const itemFullText = opt.textContent; // "Ivory 250g 109cm x 79cm" or "កាបោនខៀវក្រោម"
  
  // Check if item already exists (based on full item details)
  const existingIndex = items.findIndex(item => 
    item.item === itemName && 
    item.size === `${wd} x ${h}` && 
    item.weight === w
  );
  
  if (existingIndex !== -1) {
    // Update existing item quantity
    items[existingIndex].quantity = parseInt(items[existingIndex].quantity) + parseInt(q);
  } else {
    // Extract just the name part (remove weight and size)
    let itemDisplayName = itemFullText;
    
    // For non-carbon items, remove weight and size
    if (cat !== 'កាបោន') {
      itemDisplayName = itemFullText.replace(/\d+g/g, '').replace(/\d+\.?\d*cm x \d+\.?\d*cm/g, '').trim();
      itemDisplayName = itemDisplayName.replace(/\s+/g, ' ').replace(/x/g, '').trim();
    }
    
    // Add new item
    items.push({
      item: itemName,
      itemText: itemDisplayName, // Store display name without dimensions
      itemFullText: itemFullText, // Store full text for copying
      size: `${wd} x ${h}`,
      weight: w,
      quantity: q,
      category: cat,
      rawWidth: wd,
      rawHeight: h,
      rawWeight: w,
      isCarbon: cat === 'កាបោន' // Add flag for carbon items
    });
  }

  localStorage.setItem('items', JSON.stringify(items));
  updateTable();

  // Clear form (keep category)
  sub.value = '';
  document.getElementById('weightInput').value = '';
  document.getElementById('widthInput').value = '';
  document.getElementById('heightInput').value = '';
  document.getElementById('quantityInput').value = '';
  validateForm();
});

// Update table display with edit functionality
function updateTable() {
  const tbody = document.getElementById('tableBody');
  tbody.innerHTML = '';

  items.forEach((it, idx) => {
    const row = document.createElement('tr');
    
    // លេខរៀង
    const indexCell = document.createElement('td');
    indexCell.className = 'border p-2 text-center';
    indexCell.textContent = idx + 1;
    
    // ឈ្មោះទំនិញ (មានតែឈ្មោះ គ្មានទំហំ គ្មានទម្ងន់)
    const nameCell = document.createElement('td');
    nameCell.className = 'border p-2';
    nameCell.contentEditable = true;
    nameCell.textContent = it.itemText || 'Unknown';
    nameCell.addEventListener('blur', () => {
      items[idx].itemText = nameCell.textContent;
      localStorage.setItem('items', JSON.stringify(items));
    });

    // ទំហំ (សម្រាប់តារាងទី២ - ទំហំ)
    const sizeCell = document.createElement('td');
    sizeCell.className = 'border p-2 text-center';
    sizeCell.contentEditable = true;
    
    // For carbon items, show empty or hide size
    let sizeValue = it.size;
    if (it.isCarbon) {
      sizeValue = ''; // Empty for carbon items
    } else {
      // Remove "cm" for non-carbon items
      sizeValue = it.size.replace('cm', '').replace('x cm', 'x').replace('cm x', 'x').trim();
    }
    
    sizeCell.textContent = sizeValue;
    sizeCell.addEventListener('blur', () => {
      const newSize = sizeCell.textContent.trim();
      items[idx].size = newSize;
      
      // Update raw dimensions for non-carbon items
      if (!it.isCarbon) {
        const parts = newSize.split('x');
        if (parts.length === 2) {
          items[idx].rawWidth = parts[0].trim();
          items[idx].rawHeight = parts[1].trim();
        }
      }
      
      localStorage.setItem('items', JSON.stringify(items));
    });

    // ទម្ងន់ (សម្រាប់តារាងទី២ - ទំហំ)
    const weightCell = document.createElement('td');
    weightCell.className = 'border p-2 text-center';
    weightCell.contentEditable = true;
    
    // For carbon items, show empty or hide weight
    let weightValue = it.weight.toString();
    if (it.isCarbon) {
      weightValue = ''; // Empty for carbon items
    } else {
      // Remove "g" for non-carbon items
      weightValue = weightValue.replace('g', '').replace('N/A', '').trim();
    }
    
    weightCell.textContent = weightValue;
    weightCell.addEventListener('blur', () => {
      const newWeight = weightCell.textContent.trim();
      items[idx].weight = newWeight;
      
      // Update raw weight for non-carbon items
      if (!it.isCarbon) {
        items[idx].rawWeight = newWeight;
      }
      
      localStorage.setItem('items', JSON.stringify(items));
    });

    // បរិមាណ
    const quantityCell = document.createElement('td');
    quantityCell.className = 'border p-2 text-center';
    quantityCell.contentEditable = true;
    quantityCell.textContent = it.quantity;
    quantityCell.addEventListener('blur', () => {
      const newQty = parseInt(quantityCell.textContent);
      if (!isNaN(newQty) && newQty > 0) {
        items[idx].quantity = newQty;
        localStorage.setItem('items', JSON.stringify(items));
      } else {
        quantityCell.textContent = items[idx].quantity;
      }
    });

    // ម៉ែត្រកែសំរួល
    const actionCell = document.createElement('td');
    actionCell.className = 'border p-2 text-center';
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn text-red-500 hover:text-red-700 text-xs';
    deleteBtn.textContent = '×';
    deleteBtn.dataset.index = idx;
    actionCell.appendChild(deleteBtn);

    row.appendChild(indexCell);
    row.appendChild(nameCell);
    row.appendChild(sizeCell);
    row.appendChild(weightCell);
    row.appendChild(quantityCell);
    row.appendChild(actionCell);
    
    tbody.appendChild(row);
  });
}

// Delete single item
document.getElementById('resultTable').addEventListener('click', e => {
  if (e.target.classList.contains('delete-btn')) {
    const idx = parseInt(e.target.dataset.index);
    items.splice(idx, 1);
    localStorage.setItem('items', JSON.stringify(items));
    updateTable();
  }
});

// Sort items
document.getElementById('sortButton').addEventListener('click', () => {
  items.sort((a, b) => {
    if (a.category !== b.category) return a.category.localeCompare(b.category);
    
    let nameA = a.itemText || 'Unknown';
    let nameB = b.itemText || 'Unknown';
    return nameA.localeCompare(nameB);
  });
  localStorage.setItem('items', JSON.stringify(items));
  updateTable();
});

// Copy to clipboard (improved format - no category grouping)
document.getElementById('copyButton').addEventListener('click', async () => {
  const now = new Date();
  const dateStr = `${khmerDays[now.getDay()]} ${String(now.getDate()).padStart(2,'0')}.${String(now.getMonth()+1).padStart(2,'0')}.${String(now.getFullYear()).slice(-2)} ${String(now.getHours()%12||12).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')} ${now.getHours()>=12?'PM':'AM'}`;

  let text = `${dateStr}\n`;

  // Simple list format without category grouping
  items.forEach((it, index) => {
    // Reconstruct full item text
    let itemFullText = it.itemText || 'Unknown';
    
    // For carbon items: don't add weight or size
    if (!it.isCarbon) {
      // Add weight if exists
      if (it.weight && it.weight !== 'N/A' && it.weight !== '') {
        itemFullText += ` ${it.weight}g`;
      }
      
      // Add size if exists and not empty
      if (it.size && it.size.trim() !== '' && it.size !== ' x ') {
        const sizeWithCm = it.size.split('x').map(dim => dim.trim() + 'cm').join(' x ');
        if (sizeWithCm !== 'cm' && sizeWithCm !== 'cm x cm') {
          itemFullText += ` ${sizeWithCm}`;
        }
      }
    }
    
    text += `${index + 1}. ${itemFullText} = ${it.quantity} កញ្ចប់\n`;
  });

  if (items.length === 0) text += "(មិនមានទំនិញ)\n";

  try {
    await navigator.clipboard.writeText(text.trim());
    
    // Change button text and color temporarily
    const copyBtn = document.getElementById('copyButton');
    const originalText = copyBtn.textContent;
    const originalColor = copyBtn.style.color;
    const originalBg = copyBtn.style.backgroundColor;
    
    copyBtn.textContent = 'បានចម្លង';
    copyBtn.style.backgroundColor = '#10B981'; // Green color
    copyBtn.style.color = 'white';
    copyBtn.disabled = true;
    
    // Revert after 0.5 seconds (500ms)
    setTimeout(() => {
      copyBtn.textContent = originalText;
      copyBtn.style.backgroundColor = originalBg;
      copyBtn.style.color = originalColor;
      copyBtn.disabled = false;
    }, 500);
    
  } catch (err) {
    alert('មានបញ្ហាក្នុងការចម្លង សូមព្យាយាមម្ដងទៀត');
  }
});

// Clear all
document.getElementById('deleteButton').addEventListener('click', () => {
  if (confirm('បញ្ជាក់ថាចង់លុបទំនិញទាំងអស់មែនទេ?')) {
    items = [];
    localStorage.setItem('items', JSON.stringify(items));
    updateTable();
  }
});

// Initial load
updateTable();
