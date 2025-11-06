// ============================================================================
// ARABIC TRANSLATIONS - CHAPTER 1
// ============================================================================

export const translations = {
  meta: {
    language: 'ar',
    languageName: 'العربية',
    chapterId: 1,
    version: '1.0',
    direction: 'rtl'
  },
  
  chapter: {
    name: "سفر التكوين",
    description: "في البدء كان الكلمة...",
    quote: "من الظلام إلى النور، من الخوف إلى الإيمان"
  },
  
  ui: {
    buttons: {
      play: "العب",
      back: "رجوع",
      continue: "متابعة",
      restart: "إعادة البدء",
      close: "إغلاق",
      nextLevel: "المستوى التالي",
      selectLevel: "اختيار المستوى",
      retry: "إعادة المحاولة",
      mainMenu: "القائمة الرئيسية"
    },
    
    labels: {
      score: "النقاط",
      stars: "النجوم", 
      wisdom: "الحكمة",
      revelation: "الوحي",
      lives: "الأرواح",
      combo: "كومبو",
      level: "المستوى",
      easy: "سهل",
      medium: "متوسط",
      hard: "صعب",
      correct: "صحيح!",
      gameOver: "فشل الاختبار",
      victory: "انتصار!",
      completed: "مكتمل"
    },
    
    messages: {
      chooseCard: "⚡ اختر بطاقة القوة الخاصة بك",
      cardHelp: "ستصاحبك في الأسئلة الثلاثة من هذا المستوى",
      chooseAnswer: "📖 اختر إجابتك:",
      wrongAnswer: "❌ إجابة خاطئة! لديك {lives} حياة متبقية. حاول مرة أخرى!",
      levelCompleted: "المستوى {level} مكتمل",
      questionsProgress: "السؤال {current} من 3",
      starsCollected: "النجوم المجمعة: {current}/{total}",
      pointsEarned: "+{points} نقاط الحكمة"
    }
  },
  
  spiritual: {
    ranks: {
      "Saint": "قديس",
      "Prophet": "نبي", 
      "Wise": "حكيم",
      "Faithful": "مؤمن",
      "Believer": "مؤمن",
      "Disciple": "تلميذ",
      "Seeker": "باحث"
    },
    
    quotes: {
      wisdom: "مخافة الرب رأس الحكمة",
      faith: "أستطيع كل شيء في المسيح الذي يقويني",
      hope: "الرب راعي فلا يعوزني شيء",
      love: "لأنه هكذا أحب الله العالم...",
      perseverance: "الإيمان يتطلب المثابرة"
    }
  }
};

export const getTranslation = (key, params = {}) => {
  const keys = key.split('.');
  let value = translations;
  
  for (const k of keys) {
    value = value?.[k];
    if (!value) return key;
  }
  
  if (typeof value === 'string' && Object.keys(params).length > 0) {
    return value.replace(/{(\w+)}/g, (match, key) => params[key] || match);
  }
  
  return value;
};
