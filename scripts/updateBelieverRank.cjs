const fs = require('fs');
const path = require('path');

// Nouvelles traductions pour le rang "believer" → plus impressionnant
const translations = {
  fr: {
    believer: "Éveillé",
    believerDesc: "Conscience spirituelle éveillée"
  },
  en: {
    believer: "The Awakened",
    believerDesc: "Spiritual consciousness awakened"
  },
  es: {
    believer: "El Despertado",
    believerDesc: "Conciencia espiritual despertada"
  },
  de: {
    believer: "Der Erwachte",
    believerDesc: "Erwachtes spirituelles Bewusstsein"
  },
  it: {
    believer: "Il Risvegliato",
    believerDesc: "Coscienza spirituale risvegliata"
  },
  pt: {
    believer: "O Desperto",
    believerDesc: "Consciência espiritual despertada"
  },
  ru: {
    believer: "Пробуждённый",
    believerDesc: "Пробуждённое духовное сознание"
  },
  uk: {
    believer: "Пробуджений",
    believerDesc: "Пробуджена духовна свідомість"
  },
  zh: {
    believer: "觉醒者",
    believerDesc: "灵性意识觉醒"
  },
  jp: {
    believer: "覚醒者",
    believerDesc: "目覚めた霊的意識"
  },
  ko: {
    believer: "각성자",
    believerDesc: "깨어난 영적 의식"
  },
  ar: {
    believer: "المستيقظ",
    believerDesc: "الوعي الروحي المستيقظ"
  },
  he: {
    believer: "המתעורר",
    believerDesc: "תודעה רוחנית מתעוררת"
  },
  hi: {
    believer: "जागृत",
    believerDesc: "जागृत आध्यात्मिक चेतना"
  },
  sw: {
    believer: "Aliyeamka",
    believerDesc: "Fahamu ya kiroho iliyoamka"
  },
  pl: {
    believer: "Przebudzony",
    believerDesc: "Przebudzona świadomość duchowa"
  },
  rc: {
    believer: "Oyo alamuki",
    believerDesc: "Boyebi ya molimo elamuki"
  }
};

const langCodes = Object.keys(translations);

console.log('✨ Mise à jour du rang "believer" → Éveillé/The Awakened...\n');

let successCount = 0;
let errorCount = 0;

for (const lang of langCodes) {
  const filePath = path.join(__dirname, '..', 'src', 'data', 'translations', lang, 'ui.js');
  
  try {
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  Fichier non trouvé: ${lang}/ui.js`);
      errorCount++;
      continue;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remplacer believer (la valeur)
    const believerPattern = new RegExp(`believer:\\s*"[^"]*"`, 'g');
    if (believerPattern.test(content)) {
      content = content.replace(believerPattern, `believer: "${translations[lang].believer}"`);
    } else {
      console.log(`⚠️  ${lang}: Pattern believer non trouvé`);
      errorCount++;
      continue;
    }
    
    // Remplacer believerDesc (la description)
    const believerDescPattern = new RegExp(`believerDesc:\\s*"[^"]*"`, 'g');
    if (believerDescPattern.test(content)) {
      content = content.replace(believerDescPattern, `believerDesc: "${translations[lang].believerDesc}"`);
    } else {
      console.log(`⚠️  ${lang}: Pattern believerDesc non trouvé`);
      errorCount++;
      continue;
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${lang}: ${translations[lang].believer} (${translations[lang].believerDesc})`);
    successCount++;

  } catch (error) {
    console.log(`❌ ${lang}: Erreur - ${error.message}`);
    errorCount++;
  }
}

console.log(`\n📊 Résumé: ${successCount} succès, ${errorCount} erreurs`);
console.log(`\n✨ Nouveau rang "Éveillé/The Awakened" appliqué dans toutes les langues!`);
