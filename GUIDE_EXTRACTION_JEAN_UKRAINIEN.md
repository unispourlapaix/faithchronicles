# Guide d'Extraction - Évangile de Jean en Ukrainien

## Vue d'ensemble

Ce guide vous explique comment extraire les 21 chapitres de l'Évangile de Jean en ukrainien depuis Bible.com et les convertir automatiquement en fichiers JavaScript formatés.

## Solution créée

Puisque les APIs Bible publiques ne fonctionnent pas de manière fiable, j'ai créé un **script de conversion** qui transforme du texte copié-collé en fichiers JavaScript formatés.

### Fichiers créés

1. **[convert-text-to-john-js.js](convert-text-to-john-js.js)** - Script de conversion principal
2. **bibletxt/ukrainian/** - Dossier pour les fichiers texte source
3. **Exemple** : [bibletxt/ukrainian/john-01.txt](bibletxt/ukrainian/john-01.txt) (3 premiers versets)

## Étapes à suivre

### Étape 1 : Copier le texte depuis Bible.com

Pour chaque chapitre (1 à 21):

1. Ouvrez l'URL correspondante:
   - Jean 1: https://www.bible.com/bible/143/JHN.1.UKR
   - Jean 2: https://www.bible.com/bible/143/JHN.2.UKR
   - Jean 3: https://www.bible.com/bible/143/JHN.3.UKR
   - ... jusqu'à Jean 21

2. **Copiez uniquement le texte des versets** (pas les titres, pas les notes)

3. Collez dans un fichier texte: `bibletxt/ukrainian/john-XX.txt`
   - `john-01.txt` pour Jean 1
   - `john-02.txt` pour Jean 2
   - etc.

### Étape 2 : Format du fichier texte

Le texte peut être dans **deux formats** :

#### Format 1 : Avec numéros de versets (recommandé)

```
1 На початку було Слово, і Слово в Бога було, і Бог було Слово.
2 Воно в Бога було споконвіку.
3 Усе через Нього повстало, і ніщо, що повстало, не повстало без Нього.
4 У Ньому було життя, а життя було світлом людей.
```

#### Format 2 : Sans numéros (détection automatique)

```
На початку було Слово, і Слово в Бога було, і Бог було Слово.
Воно в Бога було споконвіку.
Усе через Нього повстало, і ніщо, що повстало, не повстало без Нього.
У Ньому було життя, а життя було світлом людей.
```

**Note** : Une ligne = un verset

### Étape 3 : Lancer la conversion

Une fois que vous avez créé vos fichiers texte:

```bash
# Convertir tous les chapitres disponibles
node convert-text-to-john-js.js uk

# OU convertir un seul chapitre spécifique
node convert-text-to-john-js.js uk 1
```

### Étape 4 : Vérifier les fichiers générés

Les fichiers JavaScript seront créés dans:
```
src/data/bible/gospel/ukrainian/john-01-uk.js
src/data/bible/gospel/ukrainian/john-02-uk.js
...
src/data/bible/gospel/ukrainian/john-21-uk.js
```

Chaque fichier aura la structure suivante:

```javascript
// ============================================================================
// ÉVANGILE DE JEAN - Ukrainian Bible (Українська Біблія)
// ============================================================================
// Chapitre 1

export const johnChapter1UK = {
  chapter: 1,
  title: "Jean 1",
  version: "Ukrainian Bible 1962",
  language: "uk",
  direction: "ltr",
  verses: [
    {
      "number": 1,
      "text": "На початку було Слово, і Слово в Бога було, і Бог було Слово.",
      "strong": []
    },
    {
      "number": 2,
      "text": "Воно в Бога було споконвіку.",
      "strong": []
    },
    // ... tous les versets
  ]
};

export default johnChapter1UK;
```

## Processus recommandé

### Option A : Tout en une fois (rapide)

1. Ouvrez 21 onglets dans votre navigateur (Jean 1-21)
2. Copiez-collez chaque chapitre dans les fichiers correspondants
3. Lancez: `node convert-text-to-john-js.js uk`
4. Tous les fichiers JS seront créés automatiquement!

### Option B : Chapitre par chapitre

1. Copiez Jean 1 → `bibletxt/ukrainian/john-01.txt`
2. Lancez: `node convert-text-to-john-js.js uk 1`
3. Vérifiez le résultat
4. Répétez pour les chapitres 2-21

## Conseils

### Nettoyage du texte

Si vous copiez depuis Bible.com, assurez-vous de:
- ✅ Supprimer les titres de section
- ✅ Supprimer les notes de bas de page
- ✅ Garder uniquement les versets
- ✅ Un verset par ligne

### Vérification rapide

Après génération, vérifiez:
- Le nombre de versets (Jean 1 = 51 versets, Jean 3 = 36 versets, etc.)
- Les caractères cyrilliques sont bien préservés
- Pas d'erreur de syntaxe JavaScript

### Debugging

Si un chapitre échoue:

```bash
# Voir le message d'erreur détaillé
node convert-text-to-john-js.js uk X
```

Les erreurs communes:
- Fichier vide
- Format incorrect (pas de versets détectés)
- Caractères spéciaux mal encodés

## Alternative: Hébreu

Le script supporte aussi l'hébreu! Même processus:

```bash
# Structure
bibletxt/hebrew/john-01.txt
bibletxt/hebrew/john-02.txt
...

# Conversion
node convert-text-to-john-js.js he

# Output
src/data/bible/gospel/hebrew/john-01-he.js
src/data/bible/gospel/hebrew/john-02-he.js
...
```

Source hébraïque: https://www.bible.com/bible/323/JHN.1.HHH

## Exemple complet

Voici un exemple avec Jean 1:

**Fichier source** : `bibletxt/ukrainian/john-01.txt`
```
1 На початку було Слово, і Слово в Бога було, і Бог було Слово.
2 Воно в Бога було споконвіку.
3 Усе через Нього повстало, і ніщо, що повстало, не повстало без Нього.
```

**Commande** :
```bash
node convert-text-to-john-js.js uk 1
```

**Résultat** : `src/data/bible/gospel/ukrainian/john-01-uk.js`

✅ Fichier JavaScript prêt à être importé dans votre application!

## Aide

Pour afficher l'aide du script:

```bash
node convert-text-to-john-js.js
```

## Résumé

1. 📋 Copiez les versets depuis Bible.com
2. 📝 Collez dans `bibletxt/ukrainian/john-XX.txt`
3. ⚙️ Lancez `node convert-text-to-john-js.js uk`
4. ✅ Récupérez vos fichiers JavaScript formatés!

**Temps estimé** : 20-30 minutes pour les 21 chapitres

---

Bonne extraction! 🚀
