# Guide d'Intégration du Système Multilingue
## Faith Chronicles - Support de 14 Langues

---

## 📋 Langues Supportées

| Code | Langue | Nom Natif | Drapeau | Direction |
|------|--------|-----------|---------|-----------|
| `fr` | Français | Français | 🇫🇷 | LTR |
| `en` | English | English | 🇬🇧 | LTR |
| `es` | Spanish | Español | 🇪🇸 | LTR |
| `de` | German | Deutsch | 🇩🇪 | LTR |
| `it` | Italian | Italiano | 🇮🇹 | LTR |
| `pt` | Portuguese | Português | 🇵🇹 | LTR |
| `ru` | Russian | Русский | 🇷🇺 | LTR |
| `uk` | Ukrainian | Українська | 🇺🇦 | LTR |
| `zh` | Chinese | 中文 | 🇨🇳 | LTR |
| `jp` | Japanese | 日本語 | 🇯🇵 | LTR |
| `ko` | Korean | 한국어 | 🇰🇷 | LTR |
| `ar` | Arabic | العربية | 🇸🇦 | **RTL** |
| `he` | Hebrew | עברית | 🇮🇱 | **RTL** |
| `rc` | Lingala | Lingala | 🇨🇩 | LTR |

---

## 🚀 Étapes d'Installation

### 1. Mise à Jour de la Base de Données Supabase

```sql
-- Exécuter le script SQL dans Supabase SQL Editor
-- Fichier: add-multilanguage-support.sql
```

### 2. Intégration dans App.tsx

```tsx
import React from 'react';
import { TranslationProvider } from './hooks/useTranslation';
import FaithChronicles from './components/FaithChronicles';

function App() {
  return (
    <TranslationProvider>
      <FaithChronicles />
    </TranslationProvider>
  );
}

export default App;
```

### 3. Utilisation dans les Composants

#### Exemple avec LoginScreen.jsx

```jsx
import React from 'react';
import useTranslation from '../hooks/useTranslation';

const LoginScreen = ({ onLogin, onAnonymous, audio }) => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('login.title')}</h1>
      <p>{t('login.subtitle')}</p>
      
      <button onClick={onAnonymous}>
        {t('login.anonymousMode')}
      </button>
      
      <button onClick={onLogin}>
        {t('login.emailMode')}
      </button>
    </div>
  );
};
```

#### Exemple avec MenuScreen.jsx

```jsx
import React from 'react';
import useTranslation from '../hooks/useTranslation';
import LanguageSelector from './LanguageSelector';

const MenuScreen = ({ wisdomPoints, audio }) => {
  const { t } = useTranslation();
  
  return (
    <div>
      {/* Sélecteur de langue en haut à droite */}
      <div className="absolute top-3 right-3">
        <LanguageSelector audio={audio} />
      </div>
      
      <h1>{t('app.title')}</h1>
      <p>{t('app.tagline')}</p>
      
      <button>{t('buttons.play')}</button>
      
      <div>
        <span>{t('labels.wisdom')}: {wisdomPoints}</span>
      </div>
    </div>
  );
};
```

#### Exemple avec Paramètres Dynamiques

```jsx
import React from 'react';
import useTranslation from '../hooks/useTranslation';

const QuestionScreen = ({ lives, currentQuestion, totalQuestions }) => {
  const { t } = useTranslation();
  
  return (
    <div>
      {/* Message avec paramètre dynamique */}
      <p>{t('messages.wrongAnswer', { lives: lives })}</p>
      
      {/* Question X sur Y */}
      <p>{t('messages.questionsProgress', { 
        current: currentQuestion, 
        total: totalQuestions 
      })}</p>
    </div>
  );
};
```

---

## 🎨 Support RTL (Arabe et Hébreu)

Le système gère automatiquement le mode RTL (Right-to-Left) pour l'arabe et l'hébreu.

### CSS pour RTL

Le hook `useTranslation` applique automatiquement l'attribut `dir` sur `<html>`:

```html
<!-- Pour arabe ou hébreu -->
<html dir="rtl" lang="ar">

<!-- Pour les autres langues -->
<html dir="ltr" lang="fr">
```

### Vérifier si RTL est actif

```jsx
import useTranslation from '../hooks/useTranslation';

const MyComponent = () => {
  const { isRTL } = useTranslation();
  
  return (
    <div className={isRTL ? 'text-right' : 'text-left'}>
      {/* Contenu */}
    </div>
  );
};
```

---

## 📦 Structure des Fichiers de Traduction

```
src/data/translations/
├── languages.js              # Configuration des langues
├── fr/
│   ├── ui.js                # Traductions UI en français
│   └── chapter1.js          # Traductions chapitre 1
├── en/
│   └── ui.js                # Traductions UI en anglais
├── es/
│   └── ui.js                # Traductions UI en espagnol
├── de/
│   └── ui.js                # Traductions UI en allemand
├── it/
│   └── ui.js                # Traductions UI en italien
├── pt/
│   └── ui.js                # Traductions UI en portugais
├── ru/
│   └── ui.js                # Traductions UI en russe
├── uk/
│   └── ui.js                # Traductions UI en ukrainien
├── zh/
│   └── ui.js                # Traductions UI en chinois
├── jp/
│   └── ui.js                # Traductions UI en japonais
├── ko/
│   └── ui.js                # Traductions UI en coréen
├── ar/
│   └── ui.js                # Traductions UI en arabe (RTL)
├── he/
│   └── ui.js                # Traductions UI en hébreu (RTL)
└── rc/
    └── ui.js                # Traductions UI en lingala
```

---

## 🔧 API du Hook useTranslation

### Méthodes Disponibles

```jsx
const {
  currentLanguage,  // Code de la langue actuelle (ex: 'fr')
  changeLanguage,   // Fonction pour changer de langue
  t,                // Fonction de traduction
  getSection,       // Obtenir une section complète
  languages,        // Liste de toutes les langues
  isRTL             // true si la langue actuelle est RTL
} = useTranslation();
```

### Exemples d'Utilisation

```jsx
// Traduction simple
const title = t('app.title'); // "FAITH CHRONICLES"

// Traduction avec paramètres
const message = t('messages.wrongAnswer', { lives: 3 }); 
// "❌ Mauvaise réponse ! Il te reste 3 vie(s)."

// Changer de langue
changeLanguage('en'); // Passer à l'anglais

// Obtenir toute une section
const buttons = getSection('buttons');
// { play: "JOUER", back: "Retour", ... }

// Vérifier si RTL
if (isRTL) {
  console.log('Mode RTL actif');
}
```

---

## 💾 Synchronisation avec Supabase

### Mise à Jour du Hook useGameProgress.js

```jsx
import useTranslation from './useTranslation';

export const useGameProgress = () => {
  const { currentLanguage } = useTranslation();
  
  const saveProgress = async (progressData) => {
    const { data, error } = await supabase
      .from('users')
      .update({ 
        ...progressData,
        preferred_language: currentLanguage // Sauvegarder la langue
      })
      .eq('email', session.user.email);
  };
  
  return { saveProgress };
};
```

### Chargement de la Langue au Login

```jsx
import useTranslation from '../hooks/useTranslation';

const FaithChronicles = () => {
  const { changeLanguage } = useTranslation();
  
  useEffect(() => {
    // Charger la langue préférée de l'utilisateur
    const loadUserPreferences = async () => {
      const { data } = await supabase
        .from('users')
        .select('preferred_language')
        .eq('email', user.email)
        .single();
      
      if (data?.preferred_language) {
        changeLanguage(data.preferred_language);
      }
    };
    
    loadUserPreferences();
  }, [user]);
};
```

---

## 🌐 Détection Automatique de la Langue du Navigateur

```jsx
import { DEFAULT_LANGUAGE } from '../data/translations/languages';

const detectBrowserLanguage = () => {
  const browserLang = navigator.language || navigator.userLanguage;
  const langCode = browserLang.split('-')[0].toLowerCase();
  
  // Vérifier si la langue est supportée
  const supportedLangs = ['fr', 'en', 'es', 'de', 'it', 'pt', 'ru', 'uk', 'zh', 'jp', 'ko', 'ar', 'he', 'rc'];
  
  return supportedLangs.includes(langCode) ? langCode : DEFAULT_LANGUAGE;
};

// Au premier lancement
useEffect(() => {
  const savedLang = localStorage.getItem('faithchronicles_language');
  if (!savedLang) {
    const detectedLang = detectBrowserLanguage();
    changeLanguage(detectedLang);
  }
}, []);
```

---

## ✅ Checklist d'Intégration

- [x] Créer les fichiers de traduction pour les 14 langues
- [x] Implémenter le hook `useTranslation`
- [x] Créer le composant `LanguageSelector`
- [x] Créer le script SQL pour Supabase
- [ ] Wrapper l'App avec `TranslationProvider` dans `App.tsx`
- [ ] Intégrer `LanguageSelector` dans `MenuScreen`
- [ ] Remplacer les textes hardcodés par `t()` dans:
  - [ ] LoginScreen.jsx
  - [ ] MenuScreen.jsx
  - [ ] QuestionScreen.jsx
  - [ ] VictoryScreen.jsx
  - [ ] GameOverScreen.jsx
  - [ ] LevelSelectScreen.jsx
  - [ ] InfoScreen.jsx
- [ ] Exécuter `add-multilanguage-support.sql` dans Supabase
- [ ] Tester toutes les langues
- [ ] Tester le mode RTL (arabe et hébreu)
- [ ] Synchroniser la langue avec le profil utilisateur

---

## 🎯 Prochaines Étapes

1. **Wrapper App.tsx avec TranslationProvider**
2. **Ajouter LanguageSelector dans MenuScreen** (coin supérieur droit)
3. **Remplacer les textes dans les composants** avec la fonction `t()`
4. **Exécuter le script SQL** dans Supabase
5. **Tester chaque langue** pour vérifier les traductions
6. **Tester RTL** avec arabe et hébreu
7. **Synchroniser la préférence** avec le profil utilisateur

---

## 📝 Notes Importantes

- Les traductions sont chargées automatiquement selon la langue sélectionnée
- Le localStorage sauvegarde la préférence de langue
- Le mode RTL est appliqué automatiquement pour AR et HE
- Les paramètres dynamiques utilisent la syntaxe `{paramName}`
- Fallback automatique vers le français si une traduction manque

---

**Développé pour Faith Chronicles** 🙏✨
Support multilingue complet avec RTL
