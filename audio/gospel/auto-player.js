/**
 * Faith Chronicles - Auto Gospel Player
 * Lecture automatique simple sans interface
 */

class AutoGospelPlayer {
  constructor() {
    this.audio = new Audio();
    this.currentIndex = 0;
    this.isEnabled = true;
    this.volume = 0.2; // Volume bas pour ne pas déranger
    this.songs = [
      'Aime_e_Tel_le_Que_Tu_Es.mp3',
      'Amour_Divin.mp3',
      'Il_calme_mon_ame.mp3',
      'Avec_sa_Paix.mp3',
      'Je_porte_une_paix_qui_brille_dans_la_nuit.mp3',
      'Il_demeure_en_majeste.mp3',
      'Blessed_are_you_O_God_eternal.mp3',
      'Je_proclame_sur_ma_vie.mp3',
      'Fais_un_pas_en_avant_Et_je_te_ferai_grace.mp3',
      'ecoute_crois_et_vis.mp3'
    ];
    
    this.init();
  }

  init() {
    this.audio.volume = this.volume;
    this.audio.addEventListener('ended', () => this.nextSong());
    this.audio.addEventListener('error', () => this.nextSong());
    
    // Démarrer après un délai pour éviter les problèmes d'autoplay
    setTimeout(() => {
      if (this.isEnabled) {
        this.play();
      }
    }, 2000);
  }

  play() {
    if (!this.isEnabled || this.songs.length === 0) return;
    
    const songPath = `/audio/gospel/${this.songs[this.currentIndex]}`;
    this.audio.src = songPath;
    
    this.audio.play()
      .then(() => {
        // // console.log(`🎵 Gospel Auto-Play: ${this.songs[this.currentIndex]}`);
      })
      .catch(error => {
        // // console.log('⚠️ Auto-play bloqué par le navigateur');
        // Essayer la chanson suivante
        this.nextSong();
      });
  }

  nextSong() {
    this.currentIndex = (this.currentIndex + 1) % this.songs.length;
    if (this.isEnabled) {
      // Petite pause entre les chansons
      setTimeout(() => this.play(), 1000);
    }
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    this.audio.volume = this.volume;
  }

  toggle() {
    if (this.audio.paused) {
      this.play();
    } else {
      this.audio.pause();
    }
  }

  stop() {
    this.isEnabled = false;
    this.audio.pause();
    this.audio.currentTime = 0;
  }

  start() {
    this.isEnabled = true;
    this.play();
  }
}

// Créer l'instance globale
window.gospelAutoPlayer = new AutoGospelPlayer();

export default AutoGospelPlayer;