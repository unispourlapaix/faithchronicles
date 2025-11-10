const fs = require('fs');
const path = require('path');

const translations = {
  fr: {
    passwordMode: "Connexion simple",
    passwordDesc: "Email + mot de passe",
    password: "Mot de passe",
    passwordPlaceholder: "Minimum 6 caractères",
    passwordMinLength: "Minimum 6 caractères",
    signup: "Inscription",
    signin: "Connexion",
    createAccount: "Créer un compte",
    signupInfo: "Remplissez le formulaire ci-dessous",
    passwordInfo: "Accès rapide avec mot de passe",
    signupButton: "Créer mon compte",
    signinButton: "Se connecter",
    passwordTooShort: "Le mot de passe doit contenir au moins 6 caractères",
    emailAlreadyExists: "Cet email est déjà utilisé",
    invalidCredentials: "Email ou mot de passe incorrect",
    signupSuccess: "✅ Compte créé ! Connexion...",
    connectionSuccess: "✅ Connexion réussie !",
    errorSignup: "Erreur lors de l'inscription"
  },
  en: {
    passwordMode: "Simple Login",
    passwordDesc: "Email + password",
    password: "Password",
    passwordPlaceholder: "Minimum 6 characters",
    passwordMinLength: "Minimum 6 characters",
    signup: "Sign Up",
    signin: "Sign In",
    createAccount: "Create Account",
    signupInfo: "Fill in the form below",
    passwordInfo: "Quick access with password",
    signupButton: "Create My Account",
    signinButton: "Sign In",
    passwordTooShort: "Password must be at least 6 characters",
    emailAlreadyExists: "This email is already in use",
    invalidCredentials: "Invalid email or password",
    signupSuccess: "✅ Account created! Logging in...",
    connectionSuccess: "✅ Successfully logged in!",
    errorSignup: "Error during sign up"
  },
  es: {
    passwordMode: "Conexión Simple",
    passwordDesc: "Email + contraseña",
    password: "Contraseña",
    passwordPlaceholder: "Mínimo 6 caracteres",
    passwordMinLength: "Mínimo 6 caracteres",
    signup: "Registrarse",
    signin: "Iniciar Sesión",
    createAccount: "Crear Cuenta",
    signupInfo: "Complete el formulario a continuación",
    passwordInfo: "Acceso rápido con contraseña",
    signupButton: "Crear Mi Cuenta",
    signinButton: "Iniciar Sesión",
    passwordTooShort: "La contraseña debe tener al menos 6 caracteres",
    emailAlreadyExists: "Este correo ya está en uso",
    invalidCredentials: "Correo o contraseña incorrectos",
    signupSuccess: "✅ Cuenta creada! Conectando...",
    connectionSuccess: "✅ Conexión exitosa!",
    errorSignup: "Error al registrarse"
  },
  de: {
    passwordMode: "Einfache Anmeldung",
    passwordDesc: "E-Mail + Passwort",
    password: "Passwort",
    passwordPlaceholder: "Mindestens 6 Zeichen",
    passwordMinLength: "Mindestens 6 Zeichen",
    signup: "Registrieren",
    signin: "Anmelden",
    createAccount: "Konto Erstellen",
    signupInfo: "Formular unten ausfüllen",
    passwordInfo: "Schneller Zugriff mit Passwort",
    signupButton: "Mein Konto Erstellen",
    signinButton: "Anmelden",
    passwordTooShort: "Passwort muss mindestens 6 Zeichen lang sein",
    emailAlreadyExists: "Diese E-Mail wird bereits verwendet",
    invalidCredentials: "Ungültige E-Mail oder Passwort",
    signupSuccess: "✅ Konto erstellt! Anmeldung...",
    connectionSuccess: "✅ Erfolgreich angemeldet!",
    errorSignup: "Fehler bei der Registrierung"
  },
  it: {
    passwordMode: "Accesso Semplice",
    passwordDesc: "Email + password",
    password: "Password",
    passwordPlaceholder: "Minimo 6 caratteri",
    passwordMinLength: "Minimo 6 caratteri",
    signup: "Registrati",
    signin: "Accedi",
    createAccount: "Crea Account",
    signupInfo: "Compila il modulo qui sotto",
    passwordInfo: "Accesso rapido con password",
    signupButton: "Crea Il Mio Account",
    signinButton: "Accedi",
    passwordTooShort: "La password deve contenere almeno 6 caratteri",
    emailAlreadyExists: "Questa email è già in uso",
    invalidCredentials: "Email o password non validi",
    signupSuccess: "✅ Account creato! Accesso...",
    connectionSuccess: "✅ Accesso riuscito!",
    errorSignup: "Errore durante la registrazione"
  },
  pt: {
    passwordMode: "Login Simples",
    passwordDesc: "Email + senha",
    password: "Senha",
    passwordPlaceholder: "Mínimo 6 caracteres",
    passwordMinLength: "Mínimo 6 caracteres",
    signup: "Cadastrar",
    signin: "Entrar",
    createAccount: "Criar Conta",
    signupInfo: "Preencha o formulário abaixo",
    passwordInfo: "Acesso rápido com senha",
    signupButton: "Criar Minha Conta",
    signinButton: "Entrar",
    passwordTooShort: "A senha deve ter pelo menos 6 caracteres",
    emailAlreadyExists: "Este email já está em uso",
    invalidCredentials: "Email ou senha inválidos",
    signupSuccess: "✅ Conta criada! Entrando...",
    connectionSuccess: "✅ Login bem-sucedido!",
    errorSignup: "Erro ao se cadastrar"
  },
  ru: {
    passwordMode: "Простой Вход",
    passwordDesc: "Email + пароль",
    password: "Пароль",
    passwordPlaceholder: "Минимум 6 символов",
    passwordMinLength: "Минимум 6 символов",
    signup: "Регистрация",
    signin: "Войти",
    createAccount: "Создать Аккаунт",
    signupInfo: "Заполните форму ниже",
    passwordInfo: "Быстрый доступ с паролем",
    signupButton: "Создать Мой Аккаунт",
    signinButton: "Войти",
    passwordTooShort: "Пароль должен содержать не менее 6 символов",
    emailAlreadyExists: "Этот email уже используется",
    invalidCredentials: "Неверный email или пароль",
    signupSuccess: "✅ Аккаунт создан! Вход...",
    connectionSuccess: "✅ Успешный вход!",
    errorSignup: "Ошибка при регистрации"
  },
  uk: {
    passwordMode: "Простий Вхід",
    passwordDesc: "Email + пароль",
    password: "Пароль",
    passwordPlaceholder: "Мінімум 6 символів",
    passwordMinLength: "Мінімум 6 символів",
    signup: "Реєстрація",
    signin: "Увійти",
    createAccount: "Створити Обліковий Запис",
    signupInfo: "Заповніть форму нижче",
    passwordInfo: "Швидкий доступ з паролем",
    signupButton: "Створити Мій Обліковий Запис",
    signinButton: "Увійти",
    passwordTooShort: "Пароль повинен містити не менше 6 символів",
    emailAlreadyExists: "Цей email вже використовується",
    invalidCredentials: "Невірний email або пароль",
    signupSuccess: "✅ Обліковий запис створено! Вхід...",
    connectionSuccess: "✅ Успішний вхід!",
    errorSignup: "Помилка при реєстрації"
  },
  zh: {
    passwordMode: "简单登录",
    passwordDesc: "邮箱 + 密码",
    password: "密码",
    passwordPlaceholder: "至少6个字符",
    passwordMinLength: "至少6个字符",
    signup: "注册",
    signin: "登录",
    createAccount: "创建账户",
    signupInfo: "填写下面的表格",
    passwordInfo: "使用密码快速访问",
    signupButton: "创建我的账户",
    signinButton: "登录",
    passwordTooShort: "密码必须至少6个字符",
    emailAlreadyExists: "此邮箱已被使用",
    invalidCredentials: "邮箱或密码无效",
    signupSuccess: "✅ 账户已创建！登录中...",
    connectionSuccess: "✅ 登录成功！",
    errorSignup: "注册时出错"
  },
  jp: {
    passwordMode: "簡単ログイン",
    passwordDesc: "メール + パスワード",
    password: "パスワード",
    passwordPlaceholder: "最低6文字",
    passwordMinLength: "最低6文字",
    signup: "登録",
    signin: "ログイン",
    createAccount: "アカウント作成",
    signupInfo: "以下のフォームに記入してください",
    passwordInfo: "パスワードで素早くアクセス",
    signupButton: "アカウントを作成",
    signinButton: "ログイン",
    passwordTooShort: "パスワードは最低6文字必要です",
    emailAlreadyExists: "このメールは既に使用されています",
    invalidCredentials: "メールまたはパスワードが無効です",
    signupSuccess: "✅ アカウント作成完了！ログイン中...",
    connectionSuccess: "✅ ログイン成功！",
    errorSignup: "登録エラー"
  },
  ko: {
    passwordMode: "간단 로그인",
    passwordDesc: "이메일 + 비밀번호",
    password: "비밀번호",
    passwordPlaceholder: "최소 6자",
    passwordMinLength: "최소 6자",
    signup: "가입",
    signin: "로그인",
    createAccount: "계정 만들기",
    signupInfo: "아래 양식을 작성하세요",
    passwordInfo: "비밀번호로 빠른 액세스",
    signupButton: "내 계정 만들기",
    signinButton: "로그인",
    passwordTooShort: "비밀번호는 최소 6자 이상이어야 합니다",
    emailAlreadyExists: "이 이메일은 이미 사용 중입니다",
    invalidCredentials: "이메일 또는 비밀번호가 잘못되었습니다",
    signupSuccess: "✅ 계정 생성 완료! 로그인 중...",
    connectionSuccess: "✅ 로그인 성공!",
    errorSignup: "가입 중 오류 발생"
  },
  ar: {
    passwordMode: "تسجيل دخول بسيط",
    passwordDesc: "البريد الإلكتروني + كلمة المرور",
    password: "كلمة المرور",
    passwordPlaceholder: "6 أحرف على الأقل",
    passwordMinLength: "6 أحرف على الأقل",
    signup: "تسجيل",
    signin: "تسجيل الدخول",
    createAccount: "إنشاء حساب",
    signupInfo: "املأ النموذج أدناه",
    passwordInfo: "وصول سريع باستخدام كلمة المرور",
    signupButton: "إنشاء حسابي",
    signinButton: "تسجيل الدخول",
    passwordTooShort: "يجب أن تحتوي كلمة المرور على 6 أحرف على الأقل",
    emailAlreadyExists: "هذا البريد الإلكتروني مستخدم بالفعل",
    invalidCredentials: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
    signupSuccess: "✅ تم إنشاء الحساب! جارٍ تسجيل الدخول...",
    connectionSuccess: "✅ تم تسجيل الدخول بنجاح!",
    errorSignup: "خطأ أثناء التسجيل"
  },
  he: {
    passwordMode: "התחברות פשוטה",
    passwordDesc: "אימייל + סיסמה",
    password: "סיסמה",
    passwordPlaceholder: "לפחות 6 תווים",
    passwordMinLength: "לפחות 6 תווים",
    signup: "הרשמה",
    signin: "התחברות",
    createAccount: "צור חשבון",
    signupInfo: "מלא את הטופס למטה",
    passwordInfo: "גישה מהירה עם סיסמה",
    signupButton: "צור את החשבון שלי",
    signinButton: "התחבר",
    passwordTooShort: "הסיסמה חייבת להכיל לפחות 6 תווים",
    emailAlreadyExists: "אימייל זה כבר בשימוש",
    invalidCredentials: "אימייל או סיסמה לא חוקיים",
    signupSuccess: "✅ החשבון נוצר! מתחבר...",
    connectionSuccess: "✅ התחברות הצליחה!",
    errorSignup: "שגיאה בהרשמה"
  },
  hi: {
    passwordMode: "सरल लॉगिन",
    passwordDesc: "ईमेल + पासवर्ड",
    password: "पासवर्ड",
    passwordPlaceholder: "न्यूनतम 6 वर्ण",
    passwordMinLength: "न्यूनतम 6 वर्ण",
    signup: "साइन अप करें",
    signin: "साइन इन करें",
    createAccount: "खाता बनाएँ",
    signupInfo: "नीचे दिया गया फॉर्म भरें",
    passwordInfo: "पासवर्ड के साथ त्वरित पहुंच",
    signupButton: "मेरा खाता बनाएँ",
    signinButton: "साइन इन करें",
    passwordTooShort: "पासवर्ड कम से कम 6 वर्णों का होना चाहिए",
    emailAlreadyExists: "यह ईमेल पहले से उपयोग में है",
    invalidCredentials: "अमान्य ईमेल या पासवर्ड",
    signupSuccess: "✅ खाता बनाया गया! साइन इन हो रहा है...",
    connectionSuccess: "✅ सफलतापूर्वक लॉगिन हुआ!",
    errorSignup: "साइन अप के दौरान त्रुटि"
  },
  sw: {
    passwordMode: "Kuingia Rahisi",
    passwordDesc: "Barua pepe + nywila",
    password: "Nywila",
    passwordPlaceholder: "Angalau herufi 6",
    passwordMinLength: "Angalau herufi 6",
    signup: "Jiandikishe",
    signin: "Ingia",
    createAccount: "Unda Akaunti",
    signupInfo: "Jaza fomu iliyo hapa chini",
    passwordInfo: "Upatikanaji wa haraka na nywila",
    signupButton: "Unda Akaunti Yangu",
    signinButton: "Ingia",
    passwordTooShort: "Nywila lazima iwe na angalau herufi 6",
    emailAlreadyExists: "Barua pepe hii tayari inatumika",
    invalidCredentials: "Barua pepe au nywila si sahihi",
    signupSuccess: "✅ Akaunti imeundwa! Inaingia...",
    connectionSuccess: "✅ Umeingia kwa mafanikio!",
    errorSignup: "Hitilafu wakati wa kujiandikisha"
  },
  pl: {
    passwordMode: "Proste Logowanie",
    passwordDesc: "Email + hasło",
    password: "Hasło",
    passwordPlaceholder: "Minimum 6 znaków",
    passwordMinLength: "Minimum 6 znaków",
    signup: "Rejestracja",
    signin: "Zaloguj",
    createAccount: "Utwórz Konto",
    signupInfo: "Wypełnij formularz poniżej",
    passwordInfo: "Szybki dostęp z hasłem",
    signupButton: "Utwórz Moje Konto",
    signinButton: "Zaloguj",
    passwordTooShort: "Hasło musi zawierać co najmniej 6 znaków",
    emailAlreadyExists: "Ten email jest już używany",
    invalidCredentials: "Nieprawidłowy email lub hasło",
    signupSuccess: "✅ Konto utworzone! Logowanie...",
    connectionSuccess: "✅ Zalogowano pomyślnie!",
    errorSignup: "Błąd podczas rejestracji"
  },
  rc: {
    passwordMode: "Connexion simple",
    passwordDesc: "Email + mot de passe",
    password: "Mot de passe",
    passwordPlaceholder: "Minimum 6 caractères",
    passwordMinLength: "Minimum 6 caractères",
    signup: "Inscription",
    signin: "Connexion",
    createAccount: "Créer un compte",
    signupInfo: "Remplissez le formulaire ci-dessous",
    passwordInfo: "Accès rapide avec mot de passe",
    signupButton: "Créer mon compte",
    signinButton: "Se connecter",
    passwordTooShort: "Le mot de passe doit contenir au moins 6 caractères",
    emailAlreadyExists: "Cet email est déjà utilisé",
    invalidCredentials: "Email ou mot de passe incorrect",
    signupSuccess: "✅ Compte créé ! Connexion...",
    connectionSuccess: "✅ Connexion réussie !",
    errorSignup: "Erreur lors de l'inscription"
  }
};

const languages = ['fr', 'en', 'es', 'de', 'it', 'pt', 'ru', 'uk', 'zh', 'jp', 'ko', 'ar', 'he', 'hi', 'sw', 'pl', 'rc'];

let successCount = 0;
let errorCount = 0;

languages.forEach(lang => {
  const filePath = path.join(__dirname, '..', 'src', 'data', 'translations', lang, 'ui.js');
  
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Trouver la section login
    const loginRegex = /login:\s*{([^}]+)}/s;
    const match = content.match(loginRegex);
    
    if (match) {
      const loginSection = match[1];
      const newTranslations = translations[lang];
      
      // Construire les nouvelles lignes de traductions
      const newLines = Object.entries(newTranslations)
        .map(([key, value]) => `    ${key}: "${value}"`)
        .join(',\n');
      
      // Ajouter les nouvelles traductions à la fin de la section login (avant la dernière accolade)
      const updatedLoginSection = loginSection.trimEnd() + ',\n' + newLines;
      
      content = content.replace(loginRegex, `login: {${updatedLoginSection}}`);
      
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ ${lang}: ${Object.keys(newTranslations).length} traductions ajoutées`);
      successCount++;
    } else {
      console.error(`❌ ${lang}: Section login non trouvée`);
      errorCount++;
    }
  } catch (error) {
    console.error(`❌ ${lang}: Erreur - ${error.message}`);
    errorCount++;
  }
});

console.log(`\n✅ Succès: ${successCount}/${languages.length}`);
console.log(`❌ Erreurs: ${errorCount}/${languages.length}`);
