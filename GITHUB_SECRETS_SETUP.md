# 🔐 Configuration des Secrets GitHub pour Supabase

Ce guide vous montre comment configurer vos clés Supabase pour le déploiement sur GitHub Pages.

## 📋 Prérequis

Vous avez besoin de :
- ✅ Un compte GitHub avec accès au repository
- ✅ Vos clés Supabase (depuis `.env.local`)

## 🔑 Vos Clés Supabase

D'après votre fichier `.env.local`, vous avez :

```bash
URL: https://dmszyxowetilvsanqsxm.supabase.co
Projet: Jeuxchretiensscores
```

## 📝 Étapes de Configuration

### 1️⃣ Accéder aux Secrets GitHub

1. Allez sur votre repository GitHub :
   ```
   https://github.com/unispourlapaix/unityquest-chronicles-of-love
   ```

2. Cliquez sur **Settings** (Paramètres)

3. Dans le menu de gauche, cliquez sur **Secrets and variables** → **Actions**

4. Vous verrez la page "Actions secrets and variables"

### 2️⃣ Ajouter le Premier Secret : REACT_APP_SUPABASE_URL

1. Cliquez sur le bouton vert **"New repository secret"**

2. Remplissez les champs :
   - **Name** : `REACT_APP_SUPABASE_URL`
   - **Secret** : `https://dmszyxowetilvsanqsxm.supabase.co`

3. Cliquez sur **"Add secret"**

### 3️⃣ Ajouter le Second Secret : REACT_APP_SUPABASE_ANON_KEY

1. Cliquez à nouveau sur **"New repository secret"**

2. Remplissez les champs :
   - **Name** : `REACT_APP_SUPABASE_ANON_KEY`
   - **Secret** : Copiez votre clé anon complète depuis `.env.local`
     ```
     eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtc3p5eG93ZXRpbHZzYW5xc3htIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NzM0NDUsImV4cCI6MjA3NTM0OTQ0NX0.EukDYFVt0sCrDb0_V4ZPMv5B4gkD43V8Cw7CEuvl0C8
     ```

3. Cliquez sur **"Add secret"**

### 4️⃣ Vérification

Une fois les deux secrets ajoutés, vous devriez voir :

```
Repository secrets (2)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REACT_APP_SUPABASE_ANON_KEY     Updated now by [vous]
REACT_APP_SUPABASE_URL          Updated now by [vous]
```

## 🚀 Déploiement avec Supabase

### Déclenchement Automatique

Une fois les secrets configurés, le prochain déploiement les utilisera automatiquement :

```bash
git add -A
git commit -m "feat(config): Add Supabase environment variables to GitHub Actions"
git push origin main
```

Le workflow GitHub Actions va :
1. ✅ Récupérer les secrets
2. ✅ Les injecter comme variables d'environnement
3. ✅ Builder l'application avec Supabase activé
4. ✅ Déployer sur GitHub Pages

### Vérification du Déploiement

1. Allez dans l'onglet **Actions** de votre repo
2. Attendez que le workflow se termine (cercle vert ✅)
3. Ouvrez votre site : https://unispourlapaix.github.io/unityquest-chronicles-of-love
4. Ouvrez la console (F12)
5. Vous devriez voir : `✅ Supabase configuré` au lieu de `⚠️ Supabase non configuré`

## 🔍 Détails Techniques

### Workflow Modifié

Le fichier `.github/workflows/deploy.yml` utilise maintenant :

```yaml
- name: Build
  run: npm run build
  env:
    CI: false
    REACT_APP_SUPABASE_URL: ${{ secrets.REACT_APP_SUPABASE_URL }}
    REACT_APP_SUPABASE_ANON_KEY: ${{ secrets.REACT_APP_SUPABASE_ANON_KEY }}
```

### Environnements

| Environnement | Configuration | Supabase |
|---------------|---------------|----------|
| **Local** (npm start) | `.env.local` | ✅ Activé |
| **GitHub Pages** | GitHub Secrets | ✅ Activé (après config) |
| **Build sans secrets** | Aucune | ⚠️ Mode hors-ligne |

## 🔒 Sécurité

### ✅ Bonnes Pratiques Appliquées

- ✅ `.env.local` est dans `.gitignore` (jamais committé)
- ✅ Les secrets GitHub sont chiffrés
- ✅ Seule la clé `anon` est utilisée (pas `service_role`)
- ✅ Row Level Security (RLS) protège les données

### ⚠️ Important

**NE JAMAIS :**
- ❌ Commiter `.env.local` dans Git
- ❌ Partager votre clé `service_role`
- ❌ Mettre les clés directement dans le code source
- ❌ Désactiver RLS sur vos tables Supabase

**TOUJOURS :**
- ✅ Utiliser la clé `anon` côté client
- ✅ Configurer RLS sur toutes vos tables
- ✅ Utiliser les secrets GitHub pour la production
- ✅ Vérifier `.gitignore` avant de commit

## 🆘 Résolution de Problèmes

### Erreur : "Supabase non configuré" sur GitHub Pages

**Cause** : Les secrets ne sont pas configurés ou mal nommés

**Solution** :
1. Vérifiez que les noms sont EXACTEMENT : `REACT_APP_SUPABASE_URL` et `REACT_APP_SUPABASE_ANON_KEY`
2. Les secrets sont sensibles à la casse
3. Pas d'espaces avant/après les valeurs
4. Redéployez après avoir ajouté les secrets

### Erreur de Build dans Actions

**Cause** : Clé invalide ou URL incorrecte

**Solution** :
1. Vérifiez que l'URL contient bien `supabase.co`
2. Vérifiez que la clé anon est complète (commence par `eyJ...`)
3. Testez en local d'abord avec `.env.local`

### Les données ne se sauvent pas

**Cause** : RLS non configuré ou permissions manquantes

**Solution** :
1. Allez sur Supabase Dashboard
2. Table `game_progress` → Policies
3. Créez les politiques RLS appropriées
4. Consultez `SUPABASE_SETUP.md` pour les exemples

## 📚 Ressources

- [Documentation GitHub Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Documentation Supabase](https://supabase.com/docs)
- [Guide Supabase local](./SUPABASE_SETUP.md)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

## ✅ Checklist de Déploiement

Avant de pusher :

- [ ] `.env.local` existe et fonctionne en local
- [ ] Les deux secrets sont ajoutés sur GitHub
- [ ] Les noms des secrets sont corrects (avec `REACT_APP_`)
- [ ] Le workflow `.github/workflows/deploy.yml` est à jour
- [ ] RLS est configuré sur vos tables Supabase
- [ ] Vous avez testé la connexion en local

Après le push :

- [ ] Le workflow Actions s'exécute sans erreur
- [ ] Le site est déployé sur GitHub Pages
- [ ] La console affiche "Supabase configuré"
- [ ] La connexion utilisateur fonctionne
- [ ] La sauvegarde cloud fonctionne

---

**Bon déploiement ! 🚀**

Si vous avez des questions, consultez `DEPLOYMENT_GUIDE.md` ou `SUPABASE_SETUP.md`.
