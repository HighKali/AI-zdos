@echo off
cls
echo.
echo ========================================
echo 🏦 ZDOS BANKING - COMPILAZIONE APK
echo ========================================
echo.

echo 📋 Verifica prerequisiti...

REM Controlla Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js non trovato
    echo 🔗 Scarica da: https://nodejs.org/
    echo.
    echo 📱 ALTERNATIVA: Usa PhoneGap Build Online
    echo 🌐 Vai su: https://build.phonegap.com
    echo 📦 Carica il file: ZDOS-Banking-APK-Project.zip
    pause
    exit /b 1
)

echo ✅ Node.js trovato
node --version

REM Controlla Cordova
where cordova >nul 2>nul
if %errorlevel% neq 0 (
    echo 📦 Installazione Cordova...
    npm install -g cordova
    if %errorlevel% neq 0 (
        echo ❌ Errore installazione Cordova
        pause
        exit /b 1
    )
)

echo ✅ Cordova pronto
cordova --version

echo.
echo 🚀 Inizializzazione progetto...

REM Inizializza progetto Cordova se non esiste
if not exist "platforms" (
    echo 📱 Aggiunta piattaforma Android...
    cordova platform add android
    if %errorlevel% neq 0 (
        echo ❌ Errore aggiunta piattaforma Android
        echo 💡 Prova con: npm install -g @cordova/cli
        pause
        exit /b 1
    )
)

echo 🔌 Installazione plugin...
cordova plugin add cordova-plugin-whitelist --save
cordova plugin add cordova-plugin-device --save
cordova plugin add cordova-plugin-splashscreen --save
cordova plugin add cordova-plugin-statusbar --save

echo.
echo 🔨 COMPILAZIONE APK...
echo ⏳ Questo richiederà 3-5 minuti...
echo.

REM Compila APK
cordova build android
if %errorlevel% neq 0 (
    echo ❌ Errore compilazione
    echo.
    echo 💡 SOLUZIONI:
    echo    - Installa Android Studio
    echo    - Configura ANDROID_HOME
    echo    - Usa PhoneGap Build online
    pause
    exit /b 1
)

echo.
echo 🎉 COMPILAZIONE COMPLETATA!
echo.

REM Cerca file APK
set APK_PATH=platforms\android\app\build\outputs\apk

if exist "%APK_PATH%\debug\app-debug.apk" (
    echo ✅ APK Debug creato:
    echo 📍 %APK_PATH%\debug\app-debug.apk
)

if exist "%APK_PATH%\release\app-release-unsigned.apk" (
    echo ✅ APK Release creato:
    echo 📍 %APK_PATH%\release\app-release-unsigned.apk
)

echo.
echo 📱 INSTALLAZIONE APK:
echo    1. Trasferisci APK su Android
echo    2. Abilita "Origini sconosciute"
echo    3. Tocca APK per installare
echo    4. Apri ZDOS Banking
echo.

REM Apri cartella APK se esiste
if exist "%APK_PATH%" (
    echo 📂 Apertura cartella APK...
    start "" "%APK_PATH%"
)

echo 🎉 ZDOS Banking APK è pronto!
pause
