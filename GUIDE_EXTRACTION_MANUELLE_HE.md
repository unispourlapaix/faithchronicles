# 📖 GUIDE D'EXTRACTION MANUELLE - JEAN 7-21 (HÉBREU)

## 🎯 POUR CHAQUE CHAPITRE (7 à 21)

### Étape 1 : Ouvrir la page
- **Jean 7** : https://www.bible.com/bible/323/JHN.7.HHH
- **Jean 8** : https://www.bible.com/bible/323/JHN.8.HHH
- **Jean 9** : https://www.bible.com/bible/323/JHN.9.HHH
- *(etc. jusqu'à 21)*

### Étape 2 : Copier le texte hébreu
1. Sur Bible.com, sélectionnez **tout le texte hébreu** du chapitre
2. Copiez (Ctrl+C)

### Étape 3 : Utiliser le format ci-dessous

```javascript
// Copiez ce template et remplissez les [...] avec le texte hébreu

export const johnChapter7HE = {
  chapter: 7,
  title: "Jean 7",
  version: "Delitzsch Hebrew Gospels",
  language: "he",
  direction: "rtl",
  verses: [
    { "number": 1, "text": "[Verset 1 en hébreu]", "strong": [] },
    { "number": 2, "text": "[Verset 2 en hébreu]", "strong": [] },
    // ... jusqu'au verset 53 pour Jean 7
  ]
};

export default johnChapter7HE;
```

### Étape 4 : Sauvegarder
- **Nom de fichier** : `john-07-he.js` (dans `src/data/bible/gospel/john/chapters/`)
- **Encodage** : UTF-8 obligatoire

---

## 📊 CHAPITRES À FAIRE (15 total)

| # | Chapitre | Versets | Fichier | URL |
|---|----------|---------|---------|-----|
| 1 | Jean 7 | 53 | john-07-he.js | https://www.bible.com/bible/323/JHN.7.HHH |
| 2 | Jean 8 | 59 | john-08-he.js | https://www.bible.com/bible/323/JHN.8.HHH |
| 3 | Jean 9 | 41 | john-09-he.js | https://www.bible.com/bible/323/JHN.9.HHH |
| 4 | Jean 10 | 42 | john-10-he.js | https://www.bible.com/bible/323/JHN.10.HHH |
| 5 | Jean 11 | 57 | john-11-he.js | https://www.bible.com/bible/323/JHN.11.HHH |
| 6 | Jean 12 | 50 | john-12-he.js | https://www.bible.com/bible/323/JHN.12.HHH |
| 7 | Jean 13 | 38 | john-13-he.js | https://www.bible.com/bible/323/JHN.13.HHH |
| 8 | Jean 14 | 31 | john-14-he.js | https://www.bible.com/bible/323/JHN.14.HHH |
| 9 | Jean 15 | 27 | john-15-he.js | https://www.bible.com/bible/323/JHN.15.HHH |
| 10 | Jean 16 | 33 | john-16-he.js | https://www.bible.com/bible/323/JHN.16.HHH |
| 11 | Jean 17 | 26 | john-17-he.js | https://www.bible.com/bible/323/JHN.17.HHH |
| 12 | Jean 18 | 40 | john-18-he.js | https://www.bible.com/bible/323/JHN.18.HHH |
| 13 | Jean 19 | 42 | john-19-he.js | https://www.bible.com/bible/323/JHN.19.HHH |
| 14 | Jean 20 | 31 | john-20-he.js | https://www.bible.com/bible/323/JHN.20.HHH |
| 15 | Jean 21 | 25 | john-21-he.js | https://www.bible.com/bible/323/JHN.21.HHH |

**Total** : 595 versets

---

## 💡 CONSEILS

1. **Faites chapitre par chapitre** - Ne vous précipitez pas
2. **Vérifiez le nombre de versets** - Assurez-vous d'avoir tous les versets
3. **Testez après chaque 2-3 chapitres** - Commande PowerShell de vérification
4. **Sauvegardez en UTF-8** - Essentiel pour les caractères hébreux

---

## ⏱️ TEMPS ESTIMÉ

- **1 chapitre court (20-30 versets)** : 5-7 minutes
- **1 chapitre long (50-60 versets)** : 10-15 minutes
- **Total pour 15 chapitres** : 45-90 minutes

**OU utilisez Claude.ai : 15-30 minutes total !** ⚡

---

## 🔍 VÉRIFICATION

Après chaque chapitre, vérifiez :
```javascript
// Le fichier doit ressembler à ceci (exemple Jean 7, verset 1) :
{
  "number": 1,
  "text": "וַיְהִי אַחֲרֵי הַדְּבָרִים הָאֵלֶּה...", // Texte hébreu complet
  "strong": []
}
```

**PAS de** :
- `[Texte hébreu du verset X]` ← Template vide
- Numéros dans le texte (1, 2, 3...) ← Déjà dans "number"
- Caractères mal encodés (��) ← Problème UTF-8

---

## ✅ VALIDATION FINALE

```powershell
# Exécuter cette commande après avoir complété tous les chapitres
Write-Host "`n📊 VÉRIFICATION HÉBREU`n"; 
$complete = 0; $template = 0; 
for ($i=1; $i -le 21; $i++) { 
  $num = "{0:D2}" -f $i; 
  $file = "src\data\bible\gospel\john\chapters\john-$num-he.js"; 
  $content = Get-Content $file -Raw -Encoding UTF8; 
  if ($content -match 'Texte hébreu') { 
    Write-Host "❌ Jean $num - TEMPLATE"; 
    $template++ 
  } else { 
    Write-Host "✅ Jean $num - COMPLET"; 
    $complete++ 
  } 
}; 
Write-Host "`n📈 Total - $complete complets, $template templates"
```

**Résultat attendu** : "21 complets, 0 templates" ✅
