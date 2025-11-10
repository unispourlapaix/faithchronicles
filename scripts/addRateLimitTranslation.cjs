const fs = require('fs');
const path = require('path');

// Traductions pour l'erreur de rate limiting
const translations = {
  fr: "⏳ Veuillez patienter 15 secondes avant de renvoyer un email",
  en: "⏳ Please wait 15 seconds before resending an email",
  es: "⏳ Por favor espere 15 segundos antes de reenviar un email",
  de: "⏳ Bitte warten Sie 15 Sekunden, bevor Sie eine E-Mail erneut senden",
  it: "⏳ Attendere 15 secondi prima di inviare nuovamente un'email",
  pt: "⏳ Por favor, aguarde 15 segundos antes de reenviar um email",
  ru: "⏳ Пожалуйста, подождите 15 секунд перед повторной отправкой письма",
  uk: "⏳ Будь ласка, зачекайте 15 секунд перед повторним надсиланням листа",
  zh: "⏳ 请等待15秒后再重新发送邮件",
  jp: "⏳ メールを再送信する前に15秒お待ちください",
  ko: "⏳ 이메일을 다시 보내기 전에 15초 기다려주세요",
  ar: "⏳ يرجى الانتظار 15 ثانية قبل إعادة إرسال بريد إلكتروني",
  he: "⏳ אנא המתן 15 שניות לפני שליחה מחדש של אימייל",
  hi: "⏳ ईमेल फिर से भेजने से पहले कृपया 15 सेकंड प्रतीक्षा करें",
  sw: "⏳ Tafadhali subiri sekunde 15 kabla ya kutuma barua pepe tena",
  pl: "⏳ Poczekaj 15 sekund przed ponownym wysłaniem emaila",
  rc: "⏳ Talela mikolo 15 liboso ya kotinda lisusu email"
};

const langCodes = Object.keys(translations);

console.log('🔄 Ajout de la traduction "rateLimited" dans toutes les langues...\n');

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
    if (content.includes('rateLimited:')) {
      console.log(`✅ ${lang}: rateLimited existe déjà`);
      successCount++;
      continue;
    }

    // Trouver la ligne errorSend et ajouter rateLimited après
    const searchPattern = /(\s+errorSend:\s*"[^"]+",)/;
    
    if (!searchPattern.test(content)) {
      console.log(`⚠️  ${lang}: Pattern errorSend non trouvé`);
      errorCount++;
      continue;
    }

    const newLine = `    rateLimited: "${translations[lang]}",`;
    content = content.replace(
      searchPattern,
      `$1\n${newLine}`
    );

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${lang}: rateLimited ajouté`);
    successCount++;

  } catch (error) {
    console.log(`❌ ${lang}: Erreur - ${error.message}`);
    errorCount++;
  }
}

console.log(`\n📊 Résumé: ${successCount} succès, ${errorCount} erreurs`);
