const fs = require('fs');
const path = require('path');

const translations = {
  it: {
    yesRestart: "Sì, ricomincia",
    noContinue: "No, continua",
    tryAgain: "Riprova",
    backToMenu: "Torna al menu"
  },
  pt: {
    yesRestart: "Sim, reiniciar",
    noContinue: "Não, continuar",
    tryAgain: "Tentar novamente",
    backToMenu: "Voltar ao menu"
  },
  ru: {
    yesRestart: "Да, начать заново",
    noContinue: "Нет, продолжить",
    tryAgain: "Попробовать снова",
    backToMenu: "Вернуться в меню"
  },
  uk: {
    yesRestart: "Так, почати заново",
    noContinue: "Ні, продовжити",
    tryAgain: "Спробувати знову",
    backToMenu: "Повернутися до меню"
  },
  zh: {
    yesRestart: "是的，重新开始",
    noContinue: "不，继续",
    tryAgain: "再试一次",
    backToMenu: "返回菜单"
  },
  he: {
    yesRestart: "כן, התחל מחדש",
    noContinue: "לא, המשך",
    tryAgain: "נסה שוב",
    backToMenu: "חזור לתפריט"
  },
  ko: {
    yesRestart: "예, 다시 시작",
    noContinue: "아니요, 계속",
    tryAgain: "다시 시도",
    backToMenu: "메뉴로 돌아가기"
  },
  rc: {
    yesRestart: "Iyo, bandela",
    noContinue: "Te, koba",
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
    console.log(`ℹ️  ${lang}/ui.js - déjà à jour`);
    return;
  }
  
  // Trouver la fin de la section buttons (avant le },)
  const buttonsPattern = /(buttons:\s*\{[^}]*load:\s*"[^"]+")(\s*\})/s;
  
  if (buttonsPattern.test(content)) {
    const keys = translations[lang];
    const newKeys = [
      `yesRestart: "${keys.yesRestart}"`,
      `noContinue: "${keys.noContinue}"`,
      `tryAgain: "${keys.tryAgain}"`,
      `backToMenu: "${keys.backToMenu}"`
    ].join(',\n    ');
    
    content = content.replace(
      buttonsPattern,
      `$1,\n    ${newKeys}$2`
    );
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${lang}/ui.js - ajouté 4 clés manquantes`);
  } else {
    console.log(`⚠️  ${lang}/ui.js - pattern buttons non trouvé`);
  }
});

console.log('\n✨ Ajout des traductions terminé !');
