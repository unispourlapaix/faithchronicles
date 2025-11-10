// ============================================================================
// POLISH TRANSLATIONS - UI
// ============================================================================

import unityTranslations from './unity.js';
export const uiTranslations = {
  meta: {
    language: 'pl',
    languageName: 'Polski',
    version: '1.0'
  },
  
  app: {
    title: "UNITYQUEST Kroniki\nMiłości",
    subtitle: "Interaktywne odkrywanie Pism Świętych",
    tagline: "Wędrówka ku boskiemu światłu",
    menu: "Menu",
    retry: "Spróbuj ponownie"
  },
  
  buttons: {
    play: "GRAJ",
    back: "Wstecz",
    continue: "Kontynuuj",
    restart: "Zacznij od nowa",
    close: "Zamknij",
    nextLevel: "Następny poziom",
    selectLevel: "Wybór poziomów",
    retry: "Spróbuj ponownie",
    mainMenu: "Menu główne",
    start: "Rozpocznij",
    cancel: "Anuluj",
    confirm: "Potwierdź",
    save: "Zapisz",
    load: "Wczytaj",
    yesRestart: "Tak, zacznij od nowa",
    noContinue: "Nie, kontynuuj",
    tryAgain: "Spróbuj ponownie",
    backToMenu: "Powrót do menu"
  },
  
  labels: {
    score: "Wynik",
    stars: "Gwiazdy",
    wisdom: "Mądrość",
    revelation: "Objawienie",
    lives: "Życia",
    combo: "Combo",
    level: "POZIOM",
    easy: "ŁATWY",
    medium: "ŚREDNI",
    hard: "TRUDNY",
    correct: "Prawidłowo!",
    gameOver: "Próba nieudana",
    victory: "Zwycięstwo!",
    completed: "Ukończono",
    rank: "Ranga duchowa",
    points: "Punkty mądrości",
    unlockedLevels: "poziom(y) odblokowane",
    questionOfKnowledge: "Pytanie o wiedzę",
    hintOfWisdom: "Wskazówka mądrości",
    knowledgeMastered: "Wiedza opanowana!",
    knowledgeAcquired: "Wiedza zdobyta!",
    testFailed: "Próba nieudana",
    wisdomBonus: "Bonus",
    xpGained: "XP",
    newRank: "Nowa ranga"
  },
  
  menu: {
    playButton: "GRAJ",
    info: "Informacje",
    treasures: "Skarby",
    john: "Jan",
    reset: "Reset",
    restart: "🔄 Rozpocząć przygodę od nowa?",
    confirmReset: "Czy na pewno chcesz wymazać cały postęp?",
    youWillLose: "Stracisz:",
    wisdomPoints: "Punkty mądrości",
    starsCollected: "zebrane gwiazdy",
    levelsUnlocked: "poziom(y) odblokowane",
    spiritualRank: "Ranga duchowa",
    newAdventure: "🎮 Nowa przygoda",
    readyToStart: "Gotowy do startu?",
    startJourney: "Rozpocznij swoją podróż w poznawaniu Pism Świętych!",
    audioControls: "Sterowanie audio",
    mute: "Wycisz",
    unmute: "Włącz dźwięk",
    close: "Zamknij",
    language: "Język",
    restartGame: "Uruchom ponownie grę"
  },
  
  login: {
    title: "UNITY QUEST",
    subtitle: "Interaktywna przygoda biblijna",
    anonymousMode: "Graj anonimowo",
    anonymousDesc: "Wybierz pseudonim",
    emailMode: "Logowanie przez email",
    emailDesc: "Synchronizacja między urządzeniami",
    pseudo: "Pseudonim",
    pseudoPlaceholder: "Twój pseudonim...",
    email: "Adres email",
    emailPlaceholder: "twoj@email.com",
    startPlaying: "Zacznij grać",
    sendLink: "Wyślij link",
    sending: "Wysyłanie...",
    connecting: "Łączenie...",
    back: "Wstecz",
    localSave: "Twój postęp zostanie zapisany lokalnie",
    cloudSync: "Nie wymaga hasła • Synchronizacja w chmurze",
    magicLink: "Otrzymaj magiczny link emailem",
    checkEmail: "✉️ Sprawdź swoją skrzynkę! Link logowania został wysłany.",
    checkSpam: "Sprawdź także folder spam/niechciane",
    waitingConnection: "Oczekiwanie na połączenie...",
    errorSend: "Błąd wysyłania linku",
    rateLimited: "⏳ Poczekaj 15 sekund przed ponownym wysłaniem emaila",
    importSession: "🔄 Importuj sesję z produkcji",
    errorConnection: "Błąd połączenia",
    enterPseudo: "Proszę wprowadzić pseudonim",
    enterEmail: "Proszę wprowadzić prawidłowy adres email",
    // Tooltips
    never: "Nigdy",
    save: "Zapisz grę",
    lastSave: "ostatnie",
    refresh: "Przeładuj postęp",
    logout: "Wyloguj",
    connectToCloud: "Połącz aby zapisać online",
    editPseudo: "Edytuj nazwę użytkownika",
    confirm: "Potwierdź",
    cancel: "Anuluj",
    close: "Zamknij",
    passwordMode: "Proste Logowanie",
    passwordDesc: "Email + hasło",
    password: "Hasło",
    passwordPlaceholder: "Minimum 6 znaków",
    passwordMinLength: "Minimum 6 znaków",
    forgotPassword: "Nie pamiętasz hasła?",
    resetPasswordTitle: "Zresetuj Hasło",
    resetPasswordSubtitle: "Wprowadź swój email, aby otrzymać link resetujący",
    sendResetLink: "Wyślij Link",
    resetEmailSent: "📧 Email resetujący wysłany! Sprawdź swoją skrzynkę.",
    errorReset: "Błąd wysyłania emaila",
    backToSignin: "Powrót do logowania",
    forgotPassword: "Nie pamiętasz hasła?",
    signup: "Rejestracja",
    signin: "Zaloguj",
    createAccount: "Utwórz Konto",
    signupInfo: "Wypełnij formularz poniżej",
    passwordInfo: "Szybki dostęp z hasłem",
    signupButton: "Utwórz Moje Konto",
    signinButton: "Zaloguj",
    passwordTooShort: "Hasło musi zawierać co najmniej 6 znaków",
    emailAlreadyExists: "Ten email jest już używany",
    emailExistsHint: "✉️ Ten email jest już zarejestrowany. Spróbuj się zalogować! (Może został utworzony z innej gry?)",
    switchToSignin: "🔑 Przejdź do trybu logowania z istniejącym emailem",
    invalidCredentials: "Nieprawidłowy email lub hasło",
    signupSuccess: "📧 Konto utworzone! Sprawdź swoją pocztę, aby potwierdzić rejestrację.",
    emailConfirmationRequired: "Sprawdź swoją skrzynkę odbiorczą, aby aktywować konto",
    checkSpamFolder: "Pamiętaj, aby sprawdzić folder spam",
    connectionSuccess: "✅ Zalogowano pomyślnie!",
    errorSignup: "Błąd podczas rejestracji"},
  
  install: {
    title: "Zainstaluj aplikację",
    subtitle: "Szybki dostęp i offline",
    feature1: "Natychmiastowe uruchomienie z ekranu głównego",
    feature2: "Działa offline po instalacji",
    feature3: "Doświadczenie natywnej aplikacji",
    feature4: "Nie wymaga pobierania ze sklepu",
    install: "Zainstaluj",
    dismiss: "Później",
    info: "Możesz odinstalować aplikację w dowolnym momencie"
  },
  
  ranks: {
    seeker: "Poszukiwacz",
    believer: "Przebudzony",
    disciple: "Uczeń",
    servant: "Sługa",
    witness: "Świadek",
    guardian: "Strażnik",
    wise: "Mędrzec",
    prophet: "Prorok",
    apostle: "Apostoł",
    seekerDesc: "Początek duchowej podróży",
    believerDesc: "Przebudzona świadomość duchowa",
    discipleDesc: "Nauka nauk",
    servantDesc: "Służba i oddanie",
    witnessDesc: "Dzielenie się wiarą",
    guardianDesc: "Ochrona prawdy",
    wiseDesc: "Mądrość i wiedza",
    prophetDesc: "Duchowa wizja",
    apostleDesc: "Duchowy mistrz"
  },

  spiritualJourney: {
    beginning: "Początek duchowej podróży",
    progress: "Postęp duchowy",
    grade: "Stopień",
    xp: "XP",
    level: "Poziom",
    nextGrade: "Następny stopień",
    still: "Jeszcze",
    maxLevelReached: "Osiągnięto Maksymalny Poziom!",
    masteredAllTeachings: "Opanowałeś wszystkie nauki",
    progression: "Postęp"
  },
  
  treasures: {
    title: "💎 Skarby Biblii",
    verse: "Werset dnia",
    fact: "Czy wiesz?",
    treasure: "Ukryty skarb",
    question: "Zabawne pytanie",
    context: "Kontekst",
    strongReference: "Odniesienie biblijne do pogłębionej nauki",
    emmanuelMemo: "Notatka Emmanuela",
    emmanuelMessage: "Dotarłeś na szczyt góry i wiedza została zdobyta. Ale niezachwiana wiara wymaga życiowego doświadczenia, miłosierdzia i prawdziwej miłości Jezusa. Różne próby życiowe będą testować twoją drogę, prawdziwą ścieżkę którą wybieramy, nasze serce. Pozostajemy niedoskonali, nasze pragnienia są liczne, a miłość do zysku lub osobistego komfortu zbyt często staje się naszym egoistycznym priorytetem. Proś Boga o mądrość, Jego miłość, Jego siłę, i pokornie uznawaj swoje słabości, bo nie możesz przed Nim niczego ukryć... Nic. Nie ma sensu podróżować w trybie prywatnym, przez VPN, czy nawet usuwać historię. Pość jak Daniel: pozbądź się na chwilę tego, co kochasz najbardziej, w ciszy i mądrości. To pozwoli ci lepiej słyszeć Boga, mieć dyspozycję serca gotową na głębokie — i często bolesne — przemiany. Wtedy sny i wizje staną się jaśniejsze, jak dla Józefa. Ale strzeż się pychy: nie ulegaj \"zawsze mam rację\" lub \"wiem lepiej\". Bo objawienie Boga jest nadzwyczajną łaską. Nie stań się doktorem Prawa, zdolnym do ukrzyżowania Jezusa ponownie dzisiaj, Jego który po prostu prosi o miłowanie bliźniego... i przyznanie mu tej samej wolności, którą sam otrzymujesz. Mieć wiarę to wejść w relację i swobodną wędrówkę serca. Uczyni cię to potężnymi bohaterami, zdolnymi do niemożliwego. Bo doświadczenie nadprzyrodzonego, obecność Boga, Jego potwierdzenie lub błogosławieństwo uczyni cię naprawdę niezachwianym.",
    clarification: "Ważne wyjaśnienie",
    bibleOffline: "Czytaj Biblię offline",
    bibleStudy: "Studium biblijne",
    version: "Wersja",
    openReader: "Otwórz czytnik",
    features: "Funkcje"
  },
  
  messages: {
    chooseCard: "⚡ Wybierz swoją kartę mocy",
    cardHelp: "Będzie ci towarzyszyć przez 3 pytania tego poziomu",
    chooseAnswer: "📖 Wybierz odpowiedź:",
    wrongAnswer: "❌ Zła odpowiedź! Pozostało ci {lives} życie/życia. Spróbuj ponownie!",
    levelCompleted: "Poziom {level} ukończony",
    questionsProgress: "Pytanie {current} z {total}",
    starsCollected: "Zebrane gwiazdy: {current}/{total}",
    pointsEarned: "+{points} punktów mądrości",
    secondChance: "⚔️ Twoja karta ODWAGA daje ci drugą szansę! Spróbuj ponownie z mądrością.",
    bonusApplied: "✨ Bonus {card}: +{percent}% ({base} → {final})",
    defeatedQuote: "Wszystko mogę w Tym, który mnie umacnia",
    perfect: "✨ Perfekcyjnie",
    good: "⭐ Dobrze",
    start: "⭐ Start",
    secretLevel: "🎺 SEKRETNY POZIOM ODBLOKOWANY!",
    secretChapter: "🏆 Sekretny rozdział",
    returnToLevels: "Powrót",
    next: "Dalej",
    retry: "Spróbuj ponownie",
    menu: "Menu",
    chapter: "Rozdział",
    chapterStars: "Gwiazdy rozdziału",
    totalGlobal: "Suma globalna",
    backToMenu: "Powrót do menu"
  },
  
  chapters: {
    "1": "Geneza",
    "2": "Exodus",
    "3": "Jezus Chrystus",
    "4": "Ukrzyżowanie/Zmartwychwstanie",
    "5": "Wczesny Kościół",
    "6": "Misje Pawła",
    "7": "Listy/Apokalipsa",
    "8": "Poziom bonusowy"
  },
  
  cards: {
    faith: "WIARA",
    courage: "ODWAGA",
    wisdom: "MĄDROŚĆ",
    faithKnowledge: "+50% punktów",
    courageKnowledge: "Druga szansa",
    wisdomKnowledge: "Wskazówka + bonus",
    faithDesc: "Maksymalna liczba punktów mądrości",
    courageDesc: "Normalne punkty ale druga szansa",
    wisdomDesc: "Wskazówka ujawniona i +25% punktów",
    chooseCard: "✨ Wybierz dar wiedzy",
    cardEffects: "✨ Efekty darów wiedzy:",
    faithEffect: "+50% punktów mądrości - Maksymalna nagroda",
    courageEffect: "Normalne punkty ale druga szansa przy błędzie",
    wisdomEffect: "+25% punktów + wskazówka ujawniona dla każdego pytania",
    chooseWisely: "Wybieraj mądrze, bo twój wybór będzie ci towarzyszył przez cały poziom"
  },
  
  challenge: {
    loading: "Ładowanie poziomu...",
    peace: "🕊️ Niech pokój spocznie w twoim domu",
    questionsAwaiting: "💡 3 pytania o wiedzę na ciebie czekają",
    starsQuote: "Każda gwiazda to krok ku boskiemu światłu"
  },
  
  info: {
    title: "Unity Quest Kroniki Pokoju",
    subtitle: "Interaktywne odkrywanie Pism Świętych",
    yourStats: "Twoje statystyki",
    score: "Wynik",
    wisdom: "Mądrość",
    revelation: "Objawienie",
    createdWith: "Stworzone z ❤️",
    creator: "Emmanuel Payet",
    developerPassionate: "Programista pasjonujący się duchowością",
    artistModule: "Emmanuel Artysta",
    artistPortfolio: "Portfolio artystyczne i twórczość cyfrowa",
    features: "Funkcje",
    multipleChapters: "91 poziomów w 8 rozdziałach biblijnych",
    powerCards: "3 unikalne karty mocy (Wiara, Odwaga, Mądrość)",
    progressionSystem: "System postępu z rangami duchowymi",
    bibleTreasures: "Skarby biblijne i ciekawe fakty",
    howToPlay: "Jak grać",
    selectLevel: "Wybierz odblokowany poziom",
    choosePowerCard: "Wybierz swoją kartę mocy",
    answerQuestions: "Odpowiedz na 3 pytania o wiedzę",
    earnStars: "Zdobywaj gwiazdy według pozostałych żyć",
    tips: "Wskazówki",
    readCarefully: "Czytaj uważnie każde pytanie",
    useWisdomCard: "Używaj karty Mądrość dla wskazówek",
    courageGivesSecondChance: "Karta Odwaga daje drugą szansę",
    faithMaximizes: "Karta Wiara maksymalizuje punkty",
    johnGospelTitle: "Ewangelia Jana",
    johnGospelStats: "21 rozdziałów • 878 wersetów • 14 języków",
    bibleReaderStrong: "Czytnik Biblii + Strong",
    bibleReaderStrongDesc: "Pełne czytanie ze słownikiem Strong",
    johnTreasures: "Skarby Jana",
    johnTreasuresDesc: "Biblijne skarby i ciekawe fakty",
    quickAccessChapters: "Szybki dostęp do słynnych rozdziałów:",
    johnChapter1: "Prolog",
    johnChapter3: "Narodzić się na nowo",
    johnChapter14: "Ja jestem drogą",
    johnChapter20: "Zmartwychwstanie",
    version: "Wersja",
    madeWithLove: "Stworzone z miłością dla chwały Bożej",
    backToMenu: "Powrót do menu"
  },
  
  bible: {
    readerTitle: "📖 Czytnik Biblii",
    johnReaderTitle: "Czytnik Biblii - Ewangelia Jana",
    john: "Jan",
    loading: "Ładowanie Pism Świętych...",
    loadingChapter: "Rozdział {chapter} Ewangelii Jana. Pełne dane są ładowane...",
    exploreWhileLoading: "W międzyczasie możesz przeglądać inne rozdziały lub użyć funkcji wyszukiwania.",
    menu: "Menu",
    tabBible: "Biblia",
    tabUnity: "Jedność",
    strong: "Strong",
    strongReferences: "Referencje Strong",
    verses: "wersety",
    previous: "Poprzedni",
    next: "Następny",
    strongDefinition: "Referencja Strong",
    word: "Oryginalne słowo",
    transliteration: "Transliteracja",
    pronunciation: "Wymowa",
    meaning: "Znaczenie",
    definition: "Pełna definicja",
    usage: "Użycie biblijne",
    etymology: "Etymologia",
    close: "Zamknij",
    moreReferences: "i {{count}} innych referencji",
    copyright: "📖 Louis Segond 1910 - Domena publiczna • Numery Strong dołączone",
    shareVerse: "Udostępnij ten werset",
    markAsRead: "Fragment przeczytany",
    alreadyRead: "Już przeczytane",
    readingBonus: "Bonus za czytanie",
    results: "wyników",
    result: "wynik",
    copy: "Kopiuj",
    image: "Obraz"
  },
  
  mountain: {
    spiritualAscension: "Duchowa asceza",
    levelProgress: "Poziom {{level}} • {{stars}} zdobytych gwiazd",
    combo: "Combo",
    perfectMessage: '"Bo myśli moje nie są myślami waszymi" - Baranek wspina się ku doskonałej mądrości',
    goodMessage: '"Szukajcie, a znajdziecie" - Wspinaczka ku prawdzie trwa',
    startMessage: '"Wiara, choćby jak ziarnko gorczycy" - Pierwszy krok ku światłu',
    skipAnimation: "Pomiń animację",
    chapter: "Rozdział",
    chapterProgress: "Rozdział {{current}}/{{total}}",
    secret: "Sekret",
    waypoints: {
      start: "Start",
      firstSlope: "Pierwszy stok",
      lastSlope: "Ostatni stok"
    },
    status: {
      defeat: "Porażka",
      inProgress: "W toku"
    }
  },
  
  bibleResources: {
    inAppReader: {
      name: "Czytaj w aplikacji",
      description: "Czytnik Biblii zintegrowany ze Strong",
      features: {
        offline: "Offline",
        strong: "Numery Strong",
        navigation: "Nawigacja"
      }
    }
  },
  
  quotes: {
    wisdom: "Prawdziwa wiedza prowadzi do wiecznej mądrości",
    faith: "Wszystko mogę w Tym, który mnie umacnia",
    hope: "Pan jest moim pasterzem, nie braknie mi niczego",
    love: "Tak bowiem Bóg umiłował świat...",
    perseverance: "Wiara wymaga wytrwałości",
    defeat: "Porażka zachęca do wzrostu w wiedzy"
  },

  unity: unityTranslations,

  philosophy: {
    title: "Wymiar filozoficzny",
    loveOntology: "Miłość jako zasada ontologiczna",
    loveDescription: "Jezus przekształca miłość w fundament metafizyczny: miłowanie Boga i bliźniego staje się samą strukturą autentycznego bytu. Miłość wykracza poza moralność, stając się sposobem istnienia.",
    newCommandment: "Nowe przykazanie",
    jesusEmphasizes: "Gdy Jezus daje nowe przykazanie, podkreśla czasownik miłować",
    loveGod: "Miłuj Boga z całego serca",
    loveNeighbor: "Miłuj bliźniego jak siebie samego",
    lovePriority: "Miłość staje się priorytetem"
  },

  footer: {
    version: "Wersja 1.0 • 2024",
    dedication: "Stworzone dla chwały Bożej"
  },

  endCredits: {
    lines: [
      { text: "Dotarłeś na szczyt góry", delay: 2000 },
      { text: "Nauczyłeś się wielu rzeczy", delay: 2000 },
      { text: "Twoja wiara rośnie każdego dnia", delay: 2000 },
      { text: "Przeżywasz piękne chwile z Bogiem", delay: 2000 },
      { text: "Trudności pomagają ci rosnąć", delay: 2000 },
      { text: "Pokazują co jest ważne", delay: 2000 },
      { text: "Bądź pokorny jak małe dziecko", delay: 2000 },
      { text: "Bóg kocha twoje proste serce", delay: 2000 },
      { text: "W ciszy słyszysz Boga", delay: 2000 },
      { text: "Post wyzwala twojego ducha", delay: 2000 },
      { text: "Módl się, a Bóg cię poprowadzi", delay: 2000 },
      { text: "Pycha ukrywa prawdę", delay: 2000 },
      { text: "Łaska Boża jest wspaniała", delay: 2000 },
      { text: "Pochodzi z serca Boga", delay: 2000 },
      { text: "Prawdziwa wiara czyni cię wolnym", delay: 2000 },
      { text: "Jednoczy cię z Bogiem na zawsze", delay: 2000 },
      { text: "Miłość może wszystko zmienić", delay: 2000 },
      { text: "Może czynić cuda", delay: 2000 },
      { text: "Powtórz ze mną", delay: 2000 },
      { text: "Jezu, daję Ci moje serce", delay: 3000 },
      { text: "Jesteś moim królem, moim zbawicielem", delay: 3000 },
      { text: "Przyjdź i przemień moje życie", delay: 3000 },
      { text: "Droga trwa dalej teraz", delay: 2000 },
      { text: "Dziel się tym pięknym światłem", delay: 2000 },
      { text: "Ku życiu, które nigdy się nie kończy", delay: 2000 },
      { text: "Zachowaj miłość w swoim sercu", delay: 3000 },
      { text: "Jak cenny skarb", delay: 3000 }
    ],
    finalMessages: {
      congratulations: "GRATULACJE!",
      proud: "JESTEŚMY Z CIEBIE DUMNI",
      courage: "ODWAŻNY WOJOWNIKU",
      peace: "NIOSĄCY POKÓJ",
      child: "DZIECKO BOŻE",
      blessing: "NIECH BÓG CIĘ BŁOGOSŁAWI",
      continue: "Kontynuuj"
    }
  },

  validation: {
    pseudoTooShort: "Pseudonim musi zawierać co najmniej 2 znaki",
    enterPseudo: "Proszę wprowadzić pseudonim"
  },

  pseudoSetup: {
    title: "Wybierz swój pseudonim gracza",
    confirm: "Potwierdź pseudonim"
  },

  navigation: {
    back: "Wstecz"
  },

  console: {
    starsUnlocked: "gwiazd osiągniętych! Odblokowanie rozdziału",
    defeatAnimation: "Porażka... J.C. schodzi w dół"
  },

  errors: {
    progressionError: "Błąd postępu",
    invalidProgressionData: "Nieprawidłowe dane postępu:"
  },

  levels: {
    chaptersAndBonus: "8 rozdziałów + poziom bonusowy",
    bonusUnlocked: "🏆 POZIOM BONUSOWY ODBLOKOWANY! Osiągnąłeś duchową doskonałość!",
    starsToDiscover: "273 {stars} do odkrycia",
    starsPerLevel: "3 {stars} na poziom"
  },

  architecture: {
    title: "🔧 Architektura techniczna",
    react: {
      name: "React",
      description: "Nowoczesny interfejs"
    },
    modules: {
      name: "Moduły",
      description: "Dynamiczne ładowanie"
    },
    localStorage: {
      name: "LocalStorage",
      description: "Lokalne zapisywanie"
    },
    tailwind: {
      name: "Tailwind",
      description: "Responsywny design"
    }
  },

  gameManager: {
    title: "Zapis gry",
    saveLocal: "Zapis lokalny",
    saveCloud: "Synchronizacja w chmurze",
    saveWaiting: "Oczekiwanie na połączenie",
    lastSave: "Ostatni zapis:",
    never: "Nigdy",
    saving: "Zapisywanie...",
    save: "Zapisz",
    loadProgress: "Wczytaj",
    loading: "Ładowanie...",
    autoSaveEnabled: "💾 Automatyczny zapis włączony",
    saveError: "❌ Błąd zapisu",
    gameSaved: "✅ Gra zapisana!",
    gameLoaded: "📥 Gra wczytana!"
  }
};

export default uiTranslations;
