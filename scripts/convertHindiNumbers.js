// ============================================================================
// CONVERTISSEUR DE CHIFFRES DEVANAGARI (HINDI)
// ============================================================================
// Convertit les chiffres devanagari (०१२३४५६७८९) en chiffres standards

const fs = require('fs');
const path = require('path');

const hiPath = path.join(__dirname, '..', 'src', 'data', 'bible', 'gospel', 'john', 'hi', 'irv.txt');
const hiConvertedPath = path.join(__dirname, '..', 'src', 'data', 'bible', 'gospel', 'john', 'hi', 'irv-converted.txt');

console.log('🔄 Conversion des chiffres devanagari...\n');
console.log('Fichier source:', hiPath);

// Lire le fichier
const content = fs.readFileSync(hiPath, 'utf8');

// Convertir tous les chiffres devanagari en chiffres standards
const converted = content
  .replace(/०/g, '0')
  .replace(/१/g, '1')
  .replace(/२/g, '2')
  .replace(/३/g, '3')
  .replace(/४/g, '4')
  .replace(/५/g, '5')
  .replace(/६/g, '6')
  .replace(/७/g, '7')
  .replace(/८/g, '8')
  .replace(/९/g, '9');

// Sauvegarder le fichier converti
fs.writeFileSync(hiConvertedPath, converted, 'utf8');

console.log('✅ Conversion terminée !');
console.log('Fichier converti:', hiConvertedPath);

// Afficher quelques exemples de conversion
const lines = converted.split('\n');
const chapterHeaders = lines.filter(l => l.includes('===== अध्याय')).slice(0, 5);

console.log('\nExemples de chapitres convertis:');
chapterHeaders.forEach(header => {
  console.log('  ', header);
});
