# PROMPT POUR CLAUDE - TRADUCTION STRONG FR → ES

## CONTEXTE
Tu es un traducteur expert spécialisé en textes bibliques et théologiques. Tu dois traduire un fichier JavaScript contenant des définitions du dictionnaire Strong des numéros grecs et hébreux, du français vers l'espagnol.

## FICHIER SOURCE
Le fichier `strongTranslationsFR.js` contient 180 entrées avec cette structure:
```javascript
"G25": {
  m: "aimer d'un amour divin et inconditionnel",
  d: "Aimer avec un amour désintéressé, sacrificiel et divin. C'est l'amour de Dieu pour l'humanité et l'amour que nous devons avoir les uns pour les autres.",
  u: "Utilisé 143 fois dans le NT. Décrit l'amour divin, parfait et inconditionnel.",
  e: "De ἄγω (ago) = conduire, diriger vers le bien"
}
```

Où:
- **m** = meaning (signification courte, 2-8 mots)
- **d** = definition (définition détaillée, 1-3 phrases)
- **u** = usage (contexte d'usage biblique)
- **e** = etymology (étymologie du mot grec/hébreu)

## INSTRUCTIONS DE TRADUCTION

### 1. RÈGLES GÉNÉRALES
- Traduis UNIQUEMENT les valeurs entre guillemets (le contenu français)
- NE TOUCHE PAS à la structure JavaScript, aux clés (m, d, u, e), aux Strong IDs (G11, H120, etc.)
- GARDE les caractères grecs/hébreux exactement tels quels (ἄγω, אַבְרָהָם, etc.)
- GARDE les références bibliques (1 Cor 1:28, Juan 1:1, etc.)
- GARDE les chiffres et statistiques (143 fois, 2600 veces, etc.)

### 2. TRADUCTIONS STANDARDS À UTILISER

**Formules bibliques courantes:**
- "Utilisé X fois dans le NT" → "Usado X veces en el NT"
- "Utilisé X fois dans l'AT" → "Usado X veces en el AT"
- "De l'hébreu" → "Del hebreo"
- "racine primitive" → "raíz primitiva"
- "Raíz primaria" pour "Raíz primaria"

**Termes théologiques:**
- Dieu → Dios
- Jésus → Jesús
- Jésus-Christ → Jesucristo
- Christ → Cristo
- Seigneur → Señor
- Esprit Saint → Espíritu Santo
- Père → Padre
- Fils → Hijo
- bien-aimé → amado
- ange/anges → ángel/ángeles

**Concepts bibliques:**
- amour divin → amor divino
- vie éternelle → vida eterna
- royaume de Dieu → reino de Dios
- parole de Dieu → palabra de Dios
- peuple de Dieu → pueblo de Dios
- alliance → alianza/pacto
- salut → salvación
- rédemption → redención
- grâce → gracia
- miséricorde → misericordia
- justice → justicia
- vérité → verdad
- foi → fe
- espérance → esperanza

### 3. STYLE ET QUALITÉ
- Utilise un **espagnol théologique précis et naturel**
- Pour les Strong grecs (G), c'est du Nouveau Testament → contexte chrétien
- Pour les Strong hébreux (H), c'est de l'Ancien Testament → contexte judaïque
- RESPECTE les nuances: "désintéressé" ≠ "desinteresado" mais plutôt contexte complet
- Les définitions doivent sonner naturelles en espagnol, pas comme une traduction mot-à-mot

### 4. EXEMPLES DE TRADUCTION ATTENDUE

**Exemple 1:**
```javascript
// FRANÇAIS
"G26": {
  m: "amour divin, charité",
  d: "L'amour parfait de Dieu ; amour fraternel, affection, bonne volonté, charité. L'amour qui unit Dieu et l'homme, et l'homme à son prochain.",
  u: "Utilisé 116 fois dans le NT. Le mot central du christianisme pour décrire l'amour divin.",
  e: "Dérivé de ἀγαπάω (agapao)"
}

// ESPAGNOL (attendu)
"G26": {
  m: "amor divino, caridad",
  d: "El amor perfecto de Dios; amor fraternal, afecto, buena voluntad, caridad. El amor que une a Dios y al hombre, y al hombre con su prójimo.",
  u: "Usado 116 veces en el NT. La palabra central del cristianismo para describir el amor divino.",
  e: "Derivado de ἀγαπάω (agapao)"
}
```

**Exemple 2:**
```javascript
// FRANÇAIS
"H7462": {
  m: "paître, faire paître, nourrir",
  d: "Paître les brebis, faire paître ; nourrir, prendre soin.",
  u: "Utilisé 173 fois dans l'AT. L'Éternel est mon berger.",
  e: "Racine primitive"
}

// ESPAGNOL (attendu)
"H7462": {
  m: "pastorear, apacentar, alimentar",
  d: "Pastorear ovejas, apacentar; alimentar, cuidar.",
  u: "Usado 173 veces en el AT. El SEÑOR es mi pastor.",
  e: "Raíz primaria"
}
```

### 5. POINTS D'ATTENTION SPÉCIFIQUES
- **NT** = Nuevo Testamento (garde l'abréviation NT)
- **AT** = Antiguo Testamento (garde l'abréviation AT)
- "L'Éternel" / "Yahvé" → "Yahvé" / "el SEÑOR" selon contexte
- Les noms propres: Abraham, Moïse → Abraham, Moisés (accentuation espagnole)
- "Le Fils de l'homme" → "El Hijo del Hombre"
- "Agneau de Dieu" → "Cordero de Dios"

## TÂCHE
Je vais te fournir le contenu complet du fichier `strongTranslationsFR.js`.

**Tu dois:**
1. Lire attentivement chaque entrée (les 180)
2. Traduire avec précision et naturel vers l'espagnol
3. Me retourner le fichier COMPLET avec:
   - L'export changé: `export const strongTranslationsES = {`
   - Toutes les 180 entrées traduites
   - L'export par défaut: `export default strongTranslationsES;`

**Format de réponse attendu:**
Retourne-moi directement le code JavaScript complet, prêt à être copié-collé dans le fichier `strongTranslationsES.js`.

---

## FICHIER À TRADUIRE

[COLLE ICI LE CONTENU COMPLET DE strongTranslationsFR.js]

---

## VÉRIFICATIONS FINALES
Avant de me retourner le résultat, vérifie que:
- ✅ Toutes les 180 entrées sont présentes (G11 à G5590, H120 à H8414)
- ✅ La structure JavaScript est valide (accolades, virgules, guillemets)
- ✅ Les caractères grecs/hébreux sont intacts
- ✅ Les Strong IDs n'ont pas changé
- ✅ L'export est bien `strongTranslationsES`
- ✅ Aucune entrée n'a été dupliquée ou omise

Retourne-moi le fichier complet prêt à l'emploi!
