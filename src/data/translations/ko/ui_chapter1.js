// ============================================================================
// KOREAN TRANSLATIONS - CHAPTER 1
// ============================================================================

export const translations = {
  meta: {
    language: 'ko',
    languageName: '한국어',
    chapterId: 1,
    version: '1.0'
  },
  
  chapter: {
    name: "창세기",
    description: "태초에 말씀이 계셨다...",
    quote: "어둠에서 빛으로, 두려움에서 믿음으로"
  },
  
  ui: {
    buttons: {
      play: "플레이",
      back: "뒤로",
      continue: "계속",
      restart: "다시 시작",
      close: "닫기",
      nextLevel: "다음 레벨",
      selectLevel: "레벨 선택",
      retry: "재시도",
      mainMenu: "메인 메뉴"
    },
    
    labels: {
      score: "점수",
      stars: "별", 
      wisdom: "지혜",
      revelation: "계시",
      lives: "생명",
      combo: "콤보",
      level: "레벨",
      easy: "쉬움",
      medium: "보통",
      hard: "어려움",
      correct: "정답!",
      gameOver: "시험 실패",
      victory: "승리!",
      completed: "완료"
    },
    
    messages: {
      chooseCard: "⚡ 파워 카드를 선택하세요",
      cardHelp: "이 레벨의 3개 질문에 함께합니다",
      chooseAnswer: "📖 답을 선택하세요:",
      wrongAnswer: "❌ 오답입니다! 남은 생명: {lives}개. 다시 시도하세요!",
      levelCompleted: "레벨 {level} 완료",
      questionsProgress: "질문 {current}/3",
      starsCollected: "획득한 별: {current}/{total}",
      pointsEarned: "+{points} 지혜 포인트"
    }
  },
  
  spiritual: {
    ranks: {
      "Saint": "성인",
      "Prophet": "예언자", 
      "Wise": "현자",
      "Faithful": "신실한 자",
      "Believer": "신자",
      "Disciple": "제자",
      "Seeker": "구도자"
    },
    
    quotes: {
      wisdom: "여호와를 경외하는 것이 지혜의 근본",
      faith: "내게 능력 주시는 자 안에서 내가 모든 것을 할 수 있다",
      hope: "여호와는 나의 목자시니 내게 부족함이 없다",
      love: "하나님이 세상을 이처럼 사랑하사...",
      perseverance: "믿음에는 인내가 필요합니다"
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
