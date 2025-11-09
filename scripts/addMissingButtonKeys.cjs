const fs = require('fs');
const path = require('path');

const translations = {
  de: {
    tryAgain: "Erneut versuchen",
    backToMenu: "Zurück zum Menü"
  },
  it: {
    tryAgain: "Riprova",
    backToMenu: "Torna al menu"
  },
  pt: {
    tryAgain: "Tentar novamente",
    backToMenu: "Voltar ao menu"
  },
  ru: {
    tryAgain: "Попробовать снова",
    backToMenu: "Вернуться в меню"
  },
  uk: {
    tryAgain: "Спробувати знову",
    backToMenu: "Повернутися до меню"
  },
  zh: {
    tryAgain: "再试一次",
    backToMenu: "返回菜单"
  },
  ar: {
    tryAgain: "حاول مرة أخرى",
    backToMenu: "العودة إلى القائمة"
  },
  he: {
    tryAgain: "נסה שוב",
    backToMenu: "חזור לתפריט"
  },
  ko: {
    tryAgain: "다시 시도",
    backToMenu: "메뉴로 돌아가기"
  },
  hi: {
    tryAgain: "फिर से प्रयास करें",
    backToMenu: "मेनू पर वापस जाएं"
  },
  sw: {
    tryAgain: "Jaribu tena",
    backToMenu: "Rudi kwenye menyu"
  },
  pl: {
    tryAgain: "Spróbuj ponownie",
    backToMenu: "Powrót do menu"
  },
  rc: {
    tryAgain: "Meka lisusu",
    backToMenu: "Zonga na menu"
  }
};

const translationsDir = path.join(__dirname, '..', 'src', 'data', 'translations');

Object.keys(translations).forEach(lang => {
  const filePath = path.join(translationsDir, lang, 'ui.js');
  
  if (!fs.existsSync(filePath)) {
    console.log(`❌ Fichier non trouvé: ${filePath}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Vérifier si tryAgain existe déjà
  if (content.includes('tryAgain:')) {
    console.log(`ℹ️  ${lang}/ui.js - tryAgain existe déjà`);
    return;
  }
  
  // Chercher la section buttons et ajouter les clés après noContinue
  const buttonsPattern = /(buttons:\s*\{[^}]*noContinue:\s*"[^"]+")(\s*\})/s;
  
  if (buttonsPattern.test(content)) {
    content = content.replace(
      buttonsPattern,
      `$1,\n    tryAgain: "${translations[lang].tryAgain}",\n    backToMenu: "${translations[lang].backToMenu}"$2`
    );
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${lang}/ui.js - ajouté tryAgain et backToMenu`);
  } else {
    console.log(`⚠️  ${lang}/ui.js - pattern buttons non trouvé`);
  }
});

console.log('\n✨ Ajout des traductions terminé !');
