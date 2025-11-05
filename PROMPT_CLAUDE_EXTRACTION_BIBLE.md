# PROMPT POUR CLAUDE - EXTRACTION ÉVANGILE DE JEAN

## CONTEXTE
Tu es un assistant spécialisé dans l'extraction et le formatage de textes bibliques. Tu dois extraire l'Évangile de Jean depuis Bible.com et le formater en fichiers JavaScript pour une application web.

## TÂCHE
Extraire les 21 chapitres de l'Évangile de Jean dans une langue spécifique et créer des fichiers JavaScript formatés.

---

## LANGUE À EXTRAIRE

**Ukrainien (UK)** :
- URL Source : https://www.bible.com/bible/143/JHN.1.UKR
- Version : Ukrainian Bible (Українська Біблія) 1962
- Code langue : `uk`
- Direction texte : `ltr` (left-to-right)
- Chapitres : Jean 1 à 21

OU

**Hébreu (HE)** :
- URL Source : https://www.bible.com/bible/323/JHN.1.HHH
- Version : Delitzsch Hebrew Gospels (הברית החדשה)
- Code langue : `he`
- Direction texte : `rtl` (right-to-left)
- Chapitres : Jean 1 à 21

---

## FORMAT ATTENDU

Pour CHAQUE chapitre, tu dois créer un fichier JavaScript avec cette structure EXACTE :

### Exemple : `john-01-uk.js`

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
    {
      "number": 3,
      "text": "Усе через Нього повстало, і ніщо, що повстало, не повстало без Нього.",
      "strong": []
    }
    // ... continuer pour TOUS les versets du chapitre
  ]
};

export default johnChapter1UK;
```

### Exemple : `john-01-he.js`

```javascript
// ============================================================================
// ÉVANGILE DE JEAN - Delitzsch Hebrew Gospels (הברית החדשה)
// ============================================================================
// Chapitre 1

export const johnChapter1HE = {
  chapter: 1,
  title: "Jean 1",
  version: "Delitzsch Hebrew Gospels",
  language: "he",
  direction: "rtl",
  verses: [
    {
      "number": 1,
      "text": "בְּרֵאשִׁית הָיָה הַדָּבָר וְהַדָּבָר הָיָה עִם־הָאֱלֹהִים וֵאלֹהִים הָיָה הַדָּבָר׃",
      "strong": []
    },
    {
      "number": 2,
      "text": "הוּא הָיָה בְרֵאשִׁית עִם־הָאֱלֹהִים׃",
      "strong": []
    }
    // ... continuer pour TOUS les versets
  ]
};

export default johnChapter1HE;
```

---

## RÈGLES STRICTES

### 1. STRUCTURE JavaScript
- ✅ **Garde EXACTEMENT** la structure JSON fournie
- ✅ Chaque verset DOIT avoir : `number`, `text`, `strong: []`
- ✅ Le tableau `strong` est TOUJOURS vide `[]` (sera rempli plus tard automatiquement)
- ✅ Les guillemets doivent être échappés si présents dans le texte : `"Il dit : \"Viens\""`
- ✅ Export : `export const johnChapter{N}{LANGUE} = {...}`
- ✅ Export default : `export default johnChapter{N}{LANGUE};`

### 2. NOMS DE VARIABLES
- Chapitre 1 UK → `johnChapter1UK`
- Chapitre 2 UK → `johnChapter2UK`
- Chapitre 1 HE → `johnChapter1HE`
- Chapitre 10 HE → `johnChapter10HE`
- Etc.

### 3. NOMS DE FICHIERS
- Format : `john-{NN}-{lang}.js`
- Exemples : `john-01-uk.js`, `john-10-uk.js`, `john-21-uk.js`
- Exemples : `john-01-he.js`, `john-10-he.js`, `john-21-he.js`
- ⚠️ Les numéros de chapitre doivent avoir 2 chiffres : `01`, `02`, ... `21`

### 4. TEXTE BIBLIQUE
- ✅ **Copie EXACTEMENT** le texte tel qu'il apparaît sur Bible.com
- ✅ Garde TOUS les caractères spéciaux (cantillation hébraïque, accents, etc.)
- ✅ Garde la ponctuation originale
- ✅ Supprime les numéros de versets du texte (ils sont déjà dans `"number"`)
- ✅ Trim les espaces en début/fin : `.trim()`

### 5. ENCODAGE
- **UTF-8** obligatoire
- Caractères cyrilliques (UK) : Українська, Біблія, etc.
- Caractères hébreux (HE) : הברית, החדשה, etc.
- Ne PAS échapper les caractères Unicode

---

## ÉTAPES À SUIVRE

### Pour CHAQUE chapitre (1 à 21) :

1. **Accéder à Bible.com**
   - Ukrainien : `https://www.bible.com/bible/143/JHN.{N}.UKR` (remplacer {N} par 1, 2, 3... 21)
   - Hébreu : `https://www.bible.com/bible/323/JHN.{N}.HHH`

2. **Extraire les versets**
   - Copie chaque verset avec son numéro
   - Retire le numéro du texte (il va dans `"number"`)
   - Formate selon le template JSON

3. **Créer le fichier JavaScript**
   - Nom : `john-{NN}-{lang}.js`
   - Contenu : Structure complète avec header, export, etc.

4. **Vérifier**
   - JSON valide (pas d'erreur de syntaxe)
   - Tous les versets présents
   - Texte exact de Bible.com

---

## EXEMPLE COMPLET D'UN CHAPITRE

Voici Jean chapitre 3 en ukrainien pour référence :

```javascript
// ============================================================================
// ÉVANGILE DE JEAN - Ukrainian Bible (Українська Біблія)
// ============================================================================
// Chapitre 3

export const johnChapter3UK = {
  chapter: 3,
  title: "Jean 3",
  version: "Ukrainian Bible 1962",
  language: "uk",
  direction: "ltr",
  verses: [
    {
      "number": 1,
      "text": "Був же один чоловік із фарисеїв, Никодим на ім'я, один із начальників юдейських.",
      "strong": []
    },
    {
      "number": 2,
      "text": "Він прийшов уночі до Ісуса й сказав Йому: Рабби, ми знаємо, що Ти вчитель, що від Бога прийшов, бо ніхто не може тих ознак чинити, що Ти чиниш, як тільки Бог не з ним.",
      "strong": []
    },
    {
      "number": 3,
      "text": "Ісус відповів і промовив до нього: Поправді, поправді кажу тобі: Коли хто не народиться знову, не може він побачити Царства Божого.",
      "strong": []
    },
    // ... versets 4 à 36 ...
    {
      "number": 36,
      "text": "Хто вірує в Сина, той має життя вічне, а хто не вірує в Сина, не побачить життя, але гнів Божий залишається на ньому.",
      "strong": []
    }
  ]
};

export default johnChapter3UK;
```

---

## LIVRABLE ATTENDU

Tu dois me retourner les **21 fichiers complets** :

### Pour l'ukrainien (UK) :
```
john-01-uk.js
john-02-uk.js
john-03-uk.js
...
john-21-uk.js
```

### OU pour l'hébreu (HE) :
```
john-01-he.js
john-02-he.js
john-03-he.js
...
john-21-he.js
```

---

## FORMAT DE RÉPONSE

Pour chaque fichier, présente-le ainsi :

```
### 📄 Fichier : john-01-uk.js

[CODE JAVASCRIPT COMPLET ICI]

---
```

Puis continue avec le fichier suivant.

---

## VÉRIFICATIONS FINALES

Avant de me retourner les fichiers, vérifie que :
- ✅ Les 21 fichiers sont présents (Jean 1 à 21)
- ✅ Chaque fichier a la bonne structure JavaScript
- ✅ Les noms de variables sont corrects (`johnChapter1UK`, `johnChapter2UK`, etc.)
- ✅ Les noms de fichiers sont corrects (`john-01-uk.js`, `john-02-uk.js`, etc.)
- ✅ Tous les versets sont présents dans chaque chapitre
- ✅ Le texte est exact (copié depuis Bible.com)
- ✅ Le JSON est valide (pas d'erreur de syntaxe)
- ✅ Les caractères spéciaux (cyrillique/hébreu) sont préservés
- ✅ `"strong": []` est vide pour tous les versets

---

## COMMENCER L'EXTRACTION

**Langue à extraire** : **he** (hébreu)

**Chapitres à extraire** : **7 à 21** (les chapitres 1-6 sont déjà complets)

**Instructions** :
1. Va sur Bible.com aux URLs suivantes pour chaque chapitre :
   - Chapitre 7 : https://www.bible.com/bible/323/JHN.7.HHH
   - Chapitre 8 : https://www.bible.com/bible/323/JHN.8.HHH
   - Chapitre 9 : https://www.bible.com/bible/323/JHN.9.HHH
   - ... jusqu'au chapitre 21
2. Extrais Jean chapitres **7 à 21** (15 chapitres)
3. Formate selon le template ci-dessus (structure hébreu avec `direction: "rtl"`)
4. Retourne-moi les **15 fichiers complets** (john-07-he.js à john-21-he.js)

**NOMBRE DE VERSETS PAR CHAPITRE** :
- Jean 7 : 53 versets
- Jean 8 : 59 versets
- Jean 9 : 41 versets
- Jean 10 : 42 versets
- Jean 11 : 57 versets
- Jean 12 : 50 versets
- Jean 13 : 38 versets
- Jean 14 : 31 versets
- Jean 15 : 27 versets
- Jean 16 : 33 versets
- Jean 17 : 26 versets
- Jean 18 : 40 versets
- Jean 19 : 42 versets
- Jean 20 : 31 versets
- Jean 21 : 25 versets

**IMPORTANT** : Donne-moi les fichiers UN PAR UN pour éviter les limites de longueur. Commence par Jean 7, puis attends ma confirmation avant de continuer avec Jean 8, etc.

**RAPPEL IMPORTANT** :
- Source : Delitzsch Hebrew Gospels (1877) - **DOMAINE PUBLIC**
- Version : הברית החדשה (Berit Khadasha)
- Direction texte : `"rtl"` (right-to-left)
- Encodage : UTF-8 (préserver TOUS les caractères hébreux)
- Export : `export const johnChapter7HE`, `johnChapter8HE`, etc.

**Commence maintenant avec Jean 7 !** 🚀
