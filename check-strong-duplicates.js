// Script temporaire pour vérifier les doublons dans les Strong
const { strongWordsBase } = require('./src/data/bible/strong/base/strongWords.js');
const { strongTranslationsFR } = require('./src/data/bible/strong/fr/strongTranslations.js');
const { strongTranslationsES } = require('./src/data/bible/strong/es/strongTranslations.js');

console.log('\n=== VÉRIFICATION DES DOUBLONS STRONG ===\n');

// Vérifier strongWordsBase
const baseKeys = Object.keys(strongWordsBase);
const uniqueBaseKeys = new Set(baseKeys);
console.log('strongWordsBase:');
console.log('  Total entries:', baseKeys.length);
console.log('  Unique entries:', uniqueBaseKeys.size);
if (baseKeys.length !== uniqueBaseKeys.size) {
  console.log('  ❌ DUPLICATES FOUND!');
  const counts = {};
  baseKeys.forEach(k => counts[k] = (counts[k] || 0) + 1);
  Object.entries(counts).filter(([k,v]) => v > 1).forEach(([k,v]) => {
    console.log('    ', k, ':', v, 'times');
  });
} else {
  console.log('  ✅ No duplicates');
}

// Vérifier strongTranslationsFR
const frKeys = Object.keys(strongTranslationsFR);
const uniqueFrKeys = new Set(frKeys);
console.log('\nstrongTranslationsFR:');
console.log('  Total entries:', frKeys.length);
console.log('  Unique entries:', uniqueFrKeys.size);
if (frKeys.length !== uniqueFrKeys.size) {
  console.log('  ❌ DUPLICATES FOUND!');
  const counts = {};
  frKeys.forEach(k => counts[k] = (counts[k] || 0) + 1);
  Object.entries(counts).filter(([k,v]) => v > 1).forEach(([k,v]) => {
    console.log('    ', k, ':', v, 'times');
  });
} else {
  console.log('  ✅ No duplicates');
}

// Vérifier strongTranslationsES
const esKeys = Object.keys(strongTranslationsES);
const uniqueEsKeys = new Set(esKeys);
console.log('\nstrongTranslationsES:');
console.log('  Total entries:', esKeys.length);
console.log('  Unique entries:', uniqueEsKeys.size);
if (esKeys.length !== uniqueEsKeys.size) {
  console.log('  ❌ DUPLICATES FOUND!');
  const counts = {};
  esKeys.forEach(k => counts[k] = (counts[k] || 0) + 1);
  Object.entries(counts).filter(([k,v]) => v > 1).forEach(([k,v]) => {
    console.log('    ', k, ':', v, 'times');
  });
} else {
  console.log('  ✅ No duplicates');
}

console.log('\n=====================================\n');
