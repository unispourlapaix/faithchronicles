// ============================================================================
// CONVERTISSEUR DE CHIFFRES ARABES ORIENTAUX
// ============================================================================
// Convertit les chiffres arabes orientaux (٠١٢٣٤٥٦٧٨٩) en chiffres standards

const fs = require('fs');
const path = require('path');

const arPath = path.join(__dirname, '..', 'src', 'data', 'bible', 'gospel', 'john', 'ar', 'svd1865.txt');
const arConvertedPath = path.join(__dirname, '..', 'src', 'data', 'bible', 'gospel', 'john', 'ar', 'svd1865-converted.txt');

console.log('🔄 Conversion des chiffres arabes orientaux...\n');
console.log('Fichier source:', arPath);

// Lire le fichier
const content = fs.readFileSync(arPath, 'utf8');

// Convertir tous les chiffres arabes orientaux en chiffres standards
const converted = content
  .replace(/٠/g, '0')
  .replace(/١/g, '1')
  .replace(/٢/g, '2')
  .replace(/٣/g, '3')
  .replace(/٤/g, '4')
  .replace(/٥/g, '5')
  .replace(/٦/g, '6')
  .replace(/٧/g, '7')
  .replace(/٨/g, '8')
  .replace(/٩/g, '9');

// Sauvegarder le fichier converti
fs.writeFileSync(arConvertedPath, converted, 'utf8');

console.log('✅ Conversion terminée !');
console.log('Fichier converti:', arConvertedPath);

// Afficher quelques exemples de conversion
const lines = converted.split('\n');
const chapterHeaders = lines.filter(l => l.includes('===== الأصحاح')).slice(0, 5);

console.log('\nExemples de chapitres convertis:');
chapterHeaders.forEach(header => {
  console.log('  ', header);
});
