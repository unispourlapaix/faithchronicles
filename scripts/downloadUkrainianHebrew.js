// ============================================================================
// SCRIPT - Téléchargement Évangile de Jean en Ukrainien et Hébreu
// ============================================================================
// Télécharge des versions libres de droit depuis des APIs bibliques

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const chaptersDir = path.join(rootDir, 'src', 'data', 'bible', 'gospel', 'john', 'chapters');

// Configuration des versions bibliques libres de droit
const BIBLE_VERSIONS = {
  uk: {
    code: 'Ukrainian',
    name: 'Ukrainian Bible (Українська Біблія)',
    version: 'Ukrainian Bible 1962',
    apiId: 'ukr', // Ukrainian
    language: 'uk',
    direction: 'ltr'
  },
  he: {
    code: 'Hebrew',
    name: 'Hebrew New Testament (הברית החדשה)',
    version: 'Delitzsch Hebrew Gospels',
    apiId: 'hhh', // Hebrew NT
    language: 'he',
    direction: 'rtl'
  }
};

/**
 * Utiliser Bolls Life API (gratuit, excellente couverture)
 * Format: https://bolls.life/get-chapter/UKR/43/1/
 * 43 = Jean (John)
 */
async function fetchFromBollsLife(chapterNum, translationCode) {
  // 43 = code biblique pour l'Évangile de Jean
  const bookCode = 43;
  const url = `https://bolls.life/get-chapter/${translationCode.toUpperCase()}/${bookCode}/${chapterNum}/`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Erreur lors du fetch de Jean ${chapterNum} (${translationCode}):`, error.message);
    return null;
  }
}

/**
 * Convertit les données Bolls Life en format de fichier local
 */
function convertToLocalFormat(apiData, chapterNum, langConfig) {
  if (!apiData) return null;
  
  // Format Bolls Life: array de versets
  const verses = apiData.map((verseData) => ({
    number: verseData.verse,
    text: verseData.text.trim(),
    strong: [] // Sera rempli par le script addStrongToTranslations
  }));
  
  if (verses.length === 0) return null;
  
  return {
    chapter: chapterNum,
    title: `Jean ${chapterNum}`,
    version: langConfig.version,
    language: langConfig.language,
    direction: langConfig.direction,
    verses: verses
  };
}

/**
 * Génère le contenu du fichier JavaScript
 */
function generateFileContent(chapterData, chapterNum, language) {
  const langUpper = language.toUpperCase();
  const varName = `johnChapter${chapterNum}${langUpper}`;
  
  const header = `// ============================================================================
// ÉVANGILE DE JEAN - ${BIBLE_VERSIONS[language].name}
// ============================================================================
// Chapitre ${chapterNum}

export const ${varName} = ${JSON.stringify(chapterData, null, 2)};

export default ${varName};
`;
  
  return header;
}

/**
 * Sauvegarde un chapitre dans un fichier
 */
function saveChapter(content, chapterNum, language) {
  const filename = `john-${String(chapterNum).padStart(2, '0')}-${language}.js`;
  const filepath = path.join(chaptersDir, filename);
  
  fs.writeFileSync(filepath, content, 'utf-8');
  console.log(`  ✅ Sauvegardé: ${filename}`);
}

/**
 * Télécharge tous les chapitres pour une langue
 */
async function downloadLanguage(language) {
  console.log(`\n📖 Téléchargement: ${BIBLE_VERSIONS[language].name}`);
  console.log('='.repeat(60));
  
  const langConfig = BIBLE_VERSIONS[language];
  
  // Jean a 21 chapitres
  for (let chapter = 1; chapter <= 21; chapter++) {
    console.log(`\n  Chapitre ${chapter}...`);
    
    try {
      // Utiliser Bolls Life API
      const apiData = await fetchFromBollsLife(chapter, langConfig.apiId);
      
      if (!apiData) {
        console.log(`  ⚠️  Impossible de télécharger Jean ${chapter}`);
        continue;
      }
      
      // Convertir au format local
      const chapterData = convertToLocalFormat(apiData, chapter, langConfig);
      
      if (!chapterData || chapterData.verses.length === 0) {
        console.log(`  ⚠️  Aucun verset trouvé pour Jean ${chapter}`);
        continue;
      }
      
      // Générer le contenu du fichier
      const fileContent = generateFileContent(chapterData, chapter, language);
      
      // Sauvegarder
      saveChapter(fileContent, chapter, language);
      
      // Pause pour éviter de surcharger l'API
      await new Promise(resolve => setTimeout(resolve, 500));
      
    } catch (error) {
      console.error(`  ❌ Erreur chapitre ${chapter}:`, error.message);
    }
  }
}

/**
 * Source alternative : Téléchargement manuel depuis getbible.net
 */
function printManualInstructions() {
  console.log('\n' + '='.repeat(60));
  console.log('📌 INSTRUCTIONS ALTERNATIVES');
  console.log('='.repeat(60));
  console.log('\nSi l\'API automatique ne fonctionne pas, vous pouvez :');
  console.log('\n1️⃣  **Ukrainien (UK)** :');
  console.log('   - Site: https://www.bible.com/bible/143/JHN.1.UKR');
  console.log('   - Version: Ukrainian Bible (Біблія)');
  console.log('   - Gratuite et libre de droit');
  console.log('\n2️⃣  **Hébreu (HE)** :');
  console.log('   - Pour NT en hébreu: https://www.bible.com/bible/323/JHN.1.HHH');
  console.log('   - Version: Hebrew New Testament (הברית החדשה)');
  console.log('   - Delitzsch Hebrew Gospels');
  console.log('\n3️⃣  **Autre source** :');
  console.log('   - API.Bible: https://scripture.api.bible/');
  console.log('   - Nécessite une clé API gratuite');
  console.log('   - Documentation: https://scripture.api.bible/livedocs');
  console.log('\n4️⃣  **GetBible.net** :');
  console.log('   - https://getbible.net/api');
  console.log('   - Format JSON direct, pas de clé requise');
  console.log('\n');
}

/**
 * Fonction principale
 */
async function main() {
  console.log('🚀 TÉLÉCHARGEMENT - Évangile de Jean (UK + HE)');
  console.log('='.repeat(60));
  
  const args = process.argv.slice(2);
  const specificLang = args[0]; // uk ou he
  
  const languagesToDownload = specificLang 
    ? [specificLang]
    : ['uk', 'he'];
  
  console.log(`\n📋 Langues à télécharger: ${languagesToDownload.join(', ')}`);
  
  for (const lang of languagesToDownload) {
    if (!BIBLE_VERSIONS[lang]) {
      console.log(`⚠️  Langue non supportée: ${lang}`);
      continue;
    }
    
    await downloadLanguage(lang);
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('✅ Téléchargement terminé!');
  
  // Afficher les instructions alternatives
  printManualInstructions();
}

// Exécution
main().catch(error => {
  console.error('❌ Erreur fatale:', error);
  printManualInstructions();
  process.exit(1);
});
