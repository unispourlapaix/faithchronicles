const fs = require('fs');
const path = require('path');

// Traductions pour "Importer session depuis production"
const translations = {
  fr: "🔄 Importer session depuis production",
  en: "🔄 Import session from production",
  es: "🔄 Importar sesión desde producción",
  de: "🔄 Sitzung aus Produktion importieren",
  it: "🔄 Importa sessione da produzione",
  pt: "🔄 Importar sessão da produção",
  ru: "🔄 Импортировать сессию из продакшена",
  uk: "🔄 Імпортувати сесію з продакшену",
  zh: "🔄 从生产环境导入会话",
  jp: "🔄 本番環境からセッションをインポート",
  ko: "🔄 프로덕션에서 세션 가져오기",
  ar: "🔄 استيراد الجلسة من الإنتاج",
  he: "🔄 ייבוא סשן מהפרודקשן",
  hi: "🔄 प्रोडक्शन से सत्र आयात करें",
  sw: "🔄 Leta kipindi kutoka kwa uzalishaji",
  pl: "🔄 Importuj sesję z produkcji",
  rc: "🔄 Kokɔtisa molɔngɔ́ uta na production"
};

const langCodes = Object.keys(translations);

console.log('🔄 Ajout de la traduction "importSession" dans toutes les langues...\n');

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
    
    // Vérifier si la clé existe déjà
    if (content.includes('importSession:')) {
      console.log(`✅ ${lang}: importSession existe déjà`);
      successCount++;
      continue;
    }

    // Trouver la ligne rateLimited et ajouter importSession après
    const searchPattern = /(\s+rateLimited:\s*"[^"]+",)/;
    
    if (!searchPattern.test(content)) {
      console.log(`⚠️  ${lang}: Pattern rateLimited non trouvé`);
      errorCount++;
      continue;
    }

    const newLine = `    importSession: "${translations[lang]}",`;
    content = content.replace(
      searchPattern,
      `$1\n${newLine}`
    );

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${lang}: importSession ajouté`);
    successCount++;

  } catch (error) {
    console.log(`❌ ${lang}: Erreur - ${error.message}`);
    errorCount++;
  }
}

console.log(`\n📊 Résumé: ${successCount} succès, ${errorCount} erreurs`);
