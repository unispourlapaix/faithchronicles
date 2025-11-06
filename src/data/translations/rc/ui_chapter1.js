// ============================================================================
// LINGALA TRANSLATIONS - CHAPTER 1
// ============================================================================

export const translations = {
  meta: {
    language: 'rc',
    languageName: 'Lingála',
    chapterId: 1,
    version: '1.0'
  },
  
  chapter: {
    name: "Ebandeli",
    description: "Na ebandeli ezalaki Liloba...",
    quote: "Kobima na molili kokende na pole, kobima na bobangi kokende na kondima"
  },
  
  ui: {
    buttons: {
      play: "KOBƐTA",
      back: "Kozonga",
      continue: "Kokoba",
      restart: "Kobanda lisusu",
      close: "Kokanga",
      nextLevel: "Eteni oyo elandi",
      selectLevel: "Kopona eteni",
      retry: "Komeka lisusu",
      mainMenu: "Menü ya liboso"
    },
    
    labels: {
      score: "Makoki",
      stars: "Minzoto", 
      wisdom: "Bwanya",
      revelation: "Komonisama",
      lives: "Bomoi",
      combo: "Combo",
      level: "ETENI",
      easy: "PETE",
      medium: "KATI-KATI",
      hard: "MAKASI",
      correct: "Malamu!",
      gameOver: "Komekama elongwi te",
      victory: "Elongi!",
      completed: "Esilisi"
    },
    
    messages: {
      chooseCard: "⚡ Pona karte na yo ya nguya",
      cardHelp: "Ekozala elongo na yo mpo na mituna 3 ya eteni oyo",
      chooseAnswer: "📖 Pona eyano na yo:",
      wrongAnswer: "❌ Eyano mabe! Ozali na bomoi {lives} oyo etikali. Meka lisusu!",
      levelCompleted: "Eteni {level} esilisi",
      questionsProgress: "Motuna {current} na 3",
      starsCollected: "Minzoto oyo ezwami: {current}/{total}",
      pointsEarned: "+{points} Makoki ya bwanya"
    }
  },
  
  spiritual: {
    ranks: {
      "Saint": "Mosantu",
      "Prophet": "Mosakoli", 
      "Wise": "Moto ya bwanya",
      "Faithful": "Motikali",
      "Believer": "Mondimi",
      "Disciple": "Moyekoli",
      "Seeker": "Moluki"
    },
    
    quotes: {
      wisdom: "Kobanga Nkolo ezali ebandeli ya bwanya",
      faith: "Nakoki kosala makambu nyonso na nzela ya Klisto oyo azali kopesa ngai makasi",
      hope: "Nkolo azali Mobateli na ngai, nakozanga eloko te",
      love: "Mpo Nzambe alingaki mokili boye...",
      perseverance: "Kondima esengaka kotikala makasi"
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
