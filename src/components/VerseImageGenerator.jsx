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
  const [format, setFormat] = useState('instagram'); // 'instagram' or 'facebook'
  const [colorScheme, setColorScheme] = useState('purple'); // 'purple', 'blue', 'green', 'orange', 'pink'
  
  // Schémas de couleurs
  const colorSchemes = {
    purple: {
      gradient: ['#4158D0', '#C850C0', '#FFCC70'],
      accent: '#FFD700',
      shapes: '#ffffff'
    },
    blue: {
      gradient: ['#2E3192', '#1BFFFF', '#00C9FF'],
      accent: '#FFD700',
      shapes: '#ffffff'
    },
    green: {
      gradient: ['#134E5E', '#71B280', '#C9E265'],
      accent: '#FFD700',
      shapes: '#ffffff'
    },
    orange: {
      gradient: ['#FC4A1A', '#F7B733', '#FFE066'],
      accent: '#FFFFFF',
      shapes: '#ffffff'
    },
    pink: {
      gradient: ['#F093FB', '#F5576C', '#FED766'],
      accent: '#FFFFFF',
      shapes: '#ffffff'
    }
  };
  
  const currentColors = colorSchemes[colorScheme];
  
  // Dessiner l'image sur le canvas
  useEffect(() => {
    if (!show || !verse || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Dimensions selon le format
    if (format === 'instagram') {
      canvas.width = 1080;
      canvas.height = 1080;
    } else {
      // Facebook portrait
      canvas.width = 1200;
      canvas.height = 630;
    }
    
    // Fond gradient avec les couleurs choisies
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, currentColors.gradient[0]);
    gradient.addColorStop(0.5, currentColors.gradient[1]);
    gradient.addColorStop(1, currentColors.gradient[2]);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Overlay de triangles géométriques en fond
    ctx.save();
    ctx.globalAlpha = 0.08;
    const triangleSize = 80;
    const spacing = 120;
    for (let x = 0; x < canvas.width + triangleSize; x += spacing) {
      for (let y = 0; y < canvas.height + triangleSize; y += spacing) {
        const offset = (y / spacing) % 2 === 0 ? spacing / 2 : 0;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x + offset, y - triangleSize / 2);
        ctx.lineTo(x + offset + triangleSize * 0.866, y + triangleSize / 2);
        ctx.lineTo(x + offset - triangleSize * 0.866, y + triangleSize / 2);
        ctx.closePath();
        ctx.stroke();
      }
    }
    ctx.restore();
    
    // Overlay semi-transparent pour améliorer la lisibilité
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // ===== DÉCORATIONS GÉOMÉTRIQUES ALÉATOIRES =====
    
    // Fonction pour dessiner un plus (+)
    const drawPlus = (x, y, size, color, opacity = 0.15) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      // Ligne verticale
      ctx.beginPath();
      ctx.moveTo(x, y - size);
      ctx.lineTo(x, y + size);
      ctx.stroke();
      // Ligne horizontale
      ctx.beginPath();
      ctx.moveTo(x - size, y);
      ctx.lineTo(x + size, y);
      ctx.stroke();
      ctx.restore();
    };
    
    // Fonction pour dessiner une étoile (*)
    const drawAsterisk = (x, y, size, color, opacity = 0.15) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';
      // 8 branches
      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 * i) / 8;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + Math.cos(angle) * size, y + Math.sin(angle) * size);
        ctx.stroke();
      }
      ctx.restore();
    };
    
    // Fonction pour dessiner un triangle géométrique
    const drawTriangle = (x, y, size, color, opacity = 0.15, rotation = 0) => {
      ctx.save();
      ctx.globalAlpha = opacity;
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.beginPath();
      // Triangle équilatéral
      ctx.moveTo(0, -size);
      ctx.lineTo(size * 0.866, size * 0.5);
      ctx.lineTo(-size * 0.866, size * 0.5);
      ctx.closePath();
      ctx.stroke();
      ctx.restore();
    };
    
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
    
    // Générer des positions aléatoires mais déterministes (basées sur le verset)
    const seed = verse.number * chapterNumber;
    const random = (min, max, offset = 0) => {
      const x = Math.sin(seed + offset) * 10000;
      return min + (x - Math.floor(x)) * (max - min);
    };
    
    // Adapter le nombre de décorations selon le format
    const numDecorations = format === 'facebook' ? 12 : 25; // Moins en portrait
    
    // Ajouter des + et * aléatoirement
    const shapeColor = currentColors.shapes;
    for (let i = 0; i < numDecorations; i++) {
      let x = random(100, canvas.width - 100, i * 7);
      let y = random(100, canvas.height - 100, i * 11);
      
      // En portrait Facebook, éviter le centre (zone de texte)
      if (format === 'facebook') {
        const centerY = canvas.height / 2;
        const textZoneHeight = 350; // Zone à éviter autour du texte
        
        // Si trop proche du centre, déplacer vers les bords
        if (Math.abs(y - centerY) < textZoneHeight / 2) {
          if (y < centerY) {
            y = random(80, 150, i * 19); // En haut
          } else {
            y = random(canvas.height - 150, canvas.height - 80, i * 23); // En bas
          }
        }
      }
      
      const size = random(15, 35, i * 13);
      const opacity = random(0.05, 0.15, i * 17);
      const rotation = random(0, Math.PI * 2, i * 29);
      
      const shapeType = i % 3; // 3 types de formes
      if (shapeType === 0) {
        drawPlus(x, y, size, shapeColor, opacity);
      } else if (shapeType === 1) {
        drawAsterisk(x, y, size, shapeColor, opacity);
      } else {
        drawTriangle(x, y, size * 0.8, shapeColor, opacity, rotation);
      }
    }
    
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
    
    // Disposition différente selon le format
    if (format === 'facebook') {
      // MODE PORTRAIT: Titre en haut, verset au centre, hashtags en bas
      
      // Titre en haut
      ctx.font = 'bold 36px sans-serif';
      ctx.fillStyle = currentColors.accent;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      ctx.fillText('Unity Quest • Chronicles of Love', canvas.width / 2, 120);
      
      // Référence biblique (sous le titre)
      ctx.font = 'bold 32px sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      const reference = `${t('bible.john')} ${chapterNumber}:${verse.number}`;
      ctx.fillText(reference, canvas.width / 2, 170);
      
      // Texte du verset au centre
      const maxWidth = canvas.width - 200; // Plus large en portrait
      const lineHeight = 55;
      
      ctx.font = 'bold 42px serif';
      ctx.fillStyle = '#ffffff';
      
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
      
      // Centrer verticalement le texte
      const totalHeight = lines.length * lineHeight;
      let y = (canvas.height - totalHeight) / 2 + 30; // Légèrement décalé vers le bas
      
      lines.forEach((line, index) => {
        ctx.fillText(line, canvas.width / 2, y + index * lineHeight);
      });
      
      // Hashtags en bas
      ctx.font = '28px sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.shadowBlur = 5;
      const hashtags = getHashtagsForLanguage(currentLanguage);
      ctx.fillText(hashtags, canvas.width / 2, canvas.height - 100);
      
      // Émojis décoratifs en bas
      ctx.font = '32px sans-serif';
      ctx.fillText('♥ ✟ ✿', canvas.width / 2, canvas.height - 50);
      
    } else {
      // MODE CARRÉ: Disposition originale centrée
      
      // Icône citation (guillemets géométriques)
      ctx.save();
      ctx.globalAlpha = 0.2;
      ctx.font = 'bold 180px serif';
      ctx.fillText('"', 200, 300);
      ctx.restore();
      
      // Texte du verset (avec retour à la ligne automatique)
      const maxWidth = 800;
      const lineHeight = 70;
      
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
      let y = (canvas.height - totalHeight) / 2;
      
      lines.forEach((line, index) => {
        ctx.fillText(line, canvas.width / 2, y + index * lineHeight);
      });
      
      // Référence
      ctx.font = 'bold 42px sans-serif';
      ctx.fillStyle = currentColors.accent;
      const reference = `${t('bible.john')} ${chapterNumber}:${verse.number}`;
      ctx.fillText(reference, canvas.width / 2, y + totalHeight + 80);
      
      // Hashtags
      ctx.font = '32px sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.shadowBlur = 5;
      
      const hashtags = getHashtagsForLanguage(currentLanguage);
      const hashtagY = canvas.height - 150;
      ctx.fillText(hashtags, canvas.width / 2, hashtagY);
      
      // Logo/Signature
      ctx.font = 'bold 28px sans-serif';
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.fillText('Unity Quest • Chronicles of Love', canvas.width / 2, canvas.height - 80);
      
      // Émojis décoratifs en bas
      ctx.font = '36px sans-serif';
      ctx.fillText('♥ ✟ ✿', canvas.width / 2, canvas.height - 35);
    }
    
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    
  }, [show, verse, chapterNumber, currentLanguage, t, format, colorScheme]);
  
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
        const formatName = format === 'instagram' ? 'insta' : 'fb';
        const filename = `john-${chapterNumber}-${verse.number}-${formatName}-${currentLanguage}.jpg`;
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
          {/* Contrôles Format et Couleurs */}
          <div className="mb-4 space-y-3">
            {/* Format */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                📐 Format
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setFormat('instagram')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    format === 'instagram'
                      ? 'border-purple-600 bg-purple-50 text-purple-900'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-purple-300'
                  }`}
                >
                  <div className="font-bold text-sm">Instagram</div>
                  <div className="text-xs opacity-75">1080×1080 (Carré)</div>
                </button>
                <button
                  onClick={() => setFormat('facebook')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    format === 'facebook'
                      ? 'border-blue-600 bg-blue-50 text-blue-900'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-blue-300'
                  }`}
                >
                  <div className="font-bold text-sm">Facebook</div>
                  <div className="text-xs opacity-75">1200×630 (Portrait)</div>
                </button>
              </div>
            </div>
            
            {/* Couleurs */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🎨 Couleurs
              </label>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setColorScheme('purple')}
                  className={`w-12 h-12 rounded-full transition-all ${
                    colorScheme === 'purple' ? 'ring-4 ring-purple-400 scale-110' : 'hover:scale-105'
                  }`}
                  style={{ background: 'linear-gradient(135deg, #4158D0, #C850C0)' }}
                  title="Violet"
                />
                <button
                  onClick={() => setColorScheme('blue')}
                  className={`w-12 h-12 rounded-full transition-all ${
                    colorScheme === 'blue' ? 'ring-4 ring-blue-400 scale-110' : 'hover:scale-105'
                  }`}
                  style={{ background: 'linear-gradient(135deg, #2E3192, #1BFFFF)' }}
                  title="Bleu"
                />
                <button
                  onClick={() => setColorScheme('green')}
                  className={`w-12 h-12 rounded-full transition-all ${
                    colorScheme === 'green' ? 'ring-4 ring-green-400 scale-110' : 'hover:scale-105'
                  }`}
                  style={{ background: 'linear-gradient(135deg, #134E5E, #71B280)' }}
                  title="Vert"
                />
                <button
                  onClick={() => setColorScheme('orange')}
                  className={`w-12 h-12 rounded-full transition-all ${
                    colorScheme === 'orange' ? 'ring-4 ring-orange-400 scale-110' : 'hover:scale-105'
                  }`}
                  style={{ background: 'linear-gradient(135deg, #FC4A1A, #F7B733)' }}
                  title="Orange"
                />
                <button
                  onClick={() => setColorScheme('pink')}
                  className={`w-12 h-12 rounded-full transition-all ${
                    colorScheme === 'pink' ? 'ring-4 ring-pink-400 scale-110' : 'hover:scale-105'
                  }`}
                  style={{ background: 'linear-gradient(135deg, #F093FB, #F5576C)' }}
                  title="Rose"
                />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
            <canvas
              ref={canvasRef}
              className="w-full h-auto rounded-lg"
              style={{ maxHeight: '500px', objectFit: 'contain' }}
            />
          </div>
          
          {/* Info */}
          <div className="text-center text-sm text-gray-600 mb-4">
            <p>📱 Format: {format === 'instagram' ? '1080×1080px (Instagram)' : '1200×630px (Facebook)'}</p>
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
              <li>✓ {format === 'instagram' ? 'Instagram Post (carré)' : 'Facebook Post (portrait)'}</li>
              <li>✓ {currentLanguage === 'fr' ? 'Fond géométrique triangulaire' : 'Geometric triangle background'}</li>
              <li>✓ {currentLanguage === 'fr' ? 'Décorations aléatoires +, * et △' : 'Random +, * and △ decorations'}</li>
              <li>✓ {currentLanguage === 'fr' ? '5 thèmes de couleurs' : '5 color themes'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerseImageGenerator;
