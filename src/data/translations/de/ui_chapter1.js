// ============================================================================
// GERMAN TRANSLATIONS - CHAPTER 1
// ============================================================================

export const translations = {
  meta: {
    language: 'de',
    languageName: 'Deutsch',
    chapterId: 1,
    version: '1.0'
  },
  
  chapter: {
    name: "Die Genesis",
    description: "Am Anfang war das Wort...",
    quote: "Vom Schatten zum Licht, von der Furcht zum Glauben"
  },
  
  ui: {
    buttons: {
      play: "SPIELEN",
      back: "Zurück",
      continue: "Fortsetzen",
      restart: "Neu starten",
      close: "Schließen",
      nextLevel: "Nächstes Level",
      selectLevel: "Level-Auswahl",
      retry: "Wiederholen",
      mainMenu: "Hauptmenü"
    },
    
    labels: {
      score: "Punktzahl",
      stars: "Sterne", 
      wisdom: "Weisheit",
      revelation: "Offenbarung",
      lives: "Leben",
      combo: "Combo",
      level: "LEVEL",
      easy: "EINFACH",
      medium: "MITTEL",
      hard: "SCHWER",
      correct: "Richtig!",
      gameOver: "Prüfung gescheitert",
      victory: "Sieg!",
      completed: "Abgeschlossen"
    },
    
    messages: {
      chooseCard: "⚡ Wähle deine Machtkarte",
      cardHelp: "Sie wird dich bei den 3 Fragen dieses Levels begleiten",
      chooseAnswer: "📖 Wähle deine Antwort:",
      wrongAnswer: "❌ Falsche Antwort! Du hast noch {lives} Leben. Versuche es erneut!",
      levelCompleted: "Level {level} abgeschlossen",
      questionsProgress: "Frage {current} von 3",
      starsCollected: "Gesammelte Sterne: {current}/{total}",
      pointsEarned: "+{points} Weisheitspunkte"
    }
  },
  
  spiritual: {
    ranks: {
      "Saint": "Heiliger",
      "Prophet": "Prophet", 
      "Wise": "Weiser",
      "Faithful": "Gläubiger",
      "Believer": "Gläubiger",
      "Disciple": "Jünger",
      "Seeker": "Suchender"
    },
    
    quotes: {
      wisdom: "Die Furcht des Herrn ist der Anfang der Weisheit",
      faith: "Ich vermag alles durch den, der mich stark macht",
      hope: "Der Herr ist mein Hirte, mir wird nichts mangeln",
      love: "Denn so sehr hat Gott die Welt geliebt...",
      perseverance: "Glaube erfordert Ausdauer"
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
