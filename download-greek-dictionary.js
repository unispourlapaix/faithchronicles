// Script pour télécharger et formater un dictionnaire grec biblique en français
const https = require('https');
const http = require('http');
const fs = require('fs');

console.log('📖 Téléchargement de dictionnaires grecs bibliques...\n');

// Sources de dictionnaires grecs-français disponibles
const sources = {
  // Dictionnaire Bailly abrégé (domaine public)
  bailly: 'http://www.lexilogos.com/grec/bailly.htm',
  
  // Strong's Greek Dictionary traduit
  strong: 'https://raw.githubusercontent.com/openscriptures/strongs/master/greek/strongsgreek.xml',
  
  // Septuagint lexicon
  lxx: 'https://raw.githubusercontent.com/translatable-exegetical-tools/STEPBible-Data/master/TAGNT%20-%20Translators%20Amalgamated%20Greek%20NT%20-%20STEPBible.org%20CC%20BY.txt'
};

// Fonction pour télécharger un fichier
function download(url, filename) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    
    console.log(`⬇️  Téléchargement depuis: ${url}`);
    
    protocol.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // Redirection
        download(response.headers.location, filename).then(resolve).catch(reject);
        return;
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`Erreur HTTP: ${response.statusCode}`));
        return;
      }
      
      const file = fs.createWriteStream(filename);
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`✅ Téléchargé: ${filename}\n`);
        resolve(filename);
      });
    }).on('error', (err) => {
      fs.unlink(filename, () => {});
      reject(err);
    });
  });
}

// Créer le dossier pour les dictionnaires
const dictDir = 'src/data/bible/dictionaries';
if (!fs.existsSync(dictDir)) {
  fs.mkdirSync(dictDir, { recursive: true });
  console.log(`📁 Dossier créé: ${dictDir}\n`);
}

// Télécharger le dictionnaire Strong en XML
async function downloadStrongGreek() {
  try {
    const filename = `${dictDir}/strongs-greek-raw.xml`;
    await download(sources.strong, filename);
    console.log('📖 Dictionnaire Strong grec téléchargé!');
    return filename;
  } catch (err) {
    console.error('❌ Erreur téléchargement Strong:', err.message);
    return null;
  }
}

// Créer un dictionnaire de base avec les mots grecs courants du NT
function createBasicGreekDictionary() {
  const basicDict = {
    metadata: {
      name: "Dictionnaire Grec Biblique Français",
      description: "Mots grecs du Nouveau Testament avec traductions françaises",
      source: "Compilation Strong + ressources bibliques",
      version: "1.0",
      date: new Date().toISOString(),
      license: "Public Domain / CC BY"
    },
    entries: {
      // Mots théologiques essentiels
      "ἀγάπη": {
        transliteration: "agapē",
        pronunciation: "a-ga-pè",
        meaning: "amour (divin, inconditionnel)",
        definition: "L'amour parfait de Dieu; amour charitable et désintéressé",
        strong: "G26",
        frequency: 116,
        references: ["1 Cor 13", "Jean 3:16", "1 Jean 4:8"]
      },
      "ἀγαπάω": {
        transliteration: "agapaō",
        pronunciation: "a-ga-pa-ô",
        meaning: "aimer (d'un amour divin)",
        definition: "Aimer avec un amour désintéressé et sacrificiel",
        strong: "G25",
        frequency: 143,
        references: ["Jean 3:16", "Matthieu 22:37"]
      },
      "θεός": {
        transliteration: "theos",
        pronunciation: "thé-os",
        meaning: "Dieu, divinité",
        definition: "Le Dieu unique et véritable; la Divinité suprême",
        strong: "G2316",
        frequency: 1343,
        references: ["Jean 1:1", "Genèse 1:1"]
      },
      "λόγος": {
        transliteration: "logos",
        pronunciation: "lo-gos",
        meaning: "parole, verbe, raison",
        definition: "Parole prononcée; la Parole incarnée (Christ); raison divine",
        strong: "G3056",
        frequency: 330,
        references: ["Jean 1:1", "Jean 1:14"]
      },
      "Χριστός": {
        transliteration: "Christos",
        pronunciation: "khris-tos",
        meaning: "Christ, Messie, Oint",
        definition: "Le Messie; celui qui est oint par Dieu",
        strong: "G5547",
        frequency: 529,
        references: ["Matthieu 16:16", "Jean 1:41"]
      },
      "Ἰησοῦς": {
        transliteration: "Iēsous",
        pronunciation: "i-é-sous",
        meaning: "Jésus (Yahvé sauve)",
        definition: "Jésus, le Sauveur; forme grecque de Yeshua/Joshua",
        strong: "G2424",
        frequency: 917,
        references: ["Matthieu 1:21", "Actes 4:12"]
      },
      "πνεῦμα": {
        transliteration: "pneuma",
        pronunciation: "pneu-ma",
        meaning: "esprit, vent, souffle",
        definition: "L'Esprit Saint; esprit humain; vent, souffle",
        strong: "G4151",
        frequency: 385,
        references: ["Jean 4:24", "Actes 2:4"]
      },
      "πίστις": {
        transliteration: "pistis",
        pronunciation: "pis-tis",
        meaning: "foi, confiance, fidélité",
        definition: "Foi en Dieu; confiance; fidélité",
        strong: "G4102",
        frequency: 244,
        references: ["Hébreux 11:1", "Romains 1:17"]
      },
      "πιστεύω": {
        transliteration: "pisteuō",
        pronunciation: "pis-teu-ô",
        meaning: "croire, avoir foi",
        definition: "Croire, faire confiance; avoir foi en",
        strong: "G4100",
        frequency: 241,
        references: ["Jean 3:16", "Romains 10:9"]
      },
      "ἐλπίς": {
        transliteration: "elpis",
        pronunciation: "el-pis",
        meaning: "espérance, attente confiante",
        definition: "Espérance fondée en Dieu; attente confiante",
        strong: "G1680",
        frequency: 54,
        references: ["Romains 5:5", "1 Corinthiens 13:13"]
      },
      "εἰρήνη": {
        transliteration: "eirēnē",
        pronunciation: "ei-rè-nè",
        meaning: "paix, tranquillité",
        definition: "Paix avec Dieu; tranquillité, harmonie",
        strong: "G1515",
        frequency: 92,
        references: ["Jean 14:27", "Philippiens 4:7"]
      },
      "ἀλήθεια": {
        transliteration: "alētheia",
        pronunciation: "a-lè-thei-a",
        meaning: "vérité, réalité",
        definition: "La vérité divine; ce qui est vrai et réel",
        strong: "G225",
        frequency: 109,
        references: ["Jean 8:32", "Jean 14:6"]
      },
      "ζωή": {
        transliteration: "zōē",
        pronunciation: "dzô-è",
        meaning: "vie, existence",
        definition: "Vie éternelle; vie spirituelle en Dieu",
        strong: "G2222",
        frequency: 135,
        references: ["Jean 1:4", "Jean 10:10"]
      },
      "φῶς": {
        transliteration: "phōs",
        pronunciation: "phôs",
        meaning: "lumière",
        definition: "Lumière physique et spirituelle; Dieu est lumière",
        strong: "G5457",
        frequency: 73,
        references: ["Jean 1:4-5", "1 Jean 1:5"]
      },
      "κύριος": {
        transliteration: "kyrios",
        pronunciation: "ku-ri-os",
        meaning: "Seigneur, maître",
        definition: "Seigneur divin; maître, propriétaire",
        strong: "G2962",
        frequency: 717,
        references: ["Philippiens 2:11", "Actes 2:36"]
      },
      "πατήρ": {
        transliteration: "patēr",
        pronunciation: "pa-tèr",
        meaning: "père",
        definition: "Père; Dieu comme Père",
        strong: "G3962",
        frequency: 413,
        references: ["Matthieu 6:9", "Jean 14:6"]
      },
      "υἱός": {
        transliteration: "huios",
        pronunciation: "hui-os",
        meaning: "fils",
        definition: "Fils; le Fils de Dieu",
        strong: "G5207",
        frequency: 377,
        references: ["Matthieu 3:17", "Jean 3:16"]
      },
      "ἄγγελος": {
        transliteration: "angelos",
        pronunciation: "an-gue-los",
        meaning: "ange, messager",
        definition: "Messager; ange céleste",
        strong: "G32",
        frequency: 175,
        references: ["Luc 1:26", "Hébreux 1:14"]
      },
      "ἀμήν": {
        transliteration: "amēn",
        pronunciation: "a-mèn",
        meaning: "amen, en vérité",
        definition: "Ainsi soit-il; en vérité, certainement",
        strong: "G281",
        frequency: 129,
        references: ["Jean 3:3", "Apocalypse 22:20"]
      },
      "χάρις": {
        transliteration: "charis",
        pronunciation: "kha-ris",
        meaning: "grâce, faveur",
        definition: "Grâce divine; faveur imméritée",
        strong: "G5485",
        frequency: 155,
        references: ["Éphésiens 2:8", "2 Corinthiens 12:9"]
      },
      "δόξα": {
        transliteration: "doxa",
        pronunciation: "do-ksa",
        meaning: "gloire, splendeur",
        definition: "Gloire divine; honneur, splendeur",
        strong: "G1391",
        frequency: 166,
        references: ["Jean 1:14", "Romains 3:23"]
      },
      "ἁμαρτία": {
        transliteration: "hamartia",
        pronunciation: "ha-mar-ti-a",
        meaning: "péché, faute",
        definition: "Péché; manquement à la loi de Dieu",
        strong: "G266",
        frequency: 173,
        references: ["Romains 3:23", "1 Jean 1:9"]
      },
      "σωτηρία": {
        transliteration: "sōtēria",
        pronunciation: "sô-tè-ri-a",
        meaning: "salut, délivrance",
        definition: "Salut éternel; délivrance du péché",
        strong: "G4991",
        frequency: 46,
        references: ["Actes 4:12", "Éphésiens 2:8"]
      },
      "βασιλεία": {
        transliteration: "basileia",
        pronunciation: "ba-si-lei-a",
        meaning: "royaume, royauté",
        definition: "Royaume de Dieu; règne royal",
        strong: "G932",
        frequency: 162,
        references: ["Matthieu 6:33", "Marc 1:15"]
      },
      "ἐκκλησία": {
        transliteration: "ekklēsia",
        pronunciation: "ek-klè-si-a",
        meaning: "église, assemblée",
        definition: "L'Église; assemblée des croyants",
        strong: "G1577",
        frequency: 114,
        references: ["Matthieu 16:18", "Actes 2:47"]
      },
      "μαθητής": {
        transliteration: "mathētēs",
        pronunciation: "ma-thè-tès",
        meaning: "disciple, élève",
        definition: "Disciple; suiveur, étudiant",
        strong: "G3101",
        frequency: 261,
        references: ["Matthieu 28:19", "Jean 8:31"]
      },
      "εὐαγγέλιον": {
        transliteration: "euangelion",
        pronunciation: "eu-an-gué-lion",
        meaning: "évangile, bonne nouvelle",
        definition: "L'Évangile; la bonne nouvelle du salut",
        strong: "G2098",
        frequency: 76,
        references: ["Marc 1:1", "Romains 1:16"]
      },
      "ἀπόστολος": {
        transliteration: "apostolos",
        pronunciation: "a-pos-to-los",
        meaning: "apôtre, envoyé",
        definition: "Apôtre; messager envoyé avec autorité",
        strong: "G652",
        frequency: 79,
        references: ["Matthieu 10:2", "Éphésiens 2:20"]
      },
      "προφήτης": {
        transliteration: "prophētēs",
        pronunciation: "pro-phè-tès",
        meaning: "prophète",
        definition: "Prophète; celui qui parle pour Dieu",
        strong: "G4396",
        frequency: 144,
        references: ["Matthieu 13:57", "Actes 3:22"]
      },
      "διάκονος": {
        transliteration: "diakonos",
        pronunciation: "di-a-ko-nos",
        meaning: "serviteur, diacre",
        definition: "Serviteur; ministre, diacre",
        strong: "G1249",
        frequency: 29,
        references: ["Romains 13:4", "1 Timothée 3:8"]
      },
      "ἀρχιερεύς": {
        transliteration: "archiereus",
        pronunciation: "ar-khi-e-reus",
        meaning: "grand prêtre, souverain sacrificateur",
        definition: "Grand prêtre; chef des prêtres",
        strong: "G749",
        frequency: 122,
        references: ["Hébreux 4:14", "Matthieu 26:3"]
      }
    }
  };
  
  const filename = `${dictDir}/greek-french-dictionary.json`;
  fs.writeFileSync(filename, JSON.stringify(basicDict, null, 2), 'utf8');
  console.log(`✅ Dictionnaire grec-français de base créé: ${filename}`);
  console.log(`📊 ${Object.keys(basicDict.entries).length} entrées principales\n`);
  
  return filename;
}

// Créer un index pour recherche rapide
function createSearchIndex(dictFile) {
  const dict = JSON.parse(fs.readFileSync(dictFile, 'utf8'));
  const index = {
    byStrong: {},
    byTransliteration: {},
    byMeaning: {}
  };
  
  for (const [greek, entry] of Object.entries(dict.entries)) {
    // Index par Strong
    if (entry.strong) {
      index.byStrong[entry.strong] = greek;
    }
    
    // Index par translittération
    if (entry.transliteration) {
      index.byTransliteration[entry.transliteration.toLowerCase()] = greek;
    }
    
    // Index par signification (mots-clés)
    const keywords = entry.meaning.toLowerCase().split(/[\s,]+/);
    keywords.forEach(kw => {
      if (kw.length > 2) {
        if (!index.byMeaning[kw]) index.byMeaning[kw] = [];
        index.byMeaning[kw].push(greek);
      }
    });
  }
  
  const indexFile = `${dictDir}/greek-dictionary-index.json`;
  fs.writeFileSync(indexFile, JSON.stringify(index, null, 2), 'utf8');
  console.log(`✅ Index de recherche créé: ${indexFile}\n`);
  
  return indexFile;
}

// Exécution principale
async function main() {
  console.log('🚀 Début du téléchargement et création du dictionnaire grec...\n');
  
  // Télécharger Strong (optionnel, peut échouer)
  await downloadStrongGreek().catch(err => {
    console.log('⚠️  Strong XML non disponible, utilisation du dictionnaire de base');
  });
  
  // Créer dictionnaire de base
  const dictFile = createBasicGreekDictionary();
  
  // Créer index
  const indexFile = createSearchIndex(dictFile);
  
  console.log('✅ Processus terminé!');
  console.log('\n📚 Fichiers créés:');
  console.log(`   - ${dictFile}`);
  console.log(`   - ${indexFile}`);
  console.log('\n💡 Utilisation:');
  console.log('   const dict = require("./src/data/bible/dictionaries/greek-french-dictionary.json");');
  console.log('   console.log(dict.entries["θεός"]);');
}

main().catch(err => {
  console.error('❌ Erreur:', err);
  process.exit(1);
});
