// Script pour comparer les Strong entre les langues
const fs = require('fs');
const path = require('path');

const strongDir = './src/data/bible/strong';
const baseFile = path.join(strongDir, 'base/strongWords.js');
const langDirs = ['fr', 'en', 'es', 'pt', 'de', 'it', 'ru', 'zh', 'ar', 'hi', 'ko', 'ja', 'uk', 'he'];

// Lire les Strong de base
const baseContent = fs.readFileSync(baseFile, 'utf8');
const baseMatches = baseContent.match(/"([GH]\d+)":/g);
const baseStrongs = baseMatches ? baseMatches.map(m => m.replace(/[":]/g, '')) : [];

console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║         COMPARAISON DES STRONG ENTRE LES LANGUES             ║');
console.log('╚════════════════════════════════════════════════════════════════╝\n');

console.log(`📊 Base (strongWords.js): ${baseStrongs.length} entrées Strong\n`);

const results = {};

langDirs.forEach(lang => {
  const langFile = path.join(strongDir, lang, 'strongTranslations.js');
  
  if (fs.existsSync(langFile)) {
    const content = fs.readFileSync(langFile, 'utf8');
    const matches = content.match(/"([GH]\d+)":/g);
    const strongs = matches ? matches.map(m => m.replace(/[":]/g, '')) : [];
    
    // Trouver les différences
    const inLangNotInBase = strongs.filter(s => !baseStrongs.includes(s));
    const inBaseNotInLang = baseStrongs.filter(s => !strongs.includes(s));
    
    results[lang] = {
      total: strongs.length,
      inLangNotInBase,
      inBaseNotInLang,
      strongs: new Set(strongs)
    };
    
    const status = strongs.length === baseStrongs.length ? '✅' : '⚠️';
    console.log(`${status} ${lang.toUpperCase().padEnd(4)} : ${strongs.length.toString().padStart(3)} entrées`);
    
    if (inLangNotInBase.length > 0) {
      console.log(`   ⚠️  ${inLangNotInBase.length} Strong dans ${lang} mais PAS dans base:`);
      console.log(`       ${inLangNotInBase.slice(0, 10).join(', ')}${inLangNotInBase.length > 10 ? '...' : ''}`);
    }
    
    if (inBaseNotInLang.length > 0) {
      console.log(`   ⚠️  ${inBaseNotInLang.length} Strong dans base mais PAS dans ${lang}:`);
      console.log(`       ${inBaseNotInLang.slice(0, 10).join(', ')}${inBaseNotInLang.length > 10 ? '...' : ''}`);
    }
  } else {
    console.log(`❌ ${lang.toUpperCase().padEnd(4)} : Fichier non trouvé`);
  }
});

console.log('\n╔════════════════════════════════════════════════════════════════╗');
console.log('║                    ANALYSE DÉTAILLÉE                          ║');
console.log('╚════════════════════════════════════════════════════════════════╝\n');

// Trouver les Strong manquants dans toutes les langues
const allLangStrongs = new Set();
Object.values(results).forEach(r => {
  r.strongs.forEach(s => allLangStrongs.add(s));
});

const strongsOnlyInLangs = [...allLangStrongs].filter(s => !baseStrongs.includes(s));
if (strongsOnlyInLangs.length > 0) {
  console.log(`🔍 ${strongsOnlyInLangs.length} Strong présents dans les traductions mais ABSENTS de base:`);
  console.log(`   ${strongsOnlyInLangs.sort().join(', ')}\n`);
}

// Vérifier la cohérence entre langues
console.log('📊 Cohérence entre langues:');
const langPairs = [
  ['fr', 'en'],
  ['fr', 'es'],
  ['en', 'es']
];

langPairs.forEach(([lang1, lang2]) => {
  if (results[lang1] && results[lang2]) {
    const diff1 = [...results[lang1].strongs].filter(s => !results[lang2].strongs.has(s));
    const diff2 = [...results[lang2].strongs].filter(s => !results[lang1].strongs.has(s));
    
    if (diff1.length > 0 || diff2.length > 0) {
      console.log(`\n   ${lang1.toUpperCase()} vs ${lang2.toUpperCase()}:`);
      if (diff1.length > 0) console.log(`   - ${diff1.length} Strong dans ${lang1} mais pas dans ${lang2}`);
      if (diff2.length > 0) console.log(`   - ${diff2.length} Strong dans ${lang2} mais pas dans ${lang1}`);
    } else {
      console.log(`\n   ${lang1.toUpperCase()} vs ${lang2.toUpperCase()}: ✅ Identiques`);
    }
  }
});

console.log('\n✅ Analyse terminée!\n');
