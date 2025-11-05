// ============================================================================
// DEBUG - Structure HTML Bible.com (Hébreu)
// ============================================================================

import https from 'https';
import fs from 'fs';

function fetchPage(chapter) {
  return new Promise((resolve, reject) => {
    const url = `https://www.bible.com/bible/323/JHN.${chapter}.HHH`;

    console.log(`Fetching: ${url}\n`);

    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function main() {
  const html = await fetchPage(7);

  // Sauvegarder le HTML
  fs.writeFileSync('debug-bible-com-john7-hebrew.html', html, 'utf8');

  console.log(`HTML sauvegardé dans: debug-bible-com-john7-hebrew.html`);
  console.log(`Taille: ${html.length} caractères\n`);

  // Chercher du texte hébreu
  const hebrewMatches = html.match(/[\u0590-\u05FF]{10,}/g);

  if (hebrewMatches && hebrewMatches.length > 0) {
    console.log(`✅ Trouvé ${hebrewMatches.length} segments de texte hébreu\n`);
    console.log('Premiers segments:');
    hebrewMatches.slice(0, 5).forEach((text, i) => {
      console.log(`  ${i+1}. ${text.substring(0, 50)}...`);
    });
  } else {
    console.log('❌ Aucun texte hébreu trouvé dans le HTML\n');
  }

  // Chercher des patterns JSON
  const jsonPatterns = [
    /"chapters":/g,
    /"content":/g,
    /"verse":/g,
    /"usfms":/g
  ];

  console.log('\n\nRecherche de patterns JSON:');
  jsonPatterns.forEach(pattern => {
    const matches = html.match(pattern);
    if (matches) {
      console.log(`  ✅ ${pattern.source}: ${matches.length} occurrences`);
    } else {
      console.log(`  ❌ ${pattern.source}: aucune occurrence`);
    }
  });

  // Extraire un échantillon du JSON s'il existe
  const jsonSample = html.match(/"chapters":\[(.*?)\]/s);
  if (jsonSample) {
    console.log('\n\nÉchantillon JSON trouvé (premiers 500 caractères):');
    console.log(jsonSample[0].substring(0, 500));
  }
}

main().catch(console.error);
