// ============================================================================
// SCRIPT DE CONVERSION Bible TXT vers JS
// ============================================================================
// Convertit les fichiers .txt Bible en modules JavaScript avec encodage UTF-8

const fs = require('fs');
const path = require('path');

// Configuration des langues
const languages = {
  fr: { version: 'Louis Segond 1910', year: 1910, file: 'segond1910.txt' },
  en: { version: 'World English Bible', year: 2000, file: 'web.txt' },
  es: { version: 'Reina-Valera 1909', year: 1909, file: 'rv1909.txt' },
  pt: { version: 'Almeida 1911', year: 1911, file: 'almeida1911.txt' },
  de: { version: 'Luther 1545', year: 1545, file: 'luther1545.txt' },
  it: { version: 'Riveduta Luzzi 1927', year: 1927, file: 'luzzi1927.txt' },
  ru: { version: 'Synodal 1876', year: 1876, file: 'synodal1876.txt' },
  zh: { version: 'Chinese Union Version', year: 1919, file: 'cuv.txt' },
  ar: {
    inputFile: path.join(__dirname, '../src/data/bible/gospel/john/ar/svd1865-converted.txt'),
    outputDir: path.join(__dirname, '../src/data/bible/gospel/john/chapters'),
    chapterPattern: /={5}\s*(?:الإصحاح|الفصل)\s*(\d+)\s*={5}/g,
    lang: 'ar',
    direction: 'rtl'
  },
  hi: {
    inputFile: path.join(__dirname, '../src/data/bible/gospel/john/hi/irv-converted.txt'),
    outputDir: path.join(__dirname, '../src/data/bible/gospel/john/chapters'),
    chapterPattern: /={5}\s*अध्याय\s*(\d+)\s*={5}/g,
    lang: 'hi',
    direction: 'ltr'
  },
  sw: { version: 'Swahili Union Version', year: 1952, file: 'suv.txt' },
  ko: { version: 'Korean Revised Version', year: 1961, file: 'krv.txt' },
  ja: { version: 'Colloquial Japanese 1955', year: 1955, file: 'colloquial1955.txt' },
  pl: { version: 'Gdańsk Bible 1632', year: 1632, file: 'gdansk1632.txt' }
};

// Détection de la direction du texte
function getTextDirection(langCode) {
  return ['ar', 'he'].includes(langCode) ? 'rtl' : 'ltr';
}

// Parser avec un pattern personnalisé
function parseTxtFileWithPattern(content, pattern) {
  const lines = content.split('\n');
  const chapters = {};
  let currentChapter = null;
  let verses = [];

  for (let line of lines) {
    line = line.trim();
    if (!line) continue;

    // Tester avec le pattern personnalisé
    pattern.lastIndex = 0; // Reset regex
    const chapterMatch = pattern.exec(line);
    
    if (chapterMatch) {
      // Sauvegarder le chapitre précédent
      if (currentChapter && verses.length > 0) {
        chapters[currentChapter] = [...verses];
      }
      
      currentChapter = parseInt(chapterMatch[1]);
      verses = [];
      continue;
    }

    // Détecter les versets : 1:1 Texte du verset
    const verseMatch = line.match(/^(\d+):(\d+)\s+(.+)$/);
    if (verseMatch && currentChapter) {
      const chapterNum = parseInt(verseMatch[1]);
      const verseNum = parseInt(verseMatch[2]);
      const text = verseMatch[3];

      if (chapterNum === currentChapter) {
        verses.push({
          number: verseNum,
          text: text.trim(),
          strong: []
        });
      }
    }
  }

  // Sauvegarder le dernier chapitre
  if (currentChapter && verses.length > 0) {
    chapters[currentChapter] = [...verses];
  }

  return chapters;
}

// Parser un fichier .txt Bible
function parseTxtFile(content) {
  const lines = content.split('\n');
  const chapters = {};
  let currentChapter = null;
  let verses = [];

  for (let line of lines) {
    line = line.trim();
    if (!line) continue;

    // Détecter les chapitres - Support multilingue ultra-complet
    // Support : CHAPITRE 1, CHAPTER 1, 第1章, अध्याय १, SURA YA 1, الأصحاح ١, etc.
    let chapterMatch = line.match(/===+\s*(?:CHAPITRE?|CHAPTER|CAPÍTULO|KAPITEL|CAPITOLO|GŁOWA|ROZDZIAŁ|ГЛАВА|第|الأصحاح|अध्याय|SURA\s+YA|제)\s*(\d+|[০-৯]+|[०-९]+|[٠-٩]+)\s*(?:章|장)?\s*===+/i);
    
    // Si pas trouvé, essayer un pattern plus simple pour numéros non-arabes
    if (!chapterMatch) {
      // Essayer de détecter les chapitres avec chiffres devanagari ou arabes orientaux
      const nonLatinMatch = line.match(/===+\s*(?:अध्याय|SURA\s+YA|الأصحاح)\s+([०-९]+|[٠-٩]+)\s*===+/i);
      if (nonLatinMatch) {
        // Convertir les chiffres devanagari en arabes
        let numberString = nonLatinMatch[1];
        numberString = numberString
          .replace(/०/g, '0').replace(/१/g, '1').replace(/२/g, '2')
          .replace(/३/g, '3').replace(/४/g, '4').replace(/५/g, '5')
          .replace(/६/g, '6').replace(/७/g, '7').replace(/८/g, '8').replace(/९/g, '9')
          .replace(/٠/g, '0').replace(/١/g, '1').replace(/٢/g, '2')
          .replace(/٣/g, '3').replace(/٤/g, '4').replace(/٥/g, '5')
          .replace(/٦/g, '6').replace(/٧/g, '7').replace(/٨/g, '8').replace(/٩/g, '9');
        chapterMatch = [null, numberString];
      }
    }
    
    if (chapterMatch) {
      // Sauvegarder le chapitre précédent
      if (currentChapter && verses.length > 0) {
        chapters[currentChapter] = [...verses];
      }
      
      currentChapter = parseInt(chapterMatch[1]);
      verses = [];
      continue;
    }

    // Détecter les versets : 1:1 Texte du verset
    const verseMatch = line.match(/^(\d+):(\d+)\s+(.+)$/);
    if (verseMatch && currentChapter) {
      const chapterNum = parseInt(verseMatch[1]);
      const verseNum = parseInt(verseMatch[2]);
      const text = verseMatch[3];

      if (chapterNum === currentChapter) {
        verses.push({
          number: verseNum,
          text: text.trim(),
          strong: [] // Les numéros Strong seront ajoutés plus tard
        });
      }
    }
  }

  // Sauvegarder le dernier chapitre
  if (currentChapter && verses.length > 0) {
    chapters[currentChapter] = [...verses];
  }

  return chapters;
}

// Générer le contenu du fichier JS
function generateJsContent(chapterNumber, verses, langCode, langInfo) {
  const direction = getTextDirection(langCode);
  const langName = {
    fr: 'Français',
    en: 'English',
    es: 'Español',
    pt: 'Português',
    de: 'Deutsch',
    it: 'Italiano',
    ru: 'Русский',
    zh: '中文',
    ar: 'العربية',
    hi: 'हिन्दी',
    sw: 'Kiswahili',
    ko: '한국어',
    ja: '日本語',
    pl: 'Polski'
  }[langCode] || langCode.toUpperCase();

  const versesJson = JSON.stringify(verses, null, 2);
  
  const versionInfo = langInfo.version || `${langCode.toUpperCase()}`;
  const actualDirection = direction || getTextDirection(langCode);
  
  return `// ============================================================================
// ÉVANGILE DE JEAN - ${langName} (${versionInfo})
// ============================================================================
// Chapitre ${chapterNumber}

export const johnChapter${chapterNumber}${langCode.toUpperCase()} = {
  chapter: ${chapterNumber},
  title: "Jean ${chapterNumber}",
  version: "${versionInfo}",
  language: "${langCode}",
  direction: "${actualDirection}",
  verses: ${versesJson}
};

export default johnChapter${chapterNumber}${langCode.toUpperCase()};
`;
}

// Convertir une langue
function convertLanguage(langCode) {
  const langInfo = languages[langCode];
  if (!langInfo) {
    console.error(`❌ Langue ${langCode} non trouvée`);
    return;
  }

  // Pour les langues avec configuration personnalisée (ar, hi)
  let txtPath, outputDir, chapterPattern, direction;
  
  if (langInfo.inputFile) {
    // Configuration personnalisée (ar, hi)
    txtPath = langInfo.inputFile;
    outputDir = langInfo.outputDir;
    chapterPattern = langInfo.chapterPattern;
    direction = langInfo.direction;
  } else {
    // Configuration standard
    txtPath = path.join(__dirname, '..', 'src', 'data', 'bible', 'gospel', 'john', langCode, langInfo.file);
    outputDir = path.join(__dirname, '..', 'src', 'data', 'bible', 'gospel', 'john', 'chapters');
  }

  console.log(`\n📖 Conversion de ${langCode.toUpperCase()} - ${langInfo.version || langInfo.lang}...`);
  console.log(`   Fichier source: ${txtPath}`);

  // Vérifier si le fichier existe
  if (!fs.existsSync(txtPath)) {
    console.error(`❌ Fichier non trouvé: ${txtPath}`);
    return;
  }

  // Lire le fichier avec encodage UTF-8
  const content = fs.readFileSync(txtPath, 'utf8');
  
  // Parser les chapitres avec le pattern spécifique si fourni
  const chapters = chapterPattern ? parseTxtFileWithPattern(content, chapterPattern) : parseTxtFile(content);
  
  if (Object.keys(chapters).length === 0) {
    console.error(`❌ Aucun chapitre trouvé dans ${path.basename(txtPath)}`);
    return;
  }

  console.log(`   ✅ ${Object.keys(chapters).length} chapitres trouvés`);

  // Créer le dossier de sortie s'il n'existe pas
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Générer un fichier JS pour chaque chapitre
  let fileCount = 0;
  for (const [chapterNum, verses] of Object.entries(chapters)) {
    const jsContent = generateJsContent(parseInt(chapterNum), verses, langCode, langInfo);
    const outputFile = path.join(outputDir, `john-${String(chapterNum).padStart(2, '0')}-${langCode}.js`);
    
    fs.writeFileSync(outputFile, jsContent, 'utf8');
    fileCount++;
    console.log(`   ✅ Chapitre ${chapterNum}: ${verses.length} versets → ${path.basename(outputFile)}`);
  }

  console.log(`   🎉 ${fileCount} fichiers créés pour ${langCode.toUpperCase()}`);
  return fileCount;
}

// Fonction principale
function main() {
  const args = process.argv.slice(2);
  
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║  CONVERSION Bible TXT → JS avec encodage UTF-8            ║');
  console.log('╚════════════════════════════════════════════════════════════╝');

  if (args.length === 0) {
    console.log('\nUsage: node convertTxtToJs.js [langue1] [langue2] ...');
    console.log('       node convertTxtToJs.js all (pour toutes les langues)');
    console.log('\nLangues disponibles:', Object.keys(languages).join(', '));
    return;
  }

  if (args[0] === 'all') {
    console.log('\n🌍 Conversion de TOUTES les langues...\n');
    let totalFiles = 0;
    for (const langCode of Object.keys(languages)) {
      const count = convertLanguage(langCode);
      if (count) totalFiles += count;
    }
    console.log(`\n╔════════════════════════════════════════════════════════════╗`);
    console.log(`║  ✅ TERMINÉ: ${totalFiles} fichiers créés au total              ║`);
    console.log(`╚════════════════════════════════════════════════════════════╝\n`);
  } else {
    for (const langCode of args) {
      convertLanguage(langCode);
    }
    console.log('\n✅ Conversion terminée!\n');
  }
}

// Exécuter
main();
