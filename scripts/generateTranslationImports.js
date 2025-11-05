// ============================================================================
// GÉNÉRATEUR D'IMPORTS pour translationService.js
// ============================================================================
// Génère automatiquement les imports et le code de chargement des chapitres

const languages = ['fr', 'en', 'es', 'pt', 'de', 'it', 'ru', 'zh', 'pl', 'ja', 'ko', 'sw'];

console.log('// ============================================');
console.log('// IMPORTS AUTOMATIQUES - Copier dans translationService.js');
console.log('// ============================================\n');

// Générer les imports
languages.forEach(lang => {
  console.log(`// ${lang.toUpperCase()} - Tous les chapitres`);
  for (let i = 1; i <= 21; i++) {
    const chNum = String(i).padStart(2, '0');
    const varName = `johnChapter${i}${lang.toUpperCase()}`;
    console.log(`import { ${varName} } from './chapters/john-${chNum}-${lang}.js';`);
  }
  console.log('');
});

console.log('\n// ============================================');
console.log('// CODE DE CHARGEMENT - À ajouter dans loadFromJSChapters()');
console.log('// ============================================\n');

// Générer le code de chargement
languages.forEach(lang => {
  const langUpper = lang.toUpperCase();
  console.log(`      if (languageCode === '${lang}') {`);
  for (let i = 1; i <= 21; i++) {
    console.log(`        if (johnChapter${i}${langUpper}) chapters[${i}] = johnChapter${i}${langUpper};`);
  }
  console.log(`      }`);
  console.log('');
});
