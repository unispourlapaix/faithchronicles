/**
 * TEST AUTO STRONG DETECTOR
 * Tester la détection automatique des Strong dans les versets
 */

import { detectStrongInVerse } from './src/utils/autoStrongDetector.js';

// Versets de test
const testVerses = [
  {
    number: 1,
    text: "Au commencement était la Parole, et la Parole était avec Dieu, et la Parole était Dieu."
  },
  {
    number: 14,
    text: "Et la parole a été faite chair, et elle a habité parmi nous, pleine de grâce et de vérité"
  },
  {
    number: 16,
    text: "Car Dieu a tant aimé le monde qu'il a donné son Fils unique"
  }
];

console.log('🔍 TEST DE DÉTECTION AUTOMATIQUE DES STRONG\n');
console.log('='.repeat(60));

testVerses.forEach(verse => {
  console.log(`\n📖 Verset ${verse.number}:`);
  console.log(`   "${verse.text}"\n`);
  
  const detected = detectStrongInVerse(verse.text);
  
  if (detected.length === 0) {
    console.log('   ❌ Aucun Strong détecté\n');
    return;
  }
  
  console.log(`   ✅ ${detected.length} mot(s) Strong détecté(s):\n`);
  
  detected.forEach(word => {
    console.log(`   • "${word.text}" → ${word.strong} (${word.greek})`);
    console.log(`     Position: ${word.start}-${word.end}, Confiance: ${word.confidence}/10`);
  });
  
  console.log('\n' + '-'.repeat(60));
});

console.log('\n✨ Test terminé!\n');
