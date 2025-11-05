import React, { useState } from 'react';
import './UnityPeaceModule.css';

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

const UnityPeaceModule = () => {
  const [activeSection, setActiveSection] = useState('intro');
  const [selectedReligion, setSelectedReligion] = useState(null);

  // Les religions et leurs fondements communs
  const religions = {
    christianisme: {
      nom: "Christianisme",
      couleur: "#4A90E2",
      symbole: "✝️",
      fondements: {
        dieu: "Un Dieu unique, Père créateur",
        bien: "L'amour du prochain, le pardon, la paix",
        mal: "La haine, l'égoïsme, la violence",
        anges: "Les messagers de Dieu (Gabriel, Michel...)",
        unite: "Un seul Dieu pour tous les hommes"
      },
      valeursCles: ["Amour", "Pardon", "Paix", "Humilité", "Justice"]
    },
    islam: {
      nom: "Islam",
      couleur: "#27AE60",
      symbole: "☪️",
      fondements: {
        dieu: "Allah, l'Unique et Miséricordieux",
        bien: "La justice, la charité, la paix",
        mal: "L'oppression, le mensonge, la division",
        anges: "Les anges de lumière (Jibril, Mikail...)",
        unite: "Il n'y a de dieu qu'Allah"
      },
      valeursCles: ["Paix", "Justice", "Charité", "Respect", "Miséricorde"]
    },
    judaisme: {
      nom: "Judaïsme",
      couleur: "#3498DB",
      symbole: "✡️",
      fondements: {
        dieu: "YHWH, l'Éternel unique",
        bien: "La justice, la compassion, la vie",
        mal: "L'oppression, la médisance, la haine",
        anges: "Les messagers célestes (Malakhim)",
        unite: "Écoute Israël, l'Éternel est Un"
      },
      valeursCles: ["Justice", "Vie", "Mémoire", "Paix", "Étude"]
    },
    hindouisme: {
      nom: "Hindouisme",
      couleur: "#E67E22",
      symbole: "🕉️",
      fondements: {
        dieu: "Brahman, la réalité suprême",
        bien: "La non-violence (ahimsa), le devoir juste",
        mal: "La violence, l'ignorance spirituelle",
        anges: "Les Devas, êtres célestes bienveillants",
        unite: "Tout est Un dans Brahman"
      },
      valeursCles: ["Non-violence", "Vérité", "Compassion", "Pureté", "Harmonie"]
    },
    bouddhisme: {
      nom: "Bouddhisme",
      couleur: "#9B59B6",
      symbole: "☸️",
      fondements: {
        dieu: "Pas de dieu créateur, mais respect du sacré",
        bien: "La compassion, la sagesse, la paix",
        mal: "La souffrance causée par l'ignorance",
        anges: "Les Bodhisattvas, êtres éveillés",
        unite: "Nature de Bouddha en chacun"
      },
      valeursCles: ["Compassion", "Sagesse", "Paix", "Non-violence", "Éveil"]
    }
  };

  // Les bases communes : ce qui unit l'humanité
  const valeursUniverselles = [
    {
      titre: "Le Bien",
      description: "Toutes les religions enseignent l'amour, la justice et la compassion",
      exemples: [
        "Aimer son prochain comme soi-même",
        "Faire le bien sans distinction",
        "Protéger les faibles et les opprimés",
        "Dire la vérité avec bienveillance",
        "Partager ce que l'on a"
      ]
    },
    {
      titre: "Le Mal",
      description: "Toutes condamnent la violence, le mensonge et l'oppression",
      exemples: [
        "Tuer sans justice",
        "Voler et exploiter",
        "Mentir et calomnier",
        "Mépriser et humilier",
        "Diviser et haïr"
      ]
    },
    {
      titre: "Les Anges et Êtres Spirituels",
      description: "Presque toutes reconnaissent des messagers célestes bienveillants",
      exemples: [
        "Anges messagers de Dieu",
        "Guides spirituels",
        "Êtres de lumière",
        "Protecteurs célestes",
        "Bodhisattvas et Devas"
      ]
    },
    {
      titre: "Un Dieu Unique (ou Réalité Suprême)",
      description: "La majorité croit en une source unique, un créateur ou une réalité ultime",
      exemples: [
        "Christianisme, Islam, Judaïsme : Un seul Dieu",
        "Hindouisme : Brahman, l'Un suprême",
        "Bouddhisme : Nature de Bouddha universelle",
        "Tous cherchent la vérité ultime",
        "Tous aspirent à l'unité et à la paix"
      ]
    },
    {
      titre: "La Relation et la Paix",
      description: "Ce qui unit vraiment toutes les religions et tous les hommes",
      exemples: [
        "Chaque religion cherche la relation avec le divin",
        "Chaque homme recherche la paix",
        "Cette relation qui nous lie tous, c'est l'amour de Dieu",
        "L'amour est le lien universel",
        "La paix est notre aspiration commune"
      ]
    },
    {
      titre: "L'Inclusion : Aimés de Dieu",
      description: "La diversité religieuse est vaste, mais encore plus vaste est l'inclusion",
      exemples: [
        "Inclusion des autres là où ils sont appelés par Dieu",
        "Respect des différences de couleur",
        "Respect des différences de genres",
        "L'inclusion nous rend humains uniques, aimés de Dieu",
        "Jésus a dit : 'Aimez-vous les uns les autres'"
      ]
    }
  ];

  // Le processus d'humilité : le chemin vers la paix
  const processusHumilite = [
    {
      etape: 1,
      titre: "Reconnaître : nos frontières viennent du passé",
      description: "La division, l'isolement par des barrières et frontières de peur, est l'œuvre de notre passé périlleux. Nos divisions ne sont pas la volonté de Dieu.",
      action: "Accepter que ma tradition n'est qu'à moi, et je fais partie de la diversité voulue par Dieu"
    },
    {
      etape: 2,
      titre: "Le respect : socle de l'humilité, gardien de la paix",
      description: "Même si la fraternité n'est pas applicable objectivement, le respect est le fondement.",
      action: "Respecter toutes les croyances, même sans tout comprendre"
    },
    {
      etape: 3,
      titre: "Comprendre sans juger",
      description: "Aujourd'hui, comprendre les autres est un processus d'humilité nécessaire.",
      action: "Écouter vraiment ce que croient les autres, sans jugement"
    },
    {
      etape: 4,
      titre: "Changement de toi d'abord : sois une vraie lanterne",
      description: "Reconnaître que la bienséance n'est pas la même pour chacun. Change ton cœur progressivement, transforme ta vie, deviens une vraie lumière.",
      action: "Ne pas imposer mes règles aux autres, mais être un exemple vivant par ma transformation"
    },
    {
      etape: 5,
      titre: "Rompre avec l'esprit communautariste",
      description: "Nos esprits de parti nous poussent à la politique de l'orgueil : 'J'ai raison de te faire mal, j'ai raison un point c'est tout.' Prenez garde au cœur du problème, à la racine de notre propre mal.",
      action: "Refuser les discours de division dans ma propre communauté"
    },
    {
      etape: 6,
      titre: "Pour être libre, rendre libre les autres",
      description: "Ma liberté dépend de celle que j'accorde aux autres.",
      action: "Défendre la liberté de conscience de tous, pas seulement la mienne"
    },
    {
      etape: 7,
      titre: "Éviter la poursuite des mots pour mots",
      description: "Ne pas répondre à la haine par la haine, aux insultes par les insultes.",
      action: "Choisir la paix pour que nos enfants vivent en paix dans la diversité"
    }
  ];

  return (
    <div className="unity-peace-module">
      {/* En-tête */}
      <header className="module-header">
        <h1>🕊️ L'Unité qui Produit la Paix</h1>
        <p className="subtitle">
          Par Emmanuel - "Chaque religion a ses raisons, nos frontières viennent du passé"
        </p>
      </header>

      {/* Navigation */}
      <nav className="module-nav">
        <button 
          className={activeSection === 'intro' ? 'active' : ''}
          onClick={() => setActiveSection('intro')}
        >
          Intro
        </button>
        <button 
          className={activeSection === 'religions' ? 'active' : ''}
          onClick={() => setActiveSection('religions')}
        >
          Religions
        </button>
        <button 
          className={activeSection === 'commun' ? 'active' : ''}
          onClick={() => setActiveSection('commun')}
        >
          Bases Communes
        </button>
        <button 
          className={activeSection === 'humilite' ? 'active' : ''}
          onClick={() => setActiveSection('humilite')}
        >
          Humilité
        </button>
      </nav>

      {/* Contenu principal */}
      <main className="module-content">
        
        {/* SECTION INTRODUCTION */}
        {activeSection === 'intro' && (
          <section className="intro-section">
            <h2>Emmanuel dit :</h2>
            
            <div className="intro-card">
              <h3>🌍 Nos frontières viennent du passé</h3>
              <p>
                Chaque religion a ses raisons. Nos divisions ne sont pas la volonté divine, 
                mais le fruit de l'histoire, de la géographie, de la culture. 
                <br /><br />
                <strong>La division, l'isolement par des barrières et frontières de peur, est l'œuvre de notre passé périlleux.</strong>
                <br />
                Nous sommes nés dans des traditions différentes, mais nous partageons la même humanité.
              </p>
            </div>

            <div className="intro-card success">
              <h3>✨ Une révélation qui ouvre les yeux</h3>
              <p>
                <strong>J'ai été surpris un jour en apprenant que les Juifs sont aussi les fils de Dieu.</strong>
                <br />
                Que l'ange Michel est un grand messager pour les musulmans.
                Que Jésus, Isa, Yeshua sont connus de diverses manières, même dans la foi chrétienne.
                <br />
                <em>Car il existe diverses tribus, diverses églises, diverses familles.</em>
                <br />
                Nous parlons des mêmes réalités avec des noms différents. Cela devrait nous rapprocher, pas nous diviser.
              </p>
            </div>

            <div className="intro-card">
              <h3>🙏 Le respect : socle de l'humilité, gardien de la paix</h3>
              <p>
                Même si la fraternité n'est pas applicable objectivement, <strong>le respect est le socle de l'humilité, gardien de la paix.</strong>
                <br />
                Comprendre et respecter les autres religions est un processus d'humilité. 
                Cela ne veut pas dire renoncer à sa foi, mais accepter que l'autre aussi cherche la vérité.
              </p>
            </div>

            <div className="intro-card success">
              <h3>❤️ Ce qui nous lie vraiment</h3>
              <p>
                <strong>Chaque religion cherche la relation. Chaque homme recherche la paix.</strong>
                <br />
                Cette relation qui nous lie tous, c'est l'amour de Dieu.
                <br />
                L'amour est le lien universel qui transcende toutes les frontières, toutes les langues, toutes les traditions.
              </p>
            </div>

            <div className="intro-card success">
              <h3>🌈 {t('unity.intro.inclusionTitle')}</h3>
              <p>
                <strong>{t('unity.intro.vastInclusion')}</strong>
                <br />
                {t('unity.intro.respectDifferences')}
                <br /><br />
                <em>{t('unity.intro.jesusCommand')}</em>
              </p>
            </div>

            <div className="intro-card danger">
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
            </div>

            <div className="intro-card success">
              <h3>🔓 {t('unity.intro.freedomTitle')}</h3>
              <p>
                <strong>{t('unity.intro.freedomOthers')}</strong>
                <br />
                {t('unity.intro.defendFreedom')}
              </p>
            </div>

            <div className="intro-card success">
              <h3>💡 {t('unity.intro.changeHeartTitle')}</h3>
              <p>
                <strong>{t('unity.intro.recognizeDecency')}</strong>
                <br />
                {t('unity.intro.changeYourself')}
                <br /><br />
                <em>{t('unity.intro.beExample')}</em>
              </p>
            </div>

            <div className="intro-card success">
              <h3>👶🌍 {t('unity.intro.childrenPeaceTitle')}</h3>
              <p>
                <strong>{t('unity.intro.avoidPursuit')}</strong>
                <br />
                {t('unity.intro.peaceChoice')}
              </p>
            </div>

            <div className="intro-card warning">
              <h3>💬 {t('unity.intro.discernTitle')}</h3>
              <p>
                <strong>{t('unity.intro.manSpeaks')}</strong>
                <br />
                {t('unity.intro.seeFruits')}
              </p>
            </div>

            <div className="intro-card success">
              <h3>👁️ {t('unity.intro.lookPeaceTitle')}</h3>
              <p>
                <strong>{t('unity.intro.lookPeaceAll')}</strong>
                <br />
                {t('unity.intro.godSpeaks')}
              </p>
            </div>

            <div className="intro-card warning">
              <h3>🚨 {t('unity.intro.watchWordsTitle')}</h3>
              <p>
                <strong>{t('unity.intro.watchShares')}</strong>
                <br />
                {t('unity.intro.disqualify')}
              </p>
            </div>

            <div className="intro-card warning">
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
            </div>

            <div className="intro-card danger">
              <h3>⚠️ {t('unity.intro.denounceLeadersTitle')}</h3>
              <p>
                <strong>{t('unity.intro.watchLeaders')}</strong>
                <br />
                {t('unity.intro.noJustice')}
                <br /><br />
                <em>{t('unity.intro.silenceComplicity')}</em>
              </p>
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
                    <li>L'esprit de parti : "J'ai raison un point c'est tout"</li>
                    <li>La politique de l'orgueil : "J'ai raison de te faire mal"</li>
                    <li>Utiliser les écritures pour faire mal (processus espiègle)</li>
                    <li>Avoir en horreur les personnes (et non seulement les actes)</li>
                    <li>Leaders spirituels qui cachent leur dérive et malhonnêteté</li>
                    <li>Silence complice face à l'injustice</li>
                    <li>Division et guerres</li>
                    <li>Haine déguisée en piété</li>
                    <li>Vol et destruction</li>
                    <li>Manipulation pour l'orgueil</li>
                    <li>Mépris et violence</li>
                  </ul>
                </div>
                <div className="mots-card constructeurs">
                  <h4>✓ {t('unity.humility.godFruits')}</h4>
                  <ul>
                    <li>Séparer les actes de la personne avec sagesse</li>
                    <li>Compassion pour notre pauvreté humaine</li>
                    <li>Grâce tout en se protégeant selon les contextes</li>
                    <li>Dénoncer l'injustice pour protéger les autres</li>
                    <li>Dire la vérité avec courage</li>
                    <li>Paix pour tous</li>
                    <li>Amour sans distinction</li>
                    <li>Réconciliation et unité</li>
                    <li>Humilité et respect</li>
                    <li>Liberté pour tous</li>
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
