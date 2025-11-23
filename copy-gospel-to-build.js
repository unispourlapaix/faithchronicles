/**
 * Script post-build pour copier les MP3 gospel au bon emplacement pour itch.io
 * Ce script copie public/gospel/ vers build/gospel/
 */

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sourceDir = path.join(__dirname, 'public', 'gospel');
const destDir = path.join(__dirname, 'build', 'gospel');

async function copyGospelFiles() {
  try {
    console.log('📁 Copie des fichiers gospel pour itch.io...');
    
    // Vérifier si le dossier source existe
    if (!fs.existsSync(sourceDir)) {
      console.warn('⚠️  Le dossier public/gospel/ n\'existe pas');
      return;
    }
    
    // Copier le dossier entier
    await fs.copy(sourceDir, destDir, { overwrite: true });
    
    // Compter les fichiers MP3 copiés
    const mp3Files = fs.readdirSync(destDir).filter(file => file.endsWith('.mp3'));
    
    console.log(`✅ ${mp3Files.length} fichiers MP3 copiés vers build/gospel/`);
    console.log('🎵 Structure optimisée pour itch.io (évite les erreurs 403)');
    
  } catch (error) {
    console.error('❌ Erreur lors de la copie:', error.message);
    process.exit(1);
  }
}

copyGospelFiles();
