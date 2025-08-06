@echo off
cls
echo.
echo ==========================================
echo 🏦 ZDOS BANKING ENTERPRISE - BUILD APK
echo ==========================================
echo.

echo 📋 Preparazione build enterprise...

REM Verifica Node.js
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js non installato
    echo 🔧 Esegui prima setup-build.bat
    pause
    exit /b 1
)

REM Verifica Cordova
cordova --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Cordova non installato
    echo 🔧 Esegui prima setup-build.bat
    pause
    exit /b 1
)

echo ✅ Ambiente pronto per build

echo.
echo 🔧 Build APK Enterprise...
echo    📱 App: ZDOS Banking Enterprise v2.0.0
echo    🏦 Features: Visa/Mastercard/Crypto/DSN Token
echo    🛡️ Security: IP Blacklist, Proxy Detection
echo    💎 Rewards: 1000 DSN Token + Random Crypto
echo.

echo 🚀 Avvio build Android...
cordova build android

if %errorlevel% equ 0 (
    echo.
    echo ✅ BUILD COMPLETATO!
    echo.
    echo 📱 APK generati in:
    echo    platforms\android\app\build\outputs\apk\debug\app-debug.apk
    echo    platforms\android\app\build\outputs\apk\release\app-release-unsigned.apk
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
    echo 📥 INSTALLAZIONE:
    echo    1. Connetti dispositivo Android
    echo    2. Abilita "Origini sconosciute"
    echo    3. Installa app-debug.apk
    echo    4. Prima registrazione = 1000 DSN Token!
    echo.
) else (
    echo.
    echo ❌ ERRORE BUILD
    echo 💡 Possibili soluzioni:
    echo    1. Controlla Android SDK installato
    echo    2. Esegui: cordova platform rm android
    echo    3. Esegui: cordova platform add android
    echo    4. Riprova build
    echo.
)

pause
