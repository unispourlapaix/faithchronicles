// ============================================================================
// TRADUCTION AUTOMATIQUE - Tous les chapitres de Jean en ukrainien
// ============================================================================
// Utilise WebFetch/scraping pour extraire depuis Bible.com

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CHAPTERS_DIR = path.join(__dirname, 'src', 'data', 'bible', 'gospel', 'john', 'chapters');
const BIBLETXT_DIR = path.join(__dirname, 'bibletxt', 'ukrainian');

// Fonction pour extraire le HTML depuis Bible.com
function fetchBibleCom(chapter) {
  return new Promise((resolve, reject) => {
    const url = `https://www.bible.com/bible/143/JHN.${chapter}.UKR`;

    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

// Parser le HTML pour extraire les versets ukrainiens
function parseUkrainianVerses(html) {
  const verses = {};

  // Pattern simple pour capturer les versets
  // Format approximatif: <span class="verse">N</span> texte ukrainien

  // Méthode alternative: chercher les patterns de versets
  // Bible.com structure: généralement des patterns comme data-usfm="JHN.1.1"

  const lines = html.split('\n');
  let currentVerse = null;

  for (const line of lines) {
    // Chercher les numéros de versets
    const verseMatch = line.match(/data-usfm="JHN\.\d+\.(\d+)"/);
    if (verseMatch) {
      currentVerse = parseInt(verseMatch[1]);
    }

    // Chercher le texte ukrainien (caractères cyrilliques)
    const ukrainianMatch = line.match(/>([А-ЯІЇЄҐа-яіїєґ][^<]{20,})</);
    if (ukrainianMatch && currentVerse) {
      const text = ukrainianMatch[1]
        .trim()
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>');

      if (text.length > 10 && /[А-ЯІЇЄҐа-яіїєґ]/.test(text)) {
        verses[currentVerse] = text;
      }
    }
  }

  return verses;
}

// Mettre à jour un fichier avec le texte ukrainien
function updateChapterFile(chapter, verses) {
  const chapterPadded = String(chapter).padStart(2, '0');
  const filepath = path.join(CHAPTERS_DIR, `john-${chapterPadded}-uk.js`);

  if (!fs.existsSync(filepath)) {
    console.log(`   ⏭️  Fichier non trouvé: john-${chapterPadded}-uk.js`);
    return 0;
  }

  let content = fs.readFileSync(filepath, 'utf8');
  let updatedCount = 0;

  for (const [verseNum, ukrainianText] of Object.entries(verses)) {
    const pattern = new RegExp(
      `("number":\\s*${verseNum},\\s*"text":\\s*)"[^"]*"`,
      'g'
    );

    const escapedText = ukrainianText
      .replace(/\\/g, '\\\\')
      .replace(/"/g, '\\"');

    const newContent = content.replace(pattern, `$1"${escapedText}"`);

    if (newContent !== content) {
      updatedCount++;
      content = newContent;
    }
  }

  if (updatedCount > 0) {
    fs.writeFileSync(filepath, content, 'utf8');
  }

  // Aussi mettre à jour le fichier texte
  const txtPath = path.join(BIBLETXT_DIR, `john-${chapterPadded}.txt`);
  const txtContent = Object.entries(verses)
    .sort(([a], [b]) => parseInt(a) - parseInt(b))
    .map(([num, text]) => `${num} ${text}`)
    .join('\n');

  if (txtContent) {
    fs.writeFileSync(txtPath, txtContent, 'utf8');
  }

  return updatedCount;
}

// Fonction principale
async function main() {
  const startChapter = parseInt(process.argv[2]) || 2;  // Commencer à 2 car 1 est déjà fait
  const endChapter = parseInt(process.argv[3]) || 21;

  console.log('╔════════════════════════════════════════════════════════════════════════════╗');
  console.log('║ TRADUCTION AUTOMATIQUE - Jean en ukrainien');
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
      const verses = parseUkrainianVerses(html);

      const verseCount = Object.keys(verses).length;

      if (verseCount === 0) {
        console.log(`   ⚠️  Aucun verset extrait (parsing a échoué)`);
        results.failed.push({ chapter, reason: 'Aucun verset extrait' });
      } else {
        console.log(`   ✅ ${verseCount} versets extraits`);

        const updatedCount = updateChapterFile(chapter, verses);
        console.log(`   💾 ${updatedCount} versets mis à jour dans john-${String(chapter).padStart(2, '0')}-uk.js`);

        results.success.push({ chapter, verseCount, updatedCount });
      }

      // Délai pour ne pas surcharger Bible.com
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
    console.log('Chapitres traduits:');
    results.success.forEach(r => {
      console.log(`   ✅ Jean ${r.chapter}: ${r.verseCount} versets`);
    });
  }

  if (results.failed.length > 0) {
    console.log('\nÉchecs:');
    results.failed.forEach(r => {
      console.log(`   ❌ Jean ${r.chapter}: ${r.reason}`);
    });
    console.log('\n⚠️  Pour les chapitres échoués, vous devrez copier manuellement depuis Bible.com');
  }

  console.log('\n');
}

main().catch(error => {
  console.error('\n❌ ERREUR FATALE:', error);
  process.exit(1);
});
