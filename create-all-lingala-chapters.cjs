// ============================================================================
// SCRIPT - Créer tous les chapitres de Jean en Lingala (4-21)
// ============================================================================

const fs = require('fs');
const path = require('path');

// Fonction pour créer un chapitre Lingala basé sur le français
function createLingalaChapter(chapterNum) {
  const chapterStr = String(chapterNum).padStart(2, '0');
  const frenchPath = path.join(__dirname, 'src', 'data', 'bible', 'gospel', 'john', 'chapters', `john-${chapterStr}-fr.js`);
  
  if (!fs.existsSync(frenchPath)) {
    console.log(`❌ Chapitre ${chapterNum}: Fichier français introuvable`);
    return false;
  }
  
  // Lire le chapitre français
  const frenchContent = fs.readFileSync(frenchPath, 'utf8');
  
  // Créer la version Lingala en remplaçant:
  // 1. Le nom de l'export
  // 2. La langue
  // 3. La version
  // On garde les numéros Strong et la structure, on mettra les textes Lingala plus tard
  
  let lingalaContent = frenchContent
    .replace(/johnChapter(\d+)FR/g, 'johnChapter$1RC')
    .replace(/language: "fr"/g, 'language: "rc"')
    .replace(/version: "Louis Segond 1910"/g, 'version: "Biblia ya Lingala"')
    .replace(/direction: "ltr"/g, 'direction: "ltr"');
  
  // Sauvegarder
  const lingalaPath = path.join(__dirname, 'src', 'data', 'bible', 'gospel', 'john', 'chapters', `john-${chapterStr}-rc.js`);
  fs.writeFileSync(lingalaPath, lingalaContent, 'utf8');
  
  console.log(`✅ Chapitre ${chapterNum}: Créé (texte français temporaire, à traduire)`);
  return true;
}

// Créer tous les chapitres manquants
console.log('🚀 Création des chapitres de Jean en Lingala (4-21)...\n');

let created = 0;
for (let i = 4; i <= 21; i++) {
  if (createLingalaChapter(i)) {
    created++;
  }
}

console.log(`\n✨ Terminé! ${created} chapitres créés.`);
console.log('📝 Note: Les textes sont en français pour le moment.');
console.log('   Ils doivent être traduits en Lingala manuellement ou via un service de traduction.');
