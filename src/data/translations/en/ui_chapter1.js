// ============================================================================
// ENGLISH TRANSLATIONS - CHAPTER 1
// ============================================================================

export const translations = {
  meta: {
    language: 'en',
    languageName: 'English',
    chapterId: 1,
    version: '1.0'
  },
  
  chapter: {
    name: "Genesis",
    description: "In the beginning was the Word...",
    quote: "From shadow to light, from fear to faith"
  },
  
  ui: {
    buttons: {
      play: "PLAY",
      back: "Back",
      continue: "Continue",
      restart: "Restart",
      close: "Close",
      nextLevel: "Next Level",
      selectLevel: "Level Selection",
      retry: "Retry",
      mainMenu: "Main Menu"
    },
    
    labels: {
      score: "Score",
      stars: "Stars", 
      wisdom: "Wisdom",
      revelation: "Revelation",
      lives: "Lives",
      combo: "Combo",
      level: "LEVEL",
      easy: "EASY",
      medium: "MEDIUM",
      hard: "HARD",
      correct: "Correct!",
      gameOver: "Trial Failed",
      victory: "Victory!",
      completed: "Completed"
    },
    
    messages: {
      chooseCard: "⚡ Choose your power card",
      cardHelp: "It will accompany you for the 3 questions of this level",
      chooseAnswer: "📖 Choose your answer:",
      wrongAnswer: "❌ Wrong answer! You have {lives} life(lives) left. Try again!",
      levelCompleted: "Level {level} Completed",
      questionsProgress: "Question {current} of 3",
      starsCollected: "Stars collected: {current}/{total}",
      pointsEarned: "+{points} Wisdom Points"
    }
  },
  
  spiritual: {
    ranks: {
      "Saint": "Saint",
      "Prophet": "Prophet", 
      "Wise": "Sage",
      "Faithful": "Faithful",
      "Believer": "Believer",
      "Disciple": "Disciple",
      "Seeker": "Seeker"
    },
    
    quotes: {
      wisdom: "The fear of the Lord is the beginning of wisdom",
      faith: "I can do all things through Christ who strengthens me",
      hope: "The Lord is my shepherd, I shall not want",
      love: "For God so loved the world...",
      perseverance: "Faith requires perseverance"
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