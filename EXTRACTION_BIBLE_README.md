# Extraction Bible - Évangile de Jean Multi-Langues

Solution complète pour extraire et formater l'Évangile de Jean dans 13 langues.

## Vue d'ensemble rapide

### Ce qui a été créé

1. **[convert-text-to-john-js.js](convert-text-to-john-js.js)** - Script de conversion universel
2. **[BIBLE_URLS_REFERENCE.md](BIBLE_URLS_REFERENCE.md)** - URLs Bible.com pour toutes les langues
3. **[GUIDE_EXTRACTION_JEAN_UKRAINIEN.md](GUIDE_EXTRACTION_JEAN_UKRAINIEN.md)** - Guide détaillé (applicable à toutes les langues)

### Langues supportées (13)

| Code | Langue | Version | Direction |
|------|--------|---------|-----------|
| `fr` | 🇫🇷 Français | Louis Segond 1910 | LTR |
| `en` | 🇬🇧 Anglais | King James Version | LTR |
| `es` | 🇪🇸 Espagnol | Reina Valera 1960 | LTR |
| `de` | 🇩🇪 Allemand | Luther Bibel 1912 | LTR |
| `it` | 🇮🇹 Italien | Nuova Riveduta 2006 | LTR |
| `pt` | 🇵🇹 Portugais | João Ferreira de Almeida | LTR |
| `ru` | 🇷🇺 Russe | Russian Synodal Version | LTR |
| `uk` | 🇺🇦 Ukrainien | Ukrainian Bible 1962 | LTR |
| `he` | 🇮🇱 Hébreu | Delitzsch Hebrew Gospels | **RTL** |
| `ar` | 🇸🇦 Arabe | Arabic Van Dyck | **RTL** |
| `zh` | 🇨🇳 Chinois | Chinese Union Version | LTR |
| `jp` | 🇯🇵 Japonais | Japanese Living Bible | LTR |
| `ko` | 🇰🇷 Coréen | Korean Revised Version | LTR |

## Utilisation rapide

### Étape 1: Créer le dossier pour la langue

```bash
mkdir -p bibletxt/<langue>
```

Exemples:
```bash
mkdir -p bibletxt/ukrainian
mkdir -p bibletxt/french
mkdir -p bibletxt/spanish
```

### Étape 2: Copier le texte depuis Bible.com

Pour chaque chapitre (1 à 21):

1. Ouvrir l'URL dans [BIBLE_URLS_REFERENCE.md](BIBLE_URLS_REFERENCE.md)
2. Copier le texte des versets (uniquement)
3. Coller dans `bibletxt/<langue>/john-XX.txt`

**Format du fichier texte** (une ligne = un verset):
```
1 На початку було Слово, і Слово в Бога було, і Бог було Слово.
2 Воно в Бога було споконвіку.
3 Усе через Нього повстало, і ніщо, що повстало, не повстало без Нього.
```

### Étape 3: Lancer la conversion

```bash
# Convertir tous les chapitres disponibles
node convert-text-to-john-js.js <code_langue>

# OU convertir un chapitre spécifique
node convert-text-to-john-js.js <code_langue> <numéro_chapitre>
```

Exemples:
```bash
node convert-text-to-john-js.js uk       # Tous les chapitres ukrainiens
node convert-text-to-john-js.js fr 1     # Jean 1 en français
node convert-text-to-john-js.js es       # Tous les chapitres espagnols
```

### Étape 4: Récupérer les fichiers générés

Les fichiers JavaScript seront dans:
```
src/data/bible/gospel/<langue>/john-01-<code>.js
src/data/bible/gospel/<langue>/john-02-<code>.js
...
src/data/bible/gospel/<langue>/john-21-<code>.js
```

## Exemples d'utilisation

### Exemple 1: Extraire Jean en ukrainien

```bash
# 1. Créer le dossier
mkdir -p bibletxt/ukrainian

# 2. Copier les chapitres 1-21 depuis:
#    https://www.bible.com/bible/143/JHN.1.UKR
#    https://www.bible.com/bible/143/JHN.2.UKR
#    ... jusqu'à JHN.21.UKR

# 3. Coller dans bibletxt/ukrainian/john-01.txt à john-21.txt

# 4. Convertir
node convert-text-to-john-js.js uk

# 5. Résultat
# ✅ 21 fichiers créés dans src/data/bible/gospel/ukrainian/
```

### Exemple 2: Extraire Jean 3 en français

```bash
# 1. Créer le dossier
mkdir -p bibletxt/french

# 2. Copier Jean 3 depuis:
#    https://www.bible.com/bible/93/JHN.3.LSG

# 3. Coller dans bibletxt/french/john-03.txt

# 4. Convertir uniquement ce chapitre
node convert-text-to-john-js.js fr 3

# 5. Résultat
# ✅ john-03-fr.js créé dans src/data/bible/gospel/french/
```

### Exemple 3: Extraire toutes les langues

```bash
# 1. Créer tous les dossiers
mkdir -p bibletxt/{french,english,spanish,german,italian,portuguese,russian,ukrainian,hebrew,arabic,chinese,japanese,korean}

# 2. Copier les 21 chapitres pour chaque langue depuis Bible.com
#    (voir BIBLE_URLS_REFERENCE.md pour les URLs)

# 3. Convertir toutes les langues
node convert-text-to-john-js.js fr
node convert-text-to-john-js.js en
node convert-text-to-john-js.js es
node convert-text-to-john-js.js de
node convert-text-to-john-js.js it
node convert-text-to-john-js.js pt
node convert-text-to-john-js.js ru
node convert-text-to-john-js.js uk
node convert-text-to-john-js.js he
node convert-text-to-john-js.js ar
node convert-text-to-john-js.js zh
node convert-text-to-john-js.js jp
node convert-text-to-john-js.js ko

# 4. Résultat
# ✅ 273 fichiers JavaScript créés (21 chapitres × 13 langues)
```

## Format de sortie

Chaque fichier JavaScript généré a cette structure:

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
    }
    // ... tous les versets
  ]
};

export default johnChapter1UK;
```

## Nommage des variables

Le script génère automatiquement les noms corrects:

| Langue | Variable pour Jean 1 | Variable pour Jean 10 |
|--------|---------------------|----------------------|
| Français | `johnChapter1FR` | `johnChapter10FR` |
| Anglais | `johnChapter1EN` | `johnChapter10EN` |
| Espagnol | `johnChapter1ES` | `johnChapter10ES` |
| Ukrainien | `johnChapter1UK` | `johnChapter10UK` |
| Hébreu | `johnChapter1HE` | `johnChapter10HE` |

## Vérification

### Nombre de versets par chapitre

Pour vérifier que l'extraction est complète:

| Chapitre | Versets | Chapitre | Versets | Chapitre | Versets |
|----------|---------|----------|---------|----------|---------|
| Jean 1 | 51 | Jean 8 | 59 | Jean 15 | 27 |
| Jean 2 | 25 | Jean 9 | 41 | Jean 16 | 33 |
| Jean 3 | 36 | Jean 10 | 42 | Jean 17 | 26 |
| Jean 4 | 54 | Jean 11 | 57 | Jean 18 | 40 |
| Jean 5 | 47 | Jean 12 | 50 | Jean 19 | 42 |
| Jean 6 | 71 | Jean 13 | 38 | Jean 20 | 31 |
| Jean 7 | 53 | Jean 14 | 31 | Jean 21 | 25 |

**Total**: 879 versets

### Liste de vérification

Pour chaque langue extraite:
- ✅ 21 fichiers texte créés dans `bibletxt/<langue>/`
- ✅ Format correct (une ligne = un verset)
- ✅ Encodage UTF-8
- ✅ 21 fichiers JavaScript générés dans `src/data/bible/gospel/<langue>/`
- ✅ Nombre de versets correct pour chaque chapitre
- ✅ Caractères spéciaux préservés (cyrillique, hébreu, arabe, etc.)
- ✅ Pas d'erreur de syntaxe JavaScript

## Aide

Pour afficher toutes les langues disponibles:

```bash
node convert-text-to-john-js.js
```

Résultat:
```
LANGUES DISPONIBLES (13 langues):
  fr    Louis Segond 1910
  en    King James Version
  es    Reina Valera 1960
  de    Luther Bibel 1912
  it    Nuova Riveduta 2006
  pt    João Ferreira de Almeida
  ru    Russian Synodal Version
  uk    Ukrainian Bible 1962
  he    Delitzsch Hebrew Gospels
  ar    Arabic Van Dyck
  zh    Chinese Union Version
  jp    Japanese Living Bible
  ko    Korean Revised Version
```

## Ajouter une nouvelle langue

Pour ajouter une langue non supportée:

1. Ouvrir [convert-text-to-john-js.js](convert-text-to-john-js.js)
2. Ajouter une entrée dans `CONFIG`:

```javascript
const CONFIG = {
  // ... langues existantes ...

  xx: {  // Code langue (2 lettres)
    language: 'xx',
    languageName: 'XX',  // Code MAJUSCULES
    version: 'Nom de la version',
    fullName: 'Nom complet (Langue native)',
    direction: 'ltr',  // ou 'rtl' pour langues droite-à-gauche
    inputDir: 'bibletxt/nom_langue',
    outputDir: 'src/data/bible/gospel/nom_langue'
  }
};
```

3. Utiliser: `node convert-text-to-john-js.js xx`

## Ressources

- **[BIBLE_URLS_REFERENCE.md](BIBLE_URLS_REFERENCE.md)** - URLs complètes pour toutes les langues
- **[GUIDE_EXTRACTION_JEAN_UKRAINIEN.md](GUIDE_EXTRACTION_JEAN_UKRAINIEN.md)** - Guide détaillé étape par étape
- **Bible.com** - Source des textes bibliques

## Temps estimé

- **1 langue, 1 chapitre**: 2-3 minutes
- **1 langue, 21 chapitres**: 20-30 minutes
- **13 langues, 21 chapitres**: 4-6 heures

## Support

Pour toute question ou problème:
1. Vérifier le format des fichiers texte
2. S'assurer que les fichiers sont en UTF-8
3. Vérifier que les numéros de versets sont corrects
4. Consulter les guides détaillés

---

**Statut actuel**:
- ✅ Script créé et testé
- ✅ 13 langues configurées
- ✅ Documentation complète
- ✅ Exemple ukrainien validé (Jean 1, 3 versets)

**Prêt à l'emploi!** 🚀
