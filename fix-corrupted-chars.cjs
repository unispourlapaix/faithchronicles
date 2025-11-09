const fs = require('fs');
const path = require('path');

// Mapping des caractères corrompus vers les emojis/caractères corrects
const charMapping = {
  // Emojis principaux
  '­ƒòè´©Å': '🕊️',  // peace/dove
  '­ƒÆí': '📚',      // knowledge/books  
  '­ƒöä': '🔄',      // restart
  '­ƒÄ«': '🌟',      // new adventure/star
  '­ƒÆÄ': '📖',      // bible treasures/book
  '­ƒôû': '📖',      // bible reader/choose answer
  '­ƒÄ║': '🔓',      // secret level unlocked
  '­ƒÅå': '🎁',      // secret chapter/bonus
  '­ƒÄ¿': '🖼️',      // image feature
  '­ƒîƒ': '🤔',      // did you know
  '­ƒô£': '💎',      // hidden treasure
  '­ƒñö': '😄',      // funny question
  '­ƒöº': '⚙️',      // technical architecture
  '­ƒÆ¥': '💾',      // auto-save
  '­ƒôÑ': '✅',      // game loaded
  'Ô£¿': '🃏',       // knowledge cards
  'ÔåÆ': '→',       // arrow
  'ÔÜö´©Å': '🔥',    // courage second chance
  'Ô¡É': '✅',       // good/start
  'ÔÜí': '🃏',       // choose card/gift
  'ÔØî': '❌',       // error/wrong
  'Ô£à': '✅',       // success/saved
  
  // Caractères de ponctuation
  'ÔØñ´©Å': '❤️',    // created with love
  'ÔÇó': '•',       // bullet point
  'ÔÇö': '—',       // em dash
  'Ô£ë´©Å': '📧',   // check email
  
  // Caractères corrompus français/allemands
  '├®': 'é',
  '├á': 'à', 
  '├¬': 'è',
  '├ë': 'ë',
  '├º': 'ê',
  '├╗': 'û',
  '├»': 'ù',
  '├ó': 'â',
  '├»': 'î',
  '├¿': 'ï',
  '├ô': 'ô',
  '├ç': 'ç',
  '├£': 'Ü',
  '├¢': 'ä',
  '├ñ': 'ö',
  '├╝': 'ü',
  '├í': 'á',
  '├º': 'ê',
  '├®t': 'ét',
  '├¬me': 'ème',
  'priv├®': 'privé',
  'V├®rifiez': 'Vérifiez',
  'envoy├®': 'envoyé',
  'Tr├®sors': 'Trésors',
  'priorit├®': 'priorité',
  '├®go├»ste': 'égoïste',
  'Demandez ├á': 'Demandez à',
  'cacherÔÇª': 'cacher…',
  'Je├╗nez': 'Jeûnez',
  
  // Corrections supplémentaires portugais
  'metaf├¡sico': 'metafísico',
  'pr├│pria': 'própria',
  'autèntico': 'autêntico',
  'existència': 'existência',
  'gl├│ria': 'glória',
  'esp├¡rito': 'espírito'
  'priv├®': 'privé',
  'c┼ôur': 'cœur',
  'pr├¬te': 'prête',
  'r├¬ves': 'rêves',
  'c├®dez': 'cédez',
  'r├®v├®lation': 'révélation',
  'gr├óce': 'grâce',
  'J├®sus': 'Jésus',
  'prochainÔÇª': 'prochain…',
  'm├¬me': 'même',
  'Cr├®├®': 'Créé',
  'r├®ponse': 'réponse',
  'D├ëBLOQU├ë': 'DÉBLOQUÉ',
  'activit├®': 'activité',
  'activ├®e': 'activée',
  'charg├®e': 'chargée',
  '├®toiles': 'étoiles',
  'caract├¿res': 'caractères',
  'Affich├®': 'Affiché',
  'Fonctionnalit├®': 'Fonctionnalité',
  '├á venir': 'à venir',
  'obtenues': 'obtenues',
  'D├ëBLOQU├ë': 'DÉBLOQUÉ',
  'perfei├º├úo': 'perfeição',
  'necess├íria': 'necessária',
  'Sincroniza├º├úo': 'Sincronização',
  'B├¡blia': 'Bíblia',
  'Voc├¬': 'Você',
  'Dom├¡nio p├║blico': 'Domínio público',
  'Vers├úo': 'Versão',
  'N├ìVEL B├öNUS': 'NÍVEL BÔNUS',
  'alcan├ºou': 'alcançou',
  't├®cnica': 'técnica',
  'autom├ítico': 'automático',
  'ativado': 'ativado',
  '┬½': '"',
  '┬╗': '"',
  '├£berpr├╝fe': 'Überprüfe',
  'Sch├ñtze': 'Schätze',
  'W├ñhle': 'Wähle'
};

const files = [
  'src/data/translations/de/ui.js',
  'src/data/translations/en/ui.js', 
  'src/data/translations/fr/ui.js',
  'src/data/translations/pt/ui.js',
  'src/data/translations/it/ui.js',
  'src/data/translations/ar/ui.js',
  'src/data/translations/he/ui.js',
  'src/data/translations/rc/ui.js',
  'src/data/translations/ru/ui.js',
  'src/data/translations/uk/ui.js',
  'src/data/translations/zh/ui.js',
  'src/data/translations/es/ui.js',
  'src/data/translations/ko/ui.js',
  'src/data/translations/hi/ui.js',
  'src/data/translations/ja/ui.js',
  'src/data/translations/sw/ui.js',
  'src/data/translations/pl/ui.js',
];

function fixEncodingIssues(content) {
  let fixed = content;
  
  // Remplacer chaque caractère corrompu
  for (const [corrupted, correct] of Object.entries(charMapping)) {
    const regex = new RegExp(corrupted.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    fixed = fixed.replace(regex, correct);
  }
  
  return fixed;
}

console.log('🔧 Correction des caractères corrompus dans les fichiers de traduction...\n');

files.forEach(file => {
  try {
    if (!fs.existsSync(file)) {
      console.log(`⚠️  Fichier non trouvé: ${file}`);
      return;
    }
    
    const content = fs.readFileSync(file, 'utf-8');
    const fixedContent = fixEncodingIssues(content);
    
    if (content !== fixedContent) {
      fs.writeFileSync(file, fixedContent, 'utf-8');
      console.log(`✅ ${file} - Caractères corrompus corrigés`);
    } else {
      console.log(`✅ ${file} - Aucun caractère corrompu trouvé`);
    }
  } catch (error) {
    console.error(`❌ Erreur lors du traitement de ${file}:`, error.message);
  }
});

console.log('\n🎉 Terminé ! Tous les caractères corrompus ont été corrigés.');