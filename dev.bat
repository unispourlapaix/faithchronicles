@echo off
taskkill /f /im node.exe >nul 2>&1
timeout /t 1 /nobreak >nul
npm start