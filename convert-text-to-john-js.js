// ============================================================================
// CONVERTISSEUR - Texte Bible vers Fichiers JavaScript
// ============================================================================
// Ce script convertit du texte brut copié depuis Bible.com
// en fichiers JavaScript formatés pour l'Évangile de Jean

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  fr: {
    language: 'fr',
    languageName: 'FR',
    version: 'Louis Segond 1910',
    fullName: 'Louis Segond 1910 (Français)',
    direction: 'ltr',
    inputDir: 'bibletxt/french',
    outputDir: 'src/data/bible/gospel/french'
  },
  en: {
    language: 'en',
    languageName: 'EN',
    version: 'King James Version',
    fullName: 'King James Version (English)',
    direction: 'ltr',
    inputDir: 'bibletxt/english',
    outputDir: 'src/data/bible/gospel/english'
  },
  es: {
    language: 'es',
    languageName: 'ES',
    version: 'Reina Valera 1960',
    fullName: 'Reina Valera 1960 (Español)',
    direction: 'ltr',
    inputDir: 'bibletxt/spanish',
    outputDir: 'src/data/bible/gospel/spanish'
  },
  de: {
    language: 'de',
    languageName: 'DE',
    version: 'Luther Bibel 1912',
    fullName: 'Luther Bibel 1912 (Deutsch)',
    direction: 'ltr',
    inputDir: 'bibletxt/german',
    outputDir: 'src/data/bible/gospel/german'
  },
  it: {
    language: 'it',
    languageName: 'IT',
    version: 'Nuova Riveduta 2006',
    fullName: 'Nuova Riveduta 2006 (Italiano)',
    direction: 'ltr',
    inputDir: 'bibletxt/italian',
    outputDir: 'src/data/bible/gospel/italian'
  },
  pt: {
    language: 'pt',
    languageName: 'PT',
    version: 'João Ferreira de Almeida',
    fullName: 'João Ferreira de Almeida (Português)',
    direction: 'ltr',
    inputDir: 'bibletxt/portuguese',
    outputDir: 'src/data/bible/gospel/portuguese'
  },
  ru: {
    language: 'ru',
    languageName: 'RU',
    version: 'Russian Synodal Version',
    fullName: 'Russian Synodal Version (Русский)',
    direction: 'ltr',
    inputDir: 'bibletxt/russian',
    outputDir: 'src/data/bible/gospel/russian'
  },
  uk: {
    language: 'uk',
    languageName: 'UK',
    version: 'Ukrainian Bible 1962',
    fullName: 'Ukrainian Bible (Українська Біблія)',
    direction: 'ltr',
    inputDir: 'bibletxt/ukrainian',
    outputDir: 'src/data/bible/gospel/ukrainian'
  },
  he: {
    language: 'he',
    languageName: 'HE',
    version: 'Delitzsch Hebrew Gospels',
    fullName: 'Delitzsch Hebrew Gospels (הברית החדשה)',
    direction: 'rtl',
    inputDir: 'bibletxt/hebrew',
    outputDir: 'src/data/bible/gospel/hebrew'
  },
  ar: {
    language: 'ar',
    languageName: 'AR',
    version: 'Arabic Van Dyck',
    fullName: 'Arabic Van Dyck (العربية)',
    direction: 'rtl',
    inputDir: 'bibletxt/arabic',
    outputDir: 'src/data/bible/gospel/arabic'
  },
  zh: {
    language: 'zh',
    languageName: 'ZH',
    version: 'Chinese Union Version',
    fullName: 'Chinese Union Version (中文)',
    direction: 'ltr',
    inputDir: 'bibletxt/chinese',
    outputDir: 'src/data/bible/gospel/chinese'
  },
  jp: {
    language: 'jp',
    languageName: 'JP',
    version: 'Japanese Living Bible',
    fullName: 'Japanese Living Bible (日本語)',
    direction: 'ltr',
    inputDir: 'bibletxt/japanese',
    outputDir: 'src/data/bible/gospel/japanese'
  },
  ko: {
    language: 'ko',
    languageName: 'KO',
    version: 'Korean Revised Version',
    fullName: 'Korean Revised Version (한국어)',
    direction: 'ltr',
    inputDir: 'bibletxt/korean',
    outputDir: 'src/data/bible/gospel/korean'
  }
};

// ============================================================================
// FONCTIONS DE PARSING
// ============================================================================

/**
 * Parse un fichier texte de chapitre Bible
 * Format attendu:
 * 1 Texte du verset un.
 * 2 Texte du verset deux.
 * 3 Texte du verset trois.
 * ...
 *
 * OU avec numéros de versets intégrés:
 * Na pochatku bulo Slovo... (le numéro sera détecté automatiquement)
 */
function parseChapterText(text) {
  const verses = [];
  const lines = text.split('\n');

  let verseNumber = 1;

  for (let line of lines) {
    line = line.trim();
    if (!line) continue; // Ignorer les lignes vides

    // Détecter le format: "1 Texte du verset"
    const match = line.match(/^(\d+)\s+(.+)$/);

    if (match) {
      verseNumber = parseInt(match[1]);
      const verseText = match[2].trim();
      verses.push({
        number: verseNumber,
        text: verseText,
        strong: []
      });
      verseNumber++;
    } else {
      // Si pas de numéro, utiliser le compteur
      verses.push({
        number: verseNumber,
        text: line,
        strong: []
      });
      verseNumber++;
    }
  }

  return verses;
}

/**
 * Génère le contenu du fichier JavaScript
 */
function generateJavaScriptFile(chapter, verses, config) {
  const chapterPadded = String(chapter).padStart(2, '0');
  const variableName = `johnChapter${chapter}${config.languageName}`;

  const content = `// ============================================================================
// ÉVANGILE DE JEAN - ${config.fullName}
// ============================================================================
// Chapitre ${chapter}

export const ${variableName} = {
  chapter: ${chapter},
  title: "Jean ${chapter}",
  version: "${config.version}",
  language: "${config.language}",
  direction: "${config.direction}",
  verses: [
${verses.map(verse => `    {
      "number": ${verse.number},
      "text": ${JSON.stringify(verse.text)},
      "strong": []
    }`).join(',\n')}
  ]
};

export default ${variableName};
`;

  return content;
}

/**
 * Sauvegarde un fichier JavaScript
 */
function saveFile(chapter, content, config) {
  const chapterPadded = String(chapter).padStart(2, '0');
  const filename = `john-${chapterPadded}-${config.language}.js`;
  const outputDir = path.join(__dirname, config.outputDir);
  const filepath = path.join(outputDir, filename);

  // Créer le dossier si nécessaire
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    console.log(`   📁 Dossier créé: ${config.outputDir}`);
  }

  fs.writeFileSync(filepath, content, 'utf8');
  console.log(`   💾 Sauvegardé: ${filename}`);

  return filepath;
}

// ============================================================================
// FONCTION PRINCIPALE
// ============================================================================

async function main() {
  const args = process.argv.slice(2);

  // Vérifier les arguments
  if (args.length < 1) {
    // Générer la liste des langues disponibles
    const languagesList = Object.entries(CONFIG)
      .map(([code, config]) => `  ${code.padEnd(5)} ${config.version}`)
      .join('\n');

    console.log(`
╔════════════════════════════════════════════════════════════════════════════╗
║ CONVERTISSEUR TEXTE → JAVASCRIPT - Évangile de Jean                       ║
╚════════════════════════════════════════════════════════════════════════════╝

USAGE:
  node convert-text-to-john-js.js <langue> [chapitre]

LANGUES DISPONIBLES (${Object.keys(CONFIG).length} langues):
${languagesList}

EXEMPLES:
  # Convertir tous les chapitres ukrainiens
  node convert-text-to-john-js.js uk

  # Convertir uniquement le chapitre 3 ukrainien
  node convert-text-to-john-js.js uk 3

STRUCTURE DES FICHIERS:
  1. Créez le dossier: bibletxt/<langue>/
  2. Ajoutez les fichiers texte: john-01.txt, john-02.txt, ... john-21.txt
  3. Format du texte (chaque ligne = un verset):
     1 На початку було Слово, і Слово в Бога було...
     2 Воно в Бога було споконвіку.
     3 Усе через Нього повстало...

  OU simplement (sans numéros, détection automatique):
     На початку було Слово, і Слово в Бога було...
     Воно в Бога було споконвіку.
     Усе через Нього повстало...

OUTPUT:
  Les fichiers JavaScript seront créés dans:
  src/data/bible/gospel/<langue>/john-NN-<langue>.js

╔════════════════════════════════════════════════════════════════════════════╗
║ ÉTAPES RECOMMANDÉES:                                                      ║
╚════════════════════════════════════════════════════════════════════════════╝

1. Allez sur https://www.bible.com/bible/143/JHN.1.UKR (pour ukrainien)
2. Copiez le texte du chapitre (versets seulement)
3. Collez dans: bibletxt/ukrainian/john-01.txt
4. Répétez pour les 21 chapitres
5. Lancez: node convert-text-to-john-js.js uk

Le script générera automatiquement tous les fichiers JavaScript formatés!

╚════════════════════════════════════════════════════════════════════════════╝
`);
    process.exit(0);
  }

  const language = args[0].toLowerCase();
  const specificChapter = args[1] ? parseInt(args[1]) : null;

  // Vérifier la langue
  if (!CONFIG[language]) {
    console.error(`❌ Langue invalide: ${language}`);
    console.error(`Langues disponibles: ${Object.keys(CONFIG).join(', ')}`);
    process.exit(1);
  }

  const config = CONFIG[language];
  const inputDir = path.join(__dirname, config.inputDir);

  console.log('╔════════════════════════════════════════════════════════════════════════════╗');
  console.log(`║ CONVERSION - ${config.fullName}`);
  console.log('╚════════════════════════════════════════════════════════════════════════════╝\n');

  // Vérifier que le dossier d'entrée existe
  if (!fs.existsSync(inputDir)) {
    console.error(`❌ Dossier introuvable: ${config.inputDir}`);
    console.error(`\nCréez le dossier et ajoutez les fichiers texte:`);
    console.error(`  ${inputDir}/john-01.txt`);
    console.error(`  ${inputDir}/john-02.txt`);
    console.error(`  ...`);
    console.error(`  ${inputDir}/john-21.txt`);
    process.exit(1);
  }

  const results = {
    success: [],
    failed: [],
    skipped: []
  };

  // Déterminer les chapitres à traiter
  const chaptersToProcess = specificChapter
    ? [specificChapter]
    : Array.from({ length: 21 }, (_, i) => i + 1);

  // Traiter chaque chapitre
  for (const chapter of chaptersToProcess) {
    const chapterPadded = String(chapter).padStart(2, '0');
    const inputFilename = `john-${chapterPadded}.txt`;
    const inputFilepath = path.join(inputDir, inputFilename);

    console.log(`\n📖 Chapitre ${chapter}...`);

    // Vérifier que le fichier existe
    if (!fs.existsSync(inputFilepath)) {
      console.log(`   ⏭️  Fichier non trouvé: ${inputFilename}`);
      results.skipped.push({ chapter, reason: 'Fichier non trouvé' });
      continue;
    }

    try {
      // Lire le fichier texte
      const text = fs.readFileSync(inputFilepath, 'utf8');

      if (!text.trim()) {
        console.log(`   ⚠️  Fichier vide: ${inputFilename}`);
        results.skipped.push({ chapter, reason: 'Fichier vide' });
        continue;
      }

      // Parser les versets
      const verses = parseChapterText(text);

      if (verses.length === 0) {
        console.log(`   ⚠️  Aucun verset détecté dans: ${inputFilename}`);
        results.failed.push({ chapter, error: 'Aucun verset détecté' });
        continue;
      }

      console.log(`   ✅ ${verses.length} versets parsés`);

      // Générer le fichier JavaScript
      const content = generateJavaScriptFile(chapter, verses, config);

      // Sauvegarder
      const outputPath = saveFile(chapter, content, config);

      results.success.push({
        chapter,
        verseCount: verses.length,
        outputPath
      });

    } catch (error) {
      console.error(`   ❌ ERREUR: ${error.message}`);
      results.failed.push({ chapter, error: error.message });
    }
  }

  // Résumé final
  console.log('\n╔════════════════════════════════════════════════════════════════════════════╗');
  console.log('║ RÉSUMÉ');
  console.log('╚════════════════════════════════════════════════════════════════════════════╝\n');

  console.log(`✅ Succès:  ${results.success.length} chapitres`);
  console.log(`⏭️  Ignorés: ${results.skipped.length} chapitres`);
  console.log(`❌ Échecs:  ${results.failed.length} chapitres\n`);

  if (results.success.length > 0) {
    console.log('Fichiers créés:');
    results.success.forEach(r => {
      const chapterPadded = String(r.chapter).padStart(2, '0');
      console.log(`   ✅ john-${chapterPadded}-${config.language}.js (${r.verseCount} versets)`);
    });
    console.log('');
  }

  if (results.skipped.length > 0) {
    console.log('Fichiers ignorés:');
    results.skipped.forEach(r => {
      const chapterPadded = String(r.chapter).padStart(2, '0');
      console.log(`   ⏭️  Chapitre ${chapterPadded}: ${r.reason}`);
    });
    console.log('');
  }

  if (results.failed.length > 0) {
    console.log('Échecs:');
    results.failed.forEach(r => {
      const chapterPadded = String(r.chapter).padStart(2, '0');
      console.log(`   ❌ Chapitre ${chapterPadded}: ${r.error}`);
    });
    console.log('');
  }

  console.log('╔════════════════════════════════════════════════════════════════════════════╗');
  console.log(`║ Dossier de sortie: ${config.outputDir}`);
  console.log('╚════════════════════════════════════════════════════════════════════════════╝\n');
}

// Exécuter le script
main().catch(error => {
  console.error('\n❌ ERREUR FATALE:', error);
  process.exit(1);
});
