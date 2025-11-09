const fs = require('fs');
const path = require('path');

console.log('🎨 Générateur d\'icônes FaithChronicles\n');

// Créer les tailles d'icônes nécessaires
const sizes = [16, 32, 48, 72, 96, 128, 144, 152, 192, 384, 512];

// Message pour l'utilisateur
console.log('📋 Instructions pour générer les icônes PNG:');
console.log('');
console.log('Option 1 - Avec un navigateur moderne:');
console.log('  1. Ouvrez le fichier logo-generator.html dans votre navigateur');
console.log('  2. Cliquez sur "Télécharger toutes les icônes"');
console.log('  3. Placez les fichiers dans le dossier public/');
console.log('');
console.log('Option 2 - Avec un outil en ligne:');
console.log('  1. Allez sur https://realfavicongenerator.net/');
console.log('  2. Uploadez le fichier public/logo.svg');
console.log('  3. Téléchargez le package d\'icônes généré');
console.log('  4. Extrayez dans le dossier public/');
console.log('');
console.log('Option 3 - Avec ImageMagick (ligne de commande):');
console.log('  Exécutez ces commandes dans votre terminal:');
console.log('');

sizes.forEach(size => {
  console.log(`  convert -density 300 -background none public/logo.svg -resize ${size}x${size} public/icon-${size}x${size}.png`);
});

console.log('');
console.log('📱 Tailles d\'icônes recommandées:');
console.log('  • 16x16   - Favicon navigateur (petite)');
console.log('  • 32x32   - Favicon navigateur (standard)');
console.log('  • 192x192 - Android/Chrome');
console.log('  • 512x512 - PWA/Apple Touch');
console.log('');

// Créer un fichier de configuration pour les icônes
const iconConfig = {
  name: "FaithChronicles",
  shortName: "FaithChronicles",
  description: "Chronicles of Love - Un voyage spirituel à travers les religions",
  themeColor: "#667eea",
  backgroundColor: "#ffffff",
  icons: sizes.map(size => ({
    src: `icon-${size}x${size}.png`,
    sizes: `${size}x${size}`,
    type: "image/png",
    purpose: size >= 192 ? "any maskable" : "any"
  }))
};

const outputPath = path.join(__dirname, '../public/icons-config.json');
fs.writeFileSync(outputPath, JSON.stringify(iconConfig, null, 2));

console.log('✅ Configuration des icônes créée: public/icons-config.json');
console.log('');
console.log('🚀 Prochaines étapes:');
console.log('  1. Générez les PNG avec l\'une des options ci-dessus');
console.log('  2. Mettez à jour public/manifest.json');
console.log('  3. Ajoutez les liens favicon dans public/index.html');
console.log('');
console.log('💡 Astuce: Ouvrez LOGO_README.md pour le guide complet!');
