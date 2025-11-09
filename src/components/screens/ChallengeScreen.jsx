import React from 'react';
import { Heart } from 'lucide-react';
import useTranslation from '../../hooks/useTranslation';
import useChapterData from '../../hooks/useChapterData';

const ChallengeScreen = ({ 
  currentLevel, lives, levelStars, setSelectedCard, setQuestionDifficulty, 
  setSelectedAnswer, setIsAnswering, setQuestionsAnswered, moduleManager, 
  setCurrentQuestion, setCurrentScreen, audio 
}) => {
  const { t } = useTranslation();
  const { getLevel } = useChapterData();

  const cards = [
    { 
      id: 1, 
      name: t('cards.faith'), 
      icon: '✨', 
      knowledge: t('cards.faithKnowledge'),
      bonus: 'pointMultiplier',
      multiplier: 1.5,
      description: t('cards.faithDesc'),
      color: 'from-yellow-400 to-orange-500',
      glow: 'shadow-yellow-500/50'
    },
    { 
      id: 2, 
      name: t('cards.courage'), 
      icon: '⚔️', 
      knowledge: t('cards.courageKnowledge'),
      bonus: 'eliminateWrong',
      multiplier: 1.0,
      description: t('cards.courageDesc'),
      color: 'from-red-400 to-red-600',
      glow: 'shadow-red-500/50'
    },
    { 
      id: 3, 
      name: t('cards.wisdom'), 
      icon: '📜', 
      knowledge: t('cards.wisdomKnowledge'),
      bonus: 'hint',
      multiplier: 1.25,
      description: t('cards.wisdomDesc'),
      color: 'from-blue-400 to-purple-600',
      glow: 'shadow-purple-500/50'
    }
  ];

  const handleSelectCard = async (card) => {
    // Jouer le son correspondant à la carte choisie
    if (card.name === t('cards.faith')) {
      audio?.sounds?.faith();
    } else if (card.name === t('cards.courage')) {
      audio?.sounds?.courage();
    } else if (card.name === t('cards.wisdom')) {
      audio?.sounds?.wisdom();
    }
    
    setSelectedCard(card);
    setQuestionDifficulty('easy');
    setSelectedAnswer(null);
    setIsAnswering(false);
    setQuestionsAnswered(0);
    
    try {
      const levelData = getLevel(currentLevel);
      if (levelData && levelData.questions && levelData.questions.easy) {
        setCurrentQuestion(levelData.questions.easy);
        setCurrentScreen('question');
      }
    } catch (error) {
      console.error("Erreur chargement questions:", error);
    }
  };

  return (
    <div className="relative z-10 p-6 h-full flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-black">{t('labels.level')} {currentLevel}</div>
          <div className="flex gap-0.5">
            {[1, 2, 3].map((star) => {
              const currentStars = levelStars[currentLevel] || 0;
              return (
                <span
                  key={star}
                  className={`text-lg ${star <= currentStars ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  {star <= currentStars ? '★' : '☆'}
                </span>
              );
            })}
          </div>
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <Heart 
                key={i} 
                className={`w-5 h-5 ${i < lives ? 'text-red-500 fill-red-500' : 'text-gray-300'}`} 
              />
            ))}
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-4 text-black">
          {t('challenge.loading')}
        </h2>
        
        <div className="p-6 bg-white rounded-3xl shadow-xl mb-6 border-2 border-gray-100">
          <p className="text-black text-center italic mb-2">
            {t('challenge.peace')}
          </p>
          <div className="text-xs text-center text-gray-700 mt-3">
            {t('challenge.questionsAwaiting')}
          </div>
          <div className="text-xs text-center text-gray-500 italic mt-2">
            "{t('challenge.starsQuote')}"
          </div>
        </div>
      </div>

      <div>
        <div className="text-center mb-2 text-lg font-bold text-black">
          {t('cards.chooseCard')}
        </div>
        <div className="text-center mb-4 text-xs text-gray-700">
          {t('messages.cardHelp')}
        </div>
        <div className="grid grid-cols-3 gap-3">
          {cards.map((card, index) => (
            <button
              key={card.id}
              onClick={() => handleSelectCard(card)}
              className="relative bg-white border-2 border-gray-200 rounded-3xl p-4 overflow-hidden
                       transform transition-all duration-500 hover:scale-110 hover:rotate-2
                       hover:shadow-2xl active:scale-95 group animate-bounce-in"
              style={{
                animationDelay: `${index * 200}ms`,
                boxShadow: '0 20px 40px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.6)',
                background: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)'
              }}
            >
              {/* Effet de brillance animé */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-700">
                <div className={`absolute inset-0 bg-gradient-to-r ${card.color} animate-pulse`}></div>
              </div>
              
              {/* Particules flottantes */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute top-2 right-3 w-1 h-1 bg-white rounded-full animate-ping" style={{animationDelay: '0ms'}}></div>
                <div className="absolute top-4 left-2 w-0.5 h-0.5 bg-white rounded-full animate-ping" style={{animationDelay: '200ms'}}></div>
                <div className="absolute bottom-3 right-2 w-1 h-1 bg-white rounded-full animate-ping" style={{animationDelay: '400ms'}}></div>
              </div>
              
              {/* Contenu principal */}
              <div className="relative z-10">
                <div className="text-4xl mb-2 transform group-hover:scale-125 transition-transform duration-300 filter group-hover:drop-shadow-lg">
                  {card.icon}
                </div>
                <div className="text-xs font-black text-black mb-1 tracking-wider">{card.name}</div>
                <div className={`text-[10px] font-bold mt-1 bg-gradient-to-r ${card.color} bg-clip-text text-transparent`}>
                  {card.knowledge}
                </div>
              </div>
              
              {/* Bordure animée au hover */}
              <div className={`absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-gradient-to-r ${card.color} opacity-0 group-hover:opacity-50 transition-opacity duration-300`}></div>
              
              {/* Ombre colorée */}
              <div className={`absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-75 transition-opacity duration-500 blur-xl ${card.glow} -z-10`}></div>
            </button>
          ))}
        </div>
        <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl border-2 border-blue-100 shadow-lg">
          <p className="text-xs text-center text-black font-bold mb-2">
            {t('cards.cardEffects')}
          </p>
          <div className="space-y-1 text-[10px] text-center">
            <div className="flex items-center justify-center gap-1">
              <span className="text-yellow-600">✨ {t('cards.faith')}:</span>
              <span className="text-gray-700">{t('cards.faithEffect')}</span>
            </div>
            <div className="flex items-center justify-center gap-1">
              <span className="text-red-600">⚔️ {t('cards.courage')}:</span>
              <span className="text-gray-700">{t('cards.courageEffect')}</span>
            </div>
            <div className="flex items-center justify-center gap-1">
              <span className="text-blue-600">📜 {t('cards.wisdom')}:</span>
              <span className="text-gray-700">{t('cards.wisdomEffect')}</span>
            </div>
          </div>
          <div className="text-xs text-center text-gray-500 italic mt-2 border-t border-blue-200 pt-2">
            "{t('cards.chooseWisely')}"
          </div>
        </div>
        
        <button 
          onClick={() => {
            audio?.sounds?.wrash();
            setCurrentScreen('levelSelect');
          }}
          className="mt-6 w-full py-3 bg-white text-black rounded-full font-semibold shadow-lg border-2 border-gray-200 hover:scale-105 active:scale-95 transition-all"
        >
          {t('buttons.back')}
        </button>
      </div>
    </div>
  );
};

export default ChallengeScreen;