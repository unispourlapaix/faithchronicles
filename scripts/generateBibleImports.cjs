// ============================================================================
// SCRIPT: Generate Bible Data Imports Automatically
// ============================================================================
// Ce script génère automatiquement tous les imports pour bibleData.js
// en scannant les fichiers disponibles dans src/data/translations/

const fs = require('fs');
const path = require('path');

const translationsDir = path.join(__dirname, '../src/data/translations');
const outputFile = path.join(__dirname, '../src/data/bible/bibleData.js');

// Liste des langues supportées
const languages = [
  { code: 'fr', name: 'French' },
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'uk', name: 'Ukrainian' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ar', name: 'Arabic' },
  { code: 'he', name: 'Hebrew' },
  { code: 'jp', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'hi', name: 'Hindi' },
  { code: 'sw', name: 'Swahili' },
  { code: 'pl', name: 'Polish' },
  { code: 'rc', name: 'Lingala' }
];

// Fichiers à importer pour chaque langue
const bibleFiles = [
  'biblePassages',
  'bibleVerses',
  'jesusIsNot',
  'bibleFacts',
  'funQuestions',
  'bibleTreasures'
];

// Générer les imports
function generateImports() {
  let imports = '';
  let translations = {};

  languages.forEach(lang => {
    const langDir = path.join(translationsDir, lang.code);
    
    if (!fs.existsSync(langDir)) {
      console.warn(`⚠️  Directory not found for ${lang.name} (${lang.code})`);
      return;
    }

    imports += `\n// Import ${lang.name} translations\n`;
    translations[lang.code] = {};

    bibleFiles.forEach(file => {
      const filePath = path.join(langDir, `${file}.js`);
      
      if (fs.existsSync(filePath)) {
        const varName = file === 'biblePassages' || file === 'bibleVerses' || file === 'jesusIsNot' || file === 'bibleFacts' || file === 'funQuestions' || file === 'bibleTreasures'
          ? `${file}${lang.code.toUpperCase()}`
          : `${file}${lang.code.charAt(0).toUpperCase() + lang.code.slice(1)}`;
        
        // Utiliser le format approprié selon la langue
        if (lang.code === 'fr' || lang.code === 'en') {
          // Format simple pour FR et EN
          const exportName = file === 'biblePassages' ? 'biblePassages' : 
                           file === 'bibleVerses' ? 'bibleVerses' :
                           file === 'jesusIsNot' ? 'jesusIsNot' :
                           file === 'bibleFacts' ? 'bibleFacts' :
                           file === 'funQuestions' ? 'funQuestions' :
                           'bibleTreasures';
          
          if (lang.code === 'fr') {
            imports += `import { ${exportName} as ${exportName}Fr } from '../translations/${lang.code}/${file}.js';\n`;
          } else {
            imports += `import { ${exportName} as ${exportName}En } from '../translations/${lang.code}/${file}.js';\n`;
          }
        } else if (lang.code === 'rc') {
          // Format spécial pour RC (Lingala)
          imports += `import { ${file}Rc } from '../translations/${lang.code}/${file}.js';\n`;
        } else {
          // Format "as" pour les autres langues
          const suffix = lang.code.charAt(0).toUpperCase() + lang.code.slice(1);
          imports += `import { ${file.charAt(0).toLowerCase() + file.slice(1)} as ${file}${suffix} } from '../translations/${lang.code}/${file}.js';\n`;
        }
        
        // Ajouter à la structure translations
        const key = file === 'biblePassages' ? 'passages' :
                   file === 'bibleVerses' ? 'verses' :
                   file === 'jesusIsNot' ? 'jesusIsNot' :
                   file === 'bibleFacts' ? 'facts' :
                   file === 'funQuestions' ? 'funQuestions' :
                   'bibleTreasures';
        
        translations[lang.code][key] = varName;
      }
    });
  });

  return { imports, translations };
}

// Générer la structure translations
function generateTranslationsObject(translations) {
  let code = '  translations: {\n';
  
  languages.forEach(lang => {
    if (translations[lang.code] && Object.keys(translations[lang.code]).length > 0) {
      code += `    ${lang.code}: {\n`;
      
      Object.keys(translations[lang.code]).forEach(key => {
        code += `      ${key}: ${translations[lang.code][key]},\n`;
      });
      
      code += '    },\n';
    }
  });
  
  code += '  },\n';
  return code;
}

// Lire le fichier actuel
function updateBibleData() {
  console.log('🔍 Scanning translation files...\n');
  
  const { imports, translations } = generateImports();
  const translationsCode = generateTranslationsObject(translations);
  
  console.log('✅ Imports generated successfully!\n');
  console.log('📝 Import statements:\n');
  console.log(imports);
  console.log('\n📦 Translations object:\n');
  console.log(translationsCode);
  
  console.log('\n✅ You can now copy these to bibleData.js');
  console.log('⚠️  Note: This script only generates the code. Manual update still required.');
  
  // Optionnellement, sauvegarder dans un fichier temporaire
  const tempFile = path.join(__dirname, 'generated-bible-imports.txt');
  fs.writeFileSync(tempFile, `${imports}\n\n${translationsCode}`);
  console.log(`\n💾 Generated code saved to: ${tempFile}`);
}

// Exécuter
updateBibleData();
