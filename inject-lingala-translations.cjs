// Script pour injecter les traductions complètes Lingala dans la base de données
const fs = require('fs');

console.log('📚 Injection des traductions Lingala complètes...\n');

// Lire le fichier actuel
const dbPath = './lingala-bible-database.cjs';
let content = fs.readFileSync(dbPath, 'utf-8');

// Lire les traductions depuis le JSON
const translations = JSON.parse(fs.readFileSync('./lingala-complete-ch8-21.json', 'utf-8'));

// Pour chaque chapitre dans le JSON
Object.keys(translations).forEach(chapterNum => {
  const verses = translations[chapterNum];
  console.log(`📖 Traitement chapitre ${chapterNum}: ${verses.length} versets`);
  
  // Créer le nouveau tableau de versets
  const versesArray = verses.map(v => `        "${v.replace(/"/g, '\\"')}"`).join(',\n');
  
  // Pattern pour trouver et remplacer tout le tableau verses du chapitre
  const pattern = new RegExp(
    `(${chapterNum}:\\s*\\{[^}]*verses:\\s*\\[)([\\s\\S]*?)(\\]\\s*\\})`,
    ''
  );
  
  content = content.replace(pattern, `$1\n${versesArray}\n      $3`);
  
  console.log(`✅ Chapitre ${chapterNum} mis à jour`);
});

// Sauvegarder
fs.writeFileSync(dbPath, content, 'utf-8');

console.log('\n✨ Base de données mise à jour avec succès!');
console.log('📊 Vous pouvez maintenant lancer: node translate-all-lingala.cjs');
