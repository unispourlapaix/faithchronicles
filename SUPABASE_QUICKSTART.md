# Configuration Supabase - Guide Rapide

## 🚀 Mise en Place Rapide

### Étape 1: Configuration Supabase

1. **Créer un compte Supabase** (si pas déjà fait)
   - Allez sur https://supabase.com
   - Créez un compte gratuit

2. **Créer un nouveau projet**
   - Cliquez sur "New Project"
   - Nom: `faithchronicles` (ou au choix)
   - Région: Choisir la plus proche de vos utilisateurs
   - Mot de passe base de données: Choisir un mot de passe fort

3. **Obtenir les clés d'API**
   - Allez dans `Settings` → `API`
   - Copiez:
     - **Project URL** (ex: `https://xxxxx.supabase.co`)
     - **anon public** key (longue chaîne de caractères)

### Étape 2: Configuration Locale

1. **Créer le fichier `.env.local`**

```bash
# À la racine du projet
cp .env.local.example .env.local
```

2. **Remplir les valeurs**

Ouvrez `.env.local` et remplacez:

```env
REACT_APP_SUPABASE_URL=https://xxxxx.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Étape 3: Créer les Tables

1. **Dans Supabase Dashboard**, allez dans `SQL Editor`

2. **Exécutez le schéma SQL**
   - Copiez le contenu de `supabase-schema-faithchronicles-only.sql`
   - Collez dans l'éditeur SQL
   - Cliquez sur "Run"

3. **Vérifiez la création**
   - Allez dans `Table Editor`
   - Vous devriez voir:
     - ✅ `faithchronicles_profiles`
     - ✅ `faithchronicles_game_progress`
     - ✅ `faithchronicles_level_stars`

### Étape 4: Configurer l'Authentification

1. **Dans Supabase Dashboard**, allez dans `Authentication` → `Providers`

2. **Activer Email Auth**
   - Email: ✅ Activé
   - Confirm email: Optionnel (désactivé pour dev)

3. **Configuration supplémentaire (optionnel)**
   - Google OAuth
   - GitHub OAuth
   - etc.

### Étape 5: Démarrer l'Application

```bash
# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm start
```

L'application devrait s'ouvrir sur http://localhost:3000

---

## ✅ Vérification de l'Installation

### Test 1: Connexion Supabase

Ouvrez la console du navigateur (F12) et tapez:

```javascript
// Vérifier l'URL
console.log(process.env.REACT_APP_SUPABASE_URL);
// Devrait afficher: https://xxxxx.supabase.co

// Vérifier la connexion
const { data } = await supabase.from('faithchronicles_profiles').select('count');
console.log('Connexion OK:', data);
```

### Test 2: Inscription

1. Allez sur l'écran de connexion
2. Créez un nouveau compte
3. Vérifiez dans Supabase Dashboard → Authentication → Users
4. Votre utilisateur devrait apparaître

### Test 3: Sauvegarde

1. Connectez-vous
2. Jouez un niveau
3. Vérifiez dans Table Editor → `faithchronicles_game_progress`
4. Votre progression devrait être enregistrée

---

## 🔧 Dépannage

### Problème: "Supabase non configuré"

**Cause:** Les variables d'environnement ne sont pas chargées

**Solutions:**
1. Vérifiez que `.env.local` existe à la racine
2. Redémarrez le serveur React (`Ctrl+C` puis `npm start`)
3. Vérifiez qu'il n'y a pas d'espaces dans les valeurs
4. Les clés doivent commencer par `REACT_APP_`

### Problème: Erreurs 401 Unauthorized

**Cause:** Session non active ou RLS mal configuré

**Solutions:**
1. Vérifiez que vous êtes connecté
2. Vérifiez les politiques RLS dans Supabase Dashboard
3. Consultez `TROUBLESHOOTING_AUTH.md` pour plus de détails

### Problème: Tables non créées

**Cause:** Erreur SQL lors de l'exécution du schéma

**Solutions:**
1. Vérifiez les erreurs dans l'éditeur SQL
2. Exécutez les commandes une par une
3. Vérifiez les permissions de votre compte Supabase

---

## 📚 Fichiers de Configuration

| Fichier | Description | Commiter ? |
|---------|-------------|------------|
| `.env.local` | Configuration locale | ❌ NON |
| `.env.local.example` | Template de configuration | ✅ OUI |
| `supabase-schema-faithchronicles-only.sql` | Schéma SQL | ✅ OUI |
| `.gitignore` | Fichiers ignorés | ✅ OUI |

---

## 🔐 Sécurité

### ⚠️ Important

- **NE JAMAIS** commiter `.env.local` dans Git
- **NE JAMAIS** utiliser la clé `service_role` côté client
- **TOUJOURS** utiliser Row Level Security (RLS)

### Bonnes Pratiques

1. **Variables d'environnement en production**
   - Utilisez les secrets de votre plateforme de déploiement
   - Vercel: Settings → Environment Variables
   - Netlify: Site settings → Build & deploy → Environment

2. **Rotation des clés**
   - Changez régulièrement les clés API
   - Révoquées les anciennes clés

3. **Monitoring**
   - Surveillez les logs Supabase
   - Activez les alertes en cas d'activité suspecte

---

## 🎯 Prochaines Étapes

Après avoir configuré Supabase:

1. ✅ Testez l'inscription/connexion
2. ✅ Jouez quelques niveaux pour tester la sauvegarde
3. ✅ Vérifiez que la progression persiste après rechargement
4. 📖 Consultez `TROUBLESHOOTING_AUTH.md` si problèmes
5. 🚀 Déployez en production

---

## 📞 Ressources

- [Documentation Supabase](https://supabase.com/docs)
- [Guide RLS](https://supabase.com/docs/guides/auth/row-level-security)
- [Guide d'authentification](https://supabase.com/docs/guides/auth)
- [TROUBLESHOOTING_AUTH.md](./TROUBLESHOOTING_AUTH.md) - Guide de dépannage complet
- [CHANGELOG_AUTH_FIX.md](./CHANGELOG_AUTH_FIX.md) - Détails des corrections

---

**Temps estimé:** 10-15 minutes
**Difficulté:** Facile 🟢
