import React from 'react';
import { Zap, ArrowLeft, Sparkles } from 'lucide-react';
import EndCredits from '../EndCredits';
import { calculateQuestionXP, getProgressionFromXP, formatProgression } from '../../data/progressionSystem';
import useTranslation from '../../hooks/useTranslation';
import useChapterData from '../../hooks/useChapterData';

const QuestionScreen = ({
  currentQuestion, selectedCard, setSelectedCard, questionDifficulty, combo, isAnswering,
  selectedAnswer, setSelectedAnswer, setIsAnswering, showFunFact,
  funFactText, setFunFactText, setShowFunFact, score, setScore, wisdomPoints, setWisdomPoints,
  setCombo, questionsAnswered, setQuestionsAnswered, lives, setLives,
  setCurrentScreen, moduleManager, currentLevel, setQuestionDifficulty,
  setCurrentQuestion, unlockedLevels, setUnlockedLevels, revelationPoints,
  setRevelationPoints, levelStars, setLevelStars, totalXP, setTotalXP, saveStarsForLevel, audio
}) => {
  const { t } = useTranslation();
  const { getLevel } = useChapterData();
  const [showEndCredits, setShowEndCredits] = React.useState(false);
  const [xpGained, setXpGained] = React.useState(0);
  const [questionStartTime] = React.useState(Date.now());

  const handleAnswer = async (optionIndex) => {
    if (isAnswering) return;
    setIsAnswering(true);
    setSelectedAnswer(optionIndex);
    
    // Jouer le son "pof+" lors de la sélection d'une réponse
    audio?.sounds?.pofHigh();
    
    const isCorrect = optionIndex === currentQuestion.correct;
    
    setTimeout(async () => {
      if (isCorrect) {
        let basePoints = questionDifficulty === 'easy' ? 10 : questionDifficulty === 'medium' ? 25 : 50;

        // Appliquer le multiplicateur de la carte sélectionnée
        if (selectedCard && selectedCard.multiplier) {
          basePoints = Math.floor(basePoints * selectedCard.multiplier);
        }

        // Calculer le temps de réponse en secondes
        const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);

        // Calculer l'XP gagné avec le système de progression
        const earnedXP = calculateQuestionXP({
          difficulty: questionDifficulty,
          isCorrect: isCorrect,
          combo: combo,
          timeSpent: timeSpent,
          isFirstTry: true // Vous pouvez ajuster selon votre logique
        });
        console.log(`💰 XP Calculée: ${earnedXP} (${isCorrect ? 'CORRECT' : 'ERREUR'}, difficulté: ${questionDifficulty}, combo: ${combo})`);
        setXpGained(earnedXP);

        // Protection anti-régression: toujours permettre un minimum d'XP
        const isLevelAlreadyCompleted = levelStars[currentLevel] !== undefined;
        if (!isLevelAlreadyCompleted) {
          // Niveau non complété: XP et points normaux
          setScore(score + basePoints);
          setWisdomPoints(wisdomPoints + basePoints);
          setTotalXP(prev => Math.max(prev, (prev || 0) + earnedXP));
        } else if (earnedXP > 0) {
          // Niveau complété: XP réduite mais pas de points
          const reducedXP = Math.floor(earnedXP * 0.3); // 30% de l'XP normale
          setTotalXP(prev => Math.max(prev, (prev || 0) + reducedXP));
          setXpGained(reducedXP);
        } else {
          // Mauvaise réponse: pénalité mais protection contre régression excessive
          setTotalXP(prev => Math.max(0, (prev || 0) + earnedXP));
        }

        setCombo(combo + 1);
        
        // 🎵 Son de bonne réponse
        audio?.sounds?.correctAnswer();
        
        // Pour le niveau bonus 92 question difficile, afficher les crédits de fin
        if (currentLevel === 92 && questionDifficulty === 'hard') {
          setTimeout(() => {
            setShowEndCredits(true);
          }, 1000);
        } else {
          setFunFactText(currentQuestion.funFact);
          setShowFunFact(true);
        }
        
        const newQuestionsAnswered = questionsAnswered + 1;
        setQuestionsAnswered(newQuestionsAnswered);
      } else {
        // 🎵 Son de mauvaise réponse
        audio?.sounds?.wrongAnswer();
        
        // Bonus COURAGE : seconde chance
        if (selectedCard && selectedCard.bonus === 'secondChance') {
          setTimeout(() => {
            setSelectedAnswer(null);
            setIsAnswering(false);
            alert(t('messages.secondChance'));
            // Désactiver le bonus pour éviter l'infini
            setSelectedCard({...selectedCard, bonus: 'used'});
          }, 1000);
          return;
        }
        
        setTimeout(() => {
          setLives(lives - 1);
          setCombo(0);
          setSelectedAnswer(null);
          setIsAnswering(false);
          
          if (lives <= 1) {
            setCurrentScreen('gameOver');
          } else {
            alert(t('messages.wrongAnswer').replace('{lives}', lives - 1));
          }
        }, 1000);
      }
    }, 500);
  };

  const continueFunFact = async () => {
    // Son tok pour le bouton continuer
    if (audio?.sounds?.tok) {
      audio.sounds.tok();
    }
    
    setShowFunFact(false);
    setSelectedAnswer(null);
    setIsAnswering(false);
    
    try {
      const levelData = getLevel(currentLevel);
      
      if (questionDifficulty === 'easy') {
        setQuestionDifficulty('medium');
        setCurrentQuestion(levelData.medium);
      } else if (questionDifficulty === 'medium') {
        setQuestionDifficulty('hard');
        setCurrentQuestion(levelData.hard);
      } else {
        // 🎵 Son de fin de niveau
        audio?.sounds?.levelComplete();
        
        // Calculer les étoiles basées sur les vies restantes
        let starsEarned = lives >= 3 ? 3 : lives >= 2 ? 2 : 1;
        
        // 🎵 Son d'étoiles gagnées
        setTimeout(() => {
          audio?.sounds?.starEarned();
        }, 500);
        
        // Sauvegarder les étoiles pour ce niveau (localement ET dans Supabase)
        const currentStars = levelStars[currentLevel] || 0;
        const finalStars = Math.max(currentStars, starsEarned);
        
        // Utiliser saveStarsForLevel au lieu de setLevelStars pour sauvegarder aussi dans Supabase
        await saveStarsForLevel(currentLevel, finalStars);
        
        if (!unlockedLevels.includes(currentLevel + 1) && currentLevel < 91) {
          setUnlockedLevels([...unlockedLevels, currentLevel + 1]);
        }
        
        // Débloquer niveau bonus 92 - seuil de maîtrise spirituelle
        const testUnlockThreshold = 8000; // Points pour la perfection spirituelle
        if (wisdomPoints >= testUnlockThreshold && !unlockedLevels.includes(92)) {
          setUnlockedLevels([...unlockedLevels, 92]);
          // 🎵 Son de notification spéciale
          audio?.sounds?.notification();
          alert(t('levels.bonusUnlocked'));
        }
        
        setRevelationPoints(revelationPoints + 10);
        setQuestionsAnswered(0);
        setCurrentScreen('victory');
      }
    } catch (error) {
      console.error("Erreur chargement question suivante:", error);
    }
  };

  return (
    <div className="relative z-10 p-6 h-full flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                audio?.sounds?.wrash();
                setCurrentScreen('levelSelect');
              }}
              className="p-2 rounded-full bg-white/80 hover:bg-white shadow-md hover:shadow-lg transition-all active:scale-95 border border-gray-200"
            >
              <ArrowLeft className="w-4 h-4 text-gray-600" />
            </button>
            <div className={`px-3 py-1 rounded-full text-xs font-bold
                          ${questionDifficulty === 'easy' ? 'bg-green-500 text-white' :
                            questionDifficulty === 'medium' ? 'bg-yellow-500 text-white' :
                            'bg-red-500 text-white'}`}>
              {questionDifficulty === 'easy' ? t('labels.easy') : 
               questionDifficulty === 'medium' ? t('labels.medium') : t('labels.hard')}
            </div>
            {selectedCard && (
              <div className={`px-3 py-1 rounded-full text-xs font-bold text-white flex items-center gap-1 relative overflow-hidden
                              bg-gradient-to-r ${selectedCard.color} shadow-lg animate-pulse`}>
                {/* Effet de brillance animé */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-shimmer"></div>
                
                <span className="relative z-10 text-base animate-bounce" style={{animationDuration: '2s'}}>{selectedCard.icon}</span>
                <span className="relative z-10">{selectedCard.name}</span>
                
                {/* Indicateur de bonus actif */}
                {selectedCard.bonus !== 'used' && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-ping"></div>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-500" />
            <span className="font-bold text-black">x{combo}</span>
          </div>
        </div>

        <div className="mb-8">
          <div className="p-6 bg-white rounded-3xl shadow-xl relative overflow-hidden border-2 border-blue-100">
            <div className="absolute top-2 right-2 text-4xl opacity-20">💭</div>
            <h3 className="text-lg font-bold text-black mb-2">{t('labels.questionOfKnowledge')}</h3>
            <p className="text-black">{currentQuestion.question}</p>
            
            {/* Indice SAGESSE */}
            {selectedCard && selectedCard.bonus === 'hint' && currentQuestion.hint && (
              <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-blue-600">📜</span>
                  <span className="text-xs font-bold text-blue-700">{t('labels.hintOfWisdom')} :</span>
                </div>
                <p className="text-xs text-gray-700 italic">{currentQuestion.hint}</p>
              </div>
            )}
          </div>
          <div className="text-xs text-center text-gray-700 mt-2">
            {t('messages.questionsProgress')
              .replace('{current}', questionDifficulty === 'easy' ? '1' : questionDifficulty === 'medium' ? '2' : '3')
              .replace('{total}', '3')}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="text-center text-sm font-bold text-black mb-2">
          {t('messages.chooseAnswer')}
        </div>
        {currentQuestion.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = index === currentQuestion.correct;
          const showResult = isAnswering && selectedAnswer !== null;
          
          return (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={isAnswering}
              className={`w-full p-4 rounded-full text-left transition-all 
                       flex items-center gap-3 shadow-md
                       ${!isAnswering ? 'hover:shadow-lg active:scale-95' : ''}
                       ${showResult && isSelected && isCorrect ? 'bg-green-100 border-green-400' :
                         showResult && isSelected && !isCorrect ? 'bg-red-100 border-red-400' :
                         'bg-white border-blue-100 hover:border-blue-300'}
                       ${isAnswering ? 'cursor-not-allowed' : 'cursor-pointer'}
                       border-2`}
            >
              <div className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-white text-xs
                            ${showResult && isSelected && isCorrect ? 'bg-green-500' :
                              showResult && isSelected && !isCorrect ? 'bg-red-500' :
                              'bg-gradient-to-br from-blue-500 to-purple-500'}`}>
                {showResult && isSelected ? (isCorrect ? '✓' : '✗') : String.fromCharCode(65 + index)}
              </div>
              <span className="text-black flex-1 font-medium">{option}</span>
            </button>
          );
        })}
      </div>

      {showFunFact && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center p-6 z-50">
          <div className="bg-white rounded-3xl p-6 max-w-sm animate-bounce-in shadow-2xl">
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">✅</div>
              <h3 className="text-xl font-bold text-green-600">{t('labels.knowledgeAcquired')}</h3>
            </div>
            <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border-2 border-green-100">
              <p className="text-sm text-black font-medium">{funFactText}</p>
            </div>
            <div className="text-center mt-4">
              <div className="text-sm text-black font-bold mb-3 space-y-2">
                {(() => {
                  let basePoints = questionDifficulty === 'easy' ? 10 : questionDifficulty === 'medium' ? 25 : 50;
                  let finalPoints = selectedCard && selectedCard.multiplier ? Math.floor(basePoints * selectedCard.multiplier) : basePoints;
                  return (
                    <div>
                      <div>{t('messages.pointsEarned').replace('{points}', finalPoints)}</div>
                      {selectedCard && selectedCard.multiplier && selectedCard.multiplier > 1.0 && (
                        <div className="text-xs text-yellow-600 mt-1">
                          {t('messages.bonusApplied')
                            .replace('{card}', selectedCard.name)
                            .replace('{percent}', Math.round((selectedCard.multiplier - 1) * 100))
                            .replace('{base}', basePoints)
                            .replace('{final}', finalPoints)}
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* Affichage de l'XP gagné */}
                {xpGained > 0 && (
                  <div className="p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border-2 border-purple-200 mt-2">
                    <div className="flex items-center justify-center gap-2">
                      <Sparkles className="w-4 h-4 text-purple-600 animate-pulse" />
                      <span className="text-purple-700 font-bold">+{xpGained} {t('labels.xpGained')}</span>
                      <Sparkles className="w-4 h-4 text-purple-600 animate-pulse" />
                    </div>
                    {(() => {
                      const oldXP = (totalXP || 0) - xpGained;
                      const oldProgression = getProgressionFromXP(oldXP);
                      const newProgression = getProgressionFromXP(totalXP || 0);
                      const leveledUp = oldProgression.level !== newProgression.level || oldProgression.grade !== newProgression.grade;

                      if (leveledUp) {
                        const newRank = formatProgression(newProgression.level, newProgression.grade);
                        const rankName = t(`ranks.${newRank.levelNameKey}`) || newRank.levelNameKey;
                        return (
                          <div className="text-xs text-purple-600 font-semibold mt-1 animate-bounce">
                            🎉 {t('labels.newRank')} : {rankName} {newRank.gradeRoman}
                          </div>
                        );
                      }
                      return null;
                    })()}
                  </div>
                )}
              </div>
              <button
                onClick={continueFunFact}
                className="px-6 py-2 bg-green-500 text-white rounded-full font-bold 
                         shadow-lg hover:bg-green-600 active:scale-95 transition-all"
              >
                {t('buttons.continue')} →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Crédits de fin pour le niveau bonus 92 */}
      {showEndCredits && (
        <EndCredits 
          onComplete={() => {
            setShowEndCredits(false);
            setCurrentScreen('info');
          }}
        />
      )}
    </div>
  );
};

export default QuestionScreen;