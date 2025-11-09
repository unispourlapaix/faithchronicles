const fs = require('fs');
const path = require('path');

const translations = {
  es: {
    tryAgain: "Intentar de nuevo",
    backToMenu: "Volver al menú",
    wrongAnswer: "¡Respuesta incorrecta!"
  },
  de: {
    tryAgain: "Erneut versuchen",
    backToMenu: "Zurück zum Menü",
    wrongAnswer: "Falsche Antwort!"
  },
  it: {
    tryAgain: "Riprova",
    backToMenu: "Torna al menu",
    wrongAnswer: "Risposta sbagliata!"
  },
  pt: {
    tryAgain: "Tentar novamente",
    backToMenu: "Voltar ao menu",
    wrongAnswer: "Resposta errada!"
  },
  ru: {
    tryAgain: "Попробовать снова",
    backToMenu: "Вернуться в меню",
    wrongAnswer: "Неправильный ответ!"
  },
  uk: {
    tryAgain: "Спробувати знову",
    backToMenu: "Повернутися до меню",
    wrongAnswer: "Неправильна відповідь!"
  },
  zh: {
    tryAgain: "再试一次",
    backToMenu: "返回菜单",
    wrongAnswer: "答错了！"
  },
  ar: {
    tryAgain: "حاول مرة أخرى",
    backToMenu: "العودة إلى القائمة",
    wrongAnswer: "إجابة خاطئة!"
  },
  he: {
    tryAgain: "נסה שוב",
    backToMenu: "חזור לתפריט",
    wrongAnswer: "תשובה שגויה!"
  },
  jp: {
    tryAgain: "もう一度試す",
    backToMenu: "メニューに戻る",
    wrongAnswer: "不正解！"
  },
  ko: {
    tryAgain: "다시 시도",
    backToMenu: "메뉴로 돌아가기",
    wrongAnswer: "오답！"
  },
  hi: {
    tryAgain: "फिर से प्रयास करें",
    backToMenu: "मेनू पर वापस जाएं",
    wrongAnswer: "गलत जवाब!"
  },
  sw: {
    tryAgain: "Jaribu tena",
    backToMenu: "Rudi kwenye menyu",
    wrongAnswer: "Jibu lisilo sahihi!"
  },
  pl: {
    tryAgain: "Spróbuj ponownie",
    backToMenu: "Powrót do menu",
    wrongAnswer: "Zła odpowiedź!"
  },
  rc: {
    tryAgain: "Meka lisusu",
    backToMenu: "Zonga na menu",
    wrongAnswer: "Eyano ezali malamu te!"
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
  
  // Ajouter tryAgain et backToMenu dans buttons
  const buttonsRegex = /(buttons:\s*\{[^}]*yesRestart:[^,]+,\s*noContinue:[^,]+)(,?\s*\})/s;
  if (buttonsRegex.test(content)) {
    content = content.replace(
      buttonsRegex,
      `$1,\n    tryAgain: "${translations[lang].tryAgain}",\n    backToMenu: "${translations[lang].backToMenu}"$2`
    );
  }
  
  // Ajouter wrongAnswer dans labels
  const labelsRegex = /(labels:\s*\{[^}]*maxLevelReached:[^,\}]+)(,?\s*\})/s;
  if (labelsRegex.test(content)) {
    content = content.replace(
      labelsRegex,
      `$1,\n    wrongAnswer: "${translations[lang].wrongAnswer}"$2`
    );
  }
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ ${lang}/ui.js mis à jour`);
});

console.log('\n✨ Toutes les traductions ont été ajoutées !');
