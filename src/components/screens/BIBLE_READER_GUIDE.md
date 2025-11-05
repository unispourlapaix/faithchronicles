# Bible Reader - Documentation Multilingue

## Vue d'ensemble

Le Bible Reader de Faith Chronicles est maintenant entièrement multilingue, prenant en charge l'affichage automatique des passages bibliques dans la langue de l'utilisateur.

## Fonctionnalités

### 🌍 **Support Multilingue**
- **Français** : Louis Segond 1910
- **Anglais** : New King James Version
- **Détection automatique** de la langue utilisateur
- **Interface traduite** dans les deux langues

### 📚 **Passages Disponibles**

#### Ancien Testament
- **Genèse 1** : La Création du monde / The Creation of the World
- **Psaume 23** : L'Éternel est mon berger / The Lord is My Shepherd

#### Nouveau Testament
- **Jean 3** : Jésus et Nicodème / Jesus and Nicodemus
- **Philippiens 4** : La paix de Dieu / The Peace of God

### 🔍 **Références Strong**
- **Dictionnaire intégré** avec plus de 5000 références
- **Définitions complètes** : mot original, translittération, prononciation
- **Popup détaillé** pour chaque référence
- **Étymologie et usage biblique**

### ⚡ **Fonctionnalités Interactives**
- **Navigation fluide** entre les passages
- **Mode Strong activable/désactivable**
- **Interface responsive** avec animations
- **Sons de navigation** intégrés

## Structure des Fichiers

```
src/data/bible/translations/
├── fr/
│   └── biblePassages.js    # Passages français (LSG 1910)
└── en/
    └── biblePassages.js    # Passages anglais (NKJV)
```

## Format des Passages

Chaque passage suit cette structure :

```javascript
{
  "Passage_ID": {
    book: "Nom du livre",
    chapter: 1,
    title: "Titre du passage",
    verses: [
      { 
        number: 1, 
        text: "Texte du verset",
        strong: ["H7225", "G2316"] // Références Strong
      }
    ]
  }
}
```

## API d'Utilisation

### Obtenir tous les passages
```javascript
const passages = bibleData.getAllPassages();
// Retourne automatiquement les passages dans la langue courante
```

### Obtenir un passage spécifique
```javascript
const passage = bibleData.getPassage("Genese_1");
// Version française ou anglaise selon la langue
```

### Obtenir un passage aléatoire
```javascript
const randomPassage = bibleData.getRandomPassage();
```

## Clés de Traduction UI

Le BibleReader utilise ces clés de traduction :

```javascript
// Clés principales
t('bible.readerTitle')      // "📖 Lecteur Bible" / "📖 Bible Reader"
t('bible.loading')          // "Chargement..." / "Loading..."
t('bible.menu')             // "Menu" / "Menu"
t('bible.strong')           // "Strong" / "Strong"

// Références Strong
t('bible.strongReferences') // "Références Strong" / "Strong References"
t('bible.strongDefinition') // "Référence Strong" / "Strong Reference"
t('bible.word')             // "Mot original" / "Original word"
t('bible.meaning')          // "Signification" / "Meaning"
t('bible.definition')       // "Définition complète" / "Complete definition"
t('bible.usage')            // "Usage biblique" / "Biblical usage"
t('bible.etymology')        // "Étymologie" / "Etymology"
t('bible.close')            // "Fermer" / "Close"
```

## Utilisation dans les Composants

### Import
```javascript
import { bibleData } from '../../data/bible';
```

### Chargement des passages
```javascript
useEffect(() => {
  const passages = bibleData.getAllPassages();
  setAvailablePassages(passages);
  if (passages.length > 0) {
    setCurrentPassage(passages[0]);
  }
}, []);
```

### Navigation
```javascript
const navigatePassage = (direction) => {
  const newIndex = direction === 'next' 
    ? Math.min(currentIndex + 1, availablePassages.length - 1)
    : Math.max(currentIndex - 1, 0);
  
  setCurrentIndex(newIndex);
  setCurrentPassage(availablePassages[newIndex]);
};
```

## Ajout de Nouveaux Passages

### 1. Ajouter en français
Éditez `src/data/bible/translations/fr/biblePassages.js` :

```javascript
"Nouveau_Passage": {
  book: "Livre",
  chapter: 1,
  title: "Titre français",
  verses: [
    { number: 1, text: "Texte français", strong: ["H1234"] }
  ]
}
```

### 2. Ajouter en anglais
Éditez `src/data/bible/translations/en/biblePassages.js` :

```javascript
"Nouveau_Passage": {  // Même ID que le français
  book: "Book",
  chapter: 1,
  title: "English title",
  verses: [
    { number: 1, text: "English text", strong: ["H1234"] }
  ]
}
```

### 3. Cohérence requise
- **Même ID** pour les deux langues
- **Mêmes numéros de versets**
- **Mêmes références Strong**
- **Structure identique**

## Performance

### Cache Automatique
- Les passages sont chargés une seule fois
- La langue est détectée au démarrage
- Pas de rechargement lors du changement de passage

### Optimisations
- Références Strong limitées à 3 par verset dans l'affichage
- Lazy loading des définitions Strong complètes
- Animations CSS optimisées

## Références Strong

### Format
- **Hébreu** : H1234 (Ancien Testament)
- **Grec** : G1234 (Nouveau Testament)

### Données disponibles
- Mot original dans la langue source
- Translittération en caractères latins
- Prononciation phonétique
- Signification et définition complète
- Usage biblique et étymologie

## Maintenance

### Validation des traductions
1. Vérifier la cohérence des IDs
2. S'assurer que tous les passages ont leur équivalent
3. Valider les références Strong
4. Tester dans les deux langues

### Ajout de langues
Pour ajouter une nouvelle langue :
1. Créer le dossier `translations/[langue]/`
2. Créer `biblePassages.js` avec la même structure
3. Mettre à jour `bibleData.js` et `index.js`
4. Ajouter les traductions UI correspondantes

---

*Le Bible Reader Faith Chronicles offre une expérience de lecture biblique moderne et multilingue avec des outils d'étude intégrés.*