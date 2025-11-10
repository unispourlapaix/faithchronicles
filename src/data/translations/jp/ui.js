// ============================================================================
// JAPANESE TRANSLATIONS - UI
// ============================================================================

import unityTranslations from './unity.js';

export const uiTranslations = {
  meta: {
    language: 'jp',
    languageName: '日本語',
    version: '1.0'
  },
  
  app: {
    title: "UNITYQUEST 愛の\n年代記",
    subtitle: "聖書のインタラクティブな発見",
    tagline: "神聖な光に向かって歩む",
    menu: "メニュー",
    retry: "リトライ"
  },
  
  buttons: {
    play: "プレイ",
    back: "戻る",
    continue: "続ける",
    restart: "再スタート",
    close: "閉じる",
    nextLevel: "次のレベル",
    selectLevel: "レベル選択",
    retry: "リトライ",
    mainMenu: "メインメニュー",
    start: "始める",
    cancel: "キャンセル",
    confirm: "確認",
    save: "保存",
    load: "読み込む",
    yesRestart: "はい、再スタート",
    noContinue: "いいえ、続ける"
  ,
    tryAgain: "もう一度試す",
    backToMenu: "メニューに戻る"},
  
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
    completed: "完了",
    rank: "霊的ランク",
    points: "知恵ポイント",
    unlockedLevels: "レベル解放",
    questionOfKnowledge: "知識の質問",
    hintOfWisdom: "知恵のヒント",
    knowledgeMastered: "知識をマスター！",
    knowledgeAcquired: "知識獲得！",
    testFailed: "試練失敗",
    wisdomBonus: "ボーナス",
    xpGained: "経験値",
    newRank: "新ランク",
    nextGrade: "次の階級",
    maxLevelReached: "最大レベル到達！",
    wrongAnswer: "不正解！"
  },
  
  menu: {
    playButton: "プレイ",
    info: "情報",
    treasures: "宝物",
    john: "ヨハネ",
    reset: "リセット",
    restart: "🏔️ 冒険を再スタート？",
    confirmReset: "本当に進行状況を削除しますか？",
    youWillLose: "失うもの：",
    wisdomPoints: "知恵ポイント",
    starsCollected: "集めた星",
    levelsUnlocked: "解放されたレベル",
    spiritualRank: "霊的ランク",
    newAdventure: "🆕 新しい冒険",
    readyToStart: "始める準備はいいですか？",
    startJourney: "聖書の知識の旅を始めましょう！",
    audioControls: "音声コントロール",
    mute: "音声をミュート",
    unmute: "音声のミュートを解除",
    close: "閉じる",
    language: "言語",
    restartGame: "ゲームを再起動"
  },
  
  login: {
    title: "UNITY QUEST",
    subtitle: "インタラクティブな聖書の冒険",
    anonymousMode: "匿名でプレイ",
    anonymousDesc: "ニックネームを選択",
    emailMode: "メールでログイン",
    emailDesc: "マルチデバイス保存",
    pseudo: "ニックネーム",
    pseudoPlaceholder: "あなたのニックネーム...",
    email: "メールアドレス",
    emailPlaceholder: "your@email.com",
    startPlaying: "プレイを開始",
    sendLink: "リンクを送信",
    sending: "送信中...",
    connecting: "接続中...",
    back: "戻る",
    localSave: "進捗状況はローカルに保存されます",
    cloudSync: "クラウド同期 • セーブ同期",
    magicLink: "メールでマジックリンクを受け取る",
    checkEmail: "📧 メールを確認してください！ログインリンクが送信されました。",
    checkSpam: "迷惑メールフォルダも確認してください",
    waitingConnection: "接続待ち...",
    errorSend: "リンク送信エラー",
    rateLimited: "⏳ メールを再送信する前に15秒お待ちください",
    importSession: "🔄 本番環境からセッションをインポート",
    errorConnection: "接続エラー",
    enterPseudo: "ニックネームを入力してください",
    enterEmail: "有効なメールアドレスを入力してください",
    // Tooltips
    never: "なし",
    save: "ゲームを保存",
    lastSave: "最後",
    refresh: "進行状況を再読み込み",
    logout: "ログアウト",
    connectToCloud: "オンライン保存のために接続",
    editPseudo: "ユーザー名を編集",
    confirm: "確認",
    cancel: "キャンセル",
    close: "閉じる",
    passwordMode: "簡単ログイン",
    passwordDesc: "メール + パスワード",
    password: "パスワード",
    passwordPlaceholder: "最低6文字",
    passwordMinLength: "最低6文字",
    forgotPassword: "パスワードを忘れましたか？",
    forgotPassword: "パスワードを忘れましたか？",
    signup: "登録",
    signin: "ログイン",
    createAccount: "アカウント作成",
    signupInfo: "以下のフォームに記入してください",
    passwordInfo: "パスワードで素早くアクセス",
    signupButton: "アカウントを作成",
    signinButton: "ログイン",
    passwordTooShort: "パスワードは最低6文字必要です",
    emailAlreadyExists: "このメールは既に使用されています",
    emailExistsHint: "✉️ このメールは既に登録されています。ログインしてください！（別のゲームから作成された可能性があります）",
    switchToSignin: "🔑 既存のメールでサインインモードに切り替えてください",
    invalidCredentials: "メールまたはパスワードが無効です",
    signupSuccess: "📧 アカウントが作成されました！登録を確認するためにメールをチェックしてください。",
    emailConfirmationRequired: "アカウントを有効化するために受信トレイを確認してください",
    checkSpamFolder: "スパムフォルダを確認することを忘れないでください",
    connectionSuccess: "✅ ログイン成功！",
    errorSignup: "登録エラー"},
  
  install: {
    title: "アプリをインストール",
    subtitle: "クイックアクセスとオフライン",
    feature1: "ホーム画面から即座に起動",
    feature2: "インストール後はオフラインで動作",
    feature3: "ネイティブアプリの体験",
    feature4: "ストアダウンロード不要",
    install: "インストール",
    dismiss: "後で",
    info: "いつでもアプリをアンインストールできます"
  },
  
  ranks: {
    seeker: "探求者",
    believer: "覚醒者",
    disciple: "弟子",
    servant: "奉仕者",
    witness: "証人",
    guardian: "守護者",
    wise: "賢者",
    prophet: "預言者",
    apostle: "使徒",
    seekerDesc: "霊的な旅の始まり",
    believerDesc: "目覚めた霊的意識",
    discipleDesc: "教えの学習",
    servantDesc: "奉仕と献身",
    witnessDesc: "信仰の共有",
    guardianDesc: "真実の保護",
    wiseDesc: "知恵と知識",
    prophetDesc: "霊的なビジョン",
    apostleDesc: "霊的な師"
  },

  spiritualJourney: {
    beginning: "霊的な旅の始まり",
    progress: "霊的な進歩",
    grade: "階級",
    xp: "XP",
    level: "レベル",
    nextGrade: "次の階級",
    still: "あと",
    maxLevelReached: "最高レベルに到達しました！",
    masteredAllTeachings: "すべての教えをマスターしました",
    progression: "進行"
  },
  
  treasures: {
    title: "🎁 聖書の宝物",
    verse: "聖句の聖言",
    fact: "知っていましたか？",
    treasure: "隠された宝",
    question: "興味深い質問",
    context: "文脈",
    strongReference: "深い学びのための聖書参照",
    verseOfDay: "📖 聖句の聖言",
    didYouKnow: "💡 知っていましたか？",
    hiddenTreasure: "💎 隠された宝",
    funnyQuestion: "🤔 興味深い質問",
    emmanuelMemo: "エマニュエルのメモ",
    emmanuelMessage: "あなたは私の言葉に耳を傾け、知識は貴重です。しかし、真のいのちには、人間の解釈、愛情、そしてイエスの心の性質が必要です。すべての人間の教義は、あなたの心を導きます。真に知恵、その性質、その存在を求め、黙想の中であなたの弱点を見つけてください。愛はすべてを結ぶことができ、辛苦を超えることができます。私と共に歩み続けてください。",
    jesusIsNot: "🚫 誤解の明確化",
    clarification: "誤解の明確化",
    bibleOffline: "オフラインで聖書を読む",
    bibleStudy: "聖書研究",
    version: "バージョン",
    openReader: "リーダーを開く",
    features: "機能"
  },
  
  messages: {
    chooseCard: "👆 カードを選択",
    cardHelp: "このゲームの3つの質問に答えます",
    chooseAnswer: "💭 答えを選択！",
    wrongAnswer: "🚫 間違い！残りライフは {lives} です。もう一度試してください！",
    levelCompleted: "レベル {level} 完了",
    questionsProgress: "質問 {current}/3",
    starsCollected: "集まりスター！{current}/{total}",
    pointsEarned: "+{points} 知恵ポイント",
    secondChance: "👑💨 勇気カードがセカンドチャンスを与えます！知恵を持って再挑戦してください。",
    bonusApplied: "📖 {card} カードボーナス: +{percent}% ({base} → {final})",
    defeatedQuote: "私を強くしてくれる方によって、すべてができます",
    perfect: "📖 完璧",
    good: "👍 良い",
    start: "👍 スタート",
    secretLevel: "🔓 シークレットレベル解除！",
    secretChapter: "🔥 シークレットチャプター",
    returnToLevels: "戻る",
    next: "次へ",
    retry: "リトライ",
    menu: "メニュー",
    chapter: "チャプター",
    chapterStars: "チャプタースター",
    totalGlobal: "グローバル総数",
    backToMenu: "メニューに戻る"
  },
  
  quotes: {
    wisdom: "知を愛することは知恵の始まり",
    faith: "我を強くしてくれる方によって、私はどんなこともできる",
    hope: "知は信仰の基礎。信仰は幸せなことがない",
    love: "愛は、すべてを結び、永遠に続く...",
    perseverance: "忍耐には忍耐が必要",
    defeat: "失敗は知識の母"
  },
  
  cards: {
    faith: "信仰",
    courage: "勇気",
    wisdom: "知恵",
    faithKnowledge: "+50% ポイント",
    courageKnowledge: "セカンドチャンス",
    wisdomKnowledge: "ヒント + カードボーナス",
    faithDesc: "貴重な知恵ポイントの価値増加",
    courageDesc: "間違えてもセカンドチャンス",
    wisdomDesc: "ヒント可能 + 25% ポイント",
    chooseCard: "📖 あなたの知識カードを選択",
    cardEffects: "📖 知識カードの効果:",
    faithEffect: "+50% 知恵ポイント - 価値向上",
    courageEffect: "間違えても致命的でないセカンドチャンス",
    wisdomEffect: "+25% ポイント + 各質問のヒント可能",
    chooseWisely: "賢く選択してください、あなたの選択がレベル全体に影響します"
  },

  challenge: {
    loading: "レベルを読み込み中...",
    peace: "🕊️💨 あなたの心に平安がありますように",
    questionsAwaiting: "🎮 3つの知識の質問があなたを待っています",
    starsQuote: "各スターは愛と聖書の共同体です"
  },
  
  chapters: {
    "1": "創造説",
    "2": "出エジプト説",
    "3": "イエス・キリスト",
    "4": "困難な時/安息",
    "5": "始まりの模範",
    "6": "クリアの救い",
    "7": "最後/贖罪",
    "8": "カードレベル"
  },

  info: {
    title: "Unity Quest 平和の年代記",
    subtitle: "インタラクティブな聖書の発見",
    yourStats: "あなたの統計",
    score: "スコア",
    wisdom: "知恵",
    revelation: "啓示",
    createdWith: "💗💨で作成",
    creator: "Emmanuel Payet",
    developerPassionate: "情熱と献身を持つ開発者",
    artistModule: "エマニュエル・アーティスト",
    artistPortfolio: "アーティストポートフォリオとデモ音楽作品",
    features: "機能",
    multipleChapters: "8つの聖書の章に基づく91のレベル",
    powerCards: "3つのユニークなカード（信仰、勇気、知恵）",
    progressionSystem: "霊的ランクを持つ進捗システム",
    bibleTreasures: "聖書の宝物と教育的な面白い事実",
    howToPlay: "遊び方",
    selectLevel: "メインメニューからレベルを選択",
    choosePowerCard: "カードを選択",
    answerQuestions: "3つの知識の質問に答える",
    earnStars: "正しい回数に応じてスターを獲得",
    tips: "ヒント",
    readCarefully: "各質問を注意深く読む",
    useWisdomCard: "ヒントのために知恵カードを使用",
    courageGivesSecondChance: "勇気カードはセカンドチャンスを与えます",
    faithMaximizes: "信仰カードはポイントを最大化します",
    johnGospelTitle: "ヨハネの福音書",
    johnGospelStats: "21章 • 878節 • 14言語",
    bibleReaderStrong: "聖書リーダー + Strong",
    bibleReaderStrongDesc: "Strong辞書を使った完全な読書",
    johnTreasures: "ヨハネの宝物",
    johnTreasuresDesc: "聖書の宝物と興味深い事実",
    quickAccessChapters: "有名な章への素早いアクセス：",
    johnChapter1: "序文",
    johnChapter3: "新しく生まれる",
    johnChapter14: "私は道です",
    johnChapter20: "復活",
    version: "バージョン",
    madeWithLove: "愛を込めて作成",
    backToMenu: "メニューに戻る"
  },

  bible: {
    readerTitle: "💭 聖書リーダー",
    johnReaderTitle: "聖書リーダー - ヨハネの福音書",
    john: "ヨハネ",
    loading: "聖書を読み込み中...",
    loadingChapter: "ヨハネの福音書第 {chapter} 章。完全なデータを読み込んでいます...",
    exploreWhileLoading: "その間、他の章を探索するか、検索機能を使用できます。",
    menu: "メニュー",
    tabBible: "聖書",
    tabUnity: "統一",
    strong: "Strong",
    strongReferences: "Strong参照",
    verses: "節",
    previous: "前へ",
    next: "次へ",
    strongDefinition: "Strong参照",
    word: "単語",
    transliteration: "音訳",
    pronunciation: "発音",
    meaning: "意味",
    definition: "完全な定義",
    usage: "聖書での使用",
    etymology: "語源",
    close: "閉じる",
    moreReferences: "さらに{{count}}つの他の参照",
    copyright: "💭 著作権訳 1955 • Strong辞書",
    shareVerse: "この節を共有",
    markAsRead: "箇所既読",
    alreadyRead: "既読",
    readingBonus: "読書ボーナス",
    results: "結果",
    result: "結果",
    copy: "コピー",
    image: "画像"
  },

  mountain: {
    spiritualAscension: "霊的上昇",
    levelProgress: "レベル {{level}} • {{stars}} 星獲得",
    combo: "コンボ",
    perfectMessage: '"わたしの思いは、あなたがたの思いと異なる" - 子羊は完璧な知恵に向かって登ります',
    goodMessage: '"求めよ、さらば与えられん" - 真理への上昇が続きます',
    startMessage: '"からし種一粒ほどの信仰があれば" - 光への第一歩',
    skipAnimation: "アニメーションをスキップ",
    chapter: "チャプター",
    chapterProgress: "チャプター {{current}}/{{total}}",
    secret: "シークレット！",
    stats: {
      points: "pt",
      level: "Lv."
    },
    waypoints: {
      start: "スタート",
      firstSlope: "最初の斜面",
      lastSlope: "最後の斜面"
    },
    status: {
      victory: "勝利！",
      defeat: "失敗",
      inProgress: "進捗中"
    }
  },

  bibleResources: {
    inAppReader: {
      name: "アプリで読む",
      description: "ストロング辞書統合聖書リーダー",
      features: {
        offline: "オフライン",
        strong: "ストロング辞書",
        navigation: "ナビゲーション"
      }
    }
  },

  philosophy: {
    title: "哲学的次元",
    loveOntology: "存在論的な言葉としての愛",
    loveDescription: "イエスは愛を美的・真実の世界に結びつけます！愛と人を愛することが、現実の存在の様式そのものになります。愛は命令を逆転し、存在の基礎となります。",
    newCommandment: "新しい命令",
    jesusEmphasizes: "イエスが新しい命令を与えるとき、愛するという実践を強調します",
    loveGod: "心を尽くして神を愛しなさい",
    loveNeighbor: "自分自身のように隣人を愛しなさい",
    lovePriority: "愛が全体の究極になります"
  },

  unity: unityTranslations,

  footer: {
    version: "バージョン 1.0 • 2024",
    dedication: "愛を込めて開発"
  },

  endCredits: {
    lines: [
      { text: "あなたは私の言葉に耳を傾けました", delay: 2000 },
      { text: "深いことを学びました", delay: 2000 },
      { text: "あなたの忍耐は美徳です", delay: 2000 },
      { text: "愛と光に真実を解釈しています", delay: 2000 },
      { text: "世界はあなたを祝福します", delay: 2000 },
      { text: "私の出発を見守ってくれます", delay: 2000 },
      { text: "家が弟子のように黙想でいなさい", delay: 2000 },
      { text: "愛はあなたの階段と心を導きます", delay: 2000 },
      { text: "敬虔な時に愛の音を渡します", delay: 2000 },
      { text: "美徳があなたの熱を解決します", delay: 2000 },
      { text: "覚えなさい、そうすれば愛が続きます", delay: 2000 },
      { text: "平和は心を満たします", delay: 2000 },
      { text: "愛の力は永続です", delay: 2000 },
      { text: "それは愛の心から来ます", delay: 2000 },
      { text: "心の忍耐はあなたを自由にします", delay: 2000 },
      { text: "少しずつ愛とあなたを見つけます", delay: 2000 },
      { text: "愛はすべてを結ぶことができます", delay: 2000 },
      { text: "辛苦を待つことができます", delay: 2000 },
      { text: "私と共に歩み続けてください", delay: 2000 },
      { text: "イエス様、私の心をあなたに授けます", delay: 3000 },
      { text: "あなたは私の節、私の幸せな知恵です", delay: 3000 },
      { text: "来て、私の人を結んでください", delay: 3000 },
      { text: "道は聖なるものです", delay: 2000 },
      { text: "この真実を敬います", delay: 2000 },
      { text: "近づくことのない人へ", delay: 2000 },
      { text: "心の時に愛を忘れないでください", delay: 3000 },
      { text: "誤りが宝物のように", delay: 3000 }
    ],
    finalMessages: {
      congratulations: "おめでとうございます！",
      proud: "私たちはあなたを誇りに思います",
      courage: "勇敢に続けて",
      peace: "平安の祝福を",
      child: "愛の子",
      blessing: "愛があなたを祝福しますように",
      continue: "続ける"
    }
  },

  validation: {
    pseudoTooShort: "ユーザー名は少なくとも2文字必要です",
    enterPseudo: "ユーザー名を入力してください"
  },

  pseudoSetup: {
    title: "ユーザー名を選択",
    confirm: "名前を確認"
  },

  navigation: {
    back: "戻る"
  },

  console: {
    starsUnlocked: "スター解放！チャプター解除",
    defeatAnimation: "失敗...イエス・キリストが呼ばれる"
  },

  errors: {
    progressionError: "進捗エラー",
    invalidProgressionData: "無効な進捗データ！"
  },

  levels: {
    chaptersAndBonus: "8チャプター + ボーナスレベル",
    bonusUnlocked: "🔥 ボーナスレベル解除！完璧に達成しました！",
    starsToDiscover: "発見する {stars} は 273中",
    starsPerLevel: "レベルごとに 3 {stars}"
  },

  architecture: {
    title: "🏗️ 技術アーキテクチャ",
    react: {
      name: "React",
      description: "コンポーネントベース"
    },
    modules: {
      name: "モジュール",
      description: "実用的なモジュール"
    },
    localStorage: {
      name: "ローカルストレージ",
      description: "ローカル保存"
    },
    tailwind: {
      name: "Tailwind",
      description: "レスポンシブデザイン"
    }
  },

  gameManager: {
    title: "ゲーム保存",
    saveLocal: "ローカル保存",
    saveCloud: "クラウド同期",
    saveWaiting: "接続待ち",
    lastSave: "最後の保存：",
    never: "なし",
    saving: "保存中...",
    save: "保存",
    loadProgress: "読み込み",
    loading: "読み込み中...",
    autoSaveEnabled: "🎮 自動保存有効",
    saveError: "🚫 保存エラー",
    gameSaved: "📀 ゲーム保存完了！",
    gameLoaded: "💾 ゲーム読み込み完了！"
  }
};

export default uiTranslations;