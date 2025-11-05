# Documentation - Rubrique Trésors Bibliques

## Vue d'ensemble

La rubrique "Trésors" du système Faith Chronicles offre une collection riche et multilingue de contenus bibliques inspirants. Elle comprend plusieurs types de trésors spirituels organisés de manière thématique.

## Structure des Fichiers de Traduction

### Dossier `faithchronicles\src\data\bible\translations\`

```
translations/
├── fr/                           # Traductions françaises
│   ├── bibleVerses.js           # Versets bibliques inspirants
│   ├── bibleFacts.js            # Faits bibliques intéressants
│   ├── funQuestions.js          # Questions amusantes mais réfléchies
│   ├── jesusIsNot.js           # Clarifications sur Jésus
│   └── bibleTreasures.js       # 🆕 Trésors bibliques spécialisés
└── en/                          # Traductions anglaises
    ├── bibleVerses.js           # Bible verses in English
    ├── bibleFacts.js            # Biblical facts in English
    ├── funQuestions.js          # Fun questions in English
    ├── jesusIsNot.js           # Jesus clarifications in English
    └── bibleTreasures.js       # 🆕 Specialized Bible treasures
```

## Types de Trésors Disponibles

### 1. **Versets Bibliques (bibleVerses.js)**
- **Structure** : Versets avec références Strong
- **Contenu** : 7 versets inspirants par langue
- **Thèmes** : Force, protection, amour, paix, guidance, confiance, témoignage
- **Format** :
```javascript
{
  reference: "Philippiens 4:13",
  text: "Je puis tout par celui qui me fortifie",
  version: "segond1910",
  theme: "force",
  strongNumbers: { /* références Strong */ },
  context: "Explication contextuelle"
}
```

### 2. **Faits Bibliques (bibleFacts.js)**
- **Structure** : Faits intéressants avec sources
- **Contenu** : 7 faits par langue
- **Catégories** : Statistiques, langues, composition, structure, records, symbolisme, vocabulaire
- **Format** :
```javascript
{
  category: "statistiques",
  text: "La Bible contient 31 173 versets au total",
  source: "Analyse textuelle des manuscrits"
}
```

### 3. **Questions Amusantes (funQuestions.js)**
- **Structure** : Questions avec emojis et thèmes
- **Contenu** : 8 questions par langue
- **Style** : Amusant mais spirituellement réfléchi
- **Format** :
```javascript
{
  question: "Si Jésus avait eu un téléphone, qui aurait été son premier contact ?",
  emoji: "📱",
  theme: "relation_divine"
}
```

### 4. **Clarifications sur Jésus (jesusIsNot.js)**
- **Structure** : Clarifications théologiques importantes
- **Contenu** : 19 clarifications par langue
- **Objectif** : Corriger les malentendus sur Jésus
- **Format** :
```javascript
{
  title: "Jésus n'est pas...",
  description: "Clarification théologique",
  biblicalBasis: "Références bibliques",
  importance: "Pourquoi c'est important"
}
```

### 5. **🆕 Trésors Bibliques Spécialisés (bibleTreasures.js)**
- **Structure** : Perles de sagesse avec réflexions
- **Contenu** : 7 trésors par langue
- **Types** : 
  - `perle_sagesse` / `wisdom_pearl`
  - `tresor_divine` / `divine_treasure`
  - `promesse_divine` / `divine_promise`
  - `encouragement`
  - `mystère_foi` / `faith_mystery`
  - `revelation`
  - `heritage_divin` / `divine_heritage`
- **Format** :
```javascript
{
  type: "perle_sagesse",
  content: "Texte du trésor",
  reference: "Référence biblique",
  category: "Catégorie",
  strongNumbers: { /* références Strong */ },
  reflection: "Réflexion spirituelle"
}
```

## API d'Utilisation

### Import des Modules
```javascript
// Import centralisé depuis l'index
import { 
  bibleTreasures, 
  bibleVersesFr, 
  bibleTreasuresEn 
} from '../../data/bible';
```

### Utilisation dans les Composants

#### 1. Obtenir un Trésor Aléatoire
```javascript
const treasure = bibleTreasures.getRandomTreasure();
// Retourne automatiquement dans la langue de l'utilisateur
```

#### 2. Obtenir un Type Spécifique
```javascript
const verse = bibleTreasures.getRandomVerse();
const fact = bibleTreasures.getRandomFact();
const question = bibleTreasures.getRandomFunQuestion();
const specialTreasure = bibleTreasures.getRandomBiblicalTreasure();
```

#### 3. Obtenir Toute une Collection
```javascript
const allVerses = bibleTreasures.getCompleteTreasure('verse');
const allTreasures = bibleTreasures.getCompleteTreasure('bibleTreasures');
```

## Intégration Multilingue

### Détection Automatique de Langue
Le système détecte automatiquement la langue de l'utilisateur via :
- `localStorage.getItem('faithChronicles_language')`
- Langue par défaut : Français (`fr`)
- Langues supportées : `fr`, `en`

### Ajout de Nouvelles Langues

1. **Créer le dossier** : `translations/[code_langue]/`
2. **Ajouter tous les fichiers** :
   - `bibleVerses.js`
   - `bibleFacts.js`
   - `funQuestions.js`
   - `jesusIsNot.js`
   - `bibleTreasures.js`
3. **Mettre à jour** `bibleData.js` et `index.js`

## Utilisation dans MenuScreen

### Intégration Actuelle
```javascript
import { bibleTreasures } from '../../data/bible';

const getBibleTreasure = () => {
  return bibleTreasures.getRandomTreasure();
};
```

### Affichage Contextuel
Le système peut afficher différents types de trésors selon le contexte :
- **Menu principal** : Trésor aléatoire de tous types
- **Écrans de progression** : Versets d'encouragement
- **Pause entre niveaux** : Questions amusantes
- **Écrans de réflexion** : Trésors spécialisés avec réflexions

## Exemples Pratiques

### Afficher un Verset avec Contexte
```javascript
const verse = bibleTreasures.getRandomVerse();
console.log(`${verse.text} - ${verse.reference}`);
console.log(`Contexte: ${verse.context}`);
```

### Afficher un Trésor Spécialisé
```javascript
const treasure = bibleTreasures.getRandomBiblicalTreasure();
console.log(`${treasure.content} (${treasure.reference})`);
console.log(`Réflexion: ${treasure.reflection}`);
```

### Filtrer par Thème
```javascript
const allVerses = bibleTreasures.getCompleteTreasure('verse');
const peaceVerses = allVerses.filter(v => v.theme === 'paix' || v.theme === 'peace');
```

## Performance et Cache

- **Cache automatique** : Les traductions sont mises en cache au chargement
- **Détection de langue** : Une seule fois par session
- **Pas de rechargement** : Les données persistent durant la session

## Maintenance et Évolution

### Ajout de Nouveaux Trésors
1. Éditer les fichiers dans `translations/fr/` et `translations/en/`
2. Maintenir la cohérence des structures
3. Tester dans les deux langues

### Validation des Traductions
- Vérifier la cohérence des références bibliques
- S'assurer que les numéros Strong correspondent
- Maintenir l'équilibre thématique

---

*Cette documentation couvre l'utilisation complète de la rubrique Trésors bibliques dans Faith Chronicles.*