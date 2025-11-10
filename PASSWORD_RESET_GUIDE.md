# 🔑 Configuration de la Réinitialisation de Mot de Passe

## 📝 Comment ça fonctionne

Lorsqu'un utilisateur oublie son mot de passe :

1. **Il clique sur "Mot de passe oublié ?"** dans l'écran de connexion
2. **Il entre son email** et clique sur "Envoyer le lien"
3. **Supabase envoie un email** avec un lien de réinitialisation
4. **L'utilisateur clique sur le lien** dans son email
5. **Il est redirigé vers FaithChronicles** avec un token de réinitialisation
6. **Il entre un nouveau mot de passe** (2 fois pour confirmation)
7. **Le mot de passe est mis à jour** et il peut se connecter

---

## ⚙️ Configuration Supabase (Important !)

### Étape 1 : Configurer les URLs de Redirection

Pour que les liens de réinitialisation fonctionnent, vous devez configurer les URLs autorisées dans Supabase :

1. Allez sur [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Sélectionnez votre projet **FaithChronicles**
3. Allez dans **Authentication** → **URL Configuration**
4. Dans **Redirect URLs**, ajoutez ces URLs :

```
https://unispourlapaix.github.io/unityquest-chronicles-of-love
http://localhost:3000
http://localhost:3005
```

5. Cliquez sur **Save**

### Étape 2 : Configurer l'Email Template (Optionnel)

Pour personnaliser l'email de réinitialisation :

1. Allez dans **Authentication** → **Email Templates**
2. Sélectionnez **Reset Password**
3. Personnalisez le template si vous le souhaitez
4. Assurez-vous que `{{ .ConfirmationURL }}` est présent dans le template

**Template par défaut recommandé** :
```html
<h2>Réinitialiser votre mot de passe</h2>
<p>Suivez ce lien pour réinitialiser le mot de passe de votre compte :</p>
<p><a href="{{ .ConfirmationURL }}">Réinitialiser le mot de passe</a></p>
<p>Si vous n'avez pas demandé de réinitialisation, ignorez cet email.</p>
```

---

## 🧪 Test Local

### 1. Lancer l'application

```bash
npm start
```

### 2. Tester la réinitialisation

1. Ouvrez http://localhost:3005/unityquest-chronicles-of-love
2. Cliquez sur **"Mot de passe oublié ?"**
3. Entrez un email valide (qui existe dans votre base de données)
4. Cliquez sur **"Envoyer le lien"**
5. Vérifiez votre boîte mail (ou les logs Supabase en développement)
6. Cliquez sur le lien dans l'email
7. Vous devriez arriver sur l'écran de réinitialisation
8. Entrez un nouveau mot de passe (2 fois)
9. Cliquez sur **"Mettre à jour le mot de passe"**
10. Vous êtes redirigé vers l'écran de connexion
11. Connectez-vous avec votre nouveau mot de passe

---

## 🔍 Détection Automatique

L'application détecte automatiquement quand un utilisateur arrive depuis un lien de réinitialisation :

```javascript
// Dans FaithChronicles.jsx
useEffect(() => {
  const hashParams = new URLSearchParams(window.location.hash.substring(1));
  const type = hashParams.get('type');
  
  if (type === 'recovery') {
    console.log('🔑 Lien de réinitialisation de mot de passe détecté');
    setCurrentScreen('password-reset');
  }
}, []);
```

Supabase redirige automatiquement vers votre application avec ces paramètres dans l'URL :
```
https://votre-site.com/#access_token=xxx&type=recovery&...
```

---

## 🎨 Interface Utilisateur

### Écran "Mot de passe oublié ?"

Affiche un formulaire avec :
- ✉️ Champ email
- 🔵 Message informatif bleu
- 🔑 Bouton "Envoyer le lien"
- ← Lien "Retour à la connexion"

### Écran "Nouveau mot de passe"

Affiche un formulaire avec :
- 🔒 Champ "Nouveau mot de passe"
- 🔒 Champ "Confirmer le mot de passe"
- 👁️ Bouton pour voir/cacher le mot de passe
- 💚 Bouton "Mettre à jour le mot de passe"
- ← Lien "Retour à la connexion"

---

## 🌍 Support Multilingue

Toutes les interfaces de réinitialisation sont disponibles en **17 langues** :

- 🇫🇷 Français
- 🇬🇧 Anglais
- 🇪🇸 Espagnol
- 🇩🇪 Allemand
- 🇮🇹 Italien
- 🇵🇹 Portugais
- 🇷🇺 Russe
- 🇺🇦 Ukrainien
- 🇨🇳 Chinois
- 🇸🇦 Arabe
- 🇮🇱 Hébreu
- 🇯🇵 Japonais
- 🇰🇷 Coréen
- 🇮🇳 Hindi
- 🇰🇪 Swahili
- 🇵🇱 Polonais
- 🇨🇩 Lingala

---

## 🔐 Sécurité

### Fonctionnalités de Sécurité

✅ **Token à usage unique** : Le lien de réinitialisation ne fonctionne qu'une seule fois
✅ **Expiration** : Le token expire après un certain temps (configurable dans Supabase)
✅ **Validation** : Le mot de passe doit faire minimum 6 caractères
✅ **Confirmation** : L'utilisateur doit entrer 2 fois le nouveau mot de passe
✅ **HTTPS** : Toutes les communications sont chiffrées

### Bonnes Pratiques

- ✅ Le lien de réinitialisation est envoyé uniquement à l'email enregistré
- ✅ Aucune information sensible n'est révélée si l'email n'existe pas
- ✅ Le token n'est pas visible dans les logs côté client
- ✅ Le mot de passe est haché côté serveur par Supabase

---

## 🐛 Troubleshooting

### Problème 1 : "Lien de réinitialisation expiré ou invalide"

**Cause** : Le token a expiré ou a déjà été utilisé

**Solution** :
1. Retournez sur l'écran de connexion
2. Cliquez à nouveau sur "Mot de passe oublié ?"
3. Demandez un nouveau lien

### Problème 2 : L'email n'arrive pas

**Cause** : L'email est peut-être dans les spams, ou l'email n'existe pas

**Solution** :
1. Vérifiez votre dossier spam/courrier indésirable
2. Vérifiez que l'email est correct
3. En développement, vérifiez les logs Supabase Dashboard → Authentication → Logs

### Problème 3 : Le lien ne redirige pas vers l'application

**Cause** : Les Redirect URLs ne sont pas configurées dans Supabase

**Solution** :
1. Allez dans Supabase Dashboard → Authentication → URL Configuration
2. Ajoutez votre URL dans **Redirect URLs**
3. Sauvegardez et réessayez

### Problème 4 : "Les mots de passe ne correspondent pas"

**Cause** : Les deux champs de mot de passe sont différents

**Solution** :
1. Assurez-vous de taper exactement le même mot de passe dans les deux champs
2. Utilisez le bouton 👁️ pour voir ce que vous tapez

---

## 📊 Flow Complet

```
┌─────────────────────────────────────────┐
│  Écran CONNEXION                        │
│  [Mot de passe oublié?] ← Clic         │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│  Mode RÉINITIALISATION                  │
│  Email: user@example.com                │
│  [Envoyer le lien] ← Clic               │
└─────────────────────────────────────────┘
                    │
                    ▼
        📧 Email envoyé par Supabase
                    │
                    ▼
┌─────────────────────────────────────────┐
│  📧 INBOX de l'utilisateur              │
│  "Cliquez pour réinitialiser"           │
│  [Lien] ← Clic                          │
└─────────────────────────────────────────┘
                    │
                    ▼
   🌐 Redirection vers FaithChronicles
   avec token dans l'URL
                    │
                    ▼
┌─────────────────────────────────────────┐
│  Écran NOUVEAU MOT DE PASSE             │
│  Nouveau: ******                        │
│  Confirmer: ******                      │
│  [Mettre à jour] ← Clic                 │
└─────────────────────────────────────────┘
                    │
                    ▼
        🔐 Mot de passe mis à jour
                    │
                    ▼
┌─────────────────────────────────────────┐
│  Écran CONNEXION                        │
│  ✅ "Mot de passe mis à jour !"        │
│  Connectez-vous avec votre nouveau MDP  │
└─────────────────────────────────────────┘
```

---

## 🎯 Fichiers Modifiés

| Fichier | Description |
|---------|-------------|
| `useAuth.js` | Ajout de `resetPassword()` et `updatePassword()` |
| `LoginScreenSimple.jsx` | Ajout du mode 'reset' |
| `PasswordResetScreen.jsx` | Nouvel écran dédié à la mise à jour du mot de passe |
| `FaithChronicles.jsx` | Détection du `type=recovery` et affichage de PasswordResetScreen |
| `*/ui.js` (17 fichiers) | Ajout des traductions pour tous les messages |

---

## 🚀 Prochaines Étapes

1. ✅ Fonctionnalité implémentée
2. ✅ Traductions ajoutées (17 langues)
3. ⏳ **À FAIRE** : Configurer les Redirect URLs dans Supabase
4. ⏳ **À FAIRE** : Tester en local
5. ⏳ **À FAIRE** : Tester en production

---

**Réinitialisation de mot de passe complète et sécurisée ! 🎉**
