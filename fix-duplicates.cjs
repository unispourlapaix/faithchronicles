const fs = require('fs');
const path = require('path');

// Liste des fichiers à corriger
const files = [
  'ar', 'he', 'it', 'pt', 'rc', 'ru', 'uk', 'zh'
].map(lang => path.join(__dirname, 'src', 'data', 'translations', lang, 'ui.js'));

files.forEach(filePath => {
  console.log(`\nTraitement de ${filePath}...`);
  
  let content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  
  // Trouver la ligne chapters
  let chaptersLine = -1;
  let challengeLine = -1;
  let firstBibleLine = -1;
  let secondBibleLine = -1;
  
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim() === 'chapters: {') chaptersLine = i;
    if (lines[i].trim() === 'challenge: {') challengeLine = i;
    if (lines[i].trim() === 'bible: {' && firstBibleLine === -1) firstBibleLine = i;
    else if (lines[i].trim() === 'bible: {') secondBibleLine = i;
  }
  
  console.log(`chapters: ligne ${chaptersLine}`);
  console.log(`challenge: ligne ${challengeLine}`);
  console.log(`première bible: ligne ${firstBibleLine}`);
  console.log(`deuxième bible: ligne ${secondBibleLine}`);
  
  if (firstBibleLine > 0 && secondBibleLine > 0 && firstBibleLine < secondBibleLine) {
    // Supprimer l'ancienne section bible (de firstBibleLine jusqu'à challengeLine - 3)
    const startDelete = firstBibleLine;
    const endDelete = challengeLine - 3; // Avant la virgule et les lignes vides
    
    console.log(`Suppression des lignes ${startDelete} à ${endDelete}`);
    
    const newLines = [
      ...lines.slice(0, startDelete),
      ...lines.slice(endDelete + 1)
    ];
    
    fs.writeFileSync(filePath, newLines.join('\n'), 'utf8');
    console.log(`✅ Fichier corrigé: ${filePath}`);
  } else {
    console.log(`⚠️ Pas de duplication détectée dans ${filePath}`);
  }
});

console.log('\n✅ Nettoyage terminé!');
