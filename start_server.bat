@echo off
title Serveur Torrent Web Downloader
color 0A
echo.
echo ===================================================
echo        SERVEUR TORRENT WEB DOWNLOADER
echo ===================================================
echo.
echo [*] Demarrage du serveur...
cd /d "%~dp0server"
node index.js
pause
