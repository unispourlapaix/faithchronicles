# 🧪 Guide de Test - Intégration Trésors de Jean

## Objectif
Vérifier que l'intégration de l'Évangile de Jean dans Faith Chronicles fonctionne correctement.

## Étapes de Test

### 1. Interface Utilisateur ✅
- [ ] Ouvrir Faith Chronicles dans le navigateur (port 3000 ou 3005)
- [ ] Vérifier que le menu principal a 4 boutons (Info, Trésors, **Jean**, Reset)
- [ ] Le bouton "Jean" doit avoir un badge rouge "N" (Nouveau)

### 2. Test du Composant Jean 🎯
- [ ] Cliquer sur le bouton "Jean"
- [ ] Une modal doit s'ouvrir avec le titre "Trésors de l'Évangile de Jean"
- [ ] Vérifier l'affichage :
  - Métadonnées de l'Évangile (version, nombre de versets)
  - Un trésor avec verset, référence et réflexion
  - Boutons "Nouveau trésor" et "Fermer"

### 3. Fonctionnalités 🔄
- [ ] Cliquer sur "Nouveau trésor" → Le contenu doit changer
- [ ] Répéter 3-4 fois pour voir différents versets
- [ ] Vérifier que les versets sont cohérents (Jean 3:16, 1:1, 14:6, etc.)

### 4. Console de Debug 🐛
- [ ] Ouvrir les outils développeur (F12)
- [ ] Aller dans l'onglet Console
- [ ] Chercher les logs :
  - "Loading John treasure..."
  - "getFamousJohnTreasures called with language: fr"
  - Erreurs éventuelles en rouge

### 5. Test de Fallback 🛡️
Si des erreurs apparaissent :
- [ ] Vérifier que des trésors s'affichent quand même (système de fallback)
- [ ] Les trésors de fallback doivent inclure Jean 3:16, 1:1, 14:6

## Résultats Attendus

### ✅ Succès
- Affichage des trésors sans erreur
- Changement de trésor au clic sur "Nouveau trésor"
- Métadonnées correctes (21 chapitres, 878 versets, 14 langues)

### ⚠️ Fallback Actif
- Trésors affichés mais avec logs d'erreur dans la console
- Utilisation des trésors hardcodés (Jean 3:16, etc.)

### ❌ Échec
- Message "Aucun trésor disponible"
- Erreurs bloquantes dans la console
- Modal ne s'ouvre pas

## Debug Avancé

### Console Logs Importantes
```javascript
// Logs de succès
"Loading John treasure..."
"getFamousJohnTreasures called with language: fr"
"Famous verses received: [...]"

// Logs de fallback
"No famous verses found, using fallback treasures"
"Error loading famous John treasures: [error]"
```

### Solutions Rapides
1. **Import Error**: Vérifier les chemins dans `bibleData.js`
2. **File Loading Error**: Problème avec les fichiers `.txt` dans `/gospel/john/`
3. **Method Not Found**: Problème d'export/import entre modules

## Status Actuel
- ✅ Composant JohnTreasuresDisplay créé
- ✅ Bouton Jean ajouté au MenuScreen
- ✅ Système de fallback implémenté
- ✅ Logs de debug ajoutés
- 🔄 Test en cours...