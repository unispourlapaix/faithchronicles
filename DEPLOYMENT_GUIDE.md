# 🚀 Guide de Déploiement GitHub Pages

## Configuration Automatique ✅

Le projet est maintenant configuré pour un déploiement automatique sur GitHub Pages !

### 📋 Ce qui a été configuré :

1. **package.json** :
   - ✅ Homepage ajoutée : `https://unispourlapaix.github.io/unityquest-chronicles-of-love`
   - ✅ Scripts de déploiement ajoutés : `predeploy` et `deploy`
   - ✅ Package `gh-pages` installé

2. **GitHub Actions** :
   - ✅ Workflow créé : `.github/workflows/deploy.yml`
   - ✅ Déploiement automatique sur chaque push vers `main`

---

## 🎯 Méthode 1 : Déploiement Automatique (Recommandé)

### Étape 1 : Activer GitHub Pages sur le repo

1. Allez sur GitHub : https://github.com/unispourlapaix/unityquest-chronicles-of-love
2. Cliquez sur **Settings** (Paramètres)
3. Dans le menu de gauche, cliquez sur **Pages**
4. Dans **Source**, sélectionnez : `gh-pages` branch → `/ (root)` → **Save**

### Étape 2 : Pusher le code

```bash
git add -A
git commit -m "feat(deploy): Configure GitHub Pages deployment"
git push origin main
```

### Étape 3 : Attendre le déploiement

- GitHub Actions va automatiquement :
  1. ✅ Installer les dépendances
  2. ✅ Build l'application
  3. ✅ Déployer sur la branche `gh-pages`
  4. ✅ Publier sur GitHub Pages

- Suivez le statut dans l'onglet **Actions** de votre repo
- Durée : ~2-5 minutes

### Étape 4 : Accéder à votre site

Votre site sera disponible à : **https://unispourlapaix.github.io/unityquest-chronicles-of-love**

---

## 🛠️ Méthode 2 : Déploiement Manuel

Si vous préférez déployer manuellement :

```bash
# Build et déployer en une commande
npm run deploy
```

Cette commande :
1. Build l'application dans `/build`
2. Crée/met à jour la branche `gh-pages`
3. Push le contenu sur GitHub

---

## 🔄 Mises à jour futures

Une fois configuré, chaque `git push` sur `main` déclenchera automatiquement :
- ✅ Build de l'application
- ✅ Déploiement sur GitHub Pages
- ✅ Publication du nouveau contenu

---

## 🌐 Domaine personnalisé (Optionnel)

Si vous avez un domaine personnalisé (ex: faithchronicles.com) :

### 1. Configurer le DNS chez votre hébergeur :

```
Type: A
Host: @
Value: 185.199.108.153
       185.199.109.153
       185.199.110.153
       185.199.111.153

Type: CNAME
Host: www
Value: unispourlapaix.github.io
```

### 2. Créer un fichier CNAME :

```bash
echo "faithchronicles.com" > public/CNAME
git add public/CNAME
git commit -m "feat(deploy): Add custom domain"
git push
```

### 3. Dans GitHub Settings → Pages :
- Entrez votre domaine personnalisé
- Cochez "Enforce HTTPS"

---

## 📊 Vérifications Post-Déploiement

### Checklist :

- [ ] Le site est accessible à l'URL GitHub Pages
- [ ] Toutes les pages se chargent correctement
- [ ] Les images/logos s'affichent
- [ ] Les sons fonctionnent
- [ ] Le système XP fonctionne
- [ ] Les traductions des 17 langues fonctionnent
- [ ] Le PWA est installable
- [ ] Les favicons s'affichent

### Outils de test :

```bash
# Tester en local avant déploiement
npm run build
npx serve -s build -l 3000
```

Ouvrez http://localhost:3000 pour tester le build de production

---

## 🐛 Résolution de problèmes

### Erreur : "Page not found" (404)

**Solution 1** : Vérifier le basename dans React Router

Si vous utilisez React Router, ajoutez dans `src/index.tsx` :

```jsx
<BrowserRouter basename="/unityquest-chronicles-of-love">
  <App />
</BrowserRouter>
```

**Solution 2** : Ajouter un fichier 404.html

Créez `public/404.html` avec une redirection vers `index.html` :

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>FaithChronicles</title>
    <script>
      sessionStorage.redirect = location.href;
    </script>
    <meta http-equiv="refresh" content="0;URL='/'">
  </head>
</html>
```

### Erreur : "Failed to deploy"

Vérifiez :
1. Les permissions du repo (Settings → Actions → Workflow permissions → Read and write)
2. La branche `gh-pages` existe
3. GitHub Pages est activé dans Settings

### Erreur : Build failed

```bash
# Nettoyer et rebuilder
rm -rf node_modules build
npm install
npm run build
```

---

## 📱 PWA et Installation

Votre app est une PWA ! Les utilisateurs peuvent l'installer :

### Sur Mobile (Android/iOS) :
1. Ouvrir le site dans Chrome/Safari
2. Cliquer sur "Ajouter à l'écran d'accueil"
3. L'icône apparaît comme une vraie app

### Sur Desktop (Chrome/Edge) :
1. Icône "+" dans la barre d'adresse
2. "Installer FaithChronicles"
3. L'app s'ouvre dans sa propre fenêtre

---

## 🎉 Ressources

- [Documentation GitHub Pages](https://docs.github.com/en/pages)
- [gh-pages package](https://www.npmjs.com/package/gh-pages)
- [GitHub Actions](https://github.com/features/actions)
- [React Deployment](https://create-react-app.dev/docs/deployment/)

---

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifiez les logs dans l'onglet **Actions** sur GitHub
2. Consultez la documentation ci-dessus
3. Testez le build localement avant de pusher

**Bon déploiement ! 🚀✨**
