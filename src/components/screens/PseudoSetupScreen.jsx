import React, { useState } from 'react';
import { User, Save } from 'lucide-react';
import { useTranslation } from '../../hooks/useTranslation.js';

const PseudoSetupScreen = ({ onPseudoSet, userEmail, audio }) => {
  const [pseudo, setPseudo] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { t } = useTranslation();

  const suggestedPseudos = [
    'CHRONICLES', 'faith', 'UNITY', 'Hope', 'Grace', 'Light', 
    'Peace', 'Truth', 'Love', 'Wisdom', 'Spirit', 'Blessed'
  ];

  const handleSetPseudo = async () => {
    if (!pseudo.trim()) {
      setMessage(t('validation.enterPseudo'));
      return;
    }

    if (pseudo.trim().length < 2) {
      setMessage(t('validation.pseudoTooShort'));
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      await onPseudoSet(pseudo.trim());
      audio?.sounds?.starEarned?.(); // Son de succès
    } catch (error) {
      setMessage(t('pseudoSetup.errorConfig'));
      setLoading(false);
    }
  };

  return (
    <div className="h-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="text-white" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {t('pseudoSetup.profileConfig')}
            </h2>
            <p className="text-gray-600 text-sm mb-1">
              {t('pseudoSetup.connectedWith')} : {userEmail}
            </p>
            <p className="text-gray-500 text-xs">
              {t('pseudoSetup.title')}
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t('pseudoSetup.playerPseudo')}
              </label>
              <input
                type="text"
                value={pseudo}
                onChange={(e) => setPseudo(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSetPseudo()}
                placeholder={t('pseudoSetup.pseudoPlaceholder')}
                maxLength={20}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors"
                disabled={loading}
                autoFocus
              />
              <p className="text-xs text-gray-500 mt-1">
                {t('pseudoSetup.pseudoRequirements')}
              </p>
              
              {/* Suggestions de pseudos */}
              <div className="mt-3">
                <p className="text-xs font-semibold text-gray-600 mb-2">{t('pseudoSetup.suggestions')} :</p>
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
              <div className="text-sm text-red-600 bg-red-50 rounded-lg p-3 border border-red-200">
                {message}
              </div>
            )}

            <button
              onClick={() => {
                audio?.sounds?.buttonClick?.(); // Son clic bouton
                handleSetPseudo();
              }}
              disabled={loading || !pseudo.trim()}
              className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Configuration...</span>
                </>
              ) : (
                <>
                  <Save size={20} />
                  <span>{t('pseudoSetup.confirm')}</span>
                </>
              )}
            </button>

            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-start space-x-3">
                <div className="text-blue-500 mt-0.5">ℹ️</div>
                <div className="text-sm text-blue-700">
                  <p className="font-semibold mb-1">Votre pseudo servira à :</p>
                  <ul className="list-disc list-inside space-y-0.5 text-xs">
                    <li>Apparaître dans les classements</li>
                    <li>Identifier vos scores et progression</li>
                    <li>Personnaliser votre expérience</li>
                  </ul>
                  <p className="mt-2 text-xs font-medium">
                    Vous pourrez le modifier plus tard dans les paramètres.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PseudoSetupScreen;