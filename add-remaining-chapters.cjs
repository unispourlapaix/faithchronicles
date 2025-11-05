const fs = require('fs');

// Lire le fichier actuel
const currentDb = require('./lingala-bible-database.cjs');

// Ajouter les chapitres 6-21
currentDb.chapters[6] = {
  title: "Lipompa ya Bomoi",
  verses: Array(71).fill(null).map((_, i) => `Verset ${i+1} ya chapitre 6`)  // Placeholder temporaire
};

// Pour le moment, créons un script qui va remplir tous les chapitres
console.log('✅ Structure prête pour 21 chapitres');
console.log(`📊 Chapitres: ${Object.keys(currentDb.chapters).length}/21`);
