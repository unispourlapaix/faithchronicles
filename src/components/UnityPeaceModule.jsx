import React, { useState } from 'react';
import './UnityPeaceModule.css';
import useTranslation from '../hooks/useTranslation';

/**
 * MODULE ÉDUCATIF : L'UNITÉ QUI PRODUIT LA PAIX
 * Par Emmanuel
 * 
 * "Chaque religion a ses raisons et nos frontières sont liées au passé.
 * Comprendre et respecter les autres est aujourd'hui un processus d'humilité.
 * Rompre avec l'esprit communautariste, ce terrot de la haine du mal déguisé.
 * Pour être libres, il faut savoir rendre libres les autres aussi.
 * Veiller à nos partages, veiller à nos mots contraires néfastes envers les autres,
 * des maux qui nous disqualifient nous-mêmes."
 */

const UnityPeaceModule = ({ totalXP, setTotalXP, audio }) => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState('intro');
  const [selectedReligion, setSelectedReligion] = useState(null);
  const [readCards, setReadCards] = useState(new Set());
  const [showXpGain, setShowXpGain] = useState(false);
  const [xpAmount, setXpAmount] = useState(0);

  // Marquer une carte comme lue et donner l'XP bonus amour
  const markCardAsRead = (cardId, xpValue = 5) => {
    if (readCards.has(cardId)) return;
    
    setReadCards(prev => new Set([...prev, cardId]));
    
    if (setTotalXP) {
      setTotalXP(prev => prev + xpValue);
      setXpAmount(xpValue);
      setShowXpGain(true);
      
      if (audio?.sounds?.starEarned) {
        audio.sounds.starEarned();
      }
      
      setTimeout(() => setShowXpGain(false), 2000);
    }
  };

  // Les religions et leurs fondements communs
  const religions = {
    christianisme: {
      nom: t('unity.religions.christianity.name'),
      couleur: "#4A90E2",
      symbole: "✝️",
      fondements: {
        dieu: t('unity.religions.christianity.godText'),
        bien: t('unity.religions.christianity.goodText'),
        mal: t('unity.religions.christianity.evilText'),
        anges: t('unity.religions.christianity.angelsText'),
        unite: t('unity.religions.christianity.unityText')
      },
      valeursCles: t('unity.religions.christianity.values').split(',')
    },
    islam: {
      nom: t('unity.religions.islam.name'),
      couleur: "#27AE60",
      symbole: "☪️",
      fondements: {
        dieu: t('unity.religions.islam.godText'),
        bien: t('unity.religions.islam.goodText'),
        mal: t('unity.religions.islam.evilText'),
        anges: t('unity.religions.islam.angelsText'),
        unite: t('unity.religions.islam.unityText')
      },
      valeursCles: t('unity.religions.islam.values').split(',')
    },
    judaisme: {
      nom: t('unity.religions.judaism.name'),
      couleur: "#3498DB",
      symbole: "✡️",
      fondements: {
        dieu: t('unity.religions.judaism.godText'),
        bien: t('unity.religions.judaism.goodText'),
        mal: t('unity.religions.judaism.evilText'),
        anges: t('unity.religions.judaism.angelsText'),
        unite: t('unity.religions.judaism.unityText')
      },
      valeursCles: t('unity.religions.judaism.values').split(',')
    },
    hindouisme: {
      nom: t('unity.religions.hinduism.name'),
      couleur: "#E67E22",
      symbole: "🕉️",
      fondements: {
        dieu: t('unity.religions.hinduism.godText'),
        bien: t('unity.religions.hinduism.goodText'),
        mal: t('unity.religions.hinduism.evilText'),
        anges: t('unity.religions.hinduism.angelsText'),
        unite: t('unity.religions.hinduism.unityText')
      },
      valeursCles: t('unity.religions.hinduism.values').split(',')
    },
    bouddhisme: {
      nom: t('unity.religions.buddhism.name'),
      couleur: "#9B59B6",
      symbole: "☸️",
      fondements: {
        dieu: t('unity.religions.buddhism.godText'),
        bien: t('unity.religions.buddhism.goodText'),
        mal: t('unity.religions.buddhism.evilText'),
        anges: t('unity.religions.buddhism.angelsText'),
        unite: t('unity.religions.buddhism.unityText')
      },
      valeursCles: t('unity.religions.buddhism.values').split(',')
    }
  };

  // Les bases communes : ce qui unit l'humanité
  const valeursUniverselles = [
    {
      titre: t('unity.common.goodTitle'),
      description: t('unity.common.goodDescription'),
      exemples: t('unity.common.goodExamples').split('|')
    },
    {
      titre: t('unity.common.evilTitle'),
      description: t('unity.common.evilDescription'),
      exemples: t('unity.common.evilExamples').split('|')
    },
    {
      titre: t('unity.common.angelsTitle'),
      description: t('unity.common.angelsDescription'),
      exemples: t('unity.common.angelsExamples').split('|')
    },
    {
      titre: t('unity.common.godTitle'),
      description: t('unity.common.godDescription'),
      exemples: t('unity.common.godExamples').split('|')
    },
    {
      titre: t('unity.common.relationTitle'),
      description: t('unity.common.relationDescription'),
      exemples: t('unity.common.relationExamples').split('|')
    },
    {
      titre: t('unity.common.inclusionTitle'),
      description: t('unity.common.inclusionDescription'),
      exemples: t('unity.common.inclusionExamples').split('|')
    }
  ];

  // Le processus d'humilité : le chemin vers la paix
  const processusHumilite = [
    {
      etape: 1,
      titre: t('unity.humility.step1Title'),
      description: t('unity.humility.step1Description'),
      action: t('unity.humility.step1Action')
    },
    {
      etape: 2,
      titre: t('unity.humility.step2Title'),
      description: t('unity.humility.step2Description'),
      action: t('unity.humility.step2Action')
    },
    {
      etape: 3,
      titre: t('unity.humility.step3Title'),
      description: t('unity.humility.step3Description'),
      action: t('unity.humility.step3Action')
    },
    {
      etape: 4,
      titre: t('unity.humility.step4Title'),
      description: t('unity.humility.step4Description'),
      action: t('unity.humility.step4Action')
    },
    {
      etape: 5,
      titre: t('unity.humility.step5Title'),
      description: t('unity.humility.step5Description'),
      action: t('unity.humility.step5Action')
    },
    {
      etape: 6,
      titre: t('unity.humility.step6Title'),
      description: t('unity.humility.step6Description'),
      action: t('unity.humility.step6Action')
    },
    {
      etape: 7,
      titre: t('unity.humility.step7Title'),
      description: t('unity.humility.step7Description'),
      action: t('unity.humility.step7Action')
    }
  ];

  return (
    <div className="unity-peace-module">
      {/* Animation XP gagnés */}
      {showXpGain && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-bounce">
          <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white px-4 py-3 rounded-full shadow-2xl flex items-center gap-2">
            <span className="text-3xl">❤️</span>
            <span className="font-bold text-xl">+{xpAmount}</span>
          </div>
        </div>
      )}

      {/* En-tête */}
      <header className="module-header">
        <h1>🕊️ {t('unity.title')}</h1>
        <p className="subtitle">
          {t('unity.author')} - "{t('unity.subtitle')}"
        </p>
      </header>

      {/* Navigation */}
      <nav className="module-nav">
        <button 
          className={activeSection === 'intro' ? 'active' : ''}
          onClick={() => setActiveSection('intro')}
        >
          {t('unity.nav.intro')}
        </button>
        <button 
          className={activeSection === 'religions' ? 'active' : ''}
          onClick={() => setActiveSection('religions')}
        >
          {t('unity.nav.religions')}
        </button>
        <button 
          className={activeSection === 'commun' ? 'active' : ''}
          onClick={() => setActiveSection('commun')}
        >
          {t('unity.nav.common')}
        </button>
        <button 
          className={activeSection === 'humilite' ? 'active' : ''}
          onClick={() => setActiveSection('humilite')}
        >
          {t('unity.nav.humility')}
        </button>
      </nav>

      {/* Contenu principal */}
      <main className="module-content">
        
        {/* SECTION INTRODUCTION */}
        {activeSection === 'intro' && (
          <section className="intro-section">
            <h2>{t('unity.intro.emmanuelSays')}</h2>
            
            <div className="intro-card" style={{position: 'relative'}}>
              <h3>🌍 {t('unity.intro.ourBordersFromPast')}</h3>
              <p>
                {t('unity.intro.bordersDescription')}
                <br /><br />
                <strong>{t('unity.intro.divisionWork')}</strong>
                <br />
                {t('unity.intro.sharedHumanity')}
              </p>
              {setTotalXP && (
                <button
                  onClick={() => markCardAsRead('intro-1')}
                  disabled={readCards.has('intro-1')}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-md hover:shadow-lg active:scale-95"
                  style={{
                    background: readCards.has('intro-1') ? '#10b981' : 'linear-gradient(135deg, #ec4899, #ef4444)',
                    opacity: readCards.has('intro-1') ? 0.6 : 1,
                    cursor: readCards.has('intro-1') ? 'default' : 'pointer'
                  }}
                  title={readCards.has('intro-1') ? '✓' : '+5 XP'}
                >
                  <span className="text-lg">{readCards.has('intro-1') ? '✓' : '❤️'}</span>
                </button>
              )}
            </div>

            <div className="intro-card success" style={{position: 'relative'}}>
              <h3>✨ {t('unity.intro.revelationTitle')}</h3>
              <p>
                <strong>{t('unity.intro.surprisedLearning')}</strong>
                <br />
                {t('unity.intro.angelMichael')}
                {' '}
                {t('unity.intro.jesusNames')}
                <br />
                <em>{t('unity.intro.diverseTribes')}</em>
                <br />
                {t('unity.intro.sameRealities')}
              </p>
              {setTotalXP && (
                <button
                  onClick={() => markCardAsRead('intro-2')}
                  disabled={readCards.has('intro-2')}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-md hover:shadow-lg active:scale-95"
                  style={{
                    background: readCards.has('intro-2') ? '#10b981' : 'linear-gradient(135deg, #ec4899, #ef4444)',
                    opacity: readCards.has('intro-2') ? 0.6 : 1,
                    cursor: readCards.has('intro-2') ? 'default' : 'pointer'
                  }}
                  title={readCards.has('intro-2') ? '✓' : '+5 XP'}
                >
                  <span className="text-lg">{readCards.has('intro-2') ? '✓' : '❤️'}</span>
                </button>
              )}
            </div>

            <div className="intro-card" style={{position: 'relative'}}>
              <h3>🙏 {t('unity.intro.respectTitle')}</h3>
              <p>
                {t('unity.intro.respectFoundation')}
                <br />
                {t('unity.intro.understandingProcess')}
              </p>
              {setTotalXP && (
                <button
                  onClick={() => markCardAsRead('intro-3')}
                  disabled={readCards.has('intro-3')}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-md hover:shadow-lg active:scale-95"
                  style={{
                    background: readCards.has('intro-3') ? '#10b981' : 'linear-gradient(135deg, #ec4899, #ef4444)',
                    opacity: readCards.has('intro-3') ? 0.6 : 1,
                    cursor: readCards.has('intro-3') ? 'default' : 'pointer'
                  }}
                  title={readCards.has('intro-3') ? '✓' : '+5 XP'}
                >
                  <span className="text-lg">{readCards.has('intro-3') ? '✓' : '❤️'}</span>
                </button>
              )}
            </div>

            <div className="intro-card success" style={{position: 'relative'}}>
              <h3>❤️ {t('unity.intro.whatBindsUs')}</h3>
              <p>
                <strong>{t('unity.intro.seekingRelation')}</strong>
                <br />
                {t('unity.intro.loveOfGod')}
                <br />
                {t('unity.intro.universalLink')}
              </p>
              {setTotalXP && (
                <button
                  onClick={() => markCardAsRead('intro-4')}
                  disabled={readCards.has('intro-4')}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-md hover:shadow-lg active:scale-95"
                  style={{
                    background: readCards.has('intro-4') ? '#10b981' : 'linear-gradient(135deg, #ec4899, #ef4444)',
                    opacity: readCards.has('intro-4') ? 0.6 : 1,
                    cursor: readCards.has('intro-4') ? 'default' : 'pointer'
                  }}
                  title={readCards.has('intro-4') ? '✓' : '+5 XP'}
                >
                  <span className="text-lg">{readCards.has('intro-4') ? '✓' : '❤️'}</span>
                </button>
              )}
            </div>

            <div className="intro-card success" style={{position: 'relative'}}>
              <h3>🌈 {t('unity.intro.inclusionTitle')}</h3>
              <p>
                <strong>{t('unity.intro.vastInclusion')}</strong>
                <br />
                {t('unity.intro.respectDifferences')}
                <br /><br />
                <em>{t('unity.intro.jesusCommand')}</em>
              </p>
              {setTotalXP && (
                <button
                  onClick={() => markCardAsRead('intro-5')}
                  disabled={readCards.has('intro-5')}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-md hover:shadow-lg active:scale-95"
                  style={{
                    background: readCards.has('intro-5') ? '#10b981' : 'linear-gradient(135deg, #ec4899, #ef4444)',
                    opacity: readCards.has('intro-5') ? 0.6 : 1,
                    cursor: readCards.has('intro-5') ? 'default' : 'pointer'
                  }}
                  title={readCards.has('intro-5') ? '✓' : '+5 XP'}
                >
                  <span className="text-lg">{readCards.has('intro-5') ? '✓' : '❤️'}</span>
                </button>
              )}
            </div>

            <div className="intro-card danger" style={{position: 'relative'}}>
              <h3>⚠️ {t('unity.intro.communitySpirit')}</h3>
              <p>
                {t('unity.intro.communityTerror')}
                <br /><br />
                <strong>{t('unity.intro.pridePolitics')}</strong>
                <br />
                {t('unity.intro.prideQuotes')}
                <br /><br />
                <em>{t('unity.intro.watchHeart')}</em>
                <br />
                {t('unity.intro.refuseDivision')}
              </p>
              {setTotalXP && (
                <button
                  onClick={() => markCardAsRead('intro-6')}
                  disabled={readCards.has('intro-6')}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-md hover:shadow-lg active:scale-95"
                  style={{
                    background: readCards.has('intro-6') ? '#10b981' : 'linear-gradient(135deg, #ec4899, #ef4444)',
                    opacity: readCards.has('intro-6') ? 0.6 : 1,
                    cursor: readCards.has('intro-6') ? 'default' : 'pointer'
                  }}
                  title={readCards.has('intro-6') ? '✓' : '+5 XP'}
                >
                  <span className="text-lg">{readCards.has('intro-6') ? '✓' : '❤️'}</span>
                </button>
              )}
            </div>

            <div className="intro-card success" style={{position: 'relative'}}>
              <h3>🔓 {t('unity.intro.freedomTitle')}</h3>
              <p>
                <strong>{t('unity.intro.freedomOthers')}</strong>
                <br />
                {t('unity.intro.defendFreedom')}
              </p>
              {setTotalXP && (
                <button
                  onClick={() => markCardAsRead('intro-7')}
                  disabled={readCards.has('intro-7')}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-md hover:shadow-lg active:scale-95"
                  style={{
                    background: readCards.has('intro-7') ? '#10b981' : 'linear-gradient(135deg, #ec4899, #ef4444)',
                    opacity: readCards.has('intro-7') ? 0.6 : 1,
                    cursor: readCards.has('intro-7') ? 'default' : 'pointer'
                  }}
                  title={readCards.has('intro-7') ? '✓' : '+5 XP'}
                >
                  <span className="text-lg">{readCards.has('intro-7') ? '✓' : '❤️'}</span>
                </button>
              )}
            </div>

            <div className="intro-card success" style={{position: 'relative'}}>
              <h3>💡 {t('unity.intro.changeHeartTitle')}</h3>
              <p>
                <strong>{t('unity.intro.recognizeDecency')}</strong>
                <br />
                {t('unity.intro.changeYourself')}
                <br /><br />
                <em>{t('unity.intro.beExample')}</em>
              </p>
              {setTotalXP && (
                <button
                  onClick={() => markCardAsRead('intro-8')}
                  disabled={readCards.has('intro-8')}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-md hover:shadow-lg active:scale-95"
                  style={{
                    background: readCards.has('intro-8') ? '#10b981' : 'linear-gradient(135deg, #ec4899, #ef4444)',
                    opacity: readCards.has('intro-8') ? 0.6 : 1,
                    cursor: readCards.has('intro-8') ? 'default' : 'pointer'
                  }}
                  title={readCards.has('intro-8') ? '✓' : '+5 XP'}
                >
                  <span className="text-lg">{readCards.has('intro-8') ? '✓' : '❤️'}</span>
                </button>
              )}
            </div>

            <div className="intro-card success" style={{position: 'relative'}}>
              <h3>👶🌍 {t('unity.intro.childrenPeaceTitle')}</h3>
              <p>
                <strong>{t('unity.intro.avoidPursuit')}</strong>
                <br />
                {t('unity.intro.peaceChoice')}
              </p>
              {setTotalXP && (
                <button
                  onClick={() => markCardAsRead('intro-9')}
                  disabled={readCards.has('intro-9')}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-md hover:shadow-lg active:scale-95"
                  style={{
                    background: readCards.has('intro-9') ? '#10b981' : 'linear-gradient(135deg, #ec4899, #ef4444)',
                    opacity: readCards.has('intro-9') ? 0.6 : 1,
                    cursor: readCards.has('intro-9') ? 'default' : 'pointer'
                  }}
                  title={readCards.has('intro-9') ? '✓' : '+5 XP'}
                >
                  <span className="text-lg">{readCards.has('intro-9') ? '✓' : '❤️'}</span>
                </button>
              )}
            </div>

            <div className="intro-card warning" style={{position: 'relative'}}>
              <h3>💬 {t('unity.intro.discernTitle')}</h3>
              <p>
                <strong>{t('unity.intro.manSpeaks')}</strong>
                <br />
                {t('unity.intro.seeFruits')}
              </p>
              {setTotalXP && (
                <button
                  onClick={() => markCardAsRead('intro-10')}
                  disabled={readCards.has('intro-10')}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-md hover:shadow-lg active:scale-95"
                  style={{
                    background: readCards.has('intro-10') ? '#10b981' : 'linear-gradient(135deg, #ec4899, #ef4444)',
                    opacity: readCards.has('intro-10') ? 0.6 : 1,
                    cursor: readCards.has('intro-10') ? 'default' : 'pointer'
                  }}
                  title={readCards.has('intro-10') ? '✓' : '+5 XP'}
                >
                  <span className="text-lg">{readCards.has('intro-10') ? '✓' : '❤️'}</span>
                </button>
              )}
            </div>

            <div className="intro-card success" style={{position: 'relative'}}>
              <h3>👁️ {t('unity.intro.lookPeaceTitle')}</h3>
              <p>
                <strong>{t('unity.intro.lookPeaceAll')}</strong>
                <br />
                {t('unity.intro.godSpeaks')}
              </p>
              {setTotalXP && (
                <button
                  onClick={() => markCardAsRead('intro-11')}
                  disabled={readCards.has('intro-11')}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-md hover:shadow-lg active:scale-95"
                  style={{
                    background: readCards.has('intro-11') ? '#10b981' : 'linear-gradient(135deg, #ec4899, #ef4444)',
                    opacity: readCards.has('intro-11') ? 0.6 : 1,
                    cursor: readCards.has('intro-11') ? 'default' : 'pointer'
                  }}
                  title={readCards.has('intro-11') ? '✓' : '+5 XP'}
                >
                  <span className="text-lg">{readCards.has('intro-11') ? '✓' : '❤️'}</span>
                </button>
              )}
            </div>

            <div className="intro-card warning" style={{position: 'relative'}}>
              <h3>🚨 {t('unity.intro.watchWordsTitle')}</h3>
              <p>
                <strong>{t('unity.intro.watchShares')}</strong>
                <br />
                {t('unity.intro.disqualify')}
              </p>
              {setTotalXP && (
                <button
                  onClick={() => markCardAsRead('intro-12')}
                  disabled={readCards.has('intro-12')}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-md hover:shadow-lg active:scale-95"
                  style={{
                    background: readCards.has('intro-12') ? '#10b981' : 'linear-gradient(135deg, #ec4899, #ef4444)',
                    opacity: readCards.has('intro-12') ? 0.6 : 1,
                    cursor: readCards.has('intro-12') ? 'default' : 'pointer'
                  }}
                  title={readCards.has('intro-12') ? '✓' : '+5 XP'}
                >
                  <span className="text-lg">{readCards.has('intro-12') ? '✓' : '❤️'}</span>
                </button>
              )}
            </div>

            <div className="intro-card warning" style={{position: 'relative'}}>
              <h3>📖 {t('unity.intro.wisdomMaturityTitle')}</h3>
              <p>
                <strong>{t('unity.intro.useScriptures')}</strong>
                <br />
                {t('unity.intro.hateSin')}
                <br /><br />
                <em>{t('unity.intro.separateActs')}</em>
                <br />
                {t('unity.intro.compassionNature')}
              </p>
              {setTotalXP && (
                <button
                  onClick={() => markCardAsRead('intro-13')}
                  disabled={readCards.has('intro-13')}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-md hover:shadow-lg active:scale-95"
                  style={{
                    background: readCards.has('intro-13') ? '#10b981' : 'linear-gradient(135deg, #ec4899, #ef4444)',
                    opacity: readCards.has('intro-13') ? 0.6 : 1,
                    cursor: readCards.has('intro-13') ? 'default' : 'pointer'
                  }}
                  title={readCards.has('intro-13') ? '✓' : '+5 XP'}
                >
                  <span className="text-lg">{readCards.has('intro-13') ? '✓' : '❤️'}</span>
                </button>
              )}
            </div>

            <div className="intro-card danger" style={{position: 'relative'}}>
              <h3>⚠️ {t('unity.intro.denounceLeadersTitle')}</h3>
              <p>
                <strong>{t('unity.intro.watchLeaders')}</strong>
                <br />
                {t('unity.intro.noJustice')}
                <br /><br />
                <em>{t('unity.intro.silenceComplicity')}</em>
              </p>
              {setTotalXP && (
                <button
                  onClick={() => markCardAsRead('intro-14')}
                  disabled={readCards.has('intro-14')}
                  className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-md hover:shadow-lg active:scale-95"
                  style={{
                    background: readCards.has('intro-14') ? '#10b981' : 'linear-gradient(135deg, #ec4899, #ef4444)',
                    opacity: readCards.has('intro-14') ? 0.6 : 1,
                    cursor: readCards.has('intro-14') ? 'default' : 'pointer'
                  }}
                  title={readCards.has('intro-14') ? '✓' : '+5 XP'}
                >
                  <span className="text-lg">{readCards.has('intro-14') ? '✓' : '❤️'}</span>
                </button>
              )}
            </div>
          </section>
        )}

        {/* SECTION RELIGIONS */}
        {activeSection === 'religions' && (
          <section className="religions-section">
            <h2>{t('unity.religions.title')}</h2>
            <p className="section-intro">
              {t('unity.religions.intro')}
            </p>

            <div className="religions-grid">
              {Object.entries(religions).map(([key, religion]) => (
                <div 
                  key={key}
                  className={`religion-card ${selectedReligion === key ? 'selected' : ''}`}
                  style={{ borderColor: religion.couleur }}
                  onClick={() => setSelectedReligion(selectedReligion === key ? null : key)}
                >
                  <div className="religion-header">
                    <span className="religion-symbole">{religion.symbole}</span>
                    <h3 style={{ color: religion.couleur }}>{religion.nom}</h3>
                  </div>
                  
                  {selectedReligion === key && (
                    <div className="religion-details">
                      <div className="fondement-item">
                        <strong>{t('unity.religions.theirGod')}</strong> {religion.fondements.dieu}
                      </div>
                      <div className="fondement-item">
                        <strong>{t('unity.religions.theGood')}</strong> {religion.fondements.bien}
                      </div>
                      <div className="fondement-item">
                        <strong>{t('unity.religions.theEvil')}</strong> {religion.fondements.mal}
                      </div>
                      <div className="fondement-item">
                        <strong>{t('unity.religions.theAngels')}</strong> {religion.fondements.anges}
                      </div>
                      <div className="fondement-item regle-or">
                        <strong>{t('unity.religions.theUnity')}</strong> {religion.fondements.unite}
                      </div>
                      
                      <div className="valeurs-cles">
                        <strong>{t('unity.religions.values')}</strong>
                        <div className="valeurs-tags">
                          {religion.valeursCles.map((valeur, idx) => (
                            <span key={idx} className="valeur-tag" style={{ backgroundColor: religion.couleur }}>
                              {valeur}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* SECTION FONDEMENTS COMMUNS */}
        {activeSection === 'commun' && (
          <section className="commun-section">
            <h2>{t('unity.common.title')}</h2>
            <p className="section-intro">
              {t('unity.common.intro')}
            </p>

            <div className="valeurs-universelles">
              {valeursUniverselles.map((valeur, idx) => (
                <div key={idx} className="valeur-card">
                  <h3>{valeur.titre}</h3>
                  <p className="valeur-description">{valeur.description}</p>
                  <ul className="valeur-exemples">
                    {valeur.exemples.map((exemple, i) => (
                      <li key={i}>✓ {exemple}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="citation-finale">
              <blockquote>
                {t('unity.common.finalQuote')}
                <br /><br />
                {t('unity.common.finalQuote2')}
                <footer>— {t('unity.common.quoteAuthor')}</footer>
              </blockquote>
            </div>
          </section>
        )}

        {/* SECTION PROCESSUS D'HUMILITÉ */}
        {activeSection === 'humilite' && (
          <section className="humilite-section">
            <h2>{t('unity.humility.title')}</h2>
            <p className="section-intro">
              {t('unity.humility.intro')}
            </p>

            <div className="processus-timeline">
              {processusHumilite.map((etape) => (
                <div key={etape.etape} className="processus-etape">
                  <div className="etape-numero">{etape.etape}</div>
                  <div className="etape-contenu">
                    <h3>{etape.titre}</h3>
                    <p className="etape-description">{etape.description}</p>
                    <div className="etape-action">
                      <strong>{t('unity.humility.action')}</strong> {etape.action}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="conclusion-humilite">
              <h3>🍎 {t('unity.humility.discernFruits')}</h3>
              
              <div className="intro-card danger" style={{marginBottom: '1rem'}}>
                <h3>⚠️ {t('unity.humility.humanHeart')}</h3>
                <p>
                  <strong>{t('unity.intro.manSpeaks')}</strong>
                  <br />
                  {t('unity.intro.seeFruits')}
                </p>
              </div>

              <div className="intro-card success" style={{marginBottom: '1rem'}}>
                <h3>✨ {t('unity.humility.lookGodLove')}</h3>
                <p>
                  <strong>{t('unity.intro.lookPeaceAll')}</strong>
                  <br />
                  {t('unity.intro.godSpeaks')}
                </p>
              </div>

              <h3 style={{marginTop: '1.5rem'}}>💬 {t('unity.humility.watchOurWords')}</h3>
              <div className="mots-grid">
                <div className="mots-card destructeurs">
                  <h4>❌ {t('unity.humility.prideFruits')}</h4>
                  <ul>
                    {t('unity.humility.prideFruitsList').split('|').map((fruit, index) => (
                      <li key={index}>{fruit}</li>
                    ))}
                  </ul>
                </div>
                <div className="mots-card constructeurs">
                  <h4>✓ {t('unity.humility.godFruits')}</h4>
                  <ul>
                    {t('unity.humility.godFruitsList').split('|').map((fruit, index) => (
                      <li key={index}>{fruit}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="citation-finale-humilite">
                <blockquote>
                  {t('unity.humility.finalQuote')}
                  <footer>— {t('unity.humility.author')}</footer>
                </blockquote>
              </div>
            </div>
          </section>
        )}

      </main>

      {/* Pied de page */}
      <footer className="module-footer">
        <p>
          🕊️ <em>{t('unity.footer.quote')}</em>
        </p>
        <p style={{marginTop: '0.5rem', fontSize: '0.7rem', color: '#7f8c8d'}}>
          — {t('unity.footer.author')}
        </p>
      </footer>
    </div>
  );
};

export default UnityPeaceModule;
