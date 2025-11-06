// ============================================================================
// POLISH TRANSLATIONS - CHAPTER 1
// ============================================================================

export const translations = {
  meta: {
    language: 'pl',
    languageName: 'Polski',
    chapterId: 1,
    version: '1.0'
  },
  
  chapter: {
    name: "Księga Rodzaju",
    description: "Na początku było Słowo...",
    quote: "Z cienia do światła, ze strachu do wiary"
  },
  
  ui: {
    buttons: {
      play: "GRAJ",
      back: "Wstecz",
      continue: "Kontynuuj",
      restart: "Rozpocznij ponownie",
      close: "Zamknij",
      nextLevel: "Następny poziom",
      selectLevel: "Wybór poziomu",
      retry: "Spróbuj ponownie",
      mainMenu: "Menu główne"
    },
    
    labels: {
      score: "Wynik",
      stars: "Gwiazdy", 
      wisdom: "Mądrość",
      revelation: "Objawienie",
      lives: "Życia",
      combo: "Combo",
      level: "POZIOM",
      easy: "ŁATWY",
      medium: "ŚREDNI",
      hard: "TRUDNY",
      correct: "Poprawnie!",
      gameOver: "Próba nieudana",
      victory: "Zwycięstwo!",
      completed: "Ukończono"
    },
    
    messages: {
      chooseCard: "⚡ Wybierz swoją kartę mocy",
      cardHelp: "Będzie Ci towarzyszyć przez 3 pytania tego poziomu",
      chooseAnswer: "📖 Wybierz swoją odpowiedź:",
      wrongAnswer: "❌ Zła odpowiedź! Zostało Ci {lives} życ/a. Spróbuj ponownie!",
      levelCompleted: "Poziom {level} ukończony",
      questionsProgress: "Pytanie {current} z 3",
      starsCollected: "Zebrane gwiazdy: {current}/{total}",
      pointsEarned: "+{points} Punktów mądrości"
    }
  },
  
  spiritual: {
    ranks: {
      "Saint": "Święty",
      "Prophet": "Prorok", 
      "Wise": "Mędrzec",
      "Faithful": "Wierny",
      "Believer": "Wierzący",
      "Disciple": "Uczeń",
      "Seeker": "Poszukujący"
    },
    
    quotes: {
      wisdom: "Bojaźń Pańska jest początkiem mądrości",
      faith: "Wszystko mogę w Tym, który mnie umacnia",
      hope: "Pan jest moim pasterzem, nie brak mi niczego",
      love: "Tak bowiem Bóg umiłował świat...",
      perseverance: "Wiara wymaga wytrwałości"
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
