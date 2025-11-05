// ============================================================================
// TEST JOHN TREASURES INTEGRATION
// ============================================================================
// Test complet du système de trésors de l'Évangile de Jean

import { bibleData } from '../src/data/bible';

// Test principal
async function testJohnTreasuresIntegration() {
  console.log("🧪 Début des tests d'intégration - Trésors de Jean");
  
  try {
    // Test 1: Métadonnées de l'Évangile
    console.log("\n📋 Test 1: Métadonnées de l'Évangile de Jean");
    const metadata = await bibleData.getJohnMetadata();
    console.log("Métadonnées reçues:", metadata);
    
    // Test 2: Trésor aléatoire de Jean
    console.log("\n🎲 Test 2: Trésor aléatoire de Jean");
    const randomTreasure = await bibleData.getRandomJohnTreasure();
    console.log("Trésor aléatoire:", randomTreasure);
    
    // Test 3: Trésors célèbres de Jean
    console.log("\n⭐ Test 3: Trésors célèbres de Jean");
    const famousTreasures = await bibleData.getFamousJohnTreasures();
    console.log(`Nombre de trésors célèbres: ${famousTreasures?.length || 0}`);
    if (famousTreasures && famousTreasures.length > 0) {
      console.log("Premier trésor célèbre:", famousTreasures[0]);
    }
    
    // Test 4: Chapitre de Jean
    console.log("\n📖 Test 4: Chapitre 1 de Jean");
    const chapter1 = await bibleData.getJohnChapter(1);
    console.log("Chapitre 1 - Premier verset:", chapter1?.verses?.[0]);
    
    // Test 5: Tous les chapitres de Jean
    console.log("\n📚 Test 5: Tous les chapitres de Jean");
    const allChapters = await bibleData.getAllJohnChapters();
    console.log(`Nombre de chapitres disponibles: ${allChapters?.length || 0}`);
    
    // Test 6: Recherche dans Jean
    console.log("\n🔍 Test 6: Recherche dans Jean");
    const searchResults = await bibleData.searchJohnVerses("amour");
    console.log(`Résultats pour "amour": ${searchResults?.length || 0} versets trouvés`);
    if (searchResults && searchResults.length > 0) {
      console.log("Premier résultat:", searchResults[0]);
    }
    
    console.log("\n✅ Tests d'intégration terminés avec succès!");
    
  } catch (error) {
    console.error("\n❌ Erreur lors des tests:", error);
  }
}

// Fonction utilitaire pour tester en mode développement
function testInDevelopment() {
  // Simuler l'environnement browser si nécessaire
  if (typeof window === 'undefined') {
    global.window = {};
  }
  
  testJohnTreasuresIntegration();
}

// Export pour utilisation
export { testJohnTreasuresIntegration };

// Auto-test si exécuté directement
if (typeof window !== 'undefined') {
  // Dans le navigateur
  window.testJohnTreasures = testJohnTreasuresIntegration;
  console.log("🌐 Test disponible: window.testJohnTreasures()");
} else {
  // En Node.js
  testInDevelopment();
}