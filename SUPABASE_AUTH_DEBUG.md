# 🔍 Diagnostic Supabase Auth - Aucun Utilisateur Créé

## ❌ Problème
**Symptôme** : Pas d'utilisateur créé lors du signup (ni en base, ni dans le dashboard)

**Impact** : Impossible de créer des comptes utilisateurs

---

## 📋 Checklist de Diagnostic

### Étape 1 : Vérifier les Paramètres Auth Supabase

Allez sur : https://supabase.com/dashboard/project/dmszyxowetilvsanqsxm/settings/auth

#### A. Email Provider ✅
- [ ] **Enable Email provider** : Doit être **ON** (activé)
- [ ] **Enable Email Signup** : Doit être **ON** (activé)
  - ⚠️ **SI DÉSACTIVÉ** : C'EST LE PROBLÈME ! Aucun compte ne peut être créé

#### B. Email Confirmations 📧
Vous avez 2 options :

**Option 1 : Sans confirmation email (plus simple pour tester)**
- [ ] **Enable email confirmations** : **OFF** (désactivé)
- ✅ Avantage : Comptes créés instantanément
- ❌ Inconvénient : Pas de vérification email

**Option 2 : Avec confirmation email (plus sécurisé)**
- [ ] **Enable email confirmations** : **ON** (activé)
- [ ] **Autoconfirm users** : **ON** si disponible
- [ ] **SMTP configuré** : Vérifier dans Settings → Auth → SMTP Settings
- ✅ Avantage : Validation des emails
- ❌ Inconvénient : Besoin de configurer SMTP

#### C. Rate Limiting (Limite de création)
- [ ] Vérifier **Rate limits** dans Settings → Auth
- [ ] Si trop restrictif (ex: 1 signup/heure), augmenter la limite

---

### Étape 2 : Test Console Browser (F12)

1. Ouvrez http://localhost:3005/unityquest-chronicles-of-love
2. Appuyez sur **F12** pour ouvrir la console
3. Allez sur "Connexion simple"
4. Cliquez sur "Inscription"
5. Entrez : **test100@example.com** / **password123**
6. Cliquez "Créer mon compte"

**Logs attendus** :
```
📝 Tentative d'inscription: test100@example.com
✅ Inscription réussie: test100@example.com
```

**Si erreur** :
```
❌ Erreur inscription: { message: "...", status: ... }
```

**Codes d'erreur courants** :
- `400` : Email invalide ou déjà utilisé
- `403` : Signup désactivé dans Supabase ⚠️ **C'EST LE PROBLÈME**
- `422` : Validation échouée
- `429` : Trop de requêtes (rate limit)
- `500` : Erreur serveur Supabase

---

### Étape 3 : Vérifier dans Dashboard Supabase

Après chaque tentative, vérifiez :
- https://supabase.com/dashboard/project/dmszyxowetilvsanqsxm/auth/users

**Résultats possibles** :
1. ✅ **Utilisateur créé avec "Confirmed: false"** 
   → Email confirmation activée mais email pas envoyé
   
2. ✅ **Utilisateur créé avec "Confirmed: true"**
   → Tout fonctionne !
   
3. ❌ **Aucun utilisateur** 
   → Signup probablement désactivé dans Settings

---

## 🔧 Solutions Rapides

### Solution 1 : Activer le Signup (Si désactivé)

1. Allez sur : https://supabase.com/dashboard/project/dmszyxowetilvsanqsxm/settings/auth
2. Cherchez **"Enable signup"** ou **"Allow new users to sign up"**
3. Activez le toggle ✅ **ON**
4. Cliquez **"Save"** en bas de page
5. Retestez immédiatement

### Solution 2 : Désactiver Confirmation Email (Pour tester)

1. Dans Settings → Auth
2. Cherchez **"Enable email confirmations"**
3. Désactivez ❌ **OFF**
4. Sauvegardez
5. Retestez

### Solution 3 : Configurer SMTP (Pour emails)

Si vous voulez garder la confirmation email :

1. Settings → Auth → SMTP Settings
2. Utilisez **Supabase Built-in SMTP** (recommandé) OU
3. Configurez votre propre SMTP :
   - Host : smtp.gmail.com (par exemple)
   - Port : 587
   - Username : votre-email@gmail.com
   - Password : app-specific password
4. Testez l'envoi d'email de test
5. Retestez le signup

---

## 📊 Tableau de Diagnostic Rapide

| Symptôme | Cause Probable | Solution |
|----------|----------------|----------|
| Pas d'utilisateur créé du tout | Signup désactivé dans Supabase | Activer "Enable signup" |
| Utilisateur créé mais pas confirmé | Email confirmation activée sans SMTP | Désactiver confirmation OU configurer SMTP |
| Erreur 403 dans console | Signup désactivé | Activer signup dans Settings |
| Erreur 429 dans console | Rate limit dépassé | Augmenter les limites ou attendre |
| Message "Email already registered" | Email déjà utilisé | Utiliser un autre email (test101@example.com) |

---

## 🎯 Action Immédiate Recommandée

**Commencez par ici** :

1. ✅ Ouvrez : https://supabase.com/dashboard/project/dmszyxowetilvsanqsxm/settings/auth
2. ✅ Vérifiez que **"Enable signup"** est **ON**
3. ✅ Si vous voulez tester rapidement :
   - Désactivez **"Enable email confirmations"**
   - Sauvegardez
4. ✅ Retestez avec **test200@example.com**
5. ✅ Vérifiez dans Auth → Users si l'utilisateur apparaît

---

## 📞 Si Rien ne Fonctionne

Si après avoir activé signup, aucun utilisateur n'est créé :

1. Vérifiez les **logs Supabase** :
   - https://supabase.com/dashboard/project/dmszyxowetilvsanqsxm/logs/edge-logs
   
2. Vérifiez que votre **projet n'est pas en pause** :
   - Dashboard → Project Settings → General
   - Status doit être "Active" ✅

3. Essayez de créer un utilisateur **manuellement** :
   - Auth → Users → "Add user"
   - Si ça marche → Problème dans le code
   - Si ça ne marche pas → Problème Supabase

4. Vérifiez la **clé API** dans .env :
   ```env
   REACT_APP_SUPABASE_URL=https://dmszyxowetilvsanqsxm.supabase.co
   REACT_APP_SUPABASE_ANON_KEY=eyJhbGc...
   ```

---

## ✅ Prochaines Étapes

Une fois que le signup fonctionne :

1. [ ] Décider si vous gardez la confirmation email
2. [ ] Si OUI : Configurer SMTP correctement
3. [ ] Si NON : Laisser désactivé
4. [ ] Tester en production avec les GitHub Secrets
5. [ ] Vérifier les redirect URLs pour magic links

---

**Commencez par vérifier "Enable signup" dans les settings ! C'est la cause la plus probable. 🎯**
