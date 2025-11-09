@echo off
echo Redemarrage FaithChronicles...
taskkill /f /im node.exe >nul 2>&1
timeout /t 2 /nobreak >nul
echo Demarrage du serveur...
start "" http://localhost:3000
npm start