@echo off
cls
echo.
echo ========================================
echo 📱 ZDOS BANKING - APK GENERATOR
echo ========================================
echo.
echo ✅ File configurazione APK pronti:
echo.
echo 📄 config.xml     - Configurazione Cordova
echo 📄 package.json   - Dipendenze progetto  
echo 📄 www/index.html - App mobile ottimizzata
echo 📄 build-apk.bat  - Script build automatico
echo.
echo 🔧 PREREQUISITI per creare APK:
echo.
echo 1. Node.js         - https://nodejs.org/
echo 2. Java JDK 8+     - https://adoptopenjdk.net/  
echo 3. Android Studio  - https://developer.android.com/studio
echo.
echo 🚀 COMANDI per creare APK:
echo.
echo npm install -g cordova
echo cordova platform add android
echo cordova build android
echo.
echo 📍 APK sarà creato in:
echo platforms/android/app/build/outputs/apk/
echo.
echo 📱 ALTERNATIVA RAPIDA:
echo Usa Android Studio per importare il progetto
echo o PhoneGap Build online per compilazione cloud
echo.
echo 🌐 VERSIONE WEB già pronta su:
echo https://zdos.stream
echo.
pause
