# FaithChronicles - Jeu Biblique Interactif

Un jeu éducatif et interactif basé sur les récits bibliques, développé avec React et Supabase.

## 🎮 Description

FaithChronicles est un jeu de quiz biblique avec un système de progression avancé comprenant :
- 8 niveaux de difficulté
- 16 grades par niveau
- Système de points de sagesse et de révélation
- Sauvegarde automatique de la progression
- Système d'étoiles par niveau

## 🚀 Installation Rapide

### Prérequis

- Node.js 14+ installé
- Compte Supabase (gratuit)

### Étapes d'Installation

1. **Cloner le projet**
```bash
git clone https://github.com/unispourlapaix/faithchronicles.git
cd faithchronicles
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer Supabase**
```bash
# Copier le template de configuration
cp .env.local.example .env.local
```

Éditez `.env.local` et ajoutez vos clés Supabase :
```env
REACT_APP_SUPABASE_URL=https://votre-projet.supabase.co
REACT_APP_SUPABASE_ANON_KEY=votre-cle-anon
```

4. **Créer les tables dans Supabase**
- Allez sur [supabase.com](https://supabase.com)
- Ouvrez votre projet → SQL Editor
- Copiez et exécutez `supabase-schema-faithchronicles-only.sql`

5. **Lancer l'application**
```bash
npm start
```

L'application s'ouvrira sur http://localhost:3000

📖 **Guide détaillé:** Consultez [SUPABASE_QUICKSTART.md](./SUPABASE_QUICKSTART.md)

## 📁 Structure du Projet

```
faithchronicles/
├── src/
│   ├── components/          # Composants React
│   │   ├── screens/        # Écrans du jeu
│   │   └── QuizMountain/   # Composant principal du quiz
│   ├── data/               # Données du jeu
│   │   ├── chapters/       # Questions par chapitre
│   │   └── bible/          # Données bibliques
│   ├── hooks/              # React hooks
│   │   ├── useAuth.js      # Gestion de l'authentification
│   │   └── useGameProgress.js  # Gestion de la progression
│   ├── lib/                # Bibliothèques
│   │   └── supabase.js     # Configuration Supabase
│   └── utils/              # Utilitaires
│       └── retryHelper.js  # Gestion des erreurs réseau
├── supabase-schema-faithchronicles-only.sql  # Schéma SQL
├── SUPABASE_QUICKSTART.md  # Guide de configuration
├── TROUBLESHOOTING_AUTH.md # Guide de dépannage
└── CHANGELOG_AUTH_FIX.md   # Détails des corrections
```

## 🎯 Fonctionnalités

### Système de Progression
- ✅ 8 niveaux bibliques (Genèse → Lettres finales)
- ✅ 16 grades par niveau avec XP croissant
- ✅ Sauvegarde automatique avec retry en cas d'erreur
- ✅ Système d'étoiles (0-3) par niveau

### Authentification
- ✅ Connexion/Inscription sécurisée avec Supabase
- ✅ Gestion automatique des sessions
- ✅ Row Level Security (RLS) pour la protection des données

### Résilience
- ✅ Retry automatique en cas d'erreur réseau (3 tentatives)
- ✅ Vérification de session avant chaque opération
- ✅ Messages d'erreur clairs

## 🧪 Tests

### Tester la Configuration Supabase

Ouvrez la console du navigateur (F12) et exécutez :
```javascript
// Copier-coller le contenu de test-supabase.js
```

Ou incluez le script dans votre page et il s'exécutera automatiquement.

### Tests Manuels

1. **Inscription** → Créer un compte
2. **Connexion** → Se connecter
3. **Jouer** → Compléter un niveau
4. **Vérifier** → Recharger la page, la progression doit persister

## 🐛 Dépannage

### Erreurs 401 Unauthorized

Ces erreurs ont été corrigées dans la dernière version. Si vous les rencontrez :

1. Vérifiez que vous êtes connecté
2. Consultez [TROUBLESHOOTING_AUTH.md](./TROUBLESHOOTING_AUTH.md)
3. Vérifiez vos clés Supabase dans `.env.local`

### Erreurs Réseau

Le système réessaie automatiquement 3 fois. Si le problème persiste :
- Vérifiez votre connexion internet
- Vérifiez l'état de Supabase sur [status.supabase.com](https://status.supabase.com)

### Tables Non Trouvées

Exécutez le script SQL dans Supabase Dashboard :
```bash
supabase-schema-faithchronicles-only.sql
```

## 📚 Documentation

| Document | Description |
|----------|-------------|
| [SUPABASE_QUICKSTART.md](./SUPABASE_QUICKSTART.md) | Guide de configuration rapide |
| [TROUBLESHOOTING_AUTH.md](./TROUBLESHOOTING_AUTH.md) | Guide de dépannage complet |
| [CHANGELOG_AUTH_FIX.md](./CHANGELOG_AUTH_FIX.md) | Détails des corrections apportées |
| [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) | Documentation technique Supabase |

## 🔐 Sécurité

- ✅ Row Level Security (RLS) activé sur toutes les tables
- ✅ Authentification sécurisée avec Supabase Auth
- ✅ Variables d'environnement pour les clés sensibles
- ✅ Clé `anon` uniquement (pas de `service_role` côté client)

## 🚀 Déploiement

### Vercel

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel

# Configurer les variables d'environnement dans Vercel Dashboard
```

### Netlify

```bash
# Installer Netlify CLI
npm i -g netlify-cli

# Déployer
netlify deploy --prod
```

N'oubliez pas de configurer les variables d'environnement dans les settings de votre plateforme.

## 📜 Scripts Disponibles

### `npm start`

Lance l'application en mode développement sur http://localhost:3000

### `npm run build`

Crée une version optimisée pour la production dans le dossier `build/`

### `npm test`

Lance les tests en mode interactif

## 🛠️ Technologies Utilisées

- **React** 18.x - Framework JavaScript
- **Supabase** - Backend as a Service (BaaS)
  - Authentification
  - Base de données PostgreSQL
  - Row Level Security
- **TailwindCSS** - Framework CSS utilitaire
- **React Hooks** - Gestion d'état moderne

## 📈 Améliorations Récentes

### Version 1.1.0 (21 octobre 2025)

✅ **Correction des erreurs d'authentification**
- Vérification de session avant chaque requête
- Retry automatique sur erreurs réseau (3x)
- Politiques RLS complètes (INSERT, SELECT, UPDATE, DELETE)
- Messages d'erreur améliorés

✅ **Nouvelle documentation**
- Guide de configuration rapide
- Guide de dépannage complet
- Script de test automatisé

Voir [CHANGELOG_AUTH_FIX.md](./CHANGELOG_AUTH_FIX.md) pour plus de détails.

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Forkez le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add AmazingFeature'`)
4. Poussez vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

- 📖 [Documentation complète](./SUPABASE_QUICKSTART.md)
- 🐛 [Dépannage](./TROUBLESHOOTING_AUTH.md)
- 💬 [Issues GitHub](https://github.com/unispourlapaix/faithchronicles/issues)

## 👏 Remerciements

- Données bibliques provenant de sources libres de droits
- Communauté Supabase pour l'excellente documentation
- Tous les contributeurs du projet

---

**Développé avec ❤️ pour partager la Parole de Dieu de manière interactive**
