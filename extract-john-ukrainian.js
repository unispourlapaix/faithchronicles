// ============================================================================
// SCRIPT D'EXTRACTION - Évangile de Jean en Ukrainien
// ============================================================================
// Ce script récupère les 21 chapitres de l'Évangile de Jean en ukrainien
// depuis des APIs Bible gratuites et les formate en fichiers JavaScript

import https from 'https';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const OUTPUT_DIR = path.join(__dirname, 'src', 'data', 'bible', 'gospel', 'ukrainian');
const BOOK = 'John';
const BOOK_CODE = 'JHN';
const TOTAL_CHAPTERS = 21;
const LANGUAGE = 'uk';

// APIs à tester (par ordre de priorité)
const APIS = [
  {
    name: 'getBible',
    getUrl: (chapter) => `https://getbible.net/json?passage=${BOOK_CODE}${chapter}&version=ukrainian`,
    parseResponse: (data, chapter) => {
      try {
        const json = JSON.parse(data);
        if (!json.book || !json.book[0] || !json.book[0].chapter) {
          return null;
        }
        const chapterData = json.book[0].chapter;
        const verses = [];
        for (const verseNum in chapterData) {
          if (verseNum !== 'chapter_nr' && verseNum !== 'chapter_title') {
            verses.push({
              number: parseInt(verseNum),
              text: chapterData[verseNum].verse.trim(),
              strong: []
            });
          }
        }
        return verses.sort((a, b) => a.number - b.number);
      } catch (e) {
        console.error('Erreur parsing getBible:', e.message);
        return null;
      }
    }
  },
  {
    name: 'Bolls Bible API',
    getUrl: (chapter) => `https://bolls.life/get-chapter/UKR/43/${chapter}/`,
    parseResponse: (data, chapter) => {
      try {
        const json = JSON.parse(data);
        if (!json || !Array.isArray(json)) {
          return null;
        }
        return json.map(verse => ({
          number: verse.verse,
          text: verse.text.trim(),
          strong: []
        }));
      } catch (e) {
        console.error('Erreur parsing Bolls:', e.message);
        return null;
      }
    }
  }
];

// Fonction pour faire une requête HTTP/HTTPS
function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;

    protocol.get(url, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(data);
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${url}`));
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Fonction pour récupérer un chapitre depuis les APIs
async function fetchChapter(chapter) {
  console.log(`\n📖 Récupération du chapitre ${chapter}...`);

  for (const api of APIS) {
    try {
      const url = api.getUrl(chapter);
      console.log(`   Tentative avec ${api.name}...`);

      const data = await fetchUrl(url);
      const verses = api.parseResponse(data, chapter);

      if (verses && verses.length > 0) {
        console.log(`   ✅ Succès! ${verses.length} versets récupérés`);
        return verses;
      }
    } catch (error) {
      console.log(`   ❌ Échec avec ${api.name}: ${error.message}`);
    }
  }

  throw new Error(`Impossible de récupérer le chapitre ${chapter} depuis aucune API`);
}

// Fonction pour générer le contenu du fichier JavaScript
function generateJavaScriptFile(chapter, verses) {
  const chapterPadded = String(chapter).padStart(2, '0');
  const variableName = `johnChapter${chapter}UK`;

  const content = `// ============================================================================
// ÉVANGILE DE JEAN - Ukrainian Bible (Українська Біблія)
// ============================================================================
// Chapitre ${chapter}

export const ${variableName} = {
  chapter: ${chapter},
  title: "Jean ${chapter}",
  version: "Ukrainian Bible 1962",
  language: "uk",
  direction: "ltr",
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

// Fonction pour sauvegarder un fichier
function saveFile(chapter, content) {
  const chapterPadded = String(chapter).padStart(2, '0');
  const filename = `john-${chapterPadded}-uk.js`;
  const filepath = path.join(OUTPUT_DIR, filename);

  // Créer le dossier si nécessaire
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  fs.writeFileSync(filepath, content, 'utf8');
  console.log(`   💾 Sauvegardé: ${filename}`);

  return filepath;
}

// Fonction principale
async function main() {
  console.log('============================================================================');
  console.log('EXTRACTION - Évangile de Jean en Ukrainien');
  console.log('============================================================================\n');

  const results = {
    success: [],
    failed: []
  };

  for (let chapter = 1; chapter <= TOTAL_CHAPTERS; chapter++) {
    try {
      const verses = await fetchChapter(chapter);
      const content = generateJavaScriptFile(chapter, verses);
      const filepath = saveFile(chapter, content);

      results.success.push({
        chapter,
        filepath,
        verseCount: verses.length
      });

      // Petit délai pour ne pas surcharger l'API
      await new Promise(resolve => setTimeout(resolve, 500));

    } catch (error) {
      console.error(`   ❌ ERREUR chapitre ${chapter}: ${error.message}`);
      results.failed.push({
        chapter,
        error: error.message
      });
    }
  }

  // Résumé final
  console.log('\n============================================================================');
  console.log('RÉSUMÉ');
  console.log('============================================================================\n');
  console.log(`✅ Succès: ${results.success.length}/${TOTAL_CHAPTERS} chapitres`);
  console.log(`❌ Échecs: ${results.failed.length}/${TOTAL_CHAPTERS} chapitres\n`);

  if (results.success.length > 0) {
    console.log('Fichiers créés:');
    results.success.forEach(r => {
      const chapterPadded = String(r.chapter).padStart(2, '0');
      console.log(`   - john-${chapterPadded}-uk.js (${r.verseCount} versets)`);
    });
  }

  if (results.failed.length > 0) {
    console.log('\nÉchecs:');
    results.failed.forEach(r => {
      console.log(`   - Chapitre ${r.chapter}: ${r.error}`);
    });
  }

  console.log('\n============================================================================');
  console.log(`Dossier de sortie: ${OUTPUT_DIR}`);
  console.log('============================================================================\n');
}

// Exécuter le script
main().catch(error => {
  console.error('\n❌ ERREUR FATALE:', error);
  process.exit(1);
});
