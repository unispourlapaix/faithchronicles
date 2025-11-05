# PROMPT SIMPLE - EXTRACTION HÉBREU JEAN 7-21

## TÂCHE
Crée 15 fichiers JavaScript pour l'Évangile de Jean (chapitres 7 à 21) en hébreu.

## SOURCE
**Version** : Delitzsch Hebrew Gospels  
**URL** : https://www.bible.com/bible/2220/JHN.{N} (remplace {N} par le numéro de chapitre)

## CHAPITRES À EXTRAIRE
- Jean 7 : https://www.bible.com/bible/2220/JHN.7 (53 versets)
- Jean 8 : https://www.bible.com/bible/2220/JHN.8 (59 versets)
- Jean 9 : https://www.bible.com/bible/2220/JHN.9 (41 versets)
- Jean 10 : https://www.bible.com/bible/2220/JHN.10 (42 versets)
- Jean 11 : https://www.bible.com/bible/2220/JHN.11 (57 versets)
- Jean 12 : https://www.bible.com/bible/2220/JHN.12 (50 versets)
- Jean 13 : https://www.bible.com/bible/2220/JHN.13 (38 versets)
- Jean 14 : https://www.bible.com/bible/2220/JHN.14 (31 versets)
- Jean 15 : https://www.bible.com/bible/2220/JHN.15 (27 versets)
- Jean 16 : https://www.bible.com/bible/2220/JHN.16 (33 versets)
- Jean 17 : https://www.bible.com/bible/2220/JHN.17 (26 versets)
- Jean 18 : https://www.bible.com/bible/2220/JHN.18 (40 versets)
- Jean 19 : https://www.bible.com/bible/2220/JHN.19 (42 versets)
- Jean 20 : https://www.bible.com/bible/2220/JHN.20 (31 versets)
- Jean 21 : https://www.bible.com/bible/2220/JHN.21 (25 versets)

## FORMAT DE FICHIER

**Nom** : `john-07-he.js` (07 à 21)

**Structure** :
```javascript
export const johnChapter7HE = {
  chapter: 7,
  title: "Jean 7",
  version: "Delitzsch Hebrew Gospels",
  language: "he",
  direction: "rtl",
  verses: [
    {
      "number": 1,
      "text": "אַחַר הַדְּבָרִים הָאֵלֶּה הָלַךְ יֵשׁוּעַ בְּאֶרֶץ הַגָּלִיל...",
      "strong": []
    },
    {
      "number": 2,
      "text": "וַיִּקְרַב חַג הַיְּהוּדִים חַג הַסֻּכּוֹת׃",
      "strong": []
    }
    // ... tous les versets
  ]
};

export default johnChapter7HE;
```

## RÈGLES
1. ✅ Copie EXACTEMENT le texte hébreu depuis Bible.com (code 2220)
2. ✅ Supprime les numéros de versets du texte (ils sont dans `"number"`)
3. ✅ Garde tous les caractères hébreux (נקודות, טעמים, ponctuation ׃)
4. ✅ `"strong": []` reste vide pour tous les versets
5. ✅ UTF-8 obligatoire
6. ✅ Nom de variable : `johnChapter7HE`, `johnChapter8HE`, etc.

## EXEMPLE JEAN 7 (versets 1-2)

```javascript
export const johnChapter7HE = {
  chapter: 7,
  title: "Jean 7",
  version: "Delitzsch Hebrew Gospels",
  language: "he",
  direction: "rtl",
  verses: [
    {
      "number": 1,
      "text": "אַחַר הַדְּבָרִים הָאֵלֶּה הָלַךְ יֵשׁוּעַ בְּאֶרֶץ הַגָּלִיל הָלוֹךְ וְעָבוֹר כִּי לֹא חָפֵץ לְהִתְהַלֵּךְ בִּיהוּדָה עַל־אֲשֶׁר בִּקְשׁוּ הַיְּהוּדִים לַהֲמִיתוֹ׃",
      "strong": []
    },
    {
      "number": 2,
      "text": "וַיִּקְרַב חַג הַיְּהוּדִים חַג הַסֻּכּוֹת׃",
      "strong": []
    }
    // ... 51 autres versets
  ]
};

export default johnChapter7HE;
```

## COMMENCE

Va sur https://www.bible.com/bible/2220/JHN.7 et crée le fichier `john-07-he.js` avec les 53 versets.

Ensuite continue avec Jean 8, 9, 10... jusqu'à Jean 21.

**Total : 15 fichiers à créer (595 versets)**
