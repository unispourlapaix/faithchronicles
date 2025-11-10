import React, { useState } from 'react';
import { User, Mail, Play, Globe } from 'lucide-react';
import useTranslation from '../../hooks/useTranslation';
import { getLanguage, getLanguageList } from '../../data/translations/languages.js';

const LoginScreen = ({ onLogin, onAnonymous, importSessionFromProduction, audio }) => {
  const { t, currentLanguage, changeLanguage } = useTranslation();
  const [mode, setMode] = useState(null); // null, 'anonymous', 'email'
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  const suggestedPseudos = [
    'CHRONICLES', 'faith', 'UNITY', 'Hope', 'Grace', 'Light', 
    'Peace', 'Truth', 'Love', 'Wisdom', 'Spirit', 'Blessed'
  ];

  const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

  const handleImportSession = async () => {
    if (!importSessionFromProduction) return;
    setLoading(true);
    setMessage('');
    try {
      const result = await importSessionFromProduction();
      if (result.error) {
        setMessage('❌ ' + result.error.message);
      } else if (result.session) {
        setMessage('✅ Session importée avec succès ! Rechargement...');
        setTimeout(() => window.location.reload(), 1500);
      } else {
        setMessage('⚠️ Aucune session trouvée sur la production');
      }
    } catch (err) {
      setMessage('❌ Erreur: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAnonymousPlay = async () => {
    if (!pseudo.trim()) {
      setMessage(t('login.enterPseudo'));
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      await onAnonymous(pseudo.trim());
    } catch (error) {
      setMessage(t('login.errorConnection'));
      setLoading(false);
    }
  };

  const handleEmailLogin = async () => {
    if (!email.trim() || !email.includes('@')) {
      setMessage(t('login.enterEmail'));
      return;
    }

    console.log('📧 Début envoi email pour:', email.trim());
    setLoading(true);
    setMessage('');

    try {
      console.log('📤 Appel de onLogin...');
      const result = await onLogin(email.trim());
      console.log('📥 Résultat onLogin:', result);
      
      // Vérifier si c'est une erreur de rate limiting (15 secondes)
      if (result?.isRateLimited) {
        console.warn('⏳ Rate limited - attendre 15 secondes');
        setMessage(t('login.rateLimited'));
      } else if (result?.error) {
        console.error('❌ Erreur lors de l\'envoi:', result.error);
        setMessage(t('login.errorSend'));
      } else {
        console.log('✅ Email envoyé avec succès');
        setMessage(t('login.checkEmail'));
      }
    } catch (error) {
      console.error('❌ Exception attrapée:', error);
      setMessage(t('login.errorConnection'));
    } finally {
      console.log('🔄 Finally: Remise à zéro du loading');
      setLoading(false);
    }
  };

  // Écran de choix initial
  if (!mode) {
    return (
      <div className="h-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex flex-col items-center justify-center p-6">
        {/* Sélecteur de langue en haut à droite */}
        <div className="absolute top-4 right-4 z-50">
          <button
            onClick={() => {
              audio?.sounds?.buttonClick();
              setShowLanguageSelector(!showLanguageSelector);
            }}
            className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-xl flex items-center space-x-2 hover:bg-white/30 transition-colors shadow-lg"
          >
            <Globe size={20} />
            <span className="text-2xl">{getLanguage(currentLanguage)?.flag || currentLanguage.toUpperCase()}</span>
          </button>

          {showLanguageSelector && (
            <>
              {/* Overlay pour fermer au clic extérieur */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowLanguageSelector(false)}
              />
              
              {/* Menu des langues */}
              <div className="absolute right-0 mt-2 bg-white rounded-2xl shadow-2xl p-4 z-50 w-80">
                <div className="grid grid-cols-4 gap-2">
                  {getLanguageList().map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        audio?.sounds?.buttonClick();
                        changeLanguage(lang.code);
                        setShowLanguageSelector(false);
                      }}
                      className={`p-3 rounded-xl transition-all ${
                        currentLanguage === lang.code
                          ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg scale-105'
                          : 'bg-gray-100 hover:bg-gray-200 active:scale-95'
                      }`}
                      title={lang.nativeName}
                    >
                      <div className="text-2xl mb-1">{lang.flag}</div>
                      <div className={`text-xs font-semibold ${
                        currentLanguage === lang.code ? 'text-white' : 'text-gray-600'
                      }`}>
                        {lang.code.toUpperCase()}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-3">
            {t('login.title')}
          </h1>
          <p className="text-indigo-100 text-lg">
            {t('login.subtitle')}
          </p>
        </div>

        <div className="w-full max-w-sm space-y-4">
          {/* Bouton Jouer en Anonyme */}
          <button
            onClick={() => {
              audio?.sounds?.buttonClick(); // Son clic bouton
              setMode('anonymous');
            }}
            className="w-full bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-xl hover:shadow-2xl active:scale-95 transition-all duration-200 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <User className="text-white" size={24} />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-bold text-gray-800">
                    {t('login.anonymousMode')}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {t('login.anonymousDesc')}
                  </p>
                </div>
              </div>
              <Play className="text-indigo-600 group-hover:translate-x-1 transition-transform" size={20} />
            </div>
          </button>

          {/* Bouton Connexion Email */}
          <button
            onClick={() => {
              audio?.sounds?.buttonClick(); // Son clic bouton
              setMode('email');
            }}
            className="w-full bg-white/95 backdrop-blur-xl rounded-2xl p-6 shadow-xl hover:shadow-2xl active:scale-95 transition-all duration-200 group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                  <Mail className="text-white" size={24} />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-bold text-gray-800">
                    {t('login.emailMode')}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {t('login.emailDesc')}
                  </p>
                </div>
              </div>
              <Play className="text-blue-600 group-hover:translate-x-1 transition-transform" size={20} />
            </div>
          </button>
        </div>

        <div className="mt-8 text-center">
          <p className="text-white/80 text-sm">
            📖 {t('app.tagline')}
          </p>
        </div>
      </div>
    );
  }

  // Écran mode anonyme
  if (mode === 'anonymous') {
    return (
      <div className="h-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <button
            onClick={() => {
              audio?.sounds?.wrash(); // Son de retour
              setMode(null);
            }}
            className="mb-6 text-white/90 hover:text-white flex items-center space-x-2"
          >
            <span>←</span>
            <span>{t('login.back')}</span>
          </button>

          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="text-white" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {t('login.anonymousMode')}
              </h2>
              <p className="text-gray-600 text-sm">
                {t('login.anonymousDesc')}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('login.pseudo')}
                </label>
                <input
                  type="text"
                  value={pseudo}
                  onChange={(e) => setPseudo(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAnonymousPlay()}
                  placeholder={t('login.pseudoPlaceholder')}
                  maxLength={20}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors"
                  disabled={loading}
                  autoFocus
                />
                
                {/* Suggestions de pseudos */}
                <div className="mt-3">
                  <p className="text-xs font-semibold text-gray-600 mb-2">Suggestions :</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedPseudos.map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => {
                          audio?.sounds?.buttonClick?.();
                          setPseudo(suggestion);
                        }}
                        className="px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-xs font-medium rounded-lg hover:from-indigo-200 hover:to-purple-200 active:scale-95 transition-all"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {message && (
                <div className="text-sm text-red-600 bg-red-50 rounded-lg p-3">
                  {message}
                </div>
              )}

              <button
                onClick={() => {
                  audio?.sounds?.gameStart(); // Son de début de jeu
                  handleAnonymousPlay();
                }}
                disabled={loading || !pseudo.trim()}
                className="w-full py-4 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? t('login.connecting') : t('login.startPlaying')}
              </button>

              <p className="text-xs text-gray-500 text-center">
                {t('login.localSave')}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Écran mode email
  if (mode === 'email') {
    return (
      <div className="h-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <button
            onClick={() => {
              audio?.sounds?.wrash(); // Son de retour
              setMode(null);
            }}
            className="mb-6 text-white/90 hover:text-white flex items-center space-x-2"
          >
            <span>←</span>
            <span>{t('login.back')}</span>
          </button>

          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="text-white" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {t('login.emailMode')}
              </h2>
              <p className="text-gray-600 text-sm">
                {t('login.magicLink')}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('login.email')}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleEmailLogin()}
                  placeholder={t('login.emailPlaceholder')}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                  disabled={loading}
                  autoFocus
                />
              </div>

              {message && (
                <div className={`text-sm rounded-lg p-3 ${
                  message === t('login.checkEmail')
                    ? 'text-green-700 bg-green-50 border border-green-200'
                    : message === t('login.rateLimited')
                    ? 'text-amber-700 bg-amber-50 border border-amber-200'
                    : 'text-red-600 bg-red-50 border border-red-200'
                }`}>
                  {message}
                  {message === t('login.checkEmail') && (
                    <div className="mt-2 text-xs text-green-600">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span>{t('login.waitingConnection')}</span>
                      </div>
                      <div className="mt-1">
                        {t('login.checkSpam')}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <button
                onClick={() => {
                  audio?.sounds?.buttonClick(); // Son envoi email
                  handleEmailLogin();
                }}
                disabled={loading || !email.trim()}
                className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? t('login.sending') : t('login.sendLink')}
              </button>

              {isLocalhost && importSessionFromProduction && (
                <button
                  onClick={() => {
                    audio?.sounds?.buttonClick();
                    handleImportSession();
                  }}
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold shadow-md hover:shadow-lg active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t('login.importSession')}
                </button>
              )}

              <p className="text-xs text-gray-500 text-center">
                {t('login.cloudSync')}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default LoginScreen;
