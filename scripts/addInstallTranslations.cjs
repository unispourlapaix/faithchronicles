const fs = require('fs');
const path = require('path');

// Traductions pour le prompt d'installation PWA
const translations = {
  fr: {
    title: "Installer l'application",
    subtitle: "Accès rapide et hors ligne",
    feature1: "Lancement instantané depuis votre écran d'accueil",
    feature2: "Fonctionne hors ligne après installation",
    feature3: "Expérience application native",
    feature4: "Aucun téléchargement de store requis",
    install: "Installer",
    dismiss: "Plus tard",
    info: "Vous pourrez désinstaller l'app à tout moment"
  },
  en: {
    title: "Install the app",
    subtitle: "Quick access and offline",
    feature1: "Instant launch from your home screen",
    feature2: "Works offline after installation",
    feature3: "Native app experience",
    feature4: "No store download required",
    install: "Install",
    dismiss: "Later",
    info: "You can uninstall the app anytime"
  },
  es: {
    title: "Instalar la aplicación",
    subtitle: "Acceso rápido y sin conexión",
    feature1: "Lanzamiento instantáneo desde tu pantalla de inicio",
    feature2: "Funciona sin conexión después de la instalación",
    feature3: "Experiencia de aplicación nativa",
    feature4: "No se requiere descarga de tienda",
    install: "Instalar",
    dismiss: "Más tarde",
    info: "Puedes desinstalar la aplicación en cualquier momento"
  },
  de: {
    title: "App installieren",
    subtitle: "Schneller Zugriff und offline",
    feature1: "Sofortiger Start von Ihrem Startbildschirm",
    feature2: "Funktioniert offline nach der Installation",
    feature3: "Native App-Erfahrung",
    feature4: "Kein Store-Download erforderlich",
    install: "Installieren",
    dismiss: "Später",
    info: "Sie können die App jederzeit deinstallieren"
  },
  it: {
    title: "Installa l'app",
    subtitle: "Accesso rapido e offline",
    feature1: "Avvio istantaneo dalla schermata iniziale",
    feature2: "Funziona offline dopo l'installazione",
    feature3: "Esperienza app nativa",
    feature4: "Nessun download da store richiesto",
    install: "Installa",
    dismiss: "Dopo",
    info: "Puoi disinstallare l'app in qualsiasi momento"
  },
  pt: {
    title: "Instalar o aplicativo",
    subtitle: "Acesso rápido e offline",
    feature1: "Lançamento instantâneo da tela inicial",
    feature2: "Funciona offline após a instalação",
    feature3: "Experiência de aplicativo nativo",
    feature4: "Nenhum download de loja necessário",
    install: "Instalar",
    dismiss: "Depois",
    info: "Você pode desinstalar o app a qualquer momento"
  },
  ru: {
    title: "Установить приложение",
    subtitle: "Быстрый доступ и оффлайн",
    feature1: "Мгновенный запуск с главного экрана",
    feature2: "Работает оффлайн после установки",
    feature3: "Опыт нативного приложения",
    feature4: "Не требуется загрузка из магазина",
    install: "Установить",
    dismiss: "Позже",
    info: "Вы можете удалить приложение в любое время"
  },
  uk: {
    title: "Встановити додаток",
    subtitle: "Швидкий доступ та офлайн",
    feature1: "Миттєвий запуск з головного екрану",
    feature2: "Працює офлайн після встановлення",
    feature3: "Досвід нативного додатку",
    feature4: "Не потрібне завантаження з магазину",
    install: "Встановити",
    dismiss: "Пізніше",
    info: "Ви можете видалити додаток у будь-який час"
  },
  zh: {
    title: "安装应用",
    subtitle: "快速访问和离线",
    feature1: "从主屏幕即时启动",
    feature2: "安装后可离线工作",
    feature3: "原生应用体验",
    feature4: "无需应用商店下载",
    install: "安装",
    dismiss: "稍后",
    info: "您可以随时卸载应用"
  },
  jp: {
    title: "アプリをインストール",
    subtitle: "クイックアクセスとオフライン",
    feature1: "ホーム画面から即座に起動",
    feature2: "インストール後はオフラインで動作",
    feature3: "ネイティブアプリの体験",
    feature4: "ストアダウンロード不要",
    install: "インストール",
    dismiss: "後で",
    info: "いつでもアプリをアンインストールできます"
  },
  ko: {
    title: "앱 설치",
    subtitle: "빠른 액세스 및 오프라인",
    feature1: "홈 화면에서 즉시 실행",
    feature2: "설치 후 오프라인 작동",
    feature3: "네이티브 앱 경험",
    feature4: "스토어 다운로드 불필요",
    install: "설치",
    dismiss: "나중에",
    info: "언제든지 앱을 제거할 수 있습니다"
  },
  ar: {
    title: "تثبيت التطبيق",
    subtitle: "وصول سريع وغير متصل",
    feature1: "إطلاق فوري من شاشتك الرئيسية",
    feature2: "يعمل دون اتصال بعد التثبيت",
    feature3: "تجربة تطبيق أصلي",
    feature4: "لا حاجة لتنزيل المتجر",
    install: "تثبيت",
    dismiss: "لاحقاً",
    info: "يمكنك إلغاء تثبيت التطبيق في أي وقت"
  },
  he: {
    title: "התקן את האפליקציה",
    subtitle: "גישה מהירה ולא מקוון",
    feature1: "הפעלה מיידית ממסך הבית",
    feature2: "עובד במצב לא מקוון לאחר ההתקנה",
    feature3: "חוויית אפליקציה מקורית",
    feature4: "אין צורך בהורדה מחנות",
    install: "התקן",
    dismiss: "מאוחר יותר",
    info: "תוכל להסיר את האפליקציה בכל עת"
  },
  hi: {
    title: "ऐप इंस्टॉल करें",
    subtitle: "त्वरित पहुँच और ऑफ़लाइन",
    feature1: "अपनी होम स्क्रीन से तुरंत लॉन्च करें",
    feature2: "इंस्टॉलेशन के बाद ऑफ़लाइन काम करता है",
    feature3: "नेटिव ऐप अनुभव",
    feature4: "स्टोर डाउनलोड की आवश्यकता नहीं",
    install: "इंस्टॉल करें",
    dismiss: "बाद में",
    info: "आप किसी भी समय ऐप को अनइंस्टॉल कर सकते हैं"
  },
  sw: {
    title: "Sakinisha programu",
    subtitle: "Ufikiaji wa haraka na nje ya mtandao",
    feature1: "Uzinduzi wa papo hapo kutoka kwa skrini yako ya nyumbani",
    feature2: "Inafanya kazi nje ya mtandao baada ya usakinishaji",
    feature3: "Uzoefu wa programu asilia",
    feature4: "Hakuna upakuaji wa duka unahitajika",
    install: "Sakinisha",
    dismiss: "Baadaye",
    info: "Unaweza kuondoa programu wakati wowote"
  },
  pl: {
    title: "Zainstaluj aplikację",
    subtitle: "Szybki dostęp i offline",
    feature1: "Natychmiastowe uruchomienie z ekranu głównego",
    feature2: "Działa offline po instalacji",
    feature3: "Doświadczenie natywnej aplikacji",
    feature4: "Nie wymaga pobierania ze sklepu",
    install: "Zainstaluj",
    dismiss: "Później",
    info: "Możesz odinstalować aplikację w dowolnym momencie"
  },
  rc: {
    title: "Tyá aplikasyo",
    subtitle: "Kokóta nokinoki mpé offline",
    feature1: "Kobanda mbala moko na écran ya mboka",
    feature2: "Esalaka offline nsima ya installation",
    feature3: "Expérience ya aplikasyo ya mboka",
    feature4: "Esɛngaka té kokita na magazini",
    install: "Tyá",
    dismiss: "Na nsima",
    info: "Okokoka kolongola aplikasyo ntango nyonso"
  }
};

const langCodes = Object.keys(translations);

console.log('🔄 Ajout des traductions "install" dans toutes les langues...\n');

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
    
    // Vérifier si la section install existe déjà
    if (content.includes('install:')) {
      console.log(`✅ ${lang}: install existe déjà`);
      successCount++;
      continue;
    }

    // Trouver la fin de la section login et ajouter install après
    const searchPattern = /(  login: \{[^}]+\},)/;
    
    if (!searchPattern.test(content)) {
      console.log(`⚠️  ${lang}: Section login non trouvée`);
      errorCount++;
      continue;
    }

    const installSection = `
  
  install: {
    title: "${translations[lang].title}",
    subtitle: "${translations[lang].subtitle}",
    feature1: "${translations[lang].feature1}",
    feature2: "${translations[lang].feature2}",
    feature3: "${translations[lang].feature3}",
    feature4: "${translations[lang].feature4}",
    install: "${translations[lang].install}",
    dismiss: "${translations[lang].dismiss}",
    info: "${translations[lang].info}"
  },`;

    content = content.replace(
      searchPattern,
      `$1${installSection}`
    );

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${lang}: install ajouté`);
    successCount++;

  } catch (error) {
    console.log(`❌ ${lang}: Erreur - ${error.message}`);
    errorCount++;
  }
}

console.log(`\n📊 Résumé: ${successCount} succès, ${errorCount} erreurs`);
