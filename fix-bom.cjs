const fs = require('fs');
const path = require('path');

const files = [
  'src/data/translations/de/ui.js',
  'src/data/translations/en/ui.js',
  'src/data/translations/es/ui.js',
  'src/data/translations/fr/ui.js',
  'src/data/translations/it/ui.js',
  'src/data/translations/jp/ui.js',
  'src/data/translations/pt/ui.js',
];

files.forEach(file => {
  try {
    const content = fs.readFileSync(file, 'utf-8');
    // Remove BOM if present
    const cleanContent = content.charCodeAt(0) === 0xFEFF ? content.slice(1) : content;
    fs.writeFileSync(file, cleanContent, 'utf-8');
    console.log(`✓ Fixed ${file}`);
  } catch (error) {
    console.error(`✗ Error fixing ${file}:`, error.message);
  }
});

console.log('\nDone! All files fixed.');
