const fs = require('fs');
const path = require('path');

const translationsDir = path.join(__dirname, '..', 'src', 'data', 'translations');
const languages = ['pt', 'ru', 'uk', 'zh', 'ar', 'he', 'jp', 'ko', 'hi', 'sw', 'pl', 'rc', 'de'];

languages.forEach(lang => {
  const filePath = path.join(translationsDir, lang, 'ui.js');
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ Fichier non trouvé: ${filePath}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  // Corriger les doubles virgules },,
  if (content.includes('},,')) {
    content = content.replace(/\},,/g, '},');
    modified = true;
  }
  
  // Corriger maxLevelReached: "..."\n  ,\n    wrongAnswer
  if (content.match(/maxLevelReached:[^}]+\n\s*,\s*\n\s*wrongAnswer/)) {
    content = content.replace(
      /(maxLevelReached:\s*"[^"]+")(\s*\n\s*),(\s*\n\s*wrongAnswer:\s*"[^"]+")(\s*\})/g,
      '$1,$3\n  },'
    );
    modified = true;
  }
  
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${lang}/ui.js corrigé`);
  } else {
    console.log(`ℹ️  ${lang}/ui.js déjà correct`);
  }
});

console.log('\n✨ Correction terminée !');
