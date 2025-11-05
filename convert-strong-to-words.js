/**
 * Script pour convertir la structure Strong des chapitres
 * De: { text: "...", strong: ["G123", "G456"] }
 * À: { text: "...", words: [{text: "mot", strong: "G123", start: 0, end: 3}] }
 */

const fs = require('fs');
const path = require('path');

// Mapping manuel des mots avec Strong pour Jean 1:1
// Ce mapping doit être fait manuellement pour chaque verset avec Strong
const STRONG_MAPPINGS = {
  'john-01-fr.js': {
    verses: {
      1: {
        text: "Au commencement était la Parole, et la Parole était avec Dieu, et la Parole était Dieu.",
        words: [
          { text: "Parole", strong: "G3056", start: 25, end: 31 },
          { text: "Parole", strong: "G3056", start: 39, end: 45 },
          { text: "Dieu", strong: "G2316", start: 57, end: 61 },
          { text: "Parole", strong: "G3056", start: 69, end: 75 },
          { text: "Dieu", strong: "G2316", start: 82, end: 86 }
        ]
      }
    }
  },
  'john-01-en.js': {
    verses: {
      1: {
        text: "In the beginning was the Word, and the Word was with God, and the Word was God.",
        words: [
          { text: "Word", strong: "G3056", start: 25, end: 29 },
          { text: "Word", strong: "G3056", start: 43, end: 47 },
          { text: "God", strong: "G2316", start: 58, end: 61 },
          { text: "Word", strong: "G3056", start: 74, end: 78 },
          { text: "God", strong: "G2316", start: 83, end: 86 }
        ]
      }
    }
  },
  'john-01-es.js': {
    verses: {
      1: {
        text: "En el principio era el Verbo, y el Verbo era con Dios, y el Verbo era Dios.",
        words: [
          { text: "Verbo", strong: "G3056", start: 23, end: 28 },
          { text: "Verbo", strong: "G3056", start: 35, end: 40 },
          { text: "Dios", strong: "G2316", start: 50, end: 54 },
          { text: "Verbo", strong: "G3056", start: 62, end: 67 },
          { text: "Dios", strong: "G2316", start: 72, end: 76 }
        ]
      }
    }
  }
};

function convertChapterFile(filePath, mapping) {
  console.log(`\n📖 Conversion de: ${path.basename(filePath)}`);
  
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Extraire le nom de la variable (ex: johnChapter1FR)
  const varMatch = content.match(/export const (\w+) = \{/);
  if (!varMatch) {
    console.log('❌ Structure invalide');
    return;
  }
  
  const varName = varMatch[1];
  
  // Parser le contenu JavaScript
  let newContent = content;
  
  // Pour chaque verset avec mapping
  Object.entries(mapping.verses).forEach(([verseNum, verseData]) => {
    const verseNumber = parseInt(verseNum);
    
    // Trouver le verset dans le fichier
    const verseRegex = new RegExp(
      `{\\s*"number":\\s*${verseNumber},\\s*"text":\\s*"([^"]+)",\\s*"strong":\\s*\\[([^\\]]*)\\]\\s*}`,
      'g'
    );
    
    const match = verseRegex.exec(content);
    if (!match) {
      console.log(`  ⚠️  Verset ${verseNumber} non trouvé`);
      return;
    }
    
    const [fullMatch, text, strongArray] = match;
    
    // Créer la nouvelle structure avec words
    const wordsJson = JSON.stringify(verseData.words, null, 4).replace(/\n/g, '\n    ');
    
    const newVerse = `{
    "number": ${verseNumber},
    "text": "${text}",
    "words": ${wordsJson}
  }`;
    
    newContent = newContent.replace(fullMatch, newVerse);
    console.log(`  ✅ Verset ${verseNumber} converti (${verseData.words.length} mots avec Strong)`);
  });
  
  // Sauvegarder
  fs.writeFileSync(filePath, newContent, 'utf-8');
  console.log(`✨ Fichier sauvegardé`);
}

// Convertir tous les fichiers avec mapping
const chaptersDir = path.join(__dirname, 'src', 'data', 'bible', 'gospel', 'john', 'chapters');

Object.entries(STRONG_MAPPINGS).forEach(([filename, mapping]) => {
  const filePath = path.join(chaptersDir, filename);
  if (fs.existsSync(filePath)) {
    convertChapterFile(filePath, mapping);
  } else {
    console.log(`⚠️  Fichier non trouvé: ${filename}`);
  }
});

console.log('\n✅ Conversion terminée!');
console.log('\n📝 Prochaines étapes:');
console.log('1. Modifier BibleReaderScreen.jsx pour utiliser verse.words au lieu de verse.strong');
console.log('2. Importer et utiliser le composant StrongWord');
console.log('3. Ajouter plus de mappings manuels pour les autres versets');
