const fs = require('fs');
const path = require('path');

// Traductions pour "Objectif Commun" et le message de paix dans toutes les langues
const translations = {
  es: {
    commonGoal: "Objetivo Común",
    seekingPeace: "Todas las religiones comparten un objetivo común: buscar la paz, promover el amor y construir un mundo mejor. Más allá de nuestras diferencias, todos estamos unidos en esta búsqueda de sabiduría y armonía."
  },
  de: {
    commonGoal: "Gemeinsames Ziel",
    seekingPeace: "Alle Religionen teilen ein gemeinsames Ziel: Frieden suchen, Liebe fördern und eine bessere Welt aufbauen. Jenseits unserer Unterschiede sind wir alle in dieser Suche nach Weisheit und Harmonie vereint."
  },
  it: {
    commonGoal: "Obiettivo Comune",
    seekingPeace: "Tutte le religioni condividono un obiettivo comune: cercare la pace, promuovere l'amore e costruire un mondo migliore. Al di là delle nostre differenze, siamo tutti uniti in questa ricerca di saggezza e armonia."
  },
  pt: {
    commonGoal: "Objetivo Comum",
    seekingPeace: "Todas as religiões compartilham um objetivo comum: buscar a paz, promover o amor e construir um mundo melhor. Além de nossas diferenças, todos estamos unidos nesta busca por sabedoria e harmonia."
  },
  ru: {
    commonGoal: "Общая Цель",
    seekingPeace: "Все религии разделяют общую цель: искать мир, продвигать любовь и строить лучший мир. За пределами наших различий мы все объединены в этом поиске мудрости и гармонии."
  },
  uk: {
    commonGoal: "Спільна Мета",
    seekingPeace: "Всі релігії поділяють спільну мету: шукати мир, просувати любов і будувати кращий світ. Попри наші відмінності, ми всі об'єднані в цьому пошуку мудрості та гармонії."
  },
  zh: {
    commonGoal: "共同目标",
    seekingPeace: "所有宗教都有一个共同的目标：寻求和平、促进爱心、建设更美好的世界。超越我们的差异，我们都团结在这个追求智慧与和谐的旅程中。"
  },
  ar: {
    commonGoal: "الهدف المشترك",
    seekingPeace: "تشترك جميع الأديان في هدف مشترك: البحث عن السلام، وتعزيز المحبة، وبناء عالم أفضل. بعيداً عن اختلافاتنا، نحن جميعاً متحدون في هذا السعي للحكمة والانسجام."
  },
  he: {
    commonGoal: "מטרה משותפת",
    seekingPeace: "כל הדתות חולקות מטרה משותפת: לחפש שלום, לקדם אהבה ולבנות עולם טוב יותר. מעבר להבדלים שלנו, כולנו מאוחדים במסע זה לחוכמה והרמוניה."
  },
  jp: {
    commonGoal: "共通の目標",
    seekingPeace: "すべての宗教は共通の目標を共有しています：平和を求め、愛を促進し、より良い世界を築くこと。私たちの違いを超えて、知恵と調和を求めるこの探求において、私たちは皆団結しています。"
  },
  ko: {
    commonGoal: "공통 목표",
    seekingPeace: "모든 종교는 공통의 목표를 공유합니다: 평화를 추구하고, 사랑을 증진하며, 더 나은 세상을 만드는 것. 우리의 차이를 넘어, 우리는 모두 지혜와 조화를 추구하는 이 여정에서 하나로 연합되어 있습니다."
  },
  hi: {
    commonGoal: "साझा लक्ष्य",
    seekingPeace: "सभी धर्म एक साझा लक्ष्य साझा करते हैं: शांति की तलाश करना, प्रेम को बढ़ावा देना और एक बेहतर दुनिया बनाना। हमारे मतभेदों से परे, हम सभी इस ज्ञान और सद्भाव की खोज में एकजुट हैं।"
  },
  sw: {
    commonGoal: "Lengo la Pamoja",
    seekingPeace: "Dini zote zinashiriki lengo moja: kutafuta amani, kuendeleza upendo na kujenga ulimwengu bora. Zaidi ya tofauti zetu, sote tumejiunga katika utafutaji huu wa hekima na mwangaza."
  },
  pl: {
    commonGoal: "Wspólny Cel",
    seekingPeace: "Wszystkie religie dzielą wspólny cel: poszukiwanie pokoju, promowanie miłości i budowanie lepszego świata. Poza naszymi różnicami wszyscy jesteśmy zjednoczeni w tym poszukiwaniu mądrości i harmonii."
  },
  rc: {
    commonGoal: "Ntina ya Lisángá",
    seekingPeace: "Mabondeli nyonso ezali na ntina moko: koluka kimya, kotombola bolingo mpé kotónga mokili ya malamu. Na nse ya bokeseni na biso, biso nyonso tozali lisángá na boluki oyo ya bwanya mpé boyokani."
  }
};

// Fonction pour ajouter les traductions à un fichier
function addTranslations(langCode, langData) {
  const filePath = path.join(__dirname, `../src/data/translations/${langCode}/unity.js`);
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ Fichier non trouvé: ${langCode}/unity.js`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Chercher la section religions et ajouter après "values:"
  const searchPattern = /values:\s*["'][^"']+["'],/;
  
  if (!searchPattern.test(content)) {
    console.log(`⚠️  Pattern 'values:' non trouvé dans ${langCode}/unity.js`);
    return;
  }

  // Vérifier si déjà ajouté
  if (content.includes('commonGoal:')) {
    console.log(`✓ ${langCode}: Déjà à jour`);
    return;
  }

  // Remplacer avec les nouvelles lignes
  content = content.replace(
    /(values:\s*["'][^"']+["'],)/,
    `$1\n    commonGoal: "${langData.commonGoal}",\n    seekingPeace: "${langData.seekingPeace}",`
  );

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`✅ ${langCode}: Traductions ajoutées`);
}

// Ajouter les traductions pour toutes les langues
console.log('🌍 Ajout des traductions "commonGoal" et "seekingPeace"...\n');

Object.entries(translations).forEach(([langCode, langData]) => {
  addTranslations(langCode, langData);
});

console.log('\n✨ Terminé!');
