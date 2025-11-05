// Script pour synchroniser toutes les traductions avec la base strongWords.js
const fs = require('fs');
const path = require('path');

const strongDir = './src/data/bible/strong';
const baseFile = path.join(strongDir, 'base/strongWords.js');
const langDirs = ['fr', 'en', 'es', 'pt', 'de', 'it', 'ru', 'zh', 'ar', 'hi', 'ko', 'ja', 'uk', 'he'];

// Lire les Strong de base (source de vérité)
const baseContent = fs.readFileSync(baseFile, 'utf8');
const baseMatches = baseContent.match(/"([GH]\d+)":/g);
const baseStrongs = baseMatches ? new Set(baseMatches.map(m => m.replace(/[":]/g, ''))) : new Set();

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║      SYNCHRONISATION DES TRADUCTIONS AVEC LA BASE            ║');
console.log('╚════════════════════════════════════════════════════════════════╝\n');

console.log(`📊 Base (strongWords.js): ${baseStrongs.size} Strong de référence\n`);

langDirs.forEach(lang => {
  const langFile = path.join(strongDir, lang, 'strongTranslations.js');
  
  if (!fs.existsSync(langFile)) {
    console.log(`❌ ${lang.toUpperCase()}: Fichier non trouvé, ignoré\n`);
    return;
  }

  console.log(`🔧 Traitement de ${lang.toUpperCase()}...`);
  
  const content = fs.readFileSync(langFile, 'utf8');
  
  // Extraire l'en-tête (commentaires au début)
  const headerMatch = content.match(/^(\/\/.*\n|\/\*[\s\S]*?\*\/\n)*/);
  const header = headerMatch ? headerMatch[0] : '';
  
  // Extraire toutes les entrées Strong
  const entriesRegex = /  "([GH]\d+)": \{[\s\S]*?\n  \}/g;
  const entries = {};
  let match;
  
  while ((match = entriesRegex.exec(content)) !== null) {
    const strongId = match[1];
    const fullEntry = match[0];
    entries[strongId] = fullEntry;
  }
  
  console.log(`   📝 Trouvé: ${Object.keys(entries).length} entrées`);
  
  // Filtrer pour garder seulement les Strong de la base
  const filteredEntries = {};
  let kept = 0;
  let removed = 0;
  
  Object.keys(entries).forEach(strongId => {
    if (baseStrongs.has(strongId)) {
      filteredEntries[strongId] = entries[strongId];
      kept++;
    } else {
      removed++;
      console.log(`   ❌ Supprimé: ${strongId} (pas dans base)`);
    }
  });
  
  // Vérifier les Strong manquants
  const missing = [];
  baseStrongs.forEach(strongId => {
    if (!filteredEntries[strongId]) {
      missing.push(strongId);
    }
  });
  
  if (missing.length > 0) {
    console.log(`   ⚠️  Manquants (${missing.length}): ${missing.slice(0, 10).join(', ')}${missing.length > 10 ? '...' : ''}`);
  }
  
  // Trier les entrées par ordre alphabétique
  const sortedKeys = Object.keys(filteredEntries).sort((a, b) => {
    const typeA = a[0];
    const typeB = b[0];
    if (typeA !== typeB) return typeA === 'G' ? -1 : 1;
    return parseInt(a.substring(1)) - parseInt(b.substring(1));
  });
  
  const sortedEntries = sortedKeys.map(key => filteredEntries[key]);
  
  // Retirer la virgule de la dernière entrée
  if (sortedEntries.length > 0) {
    const lastIdx = sortedEntries.length - 1;
    sortedEntries[lastIdx] = sortedEntries[lastIdx].replace(/,(\s*)$/, '$1');
  }
  
  // Reconstruire le fichier
  const exportName = `strongTranslations${lang.toUpperCase()}`;
  const newContent = `${header}
export const ${exportName} = {
${sortedEntries.join(',\n')}
};

export default ${exportName};
`;
  
  // Sauvegarder
  fs.writeFileSync(langFile, newContent, 'utf8');
  
  console.log(`   ✅ Conservé: ${kept} entrées`);
  if (removed > 0) console.log(`   ❌ Supprimé: ${removed} entrées`);
  console.log(`   💾 Sauvegardé: ${langFile}\n`);
});

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║                  ✅ SYNCHRONISATION TERMINÉE                  ║');
console.log('╚════════════════════════════════════════════════════════════════╝\n');

console.log('📊 Toutes les traductions utilisent maintenant uniquement');
console.log(`   les ${baseStrongs.size} Strong de référence de strongWords.js\n`);
