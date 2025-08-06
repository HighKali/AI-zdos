@echo off
cls
echo.
echo ========================================
echo 🏦 ZDOS BANKING - SETUP COMPILAZIONE
echo ========================================
echo.

echo 📋 Controllo sistema...

REM Controlla se Node.js è installato
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js NON installato
    echo.
    echo 🔽 INSTALLAZIONE AUTOMATICA Node.js:
    echo.
    echo 1. Scaricamento Node.js...
    
    REM Scarica Node.js usando PowerShell
    powershell -Command "& {Invoke-WebRequest -Uri 'https://nodejs.org/dist/v18.17.0/node-v18.17.0-x64.msi' -OutFile 'nodejs-installer.msi'}"
    
    if exist "nodejs-installer.msi" (
        echo ✅ Download completato
        echo 2. Avvio installazione...
        start /wait msiexec /i nodejs-installer.msi /quiet
        
        echo 3. Pulizia file temporanei...
        del nodejs-installer.msi
        
        echo ✅ Node.js installato!
        echo 🔄 Riavvia questo script per continuare
        pause
        exit /b 0
    ) else (
        echo ❌ Errore download Node.js
        echo.
        echo 📥 INSTALLAZIONE MANUALE:
        echo 1. Vai su: https://nodejs.org/
        echo 2. Scarica versione LTS
        echo 3. Installa con tutte le opzioni default
        echo 4. Riavvia VS Code
        echo 5. Esegui nuovamente questo script
        pause
        exit /b 1
    )
) else (
    echo ✅ Node.js installato
    node --version
)

REM Controlla npm
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm non funziona
    pause
    exit /b 1
) else (
    echo ✅ npm disponibile
    npm --version
)

echo.
echo 🔧 Installazione Cordova...

REM Installa Cordova globalmente
npm install -g cordova
if %errorlevel% neq 0 (
    echo ❌ Errore installazione Cordova
    echo 💡 Prova a eseguire VS Code come Amministratore
    pause
    exit /b 1
)

echo ✅ Cordova installato
cordova --version

echo.
echo 🚀 Configurazione progetto...

REM Aggiungi piattaforma Android se non esiste
if not exist "platforms" (
    echo 📱 Aggiunta piattaforma Android...
    cordova platform add android
    if %errorlevel% neq 0 (
        echo ⚠️ Errore piattaforma Android (normale se Android SDK non installato)
        echo 💡 Continuiamo con la preparazione...
    )
)

echo 🔌 Installazione plugin Cordova...
cordova plugin add cordova-plugin-whitelist
cordova plugin add cordova-plugin-device
cordova plugin add cordova-plugin-splashscreen
cordova plugin add cordova-plugin-statusbar
cordova plugin add cordova-plugin-network-information
cordova plugin add cordova-plugin-vibration
cordova plugin add cordova-plugin-dialogs

echo.
echo ✅ SETUP COMPLETATO!
echo.
echo 🎯 PROSSIMI PASSI:
echo    1. Esegui: cordova build android
echo    2. Oppure usa Android Studio per aprire il progetto
echo    3. APK sarà in: platforms\android\app\build\outputs\apk\
echo.

echo 📱 Se hai Android Studio installato:
echo    - Apri Android Studio
echo    - Import Project → seleziona questa cartella
echo    - Build → Generate Signed APK
echo.

pause
