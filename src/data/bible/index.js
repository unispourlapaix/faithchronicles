// ============================================================================
// BIBLE MODULE INDEX - Main entry point for all Bible-related functionality
// ============================================================================

// Core Bible data and functionality
export { bibleData } from './bibleData.js';

// Bible treasures manager (multilingual)
export { bibleTreasures } from './bibleTreasures.js';

// Spiritual wisdom
export { spiritualWisdom } from './spiritualWisdom.js';

// Strong's dictionary
export { strongGreek } from './strongGreek.js';

// Gospel of John complete
export { gospelJohnTreasures, gospelOfJohn, metadata as johnMetadata } from './gospel/john/index.js';

// Translation data (French)
export { default as bibleVersesFr } from './translations/fr/bibleVerses.js';
export { default as jesusIsNotFr } from './translations/fr/jesusIsNot.js';
export { default as bibleFactsFr } from './translations/fr/bibleFacts.js';
export { default as funQuestionsFr } from './translations/fr/funQuestions.js';
export { default as bibleTreasuresFr } from './translations/fr/bibleTreasures.js';
export { biblePassagesFr } from './translations/fr/biblePassages.js';

// Translation data (English)
export { default as bibleVersesEn } from './translations/en/bibleVerses.js';
export { default as jesusIsNotEn } from './translations/en/jesusIsNot.js';
export { default as bibleFactsEn } from './translations/en/bibleFacts.js';
export { default as funQuestionsEn } from './translations/en/funQuestions.js';
export { default as bibleTreasuresEn } from './translations/en/bibleTreasures.js';
export { biblePassagesEn } from './translations/en/biblePassages.js';

// Default exports for backward compatibility
export { bibleData as default } from './bibleData.js';