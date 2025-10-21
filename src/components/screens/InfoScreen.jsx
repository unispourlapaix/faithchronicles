import React from 'react';
import { ArrowLeft, Heart, Star, BookOpen, Users, Award } from 'lucide-react';

const InfoScreen = ({ setCurrentScreen }) => {
  return (
    <div className="relative z-10 p-6 h-full flex flex-col bg-gradient-to-b from-blue-50 to-white">
      {/* Header avec bouton retour */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => setCurrentScreen('menu')}
          className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-semibold">Retour</span>
        </button>
      </div>

      {/* Contenu scrollable */}
      <div className="flex-1 overflow-y-auto space-y-6">
        {/* Titre principal */}
        <div className="text-center">
          <h1 className="text-3xl font-black text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text mb-2">
            Faith Chronicles
          </h1>
          <p className="text-gray-600">Découverte interactive des Écritures</p>
        </div>

        {/* Section Créateur */}
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-blue-100">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Créé avec ❤️</h2>
            <p className="text-lg font-semibold text-purple-600">Emmanuel Payet</p>
            <p className="text-sm text-gray-500 mt-2">Développeur passionné de spiritualité</p>
          </div>
        </div>

        {/* Fonctionnalités */}
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-green-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            Fonctionnalités
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl">
              <BookOpen className="w-5 h-5 text-blue-500" />
              <div>
                <div className="font-semibold text-gray-800">92 niveaux captivants</div>
                <div className="text-sm text-gray-600">8 chapitres + niveau bonus</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-xl">
              <Award className="w-5 h-5 text-yellow-500" />
              <div>
                <div className="font-semibold text-gray-800">273 étoiles à découvrir</div>
                <div className="text-sm text-gray-600">3 étoiles par niveau</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl">
              <Users className="w-5 h-5 text-purple-500" />
              <div>
                <div className="font-semibold text-gray-800">Apprentissage interactif</div>
                <div className="text-sm text-gray-600">Questions, cartes de sagesse</div>
              </div>
            </div>
          </div>
        </div>

        {/* Architecture technique et philosophique */}
        <div className="bg-white rounded-3xl p-6 shadow-xl border border-purple-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">🔧 Architecture technique</h3>
          <div className="grid grid-cols-2 gap-3 text-sm mb-4">
            <div className="p-3 bg-blue-50 rounded-xl text-center">
              <div className="font-semibold text-blue-700">React</div>
              <div className="text-blue-600">Interface moderne</div>
            </div>
            <div className="p-3 bg-green-50 rounded-xl text-center">
              <div className="font-semibold text-green-700">Modules</div>
              <div className="text-green-600">Chargement dynamique</div>
            </div>
            <div className="p-3 bg-yellow-50 rounded-xl text-center">
              <div className="font-semibold text-yellow-700">LocalStorage</div>
              <div className="text-yellow-600">Sauvegarde locale</div>
            </div>
            <div className="p-3 bg-purple-50 rounded-xl text-center">
              <div className="font-semibold text-purple-700">Tailwind</div>
              <div className="text-purple-600">Design responsive</div>
            </div>
          </div>
          
          {/* Dimension philosophique */}
          <div className="border-t border-gray-100 pt-4">
            <h4 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
              <span>🤔</span> Dimension philosophique
            </h4>
            <div className="p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border border-orange-200">
              <p className="text-xs text-orange-800 font-medium mb-1">
                "L'amour comme principe ontologique"
              </p>
              <p className="text-xs text-gray-600">
                Jésus transforme l'amour en fondement métaphysique : aimer Dieu et autrui devient 
                la structure même de l'être authentique. L'amour transcende la morale pour devenir 
                mode d'existence.
              </p>
            </div>
          </div>
        </div>

        {/* Message spirituel sur l'amour */}
        <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-3xl p-6 shadow-xl border border-red-200">
          <div className="text-center">
            <div className="text-2xl mb-3">❤️</div>
            <h4 className="text-lg font-bold text-red-800 mb-3">Le Nouveau Commandement</h4>
            <p className="text-red-800 font-semibold italic mb-2">
              "Quand Jésus donne un nouveau commandement, il accentue le verbe aimer"
            </p>
            <div className="text-red-700 text-sm space-y-1">
              <p>🙏 Aime Dieu de tout ton cœur</p>
              <p>🤝 Aime les autres comme toi-même</p>
              <p className="font-semibold">L'amour devient une priorité</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 pb-4">
          <p>Version 1.0 • 2024</p>
          <p>Développé pour la gloire de Dieu</p>
        </div>
      </div>
    </div>
  );
};

export default InfoScreen;