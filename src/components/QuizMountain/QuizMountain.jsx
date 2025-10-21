import React, { useState, useEffect, useRef } from 'react';
import './QuizMountain.css';
import FaithChroniclesProgress from './FaithChroniclesProgress';

/**
 * Composant QuizMountain pour React
 * 100% créé par Claude (Dreamer Unisona)
 */

const QuizMountain = ({ 
  onLevelChange, 
  onQuizComplete, 
  autoStart = true,
  className = '',
  showStats = true,
  gameState = null
}) => {
  const [points, setPoints] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [status, setStatus] = useState("progress");
  
  const svgRef = useRef(null);
  const controllerRef = useRef(null);
  
  // Positions des waypoints
  const waypoints = [
    {x: 80, y: 600, label: "Départ"},
    {x: 140, y: 600, label: "Base"}, 
    {x: 202, y: 580, label: "Sentier"},
    {x: 264, y: 560, label: "Première pente"},
    {x: 280, y: 520, label: "Mi-parcours"},
    {x: 255, y: 480, label: "Falaise"},
    {x: 202, y: 440, label: "Plateau"},
    {x: 149, y: 400, label: "Dernière pente"},
    {x: 180, y: 350, label: "Avant-sommet"},
    {x: 202, y: 200, label: "SOMMET! 🏔️"}
  ];
  
  const maxPoints = 100;
  const progressionThreshold = 10;
  
  // Fonction pour calculer le niveau de montagne basé sur le chapitre
  const getMountainLevelFromChapter = (chapter) => {
    if (!chapter || chapter < 1) return 0;
    
    // Chapitre 1 = point 2, Chapitre 2 = point 3, etc.
    if (chapter <= 6) {
      return chapter + 1;
    }
    
    // Chapitre 7 terminé = victoire (sommet)
    if (chapter >= 7) {
      return waypoints.length - 1; // Sommet
    }
    
    return 0;
  };

  // Classe QuizController intégrée
  class QuizController {
    constructor(onStateChange) {
      this.onStateChange = onStateChange;
      this.points = 0;
      this.level = 0;
      this.svgElement = null;
      this.lambElement = null;
    }

    setSvgElements(svg, lamb) {
      this.svgElement = svg;
      this.lambElement = lamb;
    }

    // Méthode pour mettre à jour basé sur le chapitre
    updateFromChapter(chapter, status = "progress") {
      const oldLevel = this.level;
      const newMountainLevel = getMountainLevelFromChapter(chapter);
      
      if (newMountainLevel !== this.level) {
        this.level = newMountainLevel;
        this.moveToLevel(this.level);
      }
      
      const isCompleted = this.level === waypoints.length - 1;
      const finalStatus = isCompleted ? "victory" : status;
      
      // Calculer les points basés sur le niveau de montagne pour l'affichage
      this.points = Math.min(this.level * progressionThreshold, maxPoints);
      
      this.onStateChange({
        points: this.points,
        level: this.level,
        percentage: Math.round((this.points / maxPoints) * 100),
        isCompleted: isCompleted,
        waypoint: waypoints[this.level],
        status: finalStatus
      });

      return {
        levelChanged: this.level !== oldLevel,
        newLevel: this.level,
        oldLevel: oldLevel
      };
    }

    // Commandes de progression pour le jeu
    startGame() {
      // Lance l'animation initiale - J.C. au départ
      return this.updateFromChapter(0, "progress");
    }

    completeChapter(chapterNum) {
      // Termine un chapitre et passe au suivant
      console.log(`🏔️ Chapitre ${chapterNum} terminé !`);
      return this.updateFromChapter(chapterNum, "progress");
    }

    triggerVictory() {
      // Déclenche l'animation de victoire
      console.log(`🏆 VICTOIRE ! J.C. atteint le sommet !`);
      return this.updateFromChapter(7, "victory");
    }

    triggerDefeat() {
      // Déclenche l'animation de défaite
      console.log(`💔 Défaite... J.C. redescend`);
      return this.updateFromChapter(0, "defeat");
    }

    unlockChapter8() {
      // Débloque le chapitre bonus avec le point doré
      console.log(`✨ Chapitre 8 débloqué ! Point doré activé !`);
      this.onStateChange({
        points: this.points,
        level: this.level,
        percentage: this.percentage,
        isCompleted: true,
        waypoint: waypoints[this.level],
        status: "victory",
        chapter8Unlocked: true
      });
    }

    addPoints(pointsToAdd) {
      const oldPoints = this.points;
      const oldLevel = this.level;
      
      this.points = Math.max(0, Math.min(maxPoints, this.points + pointsToAdd));
      const newLevel = Math.floor(this.points / progressionThreshold);
      const clampedLevel = Math.min(newLevel, waypoints.length - 1);
      
      if (clampedLevel !== this.level) {
        this.level = clampedLevel;
        this.moveToLevel(this.level);
      }
      
      const newStatus = this.level === waypoints.length - 1 ? "victory" : 
                       pointsToAdd < 0 ? "defeat" : "progress";
      
      this.onStateChange({
        points: this.points,
        level: this.level,
        percentage: Math.round((this.points / maxPoints) * 100),
        isCompleted: this.level === waypoints.length - 1,
        waypoint: waypoints[this.level],
        status: newStatus
      });

      return {
        pointsGained: pointsToAdd,
        levelChanged: this.level !== oldLevel,
        newLevel: this.level,
        oldLevel: oldLevel
      };
    }

    moveToLevel(level) {
      if (!this.lambElement || level < 0 || level >= waypoints.length) return;
      
      const waypoint = waypoints[level];
      
      // Animation de déplacement
      this.lambElement.style.transition = 'transform 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
      this.lambElement.style.transform = `translate(${waypoint.x}px, ${waypoint.y}px)`;
      
      // Activer le point visuellement
      this.activatePoint(level);
      
      // Animation spéciale pour le sommet
      if (level === waypoints.length - 1) {
        setTimeout(() => this.celebrateLamb(), 1500);
      }
    }

    activatePoint(level) {
      if (!this.svgElement) return;
      
      const points = this.svgElement.querySelectorAll('.quiz-points circle');
      
      points.forEach((point, index) => {
        if (index < level) {
          // Points validés (verts)
          point.setAttribute('fill', '#27ae60');
          point.setAttribute('r', '7');
          point.setAttribute('opacity', '1');
        } else if (index === level) {
          // Point actuel (bleu)
          point.setAttribute('fill', '#3498db');
          point.setAttribute('r', '8');
          point.setAttribute('opacity', '1');
        } else {
          // Points futurs (gris)
          point.setAttribute('fill', '#95a5a6');
          point.setAttribute('r', '6');
          point.setAttribute('opacity', '0.7');
        }
      });
    }

    celebrateLamb() {
      if (!this.lambElement) return;
      
      // Animation de célébration
      this.lambElement.style.animation = 'celebration 2s ease-in-out 3';
      
      // Point sommet doré
      if (this.svgElement) {
        const summit = this.svgElement.querySelector('.quiz-points circle:last-child');
        if (summit) {
          summit.setAttribute('fill', '#f1c40f');
          summit.setAttribute('r', '12');
        }
      }
    }

    reset() {
      this.points = 0;
      this.level = 0;
      this.moveToLevel(0);
      
      if (this.lambElement) {
        this.lambElement.style.animation = '';
      }
      
      this.onStateChange({
        points: 0,
        level: 0,
        percentage: 0,
        isCompleted: false,
        waypoint: waypoints[0]
      });
    }
  }

  // Initialisation du contrôleur
  useEffect(() => {
    const handleStateChange = (newState) => {
      setPoints(newState.points);
      setCurrentLevel(newState.level);
      setPercentage(newState.percentage);
      setIsCompleted(newState.isCompleted);
      setStatus(newState.status || "progress");
      
      // Callbacks vers le parent
      if (onLevelChange && newState.level !== currentLevel) {
        onLevelChange(newState.level, newState.waypoint);
      }
      
      if (onQuizComplete && newState.isCompleted && !isCompleted) {
        onQuizComplete(newState);
      }
    };

    controllerRef.current = new QuizController(handleStateChange);
    
    return () => {
      controllerRef.current = null;
    };
  }, []);

  // Initialisation du SVG
  useEffect(() => {
    const initSvg = () => {
      const svgObject = svgRef.current;
      let svgDoc, lambElement;
      
      if (svgObject && svgObject.contentDocument) {
        // SVG en tant qu'object
        svgDoc = svgObject.contentDocument;
        lambElement = svgDoc.getElementById('lamb');
      } else {
        // SVG inline
        svgDoc = document;
        lambElement = document.getElementById('lamb');
      }
      
      if (svgDoc && lambElement && controllerRef.current) {
        controllerRef.current.setSvgElements(svgDoc, lambElement);
        
        if (autoStart) {
          // Utiliser le chapitre s'il est fourni dans gameState
          const chapter = gameState?.currentChapter || Math.min(8, Math.ceil((gameState?.currentLevel || currentLevel) / 13) || 1);
          if (chapter) {
            controllerRef.current.updateFromChapter(chapter, gameState?.currentStatus || status);
          } else {
            controllerRef.current.moveToLevel(0);
          }
        }
      }
    };

    // Essayer plusieurs fois car le SVG peut mettre du temps à charger
    const attempts = [100, 500, 1000, 2000];
    attempts.forEach(delay => {
      setTimeout(initSvg, delay);
    });
  }, [autoStart]);

  // Méthodes publiques exposées via useImperativeHandle ou ref
  const quizMethods = {
    correctAnswer: (pointsToAdd = 10) => {
      if (controllerRef.current && !isCompleted) {
        return controllerRef.current.addPoints(pointsToAdd);
      }
    },
    
    wrongAnswer: (pointsToLose = 5) => {
      if (controllerRef.current && !isCompleted) {
        return controllerRef.current.addPoints(-pointsToLose);
      }
    },
    
    bonus: (bonusPoints = 20) => {
      if (controllerRef.current && !isCompleted) {
        return controllerRef.current.addPoints(bonusPoints);
      }
    },
    
    updateFromChapter: (chapter, status = "progress") => {
      if (controllerRef.current) {
        return controllerRef.current.updateFromChapter(chapter, status);
      }
    },
    
    // Commandes de progression
    startGame: () => {
      if (controllerRef.current) {
        return controllerRef.current.startGame();
      }
    },
    
    completeChapter: (chapterNum) => {
      if (controllerRef.current) {
        return controllerRef.current.completeChapter(chapterNum);
      }
    },
    
    triggerVictory: () => {
      if (controllerRef.current) {
        return controllerRef.current.triggerVictory();
      }
    },
    
    triggerDefeat: () => {
      if (controllerRef.current) {
        return controllerRef.current.triggerDefeat();
      }
    },
    
    unlockChapter8: () => {
      if (controllerRef.current) {
        return controllerRef.current.unlockChapter8();
      }
    },
    
    reset: () => {
      if (controllerRef.current) {
        controllerRef.current.reset();
      }
    },
    
    getStats: () => ({
      points,
      level: currentLevel,
      percentage,
      isCompleted,
      waypoint: waypoints[currentLevel],
      status
    })
  };

  // Exposer les méthodes via une ref
  React.useImperativeHandle(svgRef, () => quizMethods);

  return (
    <div className={`quiz-mountain ${className} w-full h-full`}>
      {/* Composant FaithChroniclesProgress prend toute la place */}
      <FaithChroniclesProgress 
        chapter={gameState?.currentChapter || Math.ceil((gameState?.currentLevel || currentLevel) / 13) || 1}
        chapter8Unlocked={gameState?.hasReachedSummit || isCompleted}
        status={gameState?.currentStatus || status}
        currentLevel={gameState?.currentLevel || currentLevel}
      />

      {/* Affichage simplifié des statistiques en overlay */}
      {showStats && (
        <div className="absolute top-4 left-4 bg-white bg-opacity-80 rounded-lg p-2 text-sm">
          <div className="flex gap-4">
            <span className="font-bold">{points}pts</span>
            <span>{percentage}%</span>
            <span>Niv.{currentLevel + 1}</span>
          </div>
        </div>
      )}
    </div>
  );
};

// Hook personnalisé pour utiliser le contrôleur
export const useQuizMountain = (ref) => {
  return {
    correctAnswer: (points) => ref.current?.correctAnswer(points),
    wrongAnswer: (points) => ref.current?.wrongAnswer(points),
    bonus: (points) => ref.current?.bonus(points),
    updateFromChapter: (chapter, status) => ref.current?.updateFromChapter(chapter, status),
    
    // Commandes de progression
    startGame: () => ref.current?.startGame(),
    completeChapter: (chapterNum) => ref.current?.completeChapter(chapterNum),
    triggerVictory: () => ref.current?.triggerVictory(),
    triggerDefeat: () => ref.current?.triggerDefeat(),
    unlockChapter8: () => ref.current?.unlockChapter8(),
    
    reset: () => ref.current?.reset(),
    getStats: () => ref.current?.getStats()
  };
};

export default QuizMountain;