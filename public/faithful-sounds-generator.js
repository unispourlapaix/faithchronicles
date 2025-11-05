// Faith Chronicles - Générateur de sons spirituels
// Système audio complet basé sur Web Audio API

(function() {
  'use strict';
  
  console.log('🎵 Initialisation du générateur de sons Faith Chronicles...');
  
  // Contexte audio global
  let audioContext = null;
  let masterGain = null;
  let isInitialized = false;
  
  // Initialisation du contexte audio
  function initAudio() {
    try {
      if (!audioContext) {
        console.log('🎵 Création du contexte audio...');
        // Utiliser la version standard ou webkit
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) {
          throw new Error('Web Audio API non supporté');
        }
        
        audioContext = new AudioContext();
        masterGain = audioContext.createGain();
        masterGain.connect(audioContext.destination);
        masterGain.gain.value = 0.7; // Volume par défaut
        console.log('✅ Contexte audio créé, état:', audioContext.state);
      }
      
      if (audioContext.state === 'suspended') {
        console.log('🎵 Reprise du contexte audio...');
        return audioContext.resume().then(() => {
          isInitialized = true;
          console.log('✅ Contexte audio activé');
        });
      }
      
      isInitialized = true;
      return Promise.resolve();
    } catch (error) {
      console.error('❌ Erreur initialisation audio:', error);
      return Promise.reject(error);
    }
  }
  
  // Fonction spéciale pour créer un son de gong
  function createGongSound() {
    if (!audioContext || !isInitialized) {
      console.warn('⚠️ Contexte audio non initialisé pour gong');
      return;
    }
    
    if (audioContext.state !== 'running') {
      console.warn('⚠️ Contexte audio pas en cours d\'exécution pour gong:', audioContext.state);
      return;
    }
    
    console.log('🔔 Création son de gong...');
    
    try {
      const startTime = audioContext.currentTime;
      const duration = 4.0; // Gong long et résonnant
      const endTime = startTime + duration;
      
      // Fréquence fondamentale du gong (note grave)
      const fundamental = 130.81; // Do grave
      
      // Harmoniques du gong avec leurs volumes relatifs
      const harmonics = [
        { freq: fundamental, volume: 0.4 },         // Fondamentale
        { freq: fundamental * 2, volume: 0.3 },     // Octave
        { freq: fundamental * 3, volume: 0.2 },     // Quinte
        { freq: fundamental * 4, volume: 0.15 },    // Double octave
        { freq: fundamental * 5, volume: 0.1 },     // Tierce majeure haute
        { freq: fundamental * 6, volume: 0.08 },    // Quinte haute
        { freq: fundamental * 7, volume: 0.06 },    // Septième
        { freq: fundamental * 8, volume: 0.04 }     // Triple octave
      ];
      
      harmonics.forEach((harmonic, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        // Onde sinusoïdale pour le gong
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(harmonic.freq, startTime);
        
        // Enveloppe du gong : attaque rapide, déclin lent et résonnant
        const volume = harmonic.volume * 0.3; // Volume général
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(volume, startTime + 0.02); // Attaque rapide
        gainNode.gain.exponentialRampToValueAtTime(volume * 0.7, startTime + 0.3); // Maintien court
        gainNode.gain.exponentialRampToValueAtTime(0.001, endTime); // Déclin très long
        
        // Connexions
        oscillator.connect(gainNode);
        gainNode.connect(masterGain);
        
        // Démarrage avec léger décalage pour l'effet de résonance
        oscillator.start(startTime + index * 0.01);
        oscillator.stop(endTime);
      });
      
      // Ajouter un effet de réverbération avec des échos
      setTimeout(() => {
        createGongEcho(startTime + 1.0, fundamental, 0.15);
      }, 1000);
      
      setTimeout(() => {
        createGongEcho(startTime + 2.0, fundamental, 0.08);
      }, 2000);
      
      console.log('✅ Son de gong créé avec succès');
    } catch (error) {
      console.error('❌ Erreur création gong:', error);
    }
  }
  
  // Fonction pour créer les échos du gong
  function createGongEcho(startTime, fundamental, volume) {
    try {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(fundamental, startTime);
      
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(volume, startTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + 1.5);
      
      oscillator.connect(gainNode);
      gainNode.connect(masterGain);
      
      oscillator.start(startTime);
      oscillator.stop(startTime + 1.5);
    } catch (error) {
      console.error('❌ Erreur écho gong:', error);
    }
  }
  
  // Fonction pour créer un son de tick/clock
  function createTickSound() {
    if (!audioContext || !isInitialized) {
      console.warn('⚠️ Contexte audio non initialisé pour tick');
      return;
    }
    
    if (audioContext.state !== 'running') {
      console.warn('⚠️ Contexte audio pas en cours d\'exécution pour tick:', audioContext.state);
      return;
    }
    
    console.log('⏰ Création son de tick...');
    
    try {
      const startTime = audioContext.currentTime;
      const duration = 0.15; // Très court et précis
      
      // Deux composantes : clic aigu + petite résonance
      
      // 1. Clic aigu et sec
      const oscillator1 = audioContext.createOscillator();
      const gainNode1 = audioContext.createGain();
      
      oscillator1.type = 'square'; // Onde carrée pour l'effet mécanique
      oscillator1.frequency.setValueAtTime(1200, startTime); // Fréquence aiguë
      
      gainNode1.gain.setValueAtTime(0, startTime);
      gainNode1.gain.linearRampToValueAtTime(0.2, startTime + 0.005); // Attaque très rapide
      gainNode1.gain.exponentialRampToValueAtTime(0.001, startTime + 0.05); // Chute rapide
      
      oscillator1.connect(gainNode1);
      gainNode1.connect(masterGain);
      
      oscillator1.start(startTime);
      oscillator1.stop(startTime + 0.05);
      
      // 2. Petite résonance grave
      const oscillator2 = audioContext.createOscillator();
      const gainNode2 = audioContext.createGain();
      
      oscillator2.type = 'sine';
      oscillator2.frequency.setValueAtTime(400, startTime + 0.01); // Légèrement décalé
      
      gainNode2.gain.setValueAtTime(0, startTime + 0.01);
      gainNode2.gain.linearRampToValueAtTime(0.1, startTime + 0.02);
      gainNode2.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
      
      oscillator2.connect(gainNode2);
      gainNode2.connect(masterGain);
      
      oscillator2.start(startTime + 0.01);
      oscillator2.stop(startTime + duration);
      
      console.log('✅ Son de tick créé avec succès');
    } catch (error) {
      console.error('❌ Erreur création tick:', error);
    }
  }
  
  // Fonction pour créer un son "reset" - remise à zéro/effacement
  function createResetSound() {
    if (!audioContext || !isInitialized) {
      console.warn('⚠️ Contexte audio non initialisé pour reset sound');
      return;
    }
    
    if (audioContext.state !== 'running') {
      console.warn('⚠️ Contexte audio pas en cours d\'exécution pour reset sound:', audioContext.state);
      return;
    }
    
    console.log('🔄 Création son reset (whoosh descendant)...');
    
    try {
      const startTime = audioContext.currentTime;
      const duration = 0.6;
      const masterGain = audioContext.createGain();
      masterGain.gain.setValueAtTime(0.5, startTime);
      masterGain.connect(audioContext.destination);
      
      // 1. Swoosh principal - descente rapide puis lente
      const swooshOsc = audioContext.createOscillator();
      const swooshGain = audioContext.createGain();
      
      swooshOsc.type = 'sawtooth';
      swooshOsc.frequency.setValueAtTime(1200, startTime);
      swooshOsc.frequency.exponentialRampToValueAtTime(400, startTime + 0.15);
      swooshOsc.frequency.exponentialRampToValueAtTime(80, startTime + duration);
      
      swooshGain.gain.setValueAtTime(0.6, startTime);
      swooshGain.gain.exponentialRampToValueAtTime(0.3, startTime + 0.2);
      swooshGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
      
      swooshOsc.connect(swooshGain);
      swooshGain.connect(masterGain);
      
      // 2. Bruit blanc filtré pour l'effet whoosh
      const noiseBuffer = audioContext.createBuffer(1, audioContext.sampleRate * duration, audioContext.sampleRate);
      const noiseData = noiseBuffer.getChannelData(0);
      for (let i = 0; i < noiseData.length; i++) {
        noiseData[i] = (Math.random() * 2 - 1) * 0.4;
      }
      
      const noiseSource = audioContext.createBufferSource();
      const noiseGain = audioContext.createGain();
      const noiseFilter = audioContext.createBiquadFilter();
      
      noiseSource.buffer = noiseBuffer;
      noiseFilter.type = 'lowpass';
      noiseFilter.frequency.setValueAtTime(4000, startTime);
      noiseFilter.frequency.exponentialRampToValueAtTime(500, startTime + duration);
      noiseFilter.Q.setValueAtTime(2, startTime);
      
      noiseGain.gain.setValueAtTime(0.4, startTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.1, startTime + 0.3);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
      
      noiseSource.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(masterGain);
      
      // 3. Harmonique cristalline qui disparaît
      const harmOsc = audioContext.createOscillator();
      const harmGain = audioContext.createGain();
      
      harmOsc.type = 'sine';
      harmOsc.frequency.setValueAtTime(2400, startTime);
      harmOsc.frequency.exponentialRampToValueAtTime(1600, startTime + 0.1);
      harmOsc.frequency.exponentialRampToValueAtTime(160, startTime + duration);
      
      harmGain.gain.setValueAtTime(0.3, startTime);
      harmGain.gain.exponentialRampToValueAtTime(0.1, startTime + 0.15);
      harmGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
      
      harmOsc.connect(harmGain);
      harmGain.connect(masterGain);
      
      // 4. Click final subtil pour marquer la fin du reset
      const clickOsc = audioContext.createOscillator();
      const clickGain = audioContext.createGain();
      
      clickOsc.type = 'square';
      clickOsc.frequency.setValueAtTime(200, startTime + duration - 0.02);
      
      clickGain.gain.setValueAtTime(0.2, startTime + duration - 0.02);
      clickGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
      
      clickOsc.connect(clickGain);
      clickGain.connect(masterGain);
      
      // Démarrage des oscillateurs
      swooshOsc.start(startTime);
      swooshOsc.stop(startTime + duration);
      noiseSource.start(startTime);
      noiseSource.stop(startTime + duration);
      harmOsc.start(startTime);
      harmOsc.stop(startTime + duration);
      clickOsc.start(startTime + duration - 0.02);
      clickOsc.stop(startTime + duration);
      
      console.log('✅ Son reset créé avec succès');
    } catch (error) {
      console.error('❌ Erreur création reset:', error);
    }
  }
  
  // Fonction spéciale pour créer un son "groook" de pierre/roche
  function createGroookSound() {
    if (!audioContext || !isInitialized) {
      console.warn('⚠️ Contexte audio non initialisé pour groook sound');
      return;
    }
    
    if (audioContext.state !== 'running') {
      console.warn('⚠️ Contexte audio pas en cours d\'exécution pour groook sound:', audioContext.state);
      return;
    }
    
    console.log('🗿 Création son groook (roo..creeeuu...)...');
    
    try {
      const startTime = audioContext.currentTime;
      const duration = 1.2; // Plus long pour le "creeeuu"
      
      // 1. Le "roo" initial - frottement qui commence (plus lisse, moins de vibrations)
      const rooOsc = audioContext.createOscillator();
      const rooGain = audioContext.createGain();
      
      rooOsc.type = 'sine'; // Changé en sine pour moins de vibrations
      rooOsc.frequency.setValueAtTime(80, startTime);
      rooOsc.frequency.exponentialRampToValueAtTime(65, startTime + 0.4); // Plus lisse avec exponential
      
      rooGain.gain.setValueAtTime(0, startTime);
      rooGain.gain.exponentialRampToValueAtTime(0.3, startTime + 0.2); // Plus doux
      rooGain.gain.exponentialRampToValueAtTime(0.15, startTime + 0.8); // Transition plus lisse
      
      rooOsc.connect(rooGain);
      rooGain.connect(masterGain);
      
      // 2. Le "creeeuu" prolongé - frottement continu mais plus lisse
      const creeuuBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.8, audioContext.sampleRate);
      const creeuuData = creeuuBuffer.getChannelData(0);
      
      // Génération du bruit de frottement "creeeuu" - sans vibrations excessives
      for (let i = 0; i < creeuuData.length; i++) {
        const t = i / audioContext.sampleRate;
        // Bruit plus doux, moins de variations brutales
        const baseNoise = (Math.random() * 2 - 1) * 0.3; // Volume réduit
        const lowFreq = Math.sin(t * 60) * 0.2; // Modulation très douce
        creeuuData[i] = (baseNoise + lowFreq) * (0.6 - t * 0.3);
      }
      
      const creeuuSource = audioContext.createBufferSource();
      const creeuuGain = audioContext.createGain();
      const creeuuFilter = audioContext.createBiquadFilter();
      
      creeuuSource.buffer = creeuuBuffer;
      
      // Filtre plus doux pour réduire les vibrations
      creeuuFilter.type = 'lowpass';
      creeuuFilter.frequency.setValueAtTime(180, startTime + 0.4); // Plus filtré dès le début
      creeuuFilter.frequency.exponentialRampToValueAtTime(100, startTime + 1.2); // Plus lisse
      creeuuFilter.Q.setValueAtTime(1, startTime + 0.4); // Q plus bas = moins de résonance
      
      creeuuGain.gain.setValueAtTime(0, startTime + 0.4);
      creeuuGain.gain.exponentialRampToValueAtTime(0.25, startTime + 0.6); // Plus doux
      creeuuGain.gain.exponentialRampToValueAtTime(0.001, startTime + 1.2);
      
      creeuuSource.connect(creeuuFilter);
      creeuuFilter.connect(creeuuGain);
      creeuuGain.connect(masterGain);
      
      // 3. Résonance grave en fond - plus stable, moins de vibrations
      const resonanceOsc = audioContext.createOscillator();
      const resonanceGain = audioContext.createGain();
      
      resonanceOsc.type = 'sine'; // Sine pour la stabilité
      resonanceOsc.frequency.setValueAtTime(45, startTime); // Un peu plus haut pour stabilité
      resonanceOsc.frequency.exponentialRampToValueAtTime(35, startTime + duration); // Transition plus douce
      
      resonanceGain.gain.setValueAtTime(0, startTime);
      resonanceGain.gain.exponentialRampToValueAtTime(0.2, startTime + 0.3); // Plus lent et doux
      resonanceGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
      
      resonanceOsc.connect(resonanceGain);
      resonanceGain.connect(masterGain);
      
      // Timing
      rooOsc.start(startTime);
      rooOsc.stop(startTime + 0.8);
      creeuuSource.start(startTime + 0.3);
      creeuuSource.stop(startTime + 1.2);
      resonanceOsc.start(startTime);
      resonanceOsc.stop(startTime + duration);
      
      console.log('✅ Son groook (roo..creeeuu...) créé avec succès');
    } catch (error) {
      console.error('❌ Erreur création groook sound:', error);
    }
  }
  
  // Fonction spéciale pour créer un son "wrash" de retour
  function createWrashSound() {
    if (!audioContext || !isInitialized) {
      console.warn('⚠️ Contexte audio non initialisé pour wrash sound');
      return;
    }
    
    if (audioContext.state !== 'running') {
      console.warn('⚠️ Contexte audio pas en cours d\'exécution pour wrash sound:', audioContext.state);
      return;
    }
    
    console.log('💨 Création son wrash...');
    
    try {
      const startTime = audioContext.currentTime;
      const duration = 0.4; // Son moyen pour le retour
      
      // Oscillateur principal - balayage descendant pour effet "wrash"
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      // Onde plus douce pour effet "wrash" sans vibrations
      oscillator.type = 'sine'; // Changé en sine pour plus de douceur
      
      // Balayage de fréquence descendant plus lisse
      oscillator.frequency.setValueAtTime(600, startTime); // Commence moins aigu
      oscillator.frequency.exponentialRampToValueAtTime(120, startTime + duration); // Descend plus bas et lisse
      
      // Enveloppe plus douce pour le wrash
      const volume = 0.2; // Volume réduit
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.exponentialRampToValueAtTime(volume, startTime + 0.08); // Attaque plus douce
      gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration); // Déclin lisse
      
      // Connexions
      oscillator.connect(gainNode);
      gainNode.connect(masterGain);
      
      // Bruit blanc plus doux et filtré pour l'effet "wrash"
      const noiseBuffer = audioContext.createBuffer(1, audioContext.sampleRate * duration, audioContext.sampleRate);
      const noiseData = noiseBuffer.getChannelData(0);
      for (let i = 0; i < noiseData.length; i++) {
        const t = i / audioContext.sampleRate;
        // Bruit plus doux avec atténuation progressive
        noiseData[i] = (Math.random() * 2 - 1) * 0.05 * (1 - t/duration); // Plus doux et décroissant
      }
      
      const noiseSource = audioContext.createBufferSource();
      const noiseGain = audioContext.createGain();
      const noiseFilter = audioContext.createBiquadFilter();
      
      noiseSource.buffer = noiseBuffer;
      
      // Filtre passe-bas pour adoucir le bruit
      noiseFilter.type = 'lowpass';
      noiseFilter.frequency.setValueAtTime(400, startTime);
      noiseFilter.frequency.exponentialRampToValueAtTime(200, startTime + duration);
      
      // Volume du bruit plus doux
      noiseGain.gain.setValueAtTime(0.1, startTime); // Réduit
      noiseGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
      
      noiseSource.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(masterGain);
      
      // Timing
      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
      noiseSource.start(startTime);
      noiseSource.stop(startTime + duration);
      
      console.log('✅ Son wrash créé avec succès');
    } catch (error) {
      console.error('❌ Erreur création wrash sound:', error);
    }
  }
  
  // Fonction spéciale pour créer des sons "pof" courts et percutants
  function createPofSound(frequency = 200, type = 'basic') {
    if (!audioContext || !isInitialized) {
      console.warn('⚠️ Contexte audio non initialisé pour pof sound');
      return;
    }
    
    if (audioContext.state !== 'running') {
      console.warn('⚠️ Contexte audio pas en cours d\'exécution pour pof sound:', audioContext.state);
      return;
    }
    
    console.log(`💥 Création son pof ${type} avec fréquence:`, frequency);
    
    try {
      const startTime = audioContext.currentTime;
      const duration = 0.15; // Très court pour l'effet "pof"
      
      // Oscillateur principal pour le "pof"
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      // Configuration selon le type de pof
      if (type === 'basic') {
        oscillator.type = 'square';
        frequency = 150;
      } else if (type === 'high') {
        oscillator.type = 'triangle';
        frequency = 400;
      } else if (type === 'low') {
        oscillator.type = 'sawtooth';
        frequency = 80;
      }
      
      oscillator.frequency.setValueAtTime(frequency, startTime);
      
      // Enveloppe très rapide pour effet "pof"
      const volume = 0.3;
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(volume, startTime + 0.01); // Attaque ultra-rapide
      gainNode.gain.exponentialRampToValueAtTime(0.001, startTime + duration); // Déclin rapide
      
      // Connexions
      oscillator.connect(gainNode);
      gainNode.connect(masterGain);
      
      // Timing
      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
      
      console.log(`✅ Son pof ${type} créé avec succès`);
    } catch (error) {
      console.error('❌ Erreur création pof sound:', error);
    }
  }
  
  // Fonction spéciale pour créer des sons rock courts et percutants
  function createRockSound(frequencies, duration = 0.6, fadeOut = 0.2) {
    if (!audioContext || !isInitialized) {
      console.warn('⚠️ Contexte audio non initialisé pour rock sound');
      return;
    }
    
    if (audioContext.state !== 'running') {
      console.warn('⚠️ Contexte audio pas en cours d\'exécution pour rock sound:', audioContext.state);
      return;
    }
    
    console.log('🎸 Création son rock avec fréquences:', frequencies);
    
    try {
      const startTime = audioContext.currentTime;
      const endTime = startTime + duration;
      
      frequencies.forEach((freq, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        // Onde carrée pour un son plus rock/électronique
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(freq, startTime);
        
        // Volume plus fort et plus agressif
        const volume = 0.4 / frequencies.length;
        
        // Enveloppe rock : attaque très rapide, sustain court, déclin rapide
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(volume, startTime + 0.02); // Attaque très rapide
        gainNode.gain.setValueAtTime(volume * 0.8, startTime + 0.1); // Sustain court
        gainNode.gain.exponentialRampToValueAtTime(0.001, endTime); // Déclin rapide
        
        // Connexions
        oscillator.connect(gainNode);
        gainNode.connect(masterGain);
        
        // Timing rock : notes rapprochées pour effet d'accord
        oscillator.start(startTime + index * 0.02);
        oscillator.stop(endTime);
      });
      
      console.log('✅ Son rock créé avec succès');
    } catch (error) {
      console.error('❌ Erreur création rock sound:', error);
    }
  }
  
  // Fonction pour créer des sons "picth" - son cristallin pour étoiles
  function createPicthSound(volume = 0.3) {
    if (!audioContext || !isInitialized) {
      console.warn('⚠️ AudioContext non initialisé pour picth');
      return;
    }

    try {
      const startTime = audioContext.currentTime;
      const masterGain = audioContext.createGain();
      masterGain.gain.setValueAtTime(volume, startTime);
      masterGain.connect(audioContext.destination);

      // Son "picth" principal - cristallin et brillant
      const picthOsc = audioContext.createOscillator();
      const picthGain = audioContext.createGain();
      
      picthOsc.type = 'sine';
      picthOsc.frequency.setValueAtTime(800, startTime);
      picthOsc.frequency.exponentialRampToValueAtTime(1200, startTime + 0.04); // Montée rapide
      picthOsc.frequency.exponentialRampToValueAtTime(600, startTime + 0.12); // Redescente douce
      
      // Enveloppe courte et pétillante
      picthGain.gain.setValueAtTime(0, startTime);
      picthGain.gain.exponentialRampToValueAtTime(0.7, startTime + 0.02); // Attaque très rapide
      picthGain.gain.exponentialRampToValueAtTime(0.3, startTime + 0.06); // Sustain court
      picthGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.12); // Decay rapide
      
      picthOsc.connect(picthGain);
      picthGain.connect(masterGain);

      // Harmonique cristalline haute
      const harmOsc = audioContext.createOscillator();
      const harmGain = audioContext.createGain();
      
      harmOsc.type = 'triangle';
      harmOsc.frequency.setValueAtTime(1600, startTime);
      harmOsc.frequency.exponentialRampToValueAtTime(2400, startTime + 0.03);
      harmOsc.frequency.exponentialRampToValueAtTime(1200, startTime + 0.1);
      
      harmGain.gain.setValueAtTime(0, startTime + 0.005);
      harmGain.gain.exponentialRampToValueAtTime(0.25, startTime + 0.025);
      harmGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.1);
      
      harmOsc.connect(harmGain);
      harmGain.connect(masterGain);

      // Echo cristallin très court
      const echoOsc = audioContext.createOscillator();
      const echoGain = audioContext.createGain();
      
      echoOsc.type = 'sine';
      echoOsc.frequency.setValueAtTime(1000, startTime + 0.03);
      echoOsc.frequency.exponentialRampToValueAtTime(800, startTime + 0.08);
      
      echoGain.gain.setValueAtTime(0, startTime + 0.03);
      echoGain.gain.exponentialRampToValueAtTime(0.15, startTime + 0.05);
      echoGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.08);
      
      echoOsc.connect(echoGain);
      echoGain.connect(masterGain);

      picthOsc.start(startTime);
      picthOsc.stop(startTime + 0.12);
      harmOsc.start(startTime);
      harmOsc.stop(startTime + 0.1);
      echoOsc.start(startTime + 0.03);
      echoOsc.stop(startTime + 0.08);
      
      console.log('✅ Son picth créé');
    } catch (error) {
      console.error('❌ Erreur création picth:', error);
    }
  }
  
  // Fonction pour créer des sons "cheube" - son de navigation doux
  function createCheubeSound(volume = 0.3) {
    if (!audioContext || !isInitialized) {
      console.warn('⚠️ AudioContext non initialisé pour cheube');
      return;
    }

    try {
      const startTime = audioContext.currentTime;
      const masterGain = audioContext.createGain();
      masterGain.gain.setValueAtTime(volume, startTime);
      masterGain.connect(audioContext.destination);

      // Son "cheube" principal - très doux et fluide
      const cheubeOsc = audioContext.createOscillator();
      const cheubeGain = audioContext.createGain();
      
      cheubeOsc.type = 'sine';
      cheubeOsc.frequency.setValueAtTime(250, startTime); // Plus grave
      cheubeOsc.frequency.exponentialRampToValueAtTime(200, startTime + 0.15); // Plus lent
      cheubeOsc.frequency.exponentialRampToValueAtTime(180, startTime + 0.25); // Plus long
      
      // Enveloppe très douce et progressive
      cheubeGain.gain.setValueAtTime(0, startTime);
      cheubeGain.gain.exponentialRampToValueAtTime(0.4, startTime + 0.08); // Montée plus lente et douce
      cheubeGain.gain.exponentialRampToValueAtTime(0.25, startTime + 0.15); // Plateau plus bas
      cheubeGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3); // Descente très progressive
      
      cheubeOsc.connect(cheubeGain);
      cheubeGain.connect(masterGain);

      // Harmonique très douce pour la richesse
      const harmOsc = audioContext.createOscillator();
      const harmGain = audioContext.createGain();
      
      harmOsc.type = 'triangle';
      harmOsc.frequency.setValueAtTime(125, startTime); // Plus grave
      harmOsc.frequency.exponentialRampToValueAtTime(100, startTime + 0.15);
      harmOsc.frequency.exponentialRampToValueAtTime(90, startTime + 0.25);
      
      harmGain.gain.setValueAtTime(0, startTime + 0.04); // Entrée retardée
      harmGain.gain.exponentialRampToValueAtTime(0.2, startTime + 0.12); // Plus doux
      harmGain.gain.exponentialRampToValueAtTime(0.12, startTime + 0.2); // Plateau doux
      harmGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);
      
      harmOsc.connect(harmGain);
      harmGain.connect(masterGain);

      // Echo très subtil et lointain
      const delayOsc = audioContext.createOscillator();
      const delayGain = audioContext.createGain();
      
      delayOsc.type = 'sine';
      delayOsc.frequency.setValueAtTime(225, startTime + 0.06); // Plus tard et plus grave
      delayOsc.frequency.exponentialRampToValueAtTime(160, startTime + 0.28);
      
      delayGain.gain.setValueAtTime(0, startTime + 0.06);
      delayGain.gain.exponentialRampToValueAtTime(0.08, startTime + 0.14); // Très subtil
      delayGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.28);
      
      delayOsc.connect(delayGain);
      delayGain.connect(masterGain);

      cheubeOsc.start(startTime);
      cheubeOsc.stop(startTime + 0.3); // Plus long
      harmOsc.start(startTime);
      harmOsc.stop(startTime + 0.3);
      delayOsc.start(startTime + 0.06);
      delayOsc.stop(startTime + 0.28);
      
      console.log('✅ Son cheube créé');
    } catch (error) {
      console.error('❌ Erreur création cheube:', error);
    }
  }
  
  // Fonction pour créer des sons "tok" - percussion sèche et nette
  function createTokSound(volume = 0.3) {
    if (!audioContext || !isInitialized) {
      console.warn('⚠️ AudioContext non initialisé pour tok');
      return;
    }

    try {
      const startTime = audioContext.currentTime;
      const masterGain = audioContext.createGain();
      masterGain.gain.setValueAtTime(volume, startTime);
      masterGain.connect(audioContext.destination);

      // Son tok principal - percussion sèche et nette
      const tokOsc = audioContext.createOscillator();
      const tokGain = audioContext.createGain();
      
      tokOsc.type = 'triangle';
      tokOsc.frequency.setValueAtTime(800, startTime);
      tokOsc.frequency.exponentialRampToValueAtTime(400, startTime + 0.04);
      
      // Enveloppe très courte et sèche
      tokGain.gain.setValueAtTime(0.9, startTime);
      tokGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.06);
      
      tokOsc.connect(tokGain);
      tokGain.connect(masterGain);

      // Harmonique haute pour la netteté
      const harmOsc = audioContext.createOscillator();
      const harmGain = audioContext.createGain();
      
      harmOsc.type = 'sine';
      harmOsc.frequency.setValueAtTime(1600, startTime);
      harmOsc.frequency.exponentialRampToValueAtTime(800, startTime + 0.03);
      
      harmGain.gain.setValueAtTime(0.3, startTime);
      harmGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.03);
      
      harmOsc.connect(harmGain);
      harmGain.connect(masterGain);

      // Petit bruit sec pour l'authenticité
      const noiseBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.02, audioContext.sampleRate);
      const noiseData = noiseBuffer.getChannelData(0);
      for (let i = 0; i < noiseData.length; i++) {
        noiseData[i] = (Math.random() * 2 - 1) * 0.2;
      }
      
      const noiseSource = audioContext.createBufferSource();
      const noiseGain = audioContext.createGain();
      const noiseFilter = audioContext.createBiquadFilter();
      
      noiseSource.buffer = noiseBuffer;
      noiseFilter.type = 'highpass';
      noiseFilter.frequency.setValueAtTime(2000, startTime);
      
      noiseGain.gain.setValueAtTime(0.3, startTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.02);
      
      noiseSource.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(masterGain);

      tokOsc.start(startTime);
      tokOsc.stop(startTime + 0.06);
      harmOsc.start(startTime);
      harmOsc.stop(startTime + 0.03);
      noiseSource.start(startTime);
      noiseSource.stop(startTime + 0.02);
      
      console.log('✅ Son tok créé');
    } catch (error) {
      console.error('❌ Erreur création tok:', error);
    }
  }
  
  // Fonction pour créer des sons "paf" - percussions sèches et claquantes
  function createPafSound(volume = 0.3) {
    if (!audioContext || !isInitialized) {
      console.warn('⚠️ AudioContext non initialisé pour paf');
      return;
    }

    try {
      const startTime = audioContext.currentTime;
      const masterGain = audioContext.createGain();
      masterGain.gain.setValueAtTime(volume, startTime);
      masterGain.connect(audioContext.destination);

      // Son sec et claquant
      const pafOsc = audioContext.createOscillator();
      const pafGain = audioContext.createGain();
      
      pafOsc.type = 'square';
      pafOsc.frequency.setValueAtTime(400, startTime);
      pafOsc.frequency.exponentialRampToValueAtTime(200, startTime + 0.05);
      
      pafGain.gain.setValueAtTime(0.8, startTime);
      pafGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.08);
      
      pafOsc.connect(pafGain);
      pafGain.connect(masterGain);

      // Bruit de claque
      const noiseBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.03, audioContext.sampleRate);
      const noiseData = noiseBuffer.getChannelData(0);
      for (let i = 0; i < noiseData.length; i++) {
        noiseData[i] = (Math.random() * 2 - 1) * 0.6;
      }
      
      const noiseSource = audioContext.createBufferSource();
      const noiseGain = audioContext.createGain();
      const noiseFilter = audioContext.createBiquadFilter();
      
      noiseSource.buffer = noiseBuffer;
      noiseFilter.type = 'highpass';
      noiseFilter.frequency.setValueAtTime(1000, startTime);
      
      noiseGain.gain.setValueAtTime(0.4, startTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.03);
      
      noiseSource.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(masterGain);

      pafOsc.start(startTime);
      pafOsc.stop(startTime + 0.08);
      noiseSource.start(startTime);
      noiseSource.stop(startTime + 0.03);
      
      console.log('✅ Son paf créé');
    } catch (error) {
      console.error('❌ Erreur création paf:', error);
    }
  }

  // Fonction pour créer des sons "pong" - rebonds élastiques
  function createPongSound(volume = 0.3) {
    if (!audioContext || !isInitialized) {
      console.warn('⚠️ AudioContext non initialisé pour pong');
      return;
    }

    try {
      const startTime = audioContext.currentTime;
      const masterGain = audioContext.createGain();
      masterGain.gain.setValueAtTime(volume, startTime);
      masterGain.connect(audioContext.destination);

      // Son de rebond élastique
      const pongOsc = audioContext.createOscillator();
      const pongGain = audioContext.createGain();
      
      pongOsc.type = 'sine';
      pongOsc.frequency.setValueAtTime(600, startTime);
      pongOsc.frequency.exponentialRampToValueAtTime(150, startTime + 0.15);
      
      pongGain.gain.setValueAtTime(0.7, startTime);
      pongGain.gain.exponentialRampToValueAtTime(0.2, startTime + 0.08);
      pongGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.15);
      
      pongOsc.connect(pongGain);
      pongGain.connect(masterGain);

      // Harmonique de rebond
      const harmOsc = audioContext.createOscillator();
      const harmGain = audioContext.createGain();
      
      harmOsc.type = 'triangle';
      harmOsc.frequency.setValueAtTime(300, startTime);
      harmOsc.frequency.exponentialRampToValueAtTime(100, startTime + 0.12);
      
      harmGain.gain.setValueAtTime(0, startTime + 0.02);
      harmGain.gain.exponentialRampToValueAtTime(0.3, startTime + 0.05);
      harmGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.12);
      
      harmOsc.connect(harmGain);
      harmGain.connect(masterGain);

      pongOsc.start(startTime);
      pongOsc.stop(startTime + 0.15);
      harmOsc.start(startTime);
      harmOsc.stop(startTime + 0.12);
      
      console.log('✅ Son pong créé');
    } catch (error) {
      console.error('❌ Erreur création pong:', error);
    }
  }

  // Fonction pour créer des sons "boume" - explosions sourdes
  function createBoumeSound(volume = 0.4) {
    if (!audioContext || !isInitialized) {
      console.warn('⚠️ AudioContext non initialisé pour boume');
      return;
    }

    try {
      const startTime = audioContext.currentTime;
      const masterGain = audioContext.createGain();
      masterGain.gain.setValueAtTime(volume, startTime);
      masterGain.connect(audioContext.destination);

      // Son d'explosion grave
      const boumeOsc = audioContext.createOscillator();
      const boumeGain = audioContext.createGain();
      
      boumeOsc.type = 'sawtooth';
      boumeOsc.frequency.setValueAtTime(80, startTime);
      boumeOsc.frequency.exponentialRampToValueAtTime(30, startTime + 0.3);
      
      boumeGain.gain.setValueAtTime(1.0, startTime);
      boumeGain.gain.exponentialRampToValueAtTime(0.3, startTime + 0.1);
      boumeGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);
      
      boumeOsc.connect(boumeGain);
      boumeGain.connect(masterGain);

      // Bruit d'explosion
      const explosionBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.2, audioContext.sampleRate);
      const explosionData = explosionBuffer.getChannelData(0);
      for (let i = 0; i < explosionData.length; i++) {
        const t = i / audioContext.sampleRate;
        explosionData[i] = (Math.random() * 2 - 1) * 0.5 * (1 - t * 2);
      }
      
      const explosionSource = audioContext.createBufferSource();
      const explosionGain = audioContext.createGain();
      const explosionFilter = audioContext.createBiquadFilter();
      
      explosionSource.buffer = explosionBuffer;
      explosionFilter.type = 'lowpass';
      explosionFilter.frequency.setValueAtTime(300, startTime);
      explosionFilter.frequency.exponentialRampToValueAtTime(100, startTime + 0.2);
      
      explosionGain.gain.setValueAtTime(0.6, startTime);
      explosionGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.2);
      
      explosionSource.connect(explosionFilter);
      explosionFilter.connect(explosionGain);
      explosionGain.connect(masterGain);

      boumeOsc.start(startTime);
      boumeOsc.stop(startTime + 0.3);
      explosionSource.start(startTime);
      explosionSource.stop(startTime + 0.2);
      
      console.log('✅ Son boume créé');
    } catch (error) {
      console.error('❌ Erreur création boume:', error);
    }
  }
  
  // Fonction pour créer des sons de tambour sourd spirituels
  function createDrumSound(baseFreq = 80, duration = 0.8, volume = 0.3, resonance = 'deep') {
    if (!audioContext || !isInitialized) {
      console.warn('⚠️ AudioContext non initialisé pour tambour');
      return;
    }

    try {
      const startTime = audioContext.currentTime;
      const masterGain = audioContext.createGain();
      masterGain.gain.setValueAtTime(volume, startTime); // Utilise directement le paramètre volume
      masterGain.connect(audioContext.destination);

      // 1. Frappe principale du tambour - son grave et profond (plus punché)
      const mainDrum = audioContext.createOscillator();
      const mainGain = audioContext.createGain();
      
      mainDrum.type = 'sine';
      mainDrum.frequency.setValueAtTime(baseFreq * 0.7, startTime); // Plus grave
      mainDrum.frequency.exponentialRampToValueAtTime(baseFreq * 0.15, startTime + 0.08); // Chute plus rapide et plus basse
      
      // Enveloppe de tambour : attaque plus forte, punch immédiat
      mainGain.gain.setValueAtTime(1.2, startTime); // Plus fort pour le punch
      mainGain.gain.exponentialRampToValueAtTime(0.3, startTime + 0.12); // Sustain plus long
      mainGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
      
      mainDrum.connect(mainGain);
      mainGain.connect(masterGain);

      // 2. Résonance du tambour - vibration de la peau (renforcée)
      const resonanceOsc = audioContext.createOscillator();
      const resonanceGain = audioContext.createGain();
      
      resonanceOsc.type = 'sine';
      resonanceOsc.frequency.setValueAtTime(baseFreq * 0.3, startTime); // Encore plus grave
      resonanceOsc.frequency.exponentialRampToValueAtTime(baseFreq * 0.1, startTime + duration); // Très bas
      
      resonanceGain.gain.setValueAtTime(0, startTime + 0.03);
      resonanceGain.gain.exponentialRampToValueAtTime(0.6, startTime + 0.08); // Plus fort
      resonanceGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
      
      resonanceOsc.connect(resonanceGain);
      resonanceGain.connect(masterGain);

      // 3. Sub-bass pour le punch profond
      const subBass = audioContext.createOscillator();
      const subGain = audioContext.createGain();
      
      subBass.type = 'sine';
      subBass.frequency.setValueAtTime(baseFreq * 0.25, startTime); // Très grave (sub-bass)
      subBass.frequency.exponentialRampToValueAtTime(baseFreq * 0.15, startTime + 0.2);
      
      subGain.gain.setValueAtTime(0.8, startTime); // Fort dès le début
      subGain.gain.exponentialRampToValueAtTime(0.2, startTime + 0.15);
      subGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration * 0.8);
      
      subBass.connect(subGain);
      subGain.connect(masterGain);

      // 4. Harmonique spirituelle selon le type (plus présente)
      const harmonic = audioContext.createOscillator();
      const harmonicGain = audioContext.createGain();
      
      let harmonicFreq;
      switch(resonance) {
        case 'faith': harmonicFreq = baseFreq * 1.5; break;    // Foi - harmonique plus basse mais présente
        case 'courage': harmonicFreq = baseFreq * 1.2; break;  // Courage - très profonde et puissante
        case 'wisdom': harmonicFreq = baseFreq * 1.1; break;   // Sagesse - très méditative et grave
        default: harmonicFreq = baseFreq * 1.4;
      }
      
      harmonic.type = 'sine';
      harmonic.frequency.setValueAtTime(harmonicFreq, startTime);
      harmonic.frequency.exponentialRampToValueAtTime(harmonicFreq * 0.5, startTime + duration);
      
      harmonicGain.gain.setValueAtTime(0, startTime + 0.08);
      harmonicGain.gain.exponentialRampToValueAtTime(0.25, startTime + 0.2); // Plus fort
      harmonicGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
      
      harmonic.connect(harmonicGain);
      harmonicGain.connect(masterGain);

      // 5. Bruit de frappe renforcé pour l'authenticité et le punch
      const noiseBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.15, audioContext.sampleRate);
      const noiseData = noiseBuffer.getChannelData(0);
      for (let i = 0; i < noiseData.length; i++) {
        const t = i / audioContext.sampleRate;
        // Bruit plus intense au début puis décroissant
        noiseData[i] = (Math.random() * 2 - 1) * 0.5 * (1 - t * 3);
      }
      
      const noiseSource = audioContext.createBufferSource();
      const noiseGain = audioContext.createGain();
      const noiseFilter = audioContext.createBiquadFilter();
      
      noiseSource.buffer = noiseBuffer;
      noiseFilter.type = 'lowpass';
      noiseFilter.frequency.setValueAtTime(150, startTime); // Plus filtré pour garder le grave
      
      noiseGain.gain.setValueAtTime(0.4, startTime); // Plus fort pour le punch
      noiseGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.15);
      
      noiseSource.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(masterGain);

      // Démarrage
      mainDrum.start(startTime);
      mainDrum.stop(startTime + duration);
      resonanceOsc.start(startTime);
      resonanceOsc.stop(startTime + duration);
      subBass.start(startTime);
      subBass.stop(startTime + duration * 0.8);
      harmonic.start(startTime);
      harmonic.stop(startTime + duration);
      noiseSource.start(startTime);
      noiseSource.stop(startTime + 0.15);
      
      console.log(`✅ Tambour ${resonance} créé avec succès`);
    } catch (error) {
      console.error('❌ Erreur création tambour:', error);
    }
  }
  
  // Fonction de base pour créer des sons doux et spirituels
  function createGentleSound(frequencies, duration = 0.8, fadeOut = 0.3) {
    if (!audioContext || !isInitialized) {
      console.warn('⚠️ Contexte audio non initialisé');
      return;
    }
    
    if (audioContext.state !== 'running') {
      console.warn('⚠️ Contexte audio pas en cours d\'exécution:', audioContext.state);
      return;
    }
    
    console.log(`🎵 Création son avec fréquences:`, frequencies);
    
    try {
      const startTime = audioContext.currentTime;
      const endTime = startTime + duration;
      
      frequencies.forEach((freq, index) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        // Type d'onde douce
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(freq, startTime);
        
        // Volume adapté
        const volume = 0.3 / frequencies.length; // Volume plus fort
        
        // Enveloppe douce
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(volume, startTime + 0.05);
        gainNode.gain.setValueAtTime(volume, endTime - fadeOut);
        gainNode.gain.linearRampToValueAtTime(0, endTime);
        
        // Connexions
        oscillator.connect(gainNode);
        gainNode.connect(masterGain);
        
        // Timing
        oscillator.start(startTime + index * 0.05);
        oscillator.stop(endTime);
      });
      
      console.log('✅ Son créé avec succès');
    } catch (error) {
      console.error('❌ Erreur création son:', error);
    }
  }
  
  // Collection de sons spirituels
  const faithSounds = {
    // Initialisation forcée
    init: function() {
      console.log('🎵 Initialisation forcée du système audio...');
      return initAudio().then(() => {
        console.log('✅ Initialisation forcée réussie');
        return true;
      }).catch(err => {
        console.error('❌ Initialisation forcée échouée:', err);
        return false;
      });
    },
    
    // Test simple d'abord
    test: function() {
      console.log('🧪 Test direct du son...');
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const tempContext = new AudioContext();
        const osc = tempContext.createOscillator();
        const gain = tempContext.createGain();
        
        osc.connect(gain);
        gain.connect(tempContext.destination);
        
        osc.frequency.value = 440; // La 440Hz
        gain.gain.value = 0.1;
        
        osc.start();
        osc.stop(tempContext.currentTime + 0.3);
        
        console.log('✅ Test son réussi');
      } catch (error) {
        console.error('❌ Test son échoué:', error);
      }
    },
    
    // Son de réponse correcte - Accord doux et lumineux
    correctAnswer: function() {
      console.log('🎵 Déclenchement son correctAnswer...');
      initAudio().then(() => {
        createGentleSound([523.25, 659.25, 783.99], 0.6, 0.2); // Do-Mi-Sol majeur
      }).catch(err => console.error('❌ Erreur correctAnswer:', err));
    },
    
    // Son de réponse incorrecte - Ton grave et compatissant
    wrongAnswer: function() {
      console.log('🎵 Déclenchement son wrongAnswer...');
      initAudio().then(() => {
        createGentleSound([220, 196], 0.8, 0.4); // La-Sol grave
      }).catch(err => console.error('❌ Erreur wrongAnswer:', err));
    },
    
    // Son d'étoile gagnée - Carillon céleste
    starEarned: function() {
      console.log('🎵 Déclenchement son starEarned...');
      initAudio().then(() => {
        createGentleSound([523.25, 659.25, 783.99, 1046.5], 1.2, 0.5); // Arpège ascendant
      }).catch(err => console.error('❌ Erreur starEarned:', err));
    },
    
    // Son de niveau terminé - Fanfare spirituelle
    levelComplete: function() {
      console.log('🎵 Déclenchement son levelComplete...');
      initAudio().then(() => {
        createGentleSound([392, 523.25, 659.25, 783.99, 1046.5], 1.8, 0.6); // Sol-Do-Mi-Sol-Do
      }).catch(err => console.error('❌ Erreur levelComplete:', err));
    },
    
    // Son de clic de bouton - Note pure et simple
    buttonClick: function() {
      console.log('🎵 Déclenchement son buttonClick...');
      initAudio().then(() => {
        createGentleSound([800], 0.3, 0.1); // Note claire et brève
      }).catch(err => console.error('❌ Erreur buttonClick:', err));
    },
    
    // Son de victoire de montagne - Gloire majestueuse
    mountainVictory: function() {
      console.log('🎵 Déclenchement son mountainVictory...');
      initAudio().then(() => {
        createGentleSound([261.63, 329.63, 392, 523.25, 659.25, 783.99], 2.5, 0.8);
      }).catch(err => console.error('❌ Erreur mountainVictory:', err));
    },
    
    // Son de gong - Résonnance profonde et spirituelle
    gong: function() {
      console.log('🎵 Déclenchement son gong...');
      initAudio().then(() => {
        createGongSound();
      }).catch(err => console.error('❌ Erreur gong:', err));
    },
    
    // Son de début de jeu - Fanfare d'encouragement
    gameStart: function() {
      console.log('🎵 Déclenchement son gameStart...');
      initAudio().then(() => {
        createGentleSound([523.25, 659.25, 783.99, 1046.5, 783.99], 1.5, 0.4); // Montée puis redescente
      }).catch(err => console.error('❌ Erreur gameStart:', err));
    },
    
    // Son de tick/clock - Clic mécanique doux
    tick: function() {
      console.log('🎵 Déclenchement son tick...');
      initAudio().then(() => {
        createTickSound();
      }).catch(err => console.error('❌ Erreur tick:', err));
    },
    
    // Son de Foi - Tambour sourd spirituel et lumineux (plus punché)
    faith: function() {
      console.log('🎵 Déclenchement tambour foi...');
      initAudio().then(() => {
        createDrumSound(65, 0.9, 0.45, 'faith'); // Plus grave et plus fort
      }).catch(err => console.error('❌ Erreur faith:', err));
    },
    
    // Son de Courage - Tambour sourd héroïque et puissant (très punché)
    courage: function() {
      console.log('🎵 Déclenchement tambour courage...');
      initAudio().then(() => {
        createDrumSound(55, 0.8, 0.5, 'courage'); // Très grave et très fort
      }).catch(err => console.error('❌ Erreur courage:', err));
    },
    
    // Son de Sagesse - Tambour sourd méditatif et profond (punché mais sage)
    wisdom: function() {
      console.log('🎵 Déclenchement tambour sagesse...');
      initAudio().then(() => {
        createDrumSound(60, 1.0, 0.4, 'wisdom'); // Grave, long et impactant
      }).catch(err => console.error('❌ Erreur wisdom:', err));
    },
    
    // Son picth - cristallin pour bulles d'étoiles
    picth: function() {
      console.log('🎵 Déclenchement son picth...');
      console.log('🔍 createPicthSound disponible:', typeof createPicthSound);
      initAudio().then(() => {
        createPicthSound(0.35);
      }).catch(err => console.error('❌ Erreur picth:', err));
    },
    
    // Son cheube - navigation douce pour < et >
    cheube: function() {
      console.log('🎵 Déclenchement son cheube...');
      console.log('🔍 createCheubeSound disponible:', typeof createCheubeSound);
      initAudio().then(() => {
        createCheubeSound(0.35);
      }).catch(err => console.error('❌ Erreur cheube:', err));
    },
    
    // Son tok - percussion sèche pour continuer
    tok: function() {
      console.log('🎵 Déclenchement son tok...');
      console.log('🔍 createTokSound disponible:', typeof createTokSound);
      initAudio().then(() => {
        createTokSound(0.35);
      }).catch(err => console.error('❌ Erreur tok:', err));
    },
    
    // Nouveaux sons percussifs
    paf: function() {
      console.log('🎵 Déclenchement son paf...');
      console.log('🔍 createPafSound disponible:', typeof createPafSound);
      initAudio().then(() => {
        createPafSound(0.35);
      }).catch(err => console.error('❌ Erreur paf:', err));
    },
    
    pong: function() {
      console.log('🎵 Déclenchement son pong...');
      console.log('🔍 createPongSound disponible:', typeof createPongSound);
      initAudio().then(() => {
        createPongSound(0.3);
      }).catch(err => console.error('❌ Erreur pong:', err));
    },
    
    boume: function() {
      console.log('🎵 Déclenchement son boume...');
      console.log('🔍 createBoumeSound disponible:', typeof createBoumeSound);
      initAudio().then(() => {
        createBoumeSound(0.4);
      }).catch(err => console.error('❌ Erreur boume:', err));
    },

    // Sons "pof" courts et percutants
    pof: function() {
      console.log('💥 Déclenchement son pof...');
      initAudio().then(() => {
        createPofSound(150, 'basic'); // Pof basique
      }).catch(err => console.error('❌ Erreur pof:', err));
    },
    
    pofHigh: function() {
      console.log('💥 Déclenchement son pofHigh...');
      initAudio().then(() => {
        createPofSound(400, 'high'); // Pof aigu
      }).catch(err => console.error('❌ Erreur pofHigh:', err));
    },
    
    pofLow: function() {
      console.log('💥 Déclenchement son pofLow...');
      initAudio().then(() => {
        createPofSound(80, 'low'); // Pof grave
      }).catch(err => console.error('❌ Erreur pofLow:', err));
    },
    
    // Son "wrash" pour les retours
    wrash: function() {
      console.log('💨 Déclenchement son wrash...');
      initAudio().then(() => {
        createWrashSound(); // Son de retour/annulation
      }).catch(err => console.error('❌ Erreur wrash:', err));
    },
    
    // Son "groook" de pierre/roche
    groook: function() {
      console.log('🗿 Déclenchement son groook...');
      initAudio().then(() => {
        createGroookSound(); // Son de pierre/roche profond
      }).catch(err => console.error('❌ Erreur groook:', err));
    },
    
    // Son "reset" pour remise à zéro
    reset: function() {
      console.log('🔄 Déclenchement son reset...');
      initAudio().then(() => {
        createResetSound(); // Son de remise à zéro/effacement
      }).catch(err => console.error('❌ Erreur reset:', err));
    }
  };
  
  // Contrôle du volume principal
  faithSounds.setVolume = function(volume) {
    console.log('🔊 Changement volume:', volume);
    if (masterGain) {
      masterGain.gain.value = Math.max(0, Math.min(1, volume));
      console.log('✅ Volume appliqué:', masterGain.gain.value);
    } else {
      console.warn('⚠️ masterGain non disponible pour volume - initialisation du contexte audio...');
      // Initialiser le contexte audio si nécessaire
      initAudio().then(() => {
        if (masterGain) {
          masterGain.gain.value = Math.max(0, Math.min(1, volume));
          console.log('✅ Volume appliqué après initialisation:', masterGain.gain.value);
        } else {
          console.error('❌ Impossible d\'initialiser masterGain');
        }
      }).catch(err => {
        console.error('❌ Erreur initialisation audio pour volume:', err);
      });
    }
  };
  
  // Export global
  window.faithSounds = faithSounds;
  
  console.log('✅ Faith Chronicles - Système audio spirituel initialisé');
  console.log('🔧 Methods disponibles:', Object.keys(faithSounds));
  
  // Initialisation automatique du contexte audio dès qu'il y a une interaction
  let userInteractionDetected = false;
  
  function handleFirstUserInteraction() {
    if (!userInteractionDetected) {
      userInteractionDetected = true;
      console.log('👆 Première interaction utilisateur détectée - initialisation audio...');
      initAudio().then(() => {
        console.log('✅ Contexte audio pré-initialisé');
      }).catch(err => {
        console.error('❌ Erreur pré-initialisation audio:', err);
      });
      
      // Retirer les listeners après la première interaction
      document.removeEventListener('click', handleFirstUserInteraction);
      document.removeEventListener('keydown', handleFirstUserInteraction);
      document.removeEventListener('touchstart', handleFirstUserInteraction);
    }
  }
  
  // Ajouter les listeners pour détecter la première interaction
  document.addEventListener('click', handleFirstUserInteraction);
  document.addEventListener('keydown', handleFirstUserInteraction);
  document.addEventListener('touchstart', handleFirstUserInteraction);
  
  // Test automatique après 2 secondes pour vérifier que tout fonctionne
  setTimeout(() => {
    console.log('🧪 Test automatique du système audio...');
    window.testFaithSounds = function() {
      console.log('🧪 Début test sounds...');
      if (window.faithSounds) {
        window.faithSounds.buttonClick();
      } else {
        console.error('❌ window.faithSounds non disponible');
      }
    };
  }, 2000);
})();