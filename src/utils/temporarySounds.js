// Générateur de sons temporaires pour Faith Chronicles
// Ces sons peuvent être remplacés par de vrais fichiers audio plus tard

// Fonction pour créer un son synthétique doux
const createSoftTone = (frequency, duration, type = 'sine') => {
  const sampleRate = 44100;
  const samples = duration * sampleRate;
  const buffer = new ArrayBuffer(samples * 2);
  const view = new DataView(buffer);
  
  for (let i = 0; i < samples; i++) {
    const t = i / sampleRate;
    let sample = 0;
    
    switch (type) {
      case 'sine':
        sample = Math.sin(2 * Math.PI * frequency * t);
        break;
      case 'bell':
        // Son de cloche douce avec harmoniques
        sample = Math.sin(2 * Math.PI * frequency * t) * Math.exp(-t * 2)
               + 0.3 * Math.sin(2 * Math.PI * frequency * 2 * t) * Math.exp(-t * 3)
               + 0.1 * Math.sin(2 * Math.PI * frequency * 3 * t) * Math.exp(-t * 4);
        break;
      case 'harp':
        // Son de harpe avec décroissance rapide
        sample = Math.sin(2 * Math.PI * frequency * t) * Math.exp(-t * 5);
        break;
    }
    
    // Envelope ADSR douce
    const envelope = t < 0.1 ? t * 10 : // Attack
                    t < duration - 0.2 ? 1 : // Sustain
                    (duration - t) * 5; // Release
    
    sample *= envelope * 0.3; // Volume doux
    
    // Convertir en 16-bit PCM
    const intSample = Math.round(sample * 32767);
    view.setInt16(i * 2, intSample, true);
  }
  
  return buffer;
};

// Créer et sauvegarder les sons temporaires
const createTemporarySounds = () => {
  // console.log('🎵 Création des sons temporaires pour Faith Chronicles...');
  
  // Ces sons seront remplacés par de vrais fichiers audio
  const sounds = {
    correctAnswer: createSoftTone(523.25, 0.8, 'bell'), // Do majeur, son de cloche
    wrongAnswer: createSoftTone(293.66, 0.6, 'sine'),   // Ré, plus doux
    starEarned: createSoftTone(659.25, 1.2, 'harp'),    // Mi, son de harpe
    levelComplete: createSoftTone(783.99, 1.5, 'bell'), // Sol, victoire douce
    buttonClick: createSoftTone(440, 0.1, 'sine'),      // La, clic subtil
    notification: createSoftTone(698.46, 0.5, 'bell')   // Fa#, notification
  };
  
  return sounds;
};

// Pour utilisation en développement
if (typeof window !== 'undefined') {
  window.createTemporarySounds = createTemporarySounds;
  // console.log('🛠️ Générateur de sons temporaires disponible.');
  // console.log('💡 Tapez "createTemporarySounds()" dans la console pour générer des sons de test.');
}

export { createTemporarySounds, createSoftTone };