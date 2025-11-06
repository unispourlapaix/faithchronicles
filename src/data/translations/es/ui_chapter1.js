// ============================================================================
// SPANISH TRANSLATIONS - CHAPTER 1
// ============================================================================

export const translations = {
  meta: {
    language: 'es',
    languageName: 'Español',
    chapterId: 1,
    version: '1.0'
  },
  
  chapter: {
    name: "El Génesis",
    description: "En el principio era el Verbo...",
    quote: "De la sombra a la luz, del miedo a la fe"
  },
  
  ui: {
    buttons: {
      play: "JUGAR",
      back: "Volver",
      continue: "Continuar",
      restart: "Reiniciar",
      close: "Cerrar",
      nextLevel: "Siguiente Nivel",
      selectLevel: "Selección de Niveles",
      retry: "Reintentar",
      mainMenu: "Menú Principal"
    },
    
    labels: {
      score: "Puntuación",
      stars: "Estrellas", 
      wisdom: "Sabiduría",
      revelation: "Revelación",
      lives: "Vidas",
      combo: "Combo",
      level: "NIVEL",
      easy: "FÁCIL",
      medium: "MEDIO",
      hard: "DIFÍCIL",
      correct: "¡Correcto!",
      gameOver: "Prueba Fallida",
      victory: "¡Victoria!",
      completed: "Completado"
    },
    
    messages: {
      chooseCard: "⚡ Elige tu carta de poder",
      cardHelp: "Te acompañará para las 3 preguntas de este nivel",
      chooseAnswer: "📖 Elige tu respuesta:",
      wrongAnswer: "❌ ¡Respuesta incorrecta! Te quedan {lives} vida(s). ¡Inténtalo de nuevo!",
      levelCompleted: "Nivel {level} Completado",
      questionsProgress: "Pregunta {current} de 3",
      starsCollected: "Estrellas recolectadas: {current}/{total}",
      pointsEarned: "+{points} Puntos de Sabiduría"
    }
  },
  
  spiritual: {
    ranks: {
      "Saint": "Santo",
      "Prophet": "Profeta", 
      "Wise": "Sabio",
      "Faithful": "Fiel",
      "Believer": "Creyente",
      "Disciple": "Discípulo",
      "Seeker": "Buscador"
    },
    
    quotes: {
      wisdom: "El principio de la sabiduría es el temor del Señor",
      faith: "Todo lo puedo en Cristo que me fortalece",
      hope: "El Señor es mi pastor, nada me faltará",
      love: "Porque de tal manera amó Dios al mundo...",
      perseverance: "La fe requiere perseverancia"
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
