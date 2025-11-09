const fs = require('fs');
const path = require('path');

const translationsDir = path.join(__dirname, '..', 'src', 'data', 'translations');
const languages = ['de', 'it', 'pt', 'ru', 'uk', 'zh', 'ar', 'he', 'jp', 'ko', 'hi', 'sw', 'pl', 'rc'];

languages.forEach(lang => {
  const filePath = path.join(translationsDir, lang, 'ui.js');
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ Fichier non trouvé: ${filePath}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Corriger la syntaxe: maxLevelReached: "..."\n  ,\n    wrongAnswer: "..."} 
  // en: maxLevelReached: "...",\n    wrongAnswer: "..."\n  },
  const wrongPattern = /maxLevelReached:\s*"[^"]+"\s*\n\s*,\s*\n\s*wrongAnswer:\s*"[^"]+"\s*\}/;
  
  if (wrongPattern.test(content)) {
    content = content.replace(
      /(maxLevelReached:\s*"[^"]+")\s*\n\s*,\s*\n\s*(wrongAnswer:\s*"[^"]+")\s*\}/g,
      '$1,\n    $2\n  },'
    );
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${lang}/ui.js syntaxe corrigée`);
  } else {
    console.log(`ℹ️  ${lang}/ui.js déjà correct`);
  }
});

console.log('\n✨ Correction terminée !');
