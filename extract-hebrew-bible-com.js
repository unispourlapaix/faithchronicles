// ============================================================================
// EXTRACTION HÉBREU - Jean 7-21 depuis Bible.com
// ============================================================================
// Extrait les chapitres 7-21 de Jean en hébreu (Delitzsch Hebrew Gospels)

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CHAPTERS_DIR = path.join(__dirname, 'src', 'data', 'bible', 'gospel', 'john', 'chapters');
const BIBLETXT_DIR = path.join(__dirname, 'bibletxt', 'hebrew');

// Créer le dossier bibletxt/hebrew s'il n'existe pas
if (!fs.existsSync(BIBLETXT_DIR)) {
  fs.mkdirSync(BIBLETXT_DIR, { recursive: true });
}

// Fonction pour extraire depuis Bible.com
function fetchBibleCom(chapter) {
  return new Promise((resolve, reject) => {
    // HHH = Delitzsch Hebrew Gospels
    const url = `https://www.bible.com/bible/323/JHN.${chapter}.HHH`;

    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

// Parser le HTML de Bible.com pour extraire les versets hébreux
function parseHebrewVerses(html) {
  const verses = {};

  // Bible.com utilise un format JSON embarqué dans le HTML
  // Chercher le pattern: "content":[{"verse":X,"content":"texte hébreu"}]

  // D'abord essayer de trouver le JSON embarqué
  const jsonMatch = html.match(/"chapters":\s*\[(.*?)\]/s);

  if (jsonMatch) {
    try {
      const chaptersData = JSON.parse('[' + jsonMatch[1] + ']');
      if (chaptersData[0] && chaptersData[0].content) {
        chaptersData[0].content.forEach(verse => {
          if (verse.verse && verse.content) {
            // Nettoyer le contenu HTML
            let text = verse.content
              .replace(/<[^>]*>/g, '')
              .replace(/&nbsp;/g, ' ')
              .replace(/&quot;/g, '"')
              .replace(/&amp;/g, '&')
              .replace(/&#8203;/g, '') // Zero-width space
              .trim();

            // Vérifier que c'est du texte hébreu
            if (text.length > 0 && /[\u0590-\u05FF]/.test(text)) {
              verses[verse.verse] = text;
            }
          }
        });
      }
    } catch (e) {
      console.error('   ⚠️  Erreur parsing JSON:', e.message);
    }
  }

  // Si ça n'a pas marché, essayer l'extraction HTML directe
  if (Object.keys(verses).length === 0) {
    // Pattern pour les versets dans le HTML
    const versePattern = /<span[^>]*class="[^"]*verse[^"]*"[^>]*data-usfm="[^"]*\.(\d+)"[^>]*>(.*?)<\/span>/gi;

    let match;
    while ((match = versePattern.exec(html)) !== null) {
      const verseNum = parseInt(match[1]);
      let verseText = match[2];

      // Nettoyer le HTML
      verseText = verseText
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, '&')
        .replace(/&#8203;/g, '')
        .trim();

      // Vérifier que c'est du texte hébreu (plage Unicode hébreu)
      if (verseText.length > 5 && /[\u0590-\u05FF]/.test(verseText)) {
        verses[verseNum] = verseText;
      }
    }
  }

  return verses;
}

// Créer un fichier JavaScript pour un chapitre
function createChapterFile(chapter, verses) {
  const chapterPadded = String(chapter).padStart(2, '0');
  const filepath = path.join(CHAPTERS_DIR, `john-${chapterPadded}-he.js`);

  const verseCount = Object.keys(verses).length;
  const versesArray = [];

  for (let i = 1; i <= verseCount; i++) {
    if (verses[i]) {
      // Échapper les guillemets et backslashes dans le texte hébreu
      const escapedText = verses[i]
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"');

      versesArray.push(`  {
    "number": ${i},
    "text": "${escapedText}",
    "strong": []
  }`);
    }
  }

  const content = `// ============================================================================
// ÉVANGILE DE JEAN - Delitzsch Hebrew Gospels (הברית החדשה)
// ============================================================================
// Chapitre ${chapter}

export const johnChapter${chapter}HE = {
  chapter: ${chapter},
  title: "Jean ${chapter}",
  version: "Delitzsch Hebrew Gospels",
  language: "he",
  direction: "rtl",
  verses: [
${versesArray.join(',\n')}
  ]
};

export default johnChapter${chapter}HE;
`;

  fs.writeFileSync(filepath, content, 'utf8');

  // Créer aussi un fichier texte
  const txtPath = path.join(BIBLETXT_DIR, `john-${chapterPadded}.txt`);
  const txtContent = Object.entries(verses)
    .sort(([a], [b]) => parseInt(a) - parseInt(b))
    .map(([num, text]) => `${num} ${text}`)
    .join('\n');

  fs.writeFileSync(txtPath, txtContent, 'utf8');

  return verseCount;
}

// Fonction principale
async function main() {
  const startChapter = parseInt(process.argv[2]) || 7;
  const endChapter = parseInt(process.argv[3]) || 21;

  console.log('╔════════════════════════════════════════════════════════════════════════════╗');
  console.log('║ EXTRACTION HÉBREU - Jean depuis Bible.com');
  console.log('╚════════════════════════════════════════════════════════════════════════════╝\n');
  console.log(`📖 Extraction chapitres ${startChapter} à ${endChapter}...\n`);

  const results = {
    success: [],
    failed: []
  };

  for (let chapter = startChapter; chapter <= endChapter; chapter++) {
    try {
      console.log(`\n📖 Chapitre ${chapter}...`);
      console.log(`   🌐 Téléchargement depuis Bible.com...`);

      const html = await fetchBibleCom(chapter);
      const verses = parseHebrewVerses(html);

      const verseCount = Object.keys(verses).length;

      if (verseCount === 0) {
        console.log(`   ⚠️  Aucun verset extrait`);
        results.failed.push({ chapter, reason: 'Aucun verset extrait' });
      } else {
        console.log(`   ✅ ${verseCount} versets extraits`);

        const created = createChapterFile(chapter, verses);
        console.log(`   💾 Fichier créé: john-${String(chapter).padStart(2, '0')}-he.js`);

        results.success.push({ chapter, verseCount });
      }

      // Délai pour ne pas surcharger le serveur
      await new Promise(resolve => setTimeout(resolve, 2000));

    } catch (error) {
      console.error(`   ❌ Erreur: ${error.message}`);
      results.failed.push({ chapter, reason: error.message });
    }
  }

  console.log('\n╔════════════════════════════════════════════════════════════════════════════╗');
  console.log('║ RÉSUMÉ');
  console.log('╚════════════════════════════════════════════════════════════════════════════╝\n');
  console.log(`✅ Succès: ${results.success.length} chapitres`);
  console.log(`❌ Échecs: ${results.failed.length} chapitres\n`);

  if (results.success.length > 0) {
    console.log('Chapitres extraits:');
    results.success.forEach(r => {
      console.log(`   ✅ Jean ${r.chapter}: ${r.verseCount} versets`);
    });

    const totalVerses = results.success.reduce((sum, r) => sum + r.verseCount, 0);
    console.log(`\n📊 Total: ${totalVerses} versets extraits`);
  }

  if (results.failed.length > 0) {
    console.log('\nÉchecs:');
    results.failed.forEach(r => {
      console.log(`   ❌ Jean ${r.chapter}: ${r.reason}`);
    });
  }

  console.log('\n');
}

main().catch(error => {
  console.error('\n❌ ERREUR FATALE:', error);
  process.exit(1);
});
