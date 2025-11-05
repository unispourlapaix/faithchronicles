// ============================================================================
// TRADUCTIONS FRANÇAISES - CHAPITRE 1
// ============================================================================

export const translations = {
  meta: {
    language: 'fr',
    languageName: 'Français',
    chapterId: 1,
    version: '1.0'
  },
  
  chapter: {
    name: "La Genèse",
    description: "Au commencement était le Verbe...",
    quote: "De l'ombre vers la lumière, de la peur vers la foi"
  },
  
  ui: {
    buttons: {
      play: "JOUER",
      back: "Retour",
      continue: "Continuer",
      restart: "Recommencer",
      close: "Fermer",
      nextLevel: "Niveau Suivant",
      selectLevel: "Sélection des Niveaux",
      retry: "Réessayer",
      mainMenu: "Menu Principal"
    },
    
    labels: {
      score: "Score",
      stars: "Étoiles", 
      wisdom: "Sagesse",
      revelation: "Révélation",
      lives: "Vies",
      combo: "Combo",
      level: "NIVEAU",
      easy: "FACILE",
      medium: "MOYEN",
      hard: "DIFFICILE",
      correct: "Correct !",
      gameOver: "Épreuve Échouée",
      victory: "Victoire !",
      completed: "Complété"
    },
    
    messages: {
      chooseCard: "⚡ Choisis ta carte de pouvoir",
      cardHelp: "Elle t'accompagnera pour les 3 questions de ce niveau",
      chooseAnswer: "📖 Choisis ta réponse :",
      wrongAnswer: "❌ Mauvaise réponse ! Il te reste {lives} vie(s). Essaie encore !",
      levelCompleted: "Niveau {level} Complété",
      questionsProgress: "Question {current} sur 3",
      starsCollected: "Étoiles collectées : {current}/{total}",
      pointsEarned: "+{points} Points de Sagesse"
    }
  },
  
  spiritual: {
    ranks: {
      "Saint": "Saint",
      "Prophète": "Prophète", 
      "Sage": "Sage",
      "Fidèle": "Fidèle",
      "Croyant": "Croyant",
      "Disciple": "Disciple",
      "Chercheur": "Chercheur"
    },
    
    quotes: {
      wisdom: "Le commencement de la sagesse, c'est la crainte de l'Éternel",
      faith: "Je puis tout par celui qui me fortifie",
      hope: "L'Éternel est mon berger, je ne manquerai de rien",
      love: "Car Dieu a tant aimé le monde...",
      perseverance: "La foi nécessite de la persévérance"
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