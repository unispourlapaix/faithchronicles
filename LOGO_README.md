# 🎨 Logo & Icônes FaithChronicles

## 📋 Description

Le logo de **FaithChronicles** (aussi connu sous le nom d'**UnityQuest**) représente l'unité et la paix entre toutes les religions à travers un symbole de croix/plus moderne et lumineux.

### Symbolisme

- **La Croix/Plus (+)** : Représente l'union, l'addition, l'unité
- **Gradient Violet-Rose** : Spiritualité, sagesse et amour universel
- **Lumière Centrale** : La vérité divine commune à toutes les religions
- **Particules Lumineuses** : Les différentes religions qui brillent ensemble

## 🎯 Fichiers Disponibles

### Logo Vectoriel
- `public/logo.svg` - Logo SVG animé (utilisé dans l'application)

### Icônes PNG
- `icon-16x16.png` - Favicon petite taille
- `icon-32x32.png` - Favicon standard
- `icon-192x192.png` - Icône Android/PWA
- `icon-512x512.png` - Icône PWA haute résolution
- `favicon.ico` - Format ICO pour compatibilité navigateurs

## 🛠️ Génération des Icônes

### Option 1 : Générateur HTML (Recommandé)

1. Ouvrez `logo-generator.html` dans votre navigateur
2. Cliquez sur "📥 Télécharger toutes les icônes"
3. Placez les fichiers téléchargés dans le dossier `public/`

### Option 2 : Conversion Manuelle

Si vous avez ImageMagick ou un outil similaire :

```bash
# Convertir SVG en PNG
convert -density 300 -background none public/logo.svg -resize 512x512 public/icon-512x512.png
convert -density 300 -background none public/logo.svg -resize 192x192 public/icon-192x192.png
convert -density 300 -background none public/logo.svg -resize 32x32 public/icon-32x32.png
convert -density 300 -background none public/logo.svg -resize 16x16 public/icon-16x16.png

# Créer favicon.ico
convert public/icon-32x32.png public/favicon.ico
```

## 📱 Intégration dans l'Application

### 1. Fichier `public/index.html`

Ajoutez dans le `<head>` :

```html
<!-- Favicon -->
<link rel="icon" type="image/x-icon" href="%PUBLIC_URL%/favicon.ico" />
<link rel="icon" type="image/png" sizes="32x32" href="%PUBLIC_URL%/icon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="%PUBLIC_URL%/icon-16x16.png" />

<!-- Apple Touch Icons -->
<link rel="apple-touch-icon" sizes="192x192" href="%PUBLIC_URL%/icon-192x192.png" />

<!-- Logo SVG -->
<link rel="icon" type="image/svg+xml" href="%PUBLIC_URL%/logo.svg" />
```

### 2. Fichier `public/manifest.json`

Mettez à jour les icônes :

```json
{
  "name": "FaithChronicles - UnityQuest",
  "short_name": "FaithChronicles",
  "description": "Chronicles of Love - Un voyage spirituel à travers les religions",
  "icons": [
    {
      "src": "icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#667eea",
  "background_color": "#ffffff"
}
```

### 3. Utilisation dans React

```jsx
// Dans MenuScreen ou autre composant
<img src="/logo.svg" alt="FaithChronicles Logo" className="w-32 h-32" />
```

## 🎨 Palette de Couleurs

### Couleurs Principales
- **Violet Principal** : `#667eea`
- **Violet Foncé** : `#764ba2`
- **Rose Clair** : `#f093fb`

### Couleurs Secondaires
- **Blanc Pur** : `#ffffff`
- **Gris Clair** : `#f3f4f6`

### Dégradés
```css
/* Gradient de fond */
background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);

/* Gradient croix */
background: linear-gradient(135deg, #ffffff 0%, #f3f4f6 100%);
```

## 📐 Spécifications Techniques

### Dimensions
- **Logo Principal** : 512x512px (carré)
- **Ratio** : 1:1 (toujours carré)
- **Format** : SVG (vectoriel) + PNG (raster)

### Espace de Sécurité
- Marges minimales : 10% sur tous les côtés
- Zone de protection : Ne pas placer d'éléments à moins de 20px du logo

### Variations

#### Logo Complet (Actuel)
- Fond gradient avec croix blanche
- Utilisé : Menu principal, écrans de chargement

#### Logo Simplifié (À créer si besoin)
- Croix seule sans fond
- Utilisé : Navigation, badges, icônes petite taille

## 🚀 Guide d'Utilisation

### Quand utiliser le logo SVG ?
- ✅ Dans l'application web (scaling parfait)
- ✅ Pour les impressions haute qualité
- ✅ Animations et effets interactifs

### Quand utiliser les PNG ?
- ✅ Favicons navigateurs
- ✅ Icônes d'application mobile
- ✅ Partages sur réseaux sociaux
- ✅ Compatibilité maximale

## 📝 Notes de Design

1. **Accessibilité** : Le contraste blanc sur gradient violet respecte les normes WCAG
2. **Responsive** : Le logo est lisible de 16px à 512px
3. **Animation** : Le SVG inclut des animations subtiles (pulsation du centre)
4. **Modernité** : Design flat avec depth subtile via ombres douces

## 🔄 Mises à Jour Futures

### Version 2.0 (Propositions)
- [ ] Logo horizontal avec texte "FaithChronicles"
- [ ] Variations monochromes (blanc, noir)
- [ ] Version animée GIF pour réseaux sociaux
- [ ] Stickers et emojis personnalisés

## 📞 Contact & Crédits

- **Créateur** : Emmanuel
- **Projet** : FaithChronicles - Chronicles of Love
- **Date** : Novembre 2025
- **Licence** : Propriétaire (tous droits réservés)

---

💜 *"L'unité qui produit la paix"* - Emmanuel
