# 🧪 Guide de Test - Authentification par Mot de Passe

## ✅ ÉTAPE 1 : CRÉER UN COMPTE (Inscription)

1. Ouvrez http://localhost:3000
2. Cliquez sur le bouton **VERT** "Connexion simple" 🔒
3. **REGARDEZ EN HAUT** : Vous voyez 2 boutons côte à côte
   ```
   [ Connexion ]  [ Inscription ]
   ```
4. **CLIQUEZ SUR "Inscription"** (le bouton de DROITE)
5. L'icône change : 👤 UserPlus apparaît
6. Le titre devient : **"Créer un compte"**

7. Remplissez :
   - **Email** : `test@example.com`
   - **Mot de passe** : `test123456`
   - **Cliquez sur l'œil 👁️** pour vérifier votre mot de passe

8. Cliquez sur **"Créer mon compte"**

### ✅ Résultat attendu :
```
✅ Compte créé ! Connexion...
```
→ Vous êtes automatiquement connecté et redirigé vers le jeu

---

## ✅ ÉTAPE 2 : SE CONNECTER (avec le compte existant)

1. Si vous êtes connecté, déconnectez-vous d'abord
2. Ou rechargez la page : http://localhost:3000
3. Cliquez sur **"Connexion simple"** 🔒
4. **Cette fois, restez sur "Connexion"** (bouton de GAUCHE)
5. L'icône est 🔒 Lock
6. Le titre est : **"Connexion simple"**

7. Entrez **les mêmes identifiants** :
   - **Email** : `test@example.com`
   - **Mot de passe** : `test123456`

8. Cliquez sur **"Se connecter"**

### ✅ Résultat attendu :
```
✅ Connexion réussie !
```
→ Vous êtes connecté avec votre compte existant

---

## ❌ ERREURS POSSIBLES

### "Email ou mot de passe incorrect"
**Cause** : Le compte n'existe pas
**Solution** : Utilisez le mode **"Inscription"** d'abord

### "Cet email est déjà utilisé"
**Cause** : Vous avez déjà créé ce compte
**Solution** : Utilisez le mode **"Connexion"** avec le même mot de passe

### Je ne vois pas le toggle Connexion/Inscription
**Solution** : Rechargez la page (Ctrl+F5)

---

## 🎯 DIFFÉRENCES VISUELLES

| Mode | Icône | Titre | Bouton |
|------|-------|-------|--------|
| **Inscription** | 👤 UserPlus (personne+) | "Créer un compte" | "Créer mon compte" |
| **Connexion** | 🔒 Lock (cadenas) | "Connexion simple" | "Se connecter" |

---

## 🔍 VÉRIFICATION SUPABASE

Après avoir créé le compte, vérifiez qu'il apparaît dans Supabase :

1. Ouvrez : https://supabase.com/dashboard/project/dmszyxowetilvsanqsxm/auth/users
2. Vous devriez voir votre utilisateur :
   - Email : test@example.com
   - Created At : (date du jour)
   - Email Confirmed : true
   - Provider : email

---

## 📝 NOTES IMPORTANTES

- **Inscription** = Créer un NOUVEAU compte
- **Connexion** = Se connecter avec un compte EXISTANT
- Le mot de passe doit avoir **minimum 6 caractères**
- Utilisez l'œil 👁️ pour voir ce que vous tapez
- Les comptes sont stockés dans Supabase (pas en local)

---

**Bon test ! 🚀**
