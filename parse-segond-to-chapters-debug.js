// Debug version
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const INPUT_FILE = path.join(__dirname, 'src', 'data', 'bible', 'gospel', 'john', 'bibletxt', 'fr', 'segond1910.txt');

console.log('Reading:', INPUT_FILE);
const content = fs.readFileSync(INPUT_FILE, 'utf8');

const chapters = {};
let currentChapter = null;

const lines = content.split('\n');

console.log(`Total lines: ${lines.length}\n`);

for (let i = 0; i < Math.min(60, lines.length); i++) {
  const line = lines[i];

  const chapterMatch = line.match(/===== CHAPITRE (\d+) =====/);
  if (chapterMatch) {
    currentChapter = parseInt(chapterMatch[1]);
    chapters[currentChapter] = [];
    console.log(`Found chapter: ${currentChapter}`);
    continue;
  }

  if (currentChapter) {
    const verseMatch = line.match(/^(\d+):(\d+)\s+(.+)$/);
    if (verseMatch) {
      const chapterNum = parseInt(verseMatch[1]);
      const verseNum = parseInt(verseMatch[2]);
      const verseText = verseMatch[3].trim();

      console.log(`  Verse ${chapterNum}:${verseNum} - ${verseText.substring(0, 50)}...`);

      if (chapterNum === currentChapter) {
        chapters[currentChapter].push({
          number: verseNum,
          text: verseText
        });
      } else {
        console.log(`    WARNING: Chapter mismatch! Expected ${currentChapter}, got ${chapterNum}`);
      }
    }
  }
}

console.log(`\nChapters parsed:`);
for (const [chapterNum, verses] of Object.entries(chapters)) {
  console.log(`  Chapter ${chapterNum}: ${verses.length} verses`);
}
