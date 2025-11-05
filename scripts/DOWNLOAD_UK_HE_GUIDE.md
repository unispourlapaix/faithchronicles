# 📥 Guide de Téléchargement - Traductions UK & HE

Les APIs gratuites ont des limitations. Voici la méthode manuelle simple et rapide.

## 🎯 Sources Recommandées (Libres de Droit)

### 🇺🇦 Ukrainien (UK)

**Source**: Bible.com  
**Version**: Ukrainian Bible (Біблія) 1962  
**Licence**: Domaine public

**Étapes**:
1. Aller sur https://www.bible.com/bible/143/JHN.1.UKR
2. Copier le texte de chaque chapitre (Jean 1 à 21)
3. Utiliser le template ci-dessous

### 🇮🇱 Hébreu (HE)

**Source**: Bible.com  
**Version**: Delitzsch Hebrew NT (הברית החדשה)  
**Licence**: Domaine public

**Étapes**:
1. Aller sur https://www.bible.com/bible/323/JHN.1.HHH
2. Copier le texte de chaque chapitre (Jean 1 à 21)
3. Utiliser le template ci-dessous

## 📝 Template de Fichier

Créez un fichier `john-01-uk.js` (ou `john-01-he.js`) avec cette structure:

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
      "text": "[COLLEZ LE VERSET 1 ICI]",
      "strong": []
    },
    {
      "number": 2,
      "text": "[COLLEZ LE VERSET 2 ICI]",
      "strong": []
    },
    // ... continuer pour tous les versets
  ]
};

export default johnChapter1UK;
```

## 🤖 Alternative: Demander à Claude

Vous pouvez aussi demander à Claude de:
1. Aller sur Bible.com
2. Extraire Jean chapitre 1-21 en ukrainien/hébreu
3. Formater selon le template ci-dessus

**Prompt pour Claude**:
```
Va sur https://www.bible.com/bible/143/JHN.1.UKR et extrait l'Évangile de Jean 
chapitre 1 en ukrainien. Formate-le selon le template JavaScript fourni dans 
le fichier john-01-fr.js comme exemple. Retourne-moi le code JavaScript complet 
prêt à copier-coller dans john-01-uk.js.
```

## 🔄 Workflow Rapide

1. **Créer les fichiers manuellement** (option la plus rapide pour 1-2 chapitres)
2. **Utiliser Claude pour extraire** (recommandé pour les 21 chapitres)
3. **Une fois créés**, lancer: `npm run add-strong uk` pour ajouter les Strong automatiquement

## 📚 Autres Sources Libres de Droit

### APIs Gratuites (nécessitent clé API)
- **API.Bible**: https://scripture.api.bible/ (gratuit, inscription requise)
- **ESV API**: https://api.esv.org/ (gratuit pour usage non-commercial)

### Bases de Données
- **OpenBible.info**: Bases de données SQL gratuites
- **eBible.org**: Formats USFM, OSIS disponibles

## ⚡ Script Python Simple

Si vous préférez un script, voici un exemple Python:

```python
import requests
import json

# Bible.com utilise GraphQL
url = "https://www.bible.com/graphql"
# Vous devrez inspecter leur API pour les requêtes exactes
```

## 💡 Recommandation

Pour **gagner du temps**, la méthode la plus rapide est:
1. Demander à **Claude** d'extraire Jean 1-21 depuis Bible.com
2. Il peut le faire en une seule requête pour chaque chapitre
3. Vous copiez-collez le résultat dans les fichiers
4. Vous lancez `npm run add-strong uk` et `npm run add-strong he`

Total: ~30 minutes pour avoir UK et HE complets avec Strong ! 🚀
