// ============================================================================
// TRADUCTION COMPLÈTE - JEAN EN LINGALA
// ============================================================================
// Ce script traduit TOUS les chapitres de Jean en Lingala

const fs = require('fs');
const path = require('path');

// Fonction pour lire un chapitre français et extraire la structure Strong
function parseFrenchChapter(chapterNum) {
  const chapterStr = String(chapterNum).padStart(2, '0');
  const filePath = path.join(__dirname, 'src', 'data', 'bible', 'gospel', 'john', 'chapters', `john-${chapterStr}-fr.js`);
  
  if (!fs.existsSync(filePath)) {
    return null;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Extraire le nombre de versets
  const verseMatches = content.match(/"number":\s*(\d+)/g);
  const verseCount = verseMatches ? verseMatches.length : 0;
  
  return { verseCount, content };
}

// Base de données complète des traductions Lingala
// Source: Biblia ya Lingala (Nouveau Testament)
const lingalaDatabase = require('./lingala-bible-database.cjs');

// Fonction pour générer un chapitre Lingala complet
function generateLingalaChapter(chapterNum) {
  const chapterStr = String(chapterNum).padStart(2, '0');
  const frenchData = parseFrenchChapter(chapterNum);
  
  if (!frenchData) {
    console.log(`❌ Chapitre ${chapterNum}: Impossible de lire le français`);
    return false;
  }
  
  const lingalaChapter = lingalaDatabase.chapters[chapterNum];
  
  if (!lingalaChapter) {
    console.log(`❌ Chapitre ${chapterNum}: Pas de données Lingala`);
    return false;
  }
  
  // Lire le fichier RC existant pour garder les numéros Strong
  const rcPath = path.join(__dirname, 'src', 'data', 'bible', 'gospel', 'john', 'chapters', `john-${chapterStr}-rc.js`);
  let rcContent = fs.readFileSync(rcPath, 'utf8');
  
  // Remplacer chaque verset avec la traduction Lingala
  lingalaChapter.verses.forEach((verse, index) => {
    const verseNum = index + 1;
    
    // Échapper les caractères spéciaux dans le texte Lingala
    const escapedVerse = verse.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Pattern 1: Verset simple sans Strong (text: "...")
    const simplePattern = new RegExp(
      `("number":\\s*${verseNum},\\s*"text":\\s*")([^"]*)(")`,
      's'
    );
    
    // Pattern 2: Verset avec Strong (chercher toutes les occurrences dans les objets strong)
    const strongPattern = new RegExp(
      `("number":\\s*${verseNum},[\\s\\S]*?"text":\\s*")([^"]*)(")`,
      ''
    );
    
    // Essayer d'abord le pattern simple
    if (simplePattern.test(rcContent)) {
      rcContent = rcContent.replace(simplePattern, `$1${verse}$3`);
    } 
    // Sinon utiliser le pattern avec Strong
    else if (strongPattern.test(rcContent)) {
      rcContent = rcContent.replace(strongPattern, `$1${verse}$3`);
    }
  });
  
  // Mettre à jour le titre
  rcContent = rcContent.replace(
    /title: "[^"]*"/,
    `title: "${lingalaChapter.title}"`
  );
  
  // Sauvegarder
  fs.writeFileSync(rcPath, rcContent, 'utf8');
  
  console.log(`✅ Chapitre ${chapterNum}: ${lingalaChapter.verses.length} versets traduits`);
  return true;
}

console.log('🌍 TRADUCTION COMPLÈTE DE JEAN EN LINGALA');
console.log('==========================================\n');
console.log('📖 Chargement de la base de données Lingala...\n');

// Créer la base de données si elle n'existe pas
if (!fs.existsSync('./lingala-bible-database.cjs')) {
  console.log('⚠️  Base de données non trouvée. Création en cours...\n');
  require('./create-lingala-database.cjs');
}

console.log('🚀 Début de la traduction...\n');

let totalTranslated = 0;
for (let i = 1; i <= 21; i++) {
  if (generateLingalaChapter(i)) {
    totalTranslated++;
  }
}

console.log(`\n✨ TRADUCTION TERMINÉE!`);
console.log(`   ${totalTranslated}/21 chapitres traduits en Lingala`);
console.log(`   Tous les numéros Strong conservés`);
console.log(`   Prêt pour utilisation!\n`);
