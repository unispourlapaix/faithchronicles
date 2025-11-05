# 📖 INSTRUCTIONS - EXTRACTION JEAN 7-21 (HÉBREU)

## 🎯 OBJECTIF
Extraire les chapitres 7 à 21 de l'Évangile de Jean en hébreu pour compléter la traduction hébraïque.

---

## ✅ STATUT ACTUEL
- **Chapitres 1-6** : ✅ COMPLETS (284 versets)
- **Chapitres 7-21** : ⏳ À EXTRAIRE (595 versets)
- **Total** : 6/21 chapitres (28.6% complet)

---

## 🚀 MÉTHODE RECOMMANDÉE

### Option A : Utiliser Claude.ai (RECOMMANDÉ) ⭐

1. **Ouvrir Claude.ai** : https://claude.ai/
2. **Copier le prompt** : Fichier `PROMPT_CLAUDE_EXTRACTION_BIBLE.md` (déjà mis à jour)
3. **Coller dans Claude.ai** et envoyer
4. **Récupérer les fichiers** un par un (Jean 7, puis 8, puis 9...)
5. **Copier le code JavaScript** dans les fichiers existants

### Option B : Extraction manuelle

1. Aller sur https://www.bible.com/bible/323/JHN.7.HHH
2. Copier chaque verset
3. Formater selon le template dans `PROMPT_CLAUDE_EXTRACTION_BIBLE.md`
4. Répéter pour chapitres 8 à 21

### Option C : Script Python (Avancé)

1. Étendre `scripts/fill_hebrew_chapters.py`
2. Ajouter les données des chapitres 7-21
3. Exécuter : `python scripts/fill_hebrew_chapters.py`

---

## 📊 CHAPITRES À EXTRAIRE

| Chapitre | Versets | Fichier | URL |
|----------|---------|---------|-----|
| Jean 7 | 53 | john-07-he.js | https://www.bible.com/bible/323/JHN.7.HHH |
| Jean 8 | 59 | john-08-he.js | https://www.bible.com/bible/323/JHN.8.HHH |
| Jean 9 | 41 | john-09-he.js | https://www.bible.com/bible/323/JHN.9.HHH |
| Jean 10 | 42 | john-10-he.js | https://www.bible.com/bible/323/JHN.10.HHH |
| Jean 11 | 57 | john-11-he.js | https://www.bible.com/bible/323/JHN.11.HHH |
| Jean 12 | 50 | john-12-he.js | https://www.bible.com/bible/323/JHN.12.HHH |
| Jean 13 | 38 | john-13-he.js | https://www.bible.com/bible/323/JHN.13.HHH |
| Jean 14 | 31 | john-14-he.js | https://www.bible.com/bible/323/JHN.14.HHH |
| Jean 15 | 27 | john-15-he.js | https://www.bible.com/bible/323/JHN.15.HHH |
| Jean 16 | 33 | john-16-he.js | https://www.bible.com/bible/323/JHN.16.HHH |
| Jean 17 | 26 | john-17-he.js | https://www.bible.com/bible/323/JHN.17.HHH |
| Jean 18 | 40 | john-18-he.js | https://www.bible.com/bible/323/JHN.18.HHH |
| Jean 19 | 42 | john-19-he.js | https://www.bible.com/bible/323/JHN.19.HHH |
| Jean 20 | 31 | john-20-he.js | https://www.bible.com/bible/323/JHN.20.HHH |
| Jean 21 | 25 | john-21-he.js | https://www.bible.com/bible/323/JHN.21.HHH |

**Total** : 595 versets à extraire

---

## 📝 FORMAT ATTENDU

Chaque fichier doit ressembler à ceci :

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
      "text": "[TEXTE HÉBREU ICI]",
      "strong": []
    },
    // ... 53 versets pour le chapitre 7
  ]
};

export default johnChapter7HE;
```

---

## ⚖️ DROITS D'AUTEUR

✅ **DOMAINE PUBLIC CONFIRMÉ**
- Source : Delitzsch Hebrew Gospels (1877)
- Auteur : Franz Delitzsch (décédé 1890)
- Statut : Libre d'utilisation pour projet religieux non-commercial
- Voir : `HEBREW_SOURCES_COPYRIGHT.md` pour détails complets

---

## 🔍 VÉRIFICATION APRÈS EXTRACTION

Exécuter cette commande PowerShell :

```powershell
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

**Résultat attendu** : "21 complets, 0 templates"

---

## 🎯 ÉTAPES RECOMMANDÉES

1. ✅ **Vérifier les droits** → `HEBREW_SOURCES_COPYRIGHT.md` ✓ Fait
2. ✅ **Mettre à jour le prompt** → `PROMPT_CLAUDE_EXTRACTION_BIBLE.md` ✓ Fait
3. ⏳ **Ouvrir Claude.ai** → https://claude.ai/
4. ⏳ **Copier/coller le prompt complet** → Tout le contenu de `PROMPT_CLAUDE_EXTRACTION_BIBLE.md`
5. ⏳ **Extraire chapitre par chapitre** → Jean 7 → Jean 8 → ... → Jean 21
6. ⏳ **Vérifier avec PowerShell** → Commande ci-dessus
7. ⏳ **Tester Strong numbers** → `npm run add-strong he`

---

## 💡 CONSEILS

- **Ne pas se précipiter** : Vérifier chaque chapitre avant de passer au suivant
- **Copier proprement** : S'assurer que le texte hébreu est complet (pas de "...")
- **Vérifier la syntaxe** : JSON valide, virgules correctes, guillemets échappés
- **Préserver l'encodage** : UTF-8 obligatoire pour les caractères hébreux
- **Tester régulièrement** : Vérifier avec PowerShell après chaque 3-4 chapitres

---

## 📞 AIDE

Si vous rencontrez des problèmes :
1. Vérifier que le fichier est bien en UTF-8
2. Vérifier la syntaxe JavaScript avec un linter
3. Comparer avec un chapitre déjà complet (ex: john-01-he.js)
4. Relancer la commande de vérification PowerShell

---

**Temps estimé** : 30-60 minutes pour les 15 chapitres (selon méthode)

**Bonne extraction ! 🚀**
