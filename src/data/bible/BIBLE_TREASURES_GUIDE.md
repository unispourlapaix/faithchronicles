# Guide d'Utilisation - Bible Treasures Module

## Vue d'ensemble

Le module Bible Treasures fournit un système complet de gestion de contenu biblique multilingue pour Faith Chronicles. Il intègre tous les éléments bibliques (versets, faits, clarifications) dans une interface unifiée.

## Structure des Modules

```
src/data/bible/
├── index.js                    # Point d'entrée principal
├── bibleData.js               # Données bibliques de base
├── bibleTreasures.js          # Gestionnaire de trésors bibliques
├── spiritualWisdom.js         # Sagesse spirituelle
├── strongGreek.js             # Dictionnaire Strong
└── translations/
    ├── fr/                    # Traductions françaises
    │   ├── bibleVerses.js
    │   ├── jesusIsNot.js
    │   ├── bibleFacts.js
    │   └── funQuestions.js
    └── en/                    # Traductions anglaises
        ├── bibleVerses.js
        ├── jesusIsNot.js
        ├── bibleFacts.js
        └── funQuestions.js
```

## Utilisation dans les Composants

### Import Simple
```javascript
import { bibleTreasures, bibleData } from '../../data/bible';
```

### Import Spécifique
```javascript
import { 
  bibleTreasures, 
  bibleData,
  bibleVersesFr,
  jesusIsNotEn 
} from '../../data/bible';
```

## API du Module bibleTreasures

### getRandomTreasure()
Retourne un trésor biblique aléatoire selon la langue actuelle.

```javascript
const treasure = bibleTreasures.getRandomTreasure();
console.log(treasure); // { type: 'verse', content: '...', reference: '...' }
```

### getCompleteTreasure(type)
Retourne tous les trésors d'un type spécifique.

```javascript
const allVerses = bibleTreasures.getCompleteTreasure('verse');
const allFacts = bibleTreasures.getCompleteTreasure('fact');
const allClarifications = bibleTreasures.getCompleteTreasure('clarification');
```

### Types de Trésors Disponibles
- `verse` : Versets bibliques
- `fact` : Faits bibliques
- `clarification` : Clarifications sur Jésus
- `fun` : Questions amusantes

## API du Module bibleData

### getRandomJesusIsNotLocalized()
Retourne une clarification sur Jésus dans la langue actuelle.

```javascript
const clarification = bibleData.getRandomJesusIsNotLocalized();
```

### getCurrentLanguage()
Détecte la langue actuelle de l'application.

```javascript
const lang = bibleData.getCurrentLanguage(); // 'fr' ou 'en'
```

### getLocalizedData(dataFr, dataEn)
Retourne les données dans la langue appropriée.

```javascript
const localizedVerses = bibleData.getLocalizedData(versesFr, versesEn);
```

## Intégration dans MenuScreen

Le MenuScreen utilise maintenant le système bibleTreasures pour afficher du contenu biblique :

```javascript
const getBibleTreasure = () => {
  return bibleTreasures.getRandomTreasure();
};
```

## Exemples d'Utilisation

### Afficher un Verset Aléatoire
```javascript
const randomVerse = bibleTreasures.getRandomTreasure('verse');
if (randomVerse.type === 'verse') {
  console.log(`${randomVerse.content} - ${randomVerse.reference}`);
}
```

### Afficher une Clarification sur Jésus
```javascript
const clarification = bibleTreasures.getRandomTreasure('clarification');
if (clarification.type === 'clarification') {
  console.log(`${clarification.title}: ${clarification.content}`);
}
```

### Obtenir Tous les Faits Bibliques
```javascript
const allFacts = bibleTreasures.getCompleteTreasure('fact');
allFacts.forEach(fact => {
  console.log(fact.content);
});
```

## Bonnes Pratiques

1. **Import Centralisé** : Utilisez toujours l'import depuis `../../data/bible`
2. **Gestion des Langues** : Le système détecte automatiquement la langue
3. **Types de Contenu** : Vérifiez toujours le type de trésor retourné
4. **Performance** : Les données sont mises en cache automatiquement

## Dépannage

### Problème : Contenu non traduit
**Solution** : Vérifiez que les fichiers de traduction existent dans `translations/[lang]/`

### Problème : Import non reconnu
**Solution** : Assurez-vous d'utiliser l'import depuis l'index : `from '../../data/bible'`

### Problème : Langue incorrecte
**Solution** : Vérifiez la configuration de `useTranslation()` dans votre composant

## Migration depuis l'Ancien Système

### Avant
```javascript
import { bibleData } from '../../data/bibleData.js';
const treasure = bibleData.getRandomTreasure();
```

### Après
```javascript
import { bibleTreasures } from '../../data/bible';
const treasure = bibleTreasures.getRandomTreasure();
```

## Support Multilingue

Le système supporte nativement :
- 🇫🇷 Français (fr)
- 🇬🇧 Anglais (en)

Ajout de nouvelles langues : Créez un dossier `translations/[code_langue]/` avec tous les fichiers nécessaires.

---

*Ce guide couvre l'utilisation complète du système Bible Treasures intégré dans Faith Chronicles.*