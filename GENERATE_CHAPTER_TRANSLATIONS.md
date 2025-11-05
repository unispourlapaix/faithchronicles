# 🌍 Guide de Traduction des Chapitres

## Structure des Fichiers

Pour chaque langue, créer : `src/data/translations/{lang}/chapter1.js`

## Format Requis

```javascript
export default {
  name: "Titre du Chapitre",
  description: "Description du chapitre",
  
  levels: [
    { // Niveau 1 (index 0)
      title: "Titre du niveau",
      questions: [
        { // Question easy
          question: "Question traduite ?",
          answers: ["Réponse 1", "Réponse 2", "Réponse 3", "Réponse 4"],
          hint: "Indice traduit",
          funFact: "💡 Fait amusant traduit",
          explanation: "Explication traduite"
        },
        { // Question medium
          question: "...",
          answers: [...],
          hint: "...",
          funFact: "...",
          explanation: "..."
        },
        { // Question hard
          question: "...",
          answers: [...],
          hint: "...",
          funFact: "...",
          explanation: "..."
        }
      ]
    },
    // Niveaux 2-13...
  ]
};
```

## 📊 Chapitre 1 - Contenu à Traduire

### Métadonnées
- **Nom**: "La Genèse"
- **Description**: "Au commencement... La connaissance permet à l'esprit de se vivifier"

### Niveaux (13 niveaux)

#### Niveau 1 - La Création
- **Titre**: "La Création"
- 3 questions (easy, medium, hard)

#### Niveau 2 - La Tentation du Jardin
- **Titre**: "La Tentation du Jardin"
- 3 questions

#### Niveau 3 - Caïn et Abel
- **Titre**: "Caïn et Abel"
- 3 questions

#### Niveau 4 - Le Déluge de Noé
- **Titre**: "Le Déluge de Noé"
- 3 questions

#### Niveau 5 - La Tour de Babel
- **Titre**: "La Tour de Babel"
- 3 questions

#### Niveau 6 - L'Appel d'Abraham
- **Titre**: "L'Appel d'Abraham"
- 3 questions

#### Niveau 7 - Le Sacrifice d'Isaac
- **Titre**: "Le Sacrifice d'Isaac"
- 3 questions

#### Niveau 8 - Jacob et Esaü
- **Titre**: "Jacob et Esaü"
- 3 questions

#### Niveau 9 - Joseph vendu par ses frères
- **Titre**: "Joseph vendu par ses frères"
- 3 questions

#### Niveau 10 - Joseph en Égypte
- **Titre**: "Joseph en Égypte"
- 3 questions

#### Niveau 11 - Les rêves de Pharaon
- **Titre**: "Les rêves de Pharaon"
- 3 questions

#### Niveau 12 - Retrouvailles fraternelles
- **Titre**: "Retrouvailles fraternelles"
- 3 questions

#### Niveau 13 - La bénédiction de Jacob
- **Titre**: "La bénédiction de Jacob"
- 3 questions

## 🎯 Langues Prioritaires

### Niveau 1 - Langues majeures
1. **en** - English (Europe/Amérique)
2. **es** - Español (Amérique Latine/Espagne)
3. **pt** - Português (Brésil/Portugal)
4. **de** - Deutsch (Allemagne)
5. **ru** - Русский (Russie/Europe de l'Est)

### Niveau 2 - Langues asiatiques
6. **zh** - 中文 (Chine)
7. **jp** - 日本語 (Japon)
8. **ko** - 한국어 (Corée)

### Niveau 3 - Langues du Moyen-Orient
9. **ar** - العربية (Monde arabe)
10. **he** - עברית (Israël)

### Niveau 4 - Autres langues européennes
11. **it** - Italiano (Italie)
12. **uk** - Українська (Ukraine)
13. **rc** - Română (Roumanie)

## 📝 Prompts de Traduction

### Template de Prompt

```
MISSION: Traduire le Chapitre 1 (La Genèse) en {LANGUE}

CONTEXTE:
Tu es un expert en théologie biblique et en langue {LANGUE}. Tu dois traduire le Chapitre 1 de Faith Chronicles (La Genèse) du français vers {LANGUE} moderne. Cette traduction sera utilisée dans une application d'étude biblique interactive.

FORMAT DE SORTIE REQUIS:
Un fichier JavaScript avec EXACTEMENT cette structure:

```javascript
export default {
  name: "Titre traduit",
  description: "Description traduite",
  levels: [
    {
      title: "Titre niveau 1",
      questions: [
        {
          question: "Question ?",
          answers: ["Réponse 1", "Réponse 2", "Réponse 3", "Réponse 4"],
          hint: "Indice",
          funFact: "💡 Fait amusant",
          explanation: "Explication"
        },
        // questions medium et hard...
      ]
    },
    // 12 autres niveaux...
  ]
};
```

IMPORTANT:
1. Respecte EXACTEMENT le format JavaScript
2. Traduis TOUS les champs: question, answers (tableau de 4 réponses), hint, funFact, explanation
3. Garde les emojis dans funFact
4. Utilise la terminologie biblique standard en {LANGUE}
5. L'ordre des réponses doit rester identique (ne change pas l'index de la bonne réponse)
6. Total: 13 niveaux × 3 questions = 39 questions à traduire

RÉFÉRENCES BIBLIQUES EN {LANGUE}:
[Liste des noms bibliques dans la langue cible]

FICHIER À TRADUIRE:
[Contenu du fichier chapter1_genesis.js]
```

## 🚀 Méthode Recommandée

### Option A - Script PowerShell (Automatique)
```powershell
# Générer tous les prompts
.\generate_all_chapter_prompts.ps1
```

### Option B - Manuel (LLM par LLM)
1. Copier le contenu de `chapter1_genesis.js`
2. Utiliser le template de prompt ci-dessus
3. Remplacer {LANGUE} par la langue cible
4. Soumettre à Claude/GPT
5. Sauvegarder dans `src/data/translations/{lang}/chapter1.js`

## ✅ Validation

Après chaque traduction, vérifier:
- [ ] Format JavaScript valide
- [ ] Export default présent
- [ ] 13 niveaux
- [ ] 3 questions par niveau (39 total)
- [ ] 4 réponses par question
- [ ] Tous les champs présents (question, answers, hint, funFact, explanation)
- [ ] Emojis préservés
- [ ] Terminologie biblique correcte

## 📦 Fichiers à Créer (par priorité)

1. `src/data/translations/en/chapter1.js` ✅ Priorité 1
2. `src/data/translations/es/chapter1.js` ✅ Priorité 1
3. `src/data/translations/pt/chapter1.js` ✅ Priorité 1
4. `src/data/translations/de/chapter1.js` ✅ Priorité 1
5. `src/data/translations/ru/chapter1.js` ✅ Priorité 1
6. `src/data/translations/zh/chapter1.js` ⭐ Priorité 2
7. `src/data/translations/jp/chapter1.js` ⭐ Priorité 2
8. `src/data/translations/ko/chapter1.js` ⭐ Priorité 2
9. `src/data/translations/ar/chapter1.js` ⭐ Priorité 3
10. `src/data/translations/he/chapter1.js` ⭐ Priorité 3
11. `src/data/translations/it/chapter1.js` ⭐ Priorité 4
12. `src/data/translations/uk/chapter1.js` ⭐ Priorité 4
13. `src/data/translations/rc/chapter1.js` ⭐ Priorité 4

Répéter pour les chapitres 2-8.
