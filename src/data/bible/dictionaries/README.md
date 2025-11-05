# 📖 Dictionnaire Grec Biblique Français

Dictionnaire des mots grecs du Nouveau Testament avec traductions et définitions en français.

## 📊 Contenu

- **31 entrées principales** couvrant les mots théologiques essentiels
- **Caractères grecs authentiques** (ἀγάπη, θεός, λόγος, etc.)
- **Translittérations** pour la prononciation
- **Définitions théologiques** précises en français
- **Numéros Strong** pour références croisées
- **Fréquences d'usage** dans le Nouveau Testament
- **Références bibliques** clés

## 🎯 Mots Clés Inclus

### Concepts Théologiques
- **ἀγάπη** (agapē) - Amour divin
- **πίστις** (pistis) - Foi
- **ἐλπίς** (elpis) - Espérance
- **χάρις** (charis) - Grâce
- **εἰρήνη** (eirēnē) - Paix
- **ἀλήθεια** (alētheia) - Vérité
- **ζωή** (zōē) - Vie éternelle
- **σωτηρία** (sōtēria) - Salut

### Personnes Divines
- **θεός** (theos) - Dieu
- **Ἰησοῦς** (Iēsous) - Jésus
- **Χριστός** (Christos) - Christ
- **κύριος** (kyrios) - Seigneur
- **πνεῦμα** (pneuma) - Esprit
- **πατήρ** (patēr) - Père
- **υἱός** (huios) - Fils

### Termes Ecclésiaux
- **ἐκκλησία** (ekklēsia) - Église
- **μαθητής** (mathētēs) - Disciple
- **ἀπόστολος** (apostolos) - Apôtre
- **προφήτης** (prophētēs) - Prophète
- **διάκονος** (diakonos) - Serviteur/Diacre

### Concepts Spirituels
- **λόγος** (logos) - Parole, Verbe
- **εὐαγγέλιον** (euangelion) - Évangile
- **βασιλεία** (basileia) - Royaume
- **δόξα** (doxa) - Gloire
- **ἁμαρτία** (hamartia) - Péché

## 💻 Utilisation

### Import du module

```javascript
// Import complet
import greekDict from './src/data/bible/dictionaries';

// Import des fonctions spécifiques
import { 
  searchGreek, 
  getByStrong, 
  getMostFrequent 
} from './src/data/bible/dictionaries';
```

### Exemples d'utilisation

#### 1. Rechercher un mot grec
```javascript
// Par caractères grecs
const agape = searchGreek('ἀγάπη');
console.log(agape.meaning); // "amour (divin, inconditionnel)"

// Par translittération
const theos = searchGreek('theos', 'transliteration');
console.log(theos.definition); // "Le Dieu unique et véritable..."

// Par numéro Strong
const logos = getByStrong('G3056');
console.log(logos.greek); // "λόγος"
```

#### 2. Rechercher par signification
```javascript
const amourWords = searchByMeaning('amour');
// Retourne: ἀγάπη, ἀγαπάω, etc.

amourWords.forEach(entry => {
  console.log(`${entry.greek} - ${entry.meaning}`);
});
```

#### 3. Obtenir les mots les plus fréquents
```javascript
const top10 = getMostFrequent(10);
top10.forEach((entry, i) => {
  console.log(`${i+1}. ${entry.greek} (${entry.frequency} fois)`);
});
// 1. θεός (1343 fois)
// 2. Ἰησοῦς (917 fois)
// 3. κύριος (717 fois)
// ...
```

#### 4. Afficher une entrée formatée
```javascript
console.log(formatEntry('θεός'));
/*
📖 θεός (theos)
🔊 Prononciation: thé-os
📝 Signification: Dieu, divinité
📚 Définition: Le Dieu unique et véritable; la Divinité suprême
🔢 Strong: G2316
📊 Fréquence: 1343 fois dans le NT
📖 Références: Jean 1:1, Genèse 1:1
*/
```

#### 5. Statistiques du dictionnaire
```javascript
const stats = getStats();
console.log(`Entrées: ${stats.totalEntries}`);
console.log(`Occurrences totales: ${stats.totalOccurrences}`);
```

#### 6. Recherche dans les définitions
```javascript
const results = searchDefinitions('amour sacrificiel');
results.forEach(entry => {
  console.log(`${entry.greek}: ${entry.meaning}`);
});
```

## 🔍 Recherche Auto-détection

La fonction `searchGreek()` détecte automatiquement le type de recherche:

```javascript
searchGreek('G2316');     // → Détecté: Strong number
searchGreek('θεός');      // → Détecté: Grec
searchGreek('theos');     // → Détecté: Translittération
```

## 📁 Structure des Fichiers

```
src/data/bible/dictionaries/
├── greek-french-dictionary.json    # Dictionnaire principal
├── greek-dictionary-index.json     # Index de recherche
├── index.js                        # Module d'accès
└── README.md                       # Cette documentation
```

## 📋 Format d'Entrée

Chaque mot grec contient:

```javascript
{
  "ἀγάπη": {
    "transliteration": "agapē",          // Romanisation
    "pronunciation": "a-ga-pè",          // Prononciation phonétique
    "meaning": "amour (divin)",          // Signification courte
    "definition": "L'amour parfait...",  // Définition détaillée
    "strong": "G26",                     // Numéro Strong
    "frequency": 116,                    // Occurrences dans le NT
    "references": ["1 Cor 13", "..."]    // Versets clés
  }
}
```

## 🔗 Intégration avec Strong

Ce dictionnaire est conçu pour s'intégrer avec le système Strong existant:

```javascript
import { getStrongDictionary } from '../strong';
import { getByStrong } from '../dictionaries';

// Combiner les deux sources
function getFullGreekInfo(strongNumber) {
  const strongData = getStrongDictionary('fr')[strongNumber];
  const greekData = getByStrong(strongNumber);
  
  return {
    ...strongData,
    ...greekData,
    combined: true
  };
}
```

## 📚 Sources

- **Strong's Greek Dictionary** - Numéros et références
- **Lexiques bibliques français** - Définitions théologiques
- **Nouveau Testament grec** - Fréquences d'usage
- **Domaine public** et ressources CC BY

## 🎯 Utilisation dans l'App

### Affichage dans BibleReader

```javascript
import { searchGreek, formatEntry } from './data/bible/dictionaries';

function showGreekDefinition(greekWord) {
  const entry = searchGreek(greekWord);
  if (entry) {
    return (
      <div className="greek-definition">
        <h3>{greekWord} ({entry.transliteration})</h3>
        <p className="pronunciation">{entry.pronunciation}</p>
        <p className="meaning">{entry.meaning}</p>
        <p className="definition">{entry.definition}</p>
        <span className="strong">Strong: {entry.strong}</span>
        <span className="frequency">{entry.frequency} occurrences</span>
      </div>
    );
  }
}
```

### Enrichir les Strong Numbers

```javascript
// Afficher le mot grec original avec la définition Strong
function enrichStrongDisplay(strongNumber) {
  const greekEntry = getByStrong(strongNumber);
  const strongEntry = getStrongDictionary('fr')[strongNumber];
  
  return {
    strongNumber,
    greekWord: greekEntry?.transliteration,
    greekOriginal: Object.keys(greekDict.entries).find(
      key => greekDict.entries[key].strong === strongNumber
    ),
    meaning: strongEntry?.m,
    definition: strongEntry?.d,
    ...greekEntry
  };
}
```

## 🚀 Extensions Futures

### Ajouter plus d'entrées

```javascript
// Éditer greek-french-dictionary.json
{
  "entries": {
    "νεῦρον": {
      "transliteration": "neuron",
      "pronunciation": "neu-ron",
      "meaning": "nerf, tendon",
      "definition": "Terme anatomique...",
      "strong": "G1234",
      "frequency": 5,
      "references": ["Actes X:Y"]
    }
  }
}
```

Puis relancer:
```bash
node download-greek-dictionary.js
```

## 📖 Références Utiles

- [Blue Letter Bible](https://www.blueletterbible.org/) - Concordances
- [Bible Hub](https://biblehub.com/) - Dictionnaires interlinéaires
- [Perseus Digital Library](http://www.perseus.tufts.edu/) - Grec classique

## 📄 License

Domaine Public / CC BY - Libre d'usage pour projets bibliques

---

**Développé pour Faith Chronicles** 🙏
