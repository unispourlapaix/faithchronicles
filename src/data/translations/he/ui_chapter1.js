// ============================================================================
// HEBREW TRANSLATIONS - CHAPTER 1
// ============================================================================

export const translations = {
  meta: {
    language: 'he',
    languageName: 'עברית',
    chapterId: 1,
    version: '1.0',
    direction: 'rtl'
  },
  
  chapter: {
    name: "בראשית",
    description: "בראשית היה הדבר...",
    quote: "מהצל לאור, מהפחד לאמונה"
  },
  
  ui: {
    buttons: {
      play: "שחק",
      back: "חזור",
      continue: "המשך",
      restart: "התחל מחדש",
      close: "סגור",
      nextLevel: "שלב הבא",
      selectLevel: "בחירת שלב",
      retry: "נסה שוב",
      mainMenu: "תפריט ראשי"
    },
    
    labels: {
      score: "ניקוד",
      stars: "כוכבים", 
      wisdom: "חוכמה",
      revelation: "התגלות",
      lives: "חיים",
      combo: "קומבו",
      level: "שלב",
      easy: "קל",
      medium: "בינוני",
      hard: "קשה",
      correct: "נכון!",
      gameOver: "המבחן נכשל",
      victory: "ניצחון!",
      completed: "הושלם"
    },
    
    messages: {
      chooseCard: "⚡ בחר את כרטיס הכוח שלך",
      cardHelp: "הוא ילווה אותך ב-3 השאלות של השלב הזה",
      chooseAnswer: "📖 בחר את תשובתך:",
      wrongAnswer: "❌ תשובה שגויה! נשארו לך {lives} חיים. נסה שוב!",
      levelCompleted: "שלב {level} הושלם",
      questionsProgress: "שאלה {current} מתוך 3",
      starsCollected: "כוכבים שנאספו: {current}/{total}",
      pointsEarned: "+{points} נקודות חוכמה"
    }
  },
  
  spiritual: {
    ranks: {
      "Saint": "קדוש",
      "Prophet": "נביא", 
      "Wise": "חכם",
      "Faithful": "נאמן",
      "Believer": "מאמין",
      "Disciple": "תלמיד",
      "Seeker": "מחפש"
    },
    
    quotes: {
      wisdom: "ראשית חכמה יראת ה'",
      faith: "הכל אוכל במשיח המחזק אותי",
      hope: "ה' רועי לא אחסר",
      love: "כי כך אהב אלוהים את העולם...",
      perseverance: "אמונה דורשת התמדה"
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
