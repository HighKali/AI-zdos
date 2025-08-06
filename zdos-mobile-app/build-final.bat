@echo off
cls
echo.
echo ==========================================
echo 🏦 ZDOS BANKING ENTERPRISE - BUILD FINAL
echo ==========================================
echo.

echo 📋 Verifica installazione Node.js...

REM Usa percorso completo per Node.js
set NODE_PATH="C:\Program Files\nodejs\node.exe"
set NPM_PATH="C:\Program Files\nodejs\npm.cmd"

if exist %NODE_PATH% (
    echo ✅ Node.js trovato in %NODE_PATH%
    %NODE_PATH% --version
) else (
    echo ❌ Node.js non trovato
    echo 💡 Riavvia VS Code oppure riavvia il computer per aggiornare PATH
    pause
    exit /b 1
)

echo.
echo 🔧 Installazione Cordova...
%NPM_PATH% install -g cordova

if %errorlevel% neq 0 (
    echo ❌ Errore installazione Cordova
    echo 💡 Prova a eseguire VS Code come Amministratore
    pause
    exit /b 1
)

echo.
echo ✅ Cordova installato, verifica versione...
cordova --version

echo.
echo 🚀 Preparazione piattaforma Android...

REM Rimuovi e ri-aggiungi piattaforma per sicurezza
if exist "platforms" (
    echo 🗑️ Rimozione piattaforma esistente...
    rmdir /s /q platforms
)

echo 📱 Aggiunta piattaforma Android...
cordova platform add android

if %errorlevel% neq 0 (
    echo ⚠️ Errore piattaforma Android (normale se Android SDK non configurato)
    echo 💡 Procediamo comunque con la preparazione...
)

echo.
echo 🔌 Aggiunta plugin Cordova...
cordova plugin add cordova-plugin-whitelist
cordova plugin add cordova-plugin-device
cordova plugin add cordova-plugin-splashscreen
cordova plugin add cordova-plugin-statusbar
cordova plugin add cordova-plugin-network-information
cordova plugin add cordova-plugin-vibration
cordova plugin add cordova-plugin-dialogs

echo.
echo 🎯 BUILD APK ENTERPRISE...
echo    📱 App: ZDOS Banking Enterprise v2.0.0
echo    🏦 Features: Visa/Mastercard/Crypto/DSN Token
echo    🛡️ Security: IP Blacklist, Proxy Detection
echo    💎 Rewards: 1000 DSN Token + Random Crypto
echo.

cordova build android

if %errorlevel% equ 0 (
    echo.
    echo ✅ BUILD COMPLETATO CON SUCCESSO!
    echo.
    echo 📱 APK ENTERPRISE generato:
    echo    platforms\android\app\build\outputs\apk\debug\app-debug.apk
    echo.
    echo 🎉 ZDOS Banking Enterprise v2.0.0 pronto!
    echo.
    echo 🎯 FUNZIONALITÀ ENTERPRISE:
    echo    💳 Integrazione Visa/Mastercard
    echo    ₿ Crypto Bridge Fiat/Crypto
    echo    💎 DSN Token primario (1000 gratuiti)
    echo    🎁 Random Token Rewards
    echo    🛡️ Sicurezza avanzata (IP/Proxy check)
    echo    📱 Registrazione solo telefono + OTP
    echo    💰 Cashback e Rewards automatici
    echo.
    echo 📲 INSTALLAZIONE:
    echo    1. Connetti dispositivo Android con USB debugging
    echo    2. Abilita "Origini sconosciute" nelle impostazioni
    echo    3. Installa: adb install platforms\android\app\build\outputs\apk\debug\app-debug.apk
    echo    4. Oppure copia APK sul dispositivo e installa manualmente
    echo.
    echo 🎁 PRIMO UTILIZZO = 1000 DSN TOKEN GRATUITI!
    echo.
    
    REM Apri la cartella degli APK
    if exist "platforms\android\app\build\outputs\apk\debug" (
        echo 📂 Apertura cartella APK...
        start explorer.exe "platforms\android\app\build\outputs\apk\debug"
    )
    
) else (
    echo.
    echo ❌ ERRORE BUILD
    echo.
    echo 💡 ALTERNATIVE VELOCI:
    echo    1. Usa Android Studio per aprire questo progetto
    echo    2. Oppure usa PhoneGap Build online
    echo    3. Oppure riavvia VS Code e riprova
    echo.
    echo 📋 STEPS ALTERNATIVI:
    echo    - Android Studio: File > Open > seleziona questa cartella
    echo    - Build > Generate Signed APK
    echo.
)

pause
