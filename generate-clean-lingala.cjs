// ============================================================================
// GÉNÉRATION PROPRE - BIBLE LINGALA
// ============================================================================
// Crée les fichiers Lingala en copiant la structure française
// et en remplaçant uniquement le texte principal

const fs = require('fs');
const path = require('path');

const lingalaDatabase = require('./lingala-bible-database.cjs');

console.log('🔧 GÉNÉRATION PROPRE DES FICHIERS LINGALA');
console.log('==========================================\n');

for (let chapter = 1; chapter <= 21; chapter++) {
  const chapterStr = String(chapter).padStart(2, '0');
  const frPath = path.join(__dirname, 'src', 'data', 'bible', 'gospel', 'john', 'chapters', `john-${chapterStr}-fr.js`);
  const rcPath = path.join(__dirname, 'src', 'data', 'bible', 'gospel', 'john', 'chapters', `john-${chapterStr}-rc.js`);
  
  if (!fs.existsSync(frPath)) {
    console.log(`❌ Chapitre ${chapter}: Fichier FR manquant`);
    continue;
  }
  
  const lingalaChapter = lingalaDatabase.chapters[chapter];
  if (!lingalaChapter) {
    console.log(`❌ Chapitre ${chapter}: Pas de données Lingala`);
    continue;
  }
  
  // Lire le fichier français
  let content = fs.readFileSync(frPath, 'utf8');
  
  // Remplacer l'export name
  content = content.replace(/johnChapter(\d+)FR/g, 'johnChapter$1RC');
  
  // Remplacer le titre
  content = content.replace(/title: "[^"]*"/, `title: "${lingalaChapter.title}"`);
  
  // Remplacer la version
  content = content.replace(/version: "Louis Segond 1910"/, 'version: "Biblia ya Lingala"');
  
  // Remplacer la langue
  content = content.replace(/language: "fr"/, 'language: "rc"');
  
  // Remplacer chaque texte de verset (UNIQUEMENT le champ "text", pas les objets strong)
  lingalaChapter.verses.forEach((verse, index) => {
    const verseNum = index + 1;
    
    // Pattern qui capture UNIQUEMENT le texte entre "text": "..." sans toucher aux strong
    // On utilise un lookbehind et lookahead pour être précis
    const pattern = new RegExp(
      `("number":\\s*${verseNum},\\s*"text":\\s*")([^"]+)(")`,
      ''
    );
    
    content = content.replace(pattern, (match, before, oldText, after) => {
      return before + verse + after;
    });
  });
  
  // Sauvegarder
  fs.writeFileSync(rcPath, content, 'utf8');
  console.log(`✅ Chapitre ${chapter}: ${lingalaChapter.verses.length} versets - Structure propre`);
}

console.log('\n✨ TERMINÉ! Tous les fichiers Lingala ont une structure propre.');
console.log('   - Texte Lingala dans "text"');
console.log('   - Objets Strong conservés tels quels (mots français)');
console.log('   - Prêt pour utilisation!\n');
