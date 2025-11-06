# 📖 FaithChronicles / BibleQuest

> **UNITYQUEST Chronicles of Love** - Interactive Scripture Discovery  
> *"Le Chemin de l'Amour"* - The Path of Love

[![Version](https://img.shields.io/badge/version-1.0-blue.svg)](https://github.com/unispourlapaix/faithchronicles)
[![React](https://img.shields.io/badge/React-18.x-61dafb.svg)](https://reactjs.org/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

## 🌟 À Propos du Projet

**FaithChronicles** (aussi connu sous le nom de **BibleQuest**) est une aventure biblique interactive centrée sur **l'Évangile de Jean** et le thème universel de **"Le Chemin de l'Amour"**. 

Ce jeu éducatif et spirituel permet aux joueurs d'explorer les Écritures à travers **91 niveaux** répartis sur **8 chapitres thématiques**, disponibles en **17 langues**.

### 🎯 Mission

Rendre les Écritures accessibles, engageantes et transformatrices à travers une expérience interactive qui célèbre :
- ✝️ **L'Évangile de Jean** comme fondation spirituelle
- 💝 **Le Chemin de l'Amour** comme thème central
- 🌍 **L'Unité dans la Diversité** comme vision
- 🕊️ **La Paix entre les Traditions** comme appel

---

## ✨ Fonctionnalités Principales

### 📚 Contenu Biblique
- **91 niveaux** de questions bibliques interactives
- **8 chapitres** couvrant l'ensemble de l'histoire biblique
- **273 étoiles** à collecter (3 par niveau)
- **Chapitre bonus secret** pour les joueurs accomplis
- **Lecteur biblique intégré** avec références Strong pour l'Évangile de Jean

### 🎮 Système de Jeu
- **3 Cartes de Pouvoir** : Foi, Courage, Sagesse
  - 💫 **Foi** : +50% de points de sagesse
  - ⚔️ **Courage** : Seconde chance en cas d'erreur
  - 🧠 **Sagesse** : Indices révélés + 25% de bonus
- **Système de progression** avec rangs spirituels
- **Animation de montagne** représentant l'ascension spirituelle
- **Sauvegarde locale** et **synchronisation cloud** (Supabase)

### 🌍 Multilingue (17 Langues)
- 🇫🇷 Français • 🇬🇧 English • 🇪🇸 Español
- 🇩🇪 Deutsch • 🇵🇹 Português • 🇮🇹 Italiano
- 🇷🇺 Русский • 🇸🇦 العربية • 🇮🇱 עברית
- 🇮🇳 हिंदी • 🇯🇵 日本語 • 🇰🇷 한국어
- 🇨🇳 中文 (简体) • 🇹🇼 中文 (繁體)
- 🇵🇱 Polski • 🇨🇩 Lingala • 🇹🇿 Kiswahili
- 🇺🇦 Українська

### 🎨 Modules Spéciaux
- **📖 Évangile de Jean** : Lecteur biblique complet avec Strong
- **💎 Trésors Bibliques** : Versets, faits intéressants, questions
- **🎵 Système Audio** : Lecteur gospel intégré
- **🎨 Module Emmanuel Artist** : Portfolio et créations numériques
- **🕊️ L'Unité qui Produit la Paix** : Réflexion philosophique

---

## 🏗️ Architecture Technique

### Technologies Utilisées
```
React 18.x          - Interface utilisateur moderne
Tailwind CSS        - Design responsive et élégant
Supabase           - Base de données et authentification
LocalStorage       - Sauvegarde locale des progressions
React Router       - Navigation dynamique
Framer Motion      - Animations fluides
```

### Structure du Projet
```
faithchronicles/
├── public/
│   ├── audio/              # Système audio gospel
│   └── manifest.json       # PWA configuration
├── src/
│   ├── components/         # Composants React
│   │   ├── QuizMountain/  # Système de jeu principal
│   │   └── screens/       # Écrans de l'application
│   ├── data/
│   │   ├── bible/         # Évangile de Jean (14 langues)
│   │   ├── chapters/      # Contenu des 8 chapitres
│   │   └── translations/  # Traductions UI (17 langues)
│   ├── hooks/             # Hooks React personnalisés
│   ├── lib/               # Configuration Supabase
│   └── utils/             # Utilitaires
└── scripts/               # Scripts de téléchargement/traduction
```

---

## 🚀 Installation et Démarrage

### Prérequis
```bash
Node.js >= 16.x
npm >= 8.x
```

### Installation
```bash
# Cloner le dépôt
git clone https://github.com/unispourlapaix/faithchronicles.git
cd faithchronicles

# Installer les dépendances
npm install
```

### Configuration Supabase (Optionnel)
Créer un fichier `.env.local` :
```env
REACT_APP_SUPABASE_URL=votre_url_supabase
REACT_APP_SUPABASE_ANON_KEY=votre_clé_supabase
```

### Démarrage
```bash
# Mode développement
npm start
# Ouvre http://localhost:3000

# Build de production
npm run build

# Tests
npm test
```

---

## 📖 Les 8 Chapitres

| Chapitre | Titre | Niveaux | Thème |
|----------|-------|---------|-------|
| **1** | La Genèse | 1-13 | Création → Joseph |
| **2** | L'Exode | 14-26 | Moïse → Terre Promise |
| **3** | Jésus-Christ | 27-39 | Naissance → Ministère |
| **4** | Crucifixion/Résurrection | 40-52 | Passion → Ascension |
| **5** | Église Primitive | 53-65 | Pentecôte → Premiers disciples |
| **6** | Missions de Paul | 66-78 | Conversion → Voyages |
| **7** | Lettres et Apocalypse | 79-91 | Épîtres → Révélation |
| **8** | 🏆 Niveau Bonus | 92 | Au Sommet de la Montagne |

---

## 🎓 Système de Rangs Spirituels

Progressez à travers 8 rangs spirituels :

1. 🌱 **Chercheur** (Seeker) - Début du voyage
2. 👣 **Disciple** (Disciple) - Suivre le chemin
3. 🙏 **Serviteur** (Servant) - Service humble
4. 📢 **Témoin** (Witness) - Partager la lumière
5. 🛡️ **Gardien** (Guardian) - Protéger la vérité
6. 🦉 **Sage** (Wise) - Sagesse acquise
7. ⚡ **Prophète** (Prophet) - Vision spirituelle
8. ✨ **Apôtre** (Apostle) - Maîtrise spirituelle

---

## 🌍 La Philosophie : L'Unité qui Produit la Paix

### Le Cœur du Projet

FaithChronicles est fondé sur une vision d'**unité dans la diversité** :

> *"Nos frontières viennent du passé. Chaque religion a ses raisons. Nos divisions ne sont pas la volonté de Dieu, mais le fruit de l'histoire, de la géographie, de la culture."*

### Les 7 Étapes vers l'Humilité et la Paix

1. **Reconnaître** : nos frontières viennent du passé
2. **Respecter** : fondement de l'humilité, gardienne de la paix
3. **Comprendre** sans juger
4. **Changer soi-même** d'abord : être une vraie lanterne
5. **Rompre** avec l'esprit communautaire
6. **Libérer** pour être libre
7. **Éviter** de poursuivre mot pour mot

📄 Lire la présentation complète : [JEAN_ET_UNITE.md](JEAN_ET_UNITE.md)

---

## 🎯 Guides de Documentation

### Pour les Développeurs
- 📘 [MULTILANGUAGE_SUMMARY.md](MULTILANGUAGE_SUMMARY.md) - Système multilingue
- 📗 [GAME_SAVE_SYSTEM.md](GAME_SAVE_SYSTEM.md) - Système de sauvegarde
- 📙 [AUDIO_SYSTEM.md](AUDIO_SYSTEM.md) - Système audio gospel
- 📕 [PERFORMANCE_CACHE.md](PERFORMANCE_CACHE.md) - Optimisation

### Pour les Traducteurs
- 🌍 [MULTILANGUAGE_INTEGRATION_GUIDE.md](MULTILANGUAGE_INTEGRATION_GUIDE.md)
- 📖 [GENERATE_CHAPTER_TRANSLATIONS.md](GENERATE_CHAPTER_TRANSLATIONS.md)
- 🇫🇷 [GUIDE_TRADUCTION_CHAPITRE1.md](GUIDE_TRADUCTION_CHAPITRE1.md)

### Configuration
- ⚙️ [SUPABASE_SETUP.md](SUPABASE_SETUP.md) - Configuration base de données
- 🚀 [SUPABASE_QUICKSTART.md](SUPABASE_QUICKSTART.md) - Démarrage rapide

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Voici comment vous pouvez aider :

### Types de Contributions
- 🌍 **Traductions** : Ajouter de nouvelles langues
- 📝 **Contenu** : Améliorer les questions et explications
- 🎨 **Design** : Améliorer l'interface utilisateur
- 🐛 **Bugs** : Signaler et corriger les problèmes
- 📚 **Documentation** : Améliorer les guides

### Processus
1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

---

## 👨‍💻 Créateur

**Emmanuel Payet**  
Développeur passionné par la spiritualité et l'unité

- 🌐 [Emmanuel Artist Module](public/emmanuel-artist-module.html)
- 💼 Portfolio de créations numériques
- 🎵 [Faithful Sounds Generator](public/audio/faithful-sounds-generator.js)

---

## 📜 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 🙏 Remerciements

### Technologies
- [React](https://reactjs.org/) - Framework UI
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS
- [Supabase](https://supabase.com/) - Backend as a Service
- [Framer Motion](https://www.framer.com/motion/) - Animations

### Ressources Bibliques
- Louis Segond 1910 - Version biblique (domaine public)
- Strong's Concordance - Références hébraïques/grecques
- Communauté open-source biblique

### Inspiration
- L'Évangile de Jean - Source spirituelle
- La diversité des traditions religieuses
- Le désir d'unité dans l'amour

---

## 📊 Statistiques du Projet

```
91 niveaux de jeu
8 chapitres thématiques
17 langues supportées
273 étoiles à collecter
1 chapitre bonus secret
21 chapitres de l'Évangile de Jean
14 langues pour la Bible (Strong inclus)
3 cartes de pouvoir uniques
8 rangs spirituels
```

---

## 🌟 Citations du Projet

> *"Au commencement était la Parole, et la Parole était avec Dieu, et la Parole était Dieu."*  
> — **Jean 1:1**

> *"Je vous donne un commandement nouveau : Aimez-vous les uns les autres ; comme je vous ai aimés, vous aussi, aimez-vous les uns les autres."*  
> — **Jean 13:34**

> *"Afin que tous soient un, comme toi, Père, tu es en moi, et comme je suis en toi, afin qu'eux aussi soient un en nous, pour que le monde croie que tu m'as envoyé."*  
> — **Jean 17:21**

---

## 🔗 Liens Utiles

- 📖 [Présentation Philosophique](JEAN_ET_UNITE.md)
- 🎮 [Jouer en ligne](https://faithchronicles.netlify.app) *(si déployé)*
- 📚 [Documentation complète](https://github.com/unispourlapaix/faithchronicles/wiki)
- 🐛 [Signaler un bug](https://github.com/unispourlapaix/faithchronicles/issues)
- 💬 [Discussions](https://github.com/unispourlapaix/faithchronicles/discussions)

---

## 📞 Contact

Pour toute question ou suggestion :
- 📧 Email : [contact via GitHub](https://github.com/unispourlapaix)
- 💬 Discussions : [GitHub Discussions](https://github.com/unispourlapaix/faithchronicles/discussions)
- 🐛 Issues : [GitHub Issues](https://github.com/unispourlapaix/faithchronicles/issues)

---

<div align="center">

### 💝 Fait avec amour pour la gloire de Dieu

**FaithChronicles / BibleQuest**  
*Le Chemin de l'Amour • The Path of Love*

[![⭐ Star sur GitHub](https://img.shields.io/github/stars/unispourlapaix/faithchronicles?style=social)](https://github.com/unispourlapaix/faithchronicles)
[![🍴 Fork sur GitHub](https://img.shields.io/github/forks/unispourlapaix/faithchronicles?style=social)](https://github.com/unispourlapaix/faithchronicles/fork)

---

*"Que la grâce du Seigneur Jésus-Christ, l'amour de Dieu, et la communion du Saint-Esprit soient avec vous tous !"*  
— **2 Corinthiens 13:14**

</div>
