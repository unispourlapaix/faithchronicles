const fs = require('fs');
const path = require('path');

const translations = {
  fr: {
    emailExistsHint: "✉️ Cet email est déjà enregistré. Essayez de vous connecter ! (Peut-être créé depuis un autre jeu?)",
    switchToSignin: "🔑 Passez en mode Connexion avec votre email existant"
  },
  en: {
    emailExistsHint: "✉️ This email is already registered. Try to sign in! (Maybe created from another game?)",
    switchToSignin: "🔑 Switch to Sign In mode with your existing email"
  },
  es: {
    emailExistsHint: "✉️ Este correo ya está registrado. ¡Intenta iniciar sesión! (¿Quizás creado desde otro juego?)",
    switchToSignin: "🔑 Cambia al modo Iniciar Sesión con tu correo existente"
  },
  de: {
    emailExistsHint: "✉️ Diese E-Mail ist bereits registriert. Versuchen Sie sich anzumelden! (Vielleicht von einem anderen Spiel erstellt?)",
    switchToSignin: "🔑 Wechseln Sie zum Anmeldemodus mit Ihrer vorhandenen E-Mail"
  },
  it: {
    emailExistsHint: "✉️ Questa email è già registrata. Prova ad accedere! (Forse creata da un altro gioco?)",
    switchToSignin: "🔑 Passa alla modalità Accedi con la tua email esistente"
  },
  pt: {
    emailExistsHint: "✉️ Este email já está registrado. Tente fazer login! (Talvez criado de outro jogo?)",
    switchToSignin: "🔑 Mude para o modo Entrar com seu email existente"
  },
  ru: {
    emailExistsHint: "✉️ Этот email уже зарегистрирован. Попробуйте войти! (Может быть, создан из другой игры?)",
    switchToSignin: "🔑 Переключитесь в режим входа с вашим существующим email"
  },
  uk: {
    emailExistsHint: "✉️ Цей email вже зареєстровано. Спробуйте увійти! (Можливо, створено з іншої гри?)",
    switchToSignin: "🔑 Перейдіть у режим входу з вашим існуючим email"
  },
  zh: {
    emailExistsHint: "✉️ 此邮箱已注册。请尝试登录！（可能是从另一个游戏创建的？）",
    switchToSignin: "🔑 切换到使用现有邮箱的登录模式"
  },
  ar: {
    emailExistsHint: "✉️ هذا البريد الإلكتروني مسجل بالفعل. حاول تسجيل الدخول! (ربما تم إنشاؤه من لعبة أخرى؟)",
    switchToSignin: "🔑 انتقل إلى وضع تسجيل الدخول باستخدام بريدك الإلكتروني الحالي"
  },
  he: {
    emailExistsHint: "✉️ אימייל זה כבר רשום. נסה להתחבר! (אולי נוצר ממשחק אחר?)",
    switchToSignin: "🔑 עבור למצב התחברות עם האימייל הקיים שלך"
  },
  jp: {
    emailExistsHint: "✉️ このメールは既に登録されています。ログインしてください！（別のゲームから作成された可能性があります）",
    switchToSignin: "🔑 既存のメールでサインインモードに切り替えてください"
  },
  ko: {
    emailExistsHint: "✉️ 이 이메일은 이미 등록되어 있습니다. 로그인을 시도하세요! (다른 게임에서 만들었을 수도 있습니다)",
    switchToSignin: "🔑 기존 이메일로 로그인 모드로 전환하세요"
  },
  hi: {
    emailExistsHint: "✉️ यह ईमेल पहले से पंजीकृत है। साइन इन करने का प्रयास करें! (शायद किसी अन्य गेम से बनाया गया?)",
    switchToSignin: "🔑 अपने मौजूदा ईमेल के साथ साइन इन मोड पर स्विच करें"
  },
  sw: {
    emailExistsHint: "✉️ Barua pepe hii tayari imesajiliwa. Jaribu kuingia! (Labda iliundwa kutoka kwa mchezo mwingine?)",
    switchToSignin: "🔑 Badili hadi njia ya kuingia kwa barua pepe yako iliyopo"
  },
  pl: {
    emailExistsHint: "✉️ Ten email jest już zarejestrowany. Spróbuj się zalogować! (Może został utworzony z innej gry?)",
    switchToSignin: "🔑 Przejdź do trybu logowania z istniejącym emailem"
  },
  rc: {
    emailExistsHint: "✉️ Cet email est déjà enregistré. Essayez de vous connecter ! (Peut-être créé depuis un autre jeu?)",
    switchToSignin: "🔑 Passez en mode Connexion avec votre email existant"
  }
};

const translationDir = path.join(__dirname, '..', 'src', 'data', 'translations');

Object.entries(translations).forEach(([lang, strings]) => {
  const filePath = path.join(translationDir, lang, 'ui.js');
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️ Fichier manquant: ${filePath}`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  
  // Chercher la ligne emailAlreadyExists et ajouter après
  const searchPattern = /emailAlreadyExists: ".*",/;
  
  if (!content.match(searchPattern)) {
    console.log(`⚠️ Pattern emailAlreadyExists non trouvé dans ${lang}`);
    return;
  }

  // Vérifier si déjà ajouté
  if (content.includes('emailExistsHint')) {
    console.log(`✅ ${lang}: Déjà ajouté`);
    return;
  }

  // Ajouter les nouvelles lignes après emailAlreadyExists
  content = content.replace(
    searchPattern,
    (match) => `${match}\n    emailExistsHint: "${strings.emailExistsHint}",\n    switchToSignin: "${strings.switchToSignin}",`
  );

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ ${lang}: Traductions ajoutées`);
});

console.log('\n✨ Terminé !');
