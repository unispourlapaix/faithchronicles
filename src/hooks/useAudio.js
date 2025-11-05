import { useState, useCallback, useEffect } from 'react';

// Sons générés automatiquement - pas besoin de fichiers MP3 !
const GENERATED_SOUNDS = {
  correctAnswer: 'correctAnswer',
  wrongAnswer: 'wrongAnswer', 
  levelComplete: 'levelComplete',
  starEarned: 'starEarned',
  buttonClick: 'buttonClick',
  notification: 'notification',
  gameStart: 'gameStart',
  gong: 'gong',
  tick: 'tick',
  faith: 'faith',
  courage: 'courage',
  wisdom: 'wisdom',
  pof: 'pof',
  pofHigh: 'pofHigh',
  pofLow: 'pofLow',
  wrash: 'wrash',
  groook: 'groook',
  reset: 'reset',
  // Nouveaux sons percussifs
  picth: 'picth',
  cheube: 'cheube',
  tok: 'tok',
  paf: 'paf',
  pong: 'pong',
  boume: 'boume'
};

export const useAudio = () => {
  const [isEnabled, setIsEnabled] = useState(() => {
    // Récupérer la préférence depuis localStorage
    const saved = localStorage.getItem('faithChronicles_audioEnabled');
    return saved !== null ? JSON.parse(saved) : true;
  });
  
  const [volume, setVolume] = useState(() => {
    // Récupérer le volume depuis localStorage
    const saved = localStorage.getItem('faithChronicles_audioVolume');
    return saved !== null ? parseFloat(saved) : 0.7;
  });

  // Initialiser le volume du générateur de sons au démarrage
  useEffect(() => {
    // Attendre un peu que le script soit chargé
    const timer = setTimeout(() => {
      if (window.faithSounds && window.faithSounds.setVolume) {
        console.log('🔧 Initialisation volume dans useAudio:', volume);
        window.faithSounds.setVolume(volume);
      } else {
        console.warn('⚠️ faithSounds pas encore disponible dans useAudio');
      }
    }, 1000); // Attendre 1 seconde
    
    return () => clearTimeout(timer);
  }, []); // Seulement au montage initial
  
  // Appliquer les changements de volume
  useEffect(() => {
    if (window.faithSounds && window.faithSounds.setVolume) {
      window.faithSounds.setVolume(volume);
    }
  }, [volume]);

  // Jouer un effet sonore généré
  const playEffect = useCallback((effectName) => {
    console.log('🔧 playEffect appelé avec:', effectName);
    console.log('🔧 isEnabled:', isEnabled);
    
    if (!isEnabled) {
      console.log('⚠️ Audio désactivé, arrêt');
      return;
    }

    if (!GENERATED_SOUNDS[effectName]) {
      console.warn(`⚠️ Effet sonore introuvable: ${effectName}`);
      return;
    }

    console.log('🔧 window.faithSounds disponible?', !!window.faithSounds);
    
    // Utiliser directement les sons générés
    if (window.faithSounds && window.faithSounds[effectName]) {
      console.log(`🎵 Appel window.faithSounds.${effectName}()`);
      window.faithSounds[effectName]();
      console.log(`✅ Son généré joué: ${effectName}`);
    } else {
      console.warn(`⚠️ Générateur de sons non disponible pour ${effectName}`);
      console.log('🔧 window.faithSounds:', window.faithSounds);
      if (window.faithSounds) {
        console.log('🔧 Méthodes disponibles:', Object.keys(window.faithSounds));
      }
    }
  }, [isEnabled]);

  // Activer/désactiver l'audio
  const toggleAudio = useCallback(() => {
    const newEnabled = !isEnabled;
    setIsEnabled(newEnabled);
    localStorage.setItem('faithChronicles_audioEnabled', JSON.stringify(newEnabled));
  }, [isEnabled]);

  // Changer le volume
  const changeVolume = useCallback((newVolume) => {
    const clampedVolume = Math.max(0, Math.min(1, newVolume));
    setVolume(clampedVolume);
    localStorage.setItem('faithChronicles_audioVolume', clampedVolume.toString());
    
    // Appliquer le volume au générateur de sons
    if (window.faithSounds && window.faithSounds.setVolume) {
      window.faithSounds.setVolume(clampedVolume);
    }
  }, []);

  return {
    // État
    isEnabled,
    volume,
    
    // Actions
    playEffect,
    toggleAudio,
    changeVolume,
    
    // Helpers pour les sons courants
    sounds: {
      // Effets de gameplay
      correctAnswer: () => playEffect('correctAnswer'),
      wrongAnswer: () => playEffect('wrongAnswer'),
      levelComplete: () => playEffect('levelComplete'),
      starEarned: () => playEffect('starEarned'),
      buttonClick: () => playEffect('buttonClick'),
      notification: () => playEffect('notification'),
      gameStart: () => playEffect('gameStart'),
      gong: () => playEffect('gong'),
      tick: () => playEffect('tick'),
      faith: () => playEffect('faith'),
      courage: () => playEffect('courage'),
      wisdom: () => playEffect('wisdom'),
      pof: () => playEffect('pof'),
      pofHigh: () => playEffect('pofHigh'),
      pofLow: () => playEffect('pofLow'),
      wrash: () => playEffect('wrash'),
      groook: () => playEffect('groook'),
      reset: () => playEffect('reset'),
      // Nouveaux sons percussifs
      picth: () => playEffect('picth'),
      cheube: () => playEffect('cheube'),
      tok: () => playEffect('tok'),
      paf: () => playEffect('paf'),
      pong: () => playEffect('pong'),
      boume: () => playEffect('boume')
    }
  };
};

export default useAudio;