# 🎵 Faith Chronicles - Playlist Gospel Auto

## 🚀 Utilisation Simple

### 1. **Test Immédiat**
Ouvrir dans votre navigateur :
```
C:\Users\dream\OneDrive\Documents\GitHub\faithchronicles\public\audio\gospel\playlist.html
```

### 2. **Intégration dans Faith Chronicles**
Ajouter dans votre HTML (juste avant `</body>`) :
```html
<script src="/audio/gospel/faith-auto-play.js"></script>
```

### 3. **Contrôle via JavaScript**
```javascript
// Démarrer la musique
window.faithAudio.start();

// Arrêter
window.faithAudio.stop();

// Pause/Resume
window.faithAudio.toggle();

// Changer le volume (0.0 à 1.0)
window.faithAudio.setVolume(0.3);
```

## 🎼 Fonctionnalités

✅ **Auto-play** après première interaction utilisateur  
✅ **Lecture en boucle** des 6 meilleures chansons gospel  
✅ **Volume bas** (15%) pour ambiance discrète  
✅ **Fade-in progressif** pour éviter les sursauts  
✅ **Gestion d'erreurs** automatique  
✅ **Compatible** tous navigateurs modernes  

## 📋 Playlist Sélectionnée

1. **Il calme mon âme** - Paix spirituelle
2. **Avec sa Paix** - Sérénité
3. **Je porte une paix qui brille** - Lumière
4. **Blessed are you, O God eternal** - Bénédiction
5. **Amour Divin** - Amour spirituel  
6. **Il demeure en majesté** - Adoration

## ⚙️ Configuration

Modifier les paramètres dans `faith-auto-play.js` :
```javascript
const CONFIG = {
    volume: 0.15,           // Volume (0.0 à 1.0)
    autoStart: true,        // Démarrage auto
    fadeInDuration: 2000,   // Fondu entrée (ms)
    songGap: 500,          // Pause entre chansons (ms)
    retryDelay: 3000       // Délai retry erreur (ms)
};
```

## 🔧 Intégration Avancée

### Dans React (composant)
```jsx
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Charger le script
    const script = document.createElement('script');
    script.src = '/audio/gospel/faith-auto-play.js';
    document.body.appendChild(script);
    
    return () => {
      // Nettoyer à la fermeture
      if (window.faithAudio) {
        window.faithAudio.stop();
      }
    };
  }, []);

  return (
    <div>
      {/* Votre app */}
      <button onClick={() => window.faithAudio?.toggle()}>
        🎵 Toggle Musique
      </button>
    </div>
  );
}
```

### Dans HTML statique
```html
<!DOCTYPE html>
<html>
<head>
    <title>Faith Chronicles</title>
</head>
<body>
    <!-- Votre contenu -->
    
    <!-- Musique automatique -->
    <script src="/audio/gospel/faith-auto-play.js"></script>
</body>
</html>
```

## 📱 Compatibilité

✅ **Chrome/Edge** - Support complet  
✅ **Firefox** - Support complet  
✅ **Safari** - Support complet  
✅ **Mobile** - iOS/Android compatible  
⚠️ **Auto-play** - Nécessite interaction utilisateur (standard web)  

## 🎯 Avantages

- **Léger** : ~3KB seulement
- **Autonome** : Aucune dépendance
- **Discret** : Volume bas, pas d'interface
- **Robuste** : Gestion d'erreurs automatique
- **Optimisé** : Chansons 120kbps compressées

---

*Faith Chronicles Gospel Auto-Play v1.0*  
*Ambiance musicale spirituelle automatique*