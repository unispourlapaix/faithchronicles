// ============================================================================
// SCRIPT - Téléchargement via GetBible.net API
// ============================================================================
// API gratuite et fiable sans limitation

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const chaptersDir = path.join(rootDir, 'src', 'data', 'bible', 'gospel', 'john', 'chapters');

// Configuration GetBible.net
// API: https://getbible.net/json?passage=john1&v=ukrainian
const VERSIONS = {
  uk: {
    name: 'Ukrainian Bible (Українська Біблія)',
    version: 'Ukrainian Bible',
    code: 'ukrainian',
    language: 'uk',
    direction: 'ltr'
  },
  he: {
    name: 'Hebrew New Testament (הברית החדשה)',
    version: 'Hebrew NT',
    code: 'hebrew',
    language: 'he',
    direction: 'rtl'
  }
};

async function downloadChapter(chapterNum, versionCode) {
  const url = `https://getbible.net/json?passage=john${chapterNum}&v=${versionCode}`;
  
  try {
    const response = await fetch(url);
    const text = await response.text();
    
    // GetBible retourne du JSONP, on doit extraire le JSON
    const jsonMatch = text.match(/\((.*)\);?$/s);
    if (!jsonMatch) {
      throw new Error('Format JSONP invalide');
    }
    
    const data = JSON.parse(jsonMatch[1]);
    return data;
  } catch (error) {
    console.error(`  ❌ Erreur:`, error.message);
    return null;
  }
}

function convertData(data, chapterNum, langConfig) {
  if (!data || !data.book || !data.book[0] || !data.book[0].chapter) {
    return null;
  }
  
  const chapterData = data.book[0].chapter[String(chapterNum)];
  if (!chapterData) return null;
  
  const verses = Object.entries(chapterData.verse).map(([verseNum, verseData]) => ({
    number: parseInt(verseNum),
    text: verseData.verse.trim(),
    strong: []
  })).sort((a, b) => a.number - b.number);
  
  return {
    chapter: chapterNum,
    title: `Jean ${chapterNum}`,
    version: langConfig.version,
    language: langConfig.language,
    direction: langConfig.direction,
    verses: verses
  };
}

function generateFile(chapterData, chapterNum, language) {
  const langUpper = language.toUpperCase();
  const varName = `johnChapter${chapterNum}${langUpper}`;
  
  return `// ============================================================================
// ÉVANGILE DE JEAN - ${VERSIONS[language].name}
// ============================================================================
// Chapitre ${chapterNum}

export const ${varName} = ${JSON.stringify(chapterData, null, 2)};

export default ${varName};
`;
}

async function downloadLanguage(lang) {
  console.log(`\n📖 ${VERSIONS[lang].name}`);
  console.log('='.repeat(60));
  
  const config = VERSIONS[lang];
  let successCount = 0;
  
  for (let chapter = 1; chapter <= 21; chapter++) {
    console.log(`  Chapitre ${chapter}...`);
    
    const data = await downloadChapter(chapter, config.code);
    if (!data) {
      console.log(`  ⚠️  Échec`);
      continue;
    }
    
    const chapterData = convertData(data, chapter, config);
    if (!chapterData) {
      console.log(`  ⚠️  Pas de données`);
      continue;
    }
    
    const content = generateFile(chapterData, chapter, lang);
    const filename = `john-${String(chapter).padStart(2, '0')}-${lang}.js`;
    const filepath = path.join(chaptersDir, filename);
    
    fs.writeFileSync(filepath, content, 'utf-8');
    console.log(`  ✅ ${chapterData.verses.length} versets - ${filename}`);
    successCount++;
    
    // Pause pour éviter surcharge
    await new Promise(resolve => setTimeout(resolve, 300));
  }
  
  console.log(`\n✨ Résumé: ${successCount}/21 chapitres téléchargés`);
}

async function main() {
  console.log('🚀 TÉLÉCHARGEMENT - Évangile de Jean (GetBible.net)');
  console.log('='.repeat(60));
  
  const args = process.argv.slice(2);
  const lang = args[0] || 'uk';
  
  if (!VERSIONS[lang]) {
    console.log(`❌ Langue non supportée: ${lang}`);
    console.log(`Langues disponibles: ${Object.keys(VERSIONS).join(', ')}`);
    process.exit(1);
  }
  
  await downloadLanguage(lang);
  
  console.log('\n' + '='.repeat(60));
  console.log('✅ Terminé!');
  console.log(`\n💡 Prochaine étape: npm run add-strong ${lang}`);
}

main().catch(error => {
  console.error('❌ Erreur fatale:', error);
  process.exit(1);
});
