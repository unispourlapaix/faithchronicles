// ============================================================================
// TRADUCTION DES MOTS STRONG EN LINGALA
// ============================================================================
// Met à jour les objets Strong avec les mots Lingala correspondants

const fs = require('fs');
const path = require('path');

// Dictionnaire de traduction des mots Strong français → Lingala
const strongWordTranslations = {
  // Mots courants
  'montagne': 'Ngomba',
  'nouveau': 'lisusu',
  'dans': 'na',
  'tout': 'nyonso',
  'peuple': 'bato',
  'amen': 'amen',
  'Maître': 'Molakisi',
  'Père': 'Tata',
  'Dieu': 'Nzambe',
  'Seigneur': 'Nkolo',
  'homme': 'moto',
  'femme': 'mwasi',
  'enfant': 'mwana',
  'monde': 'mokili',
  'vie': 'bomoi',
  'mort': 'liwa',
  'lumière': 'pole',
  'ténèbres': 'molili',
  'eau': 'mai',
  'pain': 'mapa',
  'vin': 'vino',
  'temple': 'Tempelo',
  'synagogue': 'sinagoga',
  'roi': 'mokonzi',
  'prophète': 'profeta',
  'disciple': 'moyekoli',
  'Jésus': 'Yesu',
  'Christ': 'Klisto',
  'Esprit': 'Molimo',
  'Saint': 'Mosantu',
  'vérité': 'bosolo',
  'parole': 'liloba',
  'loi': 'mobeko',
  'péché': 'lisumu',
  'grâce': 'ngolu',
  'amour': 'bolingo',
  'foi': 'kondima',
  'croire': 'kondima',
  'voir': 'komona',
  'entendre': 'koyoka',
  'dire': 'koloba',
  'venir': 'koya',
  'aller': 'kokende',
  'envoyer': 'kotinda',
  'donner': 'kopesa',
  'recevoir': 'kozwa',
  'faire': 'kosala',
  'jour': 'mokolo',
  'nuit': 'butu',
  'heure': 'ngonga',
  'temps': 'ntango',
  'ciel': 'likolo',
  'terre': 'mabele',
  'gloire': 'nkembo',
  'nom': 'nkombo',
  'commencement': 'ebandeli',
  'fin': 'suka',
  'premier': 'ya liboso',
  'dernier': 'ya suka',
  'grand': 'monene',
  'petit': 'moke',
  'bon': 'malamu',
  'mauvais': 'mabe',
  'avec': 'elongo na',
  'sans': 'kozanga',
  'pour': 'mpo na',
  'vers': 'epai ya',
  'de': 'ya',
  'à': 'na',
  'et': 'mpe',
  'ou': 'to',
  'mais': 'kasi',
  'car': 'pamba te',
  'si': 'soki',
  'quand': 'ntango',
  'où': 'wapi',
  'comment': 'ndenge nini',
  'pourquoi': 'mpo na nini',
  'qui': 'nani',
  'que': 'oyo',
  'rendre': 'kozongisa',
  'culte': 'kosalela'
};

function translateStrongWords(chapterNum) {
  const chapterStr = String(chapterNum).padStart(2, '0');
  const rcPath = path.join(__dirname, 'src', 'data', 'bible', 'gospel', 'john', 'chapters', `john-${chapterStr}-rc.js`);
  
  if (!fs.existsSync(rcPath)) {
    return false;
  }
  
  let content = fs.readFileSync(rcPath, 'utf8');
  let translatedCount = 0;
  
  // Trouver tous les mots Strong et les traduire
  Object.entries(strongWordTranslations).forEach(([french, lingala]) => {
    // Pattern pour trouver le mot français dans les objets strong
    const pattern = new RegExp(`"text":\\s*"${french}"`, 'gi');
    const matches = content.match(pattern);
    
    if (matches) {
      content = content.replace(pattern, `"text": "${lingala}"`);
      translatedCount += matches.length;
    }
  });
  
  // Sauvegarder
  fs.writeFileSync(rcPath, content, 'utf8');
  
  return translatedCount;
}

console.log('🔤 TRADUCTION DES MOTS STRONG EN LINGALA');
console.log('=========================================\n');

let totalTranslated = 0;

for (let chapter = 1; chapter <= 21; chapter++) {
  const count = translateStrongWords(chapter);
  if (count !== false) {
    totalTranslated += count;
    console.log(`✅ Chapitre ${chapter}: ${count} mots Strong traduits`);
  }
}

console.log(`\n✨ TERMINÉ! ${totalTranslated} mots Strong traduits en Lingala`);
console.log('   Les objets Strong utilisent maintenant les mots Lingala\n');
