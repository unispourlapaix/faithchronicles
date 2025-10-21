import React from 'react';
import { ChevronRight, Star, Trophy, Sparkles, Info, Gem, HelpCircle } from 'lucide-react';
import { bibleData } from '../../data/bible/bibleData.js';

const MenuScreen = ({ 
  wisdomPoints, unlockedLevels, levelStars, score, revelationPoints,
  setCurrentScreen, setShowModal, setModalContent, setCurrentLevel
}) => {
  
  const calculatePlayerRank = () => {
    if (wisdomPoints >= 12000) return "Saint";
    if (wisdomPoints >= 8000) return "Prophète";
    if (wisdomPoints >= 5000) return "Sage";
    if (wisdomPoints >= 3000) return "Fidèle";
    if (wisdomPoints >= 1500) return "Croyant";
    if (wisdomPoints >= 500) return "Disciple";
    return "Chercheur";
  };

  const getTotalStars = () => {
    return Object.values(levelStars).reduce((total, stars) => total + stars, 0);
  };

  const hasLastThreeStars = () => {
    const totalStars = getTotalStars();
    return totalStars >= 271; // Les 3 dernières étoiles (271, 272, 273)
  };

  const openModal = (title, content) => {
    setModalContent({title, content});
    setShowModal(true);
  };

  const getNextLevelToPlay = () => {
    // Trouver le niveau le plus élevé débloqué
    const maxUnlocked = Math.max(...unlockedLevels);
    return maxUnlocked;
  };

  const getBibleTreasure = () => {
    return bibleData.getRandomTreasure();
  };

  const getSillyQuestion = () => {
    const questions = [
      "Pourquoi Dieu a-t-il créé les moustiques ? 🦟",
      "Est-ce que Noé a pris des poissons dans l'arche ? 🐠",
      "Adam avait-il un nombril ? 🤔",
      "Les anges ont-ils des ailes ou c'est Hollywood ? 👼",
      "Pourquoi le fruit défendu n'était pas un légume ? 🍎"
    ];
    return questions[Math.floor(Math.random() * questions.length)];
  };

  const resetProgress = () => {
    localStorage.removeItem('faithChroniclesProgress');
    window.location.reload();
  };

  return (
    <>
      {/* Arrière-plan décoratif */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/30 rounded-full transform rotate-45 blur-2xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/30 rounded-full transform rotate-12 blur-2xl"></div>
        <div className="absolute top-1/2 right-0 w-48 h-48 bg-blue-100/20 rounded-full blur-xl"></div>
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-100/20 rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10 p-8 h-full flex flex-col justify-between">
        <div className="text-center mt-2">
          {/* Logo avec croix moderne */}
          <div className="mb-2">
            <div className="w-32 h-32 mx-auto rounded-full shadow-2xl flex items-center justify-center relative"
                 style={{background: 'linear-gradient(145deg, #ffffff 0%, #f3f4f6 100%)'}}>
              <div className="absolute inset-0 rounded-full"
                   style={{background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.1) 0%, transparent 70%)'}}></div>
              <div className="relative w-16 h-16 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center"
                     style={{transform: 'translate(2px, 2px)', opacity: 0.2}}>
                  <div className="w-12 h-2 bg-gray-400 rounded-full absolute"></div>
                  <div className="h-12 w-2 bg-gray-400 rounded-full absolute"></div>
                </div>
                <div className="relative flex items-center justify-center">
                  <div className="w-12 h-2 rounded-full absolute"
                       style={{
                         background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                         boxShadow: '0 2px 8px rgba(139, 92, 246, 0.5)'
                       }}></div>
                  <div className="h-12 w-2 rounded-full absolute"
                       style={{
                         background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
                         boxShadow: '0 2px 8px rgba(139, 92, 246, 0.5)'
                       }}></div>
                </div>
                <div className="absolute w-3 h-3 bg-white rounded-full"
                     style={{
                       boxShadow: '0 0 12px rgba(255, 255, 255, 0.8)',
                       background: 'radial-gradient(circle at 30% 30%, #ffffff, #e0e7ff)'
                     }}></div>
              </div>
              <div className="absolute inset-0">
                <div className="absolute top-6 right-10 w-1 h-1 bg-purple-400 rounded-full opacity-60 animate-pulse"></div>
                <div className="absolute bottom-8 left-8 w-1.5 h-1.5 bg-blue-400 rounded-full opacity-60 animate-pulse" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-12 left-12 w-1 h-1 bg-indigo-400 rounded-full opacity-60 animate-pulse" style={{animationDelay: '2s'}}></div>
              </div>
            </div>
          </div>
          
          {/* Titre avec effet 3D */}
          <div className="mb-4">
            <h1 className="text-5xl font-black mb-3 tracking-wider relative"
                style={{
                  color: '#ffaa55',
                  background: 'linear-gradient(135deg, #ffcc77 0%, #ff9944 50%, #ff8833 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textShadow: 'none',
                  transform: 'perspective(600px) rotateX(25deg)',
                  transformStyle: 'preserve-3d',
                  display: 'inline-block'
                }}>
              <span style={{
                position: 'absolute',
                top: 0,
                left: 0,
                color: '#ffcc77',
                zIndex: -1,
                transform: 'translateZ(-10px) translateY(2px)',
                opacity: 0.7
              }}>FAITH</span>
              <span style={{
                position: 'absolute',
                top: 0,
                left: 0,
                color: '#ffaa55',
                zIndex: -2,
                transform: 'translateZ(-20px) translateY(4px)',
                opacity: 0.5
              }}>FAITH</span>
              FAITH
            </h1>
            
            <h2 className="text-2xl font-medium tracking-[0.5em] relative"
                style={{
                  fontFamily: 'Trebuchet MS, sans-serif',
                  color: '#6b7280',
                  textShadow: `
                    -1px -1px 1px rgba(255,255,255,0.9),
                    1px 1px 2px rgba(0,0,0,0.5),
                    2px 2px 3px rgba(0,0,0,0.3)
                  `,
                  transform: 'perspective(400px) rotateX(10deg) scaleY(0.95)',
                  transformOrigin: 'center',
                  display: 'inline-block',
                  marginTop: '-8px',
                  letterSpacing: '0.5em'
                }}>
              CHRONICLES
            </h2>
          </div>
          
          <div className="text-xs text-gray-600 mb-8">
            <div className="relative">
              La Connaissance des Écritures<br/>
              <span className="italic text-green-600 font-medium bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                "Étudier les Écritures, c'est marcher vers la lumière divine"
              </span>
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-20 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent opacity-70"></div>
            </div>
          </div>
          
          {/* Bloc-note avec progression */}
          <div className="mb-8 p-4 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl shadow-xl border-2 border-amber-200 relative">
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 flex gap-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-2 h-4 bg-gray-400 rounded-full"></div>
              ))}
            </div>
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="border-b border-blue-200 opacity-20" style={{marginTop: `${i * 28}px`}}></div>
              ))}
            </div>
            <div className="relative z-10">
              <div className="text-sm text-blue-800">Rang Spirituel :</div>
              <div className="text-xl font-bold text-blue-900 mb-1">{calculatePlayerRank()}</div>
              <div className="text-sm text-blue-800">{wisdomPoints} Points de Sagesse</div>
              <div className="text-xs text-blue-700 mt-1">
                {unlockedLevels.length} niveau(x) débloqué(s)
              </div>
              <div className="text-xs text-blue-600 italic mt-3 pt-2 border-t border-blue-200/50">
                "La connaissance vraie mène à la sagesse éternelle"
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <button 
            onClick={() => {
              const levelToPlay = getNextLevelToPlay();
              setCurrentLevel(levelToPlay);
              setCurrentScreen('challenge');
            }}
            className="w-full py-4 bg-white text-black border-2 border-gray-200 rounded-full font-bold text-lg shadow-xl transform transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 relative overflow-hidden group"
            style={{
              boxShadow: '0 10px 30px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.9)',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
            }}
          >
            {/* Effet de brillance au hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
            
            <span className="relative z-10">JOUER</span>
            <ChevronRight className="w-5 h-5 relative z-10 transform group-hover:translate-x-1 transition-transform" />
          </button>
          
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-gradient-to-br from-white to-yellow-50 rounded-2xl shadow-lg p-3 border border-yellow-100 transform hover:scale-105 transition-all duration-200 hover:shadow-xl">
              <Trophy className="w-6 h-6 mx-auto text-yellow-500 mb-1 drop-shadow-sm" />
              <div className="text-xs text-yellow-700 font-medium">Score</div>
              <div className="font-bold text-yellow-800 text-sm">{score}</div>
            </div>
            <div className="bg-gradient-to-br from-white to-purple-50 rounded-2xl shadow-lg p-3 border border-purple-100 transform hover:scale-105 transition-all duration-200 hover:shadow-xl">
              <Star className="w-6 h-6 mx-auto text-purple-500 mb-1 drop-shadow-sm" />
              <div className="text-xs text-purple-700 font-medium">Étoiles</div>
              <div className="font-bold text-purple-800 text-sm">{getTotalStars()}/273</div>
            </div>
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg p-3 border border-blue-100 transform hover:scale-105 transition-all duration-200 hover:shadow-xl">
              <Sparkles className="w-6 h-6 mx-auto text-blue-500 mb-1 drop-shadow-sm" />
              <div className="text-xs text-blue-700 font-medium">Révélation</div>
              <div className="font-bold text-blue-800 text-sm">{revelationPoints}</div>
            </div>
          </div>
          
          {/* Menu du bas - Version améliorée */}
          <div className="mt-3 flex justify-around px-2">
            <button 
              onClick={() => setCurrentScreen('info')}
              className="flex flex-col items-center p-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95 border border-white/40 group"
              style={{minWidth: '85px'}}
            >
              <Info className="w-5 h-5 text-blue-500 mb-1 drop-shadow-sm group-hover:text-blue-600 transition-colors" />
              <span className="text-[10px] text-gray-700 font-medium group-hover:text-gray-800 transition-colors">Info</span>
            </button>
            
            <button 
              onClick={() => {
                const treasure = getBibleTreasure();
                openModal("💎 Les Trésors de la Bible",
                  <div className="space-y-3">
                    <div className="p-3 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl">
                      <div className="text-xs font-bold text-amber-700 mb-2">✨ Verset du jour</div>
                      <div className="text-sm text-gray-700 italic">{treasure.verse}</div>
                    </div>
                    <div className="p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl">
                      <div className="text-xs font-bold text-blue-700 mb-2">🌟 Le saviez-vous ?</div>
                      <div className="text-sm text-gray-700">{treasure.fact}</div>
                    </div>
                    <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                      <div className="text-xs font-bold text-purple-700 mb-2">📜 Trésor caché</div>
                      <div className="text-sm text-gray-700">{treasure.treasure}</div>
                    </div>
                    <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                      <div className="text-xs font-bold text-green-700 mb-2">🤔 Question rigolote</div>
                      <div className="text-sm text-gray-700">{treasure.question}</div>
                    </div>
                    {hasLastThreeStars() && (
                      <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                        <div className="text-xs font-bold text-amber-700 mb-2">📝 Mémo d'Emmanuel</div>
                        <div className="text-sm text-gray-700 leading-relaxed">
                          Vous êtes arrivés en haut de la montagne, et la connaissance est acquise.<br/>
                          Mais la foi inébranlable demande de l'expérience de vie, de la miséricorde et du véritable amour de Jésus.<br/><br/>
                          
                          Les diverses épreuves de la vie testeront votre voie, le vrai chemin que l'on choisit, notre cœur.<br/>
                          Nous restons imparfaits, nos désirs sont nombreux, et l'amour du gain ou de notre confort personnel devient trop souvent notre priorité égoïste.<br/><br/>
                          
                          Demandez à Dieu la sagesse, son amour, sa force, et reconnaissez vos faiblesses humblement, car on ne peut rien Lui cacher… Rien.<br/>
                          Inutile de voyager en mode privé, en VPN, ou même d'effacer l'historique.<br/><br/>
                          
                          Jeûnez comme Daniel : privez-vous un moment de ce que vous aimez le plus, dans le calme et la sagesse. Cela vous permettra de mieux entendre Dieu, d'avoir une disposition de cœur prête aux transformations profondes — et souvent douloureuses.<br/>
                          Alors, les rêves et les songes deviendront plus clairs, comme pour Joseph.<br/><br/>
                          
                          Mais gardez-vous de l'orgueil : ne cédez pas au « j'ai toujours raison » ou au « je connais mieux ». Car la révélation de Dieu est une grâce extraordinaire.<br/>
                          Ne devenez pas un docteur de la Loi, capable de crucifier encore Jésus aujourd'hui, Lui qui demande simplement d'aimer votre prochain… et de lui accorder la même liberté que vous-même recevez.<br/><br/>
                          
                          Avoir la foi, c'est entrer dans une relation et un cheminement libre du cœur.<br/>
                          Elle fera de vous des héros puissants, capables de l'impossible.<br/>
                          Car l'expérience du surnaturel, la présence de Dieu, sa confirmation ou sa bénédiction vous rendra vraiment inébranlables.
                        </div>
                      </div>
                    )}
                    <div className="p-3 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-200">
                      <div className="text-xs font-bold text-red-700 mb-2">❌ Clarification importante</div>
                      <div className="text-sm text-gray-700 mb-1">{treasure.jesusIsNot}</div>
                      <div className="text-xs text-gray-600 italic">{treasure.jesusIsNotContext}</div>
                    </div>
                    <div className="p-3 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-200">
                      <div className="text-xs font-bold text-indigo-700 mb-2">📖 Lire la Bible Offline</div>
                      <div className="text-sm text-gray-700 font-semibold mb-1">{treasure.bibleResource.name}</div>
                      <div className="text-xs text-gray-600 mb-2">{treasure.bibleResource.description}</div>
                      <div className="text-xs text-indigo-600 mb-2">
                        Fonctionnalités : {treasure.bibleResource.features.join(", ")}
                      </div>
                      <button
                        onClick={() => {
                          setShowModal(false);
                          setCurrentScreen('bibleReader');
                        }}
                        className="w-full py-2 bg-indigo-500 text-white rounded-full text-xs font-bold shadow-md hover:shadow-lg active:scale-95 transition-all"
                      >
                        📖 Ouvrir le lecteur
                      </button>
                    </div>
                    <div className="p-2 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border">
                      <div className="text-xs font-bold text-gray-600 mb-1">📖 Étude biblique</div>
                      <div className="text-xs text-gray-600 font-mono mb-1">{treasure.strongGreek}</div>
                      <div className="text-xs text-gray-500 italic">Version : {treasure.version}</div>
                    </div>
                  </div>
                );
              }}
              className="flex flex-col items-center p-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95 border border-white/40 group"
              style={{minWidth: '85px'}}
            >
              <Gem className="w-5 h-5 text-purple-500 mb-1 drop-shadow-sm group-hover:text-purple-600 transition-colors" />
              <span className="text-[10px] text-gray-700 font-medium text-center group-hover:text-gray-800 transition-colors">Trésors</span>
            </button>
            
            <button 
              onClick={() => {
                if (wisdomPoints > 0) {
                  openModal("🔄 Recommencer l'aventure ?",
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-6xl mb-4">⚠️</div>
                        <p className="text-sm text-gray-700 mb-4">
                          Es-tu sûr de vouloir effacer toute ta progression ?
                        </p>
                        <div className="p-3 bg-red-50 rounded-xl">
                          <div className="text-xs text-red-700">
                            Tu perdras :<br/>
                            • {wisdomPoints} Points de Sagesse<br/>
                            • {getTotalStars()} étoiles collectées<br/>
                            • {unlockedLevels.length} niveaux débloqués
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <button 
                          onClick={resetProgress}
                          className="w-full py-3 bg-red-500 text-white rounded-full font-bold shadow-lg active:scale-95 transition-all"
                        >
                          Oui, recommencer
                        </button>
                        <button 
                          onClick={() => setShowModal(false)}
                          className="w-full py-3 bg-gray-200 text-gray-700 rounded-full font-semibold"
                        >
                          Non, continuer
                        </button>
                      </div>
                    </div>
                  );
                } else {
                  openModal("🎮 Nouvelle Aventure",
                    <div className="text-center space-y-4">
                      <div className="text-5xl mb-4">🌟</div>
                      <div className="text-lg font-bold text-blue-700">Prêt à commencer ?</div>
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-xl border border-blue-200">
                        <div className="text-sm text-gray-600">
                          "Commence ton voyage dans la connaissance des Écritures !"
                        </div>
                      </div>
                    </div>
                  );
                }
              }}
              className="flex flex-col items-center p-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-lg transition-all hover:scale-105 active:scale-95 border border-white/40 group"
              style={{minWidth: '85px'}}
            >
              <div className="w-5 h-5 text-orange-500 mb-1 drop-shadow-sm group-hover:text-orange-600 transition-colors text-center">🔄</div>
              <span className="text-[10px] text-gray-700 font-medium text-center group-hover:text-gray-800 transition-colors">Reset</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuScreen;