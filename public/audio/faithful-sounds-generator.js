// 🎵 Générateur de Sons Temporaires pour Faith Chronicles
// Utilise Web Audio API pour créer des sons doux et relaxants

console.log('🎵 Chargement du générateur de sons Faith Chronicles...');

// Configuration Audio
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Fonction utilitaire pour créer un son doux
function createGentleSound(config) {
    const {
        frequency = 440,
        duration = 1,
        type = 'sine',
        volume = 0.3,
        fadeIn = 0.1,
        fadeOut = 0.3,
        harmonics = []
    } = config;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    // Connecter les nœuds
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Configuration de l'oscillateur
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.type = type;
    
    // Envelope ADSR douce
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + fadeIn);
    gainNode.gain.setValueAtTime(volume, audioContext.currentTime + duration - fadeOut);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
    
    // Ajouter des harmoniques pour richesse
    harmonics.forEach((harmonic, index) => {
        const harmonicOsc = audioContext.createOscillator();
        const harmonicGain = audioContext.createGain();
        
        harmonicOsc.connect(harmonicGain);
        harmonicGain.connect(audioContext.destination);
        
        harmonicOsc.frequency.setValueAtTime(frequency * harmonic.ratio, audioContext.currentTime);
        harmonicOsc.type = harmonic.type || 'sine';
        
        harmonicGain.gain.setValueAtTime(0, audioContext.currentTime);
        harmonicGain.gain.linearRampToValueAtTime(volume * harmonic.volume, audioContext.currentTime + fadeIn);
        harmonicGain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
        
        harmonicOsc.start(audioContext.currentTime);
        harmonicOsc.stop(audioContext.currentTime + duration);
    });
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
}

// 🎵 Sons spécifiques pour Faith Chronicles
const faithSounds = {
    // ✅ Son de bonne réponse - Accord majeur doux
    correctAnswer: () => {
        createGentleSound({
            frequency: 523.25, // Do5
            duration: 0.8,
            type: 'triangle',
            volume: 0.25,
            harmonics: [
                { ratio: 1.25, volume: 0.15, type: 'sine' }, // Mi
                { ratio: 1.5, volume: 0.1, type: 'sine' }    // Sol
            ]
        });
        console.log('🎶 Son de bonne réponse joué');
    },

    // ❌ Son de mauvaise réponse - Ton doux et respectueux
    wrongAnswer: () => {
        createGentleSound({
            frequency: 293.66, // Ré4
            duration: 0.6,
            type: 'triangle',
            volume: 0.2,
            fadeOut: 0.4
        });
        console.log('🎵 Son de mauvaise réponse joué');
    },

    // ⭐ Son d'étoile gagnée - Scintillement magique
    starEarned: () => {
        // Séquence de notes ascendantes
        const notes = [659.25, 783.99, 987.77]; // Mi, Sol, Si
        notes.forEach((freq, index) => {
            setTimeout(() => {
                createGentleSound({
                    frequency: freq,
                    duration: 0.4,
                    type: 'triangle',
                    volume: 0.2 - (index * 0.03),
                    harmonics: [{ ratio: 2, volume: 0.1, type: 'sine' }]
                });
            }, index * 150);
        });
        console.log('⭐ Son d\'étoile joué');
    },

    // 🏆 Son de fin de niveau - Fanfare douce
    levelComplete: () => {
        const melody = [523.25, 659.25, 783.99, 1046.5]; // Do, Mi, Sol, Do octave
        melody.forEach((freq, index) => {
            setTimeout(() => {
                createGentleSound({
                    frequency: freq,
                    duration: 0.5,
                    type: 'triangle',
                    volume: 0.25,
                    harmonics: [{ ratio: 1.5, volume: 0.15, type: 'sine' }]
                });
            }, index * 200);
        });
        console.log('🏆 Son de fin de niveau joué');
    },

    // 🔔 Son de notification - Cloche douce
    notification: () => {
        createGentleSound({
            frequency: 698.46, // Fa#5
            duration: 1.2,
            type: 'triangle',
            volume: 0.2,
            fadeOut: 0.8,
            harmonics: [
                { ratio: 2, volume: 0.1, type: 'sine' },
                { ratio: 3, volume: 0.05, type: 'sine' }
            ]
        });
        console.log('🔔 Son de notification joué');
    },

    // 🔘 Son de clic de bouton - Subtil
    buttonClick: () => {
        createGentleSound({
            frequency: 440,
            duration: 0.1,
            type: 'triangle',
            volume: 0.15,
            fadeOut: 0.05
        });
        console.log('🔘 Son de clic joué');
    }
};

// Exposer les sons globalement pour le jeu
window.faithSounds = faithSounds;

// Interface de test
console.log('🎮 Sons disponibles pour Faith Chronicles:');
console.log('  faithSounds.correctAnswer() - ✅ Bonne réponse');
console.log('  faithSounds.wrongAnswer() - ❌ Mauvaise réponse');
console.log('  faithSounds.starEarned() - ⭐ Étoile gagnée');
console.log('  faithSounds.levelComplete() - 🏆 Fin de niveau');
console.log('  faithSounds.notification() - 🔔 Notification');
console.log('  faithSounds.buttonClick() - 🔘 Clic bouton');

// Test automatique (optionnel)
window.testAllSounds = () => {
    console.log('🎵 Test de tous les sons...');
    const sounds = Object.keys(faithSounds);
    sounds.forEach((soundName, index) => {
        setTimeout(() => {
            console.log(`🎶 Test: ${soundName}`);
            faithSounds[soundName]();
        }, index * 2000);
    });
};

console.log('✨ Générateur de sons prêt ! Tapez "testAllSounds()" pour tester tous les sons.');

// Export pour utilisation dans le jeu
export { faithSounds };
export default faithSounds;