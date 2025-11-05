// ============================================================================
// AUTO-TRADUCTION DES MOTS STRONG
// ============================================================================
// Trouve automatiquement les mots dans le texte de chaque langue

const fs = require('fs');
const path = require('path');

const languages = ['ar', 'de', 'en', 'es', 'he', 'hi', 'it', 'ja', 'ko', 'pl', 'pt', 'rc', 'ru', 'sw', 'uk', 'zh'];

console.log('🔄 AUTO-TRADUCTION DES MOTS STRONG');
console.log('==================================\n');

let totalTranslated = 0;

for (let chapter = 1; chapter <= 21; chapter++) {
  const chapterStr = String(chapter).padStart(2, '0');
  const frPath = path.join(__dirname, 'src', 'data', 'bible', 'gospel', 'john', 'chapters', `john-${chapterStr}-fr.js`);
  
  if (!fs.existsSync(frPath)) continue;
  
  console.log(`📖 Chapitre ${chapter}:`);
  
  for (const lang of languages) {
    if (lang === 'fr') continue;
    
    const langPath = path.join(__dirname, 'src', 'data', 'bible', 'gospel', 'john', 'chapters', `john-${chapterStr}-${lang}.js`);
    
    if (!fs.existsSync(langPath)) continue;
    
    let langContent = fs.readFileSync(langPath, 'utf8');
    let translatedCount = 0;
    
    // Parser les versets avec Strong
    const versePattern = /{[^{]*"number":\s*(\d+),[^{]*"text":\s*"([^"]*)"[^{]*"strong":\s*\[([\s\S]*?)\]\s*}/g;
    let match;
    
    while ((match = versePattern.exec(langContent)) !== null) {
      const verseNum = match[1];
      const verseText = match[2];
      const strongSection = match[3];
      
      if (!strongSection || !strongSection.trim()) continue;
      
      // Parser chaque objet Strong
      const strongObjPattern = /{[^}]*"text":\s*"([^"]*)"[^}]*"strong":\s*"([^"]*)"[^}]*"start":\s*(\d+)[^}]*"end":\s*(\d+)[^}]*}/g;
      let strongMatch;
      const replacements = [];
      
      while ((strongMatch = strongObjPattern.exec(strongSection)) !== null) {
        const frenchWord = strongMatch[1];
        const strongNum = strongMatch[2];
        const start = parseInt(strongMatch[3]);
        const end = parseInt(strongMatch[4]);
        
        // Extraire le mot du texte dans la langue cible
        // On prend une plage autour de la position pour trouver le mot
        let targetWord = null;
        
        // Pour les langues avec espaces (en, es, de, it, pl, pt, ru, uk, sw)
        const spacedLanguages = ['en', 'es', 'de', 'it', 'pl', 'pt', 'ru', 'uk', 'sw'];
        
        if (spacedLanguages.includes(lang)) {
          // Chercher le mot autour de la position
          const words = verseText.split(/[\s,;.!?:]+/);
          // Prendre le mot correspondant à la position relative
          const charPos = Math.floor((start / 100) * verseText.length);
          let currentPos = 0;
          
          for (const word of words) {
            if (currentPos <= charPos && currentPos + word.length >= charPos) {
              targetWord = word.replace(/[.,;:!?'"]/g, '');
              break;
            }
            currentPos += word.length + 1;
          }
        } else {
          // Pour les langues sans espaces (zh, ja, ko, ar, he, hi)
          // Prendre 1-3 caractères autour de la position
          const charPos = Math.min(start, verseText.length - 1);
          targetWord = verseText.substring(charPos, Math.min(charPos + 3, verseText.length));
        }
        
        if (targetWord && targetWord !== frenchWord) {
          // Chercher le mot dans le texte pour trouver sa vraie position
          const wordIndex = verseText.indexOf(targetWord);
          const newStart = wordIndex !== -1 ? wordIndex : start;
          const newEnd = wordIndex !== -1 ? wordIndex + targetWord.length : end;
          
          replacements.push({
            oldObj: strongMatch[0],
            newObj: strongMatch[0]
              .replace(`"text": "${frenchWord}"`, `"text": "${targetWord}"`)
              .replace(`"start": ${start}`, `"start": ${newStart}`)
              .replace(`"end": ${end}`, `"end": ${newEnd}`)
          });
          translatedCount++;
        }
      }
      
      // Appliquer les remplacements
      replacements.forEach(({ oldObj, newObj }) => {
        langContent = langContent.replace(oldObj, newObj);
      });
    }
    
    if (translatedCount > 0) {
      fs.writeFileSync(langPath, langContent, 'utf8');
      console.log(`  ✅ ${lang.toUpperCase()}: ${translatedCount} mots traduits`);
      totalTranslated += translatedCount;
    } else {
      console.log(`  ✓  ${lang.toUpperCase()}: Pas de changement`);
    }
  }
}

console.log(`\n✨ TERMINÉ! ${totalTranslated} mots Strong auto-traduits\n`);
