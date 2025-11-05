# SYSTÈME STRONG AVEC OVERLAY INTERACTIF

## 📋 Problème résolu

**Avant** : Les Strong étaient affichés en bloc en dessous de chaque verset, créant des doublons et une surcharge visuelle.

**Après** : Les mots avec Strong sont **cliquables directement** dans le texte. Un overlay apparaît au survol/clic pour afficher la définition.

---

## 🏗️ Architecture

### 1. Structure de données des versets

**Ancienne structure** (❌ abandonnée):
```javascript
{
  "number": 1,
  "text": "Au commencement était la Parole...",
  "strong": ["G3056", "G2316", "G3056", "G2316"]  // Liste globale
}
```

**Nouvelle structure** (✅ active):
```javascript
{
  "number": 1,
  "text": "Au commencement était la Parole, et la Parole était avec Dieu...",
  "words": [
    { "text": "Parole", "strong": "G3056", "start": 25, "end": 31 },
    { "text": "Parole", "strong": "G3056", "start": 39, "end": 45 },
    { "text": "Dieu", "strong": "G2316", "start": 57, "end": 61 },
    { "text": "Parole", "strong": "G3056", "start": 69, "end": 75 },
    { "text": "Dieu", "strong": "G2316", "start": 82, "end": 86 }
  ]
}
```

### 2. Composants créés

#### `StrongWord.jsx`
Composant pour afficher un mot avec Strong number en overlay.

**Props:**
- `word` : Le mot à afficher (ex: "Parole")
- `strongNumber` : Numéro Strong (ex: "G3056")
- `language` : Code langue (fr, en, es...)

**Comportement:**
- Mot souligné en bleu avec pointillés
- Tooltip au clic/hover
- Fermeture en cliquant ailleurs
- Affiche: mot grec/hébreu, translitération, prononciation, définition, usage, étymologie

#### `VerseWithStrong.jsx`
Composant pour construire un verset avec mots Strong interactifs.

**Props:**
- `verse` : Objet verset avec `text` et `words`
- `language` : Code langue

**Fonctionnement:**
1. Parse le verset en segments
2. Insère `<StrongWord>` aux positions indiquées par `start/end`
3. Combine texte normal + mots Strong

---

## 📝 Exemple d'utilisation

### Dans BibleReaderScreen.jsx

```jsx
import VerseWithStrong from '../VerseWithStrong';

// Affichage du verset
<p className="text-sm text-gray-800 leading-relaxed">
  <VerseWithStrong 
    verse={verse} 
    language={currentPassage.language || 'fr'} 
  />
</p>
```

### Résultat visuel

```
Au commencement était la [Parole], et la [Parole] était avec [Dieu], et la [Parole] était [Dieu].
                              ↑ clic                    ↑                      ↑                ↑
                              └─────────────────────────┴──────────────────────┴────────────────┘
                                      Tooltip avec définition Strong
```

---

## 🛠️ Script de conversion

**Fichier:** `convert-strong-to-words.js`

Ce script convertit les fichiers de chapitres de l'ancienne structure à la nouvelle.

**Utilisation:**
```bash
node convert-strong-to-words.js
```

**Note importante:** Le mapping des positions (`start`, `end`) doit être fait **manuellement** pour chaque verset, car il dépend de:
- La langue du texte
- La traduction exacte utilisée
- Les variations orthographiques

### Mapping manuel requis

Pour chaque verset avec Strong, il faut:

1. Identifier les mots qui correspondent aux Strong
2. Calculer leur position dans le texte (caractère de début et de fin)
3. Ajouter au mapping dans le script

**Exemple:**
```javascript
const STRONG_MAPPINGS = {
  'john-01-fr.js': {
    verses: {
      1: {
        text: "Au commencement était la Parole...",
        words: [
          // "Parole" commence au caractère 25, finit à 31
          { text: "Parole", strong: "G3056", start: 25, end: 31 }
        ]
      }
    }
  }
};
```

---

## 🎨 Styles et animations

### CSS ajouté dans `index.css`

```css
@keyframes fadeIn {
  0% { opacity: 0; transform: translateX(-50%) translateY(-5px); }
  100% { opacity: 1; transform: translateX(-50%) translateY(0); }
}

.animate-fadeIn {
  animation: fadeIn 0.2s ease-out;
}
```

### Classes Tailwind utilisées

**Mot Strong:**
- `text-blue-600` : Couleur bleue
- `border-b-2 border-blue-300 border-dotted` : Soulignement pointillé
- `hover:bg-blue-50` : Fond bleu clair au survol
- `cursor-pointer` : Curseur main

**Tooltip:**
- `absolute z-50` : Position absolue au-dessus
- `w-80` : Largeur 320px
- `shadow-xl border-2 border-blue-200` : Ombre et bordure
- `animate-fadeIn` : Animation d'apparition

---

## ✅ Avantages de cette approche

1. **Pas de doublon** : Chaque Strong apparaît uniquement dans le mot correspondant
2. **Interface propre** : Texte normal, seuls les mots avec Strong sont soulignés
3. **Interaction intuitive** : Clic sur le mot → définition
4. **Multilingue** : Fonctionne avec toutes les langues
5. **Performances** : Pas de rendu massif de tous les Strong à la fois
6. **Accessibilité** : Tooltip responsive avec fermeture au clic extérieur

---

## 🚀 Prochaines étapes

### 1. Compléter les mappings

Actuellement, seul **Jean 1:1** a le mapping complet. Il faut:
- Mapper Jean 1:2 à 1:51
- Étendre aux autres chapitres de Jean
- Ajouter d'autres livres bibliques

### 2. Outil de mapping automatique

Créer un outil pour faciliter le mapping:
- Interface visuelle pour sélectionner les mots
- Calcul automatique des positions
- Export JSON

### 3. Intégration dictionnaire grec

Lier le dictionnaire grec (`greek-french-dictionary.json`) aux Strong:
- Afficher le grec original dans le tooltip
- Ajouter la fréquence d'usage
- Lien vers d'autres occurrences

### 4. Export vers autres langues

Adapter les mappings pour:
- `john-01-en.js` (anglais)
- `john-01-es.js` (espagnol)
- `john-01-pt.js` (portugais)
- etc.

---

## 📚 Fichiers modifiés

### Créés
- ✅ `src/components/StrongWord.jsx`
- ✅ `src/components/VerseWithStrong.jsx`
- ✅ `convert-strong-to-words.js`
- ✅ `STRONG_OVERLAY_SYSTEM.md` (ce fichier)

### Modifiés
- ✅ `src/components/screens/BibleReaderScreen.jsx`
  - Import de `VerseWithStrong`
  - Suppression de `renderStrongReferences()`
  - Suppression du bouton toggle Strong
  - Suppression des états `showStrong`, `showStrongPopup`, `selectedStrong`
  
- ✅ `src/data/bible/gospel/john/chapters/john-01-fr.js`
  - Verset 1 : `"strong": [...]` → `"words": [{...}]`

- ✅ `src/index.css`
  - Ajout animation `@keyframes fadeIn`

---

## 🐛 Dépannage

### Le tooltip ne s'affiche pas
- Vérifier que `verse.words` existe et n'est pas vide
- Vérifier que `strong` est présent dans le mot
- Vérifier que le Strong existe dans le dictionnaire

### Les positions sont incorrectes
- Recalculer `start` et `end` manuellement
- Utiliser `console.log(verse.text)` pour voir le texte exact
- Compter depuis 0 (zéro-based index)

### Le Strong ne trouve pas de définition
- Vérifier que le Strong est dans `strongWords.js` (base)
- Vérifier que la traduction existe (ex: `strongTranslationsFR.js`)
- Vérifier le format: "G3056" avec G majuscule

---

## 📖 Ressources

- **Strong Dictionary**: `src/data/bible/strong/`
- **Greek Dictionary**: `src/data/bible/dictionaries/greek-french-dictionary.json`
- **Bible Chapters**: `src/data/bible/gospel/john/chapters/`
- **Components**: `src/components/`

---

**Auteur:** Faith Chronicles Development Team  
**Date:** 3 novembre 2025  
**Version:** 1.0
