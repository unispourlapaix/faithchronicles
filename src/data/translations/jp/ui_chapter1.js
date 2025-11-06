// ============================================================================
// JAPANESE TRANSLATIONS - CHAPTER 1
// ============================================================================

export const translations = {
  meta: {
    language: 'jp',
    languageName: '日本語',
    chapterId: 1,
    version: '1.0'
  },
  
  chapter: {
    name: "創世記",
    description: "初めに言があった...",
    quote: "闇から光へ、恐れから信仰へ"
  },
  
  ui: {
    buttons: {
      play: "プレイ",
      back: "戻る",
      continue: "続ける",
      restart: "再開",
      close: "閉じる",
      nextLevel: "次のレベル",
      selectLevel: "レベル選択",
      retry: "再挑戦",
      mainMenu: "メインメニュー"
    },
    
    labels: {
      score: "スコア",
      stars: "星", 
      wisdom: "知恵",
      revelation: "啓示",
      lives: "ライフ",
      combo: "コンボ",
      level: "レベル",
      easy: "簡単",
      medium: "普通",
      hard: "難しい",
      correct: "正解！",
      gameOver: "試練失敗",
      victory: "勝利！",
      completed: "完了"
    },
    
    messages: {
      chooseCard: "⚡ パワーカードを選ぶ",
      cardHelp: "このレベルの3つの質問に同行します",
      chooseAnswer: "📖 答えを選んでください：",
      wrongAnswer: "❌ 不正解！残りライフ：{lives}。もう一度挑戦！",
      levelCompleted: "レベル{level}完了",
      questionsProgress: "質問{current}/3",
      starsCollected: "獲得した星：{current}/{total}",
      pointsEarned: "+{points} 知恵ポイント"
    }
  },
  
  spiritual: {
    ranks: {
      "Saint": "聖人",
      "Prophet": "預言者", 
      "Wise": "賢者",
      "Faithful": "忠実な者",
      "Believer": "信者",
      "Disciple": "弟子",
      "Seeker": "求道者"
    },
    
    quotes: {
      wisdom: "主を恐れることは知恵の初め",
      faith: "私を強くしてくださる方によって、私はどんなことでもできる",
      hope: "主は私の羊飼い。私は乏しいことがありません",
      love: "神は、実に、そのひとり子をお与えになったほどに世を愛された",
      perseverance: "信仰には忍耐が必要"
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
