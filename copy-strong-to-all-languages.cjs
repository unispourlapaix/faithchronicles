// ============================================================================
// COPIER LES STRONG VERS TOUTES LES LANGUES
// ============================================================================
// Copie les numéros Strong depuis le français vers toutes les autres langues

const fs = require('fs');
const path = require('path');

const languages = ['ar', 'de', 'en', 'es', 'he', 'hi', 'it', 'ja', 'ko', 'pl', 'pt', 'rc', 'ru', 'sw', 'uk', 'zh'];

console.log('📚 COPIE DES NUMÉROS STRONG VERS TOUTES LES LANGUES');
console.log('===================================================\n');

let totalCopied = 0;

for (let chapter = 1; chapter <= 21; chapter++) {
  const chapterStr = String(chapter).padStart(2, '0');
  const frPath = path.join(__dirname, 'src', 'data', 'bible', 'gospel', 'john', 'chapters', `john-${chapterStr}-fr.js`);
  
  if (!fs.existsSync(frPath)) continue;
  
  const frContent = fs.readFileSync(frPath, 'utf8');
  
  // Parser les versets français pour extraire les Strong
  const versePattern = /{[^}]*"number":\s*(\d+)[^}]*"strong":\s*\[([\s\S]*?)\]\s*}/g;
  const strongByVerse = {};
  
  let match;
  while ((match = versePattern.exec(frContent)) !== null) {
    const verseNum = match[1];
    const strongSection = match[2].trim();
    
    if (strongSection && strongSection !== '') {
      strongByVerse[verseNum] = strongSection;
    }
  }
  
  console.log(`\n📖 Chapitre ${chapter}:`);
  
  // Copier vers chaque langue
  for (const lang of languages) {
    if (lang === 'fr') continue; // Skip français (c'est la source)
    
    const langPath = path.join(__dirname, 'src', 'data', 'bible', 'gospel', 'john', 'chapters', `john-${chapterStr}-${lang}.js`);
    
    if (!fs.existsSync(langPath)) {
      console.log(`  ⚠️  ${lang.toUpperCase()}: Fichier manquant`);
      continue;
    }
    
    let langContent = fs.readFileSync(langPath, 'utf8');
    let copiedCount = 0;
    
    // Pour chaque verset avec Strong dans le français
    for (const [verseNum, strongData] of Object.entries(strongByVerse)) {
      // Trouver le verset dans la langue cible
      const verseRegex = new RegExp(
        `("number":\\s*${verseNum},[^}]*"strong":\\s*\\[)([^\\]]*)(\\])`,
        's'
      );
      
      langContent = langContent.replace(verseRegex, (match, before, oldStrong, after) => {
        // Si le verset n'a pas de Strong (vide ou juste espaces)
        if (!oldStrong.trim() || oldStrong.trim() === '') {
          copiedCount++;
          return before + '\n' + strongData + '\n      ' + after;
        }
        return match;
      });
    }
    
    if (copiedCount > 0) {
      fs.writeFileSync(langPath, langContent, 'utf8');
      console.log(`  ✅ ${lang.toUpperCase()}: ${copiedCount} versets Strong copiés`);
      totalCopied += copiedCount;
    } else {
      console.log(`  ✓  ${lang.toUpperCase()}: Déjà complet`);
    }
  }
}

console.log(`\n✨ TERMINÉ!`);
console.log(`   ${totalCopied} versets Strong copiés au total`);
console.log(`   Toutes les langues ont maintenant les numéros Strong!\n`);
