#!/usr/bin/env python3
"""
Script de téléchargement de l'Évangile de Jean depuis Bible.com
Utilise requests et BeautifulSoup pour scraper le contenu
"""

import requests
from bs4 import BeautifulSoup
import json
import time

# Configuration
LANGUAGES = {
    'uk': {
        'bible_id': 143,
        'code': 'UKR',
        'name': 'Ukrainian Bible (Українська Біблія)',
        'version': 'Ukrainian Bible 1962',
        'direction': 'ltr'
    },
    'he': {
        'bible_id': 323,
        'code': 'HHH',
        'name': 'Delitzsch Hebrew Gospels (הברית החדשה)',
        'version': 'Delitzsch Hebrew Gospels',
        'direction': 'rtl'
    }
}

def download_chapter(bible_id, code, chapter_num):
    """Télécharge un chapitre depuis Bible.com"""
    url = f"https://www.bible.com/bible/{bible_id}/JHN.{chapter_num}.{code}"
    
    try:
        response = requests.get(url, headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Extraire les versets (à adapter selon la structure HTML de Bible.com)
        verses = []
        verse_elements = soup.find_all('span', class_='verse')  # À vérifier
        
        for verse_elem in verse_elements:
            verse_num = verse_elem.get('data-usfm')  # À vérifier
            verse_text = verse_elem.get_text(strip=True)
            
            verses.append({
                'number': int(verse_num),
                'text': verse_text,
                'strong': []
            })
        
        return verses
        
    except Exception as e:
        print(f"❌ Erreur chapitre {chapter_num}: {e}")
        return None

def generate_js_file(chapter_num, verses, lang_config, lang_code):
    """Génère le contenu du fichier JavaScript"""
    lang_upper = lang_code.upper()
    var_name = f"johnChapter{chapter_num}{lang_upper}"
    
    data = {
        'chapter': chapter_num,
        'title': f'Jean {chapter_num}',
        'version': lang_config['version'],
        'language': lang_code,
        'direction': lang_config['direction'],
        'verses': verses
    }
    
    js_content = f"""// ============================================================================
// ÉVANGILE DE JEAN - {lang_config['name']}
// ============================================================================
// Chapitre {chapter_num}

export const {var_name} = {json.dumps(data, ensure_ascii=False, indent=2)};

export default {var_name};
"""
    
    return js_content

def main():
    import sys
    
    if len(sys.argv) < 2:
        print("Usage: python download_bible.py [uk|he]")
        sys.exit(1)
    
    lang = sys.argv[1]
    if lang not in LANGUAGES:
        print(f"Langue non supportée: {lang}")
        sys.exit(1)
    
    lang_config = LANGUAGES[lang]
    print(f"🚀 Téléchargement: {lang_config['name']}")
    print("=" * 60)
    
    for chapter in range(1, 22):  # Jean 1-21
        print(f"\n  Chapitre {chapter}...")
        
        verses = download_chapter(
            lang_config['bible_id'],
            lang_config['code'],
            chapter
        )
        
        if not verses:
            print(f"  ⚠️  Échec")
            continue
        
        # Générer le fichier
        js_content = generate_js_file(chapter, verses, lang_config, lang)
        filename = f"john-{str(chapter).zfill(2)}-{lang}.js"
        
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(js_content)
        
        print(f"  ✅ {len(verses)} versets - {filename}")
        
        # Pause pour éviter surcharge
        time.sleep(1)
    
    print("\n" + "=" * 60)
    print("✅ Terminé!")
    print(f"\n💡 Prochaine étape: npm run add-strong {lang}")

if __name__ == '__main__':
    main()
