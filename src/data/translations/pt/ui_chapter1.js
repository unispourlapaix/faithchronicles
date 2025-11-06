// ============================================================================
// PORTUGUESE TRANSLATIONS - CHAPTER 1
// ============================================================================

export const translations = {
  meta: {
    language: 'pt',
    languageName: 'Português',
    chapterId: 1,
    version: '1.0'
  },
  
  chapter: {
    name: "O Gênesis",
    description: "No princípio era o Verbo...",
    quote: "Da sombra à luz, do medo à fé"
  },
  
  ui: {
    buttons: {
      play: "JOGAR",
      back: "Voltar",
      continue: "Continuar",
      restart: "Recomeçar",
      close: "Fechar",
      nextLevel: "Próximo Nível",
      selectLevel: "Seleção de Níveis",
      retry: "Tentar Novamente",
      mainMenu: "Menu Principal"
    },
    
    labels: {
      score: "Pontuação",
      stars: "Estrelas", 
      wisdom: "Sabedoria",
      revelation: "Revelação",
      lives: "Vidas",
      combo: "Combo",
      level: "NÍVEL",
      easy: "FÁCIL",
      medium: "MÉDIO",
      hard: "DIFÍCIL",
      correct: "Correto!",
      gameOver: "Prova Falhada",
      victory: "Vitória!",
      completed: "Completado"
    },
    
    messages: {
      chooseCard: "⚡ Escolha sua carta de poder",
      cardHelp: "Ela te acompanhará nas 3 perguntas deste nível",
      chooseAnswer: "📖 Escolha sua resposta:",
      wrongAnswer: "❌ Resposta errada! Você tem {lives} vida(s) restante(s). Tente novamente!",
      levelCompleted: "Nível {level} Completado",
      questionsProgress: "Pergunta {current} de 3",
      starsCollected: "Estrelas coletadas: {current}/{total}",
      pointsEarned: "+{points} Pontos de Sabedoria"
    }
  },
  
  spiritual: {
    ranks: {
      "Saint": "Santo",
      "Prophet": "Profeta", 
      "Wise": "Sábio",
      "Faithful": "Fiel",
      "Believer": "Crente",
      "Disciple": "Discípulo",
      "Seeker": "Buscador"
    },
    
    quotes: {
      wisdom: "O temor do Senhor é o princípio da sabedoria",
      faith: "Tudo posso naquele que me fortalece",
      hope: "O Senhor é o meu pastor, nada me faltará",
      love: "Porque Deus amou o mundo de tal maneira...",
      perseverance: "A fé requer perseverança"
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
