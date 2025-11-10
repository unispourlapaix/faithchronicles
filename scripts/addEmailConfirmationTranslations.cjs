const fs = require('fs');
const path = require('path');

const translations = {
  fr: {
    signupSuccess: '📧 Compte créé ! Vérifiez votre email pour confirmer votre inscription.',
    emailConfirmationRequired: 'Vérifiez votre boîte mail pour activer votre compte',
    checkSpamFolder: 'Pensez à vérifier vos spams/courrier indésirable'
  },
  en: {
    signupSuccess: '📧 Account created! Check your email to confirm your registration.',
    emailConfirmationRequired: 'Check your inbox to activate your account',
    checkSpamFolder: 'Remember to check your spam/junk folder'
  },
  es: {
    signupSuccess: '📧 ¡Cuenta creada! Revisa tu email para confirmar tu registro.',
    emailConfirmationRequired: 'Revisa tu bandeja de entrada para activar tu cuenta',
    checkSpamFolder: 'Recuerda revisar tu carpeta de spam/correo no deseado'
  },
  de: {
    signupSuccess: '📧 Konto erstellt! Überprüfen Sie Ihre E-Mail, um Ihre Registrierung zu bestätigen.',
    emailConfirmationRequired: 'Überprüfen Sie Ihren Posteingang, um Ihr Konto zu aktivieren',
    checkSpamFolder: 'Denken Sie daran, Ihren Spam-Ordner zu überprüfen'
  },
  it: {
    signupSuccess: '📧 Account creato! Controlla la tua email per confermare la registrazione.',
    emailConfirmationRequired: 'Controlla la tua casella di posta per attivare il tuo account',
    checkSpamFolder: 'Ricorda di controllare la cartella spam/posta indesiderata'
  },
  pt: {
    signupSuccess: '📧 Conta criada! Verifique seu email para confirmar seu registro.',
    emailConfirmationRequired: 'Verifique sua caixa de entrada para ativar sua conta',
    checkSpamFolder: 'Lembre-se de verificar sua pasta de spam/lixo eletrônico'
  },
  ru: {
    signupSuccess: '📧 Аккаунт создан! Проверьте email для подтверждения регистрации.',
    emailConfirmationRequired: 'Проверьте входящие сообщения для активации аккаунта',
    checkSpamFolder: 'Не забудьте проверить папку спам'
  },
  uk: {
    signupSuccess: '📧 Акаунт створено! Перевірте email для підтвердження реєстрації.',
    emailConfirmationRequired: 'Перевірте вхідні повідомлення для активації акаунту',
    checkSpamFolder: 'Не забудьте перевірити папку спам'
  },
  zh: {
    signupSuccess: '📧 账户已创建！请查看您的邮箱以确认注册。',
    emailConfirmationRequired: '请查看您的收件箱以激活账户',
    checkSpamFolder: '请记得检查垃圾邮件文件夹'
  },
  ar: {
    signupSuccess: '📧 تم إنشاء الحساب! تحقق من بريدك الإلكتروني لتأكيد التسجيل.',
    emailConfirmationRequired: 'تحقق من صندوق الوارد لتفعيل حسابك',
    checkSpamFolder: 'تذكر التحقق من مجلد الرسائل غير المرغوب فيها'
  },
  he: {
    signupSuccess: '📧 חשבון נוצר! בדוק את האימייל שלך לאישור ההרשמה.',
    emailConfirmationRequired: 'בדוק את תיבת הדואר הנכנס שלך כדי להפעיל את החשבון',
    checkSpamFolder: 'זכור לבדוק את תיקיית הספאם שלך'
  },
  jp: {
    signupSuccess: '📧 アカウントが作成されました！登録を確認するためにメールをチェックしてください。',
    emailConfirmationRequired: 'アカウントを有効化するために受信トレイを確認してください',
    checkSpamFolder: 'スパムフォルダを確認することを忘れないでください'
  },
  ko: {
    signupSuccess: '📧 계정이 생성되었습니다! 등록을 확인하기 위해 이메일을 확인하세요.',
    emailConfirmationRequired: '계정을 활성화하기 위해 받은편지함을 확인하세요',
    checkSpamFolder: '스팸 폴더를 확인하는 것을 잊지 마세요'
  },
  hi: {
    signupSuccess: '📧 खाता बनाया गया! अपने पंजीकरण की पुष्टि करने के लिए अपना ईमेल जांचें।',
    emailConfirmationRequired: 'अपने खाते को सक्रिय करने के लिए अपना इनबॉक्स जांचें',
    checkSpamFolder: 'अपने स्पैम/जंक फ़ोल्डर की जांच करना याद रखें'
  },
  sw: {
    signupSuccess: '📧 Akaunti imeundwa! Angalia barua pepe yako kuhakikisha usajili wako.',
    emailConfirmationRequired: 'Angalia kisanduku chako cha barua kupata ili kuamilisha akaunti yako',
    checkSpamFolder: 'Kumbuka kuangalia folda yako ya spam/barua zisizohitajika'
  },
  pl: {
    signupSuccess: '📧 Konto utworzone! Sprawdź swoją pocztę, aby potwierdzić rejestrację.',
    emailConfirmationRequired: 'Sprawdź swoją skrzynkę odbiorczą, aby aktywować konto',
    checkSpamFolder: 'Pamiętaj, aby sprawdzić folder spam'
  },
  rc: {
    signupSuccess: '📧 Compte esalemi! Talela email na yo pona kondima inscription na yo.',
    emailConfirmationRequired: 'Talela boîte na yo ya email pona ko-activer compte na yo',
    checkSpamFolder: 'Kanisa ko-talela dossier na yo ya spam'
  }
};

const translationDir = path.join(__dirname, '../src/data/translations');
const languages = Object.keys(translations);

let successCount = 0;
let errorCount = 0;

languages.forEach(lang => {
  const filePath = path.join(translationDir, lang, 'ui.js');
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Chercher la section login
    const loginSectionRegex = /login:\s*{[\s\S]*?passwordTooShort:[^,]*,/;
    const match = content.match(loginSectionRegex);
    
    if (match) {
      const newTranslations = `
    emailConfirmationRequired: "${translations[lang].emailConfirmationRequired}",
    checkSpamFolder: "${translations[lang].checkSpamFolder}",`;
      
      // Remplacer signupSuccess
      content = content.replace(
        /signupSuccess:[^,]*,/,
        `signupSuccess: "${translations[lang].signupSuccess}",${newTranslations}`
      );
      
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ ${lang}/ui.js - Traductions ajoutées`);
      successCount++;
    } else {
      console.log(`⚠️ ${lang}/ui.js - Section login non trouvée`);
      errorCount++;
    }
  } catch (error) {
    console.error(`❌ ${lang}/ui.js - Erreur:`, error.message);
    errorCount++;
  }
});

console.log(`\n📊 Résumé: ${successCount} succès, ${errorCount} erreurs`);
