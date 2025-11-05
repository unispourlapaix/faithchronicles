# 📖 Script d'Ajout Automatique des Numéros Strong

## 🎯 Objectif

Ce script automatise l'ajout des numéros Strong dans les traductions de l'Évangile de Jean pour les 14 langues supportées. Il utilise le système de détection automatique `autoStrongDetector.js` pour mapper intelligemment les mots traduits aux numéros Strong grecs/hébreux.

## 🌍 Langues Supportées

Le script traite automatiquement ces 14 langues :
- 🇫🇷 Français (fr)
- 🇬🇧 English (en)
- 🇪🇸 Español (es)
- 🇵🇹 Português (pt)
- 🇩🇪 Deutsch (de)
- 🇮🇹 Italiano (it)
- 🇷🇺 Русский (ru)
- 🇨🇳 中文 (zh)
- 🇸🇦 العربية (ar)
- 🇮🇳 हिन्दी (hi)
- 🇰🇷 한국어 (ko)
- 🇯🇵 日本語 (ja)
- 🇺🇦 Українська (uk)
- 🇮🇱 עברית (he)

## 📦 Installation

Aucune installation supplémentaire requise. Le script utilise les modules Node.js natifs et le système de détection déjà en place.

## 🚀 Utilisation

### 1️⃣ Traiter UNE langue spécifique (recommandé pour test)

```bash
# Traiter uniquement le français (tous les chapitres)
npm run add-strong:fr

# Traiter uniquement l'anglais
npm run add-strong en

# Traiter uniquement l'espagnol
npm run add-strong es
```

### 2️⃣ Traiter un chapitre spécifique d'une langue

```bash
# Traiter seulement Jean chapitre 1 en français
npm run add-strong fr 1

# Traiter Jean chapitre 3 en anglais
npm run add-strong en 3
```

### 3️⃣ Traiter TOUTES les langues (14 langues × 21 chapitres = 294 fichiers)

```bash
# ⚠️  Attention: ceci va traiter les 294 fichiers
npm run add-strong:all
```

## 📊 Fonctionnement

### Algorithme

1. **Lecture** : Le script lit chaque fichier de chapitre (`john-01-fr.js`, etc.)
2. **Détection** : Pour chaque verset, il utilise `detectStrongInVerse(text, language)`
3. **Filtrage** : Seuls les mots avec `confidence >= 5` sont conservés
4. **Formatage** : Les résultats sont formatés en JSON :
   ```javascript
   "strong": [
     {
       "text": "Parole",
       "strong": "G3056",
       "start": 28,
       "end": 34
     }
   ]
   ```
5. **Sauvegarde** : Le fichier est mis à jour avec les nouveaux Strong détectés

### Exemple de sortie

```
📖 Traitement: Jean 1 - FR

  ✅ Verset 1: 3 Strong détectés
  ✅ Verset 2: 2 Strong détectés
  ⚪ Verset 3: aucun Strong détecté
  ✅ Verset 4: 4 Strong détectés
  
✨ Fichier sauvegardé: 15 versets mis à jour
```

## 🔍 Vérification des Résultats

### Avant l'exécution
```javascript
{
  "number": 1,
  "text": "Au commencement était la Parole...",
  "strong": []
}
```

### Après l'exécution
```javascript
{
  "number": 1,
  "text": "Au commencement était la Parole...",
  "strong": [
    {
      "text": "commencement",
      "strong": "G746",
      "start": 3,
      "end": 15
    },
    {
      "text": "Parole",
      "strong": "G3056",
      "start": 28,
      "end": 34
    }
  ]
}
```

## ⚠️ Avertissements

### Précision Théologique

Le système de détection automatique est **pratique** mais pas **100% précis** :

- ✅ **Bon pour** : Lecture spirituelle, étude générale, découverte
- ⚠️  **Limité pour** : Étude exégétique précise, analyse grammaticale grecque
- 🔬 **Raison** : Les Strong sont mappés sur les mots traduits, pas sur l'ordre grammatical grec original

### Recommandations

1. **Testez d'abord** sur une langue/un chapitre avant de lancer sur tout
2. **Vérifiez les résultats** sur 2-3 versets clés après exécution
3. **Commitez progressivement** : ne traitez pas les 294 fichiers d'un coup
4. **Sauvegarde** : Le script écrase les fichiers, assurez-vous d'avoir un backup (git)

## 🐛 Dépannage

### Erreur "Module not found"
```bash
# Assurez-vous que autoStrongDetector.js existe
ls src/utils/autoStrongDetector.js
```

### Aucun Strong détecté
- Vérifiez que `strongTranslations{LANG}.js` existe pour cette langue
- Le seuil de confiance est >= 5, peut-être trop strict pour certains mots

### Fichier non trouvé
```
⚠️  Fichier non trouvé: john-15-sw.js
```
Ceci est normal si la traduction n'existe pas encore pour cette langue.

## 📝 Structure du Projet

```
scripts/
  ├── addStrongToTranslations.js    # Script principal
  └── ADD_STRONG_README.md          # Cette documentation

src/
  ├── utils/
  │   └── autoStrongDetector.js     # Système de détection
  └── data/
      └── bible/
          └── gospel/
              └── john/
                  ├── chapters/
                  │   ├── john-01-fr.js
                  │   ├── john-01-en.js
                  │   └── ...
                  └── strongTranslations/
                      ├── strongTranslationsFR.js
                      ├── strongTranslationsEN.js
                      └── ...
```

## 🔄 Workflow Recommandé

### Phase 1 : Test Pilote (1 chapitre, 1 langue)
```bash
npm run add-strong fr 1
git diff src/data/bible/gospel/john/chapters/john-01-fr.js
# Vérifier que ça marche bien
git add src/data/bible/gospel/john/chapters/john-01-fr.js
git commit -m "feat: add Strong numbers to Jean 1 (FR)"
```

### Phase 2 : Une Langue Complète (21 chapitres)
```bash
npm run add-strong:fr
git diff src/data/bible/gospel/john/chapters/john-*-fr.js
# Vérifier quelques chapitres
git add src/data/bible/gospel/john/chapters/*-fr.js
git commit -m "feat: add Strong numbers to Jean 1-21 (FR)"
```

### Phase 3 : Toutes les Langues (294 fichiers)
```bash
npm run add-strong:all
# ⏱️  Ceci peut prendre 2-5 minutes
git status
# Vérifier que tout est OK
git add src/data/bible/gospel/john/chapters/
git commit -m "feat: add Strong numbers to all translations (14 languages)"
```

## 📈 Statistiques Estimées

- **1 chapitre** : ~10-30 Strong détectés (selon la longueur)
- **1 langue complète** : ~500-800 Strong détectés (21 chapitres)
- **Toutes les langues** : ~10,000+ Strong détectés (294 fichiers)

## 🎓 Pour Aller Plus Loin

Si vous voulez améliorer la précision :
1. Ajustez le seuil de confiance dans le script (ligne `filter(w => w.confidence >= 5)`)
2. Enrichissez `strongTranslations` avec plus de synonymes
3. Créez des mappings manuels pour les versets clés (Jean 1:1, 3:16, etc.)

## 📞 Support

En cas de problème :
- Vérifiez la console pour les messages d'erreur détaillés
- Testez sur un seul chapitre d'abord
- Consultez `AUTO_STRONG_MULTILINGUAL.md` pour comprendre la détection

---

**Créé pour Faith Chronicles** 🙏  
Automatiser l'ajout des Strong pour rendre la Parole plus accessible dans 14 langues.
