/**
 * Faith Chronicles - Autonomous Gospel Music Player
 * Lecteur autonome de musique gospel avec contrôles globaux
 */

// Configuration de la playlist automatique - 24 chansons gospel complètes
const faithGospelConfig = {
  // Détection automatique du chemin de base (GitHub Pages ou local)
  baseUrl: window.location.pathname.includes('/unityquest-chronicles-of-love/') 
    ? '/unityquest-chronicles-of-love/audio/gospel/' 
    : '/audio/gospel/',
  playlist: [
    'Aime_e_Tel_le_Que_Tu_Es.mp3',
    'Amour_Divin.mp3',
    'Aquela_ambede_hah....mp3',
    'Avec_sa_Paix.mp3',
    'Avec_toi_je_tiens_bon_o_Jesus_mon_Roi.mp3',
    'Blessed_are_you_O_God_eternal.mp3',
    'Des_Maux_dans_mon_viseur_des_mots_dans_mon_chargeur..._remix_v1.2.mp3',
    'ecoute_crois_et_vis.mp3',
    'Elle_m_a_dit_Il_est_vivant_Il_est_Dieu_puissant_notre_roi_sauveur.mp3',
    'Fais_un_pas_en_avant.mp3',
    'Fais_un_pas_en_avant_Et_je_te_ferai_grace.mp3',
    'Flame_Inside_rmx_life.mp3',
    'Guerit_mon_coeur....mp3',
    'He_hohoho_entends-tu_la_verite_rmx.mp3',
    'Il_calme_mon_ame.mp3',
    'Il_demeure_en_majeste.mp3',
    'Il_y_a_un_espoir_pour_toi_pour_moi.mp3',
    'I_ve_counted_my_stars.mp3',
    'Je_leve_les_mains_vers_les_lieux_saints_La-haut_tres_haut..mp3',
    'Je_n_ai_point_honte_de_l_evangile.mp3',
    'Je_porte_une_paix_qui_brille_dans_la_nuit.mp3',
    'Je_proclame_sur_ma_vie.mp3',
    'J_ai_besoin_de_toi....mp3',
    'J_ai_poursuivi_la_Paix.mp3'
  ],
  volume: 0.15,
  fadeInDuration: 3000, // 3 secondes
  autoAdvancePaused: 5000 // 5 secondes de pause entre chansons
};

// Player global
let faithGospelPlayer = {
  audio: null,
  currentIndex: Math.floor(Math.random() * faithGospelConfig.playlist.length), // 🎲 Démarrage aléatoire
  isPlaying: false,
  userStarted: false
};

// 🎲 Fonction pour obtenir un index aléatoire différent du current
function getRandomIndex() {
  let newIndex;
  do {
    newIndex = Math.floor(Math.random() * faithGospelConfig.playlist.length);
  } while (newIndex === faithGospelPlayer.currentIndex && faithGospelConfig.playlist.length > 1);
  return newIndex;
}

// Fonction pour créer un nouvel audio avec fade-in
function createAudioWithFadeIn(src) {
  return new Promise((resolve, reject) => {
    const audio = new Audio(src);
    audio.volume = 0;
    audio.preload = 'auto';
    
    const handleLoad = () => {
      // Fade in progressif
      let currentVolume = 0;
      const fadeStep = faithGospelConfig.volume / (faithGospelConfig.fadeInDuration / 100);
      
      const fadeIn = setInterval(() => {
        currentVolume += fadeStep;
        if (currentVolume >= faithGospelConfig.volume) {
          audio.volume = faithGospelConfig.volume;
          clearInterval(fadeIn);
          resolve(audio);
        } else {
          audio.volume = currentVolume;
        }
      }, 100);
    };
    
    const handleError = () => {
      console.log('🎵 Gospel: Erreur de chargement pour', src);
      reject(new Error('Impossible de charger: ' + src));
    };
    
    audio.addEventListener('canplaythrough', handleLoad, { once: true });
    audio.addEventListener('error', handleError, { once: true });
    
    // Timeout de sécurité
    setTimeout(() => {
      if (audio.readyState < 3) {
        reject(new Error('Timeout de chargement: ' + src));
      }
    }, 10000);
  });
}

// Fonction pour jouer la prochaine chanson
async function playNext() {
  if (!faithGospelPlayer.userStarted) return;
  
  const currentSong = faithGospelConfig.playlist[faithGospelPlayer.currentIndex];
  const fullUrl = faithGospelConfig.baseUrl + currentSong;
  
  console.log(`🎵 Gospel: Lecture aléatoire (${faithGospelPlayer.currentIndex + 1}/24)`, currentSong);
  
  try {
    // Arrêter l'audio précédent
    if (faithGospelPlayer.audio) {
      faithGospelPlayer.audio.pause();
      faithGospelPlayer.audio = null;
    }
    
    // Créer le nouvel audio avec fade-in
    faithGospelPlayer.audio = await createAudioWithFadeIn(fullUrl);
    faithGospelPlayer.isPlaying = true;
    
    // Événement de fin pour avancer automatiquement
    faithGospelPlayer.audio.addEventListener('ended', () => {
      faithGospelPlayer.isPlaying = false;
      // Pause entre les chansons
      setTimeout(() => {
        faithGospelPlayer.currentIndex = getRandomIndex(); // 🎲 Passage aléatoire
        playNext();
      }, faithGospelConfig.autoAdvancePaused);
    });
    
    // Démarrer la lecture
    await faithGospelPlayer.audio.play();
    
  } catch (error) {
    console.log('🎵 Gospel: Erreur de lecture, passage à la suivante...');
    // En cas d'erreur, passer à la suivante après un délai
    setTimeout(() => {
      faithGospelPlayer.currentIndex = getRandomIndex(); // 🎲 Passage aléatoire
      playNext();
    }, 2000);
  }
}

// Fonction pour démarrer la musique (après interaction utilisateur)
function startGospelMusic() {
  if (!faithGospelPlayer.userStarted) {
    faithGospelPlayer.userStarted = true;
    console.log('🎵 Gospel: Démarrage de la playlist automatique');
    playNext();
  }
}

// Fonction pour toggle (pause/reprendre)
function toggleGospelMusic() {
  if (!faithGospelPlayer.userStarted) {
    startGospelMusic();
    return;
  }
  
  if (faithGospelPlayer.audio) {
    if (faithGospelPlayer.isPlaying) {
      faithGospelPlayer.audio.pause();
      faithGospelPlayer.isPlaying = false;
      console.log('🎵 Gospel: Musique en pause');
    } else {
      faithGospelPlayer.audio.play();
      faithGospelPlayer.isPlaying = true;
      console.log('🎵 Gospel: Musique reprise');
    }
  }
}

// Fonction pour stopper complètement
function stopGospelMusic() {
  if (faithGospelPlayer.audio) {
    faithGospelPlayer.audio.pause();
    faithGospelPlayer.audio = null;
  }
  faithGospelPlayer.isPlaying = false;
  faithGospelPlayer.userStarted = false;
  console.log('🎵 Gospel: Musique arrêtée');
}

// Exposition des fonctions globalement
window.faithAudio = {
  start: startGospelMusic,
  toggle: toggleGospelMusic,
  stop: stopGospelMusic
};

// Exposition du player pour l'indicateur
window.faithGospelPlayer = faithGospelPlayer;

// Démarrage automatique après la première interaction utilisateur
document.addEventListener('click', startGospelMusic, { once: true });
document.addEventListener('keydown', startGospelMusic, { once: true });

console.log('🎵 Faith Chronicles Gospel Player chargé - Cliquez pour démarrer la musique');