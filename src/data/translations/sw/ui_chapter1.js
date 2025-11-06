// ============================================================================
// SWAHILI TRANSLATIONS - CHAPTER 1
// ============================================================================

export const translations = {
  meta: {
    language: 'sw',
    languageName: 'Kiswahili',
    chapterId: 1,
    version: '1.0'
  },
  
  chapter: {
    name: "Mwanzo",
    description: "Hapo mwanzo kulikuwa na Neno...",
    quote: "Kutoka gizani kwenda mwangaza, kutoka hofu kwenda imani"
  },
  
  ui: {
    buttons: {
      play: "CHEZA",
      back: "Rudi",
      continue: "Endelea",
      restart: "Anzisha upya",
      close: "Funga",
      nextLevel: "Ngazi inayofuata",
      selectLevel: "Uchaguzi wa ngazi",
      retry: "Jaribu tena",
      mainMenu: "Menyu kuu"
    },
    
    labels: {
      score: "Alama",
      stars: "Nyota", 
      wisdom: "Hekima",
      revelation: "Ufunuo",
      lives: "Maisha",
      combo: "Combo",
      level: "NGAZI",
      easy: "RAHISI",
      medium: "WASTANI",
      hard: "NGUMU",
      correct: "Sahihi!",
      gameOver: "Jaribio limeshindwa",
      victory: "Ushindi!",
      completed: "Imekamilika"
    },
    
    messages: {
      chooseCard: "⚡ Chagua kadi yako ya nguvu",
      cardHelp: "Itakufuata kwa maswali 3 ya ngazi hii",
      chooseAnswer: "📖 Chagua jibu lako:",
      wrongAnswer: "❌ Jibu lisilo sahihi! Umebaki na maisha {lives}. Jaribu tena!",
      levelCompleted: "Ngazi {level} imekamilika",
      questionsProgress: "Swali {current} kati ya 3",
      starsCollected: "Nyota zilizokusanywa: {current}/{total}",
      pointsEarned: "+{points} Pointi za hekima"
    }
  },
  
  spiritual: {
    ranks: {
      "Saint": "Mtakatifu",
      "Prophet": "Nabii", 
      "Wise": "Mwenye hekima",
      "Faithful": "Mwaminifu",
      "Believer": "Muumini",
      "Disciple": "Mwanafunzi",
      "Seeker": "Mtafutaji"
    },
    
    quotes: {
      wisdom: "Kumcha Bwana ndiyo mwanzo wa hekima",
      faith: "Naweza mambo yote katika Yeye anayenitia nguvu",
      hope: "Bwana ni mchungaji wangu, sitapungukiwa na kitu",
      love: "Kwa maana Mungu aliupenda ulimwengu hivi...",
      perseverance: "Imani inahitaji uvumilivu"
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
