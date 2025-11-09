// ============================================================================
// VERSE IMAGE GENERATOR - Générateur d'images de versets pour réseaux sociaux
// ============================================================================
// Crée des images JPG partageables avec design géométrique et hashtags

import React, { useRef, useEffect, useState } from 'react';
import { Download, X } from 'lucide-react';
import useTranslation from '../hooks/useTranslation.js';

const VerseImageGenerator = ({ verse, chapterNumber, onClose, show }) => {
  const canvasRef = useRef(null);
  const { t, currentLanguage } = useTranslation();
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Dessiner l'image sur le canvas
  useEffect(() => {
    if (!show || !verse || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Dimensions Instagram Square (1080x1080)
    canvas.width = 1080;
    canvas.height = 1080;
    
    // Fond gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#4158D0');
    gradient.addColorStop(0.5, '#C850C0');
    gradient.addColorStop(1, '#FFCC70');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Overlay semi-transparent pour améliorer la lisibilité
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // ===== DÉCORATIONS GÉOMÉTRIQUES =====
    
    // Fonction pour dessiner un cœur géométrique
    const drawGeometricHeart = (x, y, size, color, opacity = 0.15) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.beginPath();
      // Triangle inversé (pointe du cœur)
      ctx.moveTo(x, y + size * 0.3);
      ctx.lineTo(x - size * 0.5, y - size * 0.2);
      ctx.lineTo(x + size * 0.5, y - size * 0.2);
      ctx.closePath();
      ctx.stroke();
      // Deux cercles en haut
      ctx.beginPath();
      ctx.arc(x - size * 0.25, y - size * 0.3, size * 0.2, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(x + size * 0.25, y - size * 0.3, size * 0.2, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    };
    
    // Fonction pour dessiner une fleur géométrique
    const drawGeometricFlower = (x, y, size, color, opacity = 0.15) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      // 6 pétales en forme de losange
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI * 2 * i) / 6;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.moveTo(0, -size * 0.3);
        ctx.lineTo(size * 0.15, 0);
        ctx.lineTo(0, size * 0.3);
        ctx.lineTo(-size * 0.15, 0);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
      }
      // Centre
      ctx.beginPath();
      ctx.arc(x, y, size * 0.15, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };
    
    // Fonction pour dessiner une étoile géométrique
    const drawGeometricStar = (x, y, size, color, opacity = 0.12) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 * i) / 8;
        const radius = i % 2 === 0 ? size : size * 0.4;
        const px = x + Math.cos(angle) * radius;
        const py = y + Math.sin(angle) * radius;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    };
    
    // Dessiner les décorations de fond
    drawGeometricHeart(150, 200, 100, '#ffffff', 0.1);
    drawGeometricFlower(900, 250, 80, '#ffffff', 0.12);
    drawGeometricStar(200, 850, 60, '#ffffff', 0.08);
    drawGeometricHeart(850, 900, 90, '#ffffff', 0.1);
    drawGeometricFlower(100, 550, 70, '#ffffff', 0.1);
    drawGeometricStar(950, 600, 50, '#ffffff', 0.08);
    
    // ===== CADRE DÉCORATIF =====
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.strokeRect(60, 60, canvas.width - 120, canvas.height - 120);
    
    // Coins décoratifs
    const cornerSize = 30;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.lineWidth = 3;
    // Haut gauche
    ctx.beginPath();
    ctx.moveTo(60, 60 + cornerSize);
    ctx.lineTo(60, 60);
    ctx.lineTo(60 + cornerSize, 60);
    ctx.stroke();
    // Haut droit
    ctx.beginPath();
    ctx.moveTo(canvas.width - 60 - cornerSize, 60);
    ctx.lineTo(canvas.width - 60, 60);
    ctx.lineTo(canvas.width - 60, 60 + cornerSize);
    ctx.stroke();
    // Bas gauche
    ctx.beginPath();
    ctx.moveTo(60, canvas.height - 60 - cornerSize);
    ctx.lineTo(60, canvas.height - 60);
    ctx.lineTo(60 + cornerSize, canvas.height - 60);
    ctx.stroke();
    // Bas droit
    ctx.beginPath();
    ctx.moveTo(canvas.width - 60 - cornerSize, canvas.height - 60);
    ctx.lineTo(canvas.width - 60, canvas.height - 60);
    ctx.lineTo(canvas.width - 60, canvas.height - 60 - cornerSize);
    ctx.stroke();
    
    // ===== TEXTE DU VERSET =====
    
    // Configuration du texte
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Icône citation (guillemets géométriques)
    ctx.save();
    ctx.globalAlpha = 0.2;
    ctx.font = 'bold 180px serif';
    ctx.fillText('"', 200, 300);
    ctx.restore();
    
    // Texte du verset (avec retour à la ligne automatique)
    const maxWidth = 800;
    const lineHeight = 70;
    let y = canvas.height / 2 - 100;
    
    ctx.font = 'bold 48px serif';
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    
    // Fonction pour découper le texte en lignes
    const wrapText = (text, maxWidth) => {
      const words = text.split(' ');
      const lines = [];
      let currentLine = words[0];
      
      for (let i = 1; i < words.length; i++) {
        const testLine = currentLine + ' ' + words[i];
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth) {
          lines.push(currentLine);
          currentLine = words[i];
        } else {
          currentLine = testLine;
        }
      }
      lines.push(currentLine);
      return lines;
    };
    
    const verseText = verse.text || '';
    const lines = wrapText(verseText, maxWidth);
    
    // Centrer verticalement l'ensemble du texte
    const totalHeight = lines.length * lineHeight;
    y = (canvas.height - totalHeight) / 2;
    
    lines.forEach((line, index) => {
      ctx.fillText(line, canvas.width / 2, y + index * lineHeight);
    });
    
    // ===== RÉFÉRENCE =====
    ctx.font = 'bold 42px sans-serif';
    ctx.fillStyle = '#FFD700';
    const reference = `${t('bible.john')} ${chapterNumber}:${verse.number}`;
    ctx.fillText(reference, canvas.width / 2, y + totalHeight + 80);
    
    // ===== HASHTAGS =====
    ctx.font = '32px sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.shadowBlur = 5;
    
    const hashtags = getHashtagsForLanguage(currentLanguage);
    const hashtagY = canvas.height - 150;
    ctx.fillText(hashtags, canvas.width / 2, hashtagY);
    
    // ===== LOGO/SIGNATURE =====
    ctx.font = 'bold 28px sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillText('Unity Quest • Chronicles of Love', canvas.width / 2, canvas.height - 80);
    
    // Émojis décoratifs en bas
    ctx.font = '36px sans-serif';
    ctx.fillText('♥ ✟ ✿', canvas.width / 2, canvas.height - 35);
    
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    
  }, [show, verse, chapterNumber, currentLanguage, t]);
  
  // Générer les hashtags selon la langue
  const getHashtagsForLanguage = (lang) => {
    const hashtagMap = {
      fr: '#Bible #Jean #Foi #Amour #Paix #Unité',
      en: '#Bible #John #Faith #Love #Peace #Unity',
      es: '#Biblia #Juan #Fe #Amor #Paz #Unidad',
      de: '#Bibel #Johannes #Glaube #Liebe #Frieden #Einheit',
      it: '#Bibbia #Giovanni #Fede #Amore #Pace #Unità',
      pt: '#Bíblia #João #Fé #Amor #Paz #Unidade',
      ru: '#Библия #Иоанн #Вера #Любовь #Мир #Единство',
      uk: '#Біблія #Іван #Віра #Любов #Мир #Єдність',
      zh: '#圣经 #约翰 #信仰 #爱 #和平 #团结',
      ar: '#الكتاب_المقدس #يوحنا #إيمان #حب #سلام #وحدة',
      he: '#תנך #יוחנן #אמונה #אהבה #שלום #אחדות',
      jp: '#聖書 #ヨハネ #信仰 #愛 #平和 #団結',
      ko: '#성경 #요한 #믿음 #사랑 #평화 #통일',
      hi: '#बाइबल #यूहन्ना #विश्वास #प्रेम #शांति #एकता',
      sw: '#Biblia #Yohana #Imani #Upendo #Amani #Umoja',
      pl: '#Biblia #Jan #Wiara #Miłość #Pokój #Jedność',
      rc: '#Biblia #Yoane #Kondima #Bolingo #Kimia #Bomoko'
    };
    return hashtagMap[lang] || hashtagMap['en'];
  };
  
  // Télécharger l'image en JPG
  const downloadImage = () => {
    if (!canvasRef.current) return;
    
    setIsGenerating(true);
    
    // Attendre un frame pour que le canvas soit bien rendu
    setTimeout(() => {
      const canvas = canvasRef.current;
      
      // Créer un nouveau canvas pour JPG (sans transparence)
      const jpgCanvas = document.createElement('canvas');
      jpgCanvas.width = canvas.width;
      jpgCanvas.height = canvas.height;
      const jpgCtx = jpgCanvas.getContext('2d');
      
      // Fond blanc (pour JPG)
      jpgCtx.fillStyle = '#ffffff';
      jpgCtx.fillRect(0, 0, jpgCanvas.width, jpgCanvas.height);
      
      // Copier le canvas original
      jpgCtx.drawImage(canvas, 0, 0);
      
      // Télécharger en JPG
      jpgCanvas.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        const filename = `john-${chapterNumber}-${verse.number}-${currentLanguage}.jpg`;
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        setIsGenerating(false);
      }, 'image/jpeg', 0.95);
    }, 100);
  };
  
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 rounded-t-2xl flex items-center justify-between">
          <div>
            <h3 className="text-white font-bold text-lg">{t('bible.image')}</h3>
            <p className="text-purple-100 text-sm">
              {t('bible.john')} {chapterNumber}:{verse.number}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
        
        {/* Preview Canvas */}
        <div className="p-6 bg-gray-50">
          <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
            <canvas
              ref={canvasRef}
              className="w-full h-auto rounded-lg"
              style={{ maxHeight: '500px', objectFit: 'contain' }}
            />
          </div>
          
          {/* Info */}
          <div className="text-center text-sm text-gray-600 mb-4">
            <p>📱 Format: 1080x1080px (Instagram)</p>
            <p>💾 Type: JPEG • Qualité: 95%</p>
          </div>
          
          {/* Download Button */}
          <button
            onClick={downloadImage}
            disabled={isGenerating}
            className="w-full flex items-center justify-center gap-3 p-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Download className="w-6 h-6" />
            <span>
              {isGenerating ? 'Génération...' : `${t('bible.image')} JPG`}
            </span>
          </button>
          
          {/* Social Media Tips */}
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
              📱 {currentLanguage === 'fr' ? 'Conseils partage' : 'Sharing tips'}
            </h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>✓ {currentLanguage === 'fr' ? 'Format optimisé pour Instagram' : 'Optimized for Instagram'}</li>
              <li>✓ {currentLanguage === 'fr' ? 'Hashtags inclus dans l\'image' : 'Hashtags included in image'}</li>
              <li>✓ {currentLanguage === 'fr' ? 'Partageable sur tous les réseaux' : 'Shareable on all networks'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerseImageGenerator;
