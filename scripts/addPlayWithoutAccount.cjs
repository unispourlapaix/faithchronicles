const fs = require('fs');
const path = require('path');

// Traductions pour "Jouer sans compte"
const translations = {
  es: "Jugar sin cuenta",
  de: "Ohne Konto spielen",
  it: "Gioca senza account",
  pt: "Jogar sem conta",
  ru: "Играть без учетной записи",
  uk: "Грати без облікового запису",
  zh: "无需帐户即可玩",
  jp: "アカウントなしでプレイ",
  ko: "계정 없이 플레이",
  ar: "اللعب بدون حساب",
  he: "שחק ללא חשבון",
  hi: "खाते के बिना खेलें",
  sw: "Cheza bila akaunti",
  pl: "Graj bez konta",
  rc: "Jouer sans compte" // Lingala uses French
};

const langCodes = Object.keys(translations);

console.log('✨ Ajout de "playWithoutAccount" dans toutes les langues...\n');

let successCount = 0;
let errorCount = 0;

for (const lang of langCodes) {
  const filePath = path.join(__dirname, '..', 'src', 'data', 'translations', lang, 'ui.js');
  
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  Fichier non trouvé: ${lang}/ui.js`);
      errorCount++;
      continue;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    
    // Vérifier si playWithoutAccount existe déjà
    if (content.includes('playWithoutAccount:')) {
      console.log(`✅ ${lang}: Déjà présent - "${translations[lang]}"`);
      successCount++;
      continue;
    }
    
    // Chercher la ligne passwordMinLength et ajouter playWithoutAccount après
    const pattern = /(passwordMinLength:\s*"[^"]*",?\s*\n)/;
    if (pattern.test(content)) {
      content = content.replace(
        pattern,
        `$1    playWithoutAccount: "${translations[lang]}",\n`
      );
      
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ ${lang}: "${translations[lang]}" ajouté`);
      successCount++;
    } else {
      console.log(`⚠️  ${lang}: Pattern non trouvé (passwordMinLength)`);
      errorCount++;
    }

  } catch (error) {
    console.log(`❌ ${lang}: Erreur - ${error.message}`);
    errorCount++;
  }
}

console.log(`\n📊 Résumé: ${successCount} succès, ${errorCount} erreurs`);
console.log(`\n✨ Traduction "Jouer sans compte" ajoutée dans toutes les langues!`);
