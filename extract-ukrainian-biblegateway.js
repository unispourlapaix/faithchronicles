// ============================================================================
// EXTRACTION TEXTE UKRAINIEN depuis BibleGateway
// ============================================================================
// Extrait le texte ukrainien pour Jean depuis BibleGateway.com

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CHAPTERS_DIR = path.join(__dirname, 'src', 'data', 'bible', 'gospel', 'john', 'chapters');
const BIBLETXT_DIR = path.join(__dirname, 'bibletxt', 'ukrainian');

// Fonction pour extraire depuis BibleGateway
function fetchBibleGateway(chapter) {
  return new Promise((resolve, reject) => {
    // UKR = Ukrainian Bible
    const url = `https://www.biblegateway.com/passage/?search=John+${chapter}&version=UKR&interface=print`;

    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

// Parser le HTML de BibleGateway
function parseUkrainianVerses(html) {
  const verses = {};

  // BibleGateway met tous les versets sur une seule ligne
  // Format: <p class="verse"><span class="text John-X-Y"><sup class="versenum">Y </sup>texte ukrainien</span></p>

  // Pattern pour extraire chaque bloc de verset
  const versePattern = /<p class="verse[^"]*">\s*<span[^>]*class="text John-\d+-(\d+)"[^>]*>(?:<span class="chapternum">\d+\s*<\/span>)?(?:<sup class="versenum">)?(\d+)?(?:\s*<\/sup>)?(.*?)<\/span>\s*<\/p>/g;

  let match;
  while ((match = versePattern.exec(html)) !== null) {
    const verseNum = parseInt(match[1]); // Numéro du verset depuis l'id "John-X-Y"
    let verseText = match[3];

    // Nettoyer le HTML
    verseText = verseText
      .replace(/<[^>]*>/g, '')  // Supprimer les balises
      .replace(/&nbsp;/g, ' ')
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/\s+/g, ' ')  // Normaliser les espaces
      .trim();

    // Vérifier que c'est du texte ukrainien (cyrillique)
    if (verseText.length > 5 && /[А-ЯІЇЄҐа-яіїєґ]/.test(verseText)) {
      verses[verseNum] = verseText;
    }
  }

  return verses;
}

// Mettre à jour les fichiers
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
  const startChapter = parseInt(process.argv[2]) || 2;
  const endChapter = parseInt(process.argv[3]) || 21;

  console.log('╔════════════════════════════════════════════════════════════════════════════╗');
  console.log('║ EXTRACTION UKRAINIEN - BibleGateway');
  console.log('╚════════════════════════════════════════════════════════════════════════════╝\n');
  console.log(`📖 Extraction chapitres ${startChapter} à ${endChapter}...\n`);

  const results = {
    success: [],
    failed: []
  };

  for (let chapter = startChapter; chapter <= endChapter; chapter++) {
    try {
      console.log(`\n📖 Chapitre ${chapter}...`);
      console.log(`   🌐 Téléchargement depuis BibleGateway...`);

      const html = await fetchBibleGateway(chapter);
      const verses = parseUkrainianVerses(html);

      const verseCount = Object.keys(verses).length;

      if (verseCount === 0) {
        console.log(`   ⚠️  Aucun verset extrait`);
        results.failed.push({ chapter, reason: 'Aucun verset extrait' });
      } else {
        console.log(`   ✅ ${verseCount} versets extraits`);

        const updatedCount = updateChapterFile(chapter, verses);
        console.log(`   💾 ${updatedCount} versets mis à jour dans john-${String(chapter).padStart(2, '0')}-uk.js`);

        results.success.push({ chapter, verseCount, updatedCount });
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
  }

  console.log('\n');
}

main().catch(error => {
  console.error('\n❌ ERREUR FATALE:', error);
  process.exit(1);
});
