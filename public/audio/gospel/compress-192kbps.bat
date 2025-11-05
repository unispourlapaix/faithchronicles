@echo off
echo 🎵 Faith Chronicles - Compression chansons Gospel en MP3 192kbps
echo ================================================================
echo.

REM Vérifier si ffmpeg est disponible
where ffmpeg >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ ffmpeg non trouvé dans le PATH
    echo 💡 Redémarrez votre terminal ou ajoutez ffmpeg au PATH
    pause
    exit /b 1
)

echo ✅ ffmpeg détecté
echo 📁 Dossier: %CD%
echo.

REM Créer un dossier temporaire pour les fichiers compressés
if not exist "compressed" mkdir "compressed"

echo 🎼 Compression de toutes les chansons MP3 en 192kbps...
echo.

set count=0
for %%f in (*.mp3) do (
    set /a count+=1
    echo [!count!] Compression: %%f
    ffmpeg -i "%%f" -codec:a libmp3lame -b:a 192k -y "compressed\%%f" -loglevel error
    if exist "compressed\%%f" (
        echo ✅ OK: %%f
    ) else (
        echo ❌ Erreur: %%f
    )
    echo.
)

echo.
echo 🔄 Remplacement des fichiers originaux...
echo.

REM Remplacer les fichiers originaux par les versions compressées
for %%f in (compressed\*.mp3) do (
    move "%%f" "%%~nxf"
    echo ✅ Remplacé: %%~nxf
)

REM Supprimer le dossier temporaire
rmdir "compressed"

echo.
echo 🎉 Compression terminée !
echo 📊 Total: %count% chansons compressées en MP3 192kbps
echo.

REM Afficher les tailles finales
echo 📋 Résultats:
for %%f in (*.mp3) do (
    echo    • %%f
)

echo.
echo ✨ Toutes les chansons sont maintenant optimisées !
pause