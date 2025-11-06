// ============================================================================
// CHINESE TRANSLATIONS - CHAPTER 1
// ============================================================================

export const translations = {
  meta: {
    language: 'zh',
    languageName: '中文',
    chapterId: 1,
    version: '1.0'
  },
  
  chapter: {
    name: "创世记",
    description: "太初有道...",
    quote: "从黑暗到光明，从恐惧到信仰"
  },
  
  ui: {
    buttons: {
      play: "开始",
      back: "返回",
      continue: "继续",
      restart: "重新开始",
      close: "关闭",
      nextLevel: "下一关",
      selectLevel: "选择关卡",
      retry: "重试",
      mainMenu: "主菜单"
    },
    
    labels: {
      score: "分数",
      stars: "星星", 
      wisdom: "智慧",
      revelation: "启示",
      lives: "生命",
      combo: "连击",
      level: "关卡",
      easy: "简单",
      medium: "中等",
      hard: "困难",
      correct: "正确！",
      gameOver: "考验失败",
      victory: "胜利！",
      completed: "完成"
    },
    
    messages: {
      chooseCard: "⚡ 选择你的力量卡",
      cardHelp: "它将陪伴你完成本关的3个问题",
      chooseAnswer: "📖 选择你的答案：",
      wrongAnswer: "❌ 答案错误！你还有{lives}条生命。再试一次！",
      levelCompleted: "关卡{level}完成",
      questionsProgress: "问题{current}/3",
      starsCollected: "收集的星星：{current}/{total}",
      pointsEarned: "+{points} 智慧点数"
    }
  },
  
  spiritual: {
    ranks: {
      "Saint": "圣人",
      "Prophet": "先知", 
      "Wise": "智者",
      "Faithful": "忠诚者",
      "Believer": "信徒",
      "Disciple": "门徒",
      "Seeker": "寻道者"
    },
    
    quotes: {
      wisdom: "敬畏耶和华是智慧的开端",
      faith: "我靠着那加给我力量的，凡事都能作",
      hope: "耶和华是我的牧者，我必不至缺乏",
      love: "神爱世人...",
      perseverance: "信仰需要坚持不懈"
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
