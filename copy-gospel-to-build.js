/**
 * Script post-build pour copier les MP3 gospel à la racine pour itch.io
 * Itch.io bloque les MP3s dans les sous-dossiers avec erreur 403
 */

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.join(__dirname, 'public', 'gospel');
const destDir = path.join(__dirname, 'build');

async function copyGospelFiles() {
  try {
    console.log('🎵 ITCH.IO BUILD - Copie des MP3 à la racine...');
    
    // Vérifier si le dossier source existe
    if (!fs.existsSync(sourceDir)) {
      console.warn('⚠️  Le dossier public/gospel/ n\'existe pas');
      return;
    }
    
    // Copier les MP3 à la racine du build
    const files = fs.readdirSync(sourceDir);
    let mp3Count = 0;
    
    for (const file of files) {
      const srcPath = path.join(sourceDir, file);
      const destPath = path.join(destDir, file);
      
      if (file.endsWith('.mp3')) {
        await fs.copy(srcPath, destPath, { overwrite: true });
        mp3Count++;
      }
    }
    
    console.log(`✅ ${mp3Count} MP3 copiés à la racine de build/`);
    console.log('🎮 Structure optimisée pour itch.io (contournement erreur 403)');
    
  } catch (error) {
    console.error('❌ Erreur lors de la copie:', error.message);
    process.exit(1);
  }
}

copyGospelFiles();
