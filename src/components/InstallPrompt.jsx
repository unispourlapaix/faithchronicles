import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';
import useTranslation from '../hooks/useTranslation';

const InstallPrompt = () => {
  const { t } = useTranslation();
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Vérifier si déjà installé
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
      setIsInstalled(true);
      return;
    }

    // Vérifier si l'utilisateur a déjà refusé l'installation
    const installDismissed = localStorage.getItem('faithChronicles_installDismissed');
    if (installDismissed === 'true') {
      return;
    }

    // Écouter l'événement beforeinstallprompt
    const handleBeforeInstallPrompt = (e) => {
      // console.log('📱 PWA installable détecté');
      e.preventDefault();
      setDeferredPrompt(e);
      
      // Afficher le prompt après 5 secondes
      setTimeout(() => {
        setShowPrompt(true);
      }, 5000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Écouter l'installation réussie
    window.addEventListener('appinstalled', () => {
      // console.log('✅ PWA installée avec succès');
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Afficher le prompt d'installation natif
    deferredPrompt.prompt();

    // Attendre la réponse de l'utilisateur
    const { outcome } = await deferredPrompt.userChoice;
    // console.log(`📱 Choix utilisateur: ${outcome}`);

    if (outcome === 'accepted') {
      // console.log('✅ Installation acceptée');
    } else {
      // console.log('❌ Installation refusée');
    }

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('faithChronicles_installDismissed', 'true');
  };

  const handleDismissTemporary = () => {
    setShowPrompt(false);
    // Ne pas sauvegarder dans localStorage pour permettre de réafficher plus tard
  };

  if (isInstalled || !showPrompt || !deferredPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-50 animate-slide-up">
      <div className="bg-white rounded-2xl shadow-2xl border-2 border-purple-200 overflow-hidden">
        {/* Header avec gradient */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 text-white relative">
          <button
            onClick={handleDismissTemporary}
            className="absolute top-2 right-2 p-1 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Fermer temporairement"
          >
            <X size={20} />
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Download size={24} />
            </div>
            <div>
              <h3 className="font-bold text-lg">
                {t('install.title')}
              </h3>
              <p className="text-sm text-purple-100">
                {t('install.subtitle')}
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-4 space-y-4">
          <div className="text-sm text-gray-600 space-y-2">
            <p className="flex items-start space-x-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>{t('install.feature1')}</span>
            </p>
            <p className="flex items-start space-x-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>{t('install.feature2')}</span>
            </p>
            <p className="flex items-start space-x-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>{t('install.feature3')}</span>
            </p>
            <p className="flex items-start space-x-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>{t('install.feature4')}</span>
            </p>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={handleInstallClick}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-bold shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200"
            >
              {t('install.install')}
            </button>
            <button
              onClick={handleDismiss}
              className="px-4 py-3 bg-gray-100 text-gray-600 rounded-xl font-semibold hover:bg-gray-200 active:scale-95 transition-all duration-200"
            >
              {t('install.dismiss')}
            </button>
          </div>

          <p className="text-xs text-gray-400 text-center">
            {t('install.info')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InstallPrompt;
