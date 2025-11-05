const fs = require('fs');
const path = require('path');

// Dictionnaire de traduction pour les termes fréquents
const translationDictionary = {
  // Titres et descriptions
  "La Genèse": "Genesis",
  "L'Exode": "Exodus", 
  "Jésus-Christ": "Jesus Christ",
  "Crucifixion/Résurrection": "Crucifixion/Resurrection",
  "Église primitive": "Early Church",
  "Missions de Paul": "Paul's Missions", 
  "Lettres/Apocalypse": "Letters/Revelation",
  "Niveau Bonus": "Bonus Level",
  
  // Termes spirituels communs
  "la connaissance": "knowledge",
  "la sagesse": "wisdom",
  "la foi": "faith", 
  "l'amour": "love",
  "la grâce": "grace",
  "le salut": "salvation",
  "la résurrection": "resurrection",
  "l'Éternel": "the Lord",
  "Dieu": "God",
  "Jésus": "Jesus",
  "Christ": "Christ",
  "Saint-Esprit": "Holy Spirit",
  "la Bible": "the Bible",
  "les Écritures": "the Scriptures",
  "le Royaume": "the Kingdom",
  "le Royaume des cieux": "the kingdom of heaven",
  
  // Expressions courantes
  "Au commencement": "In the beginning",
  "Il est écrit": "It is written",
  "En vérité": "Truly", 
  "Amen": "Amen",
  "Alléluia": "Hallelujah",
  "Hosanna": "Hosanna",
  
  // Termes de jeu
  "niveau": "level",
  "chapitre": "chapter", 
  "question": "question",
  "réponse": "answer",
  "indice": "hint",
  "fait amusant": "fun fact",
  "défi": "challenge",
  "facile": "easy",
  "moyen": "medium",
  "difficile": "hard",
  
  // Versets et références
  "Jean": "John",
  "Matthieu": "Matthew", 
  "Marc": "Mark",
  "Luc": "Luke",
  "Actes": "Acts",
  "Romains": "Romans",
  "Corinthiens": "Corinthians",
  "Galates": "Galatians",
  "Éphésiens": "Ephesians",
  "Philippiens": "Philippians",
  "Colossiens": "Colossians",
  "Thessaloniciens": "Thessalonians",
  "Timothée": "Timothy",
  "Tite": "Titus",
  "Philémon": "Philemon",
  "Hébreux": "Hebrews",
  "Jacques": "James",
  "Pierre": "Peter",
  "Apocalypse": "Revelation",
  "Genèse": "Genesis",
  "Exode": "Exodus",
  "Lévitique": "Leviticus",
  "Nombres": "Numbers",
  "Deutéronome": "Deuteronomy",
  "Josué": "Joshua",
  "Juges": "Judges",
  "Ruth": "Ruth",
  "Samuel": "Samuel",
  "Rois": "Kings",
  "Chroniques": "Chronicles",
  "Esdras": "Ezra",
  "Néhémie": "Nehemiah",
  "Esther": "Esther",
  "Job": "Job",
  "Psaumes": "Psalms",
  "Proverbes": "Proverbs",
  "Ecclésiaste": "Ecclesiastes",
  "Cantique": "Song of Songs",
  "Ésaïe": "Isaiah",
  "Jérémie": "Jeremiah",
  "Lamentations": "Lamentations",
  "Ézéchiel": "Ezekiel",
  "Daniel": "Daniel",
  "Osée": "Hosea",
  "Joël": "Joel",
  "Amos": "Amos",
  "Abdias": "Obadiah",
  "Jonas": "Jonah",
  "Michée": "Micah",
  "Nahum": "Nahum",
  "Habacuc": "Habakkuk",
  "Sophonie": "Zephaniah",
  "Aggée": "Haggai",
  "Zacharie": "Zechariah",
  "Malachie": "Malachi"
};

// Fonction de traduction basique utilisant le dictionnaire
function basicTranslate(text) {
  let translated = text;
  
  // Remplacer les termes du dictionnaire (insensible à la casse)
  Object.keys(translationDictionary).forEach(frenchTerm => {
    const englishTerm = translationDictionary[frenchTerm];
    const regex = new RegExp(frenchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    translated = translated.replace(regex, englishTerm);
  });
  
  return translated;
}

// Fonction pour traduire un objet de manière récursive
function translateObject(obj) {
  if (typeof obj === 'string') {
    return basicTranslate(obj);
  } else if (Array.isArray(obj)) {
    return obj.map(translateObject);
  } else if (obj && typeof obj === 'object') {
    const translated = {};
    for (const [key, value] of Object.entries(obj)) {
      translated[key] = translateObject(value);
    }
    return translated;
  }
  return obj;
}

// Fonction pour créer un fichier de traduction anglaise
function createEnglishTranslation(chapterNum) {
  const frenchFilePath = path.join(__dirname, 'src', 'data', 'translations', 'fr', `interface_chapter${chapterNum}.js`);
  const englishFilePath = path.join(__dirname, 'src', 'data', 'translations', 'en', `interface_chapter${chapterNum}.js`);
  
  try {
    // Lire le fichier français
    const frenchContent = fs.readFileSync(frenchFilePath, 'utf8');
    
    // Extraire l'objet JavaScript du fichier
    const exportMatch = frenchContent.match(/export const chapter\d+Translations = ({[\s\S]*});/);
    if (!exportMatch) {
      throw new Error(`Could not find chapter translations in ${frenchFilePath}`);
    }
    
    // Évaluer l'objet JavaScript (attention : ceci est dangereux en production)
    const frenchData = eval(`(${exportMatch[1]})`);
    
    // Traduire l'objet
    const englishData = translateObject(frenchData);
    
    // Générer le contenu du fichier anglais
    const englishContent = `// ============================================================================
// ENGLISH TRANSLATIONS - CHAPTER ${chapterNum}: ${englishData.name.toUpperCase()}
// ============================================================================
// Levels ${getChapterLevelRange(chapterNum)} (13 levels, 39 questions)

export const chapter${chapterNum}Translations = ${JSON.stringify(englishData, null, 2)};

export default chapter${chapterNum}Translations;`;

    // Écrire le fichier anglais
    fs.writeFileSync(englishFilePath, englishContent);
    console.log(`✅ Created ${englishFilePath}`);
    
  } catch (error) {
    console.error(`❌ Error processing chapter ${chapterNum}:`, error.message);
  }
}

// Fonction pour obtenir la plage de niveaux d'un chapitre
function getChapterLevelRange(chapterNum) {
  const ranges = {
    1: '1-13',
    2: '14-26', 
    3: '27-39',
    4: '40-52',
    5: '53-65', 
    6: '66-78',
    7: '79-91',
    8: '92-104'
  };
  return ranges[chapterNum] || 'Unknown';
}

// Script principal
console.log('🚀 Starting automatic translation process...');

// Créer les traductions pour les chapitres 4 à 8
for (let i = 4; i <= 8; i++) {
  createEnglishTranslation(i);
}

console.log('✅ Translation process completed!');