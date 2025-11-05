# 🌍 Guide Traduction Chapitre 1 - Toutes Langues

## 📋 Statut des Traductions

### Langues Prioritaires (13 langues)
- [ ] **en** - English
- [ ] **es** - Español  
- [ ] **pt** - Português
- [ ] **de** - Deutsch
- [ ] **it** - Italiano
- [ ] **ru** - Русский
- [ ] **uk** - Українська
- [ ] **zh** - 中文
- [ ] **jp** - 日本語
- [ ] **ko** - 한국어
- [ ] **ar** - العربية
- [ ] **he** - עברית
- [ ] **rc** - Română

## 🎯 Prompt Template (Copier-Coller pour chaque langue)

```
MISSION: Traduire le Chapitre 1 (La Genèse) en {LANGUE}

Tu es un expert en théologie biblique et en langue {LANGUE_NATIVE}. Traduis le Chapitre 1 de Faith Chronicles du français vers le {LANGUE_NATIVE} moderne.

FORMAT REQUIS (JavaScript):

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
          funFact: "💡 Fait"
        },
        // medium + hard
      ]
    },
    // 12 autres niveaux (total: 13)
  ]
};

IMPORTANT:
- Traduis TOUS les champs (question, answers, hint, funFact)
- Garde l'ordre des réponses identique
- Préserve les emojis
- 13 niveaux × 3 questions = 39 questions à traduire

CONTENU À TRADUIRE:

[Coller ici le contenu de chapter1_genesis.js]
```

## 📝 Instructions Étape par Étape

### 1. Préparer le Contenu Source
```powershell
Get-Content "src\data\chapters\chapter1_genesis.js" -Raw | clip
```
✅ Contenu copié dans le presse-papier

### 2. Pour chaque langue :

#### A. English (en)
**Fichier**: `src\data\translations\en\chapter1.js`

**Références bibliques**:
- Genesis, Exodus, Matthew, John, Romans

**Terminologie**:
- God, Jesus, Christ, Faith, Grace, Salvation

**Prompt spécifique**:
```
MISSION: Translate Chapter 1 (Genesis) to ENGLISH

[Coller le template ci-dessus avec contenu français]
```

#### B. Español (es)
**Fichier**: `src\data\translations\es\chapter1.js`

**Referencias bíblicas**:
- Génesis, Éxodo, Mateo, Juan, Romanos

**Terminología**:
- Dios, Jesús, Cristo, Fe, Gracia, Salvación

#### C. Português (pt)
**Fichier**: `src\data\translations\pt\chapter1.js`

**Referências bíblicas**:
- Gênesis, Êxodo, Mateus, João, Romanos

**Terminologia**:
- Deus, Jesus, Cristo, Fé, Graça, Salvação

#### D. Deutsch (de)
**Fichier**: `src\data\translations\de\chapter1.js`

**Biblische Referenzen**:
- Genesis, Exodus, Matthäus, Johannes, Römer

**Terminologie**:
- Gott, Jesus, Christus, Glaube, Gnade, Erlösung

#### E. Русский (ru)
**Fichier**: `src\data\translations\ru\chapter1.js`

**Библейские ссылки**:
- Бытие, Исход, Матфей, Иоанн, Римлянам

**Терминология**:
- Бог, Иисус, Христос, Вера, Благодать, Спасение

#### F. Українська (uk)
**Fichier**: `src\data\translations\uk\chapter1.js`

**Біблійні посилання**:
- Буття, Вихід, Матвія, Івана, Римлян

**Термінологія**:
- Бог, Ісус, Христос, Віра, Благодать, Спасіння

#### G. Italiano (it)
**Fichier**: `src\data\translations\it\chapter1.js`

**Riferimenti biblici**:
- Genesi, Esodo, Matteo, Giovanni, Romani

**Terminologia**:
- Dio, Gesù, Cristo, Fede, Grazia, Salvezza

#### H. 中文 (zh)
**Fichier**: `src\data\translations\zh\chapter1.js`

**圣经引用**:
- 创世记, 出埃及记, 马太福音, 约翰福音, 罗马书

**术语**:
- 神, 耶稣, 基督, 信仰, 恩典, 救恩

#### I. 日本語 (jp)
**Fichier**: `src\data\translations\jp\chapter1.js`

**聖書の参照**:
- 創世記, 出エジプト記, マタイによる福音書, ヨハネによる福音書, ローマ人への手紙

**用語**:
- 神, イエス, キリスト, 信仰, 恵み, 救い

#### J. 한국어 (ko)
**Fichier**: `src\data\translations\ko\chapter1.js`

**성경 참조**:
- 창세기, 출애굽기, 마태복음, 요한복음, 로마서

**용어**:
- 하나님, 예수, 그리스도, 믿음, 은혜, 구원

#### K. العربية (ar)
**Fichier**: `src\data\translations\ar\chapter1.js`

**المراجع الكتابية**:
- التكوين, الخروج, متى, يوحنا, رومية

**المصطلحات**:
- الله, يسوع, المسيح, الإيمان, النعمة, الخلاص

#### L. עברית (he)
**Fichier**: `src\data\translations\he\chapter1.js`

**התייחסויות תנכיות**:
- בראשית, שמות, מתי, יוחנן, הרומאים

**טרמינולוגיה**:
- אלוהים, ישוע, משיח, אמונה, חסד, ישועה

#### M. Română (rc)
**Fichier**: `src\data\translations\rc\chapter1.js`

**Referințe biblice**:
- Geneza, Exodul, Matei, Ioan, Romani

**Terminologie**:
- Dumnezeu, Isus, Hristos, Credință, Har, Mântuire

## ✅ Validation Checklist

Pour chaque traduction, vérifier :
- [ ] Fichier JavaScript valide (pas d'erreurs de syntaxe)
- [ ] `export default {` au début
- [ ] `name` et `description` traduits
- [ ] 13 éléments dans l'array `levels`
- [ ] Chaque niveau a un `title` traduit
- [ ] Chaque niveau a 3 questions (easy, medium, hard)
- [ ] Chaque question a 4 réponses dans `answers`
- [ ] Tous les champs traduits : `question`, `answers`, `hint`, `funFact`
- [ ] Emojis préservés (💡, 🐍, ⚡, 🌟, etc.)
- [ ] Terminologie biblique correcte pour la langue

## 🚀 Commandes Utiles

### Copier le contenu source
```powershell
Get-Content "src\data\chapters\chapter1_genesis.js" -Raw | clip
```

### Créer un nouveau fichier de traduction
```powershell
$lang = "en"  # Changer la langue
New-Item -ItemType Directory -Force -Path "src\data\translations\$lang"
# Coller le résultat LLM dans: src\data\translations\$lang\chapter1.js
```

### Tester une traduction
```powershell
# L'app recharge automatiquement - changer la langue dans l'interface
```

## 📊 Progression

Total langues: 13  
Complétées: 0  
Restantes: 13  

**Priorité 1** (langues majeures): en, es, pt, de, ru  
**Priorité 2** (langues asiatiques): zh, jp, ko  
**Priorité 3** (Moyen-Orient): ar, he  
**Priorité 4** (autres): it, uk, rc  

Bon courage ! 🌍✨
