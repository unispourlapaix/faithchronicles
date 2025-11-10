# 🔐 Configuration des Secrets GitHub - Guide Complet

## ❌ Problème Détecté
**Erreur** : "Aucun token trouvé dans la production"

**Cause** : Les secrets GitHub ne sont pas configurés, donc Supabase n'est pas initialisé en production.

---

## 📋 Prérequis

Vous avez besoin de :
1. ✅ Accès administrateur au repository GitHub
2. ✅ Vos clés Supabase (URL + Anon Key)
3. ✅ 5 minutes de votre temps

---

## 🔑 Étape 1 : Récupérer vos clés Supabase

### Option A : Depuis votre fichier `.env` local

Si vous avez un fichier `.env` qui fonctionne en local :

```bash
# Ouvrez votre fichier .env
cat .env

# Vous verrez quelque chose comme :
REACT_APP_SUPABASE_URL=https://xxxxxx.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Option B : Depuis le Dashboard Supabase

1. Allez sur [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Sélectionnez votre projet **FaithChronicles** / **Jeuxchretiensscores**
3. Allez dans **Settings** ⚙️ → **API**
4. Copiez :
   - **Project URL** (commence par `https://...supabase.co`)
   - **anon public** (commence par `eyJ...`)

---

## 🛠️ Étape 2 : Ajouter les Secrets sur GitHub

### 1. Accéder aux Secrets

1. Allez sur votre repository :
   ```
   https://github.com/unispourlapaix/unityquest-chronicles-of-love
   ```

2. Cliquez sur **⚙️ Settings** (en haut à droite)

3. Dans le menu de gauche, cliquez sur **Secrets and variables** → **Actions**

### 2. Ajouter REACT_APP_SUPABASE_URL

1. Cliquez sur **New repository secret** (bouton vert)

2. Remplissez :
   - **Name** : `REACT_APP_SUPABASE_URL`
   - **Secret** : Collez votre URL Supabase
     ```
     https://dmszyxowetilvsanqsxm.supabase.co
     ```
     *(Remplacez par votre vraie URL)*

3. Cliquez sur **Add secret**

### 3. Ajouter REACT_APP_SUPABASE_ANON_KEY

1. Cliquez à nouveau sur **New repository secret**

2. Remplissez :
   - **Name** : `REACT_APP_SUPABASE_ANON_KEY`
   - **Secret** : Collez votre clé anon complète
     ```
     eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRtc3p5eG93ZXRpbHZzYW5xc3htIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NzM0NDUsImV4cCI6MjA3NTM0OTQ0NX0.EukDYFVt0sCrDb0_V4ZPMv5B4gkD43V8Cw7CEuvl0C8
     ```
     *(Remplacez par votre vraie clé)*

3. Cliquez sur **Add secret**

---

## ✅ Étape 3 : Vérifier la Configuration

Après avoir ajouté les deux secrets, vous devriez voir :

```
Repository secrets (2)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
REACT_APP_SUPABASE_ANON_KEY     Updated now
REACT_APP_SUPABASE_URL          Updated now
```

---

## 🚀 Étape 4 : Redéployer

### Option A : Push un nouveau commit

```bash
# Faites un petit changement (ex: ajoutez un espace dans README.md)
git add .
git commit -m "chore: trigger deployment with Supabase secrets"
git push origin main
```

### Option B : Re-run le dernier workflow

1. Allez dans l'onglet **Actions** de votre repository
2. Cliquez sur le dernier workflow
3. Cliquez sur **Re-run all jobs**

---

## 🧪 Étape 5 : Tester en Production

1. Attendez que le déploiement se termine (cercle vert ✅ dans Actions)

2. Ouvrez votre site :
   ```
   https://unispourlapaix.github.io/unityquest-chronicles-of-love
   ```

3. Ouvrez la console du navigateur (F12)

4. Vérifiez les logs :
   - ✅ Vous devriez voir : `✅ Supabase configuré`
   - ❌ Si vous voyez : `⚠️ Supabase non configuré` → Les secrets ne sont pas encore actifs

5. Testez la connexion :
   - Cliquez sur "Connexion Email"
   - Entrez votre email
   - Vous devriez recevoir un magic link

---

## 🔍 Troubleshooting

### Problème 1 : Secrets configurés mais toujours "non configuré"

**Solution** : Re-déclenchez un déploiement
```bash
git commit --allow-empty -m "chore: trigger rebuild"
git push origin main
```

### Problème 2 : Erreur "Invalid JWT"

**Cause** : La clé anon est incorrecte ou tronquée

**Solution** :
1. Retournez sur GitHub Secrets
2. Cliquez sur **REACT_APP_SUPABASE_ANON_KEY**
3. Cliquez sur **Update**
4. Re-collez la clé COMPLÈTE (commence par `eyJ` et fait ~200 caractères)
5. Sauvegardez et redéployez

### Problème 3 : "Connection refused"

**Cause** : L'URL Supabase est incorrecte

**Solution** :
1. Vérifiez que l'URL commence par `https://`
2. Vérifiez que l'URL se termine par `.supabase.co`
3. Pas d'espace avant/après l'URL
4. Mettez à jour le secret si nécessaire

### Problème 4 : Magic links ne fonctionnent pas

**Cause** : Les redirect URLs ne sont pas configurées

**Solution** :
1. Allez sur [Supabase Dashboard](https://supabase.com/dashboard)
2. **Settings** → **Authentication** → **URL Configuration**
3. Ajoutez ces URLs dans **Redirect URLs** :
   ```
   https://unispourlapaix.github.io/unityquest-chronicles-of-love
   http://localhost:3000
   http://localhost:3005
   ```
4. Sauvegardez

---

## 📊 Checklist Finale

Avant de dire que c'est terminé, vérifiez :

- [ ] Les deux secrets sont ajoutés sur GitHub (URL + Key)
- [ ] Les noms des secrets sont EXACTS (avec `REACT_APP_` au début)
- [ ] Pas d'espace avant/après les valeurs des secrets
- [ ] Un nouveau déploiement a été déclenché
- [ ] Le workflow GitHub Actions est passé au vert ✅
- [ ] La console du site affiche "Supabase configuré"
- [ ] La connexion par email fonctionne
- [ ] Les magic links arrivent dans votre boîte mail

---

## 🔒 Sécurité

### ✅ Ce qui est sécurisé :
- Les secrets GitHub sont chiffrés
- Seule la clé `anon` est utilisée (pas `service_role`)
- Row Level Security (RLS) protège vos données
- Les secrets ne sont jamais visibles dans les logs

### ❌ Ne JAMAIS faire :
- Commiter `.env` dans Git
- Partager votre clé `service_role`
- Désactiver RLS sur vos tables
- Mettre les secrets en clair dans le code

---

## 📞 Besoin d'Aide ?

Si après avoir suivi ce guide, Supabase ne fonctionne toujours pas :

1. Vérifiez les logs du workflow GitHub Actions
2. Ouvrez la console du navigateur (F12) sur votre site
3. Regardez les erreurs Supabase dans la console
4. Vérifiez que votre projet Supabase est actif (pas en pause)

---

## 🎯 Commande Rapide (PowerShell)

Pour vérifier rapidement si les secrets sont configurés :

```powershell
# Aller sur la page des secrets
start "https://github.com/unispourlapaix/unityquest-chronicles-of-love/settings/secrets/actions"

# Aller sur Actions pour voir les déploiements
start "https://github.com/unispourlapaix/unityquest-chronicles-of-love/actions"

# Ouvrir votre site en production
start "https://unispourlapaix.github.io/unityquest-chronicles-of-love"
```

---

**Bon déploiement ! 🚀**

Une fois les secrets configurés, Supabase fonctionnera automatiquement en production ! ✨
