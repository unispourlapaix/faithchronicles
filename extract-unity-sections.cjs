const fs = require('fs');
const path = require('path');

const languages = ['es', 'de', 'it', 'pt', 'ru', 'uk', 'zh', 'ar', 'he', 'hi', 'sw', 'pl', 'rc'];
const translationsDir = path.join(__dirname, 'src', 'data', 'translations');

console.log('🔄 Extraction des sections unity...\n');

languages.forEach(lang => {
  const uiFilePath = path.join(translationsDir, lang, 'ui.js');
  const unityFilePath = path.join(translationsDir, lang, 'unity.js');
  
  try {
    // Lire le fichier ui.js
    const content = fs.readFileSync(uiFilePath, 'utf8');
    
    // Trouver la section unity
    const unityMatch = content.match(/unity:\s*{[\s\S]*?(?=\n  },\n\n  (?:footer|philosophy|endCredits|validation|pseudoSetup|navigation|console|errors|levels|architecture))/);
    
    if (unityMatch) {
      let unitySection = unityMatch[0];
      
      // Extraire juste le contenu de unity (sans "unity: {")
      unitySection = unitySection.replace(/^unity:\s*{/, '').trim();
      
      // Créer le fichier unity.js
      const langComment = {
        'es': 'SPANISH',
        'de': 'GERMAN', 
        'it': 'ITALIAN',
        'pt': 'PORTUGUESE',
        'ru': 'RUSSIAN',
        'uk': 'UKRAINIAN',
        'zh': 'CHINESE',
        'ar': 'ARABIC',
        'he': 'HEBREW',
        'hi': 'HINDI',
        'sw': 'SWAHILI',
        'pl': 'POLISH',
        'rc': 'LINGALA'
      };
      
      const unityFileContent = `// ============================================================================
// ${langComment[lang]} TRANSLATIONS - UNITY MODULE
// ============================================================================

export const unityTranslations = {
${unitySection}
};

export default unityTranslations;
`;
      
      fs.writeFileSync(unityFilePath, unityFileContent, 'utf8');
      console.log(`✅ ${lang}/unity.js créé`);
    } else {
      console.log(`❌ ${lang}: Section unity non trouvée`);
    }
  } catch (error) {
    console.log(`❌ ${lang}: Erreur - ${error.message}`);
  }
});

console.log('\n✨ Extraction terminée!');
