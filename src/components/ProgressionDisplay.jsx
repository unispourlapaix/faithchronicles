import React from 'react';
import { getProgressionFromXP, formatProgression, getNextRank } from '../data/progressionSystem';
import { useTranslation } from '../hooks/useTranslation.js';

const ProgressionDisplay = ({ totalXP = 0, compact = false }) => {
  const progression = getProgressionFromXP(totalXP);
  const current = formatProgression(progression.level, progression.grade);
  const next = getNextRank(progression.level, progression.grade);
  const { t } = useTranslation();

  // Vérification de sécurité pour éviter les erreurs React
  if (!current || !current.levelNameKey || !current.gradeRoman) {
    // console.error(t('errors.invalidProgressionData'), { current, progression });
    return <div>{t('errors.progressionError')}</div>;
  }

  // Traduction du nom du rang
  const levelName = t(`ranks.${current.levelNameKey}`) || current.levelNameKey;
  const nextLevelName = next ? (t(`ranks.${next.levelNameKey}`) || next.levelNameKey) : null;

  if (compact) {
    return (
      <div className="flex items-center space-x-2 bg-gradient-to-r from-gray-800 to-gray-900 rounded-full px-3 py-1.5">
        <span className="text-lg">{current.icon}</span>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-white leading-tight">
            {levelName}
          </span>
          <span className="text-xs text-gray-300 leading-tight">
            Grade {current.gradeRoman}
          </span>
        </div>
        <div className="ml-2 bg-gray-700 rounded-full h-2 w-16 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-500"
            style={{
              width: `${progression.progressPercent}%`,
              background: `linear-gradient(90deg, ${current.color}, ${next?.color || current.color})`
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl p-6 shadow-xl border border-gray-400">
      {/* En-tête avec niveau actuel */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
            style={{ background: `linear-gradient(135deg, ${current.color}, ${next?.color || current.color})` }}
          >
            {current.icon}
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">
              {levelName}
            </h3>
            <p className="text-sm text-gray-400">
              {t('spiritualJourney.grade')} {current.gradeRoman}
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-xs text-gray-500 uppercase tracking-wider">
            {t('spiritualJourney.level')} {progression.level}/8
          </p>
          <p className="text-lg font-bold text-white">
            {totalXP.toLocaleString()} XP
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-400 mb-4 italic">
        "{t(`ranks.${current.descriptionKey}`)}"
      </p>

      {/* Barre de progression */}
      {!progression.isMaxLevel && next && (
        <>
          <div className="relative mb-2">
            <div className="bg-gray-700 rounded-full h-4 overflow-hidden">
              <div
                className="h-full transition-all duration-500 ease-out relative"
                style={{
                  width: `${progression.progressPercent}%`,
                  background: `linear-gradient(90deg, ${current.color}, ${next.color})`
                }}
              >
                {/* Effet de brillance */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer" />
              </div>
            </div>

            {/* Marqueur de progression */}
            <div
              className="absolute top-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 border-white shadow-lg transition-all duration-500"
              style={{
                left: `${progression.progressPercent}%`,
                marginLeft: '-12px',
                background: current.color
              }}
            >
              <div className="w-full h-full rounded-full animate-ping opacity-75"
                   style={{ background: current.color }} />
            </div>
          </div>

          {/* Info progression */}
          <div className="flex justify-between items-center text-xs text-gray-400">
            <span>{progression.currentXP.toLocaleString()} XP</span>
            <span className="text-gray-500">
              {next ? 
                `${progression.xpToNextGrade.toLocaleString()} XP pour ${nextLevelName} ${next.gradeRoman}` :
                'Niveau maximum atteint !'
              }
            </span>
          </div>

          {/* Prochain grade */}
          {next && (
            <div className="mt-4 p-3 bg-gray-800 rounded-lg border border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-xl">{next.icon}</span>
                  <div>
                    <p className="text-xs text-gray-500">{t('spiritualJourney.nextGrade')}</p>
                    <p className="text-sm font-bold text-white">
                      {nextLevelName} {next.gradeRoman}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">{t('spiritualJourney.still')}</p>
                  <p className="text-sm font-bold" style={{ color: next.color }}>
                    {(progression.xpToNextGrade - progression.currentXP).toLocaleString()} XP
                  </p>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Niveau maximum atteint */}
      {progression.isMaxLevel && (
        <div className="mt-4 p-4 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg text-center">
          <p className="text-lg font-bold text-white flex items-center justify-center space-x-2">
            <span>👑</span>
            <span>{t('spiritualJourney.maxLevelReached')}</span>
            <span>👑</span>
          </p>
          <p className="text-sm text-yellow-100 mt-1">
            {t('spiritualJourney.masteredAllTeachings')}
          </p>
        </div>
      )}

      {/* Statistiques rapides */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        <div className="bg-gray-800 rounded-lg p-2 text-center">
          <p className="text-xs text-gray-500">{t('spiritualJourney.level')}</p>
          <p className="text-lg font-bold text-white">{progression.level}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-2 text-center">
          <p className="text-xs text-gray-500">{t('spiritualJourney.grade')}</p>
          <p className="text-lg font-bold text-white">{current.gradeRoman}</p>
        </div>
        <div className="bg-gray-800 rounded-lg p-2 text-center">
          <p className="text-xs text-gray-500">{t('spiritualJourney.progression')}</p>
          <p className="text-lg font-bold text-white">{progression.progressPercent}%</p>
        </div>
      </div>

      {/* Styles pour l'animation de brillance */}
      <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default ProgressionDisplay;
