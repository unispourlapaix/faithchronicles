// ============================================================================
// BIBLE TXT TO JS CONVERTER - Convertisseur Bible .txt vers modules JS
// ============================================================================
// Script pour convertir les fichiers Bible .txt en modules JavaScript

const fs = require('fs').promises;
const path = require('path');

// Configuration des langues avec leurs informations
const LANGUAGES = {
  'fr': { name: 'Français', version: 'Louis Segond 1910', year: 1910, direction: 'ltr' },
  'en': { name: 'English', version: 'World English Bible', year: 2000, direction: 'ltr' },
  'es': { name: 'Español', version: 'Reina-Valera 1909', year: 1909, direction: 'ltr' },
  'pt': { name: 'Português', version: 'Almeida 1911', year: 1911, direction: 'ltr' },
  'de': { name: 'Deutsch', version: 'Luther 1545', year: 1545, direction: 'ltr' },
  'it': { name: 'Italiano', version: 'Riveduta Luzzi 1927', year: 1927, direction: 'ltr' },
  'ru': { name: 'Русский', version: 'Synodal 1876', year: 1876, direction: 'ltr' },
  'zh': { name: '中文', version: 'Chinese Union Version', year: 1919, direction: 'ltr' },
  'ar': { name: 'العربية', version: 'Smith & Van Dyke 1865', year: 1865, direction: 'rtl' },
  'hi': { name: 'हिन्दी', version: 'Indian Revised Version', year: 2017, direction: 'ltr' },
  'sw': { name: 'Kiswahili', version: 'Swahili Union Version', year: 1952, direction: 'ltr' },
  'ko': { name: '한국어', version: 'Korean Revised Version', year: 1961, direction: 'ltr' },
  'ja': { name: '日本語', version: 'Colloquial Japanese 1955', year: 1955, direction: 'ltr' },
  'pl': { name: 'Polski', version: 'Gdańsk Bible 1632', year: 1632, direction: 'ltr' }
};

/**
 * Parser un fichier .txt Bible
 */
function parseTxtFile(text, langInfo) {
  const lines = text.split('\n');
  const chapters = {};
  let currentChapter = null;
  let verses = [];
  
  console.log(`Parsing Bible text for ${langInfo.name}...`);

  for (let line of lines) {
    line = line.trim();
    if (!line) continue;

    // Détecter les chapitres avec différents formats
    const chapterPatterns = [
      /===+\s*CHAPITRE?\s+(\d+)\s*===+/i,      // Français: CHAPITRE 1
      /===+\s*CHAPTER\s+(\d+)\s*===+/i,        // Anglais: CHAPTER 1  
      /===+\s*第\s*(\d+)\s*章\s*===+/i,        // Chinois: 第 1 章
      /===+\s*الأصحاح\s*(\d+)\s*===+/i,       // Arabe: الأصحاح ١
      /===+\s*CAPÍTULO\s+(\d+)\s*===+/i,       // Espagnol: CAPÍTULO 1
      /===+\s*CAPÍTULO\s+(\d+)\s*===+/i,       // Portugais: CAPÍTULO 1
      /===+\s*KAPITEL\s+(\d+)\s*===+/i,        // Allemand: KAPITEL 1
      /===+\s*CAPITOLO\s+(\d+)\s*===+/i,       // Italien: CAPITOLO 1
      /===+\s*ГЛАВА\s+(\d+)\s*===+/i,          // Russe: ГЛАВА 1
      /===+\s*अध्याय\s+(\d+)\s*===+/i,         // Hindi: अध्याय 1
      /===+\s*장\s+(\d+)\s*===+/i,             // Coréen: 장 1
      /===+\s*第(\d+)章\s*===+/i,              // Japonais: 第1章
      /===+\s*ROZDZIAŁ\s+(\d+)\s*===+/i        // Polonais: ROZDZIAŁ 1
    ];

    let chapterMatch = null;
    for (const pattern of chapterPatterns) {
      chapterMatch = line.match(pattern);
      if (chapterMatch) break;
    }

    if (chapterMatch) {
      // Sauvegarder le chapitre précédent
      if (currentChapter && verses.length > 0) {
        chapters[currentChapter] = {
          chapter: currentChapter,
          verses: [...verses]
        };
        console.log(`  Chapitre ${currentChapter}: ${verses.length} versets`);
      }
      
      // Extraire le numéro de chapitre (gérer les chiffres arabes)
      let chapterNum = chapterMatch[1];
      // Convertir les chiffres arabes si nécessaire
      if (langInfo.direction === 'rtl') {
        const arabicNumbers = {'١': '1', '٢': '2', '٣': '3', '٤': '4', '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9', '٠': '0'};
        chapterNum = chapterNum.replace(/[٠-٩]/g, match => arabicNumbers[match] || match);
      }
      
      currentChapter = parseInt(chapterNum);
      verses = [];
      continue;
    }

    // Détecter les versets : X:Y Texte du verset
    const verseMatch = line.match(/^(\d+):(\d+)\s+(.+)$/);
    if (verseMatch && currentChapter) {
      const chapterNum = parseInt(verseMatch[1]);
      const verseNum = parseInt(verseMatch[2]);
      const text = verseMatch[3];

      if (chapterNum === currentChapter) {
        verses.push({
          number: verseNum,
          text: text.trim(),
          strong: [] // Les numéros Strong seront ajoutés séparément
        });
      }
    }
  }

  // Sauvegarder le dernier chapitre
  if (currentChapter && verses.length > 0) {
    chapters[currentChapter] = {
      chapter: currentChapter,
      verses: [...verses]
    };
    console.log(`  Chapitre ${currentChapter}: ${verses.length} versets`);
  }

  console.log(`Total: ${Object.keys(chapters).length} chapitres parsés`);
  return chapters;
}

/**
 * Générer le code JavaScript pour un chapitre
 */
function generateChapterJS(chapterData, langCode, langInfo) {
  const { chapter, verses } = chapterData;
  
  // Titre selon la langue
  const titles = {
    'fr': `Jean ${chapter}`,
    'en': `John ${chapter}`,
    'es': `Juan ${chapter}`,
    'pt': `João ${chapter}`,
    'de': `Johannes ${chapter}`,
    'it': `Giovanni ${chapter}`,
    'ru': `Иоанн ${chapter}`,
    'zh': `約翰福音 ${chapter}`,
    'ar': `يوحنا ${chapter}`,
    'hi': `यूहन्ना ${chapter}`,
    'sw': `Yohana ${chapter}`,
    'ko': `요한 ${chapter}`,
    'ja': `ヨハネ ${chapter}`,
    'pl': `Jana ${chapter}`
  };

  const title = titles[langCode] || `John ${chapter}`;
  
  const js = `// ============================================================================
// ÉVANGILE DE JEAN - ${langInfo.name.toUpperCase()} (${langInfo.version})
// ============================================================================
// Chapitre ${chapter} - ${title}

export const johnChapter${chapter}${langCode.toUpperCase()} = {
  chapter: ${chapter},
  title: "${title}",
  version: "${langInfo.version}",
  language: "${langCode}",
  direction: "${langInfo.direction}",
  verses: [
${verses.map(verse => 
    `    {\n      number: ${verse.number},\n      text: "${verse.text.replace(/"/g, '\\"')}",\n      strong: ${JSON.stringify(verse.strong)}\n    }`
  ).join(',\n')}
  ]
};

export default johnChapter${chapter}${langCode.toUpperCase()};
`;

  return js;
}

/**
 * Convertir un fichier .txt en modules JS
 */
async function convertLanguage(langCode) {
  const langInfo = LANGUAGES[langCode];
  if (!langInfo) {
    console.error(`Langue non supportée: ${langCode}`);
    return;
  }

  console.log(`\n🌍 Conversion pour ${langInfo.name} (${langCode})...`);
  
  // Trouver le fichier .txt pour cette langue
  const txtDir = path.join(__dirname, '..', 'src', 'data', 'bible', 'gospel', 'john', langCode);
  const txtFiles = await fs.readdir(txtDir).catch(() => []);
  const txtFile = txtFiles.find(f => f.endsWith('.txt'));
  
  if (!txtFile) {
    console.error(`Aucun fichier .txt trouvé pour ${langCode}`);
    return;
  }

  const txtPath = path.join(txtDir, txtFile);
  console.log(`📖 Lecture de: ${txtFile}`);
  
  // Lire le fichier avec l'encodage UTF-8
  const content = await fs.readFile(txtPath, 'utf8');
  
  // Parser le contenu
  const chapters = parseTxtFile(content, langInfo);
  
  // Créer le dossier de sortie
  const outputDir = path.join(__dirname, '..', 'src', 'data', 'bible', 'gospel', 'john', 'chapters');
  await fs.mkdir(outputDir, { recursive: true });
  
  // Générer les fichiers JS pour chaque chapitre
  let createdFiles = 0;
  for (const [chapterNum, chapterData] of Object.entries(chapters)) {
    const jsCode = generateChapterJS(chapterData, langCode, langInfo);
    const filename = `john-${chapterNum.padStart(2, '0')}-${langCode}.js`;
    const filepath = path.join(outputDir, filename);
    
    await fs.writeFile(filepath, jsCode, 'utf8');
    console.log(`✅ Créé: ${filename}`);
    createdFiles++;
  }
  
  console.log(`🎉 ${createdFiles} fichiers créés pour ${langInfo.name}`);
}

/**
 * Fonction principale
 */
async function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('📚 CONVERTISSEUR BIBLE TXT → JS');
    console.log('Usage: node convertBible.js <langue>');
    console.log('Langues disponibles:', Object.keys(LANGUAGES).join(', '));
    console.log('\nExemples:');
    console.log('  node convertBible.js fr    # Convertir le français');
    console.log('  node convertBible.js en    # Convertir l\'anglais');
    console.log('  node convertBible.js zh    # Convertir le chinois');
    console.log('  node convertBible.js ar    # Convertir l\'arabe');
    return;
  }
  
  const targetLang = args[0];
  
  if (targetLang === 'all') {
    // Convertir toutes les langues
    console.log('🌍 Conversion de toutes les langues...');
    for (const langCode of Object.keys(LANGUAGES)) {
      try {
        await convertLanguage(langCode);
      } catch (error) {
        console.error(`❌ Erreur avec ${langCode}:`, error.message);
      }
    }
  } else {
    // Convertir une langue spécifique
    try {
      await convertLanguage(targetLang);
    } catch (error) {
      console.error(`❌ Erreur:`, error.message);
    }
  }
}

// Lancer le script
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { convertLanguage, parseTxtFile, generateChapterJS };
