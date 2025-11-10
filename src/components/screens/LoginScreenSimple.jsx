import React, { useState } from 'react';
import { Globe, Eye, EyeOff, Mail, Lock } from 'lucide-react';
import useTranslation from '../../hooks/useTranslation';
import { getLanguage, getLanguageList } from '../../data/translations/languages.js';

const LoginScreen = ({ onLoginWithPassword, onSignup, audio }) => {
  const { t, currentLanguage, changeLanguage } = useTranslation();
  const [authMode, setAuthMode] = useState('signin'); // 'signin' ou 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success', 'error', 'info'
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // Connexion / Inscription avec mot de passe
  const handlePasswordLogin = async () => {
    if (!email.trim() || !email.includes('@')) {
      setMessage(t('login.enterEmail'));
      setMessageType('error');
      return;
    }

    if (!password.trim() || password.length < 6) {
      setMessage(t('login.passwordTooShort') || 'Le mot de passe doit contenir au moins 6 caractères');
      setMessageType('error');
      return;
    }

    console.log('🔐 Connexion avec mot de passe pour:', email.trim());
    setLoading(true);
    setMessage('');
    setMessageType('');

    try {
      if (authMode === 'signup') {
        // Inscription
        console.log('📝 Inscription...');
        const result = await onSignup(email.trim(), password);
        
        if (result?.error) {
          console.error('❌ Erreur inscription:', result.error);
          if (result.error.message.includes('already registered')) {
            // L'email existe déjà - suggérer de se connecter
            setMessage(t('login.emailExistsHint') || '✉️ Cet email est déjà enregistré. Essayez de vous connecter ! (Peut-être créé depuis un autre jeu?)');
            setMessageType('info');
            // Basculer automatiquement en mode connexion après 3 secondes
            setTimeout(() => {
              setAuthMode('signin');
              setMessage(t('login.switchToSignin') || '🔑 Passez en mode Connexion avec votre email existant');
              setMessageType('info');
            }, 3000);
          } else {
            setMessage(t('login.errorSignup') || 'Erreur lors de l\'inscription');
            setMessageType('error');
          }
        } else {
          console.log('✅ Inscription réussie - En attente de confirmation email');
          setMessage('📧 Compte créé ! Vérifiez votre email pour confirmer votre inscription.');
          setMessageType('success');
        }
      } else {
        // Connexion
        console.log('🔑 Connexion...');
        const result = await onLoginWithPassword(email.trim(), password);
        
        if (result?.error) {
          console.error('❌ Erreur connexion:', result.error);
          if (result.error.message.includes('Invalid login credentials')) {
            setMessage(t('login.invalidCredentials') || 'Email ou mot de passe incorrect');
            setMessageType('error');
          } else if (result.error.message.includes('Email not confirmed')) {
            setMessage('📧 Veuillez confirmer votre email avant de vous connecter');
            setMessageType('info');
          } else {
            setMessage(t('login.errorConnection'));
            setMessageType('error');
          }
        } else {
          console.log('✅ Connexion réussie');
          setMessage(t('login.connectionSuccess') || '✅ Connexion réussie !');
          setMessageType('success');
        }
      }
    } catch (error) {
      console.error('❌ Exception:', error);
      setMessage(t('login.errorConnection'));
      setMessageType('error');
    } finally {
      console.log('🏁 Fin handlePasswordLogin');
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(!showForgotPassword);
    if (!showForgotPassword) {
      setMessage('💡 Astuce : Utilisez le bouton 👁️ pour voir votre mot de passe en le tapant !');
      setMessageType('info');
    } else {
      setMessage('');
      setMessageType('');
    }
  };

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

      <div className="w-full max-w-md">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="text-white" size={32} />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {t('login.title')}
            </h2>
            <p className="text-gray-600">
              {t('login.subtitle')}
            </p>
          </div>

          <div className="space-y-6">
            {/* Toggle Connexion / Inscription */}
            <div className="bg-gray-100 p-1 rounded-xl flex">
              <button
                onClick={() => {
                  audio?.sounds?.buttonClick();
                  setAuthMode('signin');
                  setMessage('');
                  setMessageType('');
                }}
                className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
                  authMode === 'signin'
                    ? 'bg-white text-green-600 shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {t('login.signin') || 'Connexion'}
              </button>
              <button
                onClick={() => {
                  audio?.sounds?.buttonClick();
                  setAuthMode('signup');
                  setMessage('');
                  setMessageType('');
                }}
                className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
                  authMode === 'signup'
                    ? 'bg-white text-green-600 shadow-md'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {t('login.signup') || 'Inscription'}
              </button>
            </div>

            {/* Info confirmation email (seulement en mode inscription) */}
            {authMode === 'signup' && (
              <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-lg">
                <div className="flex items-start">
                  <span className="text-blue-500 mr-2">📧</span>
                  <div className="text-sm text-blue-700">
                    <p className="font-semibold mb-1">
                      {t('login.emailConfirmationRequired') || 'Vérifiez votre boîte mail pour activer votre compte'}
                    </p>
                    <p className="text-xs text-blue-600">
                      {t('login.checkSpamFolder') || 'Pensez à vérifier vos spams/courrier indésirable'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Mail size={16} className="inline mr-1" />
                {t('login.email')}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('login.emailPlaceholder')}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
                disabled={loading}
                autoFocus
              />
            </div>

            {/* Mot de passe */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Lock size={16} className="inline mr-1" />
                {t('login.password') || 'Mot de passe'}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handlePasswordLogin()}
                  placeholder={t('login.passwordPlaceholder') || 'Minimum 6 caractères'}
                  className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
                  disabled={loading}
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <div className="flex items-center justify-between mt-1">
                <p className="text-xs text-gray-500">
                  {t('login.passwordMinLength') || 'Minimum 6 caractères'}
                </p>
                {authMode === 'signin' && (
                  <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-xs text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    {t('login.forgotPassword') || 'Mot de passe oublié?'}
                  </button>
                )}
              </div>
            </div>

            {/* Message */}
            {message && (
              <div className={`text-sm rounded-lg p-3 border ${
                messageType === 'success'
                  ? 'text-green-700 bg-green-50 border-green-200'
                  : messageType === 'info'
                  ? 'text-blue-700 bg-blue-50 border-blue-200'
                  : 'text-red-600 bg-red-50 border-red-200'
              }`}>
                {message}
              </div>
            )}

            {/* Bouton principal */}
            <button
              onClick={() => {
                audio?.sounds?.buttonClick();
                handlePasswordLogin();
              }}
              disabled={loading || !email.trim() || !password.trim()}
              className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading 
                ? '⏳ Chargement...' 
                : authMode === 'signup' 
                ? (t('login.signupButton') || 'Créer mon compte') 
                : (t('login.signinButton') || 'Se connecter')
              }
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              📖 {t('app.tagline')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
