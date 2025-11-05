# ============================================================================
# GUIDE DE CONVERSION Bible TXT → JS avec Notepad++
# ============================================================================

## 🎯 OBJECTIF
Convertir les fichiers Bible .txt en modules JavaScript tout en préservant l'encodage UTF-8 (chinois, arabe, russe, etc.)

## 📋 MÉTHODE 1 : AUTOMATIQUE (Recommandée)
```powershell
# Convertir UNE langue
node scripts\convertTxtToJs.js fr

# Convertir PLUSIEURS langues
node scripts\convertTxtToJs.js en es pt

# Convertir TOUTES les langues
node scripts\convertTxtToJs.js all
```

## 📝 MÉTHODE 2 : MANUELLE avec Notepad++

### Étape 1 : Ouvrir le fichier .txt
1. Ouvrir Notepad++
2. Fichier → Ouvrir → Sélectionner le fichier .txt (ex: `segond1910.txt`)
3. **IMPORTANT** : Vérifier l'encodage en bas à droite de l'écran
   - Doit afficher "UTF-8" ou "UTF-8 BOM"
   - Si autre chose → Menu "Encodage" → "Convertir en UTF-8"

### Étape 2 : Préparer le format
Le fichier .txt doit avoir ce format :
```
===== CHAPITRE 1 =====

1:1 Au commencement était la Parole...
1:2 Elle était au commencement avec Dieu.

===== CHAPITRE 2 =====

2:1 Trois jours après...
```

### Étape 3 : Conversion manuelle

#### A. Pour un seul chapitre (exemple : Chapitre 2)

1. **Copier le texte du chapitre** depuis le .txt
   - Tout le texte entre `===== CHAPITRE 2 =====` et `===== CHAPITRE 3 =====`

2. **Créer un nouveau fichier** : `john-02-fr.js`

3. **Coller ce template** et remplacer :

```javascript
// ============================================================================
// ÉVANGILE DE JEAN - Français (Louis Segond 1910)
// ============================================================================
// Chapitre 2

export const johnChapter2FR = {
  chapter: 2,
  title: "Jean 2",
  version: "Louis Segond 1910",
  language: "fr",
  direction: "ltr",
  verses: [
    // ↓ COLLER LES VERSETS ICI ↓
  ]
};

export default johnChapter2FR;
```

4. **Transformer chaque verset** :

FORMAT ORIGINAL (TXT):
```
2:1 Trois jours après, il y eut des noces à Cana
```

FORMAT CIBLE (JS):
```javascript
{
  "number": 1,
  "text": "Trois jours après, il y eut des noces à Cana",
  "strong": []
},
```

5. **Recherche/Remplacement Regex dans Notepad++** :
   - Ctrl+H pour ouvrir Rechercher/Remplacer
   - ☑ Cocher "Expression régulière"
   
   **Rechercher** :
   ```
   ^(\d+):(\d+)\s+(.+)$
   ```
   
   **Remplacer par** :
   ```
   {\n  "number": \2,\n  "text": "\3",\n  "strong": []\n},
   ```
   
   - Cliquer sur "Remplacer tout"

6. **Nettoyer** :
   - Supprimer les lignes vides
   - Supprimer la dernière virgule du dernier verset
   - Vérifier que les guillemets sont bien échappés

7. **Sauvegarder en UTF-8** :
   - Menu "Encodage" → "Encoder en UTF-8"
   - Fichier → Enregistrer

### Étape 4 : Cas spéciaux pour les langues

#### 🇨🇳 CHINOIS (zh)
```javascript
export const johnChapter1ZH = {
  chapter: 1,
  title: "約翰福音 1",
  version: "Chinese Union Version",
  language: "zh",
  direction: "ltr",  // Gauche à droite
  verses: [...]
};
```

#### 🇸🇦 ARABE (ar)
```javascript
export const johnChapter1AR = {
  chapter: 1,
  title: "يوحنا 1",
  version: "Smith & Van Dyke 1865",
  language: "ar",
  direction: "rtl",  // ⚠️ DROITE À GAUCHE !
  verses: [...]
};
```

#### 🇷🇺 RUSSE (ru)
```javascript
export const johnChapter1RU = {
  chapter: 1,
  title: "От Иоанна 1",
  version: "Synodal 1876",
  language: "ru",
  direction: "ltr",
  verses: [...]
};
```

### Étape 5 : Problèmes courants et solutions

#### ❌ Problème : Caractères bizarres (�, ?, □)
**Solution** : Mauvais encodage
1. Menu "Encodage" → "Convertir en UTF-8"
2. Réouvrir le fichier source .txt
3. Recommencer

#### ❌ Problème : Guillemets non échappés
**Exemple** : 
```
"text": "Jésus dit: "Je suis""  ← ERREUR
```

**Solution** :
```
"text": "Jésus dit: \"Je suis\""  ← CORRECT
```

Dans Notepad++, rechercher/remplacer :
- Rechercher : `"([^"]*)"([^"]*)"([^"]*)"`
- Remplacer : `"\1\"\2\"\3"`

#### ❌ Problème : Virgule finale
```javascript
verses: [
  { "number": 1, "text": "...", "strong": [] },
  { "number": 2, "text": "...", "strong": [] },  ← SUPPRIMER cette virgule
]
```

### Étape 6 : Vérification

1. **Test syntaxe** : Ouvrir le fichier dans VS Code
   - Doit avoir la coloration syntaxique correcte
   - Pas de soulignement rouge

2. **Test encodage** : Les caractères spéciaux doivent s'afficher correctement
   - Chinois : 太初有道
   - Arabe : في البدء
   - Russe : В начале

3. **Test import** : Ajouter dans `translationService.js`
   ```javascript
   import { johnChapter2FR } from './chapters/john-02-fr.js';
   ```

## 🌍 LANGUES ET LEURS CODES

| Langue | Code | Version | Direction | Fichier source |
|--------|------|---------|-----------|----------------|
| Français | fr | Louis Segond 1910 | ltr | segond1910.txt |
| Anglais | en | World English Bible | ltr | web.txt |
| Espagnol | es | Reina-Valera 1909 | ltr | rv1909.txt |
| Portugais | pt | Almeida 1911 | ltr | almeida1911.txt |
| Allemand | de | Luther 1545 | ltr | luther1545.txt |
| Italien | it | Riveduta Luzzi 1927 | ltr | luzzi1927.txt |
| Russe | ru | Synodal 1876 | ltr | synodal1876.txt |
| Chinois | zh | Chinese Union | ltr | cuv.txt |
| Arabe | ar | Smith & Van Dyke | **rtl** | svd1865.txt |
| Hindi | hi | Indian Revised | ltr | irv.txt |
| Swahili | sw | Swahili Union | ltr | suv.txt |
| Coréen | ko | Korean Revised | ltr | krv.txt |
| Japonais | ja | Colloquial 1955 | ltr | colloquial1955.txt |
| Polonais | pl | Gdańsk 1632 | ltr | gdansk1632.txt |

## ✅ CHECKLIST PAR LANGUE

- [ ] FR - Français (21 chapitres) ✅ FAIT
- [ ] EN - Anglais (21 chapitres)
- [ ] ES - Espagnol (21 chapitres)
- [ ] PT - Portugais (21 chapitres)
- [ ] DE - Allemand (21 chapitres)
- [ ] IT - Italien (21 chapitres)
- [ ] RU - Russe (21 chapitres)
- [ ] ZH - Chinois (21 chapitres)
- [ ] AR - Arabe (21 chapitres) ⚠️ RTL
- [ ] HI - Hindi (21 chapitres)
- [ ] SW - Swahili (21 chapitres)
- [ ] KO - Coréen (21 chapitres)
- [ ] JA - Japonais (21 chapitres)
- [ ] PL - Polonais (21 chapitres)

**Total : 294 fichiers à créer (21 chapitres × 14 langues)**

## 🚀 MÉTHODE RAPIDE (Recommandée)

Utiliser le script automatique :
```powershell
cd c:\Users\dream\OneDrive\Documents\GitHub\faithchronicles
node scripts\convertTxtToJs.js all
```

Cela créera automatiquement tous les 294 fichiers en préservant l'encodage UTF-8 ! 🎉
