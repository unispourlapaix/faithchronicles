# Système Strong Multilingue

## 📁 Structure

```
strong/
├── base/
│   └── strongWords.js          # Données neutres (grec/hébreu, translittération, prononciation)
├── fr/
│   └── strongTranslations.js   # Traductions françaises (m, d, u, e)
├── en/
│   └── strongTranslations.js   # Traductions anglaises (à venir)
├── es/
│   └── strongTranslations.js   # Traductions espagnoles (à venir)
└── index.js                    # Combine base + traductions
```

## 🎯 Avantages

### ✅ Séparation des préoccupations
- **Base** : Données neutres (grec/hébreu) - jamais modifiées
- **Traductions** : Seulement le texte à traduire - facile à gérer

### ✅ IDs courts pour réduire la taille
- `m` = meaning (sens)
- `d` = definition (définition)
- `u` = usage (utilisation)
- `e` = etymology (étymologie)

### ✅ Multilingue facile
Ajouter une langue = créer un fichier de traduction
```javascript
// strong/es/strongTranslations.js
export const strongTranslationsES = {
  "G25": {
    m: "amar con amor divino e incondicional",
    d: "Amar con amor desinteresado...",
    u: "Usado 143 veces en el NT...",
    e: "De ἄγω (ago) = conducir..."
  }
};
```

## 📖 Utilisation

### Import simple (français par défaut)
```javascript
import { strongGreek } from './data/bible/strong/index.js';

console.log(strongGreek["G25"]);
// {
//   word: "ἀγαπάω",
//   transliteration: "agapao",
//   pronunciation: "ag-ap-ah'-o",
//   meaning: "aimer d'un amour divin et inconditionnel",
//   definition: "Aimer avec un amour désintéressé...",
//   usage: "Utilisé 143 fois dans le NT...",
//   etymology: "De ἄγω (ago) = conduire..."
// }
```

### Changer de langue
```javascript
import { getStrongDictionary } from './data/bible/strong/index.js';

const strongEN = getStrongDictionary('en');
const strongES = getStrongDictionary('es');
```

### Accès direct aux données de base
```javascript
import { strongWordsBase } from './data/bible/strong/base/strongWords.js';

console.log(strongWordsBase["G25"]);
// { word: "ἀγαπάω", transliteration: "agapao", pronunciation: "ag-ap-ah'-o" }
```

## 🔄 Migration depuis strongGreek.js

L'ancien fichier `strongGreek.js` reste compatible :
```javascript
// Avant
import { strongGreek } from './data/bible/strongGreek.js';

// Maintenant (même résultat)
import { strongGreek } from './data/bible/strong/index.js';
```

## 📊 Statistiques

- **Base** : 217 entrées Strong (G + H)
- **Traduction FR** : 10 entrées complètes (à étendre)
- **Réduction** : ~70% moins de texte à traduire par langue

## 🌍 Ajouter une traduction

1. Créer `strong/[lang]/strongTranslations.js`
2. Copier la structure depuis `fr/strongTranslations.js`
3. Traduire uniquement les valeurs `m`, `d`, `u`, `e`
4. Ajouter dans `index.js` :
```javascript
import { strongTranslations[LANG] } from './[lang]/strongTranslations.js';
const translations = {
  fr: strongTranslationsFR,
  [lang]: strongTranslations[LANG]
};
```

## 📝 Format des IDs

- **m** (meaning) : Traduction courte, sens principal
- **d** (definition) : Définition complète et détaillée
- **u** (usage) : Fréquence et contexte d'utilisation biblique
- **e** (etymology) : Origine et racines du mot

## ⚡ Performance

- Chargement lazy possible par langue
- Base partagée entre toutes les langues
- Réduction mémoire : pas de duplication du grec/translittération
