# Configuration Supabase pour autoriser localhost

## Problème

Quand vous testez l'authentification par email en local (`localhost:3005`), le magic link ne fonctionne pas car Supabase n'autorise que certaines URLs de redirection.

## Solution : Ajouter localhost aux URL autorisées

### Étape 1 : Aller dans la configuration Supabase

1. Connectez-vous à [supabase.com](https://supabase.com)
2. Sélectionnez votre projet **Faith Chronicles**
3. Cliquez sur **⚙️ Settings** (roue dentée en bas à gauche)
4. Allez dans **Authentication** dans le menu de gauche

### Étape 2 : Ajouter les URL de redirection

Dans la section **URL Configuration**, trouvez le champ **Redirect URLs** (ou **Site URL / Redirect URLs**).

Ajoutez ces URLs (une par ligne) :

```
http://localhost:3000
http://localhost:3005
http://127.0.0.1:3000
http://127.0.0.1:3005
https://unispourlapaix.github.io/unityquest-chronicles-of-love
```

### Étape 3 : Sauvegarder

Cliquez sur **Save** en bas de la page.

## Explication

### Pourquoi ajouter ces URLs ?

- `http://localhost:3005` : Votre serveur de développement React
- `http://localhost:3000` : Port par défaut si vous changez
- `http://127.0.0.1:*` : Équivalent numérique de localhost
- `https://unispourlapaix.github.io/...` : Votre site en production

### Que se passe-t-il maintenant ?

✅ **AVANT (sans localhost autorisé)** :
1. Vous testez en local sur `localhost:3005`
2. Vous demandez un magic link
3. L'email contient un lien vers `localhost:3005`
4. ❌ Supabase refuse la redirection → Erreur "Invalid redirect URL"

✅ **APRÈS (avec localhost autorisé)** :
1. Vous testez en local sur `localhost:3005`
2. Vous demandez un magic link
3. L'email contient un lien vers `localhost:3005`
4. ✅ Vous cliquez dessus → Vous êtes redirigé vers `localhost:3005` et connecté !

## Sécurité

C'est **sécurisé** d'ajouter localhost car :
- Ces URLs ne sont accessibles QUE sur votre ordinateur
- Personne d'autre ne peut y accéder
- Elles sont utilisées uniquement pour le développement
- En production, seule l'URL GitHub Pages est utilisée

## Test

Après avoir ajouté les URLs :

1. Allez sur `http://localhost:3005`
2. Cliquez sur "Connexion Email"
3. Entrez votre email
4. Cliquez sur "Envoyer le lien"
5. Vérifiez votre email
6. Cliquez sur le magic link
7. ✅ Vous devriez être redirigé vers `localhost:3005` et connecté !

## Problème : L'app locale ne détecte pas la connexion en ligne

Si vous vous connectez sur **GitHub Pages** et que l'app **localhost** ne détecte pas la session :

**C'est normal !** `localhost` et `unispourlapaix.github.io` sont des **domaines différents**.

### Solutions :

**Option A (Recommandée)** : Connectez-vous séparément sur chaque environnement
- Sur **localhost** : Demandez un magic link depuis localhost
- Sur **production** : Demandez un magic link depuis GitHub Pages
- Chaque environnement a sa propre session

**Option B** : Testez uniquement sur GitHub Pages
- Faites vos modifications locales
- Committez et pushez
- Testez sur GitHub Pages
- Plus simple mais plus lent

**Option C** : Utilisez le mode anonyme en local
- Pas besoin d'email
- Progression locale uniquement
- Rapide pour tester

## Résumé

1. ✅ Ajoutez `localhost:3005` dans les Redirect URLs de Supabase
2. ✅ Sauvegardez la configuration
3. ✅ Testez l'authentification email en local
4. ✅ Les magic links fonctionneront maintenant !

## Commande pour redémarrer après modification

```bash
npm start
```

L'application React rechargera automatiquement avec la nouvelle configuration.
