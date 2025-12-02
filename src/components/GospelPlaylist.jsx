/**
 * Faith Chronicles - Gospel Playlist Component
 * Lecture automatique des chansons gospel
 */
import React, { useState, useEffect, useRef } from 'react';
import { gospelSongs } from '../../public/gospel/index.js';

const GospelPlaylist = ({ isActive = true, volume = 0.3 }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef(null);

  // Initialiser l'audio
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.loop = false;
      
      // Auto-play si activé
      if (isActive && !isPlaying) {
        playCurrentSong();
      }
    }
  }, [isActive, volume]);

  // Jouer la chanson actuelle
  const playCurrentSong = () => {
    if (audioRef.current && gospelSongs[currentSongIndex]) {
      const song = gospelSongs[currentSongIndex];
      const audioPath = `./gospel/${song.filename}`;
      
      audioRef.current.src = audioPath;
      audioRef.current.load();
      
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setIsLoaded(true);
          // console.log(`🎵 Lecture: ${song.title}`);
        })
        .catch(error => {
          // console.log(`❌ Erreur lecture: ${song.title}`, error);
          nextSong();
        });
    }
  };

  // Chanson suivante
  const nextSong = () => {
    const nextIndex = (currentSongIndex + 1) % gospelSongs.length;
    setCurrentSongIndex(nextIndex);
  };

  // Chanson précédente
  const prevSong = () => {
    const prevIndex = currentSongIndex === 0 ? gospelSongs.length - 1 : currentSongIndex - 1;
    setCurrentSongIndex(prevIndex);
  };

  // Quand la chanson change
  useEffect(() => {
    if (isActive && isLoaded) {
      playCurrentSong();
    }
  }, [currentSongIndex]);

  // Gestionnaires d'événements audio
  const handleSongEnd = () => {
    nextSong();
  };

  const handleSongError = () => {
    // console.log(`❌ Erreur chargement: ${gospelSongs[currentSongIndex]?.title}`);
    nextSong();
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const currentSong = gospelSongs[currentSongIndex];

  if (!isActive) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-3 z-50 max-w-xs">
      {/* Audio element */}
      <audio
        ref={audioRef}
        onEnded={handleSongEnd}
        onError={handleSongError}
        preload="none"
      />

      {/* Informations de la chanson */}
      <div className="mb-2">
        <div className="text-xs font-bold text-gray-800 truncate">
          🎵 {currentSong?.title || 'Chargement...'}
        </div>
        <div className="text-xs text-gray-600">
          {currentSongIndex + 1}/{gospelSongs.length}
        </div>
      </div>

      {/* Contrôles */}
      <div className="flex items-center justify-between">
        <button
          onClick={prevSong}
          className="p-1 rounded bg-blue-100 hover:bg-blue-200 text-blue-600 text-xs"
          title="Précédent"
        >
          ⏮️
        </button>

        <button
          onClick={togglePlayPause}
          className="p-1 rounded bg-green-100 hover:bg-green-200 text-green-600 text-sm"
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? '⏸️' : '▶️'}
        </button>

        <button
          onClick={nextSong}
          className="p-1 rounded bg-blue-100 hover:bg-blue-200 text-blue-600 text-xs"
          title="Suivant"
        >
          ⏭️
        </button>
      </div>

      {/* Indicateur de lecture */}
      {isPlaying && (
        <div className="mt-2 flex items-center">
          <div className="flex space-x-1">
            <div className="w-1 h-3 bg-green-500 rounded animate-pulse"></div>
            <div className="w-1 h-2 bg-green-400 rounded animate-pulse" style={{animationDelay: '0.2s'}}></div>
            <div className="w-1 h-4 bg-green-500 rounded animate-pulse" style={{animationDelay: '0.4s'}}></div>
            <div className="w-1 h-2 bg-green-400 rounded animate-pulse" style={{animationDelay: '0.6s'}}></div>
          </div>
          <span className="ml-2 text-xs text-green-600">En lecture</span>
        </div>
      )}
    </div>
  );
};

export default GospelPlaylist;
