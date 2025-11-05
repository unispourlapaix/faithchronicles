// ============================================================================
// GOSPEL OF JOHN MODULE - Complete multilingual integration
// ============================================================================
// Point d'entrée pour l'Évangile de Jean multilingue

// Core components
export { GospelOfJohnParser, gospelOfJohn } from './parser.js';
export { GospelJohnTreasures, gospelJohnTreasures } from './treasures.js';

// Metadata
export { default as metadata } from './metadata.json';

// Default export for convenience
export { gospelJohnTreasures as default } from './treasures.js';