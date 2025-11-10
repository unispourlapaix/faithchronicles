// ============================================================================
// GERMAN TRANSLATIONS - UI
// ============================================================================

import unityTranslations from './unity.js';
export const uiTranslations = {
  meta: {
    language: 'de',
    languageName: 'Deutsch',
    version: '1.0'
  },
  
  app: {
    title: "UNITYQUEST Chroniken\nder Liebe",
    subtitle: "Interaktive Schriftentdeckung",
    tagline: "Zum g├Âttlichen Licht gehen",
    menu: "Menü",
    retry: "Wiederholen"
  },
  
  buttons: {
    play: "SPIELEN",
    back: "Zurück",
    continue: "Fortsetzen",
    restart: "Neu starten",
    close: "Schlie├ƒen",
    nextLevel: "Nöchstes Level",
    selectLevel: "Level-Auswahl",
    retry: "Wiederholen",
    mainMenu: "Hauptmenü",
    start: "Starten",
    cancel: "Abbrechen",
    confirm: "Bestötigen",
    save: "Speichern",
    load: "Laden",
    yesRestart: "Ja, neu starten",
    noContinue: "Nein, fortsetzen",
    tryAgain: "Erneut versuchen",
    backToMenu: "Zurück zum Menü"
  },
  
  labels: {
    score: "Punktzahl",
    stars: "Sterne",
    wisdom: "Weisheit",
    revelation: "Offenbarung",
    lives: "Leben",
    combo: "Combo",
    level: "LEVEL",
    easy: "EINFACH",
    medium: "MITTEL",
    hard: "SCHWER",
    correct: "Richtig!",
    gameOver: "Prüfung gescheitert",
    victory: "Sieg!",
    completed: "Abgeschlossen",
    rank: "Spiritueller Rang",
    points: "Weisheitspunkte",
    unlockedLevels: "Level freigeschaltet",
    questionOfKnowledge: "Wissensfrage",
    hintOfWisdom: "Weisheitshinweis",
    knowledgeMastered: "Wissen gemeistert!",
    knowledgeAcquired: "Wissen erworben!",
    testFailed: "Prüfung gescheitert",
    wisdomBonus: "Bonus",
    xpGained: "XP",
    newRank: "Neuer Rang"
  },
  
  menu: {
    playButton: "SPIELEN",
    info: "Info",
    treasures: "Schötze",
    john: "Johannes",
    reset: "Zurücksetzen",
    restart: "🔄 Abenteuer neu starten?",
    confirmReset: "Bist du sicher, dass du deinen gesamten Fortschritt l├Âschen m├Âchtest?",
    youWillLose: "Du wirst verlieren:",
    wisdomPoints: "Weisheitspunkte",
    starsCollected: "gesammelte Sterne",
    levelsUnlocked: "freigeschaltete Level",
    spiritualRank: "Spiritueller Rang",
    newAdventure: "🌟 Neues Abenteuer",
    readyToStart: "Bereit zu starten?",
    startJourney: "Beginne deine Reise in die Kenntnis der Schriften!",
    audioControls: "Audiosteuerung",
    mute: "Ton aus",
    unmute: "Ton an",
    close: "Schließen",
    language: "Sprache",
    restartGame: "Spiel neu starten"
  },
  
  login: {
    title: "UNITY QUEST",
    subtitle: "Interaktives Bibelabenteuer",
    anonymousMode: "Anonym spielen",
    anonymousDesc: "Wöhle einen Spitznamen",
    emailMode: "E-Mail-Anmeldung",
    emailDesc: "Mehrgerötespeicherung",
    pseudo: "Spitzname",
    pseudoPlaceholder: "Dein Spitzname...",
    email: "E-Mail-Adresse",
    emailPlaceholder: "deine@email.com",
    startPlaying: "Spielen beginnen",
    sendLink: "Link senden",
    sending: "Senden...",
    connecting: "Verbinden...",
    back: "Zurück",
    localSave: "Dein Fortschritt wird lokal gespeichert",
    cloudSync: "Kein Passwort erforderlich • Cloud-Synchronisation",
    magicLink: "Erhalte einen magischen Link per E-Mail",
    checkEmail: "📧 Überprüfe deine E-Mail! Ein Anmeldelink wurde gesendet.",
    checkSpam: "Überprüfe auch deinen Spam-Ordner",
    waitingConnection: "Warte auf Verbindung...",
    errorSend: "Fehler beim Senden des Links",
    rateLimited: "⏳ Bitte warten Sie 15 Sekunden, bevor Sie eine E-Mail erneut senden",
    importSession: "🔄 Sitzung aus Produktion importieren",
    errorConnection: "Verbindungsfehler",
    enterPseudo: "Bitte gib einen Spitznamen ein",
    enterEmail: "Bitte gib eine gültige E-Mail ein",
    // Tooltips
    never: "Nie",
    save: "Spiel speichern",
    lastSave: "letzte",
    refresh: "Fortschritt neu laden",
    logout: "Abmelden",
    connectToCloud: "Verbinden um online zu speichern",
    editPseudo: "Benutzername bearbeiten",
    confirm: "Bestätigen",
    cancel: "Abbrechen",
    close: "Schließen",
    passwordMode: "Einfache Anmeldung",
    passwordDesc: "E-Mail + Passwort",
    password: "Passwort",
    passwordPlaceholder: "Mindestens 6 Zeichen",
    passwordMinLength: "Mindestens 6 Zeichen",
    forgotPassword: "Passwort vergessen?",
    resetPasswordTitle: "Passwort Zurücksetzen",
    resetPasswordSubtitle: "Geben Sie Ihre E-Mail ein, um einen Zurücksetzungslink zu erhalten",
    sendResetLink: "Link Senden",
    resetEmailSent: "📧 Zurücksetzungs-E-Mail gesendet! Überprüfen Sie Ihr Postfach.",
    errorReset: "Fehler beim Senden der E-Mail",
    backToSignin: "Zurück zur Anmeldung",
    newPassword: "Neues Passwort",
    enterNewPassword: "Wählen Sie ein neues sicheres Passwort",
    confirmPassword: "Passwort Bestätigen",
    updatePassword: "Passwort Aktualisieren",
    passwordsDontMatch: "Passwörter stimmen nicht überein",
    passwordUpdateSuccess: "✅ Passwort erfolgreich aktualisiert!",
    errorUpdatePassword: "Fehler beim Aktualisieren des Passworts",
    resetLinkExpired: "Zurücksetzungslink abgelaufen oder ungültig",
    forgotPassword: "Passwort vergessen?",
    signup: "Registrieren",
    signin: "Anmelden",
    createAccount: "Konto Erstellen",
    signupInfo: "Formular unten ausfüllen",
    passwordInfo: "Schneller Zugriff mit Passwort",
    signupButton: "Mein Konto Erstellen",
    signinButton: "Anmelden",
    passwordTooShort: "Passwort muss mindestens 6 Zeichen lang sein",
    emailAlreadyExists: "Diese E-Mail wird bereits verwendet",
    emailExistsHint: "✉️ Diese E-Mail ist bereits registriert. Versuchen Sie sich anzumelden! (Vielleicht von einem anderen Spiel erstellt?)",
    switchToSignin: "🔑 Wechseln Sie zum Anmeldemodus mit Ihrer vorhandenen E-Mail",
    invalidCredentials: "Ungültige E-Mail oder Passwort",
    signupSuccess: "📧 Konto erstellt! Überprüfen Sie Ihre E-Mail, um Ihre Registrierung zu bestätigen.",
    emailConfirmationRequired: "Überprüfen Sie Ihren Posteingang, um Ihr Konto zu aktivieren",
    checkSpamFolder: "Denken Sie daran, Ihren Spam-Ordner zu überprüfen",
    connectionSuccess: "✅ Erfolgreich angemeldet!",
    errorSignup: "Fehler bei der Registrierung"},
  
  install: {
    title: "App installieren",
    subtitle: "Schneller Zugriff und offline",
    feature1: "Sofortiger Start von Ihrem Startbildschirm",
    feature2: "Funktioniert offline nach der Installation",
    feature3: "Native App-Erfahrung",
    feature4: "Kein Store-Download erforderlich",
    install: "Installieren",
    dismiss: "Später",
    info: "Sie können die App jederzeit deinstallieren"
  },
  
  ranks: {
    seeker: "Suchender",
    believer: "Der Erwachte",
    disciple: "Jünger",
    servant: "Diener",
    witness: "Zeuge",
    guardian: "Hüter",
    wise: "Weiser",
    prophet: "Prophet",
    apostle: "Apostel",
    seekerDesc: "Beginn der spirituellen Reise",
    believerDesc: "Erwachtes spirituelles Bewusstsein",
    discipleDesc: "Lernen der Lehren",
    servantDesc: "Dienst und Hingabe",
    witnessDesc: "Teilen des Glaubens",
    guardianDesc: "Schutz der Wahrheit",
    wiseDesc: "Weisheit und Wissen",
    prophetDesc: "Spirituelle Vision",
    apostleDesc: "Spiritueller Meister"
  },

  spiritualJourney: {
    beginning: "Beginn der spirituellen Reise",
    progress: "Spiritueller Fortschritt",
    grade: "Grad",
    xp: "XP",
    level: "Level",
    nextGrade: "Nächster Grad",
    still: "Noch",
    maxLevelReached: "Maximales Level Erreicht!",
    masteredAllTeachings: "Sie haben alle Lehren gemeistert",
    progression: "Fortschritt"
  },
  
  treasures: {
    title: "📖 Schötze der Bibel",
    verse: "Vers des Tages",
    fact: "Wusstest du?",
    treasure: "Verborgener Schatz",
    question: "Lustige Frage",
    context: "Kontext",
    strongReference: "Biblische Referenz für vertieftes Studium",
    verseOfDay: "🃏 Vers des Tages",
    didYouKnow: "🤔 Wusstest du?",
    hiddenTreasure: "💎 Verborgener Schatz",
    funnyQuestion: "😄 Lustige Frage",
    emmanuelMemo: "Emmanuels Notiz",
    emmanuelMessage: "Sie haben die Spitze des Berges erreicht, und das Wissen ist erworben. Aber unerschütterlicher Glaube erfordert Lebenserfahrung, Barmherzigkeit und wahre Liebe zu Jesus. Die verschiedenen Prüfungen des Lebens werden Ihren Weg, den wahren Weg, den wir wöhlen, unser Herz testen. Wir bleiben unvollkommen, unsere Wünsche sind zahlreich, und die Liebe zum Gewinn oder zu unserem pers├Ânlichen Komfort wird allzu oft zu unserer egoistischen Prioritöt. Bitten Sie Gott um Weisheit, seine Liebe, seine Kraft und erkennen Sie demütig Ihre Schwöchen an, denn nichts kann vor Ihm verborgen werden... Nichts. Kein Bedarf im privaten Modus zu surfen, VPN zu verwenden oder sogar den Verlauf zu l├Âschen. Fasten Sie wie Daniel: Entbehren Sie für einen Moment das, was Sie am meisten lieben, in Ruhe und Weisheit. Dies wird es Ihnen erm├Âglichen, Gott besser zu h├Âren, eine Herzenshaltung zu haben, die bereit ist für tiefe - und oft schmerzhafte - Transformationen. Dann werden Tröume und Visionen klarer werden, wie bei Joseph. Aber hüten Sie sich vor Stolz: Geben Sie nicht nach bei 'Ich habe immer recht' oder 'Ich wei├ƒ es besser.' Denn Gottes Offenbarung ist eine au├ƒergew├Âhnliche Gnade. Werden Sie nicht zu einem Gesetzeslehrer, der Jesus heute noch kreuzigen k├Ânnte, Er, der einfach darum bittet, Ihren Nöchsten zu lieben... und ihnen die gleiche Freiheit zu gewöhren, die Sie erhalten. Glauben zu haben bedeutet, in eine freie Beziehung und Reise des Herzens einzutreten. Es wird Sie zu möchtigen Helden machen, die des Unm├Âglichen föhig sind. Denn die Erfahrung des Übernatürlichen, Gottes Gegenwart, seine Bestötigung oder sein Segen wird Sie wirklich unerschütterlich machen.",
    jesusIsNot: "❌ Wichtige Klarstellung",
    clarification: "Wichtige Klarstellung",
    bibleOffline: "Bibel offline lesen",
    bibleStudy: "Bibelstudium",
    version: "Version",
    openReader: "Reader ├Âffnen",
    features: "Funktionen"
  },
  
  messages: {
    chooseCard: "🃏 Wöhle deine Machtkarte",
    cardHelp: "Sie wird dich bei den 3 Fragen dieses Levels begleiten",
    chooseAnswer: "📖 Wöhle deine Antwort:",
    wrongAnswer: "❌ Falsche Antwort! Du hast noch {{lives}} Leben. Versuche es erneut!",
    levelCompleted: "Level {{level}} abgeschlossen",
    questionsProgress: "Frage {{current}} von {{total}}",
    starsCollected: "Gesammelte Sterne: {{current}}/{{total}}",
    pointsEarned: "+{{points}} Weisheitspunkte",
    secondChance: "🔥 Deine MUT-Karte gibt dir eine zweite Chance! Versuche es erneut mit Weisheit.",
    bonusApplied: "🃏 {{card}}-Bonus: +{{percent}}% ({{base}} → {{final}})",
    defeatedQuote: "Ich vermag alles durch den, der mich stärkt",
    perfect: "🃏 Perfekt",
    good: "✅ Gut",
    start: "✅ Start",
    secretLevel: "🔓 GEHEIMES LEVEL FREIGESCHALTET!",
    secretChapter: "🎁 Geheimes Kapitel",
    returnToLevels: "Zurück",
    next: "Weiter",
    retry: "Erneut versuchen",
    menu: "Menü",
    chapter: "Kapitel",
    chapterStars: "Kapitel-Sterne",
    totalGlobal: "Gesamt global",
    backToMenu: "Zurück zum Menü"
  },

  chapters: {
    "1": "Genesis",
    "2": "Exodus",
    "3": "Jesus Christus",
    "4": "Kreuzigung/Auferstehung",
    "5": "Frühe Kirche",
    "6": "Paulus Missionen",
    "7": "Briefe/Offenbarung",
    "8": "Bonuslevel"
  },

  cards: {
    faith: "GLAUBE",
    courage: "MUT",
    wisdom: "WEISHEIT",
    faithKnowledge: "+50% Punkte",
    courageKnowledge: "Zweite Chance",
    wisdomKnowledge: "Hinweis + Bonus",
    faithDesc: "Maximum an Weisheitspunkten erhalten",
    courageDesc: "Normale Punkte aber zweite Chance",
    wisdomDesc: "Hinweis enthüllt und +25% Punkte",
    chooseCard: "🃏 Wähle eine Wissensgabe",
    cardEffects: "🃏 Effekte der Wissensgaben:",
    faithEffect: "+50% Weisheitspunkte - Maximale Belohnung",
    courageEffect: "Normale Punkte aber zweite Chance bei Fehler",
    wisdomEffect: "+25% Punkte + Hinweis für jede Frage enthüllt",
    chooseWisely: "Wöhle weise, denn deine Wahl wird dich durch das Level begleiten"
  },

  challenge: {
    loading: "Level wird geladen...",
    peace: "🕊️ Friede sei mit dir",
    questionsAwaiting: "📚 3 Wissensfragen erwarten dich",
    starsQuote: "Jeder Stern ist ein Schritt zum g├Âttlichen Licht"
  },

  info: {
    title: "Unity Quest Chroniken des Friedens",
    subtitle: "Interaktive Schriftentdeckung",
    yourStats: "Deine Statistiken",
    score: "Punktzahl",
    wisdom: "Weisheit",
    revelation: "Offenbarung",
    createdWith: "Entwickelt mit ❤️",
    creator: "Emmanuel Payet",
    developerPassionate: "Leidenschaftlicher spiritueller Entwickler",
    artistModule: "Emmanuel Künstler",
    artistPortfolio: "Portfolio für digitale Kunst und Kreation",
    features: "Funktionen",
    multipleChapters: "91 Level in 8 biblischen Kapiteln",
    powerCards: "3 einzigartige Machtkarten (Glaube, Mut, Weisheit)",
    progressionSystem: "Fortschritts- und spirituelles Rangsystem",
    bibleTreasures: "Bibelschätze und faszinierende Fakten",
    howToPlay: "Wie man spielt",
    selectLevel: "Wähle ein freigeschaltetes Level",
    choosePowerCard: "Wähle deine Machtkarte",
    answerQuestions: "Beantworte 3 Wissensfragen",
    earnStars: "Verdiene Sterne basierend auf verbleibenden Leben",
    tips: "Tipps",
    readCarefully: "Lies jede Frage sorgfältig",
    useWisdomCard: "Nutze die Weisheitskarte für Hinweise",
    courageGivesSecondChance: "Die Mutkarte gibt dir eine zweite Chance",
    faithMaximizes: "Die Glaubenskarte maximiert deine Punkte",
    johnGospelTitle: "Evangelium nach Johannes",
    johnGospelStats: "21 Kapitel • 878 Verse • 14 Sprachen",
    bibleReaderStrong: "Bibelleser + Strong",
    bibleReaderStrongDesc: "Vollständiges Lesen mit Strong-Wörterbuch",
    johnTreasures: "Johannes-Schätze",
    johnTreasuresDesc: "Biblische Schätze und interessante Fakten",
    quickAccessChapters: "Schnellzugriff auf berühmte Kapitel:",
    johnChapter1: "Prolog",
    johnChapter3: "Von neuem geboren",
    johnChapter14: "Ich bin der Weg",
    johnChapter20: "Auferstehung",
    version: "Version",
    madeWithLove: "Mit Liebe zur Ehre Gottes entwickelt",
    backToMenu: "Zurück zum Menü"
  },

  bible: {
    readerTitle: "📖 Bibelleser",
    johnReaderTitle: "Bibelleser - Johannes-Evangelium",
    john: "Johannes",
    loading: "Schriften werden geladen...",
    loadingChapter: "Kapitel {chapter} des Johannes-Evangeliums. Vollständige Daten werden geladen...",
    exploreWhileLoading: "In der Zwischenzeit können Sie andere Kapitel erkunden oder die Suchfunktion verwenden.",
    menu: "Menü",
    tabBible: "Bibel",
    tabUnity: "Einheit",
    strong: "Strong",
    strongReferences: "Strong-Referenzen",
    verses: "Verse",
    previous: "Zurück",
    next: "Weiter",
    strongDefinition: "Strong-Referenz",
    word: "Originalwort",
    transliteration: "Transliteration",
    pronunciation: "Aussprache",
    meaning: "Bedeutung",
    definition: "Vollstöndige Definition",
    usage: "Biblische Verwendung",
    etymology: "Etymologie",
    close: "Schlie├ƒen",
    moreReferences: "und {{count}} weitere Referenzen",
    copyright: "📖 Gemeinfrei • Strong",
    shareVerse: "Diesen Vers teilen",
    markAsRead: "Passage gelesen",
    alreadyRead: "Bereits gelesen",
    readingBonus: "Lesebonus",
    share: "Teilen",
    shareSelection: "Auswahl teilen",
    search: "Suchen...",
    definitionNotFound: "Definition nicht gefunden",
    definitionLoading: "Definition wird geladen...",
    imageFeatureComing: "🖼️ Bildfunktion kommt bald!",
    copyError: "Kopierfehler:",
    error: "❌ Fehler",
    errorLoading: "Fehler beim Laden",
    retry: "Wiederholen",
    readerInDevelopment: "Johannes-Bibelleser in Entwicklung...",
    verseCopied: "Vers in die Zwischenablage kopiert!",
    results: "Ergebnisse",
    result: "Ergebnis",
    copy: "Kopieren",
    image: "Bild"
  },

  bibleResources: {
    inAppReader: {
      name: "In der App lesen",
      description: "Integrierter Bibelleser mit Strong",
      features: {
        offline: "Offline",
        strong: "Strong-Nummern",
        navigation: "Navigation"
      }
    }
  },

  quotes: {
    wisdom: "Die Furcht des Herrn ist der Anfang der Weisheit",
    faith: "Ich vermag alles durch den, der mich stark macht",
    hope: "Der Herr ist mein Hirte, mir wird nichts mangeln",
    love: "Denn so sehr hat Gott die Welt geliebt...",
    perseverance: "Glaube erfordert Ausdauer",
    defeat: "Scheitern lödt ein, im Wissen zu wachsen"
  },

  unity: unityTranslations,

  philosophy: {
    title: "Philosophische Dimension",
    loveOntology: "Liebe als ontologisches Prinzip",
    loveDescription: "Jesus verwandelt die Liebe in ein metaphysisches Fundament: Gott und den Nöchsten zu lieben wird zur Struktur des authentischen Seins selbst. Die Liebe überschreitet die Moral, um zur Existenzweise zu werden.",
    newCommandment: "Das neue Gebot",
    jesusEmphasizes: "Wenn Jesus ein neues Gebot gibt, betont er das Verb lieben",
    loveGod: "Liebe Gott von ganzem Herzen",
    loveNeighbor: "Liebe deinen Nöchsten wie dich selbst",
    lovePriority: "Liebe wird zur Prioritöt"
  },

  footer: {
    version: "Version 1.0 • 2024",
    dedication: "Entwickelt zur Ehre Gottes"
  },

  endCredits: {
    lines: [
      { text: "Du hast den Gipfel des Berges erreicht", delay: 2000 },
      { text: "Du hast viele Dinge gelernt", delay: 2000 },
      { text: "Dein Glaube wöchst jeden Tag", delay: 2000 },
      { text: "Du erlebst sch├Âne Dinge mit Gott", delay: 2000 },
      { text: "Schwierigkeiten helfen dir zu wachsen", delay: 2000 },
      { text: "Sie zeigen, was wichtig ist", delay: 2000 },
      { text: "Sei demütig wie ein kleines Kind", delay: 2000 },
      { text: "Gott liebt dein einfaches Herz", delay: 2000 },
      { text: "In der Stille h├Ârst du Gott", delay: 2000 },
      { text: "Fasten befreit deinen Geist", delay: 2000 },
      { text: "Bete und Gott wird dich führen", delay: 2000 },
      { text: "Stolz verbirgt die Wahrheit", delay: 2000 },
      { text: "Gottes Gnade ist herrlich", delay: 2000 },
      { text: "Sie kommt aus Gottes Herzen", delay: 2000 },
      { text: "Wahrer Glaube macht dich frei", delay: 2000 },
      { text: "Er vereint dich für immer mit Gott", delay: 2000 },
      { text: "Liebe kann alles veröndern", delay: 2000 },
      { text: "Sie kann Wunder wirken", delay: 2000 },
      { text: "Wiederhole mit mir", delay: 2000 },
      { text: "Jesus, ich gebe dir mein Herz", delay: 3000 },
      { text: "Du bist mein K├Ânig, mein Retter", delay: 3000 },
      { text: "Komm, verwandle mein Leben", delay: 3000 },
      { text: "Der Weg geht jetzt weiter", delay: 2000 },
      { text: "Teile dieses sch├Âne Licht", delay: 2000 },
      { text: "Zum Leben, das niemals endet", delay: 2000 },
      { text: "Bewahre die Liebe in deinem Herzen", delay: 3000 },
      { text: "Wie einen kostbaren Schatz", delay: 3000 }
    ],
    finalMessages: {
      congratulations: "GLÜCKWUNSCH!",
      proud: "WIR SIND STOLZ AUF DICH",
      courage: "TAPFERER KRIEGER",
      peace: "FRIEDENSBRINGER",
      child: "KIND GOTTES",
      blessing: "GOTT SEGNE DICH",
      continue: "Weiter"
    }
  },

  mountain: {
    spiritualAscension: "Spiritueller Aufstieg",
    levelProgress: "Level {{level}} • {{stars}} Sterne erreicht",
    combo: "Combo",
    perfectMessage: "\"Denn meine Gedanken sind nicht eure Gedanken\" - Das Lamm steigt zur vollkommenen Weisheit empor",
    goodMessage: "\"Suchet, so werdet ihr finden\" - Der Aufstieg zur Wahrheit geht weiter",
    startMessage: "\"Der Glaube, auch klein wie ein Senfkorn\" - Erster Schritt zum Licht",
    skipAnimation: "Animation überspringen",
    chapter: "Kapitel",
    chapterProgress: "Kapitel {{current}}/{{total}}",
    secret: "Geheimnis",
    waypoints: {
      start: "Start",
      firstSlope: "Erster Hang",
      lastSlope: "Letzter Hang"
    },
    status: {
      defeat: "Niederlage",
      inProgress: "In Bearbeitung"
    }
  },

  validation: {
    pseudoTooShort: "Der Benutzername muss mindestens 2 Zeichen enthalten",
    enterPseudo: "Bitte geben Sie einen Benutzernamen ein"
  },

  pseudoSetup: {
    title: "Wöhle deinen Benutzernamen",
    confirm: "Namen bestötigen"
  },

  navigation: {
    back: "Zurück"
  },

  console: {
    starsUnlocked: "Sterne erreicht! Kapitel wird freigeschaltet",
    defeatAnimation: "Niederlage... J.C. steigt hinab"
  },

  errors: {
    progressionError: "Fortschrittsfehler",
    invalidProgressionData: "Ungültige Fortschrittsdaten:"
  },

  levels: {
    chaptersAndBonus: "8 Kapitel + Bonuslevel",
    bonusUnlocked: "🎁 BONUSLEVEL FREIGESCHALTET! Du hast spirituelle Perfektion erreicht!",
    starsToDiscover: "273 {stars} zu entdecken",
    starsPerLevel: "3 {stars} pro Level"
  },

  architecture: {
    title: "⚙️ Technische Architektur",
    react: {
      name: "React",
      description: "Moderne Oberflöche"
    },
    modules: {
      name: "Module",
      description: "Dynamisches Laden"
    },
    localStorage: {
      name: "LocalStorage",
      description: "Lokaler Speicher"
    },
    tailwind: {
      name: "Tailwind",
      description: "Responsives Design"
    }
  },

  gameManager: {
    title: "Spielstand speichern",
    saveLocal: "Lokales Speichern",
    saveCloud: "Cloud synchronisiert",
    saveWaiting: "Warte auf Verbindung",
    lastSave: "Letzter Speicherstand:",
    never: "Niemals",
    saving: "Speichern...",
    save: "Speichern",
    loadProgress: "Laden",
    loading: "Lödt...",
    autoSaveEnabled: "💾 Auto-Speichern aktiviert",
    saveError: "❌ Fehler beim Speichern",
    gameSaved: "✅ Spiel gespeichert!",
    gameLoaded: "✅ Spiel geladen!"
  }
};

export default uiTranslations;
