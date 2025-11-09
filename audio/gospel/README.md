# 🎵 Faith Chronicles - Chansons Gospel

Ce dossier contient la collection de 24 chansons gospel spirituelles pour Faith Chronicles.

## 📂 Contenu

### 🎼 Collection complète : 24 chansons
- **Format** : MP3 192kbps (qualité CD)
- **Langues** : Français, Anglais, Mixte
- **Catégories** : 15 thèmes spirituels différents

## 🎵 Catégories de chansons

### 🙏 **Adoration & Louange**
- Aimé(e) Tel(le) Que Tu Es
- Amour Divin
- Il demeure en majesté
- Je lève les mains vers les lieux saints

### 🕊️ **Paix & Sérénité**
- Avec sa Paix
- Il calme mon âme
- Je porte une paix qui brille dans la nuit
- J'ai poursuivi la Paix

### 💪 **Force & Courage**
- Avec toi, je tiens bon, ô Jésus mon Roi
- Des Maux dans mon viseur... (remix)

### 📢 **Témoignage & Déclaration**
- Elle m'a dit, Il est vivant
- Je n'ai point honte de l'Évangile
- Je proclame sur ma vie

### 🤝 **Invitation spirituelle**
- Fais un pas en avant… Et je te ferai grâce
- Fais un pas en avant…
- Écoute, crois et vis

### 🌟 **Espoir & Guérison**
- Il y a un espoir pour toi, pour moi
- Guérit mon coeur
- Blessed are you, O God eternal

### 🔥 **Inspiration & Vérité**
- Flame Inside rmx life
- Hé hohoho, entends-tu la vérité

### 🙏 **Prière & Réflexion**
- J'ai besoin de toi
- I've counted my stars

## 🎯 Utilisation dans Faith Chronicles

### Import du module
```javascript
import { 
  gospelSongs, 
  gospelCategories, 
  getGospelSongsByCategory, 
  getRandomGospelSong,
  getGospelSongPath 
} from './public/audio/gospel/index.js';
```

### Exemples d'utilisation
```javascript
// Obtenir une chanson aléatoire
const randomSong = getRandomGospelSong();

// Obtenir toutes les chansons d'adoration
const worshipSongs = getGospelSongsByCategory('worship');

// Obtenir le chemin d'une chanson
const songPath = getGospelSongPath('Amour Divin.mp3');

// Jouer une chanson
const audio = new Audio(songPath);
audio.play();
```

## 🔧 Intégration technique

### Préchargement recommandé
```javascript
const preloadGospelSongs = () => {
  gospelSongs.forEach(song => {
    const audio = new Audio(getGospelSongPath(song.filename));
    audio.preload = 'metadata';
  });
};
```

### Lecteur avec contrôles
```javascript
class GospelPlayer {
  constructor() {
    this.currentSong = null;
    this.audio = new Audio();
    this.isPlaying = false;
  }
  
  play(songId) {
    const song = gospelSongs.find(s => s.id === songId);
    if (song) {
      this.audio.src = getGospelSongPath(song.filename);
      this.audio.play();
      this.currentSong = song;
      this.isPlaying = true;
    }
  }
  
  pause() {
    this.audio.pause();
    this.isPlaying = false;
  }
  
  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.isPlaying = false;
  }
}
```

## 📊 Statistiques

- **Total chansons** : 24
- **Langues** : 3 (FR, EN, Mixed)
- **Catégories** : 15 thèmes spirituels
- **Taille totale** : ~variable selon compression
- **Format** : MP3 192kbps mono/stéréo

## 🎨 Interface utilisateur

### Suggestion de design
- **Player intégré** au menu principal
- **Sélection par catégorie** avec icônes colorées
- **Mode aléatoire** pour découverte
- **Contrôles volume** intégrés
- **Affichage titre** et catégorie
- **Mode boucle** pour méditation

## 🚀 Fonctionnalités suggérées

1. **Lecteur contextuel** : Musique d'ambiance selon le niveau
2. **Mode méditation** : Chansons de paix en boucle
3. **Récompenses musicales** : Débloquer chansons par progression
4. **Favoris** : Système de chansons préférées
5. **Shuffle intelligent** : Par catégorie ou humeur
6. **Timer** : Arrêt automatique pour prière
7. **Paroles** : Affichage optionnel des textes

---

*Collection Faith Chronicles Gospel v1.0*  
*Musique spirituelle de qualité pour l'édification*