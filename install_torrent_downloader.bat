@echo off
setlocal EnableDelayedExpansion
title Installation de Torrent Web Downloader
color 0A

echo.
echo ===================================================
echo      INSTALLATION DE TORRENT WEB DOWNLOADER
echo ===================================================
echo.

:: Vérifier Node.js
echo [*] Verification de Node.js...
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [!] Node.js n'est pas installe.
    echo [*] Telechargement de Node.js LTS...
    
    :: Télécharger Node.js avec animation de progression
    powershell -Command "& {$progressPreference='silentlyContinue'; Invoke-WebRequest -Uri https://nodejs.org/dist/v20.12.2/node-v20.12.2-x64.msi -OutFile nodejs-lts.msi}"
    
    if not exist nodejs-lts.msi (
        echo [X] Echec du telechargement de Node.js.
        echo [!] Veuillez telecharger et installer Node.js manuellement depuis: https://nodejs.org/
        pause
        exit /b 1
    )
    
    echo [*] Installation de Node.js...
    msiexec /i nodejs-lts.msi /quiet /norestart
    
    if %errorlevel% neq 0 (
        echo [X] Echec de l'installation de Node.js.
        echo [!] Veuillez installer Node.js manuellement depuis: https://nodejs.org/
        del nodejs-lts.msi
        pause
        exit /b 1
    )
    
    del nodejs-lts.msi
    echo [+] Node.js installe avec succes!
    
    :: Ajout de Node.js au PATH pour la session actuelle
    set "PATH=%PATH%;%ProgramFiles%\nodejs"
    set "PATH=%PATH%;%APPDATA%\npm"
) else (
    echo [+] Node.js est deja installe!
)

:: Créer le script de démarrage du serveur
echo [*] Creation du script de demarrage...
(
    echo @echo off
    echo title Serveur Torrent Web Downloader
    echo color 0A
    echo echo.
    echo echo ===================================================
    echo echo        SERVEUR TORRENT WEB DOWNLOADER
    echo echo ===================================================
    echo echo.
    echo echo [*] Demarrage du serveur...
    echo cd /d "%%~dp0server"
    echo node index.js
    echo pause
) > start_server.bat

:: Créer le dossier uploads s'il n'existe pas
if not exist "server\uploads" (
    echo [*] Creation du dossier uploads...
    mkdir "server\uploads"
)

:: Installer les dépendances Node.js
echo [*] Installation des dependances Node.js...
cd /d "%~dp0server"

:: Vérifier si package.json existe, sinon le créer
if not exist package.json (
    echo [*] Creation de package.json...
    (
        echo {
        echo   "name": "torrent-web-downloader",
        echo   "version": "1.0.0",
        echo   "description": "Un client torrent avec interface web",
        echo   "main": "index.js",
        echo   "dependencies": {
        echo     "express": "^4.17.1",
        echo     "webtorrent": "latest",
        echo     "cors": "^2.8.5",
        echo     "multer": "^1.4.5-lts.1"
        echo   }
        echo }
    ) > package.json
)

:: Installer les dépendances
call npm install --no-fund --loglevel=error
if %errorlevel% neq 0 (
    echo [X] Erreur lors de l'installation des dependances.
    cd /d "%~dp0"
    pause
    exit /b 1
)

cd /d "%~dp0"
echo [+] Dependances installees avec succes!

echo.
echo ===================================================
echo      INSTALLATION TERMINEE AVEC SUCCES!
echo ===================================================
echo.
echo [+] Pour demarrer le serveur:
echo     Double-cliquez sur "start_server.bat"
echo.
echo [+] Pour acceder a l'interface web:
echo     Ouvrez "web/index.html" dans votre navigateur
echo.

pause
endlocal
