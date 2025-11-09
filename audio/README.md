# 🎵 Audio Assets - Faith Chronicles

## 📁 Structure des Dossiers

### `effects/` - Effets Sonores
- `correct-answer.mp3` - Son pour bonne réponse (doux, harmonieux)
- `wrong-answer.mp3` - Son pour mauvaise réponse (respectueux, pas frustrant)
- `level-complete.mp3` - Son de victoire de niveau (célébration douce)
- `star-earned.mp3` - Son quand on gagne des étoiles (scintillement)
- `button-click.mp3` - Son de clic de bouton (subtil)
- `notification.mp3` - Son de notification générale

### `ambiance/` - Musiques d'Ambiance
- `menu-background.mp3` - Musique douce pour le menu
- `gameplay-background.mp3` - Ambiance relaxante pendant le jeu
- `victory-theme.mp3` - Musique de victoire finale

## 🎨 Style Audio Recherché

### Caractéristiques
- **Doux et relaxant** : Pas de sons agressifs ou stressants
- **Spirituel** : Sons qui évoquent la paix, la méditation
- **Harmonieux** : Accords majeurs, tons apaisants
- **Subtil** : Volume modéré, pas envahissant

### Instruments Suggérés
- Piano doux
- Harpe
- Chimes/Cloches douces
- Strings (cordes) légères
- Flûte
- Ambiance naturelle (eau, vent)

## 🔊 Spécifications Techniques

- **Format** : MP3 ou OGG pour la compatibilité web
- **Taille** : Fichiers compressés (< 500KB chacun)
- **Volume** : Normalisé à -12dB pour éviter la saturation
- **Durée** : 
  - Effets : 1-3 secondes
  - Ambiance : 30-60 secondes (en boucle)

## 📝 Sources Libres Recommandées

- [Freesound.org](https://freesound.org) - Effets sous Creative Commons
- [OpenGameArt.org](https://opengameart.org) - Assets pour jeux
- [Incompetech.com](https://incompetech.com) - Musiques libres de Kevin MacLeod
- [Zapsplat.com](https://zapsplat.com) - Sons gratuits avec inscription

## 🎛️ Implémentation

Les sons seront gérés par le hook `useAudio.js` avec :
- Contrôle du volume global
- Mute/unmute
- Préchargement des fichiers
- Gestion des erreurs de lecture