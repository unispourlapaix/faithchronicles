// ============================================================================
// SCRIPT - Ajout automatique des numéros Strong aux traductions
// ============================================================================
// Ce script analyse tous les fichiers de traduction de l'Évangile de Jean
// et ajoute automatiquement les numéros Strong détectés dans chaque verset

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Configuration des chemins
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const chaptersDir = path.join(rootDir, 'src', 'data', 'bible', 'gospel', 'john', 'chapters');

/**
 * Charge dynamiquement le dictionnaire Strong pour une langue
 */
const loadStrongDictionary = async (language) => {
  const dictPath = path.join(rootDir, 'src', 'data', 'bible', 'strong', language, 'strongTranslations.js');
  
  try {
    const module = await import(`file://${dictPath}`);
    return module.default || module.strongTranslations || module[`strongTranslations${language.toUpperCase()}`];
  } catch (err) {
    console.warn(`⚠️  Dictionnaire non trouvé pour ${language}: ${err.message}`);
    return {};
  }
};

/**
 * Détection simplifiée des Strong dans un verset
 */
const detectStrongInVerse = async (verseText, language) => {
  const strongDict = await loadStrongDictionary(language);
  const detectedWords = [];
  const usedPositions = new Set();
  
  // Normaliser le texte
  const normalizeWord = (word) => {
    return word
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // accents
      .replace(/['']/g, ' '); // apostrophes
  };
  
  // Construire une map mot → Strong
  const wordToStrong = new Map();
  Object.entries(strongDict).forEach(([strongId, data]) => {
    if (!data || (!data.m && !data.meaning)) return;
    
    const meaning = data.m || data.meaning || '';
    const meaningWords = meaning
      .toLowerCase()
      .replace(/[(),.;:!?]/g, '')
      .split(/\s+/)
      .filter(w => w.length > 3);
    
    meaningWords.forEach(word => {
      const normalized = normalizeWord(word);
      if (!wordToStrong.has(normalized)) {
        wordToStrong.set(normalized, []);
      }
      wordToStrong.get(normalized).push({
        strong: strongId,
        score: 5 // score de base
      });
    });
  });
  
  // Analyser le verset
  const words = verseText.split(/\b/);
  let position = 0;
  
  for (const word of words) {
    const cleaned = word.replace(/[,.;:!?()]/g, '').trim();
    if (cleaned.length > 3) {
      const normalized = normalizeWord(cleaned);
      const positionKey = `${position}-${position + word.length}`;
      
      if (!usedPositions.has(positionKey) && wordToStrong.has(normalized)) {
        const matches = wordToStrong.get(normalized);
        const bestMatch = matches[0];
        
        detectedWords.push({
          text: cleaned,
          strong: bestMatch.strong,
          start: position,
          end: position + word.length,
          confidence: bestMatch.score
        });
        
        usedPositions.add(positionKey);
      }
    }
    position += word.length;
  }
  
  return detectedWords;
};

// Langues supportées (14 langues)
const LANGUAGES = [
  'fr', 'en', 'es', 'pt', 'de', 'it', 'ru', 
  'zh', 'ar', 'hi', 'ko', 'ja', 'uk', 'he'
];

// Liste des chapitres de Jean (1-21)
const CHAPTERS = Array.from({ length: 21 }, (_, i) => i + 1);

/**
 * Lit et parse un fichier de chapitre
 */
const readChapterFile = (chapterNum, language) => {
  const filename = `john-${String(chapterNum).padStart(2, '0')}-${language}.js`;
  const filePath = path.join(chaptersDir, filename);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Fichier non trouvé: ${filename}`);
    return null;
  }
  
  const content = fs.readFileSync(filePath, 'utf-8');
  return { filePath, content };
};

/**
 * Détecte les Strong dans un verset et formate pour l'export
 */
const processVerse = async (verse, language) => {
  const detectedWords = await detectStrongInVerse(verse.text, language);
  
  // Filtre avec seuil de confiance >= 5
  const strongWords = detectedWords
    .filter(w => w.confidence >= 5)
    .map(w => ({
      text: w.text,
      strong: w.strong,
      start: w.start,
      end: w.end
    }));
  
  return strongWords;
};

/**
 * Met à jour le tableau strong dans le contenu du fichier
 */
const updateStrongInContent = (content, verseNumber, strongWords) => {
  // Trouve le verset spécifique
  const versePattern = new RegExp(
    `(\\{\\s*"number":\\s*${verseNumber},\\s*"text":\\s*"[^"]*",\\s*"strong":\\s*)\\[\\s*\\]`,
    'g'
  );
  
  // Génère le nouveau tableau strong
  const strongArray = strongWords.length > 0 
    ? JSON.stringify(strongWords, null, 6).split('\n').map((line, i) => 
        i === 0 ? line : '      ' + line
      ).join('\n')
    : '[]';
  
  // Remplace
  const updatedContent = content.replace(
    versePattern,
    `$1${strongArray}`
  );
  
  return updatedContent;
};

/**
 * Traite un fichier de chapitre complet
 */
const processChapterFile = async (chapterNum, language) => {
  console.log(`\n📖 Traitement: Jean ${chapterNum} - ${language.toUpperCase()}`);
  
  const fileData = readChapterFile(chapterNum, language);
  if (!fileData) return;
  
  let { filePath, content } = fileData;
  
  // Extrait les versets via regex (simplifiée)
  const verseMatches = [...content.matchAll(/"number":\s*(\d+),\s*"text":\s*"([^"]+)"/g)];
  
  let updatedCount = 0;
  
  for (const match of verseMatches) {
    const verseNumber = parseInt(match[1]);
    const verseText = match[2];
    
    try {
      // Détecte les Strong
      const strongWords = await processVerse({ text: verseText }, language);
      
      if (strongWords.length > 0) {
        // Met à jour le contenu
        content = updateStrongInContent(content, verseNumber, strongWords);
        updatedCount++;
        console.log(`  ✅ Verset ${verseNumber}: ${strongWords.length} Strong détectés`);
      } else {
        console.log(`  ⚪ Verset ${verseNumber}: aucun Strong détecté`);
      }
    } catch (error) {
      console.error(`  ❌ Erreur verset ${verseNumber}:`, error.message);
    }
  }
  
  // Sauvegarde le fichier modifié
  if (updatedCount > 0) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`✨ Fichier sauvegardé: ${updatedCount} versets mis à jour`);
  } else {
    console.log(`⚪ Aucune modification nécessaire`);
  }
};

/**
 * Fonction principale
 */
const main = async () => {
  console.log('🚀 SCRIPT - Ajout automatique des numéros Strong');
  console.log('='.repeat(60));
  
  // Arguments en ligne de commande
  const args = process.argv.slice(2);
  const specificLanguage = args[0]; // Ex: npm run add-strong fr
  const specificChapter = args[1] ? parseInt(args[1]) : null; // Ex: npm run add-strong fr 1
  
  const languagesToProcess = specificLanguage 
    ? [specificLanguage] 
    : LANGUAGES;
  
  const chaptersToProcess = specificChapter 
    ? [specificChapter] 
    : CHAPTERS;
  
  console.log(`📋 Langues: ${languagesToProcess.join(', ')}`);
  console.log(`📋 Chapitres: ${chaptersToProcess.join(', ')}`);
  console.log('');
  
  let totalProcessed = 0;
  
  for (const language of languagesToProcess) {
    for (const chapter of chaptersToProcess) {
      await processChapterFile(chapter, language);
      totalProcessed++;
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log(`✅ Terminé! ${totalProcessed} fichiers traités`);
  console.log('💡 Vérifiez les fichiers modifiés avant de commit');
};

// Exécution
main().catch(error => {
  console.error('❌ Erreur fatale:', error);
  process.exit(1);
});
