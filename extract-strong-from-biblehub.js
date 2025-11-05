// ============================================================================
// EXTRACTION NUMÉROS STRONG depuis BibleHub
// ============================================================================
// Extrait les numéros Strong pour Jean depuis biblehub.com/interlinear

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_FILE = path.join(__dirname, 'john-strong-numbers.json');

// Fonction pour extraire le HTML
function fetchPage(chapter) {
  return new Promise((resolve, reject) => {
    const url = `https://biblehub.com/interlinear/john/${chapter}.htm`;

    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

// Parser les Strong depuis le HTML
function parseStrongNumbers(html, chapter) {
  const verses = {};

  // Pattern pour capturer les numéros Strong
  // Format: <a href="/greek/XXXX.htm">
  const strongPattern = /\/greek\/(\d+)\.htm/g;

  // Pattern pour les versets
  // On cherche des patterns comme: <span class="verse">1</span>
  const versePattern = /<span class="verse">(\d+)<\/span>(.*?)(?=<span class="verse">|\$)/gs;

  const verseMatches = [...html.matchAll(versePattern)];

  for (const match of verseMatches) {
    const verseNum = parseInt(match[1]);
    const verseContent = match[2];

    // Extraire tous les Strong de ce verset
    const strongMatches = [...verseContent.matchAll(strongPattern)];
    const strongNumbers = strongMatches.map(m => 'G' + m[1]);

    verses[verseNum] = strongNumbers;
  }

  return verses;
}

// Fonction principale
async function main() {
  console.log('╔════════════════════════════════════════════════════════════════════════════╗');
  console.log('║ EXTRACTION STRONG - Évangile de Jean depuis BibleHub');
  console.log('╚════════════════════════════════════════════════════════════════════════════╝\n');

  const allStrong = {};

  for (let chapter = 1; chapter <= 21; chapter++) {
    try {
      console.log(`📖 Extraction chapitre ${chapter}...`);

      const html = await fetchPage(chapter);
      const verses = parseStrongNumbers(html, chapter);

      allStrong[chapter] = verses;

      const verseCount = Object.keys(verses).length;
      console.log(`   ✅ ${verseCount} versets extraits`);

      // Délai pour ne pas surcharger le serveur
      await new Promise(resolve => setTimeout(resolve, 1000));

    } catch (error) {
      console.error(`   ❌ Erreur chapitre ${chapter}:`, error.message);
    }
  }

  // Sauvegarder
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(allStrong, null, 2), 'utf8');

  console.log('\n╔════════════════════════════════════════════════════════════════════════════╗');
  console.log('║ RÉSUMÉ');
  console.log('╚════════════════════════════════════════════════════════════════════════════╝\n');
  console.log(`✅ Numéros Strong sauvegardés dans: ${OUTPUT_FILE}`);
  console.log(`📊 ${Object.keys(allStrong).length} chapitres extraits\n`);

  // Exemple
  if (allStrong[1] && allStrong[1][1]) {
    console.log('Exemple - Jean 1:1:');
    console.log(`  Strong: ${allStrong[1][1].join(', ')}\n`);
  }
}

main().catch(error => {
  console.error('❌ ERREUR:', error);
  process.exit(1);
});
