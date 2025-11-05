// Script pour supprimer les doublons dans strongWords.js
const fs = require('fs');

const filePath = './src/data/bible/strong/base/strongWords.js';
const content = fs.readFileSync(filePath, 'utf8');

// Extraire toutes les entrées
const lines = content.split('\n');
const header = [];
const entries = {};
let inHeader = true;

lines.forEach(line => {
  if (inHeader && !line.trim().startsWith('"')) {
    header.push(line);
  } else {
    inHeader = false;
    
    // Matcher une ligne d'entrée Strong
    const match = line.match(/^  "([GH]\d+)":\s*{(.+)}(,?)$/);
    if (match) {
      const [, strongId, data, comma] = match;
      // Garder seulement la première occurrence
      if (!entries[strongId]) {
        entries[strongId] = `  "${strongId}": {${data}},`;
      } else {
        console.log(`Doublon trouvé et supprimé: ${strongId}`);
      }
    }
  }
});

// Reconstruire le fichier
const uniqueEntries = Object.keys(entries).sort((a, b) => {
  // Tri: G avant H, puis par numéro
  const typeA = a[0];
  const typeB = b[0];
  if (typeA !== typeB) return typeA === 'G' ? -1 : 1;
  return parseInt(a.substring(1)) - parseInt(b.substring(1));
}).map(key => entries[key]);

// Retirer la virgule de la dernière entrée
if (uniqueEntries.length > 0) {
  const lastIdx = uniqueEntries.length - 1;
  uniqueEntries[lastIdx] = uniqueEntries[lastIdx].replace(/,$/, '');
}

const newContent = `// ============================================================================
// STRUCTURE DE BASE - MOTS GRECS/HÉBREUX STRONG
// Données neutres (grec/hébreu, translittération, prononciation)
// Réutilisable pour toutes les traductions
// ============================================================================

export const strongWordsBase = {
${uniqueEntries.join('\n')}
};

export default strongWordsBase;
`;

// Sauvegarder
fs.writeFileSync(filePath, newContent, 'utf8');

console.log(`\n✅ Nettoyage terminé !`);
console.log(`Total entrées uniques: ${uniqueEntries.length}`);
console.log(`Fichier sauvegardé: ${filePath}`);
