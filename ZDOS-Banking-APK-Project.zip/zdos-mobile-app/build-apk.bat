@echo off
echo ========================================
echo 🏦 ZDOS BANKING - APK BUILD SCRIPT
echo ========================================
echo.

REM Check if Node.js is installed
echo 📋 Controllo prerequisiti...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js non trovato. Installa Node.js prima di continuare.
    echo 🔗 Download: https://nodejs.org/
    pause
    exit /b 1
)
echo ✅ Node.js installato

REM Check if Java is installed
echo 📋 Controllo Java SDK...
java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Java non trovato. Installa Java JDK 8 o superiore.
    echo 🔗 Download: https://adoptopenjdk.net/
    pause
    exit /b 1
)
echo ✅ Java installato

REM Install Cordova globally if not present
echo 📦 Installazione Cordova...
npm list -g cordova >nul 2>&1
if %errorlevel% neq 0 (
    echo 📥 Installazione Cordova CLI...
    npm install -g cordova
    if %errorlevel% neq 0 (
        echo ❌ Errore nell'installazione di Cordova
        pause
        exit /b 1
    )
)
echo ✅ Cordova installato

echo.
echo 🚀 Inizializzo progetto Cordova...

REM Initialize Cordova project if not already done
if not exist platforms (
    cordova platform add android
    if %errorlevel% neq 0 (
        echo ❌ Errore nell'aggiunta della piattaforma Android
        pause
        exit /b 1
    )
)

REM Install plugins
echo 📱 Installazione plugin...
cordova plugin add cordova-plugin-whitelist
cordova plugin add cordova-plugin-device
cordova plugin add cordova-plugin-splashscreen
cordova plugin add cordova-plugin-statusbar
cordova plugin add cordova-plugin-network-information
cordova plugin add cordova-plugin-vibration
cordova plugin add cordova-plugin-dialogs

echo.
echo 🔨 Building APK...
echo ⏳ Questo può richiedere alcuni minuti...

REM Build the APK
cordova build android --release
if %errorlevel% neq 0 (
    echo.
    echo ❌ Errore durante la build. Proviamo build debug...
    cordova build android
    if %errorlevel% neq 0 (
        echo ❌ Build fallita. Controlla gli errori sopra.
        pause
        exit /b 1
    )
    echo ✅ APK Debug creato con successo!
    echo 📍 Posizione: platforms\android\app\build\outputs\apk\debug\app-debug.apk
) else (
    echo ✅ APK Release creato con successo!
    echo 📍 Posizione: platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk
)

echo.
echo 🎉 BUILD COMPLETATA!
echo.
echo 📱 Il tuo APK ZDOS Banking è pronto!
echo 📂 Controlla la cartella: platforms\android\app\build\outputs\apk\
echo.
echo 💡 Per installare l'APK:
echo    1. Trasferisci il file APK sul tuo Android
echo    2. Abilita "Origini sconosciute" nelle impostazioni
echo    3. Tocca il file APK per installare
echo.

REM Open the APK folder
if exist "platforms\android\app\build\outputs\apk\" (
    start "" "platforms\android\app\build\outputs\apk\"
)

pause
