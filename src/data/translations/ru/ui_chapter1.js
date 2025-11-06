// ============================================================================
// RUSSIAN TRANSLATIONS - CHAPTER 1
// ============================================================================

export const translations = {
  meta: {
    language: 'ru',
    languageName: 'Русский',
    chapterId: 1,
    version: '1.0'
  },
  
  chapter: {
    name: "Бытие",
    description: "В начале было Слово...",
    quote: "От тьмы к свету, от страха к вере"
  },
  
  ui: {
    buttons: {
      play: "ИГРАТЬ",
      back: "Назад",
      continue: "Продолжить",
      restart: "Начать заново",
      close: "Закрыть",
      nextLevel: "Следующий уровень",
      selectLevel: "Выбор уровня",
      retry: "Повторить",
      mainMenu: "Главное меню"
    },
    
    labels: {
      score: "Счёт",
      stars: "Звёзды", 
      wisdom: "Мудрость",
      revelation: "Откровение",
      lives: "Жизни",
      combo: "Комбо",
      level: "УРОВЕНЬ",
      easy: "ЛЕГКО",
      medium: "СРЕДНЕ",
      hard: "СЛОЖНО",
      correct: "Правильно!",
      gameOver: "Испытание провалено",
      victory: "Победа!",
      completed: "Завершено"
    },
    
    messages: {
      chooseCard: "⚡ Выберите карту силы",
      cardHelp: "Она будет сопровождать вас в 3 вопросах этого уровня",
      chooseAnswer: "📖 Выберите ваш ответ:",
      wrongAnswer: "❌ Неправильный ответ! У вас осталось {lives} жизн(и/ей). Попробуйте ещё раз!",
      levelCompleted: "Уровень {level} завершён",
      questionsProgress: "Вопрос {current} из 3",
      starsCollected: "Собрано звёзд: {current}/{total}",
      pointsEarned: "+{points} Очков мудрости"
    }
  },
  
  spiritual: {
    ranks: {
      "Saint": "Святой",
      "Prophet": "Пророк", 
      "Wise": "Мудрец",
      "Faithful": "Верный",
      "Believer": "Верующий",
      "Disciple": "Ученик",
      "Seeker": "Ищущий"
    },
    
    quotes: {
      wisdom: "Начало мудрости - страх Господень",
      faith: "Всё могу в укрепляющем меня Иисусе Христе",
      hope: "Господь - Пастырь мой; я ни в чем не буду нуждаться",
      love: "Ибо так возлюбил Бог мир...",
      perseverance: "Вера требует настойчивости"
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
