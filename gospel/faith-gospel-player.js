// Faith Gospel Player - Lecteur audio autonome pour UNITYQUEST
// Optimisé pour itch.io avec chemins relatifs

(function() {
  'use strict';
  
  console.log('🎵 Initialisation Faith Gospel Player...');
  
  // Configuration du chemin des MP3
  function getGospelPath() {
    const hostname = window.location.hostname;
    console.log('🌐 Hostname détecté:', hostname);
    
    // Pour itch.io, chemin relatif gospel/
    if (hostname.includes('itch.zone') || hostname.includes('itch.io')) {
      console.log('✅ Mode itch.io: gospel/');
      return 'gospel/';
    }
    
    // Pour localhost ou autres domaines
    console.log('✅ Mode standard: ./gospel/');
    return './gospel/';
  }
  
  const GOSPEL_PATH = getGospelPath();
  
  // Liste des 26 chansons gospel (noms exacts des fichiers)
  const playlist = [
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
    'J_ai_besoin_de_toi....mp3',
    'J_ai_poursuivi_la_Paix.mp3',
    'Je_leve_les_mains_vers_les_lieux_saints_La-haut_tres_haut..mp3',
    'Je_n_ai_point_honte_de_l_evangile.mp3',
    'Je_porte_une_paix_qui_brille_dans_la_nuit.mp3',
    'Je_proclame_sur_ma_vie.mp3',
    'La_Parole_est_venue.mp3'
  ];
  
  let currentTrack = 0;
  let audio = null;
  let isPlaying = false;
  let isPlayerReady = false;
  
  // Initialisation du lecteur
  function initPlayer() {
    console.log('🎵 Création du lecteur audio...');
    audio = new Audio();
    audio.volume = 0.3; // Volume modéré par défaut
    
    // Gestion des événements
    audio.addEventListener('ended', playNext);
    audio.addEventListener('error', handleError);
    audio.addEventListener('canplay', () => {
      console.log('✅ Piste prête:', playlist[currentTrack]);
      isPlayerReady = true;
    });
    
    // Charger la première piste
    loadTrack(0);
    
    // Démarrage automatique au premier clic utilisateur (contourne l'autoplay)
    let audioStarted = false;
    const startAudioOnInteraction = () => {
      if (!audioStarted) {
        console.log('🎵 Premier clic détecté - démarrage audio');
        play();
        audioStarted = true;
        // Retirer les listeners après le premier clic
        document.removeEventListener('click', startAudioOnInteraction);
        document.removeEventListener('touchstart', startAudioOnInteraction);
        document.removeEventListener('keydown', startAudioOnInteraction);
      }
    };
    
    document.addEventListener('click', startAudioOnInteraction);
    document.addEventListener('touchstart', startAudioOnInteraction);
    document.addEventListener('keydown', startAudioOnInteraction);
    
    console.log('✅ Lecteur initialisé avec', playlist.length, 'chansons');
  }
  
  // Charger une piste
  function loadTrack(index) {
    if (index < 0 || index >= playlist.length) {
      console.warn('⚠️ Index invalide:', index);
      return;
    }
    
    currentTrack = index;
    const trackPath = GOSPEL_PATH + playlist[currentTrack];
    console.log('📀 Chargement:', trackPath);
    
    audio.src = trackPath;
    audio.load();
  }
  
  // Lecture
  function play() {
    if (!audio) {
      console.warn('⚠️ Lecteur non initialisé');
      return;
    }
    
    audio.play()
      .then(() => {
        isPlaying = true;
        console.log('▶️ Lecture:', playlist[currentTrack]);
      })
      .catch(err => {
        console.error('❌ Erreur lecture:', err);
      });
  }
  
  // Pause
  function pause() {
    if (audio && isPlaying) {
      audio.pause();
      isPlaying = false;
      console.log('⏸️ Pause');
    }
  }
  
  // Piste suivante
  function playNext() {
    currentTrack = (currentTrack + 1) % playlist.length;
    loadTrack(currentTrack);
    if (isPlaying) {
      play();
    }
  }
  
  // Piste précédente
  function playPrevious() {
    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrack);
    if (isPlaying) {
      play();
    }
  }
  
  // Gestion des erreurs
  function handleError(e) {
    console.error('❌ Erreur audio:', e);
    console.error('Piste problématique:', playlist[currentTrack]);
    console.error('Chemin:', GOSPEL_PATH + playlist[currentTrack]);
    
    // Essayer la piste suivante
    setTimeout(() => {
      console.log('🔄 Tentative piste suivante...');
      playNext();
    }, 2000);
  }
  
  // API publique
  window.faithGospelPlayer = {
    init: initPlayer,
    play: play,
    pause: pause,
    next: playNext,
    previous: playPrevious,
    getPlaylist: () => playlist,
    getCurrentTrack: () => playlist[currentTrack],
    getCurrentIndex: () => currentTrack,
    isPlaying: () => isPlaying,
    setVolume: (vol) => {
      if (audio) {
        audio.volume = Math.max(0, Math.min(1, vol));
        console.log('🔊 Volume:', audio.volume);
      }
    },
    getVolume: () => audio ? audio.volume : 0
  };
  
  // Auto-initialisation (réactivée pour itch.io avec chemin corrigé)
  const hostname = window.location.hostname;
  console.log('🎵 Activation du Gospel Player sur', hostname);
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPlayer);
  } else {
    initPlayer();
  }
  
  console.log('✅ Faith Gospel Player chargé');
})();
