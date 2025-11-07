// Script pour ajouter les champs "correct" au fichier japonais
// En se basant sur le fichier français source

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Chemins des fichiers
const frPath = path.join(__dirname, '../src/data/translations/fr/interface_chapter1.js');
const jpPath = path.join(__dirname, '../src/data/translations/jp/interface_chapter1.js');

// Lecture du fichier français
const frContent = fs.readFileSync(frPath, 'utf-8');

// Extraction des valeurs "correct" du fichier français
const correctPattern = /correct:\s*(\d+)/g;
const correctValues = [];
let match;
while ((match = correctPattern.exec(frContent)) !== null) {
  correctValues.push(parseInt(match[1]));
}

console.log(`✅ Trouvé ${correctValues.length} valeurs "correct" dans le fichier français`);

// Lecture du fichier japonais
let jpContent = fs.readFileSync(jpPath, 'utf-8');

// Compteur pour suivre quelle valeur correct utiliser
let correctIndex = 0;

// Ajouter "correct" après chaque "options: [...],"
jpContent = jpContent.replace(/(options:\s*\[[^\]]+\],)\n(\s+)(hint:)/g, (match, options, spaces, hint) => {
  if (correctIndex < correctValues.length) {
    const correctValue = correctValues[correctIndex];
    correctIndex++;
    return `${options}\n${spaces}correct: ${correctValue},\n${spaces}${hint}`;
  }
  return match;
});

console.log(`✅ Ajouté ${correctIndex} champs "correct" au fichier japonais`);

// Écriture du fichier japonais modifié
fs.writeFileSync(jpPath, jpContent, 'utf-8');

console.log(`✅ Fichier japonais mis à jour: ${jpPath}`);
