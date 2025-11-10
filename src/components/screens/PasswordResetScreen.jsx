import React, { useState, useEffect } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import useTranslation from '../../hooks/useTranslation';

const PasswordResetScreen = ({ onResetComplete }) => {
  const { t } = useTranslation();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success', 'error', 'info'
  const [isValidSession, setIsValidSession] = useState(false);

  useEffect(() => {
    // Vérifier si on a un token de réinitialisation valide
    const checkSession = async () => {
      // Vérifier d'abord si on a une erreur dans l'URL
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const error = hashParams.get('error');
      const errorDescription = hashParams.get('error_description');
      
      if (error) {
        setIsValidSession(false);
        if (errorDescription?.includes('expired')) {
          setMessage(t('login.resetLinkExpired') || '❌ Ce lien de réinitialisation a expiré. Veuillez en demander un nouveau.');
        } else {
          setMessage(t('login.resetLinkExpired') || '❌ Lien de réinitialisation invalide');
        }
        setMessageType('error');
        console.log('❌ Erreur URL:', error, errorDescription);
        return;
      }

      // Sinon, vérifier la session
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsValidSession(true);
        console.log('✅ Session de réinitialisation valide');
      } else {
        setIsValidSession(false);
        setMessage(t('login.resetLinkExpired') || '❌ Ce lien de réinitialisation a expiré. Veuillez en demander un nouveau.');
        setMessageType('error');
        console.log('❌ Pas de session de réinitialisation');
      }
    };
    
    checkSession();
  }, [t]);

  const handleUpdatePassword = async () => {
    if (!newPassword.trim() || newPassword.length < 6) {
      setMessage(t('login.passwordTooShort') || 'Le mot de passe doit contenir au moins 6 caractères');
      setMessageType('error');
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage(t('login.passwordsDontMatch') || 'Les mots de passe ne correspondent pas');
      setMessageType('error');
      return;
    }

    console.log('🔐 Mise à jour du mot de passe...');
    setLoading(true);
    setMessage('');
    setMessageType('');

    try {
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        console.error('❌ Erreur mise à jour mot de passe:', error);
        setMessage(t('login.errorUpdatePassword') || 'Erreur lors de la mise à jour du mot de passe');
        setMessageType('error');
      } else {
        console.log('✅ Mot de passe mis à jour avec succès');
        setMessage(t('login.passwordUpdateSuccess') || '✅ Mot de passe mis à jour avec succès !');
        setMessageType('success');
        
        // Rediriger vers l'écran de connexion après 2 secondes
        setTimeout(() => {
          if (onResetComplete) {
            onResetComplete();
          }
        }, 2000);
      }
    } catch (error) {
      console.error('❌ Exception:', error);
      setMessage(t('login.errorUpdatePassword') || 'Erreur lors de la mise à jour du mot de passe');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  if (!isValidSession && message) {
    return (
      <div className="h-full bg-gradient-to-br from-red-600 via-orange-600 to-pink-500 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="text-white" size={32} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {t('login.resetLinkExpired') || '⏰ Lien Expiré'}
              </h2>
              <p className="text-gray-600 mb-4">
                Ce lien de réinitialisation a expiré ou est invalide.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 text-left">
                <p className="text-sm text-gray-700">
                  <strong>💡 Solution :</strong>
                  <br />
                  1. Retournez à l'écran de connexion
                  <br />
                  2. Cliquez sur "Mot de passe oublié ?"
                  <br />
                  3. Demandez un nouveau lien
                  <br />
                  4. Utilisez-le dans les 15 minutes
                </p>
              </div>
              <button
                onClick={() => onResetComplete && onResetComplete()}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl active:scale-95 transition-all"
              >
                {t('login.backToSignin') || '← Retour à la connexion'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="text-white" size={32} />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              {t('login.newPassword') || 'Nouveau mot de passe'}
            </h2>
            <p className="text-gray-600">
              {t('login.enterNewPassword') || 'Choisissez un nouveau mot de passe sécurisé'}
            </p>
          </div>

          <div className="space-y-6">
            {/* Nouveau mot de passe */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Lock size={16} className="inline mr-1" />
                {t('login.newPassword') || 'Nouveau mot de passe'}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder={t('login.passwordPlaceholder') || 'Minimum 6 caractères'}
                  className="w-full px-4 py-3 pr-12 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
                  disabled={loading}
                  minLength={6}
                  autoFocus
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
            </div>

            {/* Confirmer mot de passe */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Lock size={16} className="inline mr-1" />
                {t('login.confirmPassword') || 'Confirmer le mot de passe'}
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleUpdatePassword()}
                placeholder={t('login.passwordPlaceholder') || 'Minimum 6 caractères'}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
                disabled={loading}
                minLength={6}
              />
              <p className="text-xs text-gray-500 mt-1">
                {t('login.passwordMinLength') || 'Minimum 6 caractères'}
              </p>
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

            {/* Bouton */}
            <button
              onClick={handleUpdatePassword}
              disabled={loading || !newPassword.trim() || !confirmPassword.trim()}
              className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading 
                ? '⏳ Mise à jour...' 
                : (t('login.updatePassword') || 'Mettre à jour le mot de passe')
              }
            </button>

            {/* Lien retour */}
            <button
              onClick={() => onResetComplete && onResetComplete()}
              className="w-full text-center text-sm text-gray-600 hover:text-gray-800 font-semibold"
              disabled={loading}
            >
              ← {t('login.backToSignin') || 'Retour à la connexion'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetScreen;
