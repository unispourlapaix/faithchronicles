@echo off
echo ==============================================
echo    FaithChronicles - Redemarrage Serveur
echo ==============================================
echo.

echo [1/3] Arret du serveur Node.js...
taskkill /f /im node.exe >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo ✓ Serveur arrete avec succes
) else (
    echo ⚠ Aucun serveur Node.js en cours d'execution
)
echo.

echo [2/3] Attente de 2 secondes...
timeout /t 2 /nobreak >nul
echo.

echo [3/3] Demarrage du serveur de developpement...
echo ✓ Lancement de React...
echo.
echo ================================================
echo  Serveur demarre sur: http://localhost:3000
echo  Appuyez sur Ctrl+C pour arreter le serveur
echo ================================================
echo.

npm start
