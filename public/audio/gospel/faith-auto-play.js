/**
 * Faith Chronicles - Gospel Auto-Play Include Script
 * Inclure ce script dans n'importe quelle page pour la musique automatique
 */

(function() {
    'use strict';
    
    // Configuration
    const CONFIG = {
        volume: 0.15,           // Volume bas pour l'ambiance
        autoStart: true,        // Démarrage automatique
        fadeInDuration: 2000,   // Fondu d'entrée en ms
        songGap: 500,          // Pause entre chansons en ms
        retryDelay: 3000       // Délai avant retry en cas d'erreur
    };

    // Liste des chansons gospel sélectionnées
    const GOSPEL_SONGS = [
        'Il_calme_mon_ame.mp3',
        'Avec_sa_Paix.mp3', 
        'Je_porte_une_paix_qui_brille_dans_la_nuit.mp3',
        'Blessed_are_you_O_God_eternal.mp3',
        'Amour_Divin.mp3',
        'Il_demeure_en_majeste.mp3'
    ];

    class FaithAutoPlayer {
        constructor() {
            this.audio = null;
            this.currentIndex = 0;
            this.isActive = false;
            this.volume = CONFIG.volume;
            this.basePath = '/audio/gospel/';
            
            this.init();
        }

        init() {
            // Créer l'élément audio
            this.audio = new Audio();
            this.audio.volume = 0; // Commencer en silence pour le fade-in
            this.audio.preload = 'none';
            
            // Écouteurs d'événements
            this.audio.addEventListener('ended', () => this.playNext());
            this.audio.addEventListener('error', () => this.handleError());
            this.audio.addEventListener('canplaythrough', () => this.handleCanPlay());
            
            // Démarrage automatique après interaction utilisateur
            if (CONFIG.autoStart) {
                this.setupAutoStart();
            }
            
            // // console.log('🎵 Faith Chronicles Gospel Auto-Player initialisé');
        }

        setupAutoStart() {
            // Attendre la première interaction utilisateur (required par les navigateurs modernes)
            const startOnInteraction = () => {
                this.start();
                document.removeEventListener('click', startOnInteraction);
                document.removeEventListener('keydown', startOnInteraction);
                document.removeEventListener('touchstart', startOnInteraction);
            };
            
            document.addEventListener('click', startOnInteraction);
            document.addEventListener('keydown', startOnInteraction);
            document.addEventListener('touchstart', startOnInteraction);
        }

        start() {
            if (this.isActive) return;
            
            this.isActive = true;
            this.playCurrentSong();
            // // console.log('🎵 Démarrage de la playlist gospel automatique');
        }

        playCurrentSong() {
            if (!this.isActive || GOSPEL_SONGS.length === 0) return;
            
            const songFile = GOSPEL_SONGS[this.currentIndex];
            const songPath = this.basePath + songFile;
            
            this.audio.src = songPath;
            this.audio.load();
            
            this.audio.play()
                .then(() => {
                    this.fadeIn();
                    // // console.log(`🎵 Lecture: ${songFile}`);
                })
                .catch(error => {
                    // // console.log(`⚠️ Erreur lecture: ${songFile}`, error);
                    this.handleError();
                });
        }

        fadeIn() {
            // Fade-in progressif
            let currentVolume = 0;
            const targetVolume = this.volume;
            const steps = 20;
            const stepSize = targetVolume / steps;
            const stepDuration = CONFIG.fadeInDuration / steps;
            
            const fadeInterval = setInterval(() => {
                currentVolume += stepSize;
                if (currentVolume >= targetVolume) {
                    currentVolume = targetVolume;
                    clearInterval(fadeInterval);
                }
                this.audio.volume = currentVolume;
            }, stepDuration);
        }

        playNext() {
            if (!this.isActive) return;
            
            this.currentIndex = (this.currentIndex + 1) % GOSPEL_SONGS.length;
            
            // Petite pause entre les chansons
            setTimeout(() => {
                this.playCurrentSong();
            }, CONFIG.songGap);
        }

        handleError() {
            // // console.log(`❌ Erreur avec: ${GOSPEL_SONGS[this.currentIndex]}`);
            
            // Essayer la chanson suivante après un délai
            setTimeout(() => {
                this.playNext();
            }, CONFIG.retryDelay);
        }

        handleCanPlay() {
            // La chanson est prête à être lue
        }

        setVolume(vol) {
            this.volume = Math.max(0, Math.min(1, vol));
            if (this.audio) {
                this.audio.volume = this.volume;
            }
        }

        pause() {
            if (this.audio && !this.audio.paused) {
                this.audio.pause();
            }
        }

        resume() {
            if (this.audio && this.audio.paused && this.isActive) {
                this.audio.play();
            }
        }

        stop() {
            this.isActive = false;
            if (this.audio) {
                this.audio.pause();
                this.audio.currentTime = 0;
            }
            // // console.log('🛑 Playlist gospel arrêtée');
        }

        // API publique
        toggle() {
            if (this.isActive && !this.audio.paused) {
                this.pause();
            } else {
                this.resume();
            }
        }
    }

    // Créer l'instance globale
    if (typeof window !== 'undefined') {
        window.faithGospelPlayer = new FaithAutoPlayer();
        
        // API globale simple
        window.faithAudio = {
            start: () => window.faithGospelPlayer.start(),
            stop: () => window.faithGospelPlayer.stop(),
            toggle: () => window.faithGospelPlayer.toggle(),
            setVolume: (vol) => window.faithGospelPlayer.setVolume(vol)
        };
    }

})();