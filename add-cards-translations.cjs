const fs = require('fs');
const path = require('path');

// Traductions de la section cards pour chaque langue
const cardsTranslations = {
  ar: {
    faith: "الإيمان",
    courage: "الشجاعة",
    wisdom: "الحكمة",
    faithKnowledge: "+50% نقاط",
    courageKnowledge: "فرصة ثانية",
    wisdomKnowledge: "تلميح + مكافأة",
    faithDesc: "الحد الأقصى من نقاط الحكمة المكتسبة",
    courageDesc: "نقاط عادية ولكن فرصة ثانية",
    wisdomDesc: "تلميح مكشوف و +25% نقاط",
    chooseCard: "✨ اختر بطاقة المعرفة",
    cardEffects: "✨ تأثيرات بطاقات المعرفة:",
    faithEffect: "+50% نقاط حكمة - أقصى مكافأة",
    courageEffect: "نقاط عادية ولكن فرصة ثانية عند الخطأ",
    wisdomEffect: "+25% نقاط + تلميح مكشوف لكل سؤال",
    chooseWisely: "اختر بحكمة، لأن اختيارك سيرافقك طوال المستوى"
  },
  de: {
    faith: "GLAUBE",
    courage: "MUT",
    wisdom: "WEISHEIT",
    faithKnowledge: "+50% Punkte",
    courageKnowledge: "Zweite Chance",
    wisdomKnowledge: "Hinweis + Bonus",
    faithDesc: "Maximum an Weisheitspunkten erhalten",
    courageDesc: "Normale Punkte aber zweite Chance",
    wisdomDesc: "Hinweis enthüllt und +25% Punkte",
    chooseCard: "✨ Wähle deine Wissenskarte",
    cardEffects: "✨ Effekte der Wissenskarten:",
    faithEffect: "+50% Weisheitspunkte - Maximale Belohnung",
    courageEffect: "Normale Punkte aber zweite Chance bei Fehler",
    wisdomEffect: "+25% Punkte + Hinweis für jede Frage enthüllt",
    chooseWisely: "Wähle weise, denn deine Wahl wird dich durch das Level begleiten"
  },
  es: {
    faith: "FE",
    courage: "CORAJE",
    wisdom: "SABIDURÍA",
    faithKnowledge: "+50% puntos",
    courageKnowledge: "Segunda oportunidad",
    wisdomKnowledge: "Pista + bonificación",
    faithDesc: "Máximo de puntos de sabiduría obtenidos",
    courageDesc: "Puntos normales pero segunda oportunidad",
    wisdomDesc: "Pista revelada y +25% puntos",
    chooseCard: "✨ Elige tu carta de conocimiento",
    cardEffects: "✨ Efectos de las cartas de conocimiento:",
    faithEffect: "+50% puntos de sabiduría - Recompensa máxima",
    courageEffect: "Puntos normales pero segunda oportunidad en error",
    wisdomEffect: "+25% puntos + pista revelada para cada pregunta",
    chooseWisely: "Elige con sabiduría, porque tu elección te acompañará durante todo el nivel"
  },
  he: {
    faith: "אמונה",
    courage: "אומץ",
    wisdom: "חוכמה",
    faithKnowledge: "+50% נקודות",
    courageKnowledge: "הזדמנות שנייה",
    wisdomKnowledge: "רמז + בונוס",
    faithDesc: "מקסימום נקודות חוכמה שהושגו",
    courageDesc: "נקודות רגילות אבל הזדמנות שנייה",
    wisdomDesc: "רמז נחשף ו-25% נקודות+",
    chooseCard: "✨ בחר את כרטיס הידע שלך",
    cardEffects: "✨ השפעות כרטיסי הידע:",
    faithEffect: "+50% נקודות חוכמה - תגמול מקסימלי",
    courageEffect: "נקודות רגילות אבל הזדמנות שנייה בטעות",
    wisdomEffect: "+25% נקודות + רמז נחשף לכל שאלה",
    chooseWisely: "בחר בחוכמה, כי בחירתך תלווה אותך לאורך כל השלב"
  },
  hi: {
    faith: "विश्वास",
    courage: "साहस",
    wisdom: "ज्ञान",
    faithKnowledge: "+50% अंक",
    courageKnowledge: "दूसरा मौका",
    wisdomKnowledge: "संकेत + बोनस",
    faithDesc: "प्राप्त ज्ञान अंकों की अधिकतम संख्या",
    courageDesc: "सामान्य अंक लेकिन दूसरा मौका",
    wisdomDesc: "संकेत प्रकट और +25% अंक",
    chooseCard: "✨ अपना ज्ञान कार्ड चुनें",
    cardEffects: "✨ ज्ञान कार्ड के प्रभाव:",
    faithEffect: "+50% ज्ञान अंक - अधिकतम पुरस्कार",
    courageEffect: "सामान्य अंक लेकिन त्रुटि पर दूसरा मौका",
    wisdomEffect: "+25% अंक + प्रत्येक प्रश्न के लिए संकेत प्रकट",
    chooseWisely: "बुद्धिमानी से चुनें, क्योंकि आपकी पसंद पूरे स्तर में आपके साथ रहेगी"
  },
  it: {
    faith: "FEDE",
    courage: "CORAGGIO",
    wisdom: "SAGGEZZA",
    faithKnowledge: "+50% punti",
    courageKnowledge: "Seconda possibilità",
    wisdomKnowledge: "Suggerimento + bonus",
    faithDesc: "Massimo di punti saggezza ottenuti",
    courageDesc: "Punti normali ma seconda possibilità",
    wisdomDesc: "Suggerimento rivelato e +25% punti",
    chooseCard: "✨ Scegli la tua carta della conoscenza",
    cardEffects: "✨ Effetti delle carte della conoscenza:",
    faithEffect: "+50% punti saggezza - Ricompensa massima",
    courageEffect: "Punti normali ma seconda possibilità in caso di errore",
    wisdomEffect: "+25% punti + suggerimento rivelato per ogni domanda",
    chooseWisely: "Scegli con saggezza, perché la tua scelta ti accompagnerà per tutto il livello"
  },
  jp: {
    faith: "信仰",
    courage: "勇気",
    wisdom: "知恵",
    faithKnowledge: "+50% ポイント",
    courageKnowledge: "セカンドチャンス",
    wisdomKnowledge: "ヒント + ボーナス",
    faithDesc: "獲得した知恵ポイントの最大値",
    courageDesc: "通常ポイントだがセカンドチャンス",
    wisdomDesc: "ヒント公開 + 25% ポイント",
    chooseCard: "✨ あなたの知識カードを選択",
    cardEffects: "✨ 知識カードの効果:",
    faithEffect: "+50% 知恵ポイント - 最大報酬",
    courageEffect: "通常ポイントだが間違えた時セカンドチャンス",
    wisdomEffect: "+25% ポイント + 各質問のヒント公開",
    chooseWisely: "賢く選択してください、あなたの選択がレベル全体に同行します"
  },
  ko: {
    faith: "믿음",
    courage: "용기",
    wisdom: "지혜",
    faithKnowledge: "+50% 포인트",
    courageKnowledge: "두 번째 기회",
    wisdomKnowledge: "힌트 + 보너스",
    faithDesc: "획득한 최대 지혜 포인트",
    courageDesc: "일반 포인트지만 두 번째 기회",
    wisdomDesc: "힌트 공개 및 +25% 포인트",
    chooseCard: "✨ 지식 카드를 선택하세요",
    cardEffects: "✨ 지식 카드의 효과:",
    faithEffect: "+50% 지혜 포인트 - 최대 보상",
    courageEffect: "일반 포인트지만 오류 시 두 번째 기회",
    wisdomEffect: "+25% 포인트 + 각 질문마다 힌트 공개",
    chooseWisely: "현명하게 선택하세요, 당신의 선택이 레벨 전체에 동행합니다"
  },
  pt: {
    faith: "FÉ",
    courage: "CORAGEM",
    wisdom: "SABEDORIA",
    faithKnowledge: "+50% pontos",
    courageKnowledge: "Segunda chance",
    wisdomKnowledge: "Dica + bônus",
    faithDesc: "Máximo de pontos de sabedoria obtidos",
    courageDesc: "Pontos normais mas segunda chance",
    wisdomDesc: "Dica revelada e +25% pontos",
    chooseCard: "✨ Escolha sua carta de conhecimento",
    cardEffects: "✨ Efeitos das cartas de conhecimento:",
    faithEffect: "+50% pontos de sabedoria - Recompensa máxima",
    courageEffect: "Pontos normais mas segunda chance em erro",
    wisdomEffect: "+25% pontos + dica revelada para cada pergunta",
    chooseWisely: "Escolha com sabedoria, pois sua escolha te acompanhará por todo o nível"
  },
  rc: {
    faith: "KONDIMA",
    courage: "MPIKO",
    wisdom: "BWANYA",
    faithKnowledge: "+50% ba points",
    courageKnowledge: "Libaku ya mibale",
    wisdomKnowledge: "Ndimbola + bonus",
    faithDesc: "Maximum ya ba points ya bwanya oyo ozwi",
    courageDesc: "Ba points ya normale kasi libaku ya mibale",
    wisdomDesc: "Ndimbola emonisami mpe +25% ba points",
    chooseCard: "✨ Pona karte na yo ya boyebi",
    cardEffects: "✨ Bopusi ya ba cartes ya boyebi:",
    faithEffect: "+50% ba points ya bwanya - Lifuti ya maximum",
    courageEffect: "Ba points ya normale kasi libaku ya mibale na libunga",
    wisdomEffect: "+25% ba points + ndimbola emonisami pona motuna nyonso",
    chooseWisely: "Pona na bwanya, pamba te kopona na yo ekosalisa yo na niveau mobimba"
  },
  ru: {
    faith: "ВЕРА",
    courage: "МУЖЕСТВО",
    wisdom: "МУДРОСТЬ",
    faithKnowledge: "+50% очков",
    courageKnowledge: "Второй шанс",
    wisdomKnowledge: "Подсказка + бонус",
    faithDesc: "Максимум полученных очков мудрости",
    courageDesc: "Обычные очки, но второй шанс",
    wisdomDesc: "Раскрытая подсказка и +25% очков",
    chooseCard: "✨ Выберите свою карту знаний",
    cardEffects: "✨ Эффекты карт знаний:",
    faithEffect: "+50% очков мудрости - Максимальная награда",
    courageEffect: "Обычные очки, но второй шанс при ошибке",
    wisdomEffect: "+25% очков + раскрытая подсказка для каждого вопроса",
    chooseWisely: "Выбирайте мудро, ваш выбор будет сопровождать вас на протяжении всего уровня"
  },
  sw: {
    faith: "IMANI",
    courage: "UJASIRI",
    wisdom: "HEKIMA",
    faithKnowledge: "+50% pointi",
    courageKnowledge: "Nafasi ya pili",
    wisdomKnowledge: "Kidokezo + bonus",
    faithDesc: "Upeo wa pointi za hekima zilizopatikana",
    courageDesc: "Pointi za kawaida lakini nafasi ya pili",
    wisdomDesc: "Kidokezo kilichofunuliwa na +25% pointi",
    chooseCard: "✨ Chagua kadi yako ya maarifa",
    cardEffects: "✨ Athari za kadi za maarifa:",
    faithEffect: "+50% pointi za hekima - Tuzo ya juu",
    courageEffect: "Pointi za kawaida lakini nafasi ya pili wakati wa kosa",
    wisdomEffect: "+25% pointi + kidokezo kilichofunuliwa kwa kila swali",
    chooseWisely: "Chagua kwa hekima, kwa sababu chaguo lako litakufuata katika ngazi yote"
  },
  uk: {
    faith: "ВІРА",
    courage: "МУЖНІСТЬ",
    wisdom: "МУДРІСТЬ",
    faithKnowledge: "+50% балів",
    courageKnowledge: "Другий шанс",
    wisdomKnowledge: "Підказка + бонус",
    faithDesc: "Максимум отриманих балів мудрості",
    courageDesc: "Звичайні бали, але другий шанс",
    wisdomDesc: "Розкрита підказка і +25% балів",
    chooseCard: "✨ Виберіть свою карту знань",
    cardEffects: "✨ Ефекти карт знань:",
    faithEffect: "+50% балів мудрості - Максимальна нагорода",
    courageEffect: "Звичайні бали, але другий шанс при помилці",
    wisdomEffect: "+25% балів + розкрита підказка для кожного питання",
    chooseWisely: "Вибирайте мудро, ваш вибір супроводжуватиме вас протягом усього рівня"
  },
  zh: {
    faith: "信仰",
    courage: "勇气",
    wisdom: "智慧",
    faithKnowledge: "+50% 分数",
    courageKnowledge: "第二次机会",
    wisdomKnowledge: "提示 + 奖励",
    faithDesc: "获得的最大智慧分数",
    courageDesc: "正常分数但有第二次机会",
    wisdomDesc: "揭示的提示和 +25% 分数",
    chooseCard: "✨ 选择您的知识卡",
    cardEffects: "✨ 知识卡的效果：",
    faithEffect: "+50% 智慧分数 - 最大奖励",
    courageEffect: "正常分数但错误时有第二次机会",
    wisdomEffect: "+25% 分数 + 每个问题都揭示提示",
    chooseWisely: "明智地选择，因为您的选择将伴随您整个关卡"
  }
};

const translationsDir = 'src/data/translations';

// Fonction pour ajouter la section cards à un fichier
function addCardsSection(lang, translations) {
  const filePath = path.join(translationsDir, lang, 'ui.js');

  if (!fs.existsSync(filePath)) {
    console.log(`❌ ${lang}: Fichier non trouvé`);
    return false;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Vérifier si la section cards existe déjà
  if (content.includes('cards:')) {
    console.log(`⏭️  ${lang}: Section cards déjà présente`);
    return false;
  }

  // Créer la section cards
  const cardsSection = `
  cards: {
    faith: "${translations.faith}",
    courage: "${translations.courage}",
    wisdom: "${translations.wisdom}",
    faithKnowledge: "${translations.faithKnowledge}",
    courageKnowledge: "${translations.courageKnowledge}",
    wisdomKnowledge: "${translations.wisdomKnowledge}",
    faithDesc: "${translations.faithDesc}",
    courageDesc: "${translations.courageDesc}",
    wisdomDesc: "${translations.wisdomDesc}",
    chooseCard: "${translations.chooseCard}",
    cardEffects: "${translations.cardEffects}",
    faithEffect: "${translations.faithEffect}",
    courageEffect: "${translations.courageEffect}",
    wisdomEffect: "${translations.wisdomEffect}",
    chooseWisely: "${translations.chooseWisely}"
  },
`;

  // Trouver où insérer (avant la section challenge ou chapters)
  const insertPatterns = [
    /(\n  challenge: \{)/,
    /(\n  chapters: \{)/,
    /(\n  info: \{)/,
    /(\n  bible: \{)/
  ];

  let inserted = false;
  for (const pattern of insertPatterns) {
    if (pattern.test(content)) {
      content = content.replace(pattern, `${cardsSection}$1`);
      inserted = true;
      break;
    }
  }

  if (!inserted) {
    console.log(`⚠️  ${lang}: Point d'insertion non trouvé`);
    return false;
  }

  // Sauvegarder
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ ${lang}: Section cards ajoutée`);
  return true;
}

// Traiter toutes les langues
console.log('╔════════════════════════════════════════════════════════════════════════════╗');
console.log('║ AJOUT DE LA SECTION CARDS AUX TRADUCTIONS UI');
console.log('╚════════════════════════════════════════════════════════════════════════════╝\n');

let successCount = 0;
let totalCount = 0;

for (const [lang, translations] of Object.entries(cardsTranslations)) {
  totalCount++;
  if (addCardsSection(lang, translations)) {
    successCount++;
  }
}

console.log('\n═══════════════════════════════════════════════════════════════════════════');
console.log(`Résultat: ${successCount}/${totalCount} langues mises à jour`);
console.log('═══════════════════════════════════════════════════════════════════════════\n');
