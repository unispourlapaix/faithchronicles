# PROMPT POUR CLAUDE CODE - EXTRACTION ÉVANGILE DE JEAN 7-21 (HÉBREU)

## CONTEXTE
Tu es un assistant spécialisé dans l'extraction et le formatage de textes bibliques. Tu dois extraire les chapitres 7 à 21 de l'Évangile de Jean en hébreu depuis Bible.com et créer des fichiers JavaScript formatés.

**Projet** : FaithChronicles - Application web biblique multilingue

**Situation actuelle** :
- ✅ Chapitres 1-6 en hébreu : COMPLETS (284 versets)
- ⏳ Chapitres 7-21 en hébreu : À EXTRAIRE (595 versets)

---

## TÂCHE PRINCIPALE

Extraire les **15 chapitres restants** (Jean 7 à Jean 21) depuis Bible.com et créer 15 fichiers JavaScript.

---

## SOURCE DES DONNÉES

**Version** : Delitzsch Hebrew Gospels (הברית החדשה) - 1877
**Statut légal** : ✅ DOMAINE PUBLIC (auteur décédé en 1890)
**URL de base** : `https://www.bible.com/bible/323/JHN.X.HHH` (remplacer X par le numéro de chapitre)

### URLs complètes à extraire :

```
Chapitre 7  : https://www.bible.com/bible/323/JHN.7.HHH  (53 versets)
Chapitre 8  : https://www.bible.com/bible/323/JHN.8.HHH  (59 versets)
Chapitre 9  : https://www.bible.com/bible/323/JHN.9.HHH  (41 versets)
Chapitre 10 : https://www.bible.com/bible/323/JHN.10.HHH (42 versets)
Chapitre 11 : https://www.bible.com/bible/323/JHN.11.HHH (57 versets)
Chapitre 12 : https://www.bible.com/bible/323/JHN.12.HHH (50 versets)
Chapitre 13 : https://www.bible.com/bible/323/JHN.13.HHH (38 versets)
Chapitre 14 : https://www.bible.com/bible/323/JHN.14.HHH (31 versets)
Chapitre 15 : https://www.bible.com/bible/323/JHN.15.HHH (27 versets)
Chapitre 16 : https://www.bible.com/bible/323/JHN.16.HHH (33 versets)
Chapitre 17 : https://www.bible.com/bible/323/JHN.17.HHH (26 versets)
Chapitre 18 : https://www.bible.com/bible/323/JHN.18.HHH (40 versets)
Chapitre 19 : https://www.bible.com/bible/323/JHN.19.HHH (42 versets)
Chapitre 20 : https://www.bible.com/bible/323/JHN.20.HHH (31 versets)
Chapitre 21 : https://www.bible.com/bible/323/JHN.21.HHH (25 versets)
```

---

## FORMAT DE FICHIER ATTENDU

Pour **chaque chapitre**, crée un fichier JavaScript avec cette structure EXACTE :

### Nom du fichier
- Format : `john-{NN}-he.js` (NN = numéro à 2 chiffres)
- Exemples : `john-07-he.js`, `john-10-he.js`, `john-21-he.js`

### Contenu du fichier

```javascript
// ============================================================================
// ÉVANGILE DE JEAN - Delitzsch Hebrew Gospels (הברית החדשה)
// ============================================================================
// Chapitre 7

export const johnChapter7HE = {
  chapter: 7,
  title: "Jean 7",
  version: "Delitzsch Hebrew Gospels",
  language: "he",
  direction: "rtl",
  verses: [
    {
      "number": 1,
      "text": "וַיְהִי אַחֲרֵי הַדְּבָרִים הָאֵלֶּה וַיִּתְהַלֵּךְ יֵשׁוּעַ בְּאֶרֶץ הַגָּלִיל כִּי לֹא אָבָה לְהִתְהַלֵּךְ בִּיהוּדָה יַעַן אֲשֶׁר בִּקְשׁוּ הַיְּהוּדִים לַהֲמִיתוֹ׃",
      "strong": []
    },
    {
      "number": 2,
      "text": "[TEXTE HÉBREU DU VERSET 2]",
      "strong": []
    }
    // ... continuer pour TOUS les 53 versets
  ]
};

export default johnChapter7HE;
```

---

## RÈGLES STRICTES

### 1. STRUCTURE JavaScript
- ✅ Garde EXACTEMENT la structure JSON fournie
- ✅ Chaque verset DOIT avoir : `number`, `text`, `strong: []`
- ✅ Le tableau `strong` est TOUJOURS vide `[]` (sera rempli plus tard automatiquement)
- ✅ Échapper les guillemets dans le texte hébreu si nécessaire : `\"` 
- ✅ Export : `export const johnChapter{N}HE = {...}` (N = numéro de chapitre)
- ✅ Export default : `export default johnChapter{N}HE;`

### 2. NOMS DE VARIABLES
- Chapitre 7 → `johnChapter7HE`
- Chapitre 10 → `johnChapter10HE`
- Chapitre 21 → `johnChapter21HE`

### 3. TEXTE HÉBREU
- ✅ **Copie EXACTEMENT** le texte tel qu'il apparaît sur Bible.com
- ✅ Garde TOUS les caractères spéciaux hébreux (נקודות, טעמים, etc.)
- ✅ Garde la ponctuation hébraïque originale (׃ ׀ etc.)
- ✅ **SUPPRIME** les numéros de versets du texte (ils sont déjà dans `"number"`)
- ✅ Trim les espaces en début/fin : `.trim()`
- ✅ Direction texte : TOUJOURS `"rtl"` (right-to-left)

### 4. ENCODAGE
- **UTF-8** obligatoire
- **NE PAS** échapper les caractères Unicode hébreux
- Les caractères doivent apparaître tels quels : `בְּרֵאשִׁית`, `אֱלֹהִים`, etc.

---

## MÉTHODOLOGIE RECOMMANDÉE

### Option A : Extraction web automatisée (si possible)
1. Utilise un web scraper ou fetch pour accéder aux URLs
2. Parse le contenu HTML pour extraire le texte hébreu
3. Génère automatiquement les 15 fichiers

### Option B : Extraction manuelle assistée
1. Demande à l'utilisateur de copier-coller le texte hébreu de chaque chapitre
2. Parse le texte pour séparer les versets
3. Génère les fichiers JavaScript

### Option C : Utilisation d'API Bible.com (si disponible)
1. Vérifie si Bible.com a une API publique
2. Utilise l'API pour récupérer le texte
3. Génère les fichiers

---

## EXEMPLE COMPLET : JEAN 7, VERSETS 1-3

```javascript
// ============================================================================
// ÉVANGILE DE JEAN - Delitzsch Hebrew Gospels (הברית החדשה)
// ============================================================================
// Chapitre 7

export const johnChapter7HE = {
  chapter: 7,
  title: "Jean 7",
  version: "Delitzsch Hebrew Gospels",
  language: "he",
  direction: "rtl",
  verses: [
    {
      "number": 1,
      "text": "וַיְהִי אַחֲרֵי הַדְּבָרִים הָאֵלֶּה וַיִּתְהַלֵּךְ יֵשׁוּעַ בְּאֶרֶץ הַגָּלִיל כִּי לֹא אָבָה לְהִתְהַלֵּךְ בִּיהוּדָה יַעַן אֲשֶׁר בִּקְשׁוּ הַיְּהוּדִים לַהֲמִיתוֹ׃",
      "strong": []
    },
    {
      "number": 2,
      "text": "וְחַג הַסֻּכּוֹת לַיהוּדִים קָרוֹב׃",
      "strong": []
    },
    {
      "number": 3,
      "text": "וַיֹּאמְרוּ אֵלָיו אֶחָיו צֵא מִזֶּה וְלֵךְ לִיהוּדָה לְמַעַן יִרְאוּ גַם־תַּלְמִידֶיךָ אֶת־מַעֲשֶׂיךָ אֲשֶׁר אַתָּה עֹשֶׂה׃",
      "strong": []
    }
    // ... continuer jusqu'au verset 53
  ]
};

export default johnChapter7HE;
```

---

## FICHIERS À CRÉER

Crée ces 15 fichiers dans le répertoire : `src/data/bible/gospel/john/chapters/`

```
john-07-he.js  (53 versets)
john-08-he.js  (59 versets)
john-09-he.js  (41 versets)
john-10-he.js  (42 versets)
john-11-he.js  (57 versets)
john-12-he.js  (50 versets)
john-13-he.js  (38 versets)
john-14-he.js  (31 versets)
john-15-he.js  (27 versets)
john-16-he.js  (33 versets)
john-17-he.js  (26 versets)
john-18-he.js  (40 versets)
john-19-he.js  (42 versets)
john-20-he.js  (31 versets)
john-21-he.js  (25 versets)
```

**Total** : 595 versets à extraire

---

## VÉRIFICATIONS AVANT LIVRAISON

Avant de créer les fichiers, vérifie que :
- ✅ Les 15 fichiers sont prêts (Jean 7 à 21)
- ✅ Chaque fichier a la bonne structure JavaScript
- ✅ Les noms de variables sont corrects (`johnChapter7HE`, `johnChapter8HE`, etc.)
- ✅ Les noms de fichiers sont corrects (`john-07-he.js`, `john-08-he.js`, etc.)
- ✅ Tous les versets sont présents dans chaque chapitre (vérifier le compte)
- ✅ Le texte hébreu est complet (pas de `[...]` ou placeholder)
- ✅ Le JSON est valide (pas d'erreur de syntaxe)
- ✅ Les caractères hébreux sont préservés (UTF-8)
- ✅ `"strong": []` est vide pour tous les versets
- ✅ `"direction": "rtl"` est présent dans chaque fichier

---

## COMMENCER L'EXTRACTION

**Commence avec Jean 7**, puis continue avec Jean 8, 9, etc.

Si tu ne peux pas accéder directement aux URLs :
1. Demande-moi de copier le texte hébreu du chapitre
2. Parse le texte que je fournis
3. Génère le fichier JavaScript

**Procède chapitre par chapitre pour assurer la qualité.**

---

## NOTES IMPORTANTES

- **Domaine public confirmé** : Delitzsch Hebrew Gospels (1877) - Aucun problème de copyright
- **Cohérence** : Cette version correspond aux chapitres 1-6 déjà créés
- **Encodage** : UTF-8 obligatoire pour les caractères hébreux
- **Direction** : RTL (right-to-left) pour l'affichage hébreu
- **Strong numbers** : Laissés vides `[]` - seront ajoutés plus tard avec `npm run add-strong he`

---

## COMMENCE MAINTENANT

Extrais Jean chapitre 7 depuis https://www.bible.com/bible/323/JHN.7.HHH et crée le fichier `john-07-he.js`.

Si tu rencontres un problème d'accès à Bible.com, indique-le moi et je te fournirai le texte hébreu directement.

**LET'S GO! 🚀**
