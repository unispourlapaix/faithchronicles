# 🔐 Politique de Sécurité

## 🛡️ Versions Supportées

| Version | Support |
| ------- | ------- |
| main (production) | ✅ Supporté |
| Anciennes versions | ❌ Non supporté |

---

## 🚨 Signaler une Vulnérabilité

Si vous découvrez une vulnérabilité de sécurité, **NE PAS** créer d'issue publique.

### Contactez-nous directement

📧 **Email** : emmanuelpayet888@gmail.com  
🔒 **Sujet** : `[SECURITY] Vulnérabilité dans FaithChronicles`

### Informations à inclure

- Type de vulnérabilité
- Localisation (fichier, ligne)
- Impact potentiel
- Étapes pour reproduire (si applicable)
- Solution suggérée (optionnelle)

### Temps de réponse

- **Première réponse** : 48 heures
- **Analyse** : 7 jours
- **Correction** : Selon la gravité (critique : 24h, haute : 7j, moyenne : 30j)

---

## ✅ Pratiques de Sécurité Actuelles

### Architecture Supabase

1. **Clés Publiques (`anon`)**
   - ✅ Utilisées dans le frontend (NORMAL)
   - ✅ Protégées par Row Level Security (RLS)
   - ✅ Visibles dans le code source (par design)

2. **Clés Privées (`service_role`)**
   - ✅ JAMAIS utilisées dans ce projet
   - ✅ JAMAIS committées dans Git
   - ✅ Backend uniquement (si nécessaire)

### Protection des Données

1. **Row Level Security (RLS)**
   - ✅ Active sur toutes les tables
   - ✅ Utilisateurs ne voient que leurs propres données
   - ✅ Impossible d'accéder aux données d'autres utilisateurs

2. **Authentification**
   - ✅ Email + Password avec Supabase Auth
   - ✅ Confirmation email obligatoire
   - ✅ Tokens JWT sécurisés

3. **Secrets GitHub**
   - ✅ Clés Supabase stockées dans GitHub Secrets
   - ✅ Injectées au build (pas dans le code source)
   - ✅ `.env` exclu de Git

### Surveillance

- ✅ GitGuardian activé (détection de fuites)
- ✅ Dependabot (mises à jour de sécurité)
- ✅ Code scanning (analyse statique)

---

## 🔒 Recommandations pour les Contributeurs

### DO ✅

- ✅ Utilisez `.env.local` pour vos clés locales
- ✅ Committez uniquement `.env.example` (sans vraies valeurs)
- ✅ Utilisez GitHub Secrets pour les secrets de production
- ✅ Testez RLS sur toutes les nouvelles tables Supabase
- ✅ Activez 2FA sur votre compte GitHub

### DON'T ❌

- ❌ Ne committez JAMAIS de fichier `.env`
- ❌ Ne hardcodez JAMAIS de clés `service_role`
- ❌ Ne désactivez JAMAIS RLS en production
- ❌ Ne partagez JAMAIS vos clés privées
- ❌ Ne stockez JAMAIS de mots de passe en clair

---

## 📋 Checklist de Sécurité (pour PR)

Avant de soumettre une Pull Request, vérifiez :

- [ ] Aucun fichier `.env` dans les changements
- [ ] Aucun mot de passe en clair dans le code
- [ ] RLS testée sur les nouvelles tables
- [ ] Pas de clé `service_role` dans le frontend
- [ ] Dependencies mises à jour (pas de vulnérabilités connues)
- [ ] GitGuardian ne détecte aucun secret réel

---

## 🎓 Comprendre les Fausses Alertes

### Clé Supabase `anon` Publique

**Ce n'est PAS une fuite de sécurité !**

- ✅ Cette clé est FAITE pour être publique
- ✅ Elle est protégée par RLS (Row Level Security)
- ✅ Aucun risque pour les données utilisateurs
- ✅ Architecture standard Supabase

**Pourquoi GitGuardian alerte ?**
- GitGuardian détecte automatiquement les patterns JWT
- Il ne fait pas la différence entre `anon` et `service_role`
- Ces alertes peuvent être marquées comme "False Positive"

**Comment vérifier ?**
```javascript
// ✅ SAFE : Clé anon publique
const supabase = createClient(url, anonKey);

// ❌ DANGER : Clé service_role (bypass RLS)
const supabase = createClient(url, serviceRoleKey);
```

---

## 📚 Ressources

- [Supabase Security Best Practices](https://supabase.com/docs/guides/auth/row-level-security)
- [GitHub Security Advisories](https://docs.github.com/en/code-security)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)

---

## 🏆 Hall of Fame

Contributeurs ayant signalé des vulnérabilités :

_Aucune vulnérabilité signalée pour le moment._

---

**Dernière mise à jour** : 10 novembre 2025  
**Politique version** : 1.0
