// Script pour compléter la base de données Lingala avec tous les chapitres restants (6-21)
const fs = require('fs');

// Nombres de versets par chapitre pour Jean 6-21
const verseCounts = {
  6: 71, 7: 53, 8: 59, 9: 41, 10: 42, 11: 57, 12: 50, 13: 38,
  14: 31, 15: 27, 16: 33, 17: 26, 18: 40, 19: 42, 20: 31, 21: 25
};

// Titres Lingala pour chaque chapitre
const titles = {
  6: "Lipompa ya Bomoi",
  7: "Yesu na Feti ya Bandako",
  8: "Mwasi Akangami na Kindumba",
  9: "Kobikisa Mokuf Miso",
  10: "Mobateli Malamu",
  11: "Lazaro Alamuka",
  12: "Maria Apakola Mafuta",
  13: "Kosukola Makolo",
  14: "Nzela, Bosolo mpe Bomoi",
  15: "Nzete ya Vino",
  16: "Mosala ya Molimo",
  17: "Losambo ya Nganga-Nzambe",
  18: "Kokanga mpe Kosambisa Yesu",
  19: "Kobaka na Ekulusu",
  20: "Kosekwa",
  21: "Yesu na Ngambo ya Ebale"
};

// Lire le fichier actuel
const currentContent = fs.readFileSync('./lingala-bible-database.cjs', 'utf-8');

// Trouver la position pour insérer
const insertPoint = currentContent.lastIndexOf('  }\n};');

// Créer le texte à insérer pour les chapitres 6-21
let chaptersToAdd = '';

for (let chap = 6; chap <= 21; chap++) {
  const count = verseCounts[chap];
  const verses = [];
  
  // Pour l'instant, créer des placeholders qui seront traduits
  for (let v = 1; v <= count; v++) {
    verses.push(`Lingala verset ${v} - à traduire`);
  }
  
  chaptersToAdd += `,\n    ${chap}: {\n`;
  chaptersToAdd += `      title: "${titles[chap]}",\n`;
  chaptersToAdd += `      verses: [\n`;
  
  verses.forEach((verse, idx) => {
    const comma = idx < verses.length - 1 ? ',' : '';
    chaptersToAdd += `        "${verse}"${comma}\n`;
  });
  
  chaptersToAdd += `      ]\n`;
  chaptersToAdd += `    }`;
}

// Insérer le nouveau contenu
const newContent = currentContent.slice(0, insertPoint) + chaptersToAdd + '\n  }\n};';

// Sauvegarder
fs.writeFileSync('./lingala-bible-database.cjs', newContent);

console.log('✅ Chapitres 6-21 ajoutés à la base de données');
console.log(`📊 Total: 21 chapitres maintenant disponibles`);
console.log('⚠️  Les versets 6-21 sont des placeholders - traduction nécessaire');
