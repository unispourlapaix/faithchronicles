// ============================================================================
// ITALIAN TRANSLATIONS - CHAPTER 1
// ============================================================================

export const translations = {
  meta: {
    language: 'it',
    languageName: 'Italiano',
    chapterId: 1,
    version: '1.0'
  },
  
  chapter: {
    name: "La Genesi",
    description: "In principio era il Verbo...",
    quote: "Dall'ombra alla luce, dalla paura alla fede"
  },
  
  ui: {
    buttons: {
      play: "GIOCA",
      back: "Indietro",
      continue: "Continua",
      restart: "Ricomincia",
      close: "Chiudi",
      nextLevel: "Livello Successivo",
      selectLevel: "Selezione Livelli",
      retry: "Riprova",
      mainMenu: "Menu Principale"
    },
    
    labels: {
      score: "Punteggio",
      stars: "Stelle", 
      wisdom: "Saggezza",
      revelation: "Rivelazione",
      lives: "Vite",
      combo: "Combo",
      level: "LIVELLO",
      easy: "FACILE",
      medium: "MEDIO",
      hard: "DIFFICILE",
      correct: "Corretto!",
      gameOver: "Prova Fallita",
      victory: "Vittoria!",
      completed: "Completato"
    },
    
    messages: {
      chooseCard: "⚡ Scegli la tua carta potere",
      cardHelp: "Ti accompagnerà per le 3 domande di questo livello",
      chooseAnswer: "📖 Scegli la tua risposta:",
      wrongAnswer: "❌ Risposta sbagliata! Ti restano {lives} vita/e. Riprova!",
      levelCompleted: "Livello {level} Completato",
      questionsProgress: "Domanda {current} di 3",
      starsCollected: "Stelle raccolte: {current}/{total}",
      pointsEarned: "+{points} Punti Saggezza"
    }
  },
  
  spiritual: {
    ranks: {
      "Saint": "Santo",
      "Prophet": "Profeta", 
      "Wise": "Saggio",
      "Faithful": "Fedele",
      "Believer": "Credente",
      "Disciple": "Discepolo",
      "Seeker": "Cercatore"
    },
    
    quotes: {
      wisdom: "Il timore del Signore è il principio della sapienza",
      faith: "Tutto posso in colui che mi dà forza",
      hope: "Il Signore è il mio pastore, non manco di nulla",
      love: "Dio ha tanto amato il mondo...",
      perseverance: "La fede richiede perseveranza"
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
