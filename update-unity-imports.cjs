const fs = require('fs');
const path = require('path');

const languages = ['en', 'fr', 'es', 'de', 'it', 'pt', 'ru', 'uk', 'zh', 'ar', 'he', 'ko', 'hi', 'sw', 'pl', 'rc'];
const translationsDir = path.join(__dirname, 'src', 'data', 'translations');

console.log('🔄 Modification des imports ui.js...\n');

languages.forEach(lang => {
  const uiFilePath = path.join(translationsDir, lang, 'ui.js');
  
  try {
    let content = fs.readFileSync(uiFilePath, 'utf8');
    
    // Vérifier si l'import existe déjà
    if (content.includes("from './unity.js'") || content.includes("from './unity'")) {
      console.log(`⏭️  ${lang}: Import déjà présent`);
      return;
    }
    
    // Trouver la section unity et la remplacer
    const unityStartIndex = content.indexOf('unity: {');
    if (unityStartIndex === -1) {
      console.log(`⚠️  ${lang}: Section unity non trouvée`);
      return;
    }
    
    // Trouver la fermeture de la section unity
    let braceCount = 0;
    let inUnity = false;
    let unityEndIndex = unityStartIndex;
    
    for (let i = unityStartIndex; i < content.length; i++) {
      if (content[i] === '{') {
        braceCount++;
        inUnity = true;
      } else if (content[i] === '}') {
        braceCount--;
        if (inUnity && braceCount === 0) {
          unityEndIndex = i;
          break;
        }
      }
    }
    
    if (unityEndIndex > unityStartIndex) {
      // Ajouter l'import en haut du fichier (après les commentaires)
      const importStatement = "import unityTranslations from './unity.js';\n\n";
      
      // Trouver où insérer l'import (après le dernier commentaire de header)
      const lines = content.split('\n');
      let insertIndex = 0;
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('//') || lines[i].trim() === '') {
          insertIndex = i + 1;
        } else {
          break;
        }
      }
      
      // Insérer l'import
      lines.splice(insertIndex, 0, importStatement.trim());
      content = lines.join('\n');
      
      // Maintenant remplacer la section unity par unity: unityTranslations
      const beforeUnity = content.substring(0, content.indexOf('unity: {'));
      const afterUnity = content.substring(content.indexOf('unity: {') + ('unity: {').length);
      
      // Trouver la fin de la section unity dans le nouveau content
      braceCount = 1;
      let endPos = 0;
      for (let i = 0; i < afterUnity.length; i++) {
        if (afterUnity[i] === '{') {
          braceCount++;
        } else if (afterUnity[i] === '}') {
          braceCount--;
          if (braceCount === 0) {
            endPos = i + 1;
            break;
          }
        }
      }
      
      const afterUnitySection = afterUnity.substring(endPos);
      
      // Reconstruire avec unity: unityTranslations
      content = beforeUnity + 'unity: unityTranslations' + afterUnitySection;
      
      // Écrire le fichier modifié
      fs.writeFileSync(uiFilePath, content, 'utf8');
      console.log(`✅ ${lang}/ui.js modifié`);
    }
  } catch (error) {
    console.log(`❌ ${lang}: Erreur - ${error.message}`);
  }
});

console.log('\n✨ Modifications terminées!');
