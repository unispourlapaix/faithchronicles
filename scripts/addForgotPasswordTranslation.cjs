const fs = require('fs');
const path = require('path');

const translations = {
  fr: "Mot de passe oublié ?",
  en: "Forgot password?",
  es: "¿Olvidaste tu contraseña?",
  de: "Passwort vergessen?",
  it: "Hai dimenticato la password?",
  pt: "Esqueceu a senha?",
  ru: "Забыли пароль?",
  uk: "Забули пароль?",
  zh: "忘记密码？",
  jp: "パスワードを忘れましたか？",
  ko: "비밀번호를 잊으셨나요?",
  ar: "هل نسيت كلمة المرور؟",
  he: "שכחת סיסמה?",
  hi: "पासवर्ड भूल गए?",
  sw: "Umesahau nenosiri?",
  pl: "Nie pamiętasz hasła?",
  rc: "Obosani ndimbo ya kobɔta?"
};

const languages = ['fr', 'en', 'es', 'de', 'it', 'pt', 'ru', 'uk', 'zh', 'jp', 'ko', 'ar', 'he', 'hi', 'sw', 'pl', 'rc'];

let successCount = 0;
let errorCount = 0;

languages.forEach(lang => {
  const filePath = path.join(__dirname, '..', 'src', 'data', 'translations', lang, 'ui.js');
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Trouver la section login et chercher passwordMinLength
    const searchPattern = /passwordMinLength:\s*"[^"]*"/;
    
    if (content.match(searchPattern)) {
      // Ajouter forgotPassword après passwordMinLength
      content = content.replace(
        searchPattern,
        match => `${match},\n    forgotPassword: "${translations[lang]}"`
      );
      
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ ${lang}: forgotPassword ajouté`);
      successCount++;
    } else {
      console.error(`❌ ${lang}: passwordMinLength non trouvé`);
      errorCount++;
    }
  } catch (error) {
    console.error(`❌ ${lang}: Erreur - ${error.message}`);
    errorCount++;
  }
});

console.log(`\n✅ Succès: ${successCount}/${languages.length}`);
console.log(`❌ Erreurs: ${errorCount}/${languages.length}`);
