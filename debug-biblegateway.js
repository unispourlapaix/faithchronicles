// ============================================================================
// DEBUG - Examiner la structure HTML de BibleGateway
// ============================================================================

import https from 'https';
import fs from 'fs';

function fetchBibleGateway(chapter) {
  return new Promise((resolve, reject) => {
    const url = `https://www.biblegateway.com/passage/?search=John+${chapter}&version=UKR&interface=print`;

    console.log(`Fetching: ${url}\n`);

    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function main() {
  const html = await fetchBibleGateway(2);

  // Sauvegarder le HTML complet
  fs.writeFileSync('debug-biblegateway-john2.html', html, 'utf8');

  console.log(`HTML sauvegardé dans: debug-biblegateway-john2.html`);
  console.log(`Taille: ${html.length} caractères\n`);

  // Chercher des patterns ukrainiens
  const ukrainianMatches = html.match(/[А-ЯІЇЄҐа-яіїєґ]{10,}/g);

  if (ukrainianMatches && ukrainianMatches.length > 0) {
    console.log(`✅ Trouvé ${ukrainianMatches.length} segments de texte ukrainien\n`);
    console.log('Premiers segments:');
    ukrainianMatches.slice(0, 5).forEach((text, i) => {
      console.log(`  ${i+1}. ${text.substring(0, 50)}...`);
    });
  } else {
    console.log('❌ Aucun texte ukrainien trouvé dans le HTML');
  }

  // Chercher des patterns de versets
  const versePatterns = [
    /<sup[^>]*class="versenum"[^>]*>/g,
    /<span[^>]*class="text[^"]*"[^>]*>/g,
    /data-usfm/g,
    /<div[^>]*class="[^"]*passage[^"]*"[^>]*>/g
  ];

  console.log('\n\nRecherche de patterns de structure:');
  versePatterns.forEach(pattern => {
    const matches = html.match(pattern);
    if (matches) {
      console.log(`  ✅ ${pattern.source}: ${matches.length} occurrences`);
      console.log(`     Exemple: ${matches[0]}`);
    } else {
      console.log(`  ❌ ${pattern.source}: aucune occurrence`);
    }
  });
}

main().catch(console.error);
