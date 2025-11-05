// ============================================================================
// CORRECTION DES POSITIONS STRONG
// ============================================================================
// Recalcule les positions start/end pour correspondre au texte Lingala

const fs = require('fs');
const path = require('path');

function fixStrongPositions(chapterNum) {
  const chapterStr = String(chapterNum).padStart(2, '0');
  const rcPath = path.join(__dirname, 'src', 'data', 'bible', 'gospel', 'john', 'chapters', `john-${chapterStr}-rc.js`);
  
  if (!fs.existsSync(rcPath)) {
    return { success: false, fixed: 0 };
  }
  
  let content = fs.readFileSync(rcPath, 'utf8');
  
  // Parser le fichier pour extraire les versets
  const versePattern = /{[^}]*"number":\s*(\d+),\s*"text":\s*"([^"]*)"[^}]*"strong":\s*\[([\s\S]*?)\]\s*}/g;
  let match;
  let fixedCount = 0;
  
  while ((match = versePattern.exec(content)) !== null) {
    const verseNum = match[1];
    const verseText = match[2];
    const strongSection = match[3];
    
    if (!strongSection.trim() || strongSection.trim() === '') continue;
    
    // Parser les objets Strong
    const strongObjPattern = /{[^}]*"text":\s*"([^"]*)"[^}]*"strong":\s*"([^"]*)"[^}]*"start":\s*(\d+)[^}]*"end":\s*(\d+)[^}]*}/g;
    let strongMatch;
    const replacements = [];
    
    while ((strongMatch = strongObjPattern.exec(strongSection)) !== null) {
      const word = strongMatch[1];
      const strongNum = strongMatch[2];
      const oldStart = parseInt(strongMatch[3]);
      const oldEnd = parseInt(strongMatch[4]);
      
      // Chercher le mot dans le texte Lingala
      const wordIndex = verseText.indexOf(word);
      
      if (wordIndex !== -1) {
        const newStart = wordIndex;
        const newEnd = wordIndex + word.length;
        
        // Si les positions ont changé, noter le remplacement
        if (newStart !== oldStart || newEnd !== oldEnd) {
          replacements.push({
            oldObj: strongMatch[0],
            newObj: strongMatch[0]
              .replace(`"start": ${oldStart}`, `"start": ${newStart}`)
              .replace(`"end": ${oldEnd}`, `"end": ${newEnd}`)
          });
          fixedCount++;
        }
      }
    }
    
    // Appliquer les remplacements
    replacements.forEach(({ oldObj, newObj }) => {
      content = content.replace(oldObj, newObj);
    });
  }
  
  // Sauvegarder
  fs.writeFileSync(rcPath, content, 'utf8');
  
  return { success: true, fixed: fixedCount };
}

console.log('📐 CORRECTION DES POSITIONS STRONG');
console.log('===================================\n');

let totalFixed = 0;
let chaptersProcessed = 0;

for (let chapter = 1; chapter <= 21; chapter++) {
  const result = fixStrongPositions(chapter);
  
  if (result.success) {
    chaptersProcessed++;
    totalFixed += result.fixed;
    
    if (result.fixed > 0) {
      console.log(`✅ Chapitre ${chapter}: ${result.fixed} positions corrigées`);
    } else {
      console.log(`✓  Chapitre ${chapter}: Positions déjà correctes`);
    }
  }
}

console.log(`\n✨ TERMINÉ!`);
console.log(`   ${chaptersProcessed} chapitres traités`);
console.log(`   ${totalFixed} positions corrigées`);
console.log(`   Les positions correspondent maintenant au texte Lingala!\n`);
