// ============================================================================
// FUSION - Texte ukrainien + Numéros Strong
// ============================================================================
// Combine le texte ukrainien avec les numéros Strong extraits

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Fichiers d'entrée
const STRONG_FILE = path.join(__dirname, 'john-strong-numbers.json');
const CHAPTERS_DIR = path.join(__dirname, 'src', 'data', 'bible', 'gospel', 'john', 'chapters');

console.log('╔════════════════════════════════════════════════════════════════════════════╗');
console.log('║ FUSION - Texte ukrainien + Strong');
console.log('╚════════════════════════════════════════════════════════════════════════════╝\n');

// Vérifier que le fichier Strong existe
if (!fs.existsSync(STRONG_FILE)) {
  console.error(`❌ Fichier Strong introuvable: ${STRONG_FILE}`);
  console.error(`\nLancez d'abord: node extract-strong-from-biblehub.js\n`);
  process.exit(1);
}

// Charger les Strong
console.log(`📖 Chargement des numéros Strong...`);
const strongData = JSON.parse(fs.readFileSync(STRONG_FILE, 'utf8'));
console.log(`   ✅ ${Object.keys(strongData).length} chapitres chargés\n`);

// Traiter chaque chapitre
let processed = 0;
let updated = 0;

for (let chapter = 1; chapter <= 21; chapter++) {
  const chapterPadded = String(chapter).padStart(2, '0');
  const filename = `john-${chapterPadded}-uk.js`;
  const filepath = path.join(CHAPTERS_DIR, filename);

  if (!fs.existsSync(filepath)) {
    console.log(`⏭️  ${filename} - fichier non trouvé`);
    continue;
  }

  console.log(`📝 Traitement ${filename}...`);

  // Lire le fichier
  let content = fs.readFileSync(filepath, 'utf8');

  // Compter combien de Strong on ajoute
  let strongCount = 0;

  // Pour chaque verset du chapitre
  if (strongData[chapter]) {
    for (const [verseNum, strongNumbers] of Object.entries(strongData[chapter])) {
      // Chercher le pattern: "number": X, "text": "...", "strong": []
      const pattern = new RegExp(
        `("number":\\s*${verseNum},\\s*"text":\\s*"[^"]*",\\s*"strong":\\s*)\\[\\]`,
        'g'
      );

      // Remplacer [] par le tableau de Strong
      const replacement = `$1[${strongNumbers.map(s => `"${s}"`).join(', ')}]`;

      const newContent = content.replace(pattern, replacement);

      if (newContent !== content) {
        strongCount++;
        content = newContent;
      }
    }
  }

  // Sauvegarder si modifié
  if (strongCount > 0) {
    fs.writeFileSync(filepath, content, 'utf8');
    console.log(`   ✅ ${strongCount} versets mis à jour`);
    updated++;
  } else {
    console.log(`   ⚠️  Aucun Strong ajouté`);
  }

  processed++;
}

console.log('\n╔════════════════════════════════════════════════════════════════════════════╗');
console.log('║ RÉSUMÉ');
console.log('╚════════════════════════════════════════════════════════════════════════════╝\n');
console.log(`✅ Fichiers traités: ${processed}/21`);
console.log(`📊 Fichiers mis à jour: ${updated}/21\n`);

// Vérifier un exemple
const exampleFile = path.join(CHAPTERS_DIR, 'john-01-uk.js');
if (fs.existsSync(exampleFile)) {
  const exampleContent = fs.readFileSync(exampleFile, 'utf8');
  const hasStrong = exampleContent.includes('"G');

  if (hasStrong) {
    console.log('✅ Vérification: Les numéros Strong sont présents!');

    // Extraire un exemple
    const match = exampleContent.match(/"strong":\s*\[(.*?)\]/);
    if (match && match[1].trim()) {
      console.log(`   Exemple: [${match[1].substring(0, 50)}...]`);
    }
  } else {
    console.log('⚠️  Vérification: Aucun Strong trouvé dans john-01-uk.js');
  }
}

console.log('');
