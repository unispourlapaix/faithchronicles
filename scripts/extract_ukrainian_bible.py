"""
EXTRACTEUR AUTOMATIQUE - Bible.com vers JavaScript
====================================================
Utilise Playwright pour extraire automatiquement les 20 chapitres restants

Installation:
    pip install playwright
    playwright install chromium

Utilisation:
    python scripts/extract_ukrainian_bible.py
"""

import asyncio
import json
import re
from pathlib import Path
from playwright.async_api import async_playwright

# Configuration
BASE_URL = "https://www.bible.com/bible/143/JHN.{}.UKR"
START_CHAPTER = 2  # Jean 1 déjà fait
END_CHAPTER = 21
OUTPUT_DIR = Path(__file__).parent.parent / "src" / "data" / "bible" / "gospel" / "john" / "chapters"

def generate_js_file(chapter_num: int, verses: dict) -> str:
    """Génère le contenu du fichier JavaScript"""
    var_name = f"johnChapter{chapter_num}UK"
    
    verses_array = [
        {
            "number": int(num),
            "text": text,
            "strong": []
        }
        for num, text in verses.items()
    ]
    
    data = {
        "chapter": chapter_num,
        "title": f"Jean {chapter_num}",
        "version": "Ukrainian Bible 1962",
        "language": "uk",
        "direction": "ltr",
        "verses": verses_array
    }
    
    # Convertir en JSON avec indentation
    json_data = json.dumps(data, ensure_ascii=False, indent=2)
    
    content = f"""// ============================================================================
// ÉVANGILE DE JEAN - Ukrainian Bible (Українська Біблія)
// ============================================================================
// Chapitre {chapter_num}

export const {var_name} = {json_data};

export default {var_name};
"""
    
    return content

async def extract_chapter(page, chapter_num: int) -> dict:
    """Extrait un chapitre depuis Bible.com"""
    url = BASE_URL.format(chapter_num)
    print(f"📖 Extraction de Jean {chapter_num}...")
    
    try:
        await page.goto(url, wait_until="networkidle")
        await asyncio.sleep(2)  # Attendre le chargement complet
        
        # Méthode 1: Sélecteurs CSS standard
        verses = {}
        
        # Chercher tous les éléments de verset
        verse_elements = await page.query_selector_all("[data-usfm]")
        
        if not verse_elements:
            # Méthode alternative: par classe
            verse_elements = await page.query_selector_all(".verse, .ChapterContent_verse__")
        
        for verse_elem in verse_elements:
            # Extraire le numéro de verset
            verse_num_elem = await verse_elem.query_selector(".label, .verse-num, [class*='VerseNumber']")
            verse_text_elem = await verse_elem.query_selector(".content, .verse-text, [class*='VerseText']")
            
            if verse_num_elem and verse_text_elem:
                verse_num = await verse_num_elem.inner_text()
                verse_text = await verse_text_elem.inner_text()
                
                # Nettoyer
                verse_num = re.sub(r'[^\d]', '', verse_num)
                verse_text = verse_text.strip()
                
                if verse_num and verse_text:
                    verses[verse_num] = verse_text
        
        # Si aucune méthode n'a fonctionné, extraire le texte brut
        if not verses:
            print(f"⚠️ Méthode standard échouée, extraction du texte brut...")
            content = await page.inner_text(".ChapterContent, .chapter-content, main")
            
            # Parser manuellement (format: "1 Texte du verset...")
            lines = content.split('\n')
            for line in lines:
                match = re.match(r'^(\d+)\s+(.+)$', line.strip())
                if match:
                    verses[match.group(1)] = match.group(2)
        
        print(f"✅ Jean {chapter_num}: {len(verses)} versets extraits")
        return verses
        
    except Exception as e:
        print(f"❌ Erreur pour Jean {chapter_num}: {e}")
        return {}

async def main():
    """Fonction principale"""
    print("🚀 Démarrage de l'extraction automatique...")
    print(f"📚 Chapitres à extraire: {START_CHAPTER} à {END_CHAPTER}")
    
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    
    async with async_playwright() as p:
        # Lancer le navigateur (mode headless pour plus de vitesse)
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()
        
        for chapter in range(START_CHAPTER, END_CHAPTER + 1):
            verses = await extract_chapter(page, chapter)
            
            if verses:
                # Générer le fichier JavaScript
                js_content = generate_js_file(chapter, verses)
                
                # Sauvegarder
                filename = OUTPUT_DIR / f"john-{str(chapter).zfill(2)}-uk.js"
                filename.write_text(js_content, encoding='utf-8')
                
                print(f"💾 Sauvegardé: {filename.name}")
            else:
                print(f"⚠️ Aucun verset extrait pour Jean {chapter}")
            
            # Pause entre les requêtes
            await asyncio.sleep(1)
        
        await browser.close()
    
    print("\n✨ Extraction terminée !")
    print(f"📁 Fichiers créés dans: {OUTPUT_DIR}")
    print("\n💡 Prochaine étape:")
    print("   npm run add-strong uk")

if __name__ == "__main__":
    asyncio.run(main())
