let items = JSON.parse(localStorage.getItem('items')) || [];

// Khmer weekday names
const khmerDays = ["អាទិត្យ", "ច័ន្ទ", "អង្គារ", "ពុធ", "ព្រហស្បតិ៍", "សុក្រ", "សៅរ៍"];

// Updated subItems with additional Ivory size
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
    { value: 'Ivory_300g_109x79', weight: '300', width: '109', height: '79',  text: 'Ivory 300g 109cm x 79cm',    name: 'Ivory' }
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

    if (!wi.value && w) wi.value = w;
    if (!widthi.value && wd) widthi.value = wd;
    if (!hi.value && h) hi.value = h;
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
  const w  = document.getElementById('weightInput').value   || opt.dataset.weight;
  const wd = document.getElementById('widthInput').value    || opt.dataset.width;
  const h  = document.getElementById('heightInput').value   || opt.dataset.height;
  const q  = document.getElementById('quantityInput').value;

  items.push({
    item: opt.value,
    size: `${wd}cm x ${h}cm`,
    weight: w,
    quantity: q,
    category: cat
  });

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

// Update table display
function updateTable() {
  const tbody = document.getElementById('tableBody');
  tbody.innerHTML = '';

  items.forEach((it, idx) => {
    let name = 'Unknown';
    for (const c in subItems) {
      const found = subItems[c].find(s => s.value === it.item);
      if (found) {
        name = found.name;
        break;
      }
    }

    const row = document.createElement('tr');
    row.innerHTML = `
      <td class="border p-2">${idx + 1}</td>
      <td class="border p-2">${name}</td>
      <td class="border p-2">${it.size}</td>
      <td class="border p-2">${it.weight || 'N/A'}</td>
      <td class="border p-2">${it.quantity}</td>
      <td class="border p-2">
        <button class="delete-btn text-red-500 hover:text-red-700 text-xs" data-index="${idx}">X</button>
      </td>
    `;
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
    
    let nameA = 'Unknown', nameB = 'Unknown';
    for (const c in subItems) {
      if (subItems[c].find(s => s.value === a.item)) nameA = subItems[c].find(s => s.value === a.item).name;
      if (subItems[c].find(s => s.value === b.item)) nameB = subItems[c].find(s => s.value === b.item).name;
    }
    return nameA.localeCompare(nameB);
  });
  localStorage.setItem('items', JSON.stringify(items));
  updateTable();
});

// Copy to clipboard (improved format)
document.getElementById('copyButton').addEventListener('click', () => {
  const now = new Date();
  const dateStr = `${khmerDays[now.getDay()]} ${String(now.getDate()).padStart(2,'0')}.${String(now.getMonth()+1).padStart(2,'0')}.${String(now.getFullYear()).slice(-2)} ${String(now.getHours()%12||12).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')} ${now.getHours()>=12?'PM':'AM'}`;

  let text = `${dateStr}\n\n`;

  const grouped = {};
  items.forEach(it => {
    let name = 'Unknown', cat = 'Unknown';
    for (const c in subItems) {
      const s = subItems[c].find(sub => sub.value === it.item);
      if (s) { name = s.name; cat = c; break; }
    }

    if (!grouped[cat]) grouped[cat] = [];
    
    let lineParts = [name];
    if (it.weight && it.weight.trim()) lineParts.push(`${it.weight}g`);
    if (it.size && it.size !== 'cm x cm' && it.size.trim()) lineParts.push(it.size);
    
    grouped[cat].push(lineParts.join(' ') + ` = ${it.quantity} កញ្ចប់`);
  });

  let counter = 1;
  for (const cat in grouped) {
    if (grouped[cat].length) {
      text += `${cat}:\n`;
      grouped[cat].forEach(line => {
        text += `${counter}. ${line}\n`;
        counter++;
      });
      text += '\n';
    }
  }

  if (items.length === 0) text += "(មិនមានទំនិញ)\n";

  navigator.clipboard.writeText(text.trim())
    .then(() => alert('បានចម្លងទៅ Clipboard រួចរាល់!'))
    .catch(() => alert('មានបញ្ហាក្នុងការចម្លង សូមព្យាយាមម្ដងទៀត'));
});

// Clear all
document.getElementById('deleteButton').addEventListener('click', () => {
  if (confirm('បញ្ជាក់ថាចង់លុបទាំងអស់មែនទេ?')) {
    items = [];
    localStorage.setItem('items', JSON.stringify(items));
    updateTable();
  }
});

// Initial load
updateTable();
