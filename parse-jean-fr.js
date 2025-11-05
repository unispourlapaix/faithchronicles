// Script pour parser le texte de Jean en français et créer les fichiers texte
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Le texte complet sera lu depuis un fichier
const inputFile = process.argv[2] || 'jean-fr-raw.txt';
const outputDir = path.join(__dirname, 'bibletxt', 'french');

// Créer le dossier de sortie
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Lire le fichier d'entrée
const content = fs.readFileSync(inputFile, 'utf8');

// Parser par chapitre
const chapters = {};
let currentChapter = null;

const lines = content.split('\n');

for (const line of lines) {
  // Détecter un chapitre
  const chapterMatch = line.match(/===== CHAPITRE (\d+) =====/);
  if (chapterMatch) {
    currentChapter = parseInt(chapterMatch[1]);
    chapters[currentChapter] = [];
    continue;
  }

  // Détecter un verset (format: X:Y texte)
  if (currentChapter) {
    const verseMatch = line.match(/^(\d+):(\d+)\s+(.+)$/);
    if (verseMatch) {
      const verseNum = parseInt(verseMatch[2]);
      const verseText = verseMatch[3].trim();
      chapters[currentChapter].push(`${verseNum} ${verseText}`);
    }
  }
}

// Écrire les fichiers
let totalVerses = 0;
for (const [chapterNum, verses] of Object.entries(chapters)) {
  const chapterPadded = String(chapterNum).padStart(2, '0');
  const filename = `john-${chapterPadded}.txt`;
  const filepath = path.join(outputDir, filename);

  const content = verses.join('\n');
  fs.writeFileSync(filepath, content, 'utf8');

  console.log(`✅ ${filename} - ${verses.length} versets`);
  totalVerses += verses.length;
}

console.log(`\n📊 Total: ${Object.keys(chapters).length} chapitres, ${totalVerses} versets`);
console.log(`📁 Fichiers créés dans: ${outputDir}`);
console.log(`\n▶️  Lancer maintenant: node convert-text-to-john-js.js fr`);
