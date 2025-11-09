import React from 'react';
import { ArrowLeft, Heart, Star, BookOpen, Users, Award } from 'lucide-react';
import ProgressionDisplay from '../ProgressionDisplay';
import useTranslation from '../../hooks/useTranslation';

const InfoScreen = ({ setCurrentScreen, score, wisdomPoints, revelationPoints, totalXP = 0, audio }) => {
  const { t, currentLanguage } = useTranslation();
  
  return (
    <div className="relative z-10 p-6 h-full flex flex-col bg-gradient-to-b from-blue-50 to-white">
      {/* Header avec bouton retour */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => {
            audio?.sounds?.wrash(); // Son de retour
            setCurrentScreen('menu');
          }}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-semibold">{t('buttons.back')}</span>
        </button>
      </div>

      {/* Contenu scrollable */}
      <div className="flex-1 overflow-y-auto space-y-6">
        {/* Titre principal */}
        <div className="text-center">
          <h1 className="text-3xl font-black text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text mb-2">
            {t('info.title')}
          </h1>
          <p className="text-gray-600">{t('info.subtitle')}</p>
        </div>

        {/* Statistiques de progression */}
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-indigo-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-500" />
            {t('info.yourStats')}
          </h3>

          {/* Scores rapides */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-3 text-center border border-yellow-200">
              <div className="text-2xl font-black text-yellow-700">{score || 0}</div>
              <div className="text-xs text-yellow-600 font-semibold">{t('info.score')}</div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 text-center border border-blue-200">
              <div className="text-2xl font-black text-blue-700">{wisdomPoints || 0}</div>
              <div className="text-xs text-blue-600 font-semibold">{t('info.wisdom')}</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-3 text-center border border-purple-200">
              <div className="text-2xl font-black text-purple-700">{revelationPoints || 0}</div>
              <div className="text-xs text-purple-600 font-semibold">{t('info.revelation')}</div>
            </div>
          </div>

          {/* Affichage de la progression XP */}
          <ProgressionDisplay totalXP={totalXP} />
        </div>

        {/* Section Créateur */}
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-blue-100">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">{t('info.createdWith')}</h2>
            <p className="text-lg font-semibold text-purple-600">{t('info.creator')}</p>
            <p className="text-sm text-gray-500 mt-2">{t('info.developerPassionate')}</p>
            
            {/* Lien vers le module artiste */}
            <div className="mt-4">
              <a
                href={`/emmanuel-artist-module.html?lang=${currentLanguage}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  audio?.sounds?.starEarned(); // Son spécial pour lien externe
                }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-full hover:from-purple-600 hover:to-blue-600 transition-all duration-300 hover:scale-105 shadow-lg text-sm font-semibold hover:shadow-xl active:scale-95"
              >
                <span className="animate-pulse">🎨</span>
                <span>{t('info.artistModule')}</span>
                <span className="text-xs">↗️</span>
              </a>
              <p className="text-xs text-gray-400 mt-2">
                <span className="inline-block mr-1">🌟</span>
                {t('info.artistPortfolio')}
              </p>
            </div>
          </div>
        </div>

        {/* Fonctionnalités */}
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-green-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            {t('info.features')}
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
              <BookOpen className="w-5 h-5 text-blue-500" />
              <div>
                <div className="font-semibold text-gray-800">{t('info.multipleChapters')}</div>
                <div className="text-sm text-gray-600">{t('levels.chaptersAndBonus')}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-xl">
              <Award className="w-5 h-5 text-yellow-500" />
              <div>
                <div className="font-semibold text-gray-800">{t('levels.starsToDiscover').replace('{stars}', t('labels.stars').toLowerCase())}</div>
                <div className="text-sm text-gray-600">{t('levels.starsPerLevel').replace('{stars}', t('labels.stars').toLowerCase())}</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
              <Users className="w-5 h-5 text-purple-500" />
              <div>
                <div className="font-semibold text-gray-800">{t('info.progressionSystem')}</div>
                <div className="text-sm text-gray-600">{t('info.powerCards')}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Architecture technique et philosophique */}
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-purple-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">{t('architecture.title')}</h3>
          <div className="grid grid-cols-2 gap-3 text-sm mb-4">
            <div className="p-3 bg-blue-50 rounded-xl text-center">
              <div className="font-semibold text-blue-700">{t('architecture.react.name')}</div>
              <div className="text-blue-600">{t('architecture.react.description')}</div>
            </div>
            <div className="p-3 bg-green-50 rounded-xl text-center">
              <div className="font-semibold text-green-700">{t('architecture.modules.name')}</div>
              <div className="text-green-600">{t('architecture.modules.description')}</div>
            </div>
            <div className="p-3 bg-yellow-50 rounded-xl text-center">
              <div className="font-semibold text-yellow-700">{t('architecture.localStorage.name')}</div>
              <div className="text-yellow-600">{t('architecture.localStorage.description')}</div>
            </div>
            <div className="p-3 bg-purple-50 rounded-xl text-center">
              <div className="font-semibold text-purple-700">{t('architecture.tailwind.name')}</div>
              <div className="text-purple-600">{t('architecture.tailwind.description')}</div>
            </div>
          </div>
          
          {/* Dimension philosophique */}
          <div className="border-t border-gray-100 pt-4">
            <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
              <span>🤔</span> {t('philosophy.title')}
            </h4>
            <div className="p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200">
              <p className="text-xs text-orange-800 font-medium mb-1">
                "{t('philosophy.loveOntology')}"
              </p>
              <p className="text-xs text-gray-600">
                {t('philosophy.loveDescription')}
              </p>
            </div>
          </div>
        </div>

        {/* Message spirituel sur l'amour */}
        <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-3xl p-6 shadow-xl border border-red-200">
          <div className="text-center">
            <div className="text-2xl mb-3">❤️</div>
            <h4 className="text-lg font-bold text-red-800 mb-3">{t('philosophy.newCommandment')}</h4>
            <p className="text-red-800 font-semibold italic mb-2">
              "{t('philosophy.jesusEmphasizes')}"
            </p>
            <div className="text-red-700 text-sm space-y-1">
              <p>🙏 {t('philosophy.loveGod')}</p>
              <p>🤝 {t('philosophy.loveNeighbor')}</p>
              <p className="font-semibold">{t('philosophy.lovePriority')}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 pb-4">
          <p>{t('footer.version')}</p>
          <p>{t('footer.dedication')}</p>
        </div>
      </div>
    </div>
  );
};

export default InfoScreen;