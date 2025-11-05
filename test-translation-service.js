// ============================================================================
// TEST TRANSLATION SERVICE - Test du service de traductions
// ============================================================================
// Test simple pour vérifier que les traductions se chargent correctement

import { translationService } from '../src/data/bible/gospel/john/translationService.js';

async function testTranslationService() {
  console.log('🧪 Test du service de traductions...\n');

  // Test 1: Charger le français
  console.log('1️⃣ Test français:');
  try {
    const frChapter = await translationService.loadChapter(1, 'fr');
    if (frChapter) {
      console.log(`✅ Chapitre français chargé: ${frChapter.title}`);
      console.log(`📖 Version: ${frChapter.version}`);
      console.log(`📝 Premier verset: ${frChapter.verses[0]?.text || 'Non trouvé'}`);
    } else {
      console.log('❌ Chapitre français non chargé');
    }
  } catch (error) {
    console.log('❌ Erreur français:', error.message);
  }

  console.log('\n' + '='.repeat(50) + '\n');

  // Test 2: Charger l'anglais
  console.log('2️⃣ Test anglais:');
  try {
    const enChapter = await translationService.loadChapter(1, 'en');
    if (enChapter) {
      console.log(`✅ Chapitre anglais chargé: ${enChapter.title}`);
      console.log(`📖 Version: ${enChapter.version}`);
      console.log(`📝 Premier verset: ${enChapter.verses[0]?.text || 'Non trouvé'}`);
    } else {
      console.log('❌ Chapitre anglais non chargé');
    }
  } catch (error) {
    console.log('❌ Erreur anglais:', error.message);
  }

  console.log('\n' + '='.repeat(50) + '\n');

  // Test 3: Tester une langue sans fichier
  console.log('3️⃣ Test langue sans fichier (espagnol):');
  try {
    const esChapter = await translationService.loadChapter(1, 'es');
    if (esChapter) {
      console.log(`✅ Chapitre espagnol chargé: ${esChapter.title}`);
      console.log(`📖 Version: ${esChapter.version}`);
    } else {
      console.log('⚠️ Chapitre espagnol non disponible (normal)');
    }
  } catch (error) {
    console.log('⚠️ Erreur espagnol (normal):', error.message);
  }

  console.log('\n' + '='.repeat(50) + '\n');

  // Test 4: Statistiques
  console.log('4️⃣ Statistiques du service:');
  console.log(`📊 Langues disponibles avec fallback: FR, EN`);
  console.log(`📊 Langues configurées: ES, PT, DE, IT, RU, ZH, AR, HI, SW, KO, JA, PL`);
  console.log(`📊 Total théorique: 14 langues`);

  console.log('\n✨ Test terminé !');
}

// Exécuter le test si ce fichier est lancé directement
if (typeof window !== 'undefined') {
  // Dans un navigateur
  window.testTranslationService = testTranslationService;
  console.log('🌐 Test disponible dans la console: testTranslationService()');
} else {
  // Dans Node.js
  testTranslationService().catch(console.error);
}

export { testTranslationService };