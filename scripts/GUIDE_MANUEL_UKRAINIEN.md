# 📖 GUIDE MANUEL - Ajout des chapitres ukrainiens

## ✅ Chapitre 1 - TERMINÉ
Jean 1 ukrainien est déjà créé avec 51 versets.

---

## 📋 Processus pour les chapitres 2-21

### Étape 1 : Copier le texte depuis Bible.com

Pour **chaque chapitre** :

1. Ouvrir l'URL : `https://www.bible.com/bible/143/JHN.X.UKR` (remplacer X par 2, 3, 4... 21)
2. Copier tous les versets du chapitre

### Étape 2 : Utiliser le script de génération

J'ai créé un script qui génère le fichier JavaScript à partir d'un objet de versets.

#### Template à copier dans `createUkrainianChapter.js`

```javascript
// MODIFIER CETTE SECTION POUR CHAQUE CHAPITRE
const CHAPTER_NUMBER = 2; // <- Changer ici

const VERSES = {
  1: "Troisième jour, il y eut des noces à Cana en Galilée...",  // <- Coller les versets ici
  2: "Texte du verset 2...",
  3: "Texte du verset 3...",
  // ... etc
};

// NE PAS MODIFIER EN DESSOUS
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const chaptersDir = path.join(rootDir, 'src', 'data', 'bible', 'gospel', 'john', 'chapters');

function generateChapter(chapterNum, verses) {
  const varName = `johnChapter${chapterNum}UK`;
  
  const versesArray = Object.entries(verses).map(([num, text]) => ({
    number: parseInt(num),
    text: text,
    strong: []
  }));
  
  const data = {
    chapter: chapterNum,
    title: `Jean ${chapterNum}`,
    version: "Ukrainian Bible 1962",
    language: "uk",
    direction: "ltr",
    verses: versesArray
  };
  
  const content = `// ============================================================================
// ÉVANGILE DE JEAN - Ukrainian Bible (Українська Біблія)
// ============================================================================
// Chapitre ${chapterNum}

export const ${varName} = ${JSON.stringify(data, null, 2)};

export default ${varName};
`;
  
  return content;
}

const paddedNum = String(CHAPTER_NUMBER).padStart(2, '0');
const filename = path.join(chaptersDir, `john-${paddedNum}-uk.js`);
const content = generateChapter(CHAPTER_NUMBER, VERSES);
fs.writeFileSync(filename, content, 'utf-8');
console.log(`✅ Fichier créé: john-${paddedNum}-uk.js`);
```

### Étape 3 : Exécuter le script

```powershell
node scripts/createUkrainianChapter.js
```

### Étape 4 : Répéter pour chaque chapitre

Pour Jean 2-21, il suffit de :
1. Modifier `CHAPTER_NUMBER = 2` (puis 3, 4, 5... 21)
2. Copier-coller les versets dans `VERSES = { ... }`
3. Exécuter `node scripts/createUkrainianChapter.js`

---

## 🚀 Méthode Rapide Alternative : Python + Selenium

Si vous voulez automatiser complètement, installez Selenium :

```powershell
pip install selenium
```

Puis ce script Python :

```python
from selenium import webdriver
from selenium.webdriver.common.by import By
import json
import time

driver = webdriver.Chrome()

for chapter in range(2, 22):  # Jean 2 à 21
    url = f"https://www.bible.com/bible/143/JHN.{chapter}.UKR"
    driver.get(url)
    time.sleep(2)  # Attendre le chargement
    
    verses = {}
    verse_elements = driver.find_elements(By.CSS_SELECTOR, ".verse")
    
    for verse_elem in verse_elements:
        verse_num = verse_elem.get_attribute("data-usfm-verse")
        verse_text = verse_elem.text
        verses[verse_num] = verse_text
    
    # Sauvegarder dans un fichier JSON temporaire
    with open(f"john-{chapter}-uk.json", "w", encoding="utf-8") as f:
        json.dump(verses, f, ensure_ascii=False, indent=2)
    
    print(f"✅ Chapitre {chapter} extrait")

driver.quit()
```

---

## 📊 Liste des chapitres

- [x] Jean 1 - ✅ FAIT (51 versets)
- [ ] Jean 2 - https://www.bible.com/bible/143/JHN.2.UKR
- [ ] Jean 3 - https://www.bible.com/bible/143/JHN.3.UKR
- [ ] Jean 4 - https://www.bible.com/bible/143/JHN.4.UKR
- [ ] Jean 5 - https://www.bible.com/bible/143/JHN.5.UKR
- [ ] Jean 6 - https://www.bible.com/bible/143/JHN.6.UKR
- [ ] Jean 7 - https://www.bible.com/bible/143/JHN.7.UKR
- [ ] Jean 8 - https://www.bible.com/bible/143/JHN.8.UKR
- [ ] Jean 9 - https://www.bible.com/bible/143/JHN.9.UKR
- [ ] Jean 10 - https://www.bible.com/bible/143/JHN.10.UKR
- [ ] Jean 11 - https://www.bible.com/bible/143/JHN.11.UKR
- [ ] Jean 12 - https://www.bible.com/bible/143/JHN.12.UKR
- [ ] Jean 13 - https://www.bible.com/bible/143/JHN.13.UKR
- [ ] Jean 14 - https://www.bible.com/bible/143/JHN.14.UKR
- [ ] Jean 15 - https://www.bible.com/bible/143/JHN.15.UKR
- [ ] Jean 16 - https://www.bible.com/bible/143/JHN.16.UKR
- [ ] Jean 17 - https://www.bible.com/bible/143/JHN.17.UKR
- [ ] Jean 18 - https://www.bible.com/bible/143/JHN.18.UKR
- [ ] Jean 19 - https://www.bible.com/bible/143/JHN.19.UKR
- [ ] Jean 20 - https://www.bible.com/bible/143/JHN.20.UKR
- [ ] Jean 21 - https://www.bible.com/bible/143/JHN.21.UKR

---

## 💡 Recommandation

**Solution la plus rapide** : Utilisez le script Python + Selenium ci-dessus. En 2-3 minutes, vous aurez les 20 chapitres restants !

```powershell
# 1. Installer Selenium
pip install selenium

# 2. Télécharger ChromeDriver
# https://chromedriver.chromium.org/

# 3. Exécuter le script Python
python extract_ukrainian.py
```

Ensuite, convertissez les JSON en fichiers JS avec un script simple.
