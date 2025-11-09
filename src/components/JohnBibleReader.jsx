// ============================================================================
// JOHN BIBLE READER - Lecteur Bible complet pour l'Évangile de Jean
// ============================================================================
// Lecteur Bible avancé avec navigation par chapitres et intégration Strong

import React, { useState, useEffect } from 'react';
import { 
  Book, ChevronLeft, ChevronRight, Search, 
  Share2, Copy, Download
} from 'lucide-react';
import { bibleData } from '../data/bible';
import { getStrongDictionary } from '../data/bible/strong/index.js';
import { translationService } from '../data/bible/gospel/john/translationService';
import VerseWithStrong from './VerseWithStrong';
import useTranslation from '../hooks/useTranslation.js';

const JohnBibleReader = ({ onClose, initialChapter = 1 }) => {
  const { t, currentLanguage, changeLanguage } = useTranslation();
  
  // Mapper les codes de langue UI vers les codes de fichiers Bible
  const languageMap = {
    'jp': 'ja',  // Japonais: jp (UI) -> ja (fichiers Bible)
    'rc': 'fr',  // Lingala: pas de fichier Bible -> fallback français
  };
  
  // Obtenir le code langue pour les fichiers Bible
  const getBibleLanguageCode = (uiLang) => {
    return languageMap[uiLang] || uiLang;
  };
  
  const [currentChapter, setCurrentChapter] = useState(initialChapter);
  const [chapterData, setChapterData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [fontSize, setFontSize] = useState('text-base');
  const [language, setLanguage] = useState(getBibleLanguageCode(currentLanguage));
  const [selectedVerse, setSelectedVerse] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [showFloatingShare, setShowFloatingShare] = useState(false);
  const [shareButtonPosition, setShareButtonPosition] = useState({ x: 0, y: 0 });

  // Mettre à jour la langue automatiquement quand currentLanguage change
  useEffect(() => {
    const newBibleLang = getBibleLanguageCode(currentLanguage);
    if (newBibleLang !== language) {
      setLanguage(newBibleLang);
    }
  }, [currentLanguage, language]);

  // Gérer la sélection de texte
  useEffect(() => {
    const handleTextSelection = () => {
      const selection = window.getSelection();
      const text = selection.toString().trim();
      
      if (text.length > 0) {
        setSelectedText(text);
        
        // Positionner le bouton de partage près de la sélection
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        setShareButtonPosition({
          x: rect.left + rect.width / 2,
          y: rect.top - 10
        });
        setShowFloatingShare(true);
      } else {
        setShowFloatingShare(false);
        setSelectedText('');
      }
    };

    document.addEventListener('mouseup', handleTextSelection);
    document.addEventListener('touchend', handleTextSelection);

    return () => {
      document.removeEventListener('mouseup', handleTextSelection);
      document.removeEventListener('touchend', handleTextSelection);
    };
  }, []);

  // Formatage typographique selon la langue
  const formatTextByLanguage = (text, lang = 'fr') => {
    if (!text) return text;
    
    switch (lang) {
      case 'fr':
        return text
          // Espaces insécables avant les signes de ponctuation haute
          .replace(/\s*([;:!?])/g, '\u00A0$1')
          // Guillemets français typographiques
          .replace(/"/g, '«\u00A0')
          .replace(/"/g, '\u00A0»')
          .replace(/«\s*/g, '«\u00A0')
          .replace(/\s*»/g, '\u00A0»')
          // Tirets cadratins pour les dialogues
          .replace(/^-\s*/gm, '—\u00A0')
          .replace(/\s+-\s+/g, '\u00A0—\u00A0')
          // Apostrophes typographiques
          .replace(/'/g, '\u2019')
          // Majuscules accentuées en début de phrase
          .replace(/\. à /g, '. À ')
          .replace(/^à /g, 'À ')
          // Nombres ordinaux français
          .replace(/(\d+)(eme|ème)/g, '$1ᵉ')
          .replace(/1er/g, '1ᵉʳ')
          .replace(/1ere|1ère/g, '1ʳᵉ')
          // Espacement des points de suspension
          .replace(/\.\.\./g, '…')
          // Corrections courantes
          .replace(/\bEt /g, 'Et ')
          .replace(/\bDieu\b/g, 'Dieu');
          
      case 'en':
        return text
          // Guillemets anglais
          .replace(/«\s*/g, '"')
          .replace(/\s*»/g, '"')
          // Tirets simples
          .replace(/—/g, '-')
          // Apostrophes standard
          .replace(/'/g, "'");
          
      default:
        return text;
    }
  };

  useEffect(() => {
    loadChapter(currentChapter);
  }, [currentChapter, language]); // Recharger si la langue change

  const loadChapter = async (chapterNumber) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log(`Loading John chapter ${chapterNumber} in language: ${language}`);
      
      // Essayer d'abord les traductions avec le nouveau service
      let chapter = null;
      try {
        chapter = await translationService.loadChapter(chapterNumber, language);
        console.log('Loaded from translation service:', chapter);
      } catch (serviceError) {
        console.warn('Failed to load from translation service, trying JS chapters:', serviceError);
      }
      
      // Fallback vers les chapitres JS si .txt échoue
      if (!chapter && typeof bibleData.getJohnChapter === 'function') {
        try {
          chapter = await bibleData.getJohnChapter(chapterNumber);
          console.log('Loaded from JS chapters:', chapter);
        } catch (jsError) {
          console.warn('Failed to load from JS chapters:', jsError);
        }
      }
      
      // Dernier recours : fallback manuel
      if (!chapter) {
        console.warn(`Chapter ${chapterNumber} not found, using fallback`);
        setChapterData(getFallbackChapter(chapterNumber));
        return;
      }
      
      // Vérifier la structure des données
      if (!chapter.verses || !Array.isArray(chapter.verses)) {
        console.warn('Invalid chapter structure, using fallback');
        setChapterData(getFallbackChapter(chapterNumber));
        return;
      }
      
      console.log('Chapter loaded successfully:', chapter);
      setChapterData(chapter);
    } catch (err) {
      console.error('Error loading chapter:', err);
      setError(null); // Ne pas afficher l'erreur, utiliser le fallback
      setChapterData(getFallbackChapter(chapterNumber));
    } finally {
      setLoading(false);
    }
  };

  const getFallbackChapter = (chapterNumber) => {
    const fallbackChapters = {
      1: {
        chapter: 1,
        title: "Jean 1 - Le Verbe fait chair",
        version: "LSG 1910",
        verses: [
          {
            number: 1,
            text: "Au commencement était la Parole, et la Parole était avec Dieu, et la Parole était Dieu.",
            strong: ["G746", "G2258", "G3056"]
          },
          {
            number: 2,
            text: "Elle était au commencement avec Dieu.",
            strong: ["G3778", "G2258", "G746"]
          },
          {
            number: 3,
            text: "Toutes choses ont été faites par elle, et rien de ce qui a été fait n'a été fait sans elle.",
            strong: ["G3956", "G1096", "G1223"]
          },
          {
            number: 14,
            text: "Et la parole a été faite chair, et elle a habité parmi nous, pleine de grâce et de vérité; et nous avons contemplé sa gloire, une gloire comme la gloire du Fils unique venu du Père.",
            strong: ["G3056", "G4561", "G1096"]
          }
        ]
      },
      3: {
        chapter: 3,
        title: "Jean 3 - Naître de nouveau",
        version: "LSG 1910",
        verses: [
          {
            number: 16,
            text: "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle.",
            strong: ["G2316", "G25", "G2889"]
          }
        ]
      },
      14: {
        chapter: 14,
        title: "Jean 14 - Je suis le chemin",
        version: "LSG 1910",
        verses: [
          {
            number: 6,
            text: "Jésus lui dit: Je suis le chemin, la vérité, et la vie. Nul ne vient au Père que par moi.",
            strong: ["G2424", "G3598", "G225"]
          }
        ]
      }
    };

    return fallbackChapters[chapterNumber] || {
      chapter: chapterNumber,
      title: `${t('bible.john')} ${chapterNumber}`,
      version: "LSG 1910",
      verses: [
        {
          number: 1,
          text: t('bible.loadingChapter', { chapter: chapterNumber }),
          strong: []
        },
        {
          number: 2,
          text: t('bible.exploreWhileLoading'),
          strong: []
        }
      ]
    };
  };

  const handleSearch = async (text) => {
    if (!text.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      console.log('Searching for:', text);
      
      if (typeof bibleData.searchJohnVerses === 'function') {
        const results = await bibleData.searchJohnVerses(text);
        setSearchResults(results || []);
      } else {
        console.warn('searchJohnVerses not available, using fallback search');
        setSearchResults(getFallbackSearchResults(text));
      }
    } catch (err) {
      console.error('Search error:', err);
      setSearchResults(getFallbackSearchResults(text));
    }
  };

  const getFallbackSearchResults = (searchText) => {
    const fallbackResults = [
      {
        chapter: 3,
        verse: 16,
        content: "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle.",
        reference: "Jean 3:16"
      },
      {
        chapter: 1,
        verse: 1,
        content: "Au commencement était la Parole, et la Parole était avec Dieu, et la Parole était Dieu.",
        reference: "Jean 1:1"
      },
      {
        chapter: 14,
        verse: 6,
        content: "Jésus lui dit: Je suis le chemin, la vérité, et la vie. Nul ne vient au Père que par moi.",
        reference: "Jean 14:6"
      }
    ];

    // Simple recherche par inclusion de texte
    const searchLower = searchText.toLowerCase();
    return fallbackResults.filter(result => 
      result.content.toLowerCase().includes(searchLower)
    );
  };

  const goToChapter = (chapterNumber) => {
    if (chapterNumber >= 1 && chapterNumber <= 21) {
      setCurrentChapter(chapterNumber);

      setShowSearch(false);
    }
  };

  const goToVerse = (chapterNumber, verseNumber) => {
    if (chapterNumber !== currentChapter) {
      setCurrentChapter(chapterNumber);
    }
    setShowSearch(false);
  };

  // Fonctions de partage
  const handleShareClick = (e, verse) => {
    e?.stopPropagation();
    setSelectedVerse(verse || { number: currentChapter, text: selectedText });
    setShowShareModal(true);
    setShowFloatingShare(false);
  };

  const generateShareContent = (verse) => {
    // Utiliser le texte sélectionné s'il existe
    let textToShare = selectedText || '';
    
    if (!textToShare && verse) {
      // Sinon, utiliser le verset complet
      textToShare = formatTextByLanguage(verse.text, language);
    }
    
    return {
      text: `"${textToShare}" - Jean ${currentChapter}${verse?.number ? `:${verse.number}` : ''}`,
      hashtags: '#UnityQuestChroniclesOfLove #Bible #Jean #Foi #Évangile #Amour #Unité',
      url: 'https://emmanuel.gallery/'
    };
  };



  const copyToClipboard = async (verse) => {
    const content = generateShareContent(verse);
    const fullText = `${content.text}\n${content.hashtags}\n${content.url}`;
    try {
      await navigator.clipboard.writeText(fullText);
      alert(`✅ ${t('bible.verseCopied')}`);
    } catch (err) {
      console.error(t('bible.copyError'), err);
    }
  };

  const downloadImage = (verse) => {
    alert(t('bible.imageFeatureComing'));
  };

  const getStrongInfo = (strongNumbers) => {
    if (!strongNumbers || strongNumbers.length === 0) return null;
    
    // Utilise le vrai dictionnaire Strong multilingue du projet
    const strongDict = getStrongDictionary(language);
    
    return strongNumbers.map(num => {
      const strongData = strongDict[num];
      if (!strongData) {
        return {
          number: num,
          word: '?',
          meaning: t('bible.definitionNotFound'),
          transliteration: '?'
        };
      }
      
      return {
        number: num,
        word: strongData.word,
        meaning: strongData.meaning || strongData.definition || t('bible.definitionLoading'),
        transliteration: strongData.transliteration,
        pronunciation: strongData.pronunciation,
        definition: strongData.definition,
        usage: strongData.usage,
        etymology: strongData.etymology
      };
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 p-8">
        <Book className="w-12 h-12 text-blue-500 animate-pulse mb-4" />
        <p className="text-gray-600">{t('bible.loading')}</p>
      </div>
    );
  }

  return (
    <div 
      className="w-full h-screen bg-white flex flex-col fixed inset-0"
      style={{
        height: '100vh',
        minHeight: '100vh',
        maxHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Header - Ultra Compact 2 lignes */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        {/* Ligne 1: Titre centré */}
        <div className="relative px-3 py-2 text-center">
          <div className="text-sm font-bold">{t('bible.john')} {currentChapter} / 21</div>
          {onClose && (
            <button
              onClick={onClose}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center hover:bg-white/20 rounded-full transition-colors"
              title={t('bible.close')}
            >
              <span className="text-lg leading-none">×</span>
            </button>
          )}
        </div>

        {/* Ligne 2: Navigation + Contrôles en une seule ligne */}
        <div className="flex items-center gap-1 px-2 pb-2 overflow-x-auto scrollbar-hide">
          {/* Navigation */}
          <button
            onClick={() => goToChapter(currentChapter - 1)}
            disabled={currentChapter <= 1}
            className="w-7 h-7 flex items-center justify-center bg-white/20 rounded disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-all flex-shrink-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <select
            value={currentChapter}
            onChange={(e) => goToChapter(parseInt(e.target.value))}
            className="px-2 py-1 bg-white/20 rounded text-white text-xs font-bold text-center border-none outline-none min-w-[70px] flex-shrink-0"
          >
            {Array.from({ length: 21 }, (_, i) => (
              <option key={i + 1} value={i + 1} className="text-gray-800">
                Ch. {i + 1}
              </option>
            ))}
          </select>
          
          <button
            onClick={() => goToChapter(currentChapter + 1)}
            disabled={currentChapter >= 21}
            className="w-7 h-7 flex items-center justify-center bg-white/20 rounded disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-all flex-shrink-0"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Séparateur vertical */}
          <div className="w-px h-5 bg-white/30 mx-1 flex-shrink-0"></div>

          {/* Langue */}
          <select
            value={currentLanguage}
            onChange={(e) => changeLanguage(e.target.value)}
            className="px-2 py-1 bg-white/20 rounded text-white text-xs border-none outline-none min-w-[50px] flex-shrink-0"
          >
            <option value="fr" className="text-gray-800">🇫🇷</option>
            <option value="en" className="text-gray-800">🇺🇸</option>
            <option value="es" className="text-gray-800">🇪🇸</option>
            <option value="pt" className="text-gray-800">🇵🇹</option>
            <option value="de" className="text-gray-800">🇩🇪</option>
            <option value="it" className="text-gray-800">🇮🇹</option>
            <option value="ru" className="text-gray-800">🇷🇺</option>
            <option value="zh" className="text-gray-800">🇨🇳</option>
            <option value="ar" className="text-gray-800">🇸🇦</option>
            <option value="he" className="text-gray-800">🇮🇱</option>
            <option value="hi" className="text-gray-800">🇮🇳</option>
            <option value="sw" className="text-gray-800">🇹🇿</option>
            <option value="ko" className="text-gray-800">🇰🇷</option>
            <option value="jp" className="text-gray-800">🇯🇵</option>
            <option value="pl" className="text-gray-800">🇵🇱</option>
            <option value="rc" className="text-gray-800">🇨🇩</option>
            <option value="uk" className="text-gray-800">🇺🇦</option>
          </select>

          {/* Taille */}
          <select
            value={fontSize}
            onChange={(e) => setFontSize(e.target.value)}
            className="px-2 py-1 bg-white/20 rounded text-white text-xs border-none outline-none w-10 flex-shrink-0"
          >
            <option value="text-sm" className="text-gray-800">S</option>
            <option value="text-base" className="text-gray-800">M</option>
            <option value="text-lg" className="text-gray-800">L</option>
            <option value="text-xl" className="text-gray-800">XL</option>
          </select>

          {/* Recherche */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className={`w-7 h-7 rounded flex items-center justify-center transition-colors flex-shrink-0 ${
              showSearch ? 'bg-white text-blue-600' : 'bg-white/20'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Barre de recherche - Ligne 3 optionnelle */}
        {showSearch && (
          <div className="px-2 pb-2 flex gap-1">
            <input
              type="text"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                handleSearch(e.target.value);
              }}
              placeholder={t('bible.search')}
              className="flex-1 px-2 py-1 rounded text-gray-800 text-sm placeholder:text-gray-500"
              autoFocus
            />
            {searchText && (
              <button
                onClick={() => {
                  setSearchText('');
                  setSearchResults([]);
                }}
                className="w-7 h-7 flex items-center justify-center bg-white/20 rounded"
              >
                ✕
              </button>
            )}
          </div>
        )}
      </div>

      {/* Search Results - Compact pour mobile */}
      {showSearch && searchResults.length > 0 && (
        <div className="bg-yellow-50 border-b">
          <div className="p-2">
            <div className="text-xs font-semibold text-gray-700 mb-1 px-1">
              {searchResults.length} résultat{searchResults.length > 1 ? 's' : ''}
            </div>
            <div className="space-y-1 max-h-48 overflow-y-auto">
              {searchResults.map((result, index) => (
                <div
                  key={index}
                  onClick={() => goToVerse(result.chapter, result.verse)}
                  className="p-2 bg-white rounded cursor-pointer active:bg-blue-50 transition-colors"
                >
                  <div className="text-xs font-bold text-orange-600 mb-0.5">
                    Jean {result.chapter}:{result.verse}
                  </div>
                  <p className="text-xs text-gray-700 line-clamp-2">
                    {result.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Content - Optimisé pour lecture mobile avec header 2 lignes */}
      <div 
        className="overflow-y-auto bg-gradient-to-br from-amber-50 to-white"
        style={{
          flex: '1 1 auto',
          minHeight: 0,
          height: 'calc(100vh - 80px)', // Header ultra compact 2 lignes seulement
          WebkitOverflowScrolling: 'touch' // Smooth scroll iOS
        }}
      >
        <div className="p-4 sm:p-6 max-w-3xl mx-auto">
        {error ? (
          <div className="text-center py-4">
            <div className="text-red-500 mb-2 text-sm">{t('bible.error')}</div>
            <p className="text-gray-600 text-xs mb-3">{error}</p>
            <button
              onClick={() => loadChapter(currentChapter)}
              className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 transition-colors"
            >
              Réessayer
            </button>
          </div>
        ) : (
          <div className="pb-2">

            {/* Verses - Optimisé pour mobile avec espacement intelligent */}
            {chapterData?.verses?.map((verse, index) => (
              <div key={verse.number}>
                <div
                  className={`group relative transition-all p-3 sm:p-4 rounded mb-2`}
                >
                  <div className="flex gap-2 relative">
                    <span className="text-blue-600 font-bold text-xs sm:text-sm mt-0.5 min-w-[18px] sm:min-w-[22px] flex-shrink-0">
                      {verse.number}
                    </span>
                    <div className="flex-1 min-w-0 relative">
                      {/* Icône de partage cliquable */}
                      <button
                        onClick={(e) => handleShareClick(e, verse)}
                        className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-blue-50 rounded z-10"
                        aria-label={t('bible.shareVerse')}
                      >
                        <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500" />
                      </button>
                      <div 
                        className={`${fontSize} leading-relaxed text-gray-900 select-text font-serif text-justify`}
                        style={{ 
                          lineHeight: '1.75',
                          letterSpacing: '0.01em',
                          WebkitFontSmoothing: 'antialiased',
                          MozOsxFontSmoothing: 'grayscale'
                        }}
                      >
                        <VerseWithStrong verse={verse} language={language} />
                      </div>
                    </div>
                  </div>
                </div>
                
              </div>
            ))}
          </div>
        )}
        </div>
      </div>

      {/* Bouton flottant de partage lors de la sélection de texte */}
      {showFloatingShare && (
        <button
          onClick={() => handleShareClick(null, null)}
          className="fixed z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg transition-all animate-fadeIn"
          style={{
            left: `${shareButtonPosition.x}px`,
            top: `${shareButtonPosition.y}px`,
            transform: 'translate(-50%, -100%)'
          }}
          aria-label={t('bible.shareSelection')}
        >
          <Share2 className="w-5 h-5" />
        </button>
      )}

      {/* Modal de partage - Optimisé mobile */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
          <div className="bg-white rounded-t-2xl sm:rounded-2xl max-w-md w-full max-h-[85vh] overflow-y-auto">
            {/* Header compact */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 sm:p-4 rounded-t-2xl text-center">
              <div className="text-white font-bold text-base sm:text-lg">Partager</div>
              <div className="text-blue-100 text-xs sm:text-sm">
                Jean {currentChapter}{selectedVerse?.number ? `:${selectedVerse.number}` : ''}
              </div>
            </div>

            {/* Contenu du verset - Compact */}
            <div className="p-3 sm:p-4 bg-gradient-to-br from-blue-50 to-purple-50">
              <div className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border-l-4 border-blue-500">
                <div className="text-gray-800 text-sm sm:text-base leading-relaxed mb-2">
                  "{selectedText || (selectedVerse?.text ? formatTextByLanguage(selectedVerse.text, language) : '')}"
                </div>
                <div className="text-blue-600 font-semibold text-xs sm:text-sm">
                  — Jean {currentChapter}{selectedVerse?.number ? `:${selectedVerse.number}` : ''}
                </div>
              </div>
            </div>

            {/* Options de partage - Compactes */}
            <div className="p-3 sm:p-4 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => copyToClipboard(selectedVerse)}
                  className="flex items-center justify-center gap-2 p-3 bg-green-600 active:bg-green-700 text-white rounded-lg transition-colors"
                >
                  <Copy className="w-4 h-4" />
                  <span className="font-medium text-sm">Copier</span>
                </button>
                
                <button
                  onClick={() => downloadImage(selectedVerse)}
                  className="flex items-center justify-center gap-2 p-3 bg-purple-600 active:bg-purple-700 text-white rounded-lg transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span className="font-medium text-sm">Image</span>
                </button>
              </div>
            </div>

            {/* Bouton fermer - Compact */}
            <div className="p-3 sm:p-4 pt-0">
              <button
                onClick={() => {
                  setShowShareModal(false);
                  setSelectedVerse(null);
                }}
                className="w-full p-2.5 bg-gray-100 active:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium text-sm"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JohnBibleReader;