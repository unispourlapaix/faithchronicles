@echo off
echo 🛑 Arret de tous les processus Node.js...
taskkill /F /IM node.exe >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Serveur arrete avec succes
) else (
    echo ℹ️ Aucun serveur en cours d'execution
)
pause
