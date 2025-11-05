# -*- coding: utf-8 -*-
"""
Script pour extraire manuellement le texte hébreu de Jean 7-21
IMPORTANT : Vous devez copier le texte hébreu depuis Bible.com et le coller ici
Source : https://www.bible.com/bible/323/JHN.X.HHH (remplacer X par le numéro de chapitre)
"""

import os
import json

# ============================================================================
# INSTRUCTIONS
# ============================================================================
# 1. Visitez https://www.bible.com/bible/323/JHN.7.HHH
# 2. Copiez TOUT le texte hébreu (tous les versets)
# 3. Collez-le dans la variable hebrew_text_raw ci-dessous
# 4. Exécutez : python scripts/extract_hebrew_manual.py
# ============================================================================

def create_hebrew_chapter(chapter_num, verses_data):
    """Crée un fichier JavaScript pour un chapitre hébreu"""
    
    chapter_str = f"{chapter_num:02d}"
    filename = f"john-{chapter_str}-he.js"
    filepath = os.path.join("src", "data", "bible", "gospel", "john", "chapters", filename)
    
    # Header du fichier
    content = f"""// ============================================================================
// ÉVANGILE DE JEAN - Delitzsch Hebrew Gospels (הברית החדשה)
// ============================================================================
// Chapitre {chapter_num}

export const johnChapter{chapter_num}HE = {{
  chapter: {chapter_num},
  title: "Jean {chapter_num}",
  version: "Delitzsch Hebrew Gospels",
  language: "he",
  direction: "rtl",
  verses: [
"""
    
    # Ajouter chaque verset
    for i, verse_text in enumerate(verses_data, 1):
        # Échapper les guillemets
        verse_text_escaped = verse_text.replace('"', '\\"')
        
        content += f"""    {{
      "number": {i},
      "text": "{verse_text_escaped}",
      "strong": []
    }}"""
        
        if i < len(verses_data):
            content += ","
        content += "\n"
    
    # Footer du fichier
    content += f"""  ]
}};

export default johnChapter{chapter_num}HE;
"""
    
    # Écrire le fichier
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f"✅ {filename} créé ({len(verses_data)} versets)")


# ============================================================================
# MÉTHODE 1 : Utiliser ce template pour chaque chapitre
# ============================================================================
def fill_chapter_from_text(chapter_num, hebrew_text_raw):
    """
    Extraire les versets depuis le texte hébreu brut
    Le texte doit être au format : "1 texte du verset 1 2 texte du verset 2..."
    """
    lines = hebrew_text_raw.strip().split('\n')
    verses = []
    current_verse = ""
    
    for line in lines:
        line = line.strip()
        if line:
            current_verse += " " + line if current_verse else line
    
    # Si le texte contient les numéros de versets
    # Vous devrez peut-être ajuster cette logique selon le format exact
    
    return verses


# ============================================================================
# MÉTHODE 2 : Entrer directement les versets (RECOMMANDÉ)
# ============================================================================

# EXEMPLE pour Jean 7 - Remplacez par le texte réel depuis Bible.com
jean_7_versets = [
    # Copiez chaque verset ici depuis https://www.bible.com/bible/323/JHN.7.HHH
    # Format : "texte hébreu du verset 1",
    # "texte hébreu du verset 2",
    # ... jusqu'au verset 53
]

# ============================================================================
# FONCTION PRINCIPALE
# ============================================================================
def main():
    print("🚀 Extraction manuelle des chapitres hébreux 7-21\n")
    print("⚠️  IMPORTANT : Ce script est un template")
    print("📝 Vous devez :")
    print("   1. Visiter https://www.bible.com/bible/323/JHN.7.HHH")
    print("   2. Copier le texte hébreu de chaque verset")
    print("   3. Le coller dans ce script (variable jean_X_versets)")
    print("   4. Répéter pour chaque chapitre 7-21")
    print("   5. Exécuter ce script\n")
    
    print("📌 Alternative plus rapide :")
    print("   Utilisez Claude.ai avec le prompt PROMPT_CLAUDE_EXTRACTION_BIBLE.md")
    print("   Claude peut extraire automatiquement le texte depuis les URLs\n")
    
    # Si vous avez rempli jean_7_versets, décommentez cette ligne :
    # create_hebrew_chapter(7, jean_7_versets)
    
    print("⏸️  Script en attente - Veuillez ajouter les données textuelles")
    print("💡 Conseil : Utilisez Claude.ai pour gagner du temps !")

if __name__ == "__main__":
    main()
