@echo off
cls
echo ==========================================
echo 📦 ZDOS BANKING - PACCHETTO FINALE
echo ==========================================

echo 🗂️ Creazione struttura deployment...

REM Crea directory di output
if not exist "ZDOS-Banking-Final" mkdir "ZDOS-Banking-Final"
if not exist "ZDOS-Banking-Final\web" mkdir "ZDOS-Banking-Final\web"
if not exist "ZDOS-Banking-Final\mobile" mkdir "ZDOS-Banking-Final\mobile"
if not exist "ZDOS-Banking-Final\docs" mkdir "ZDOS-Banking-Final\docs"

echo 📱 Copia file web standalone...
copy "www\index-standalone.html" "ZDOS-Banking-Final\web\index.html"
copy "www\manifest.json" "ZDOS-Banking-Final\web\"
copy "www\sw.js" "ZDOS-Banking-Final\web\"

echo 📋 Copia progetto mobile completo...
xcopy "www" "ZDOS-Banking-Final\mobile\www\" /E /I /Y
xcopy "config.xml" "ZDOS-Banking-Final\mobile\"
xcopy "package.json" "ZDOS-Banking-Final\mobile\"

echo 📚 Copia documentazione...
copy "README.md" "ZDOS-Banking-Final\docs\"
copy "*.bat" "ZDOS-Banking-Final\docs\"
copy "*.ps1" "ZDOS-Banking-Final\docs\" 2>nul

echo 📄 Creazione README finale...
(
echo # ZDOS Banking Enterprise - Pacchetto Finale
echo.
echo ## 🏦 Contenuto Pacchetto
echo.
echo ### 📱 /web - Versione Web/PWA
echo - index.html - App standalone completa
echo - manifest.json - Configurazione PWA
echo - sw.js - Service Worker per offline
echo.
echo ### 📲 /mobile - Progetto Cordova
echo - www/ - Codice sorgente mobile
echo - config.xml - Configurazione Cordova
echo - package.json - Dipendenze progetto
echo.
echo ### 📚 /docs - Documentazione
echo - Script di build e deployment
echo - Guide installazione
echo.
echo ## 🚀 Utilizzo
echo.
echo ### Web/PWA:
echo 1. Carica il contenuto di /web su server web
echo 2. Accedi da browser mobile
echo 3. "Aggiungi alla home" per esperienza app
echo.
echo ### Mobile Nativo:
echo 1. Installa Node.js e Cordova
echo 2. cd /mobile
echo 3. cordova platform add android
echo 4. cordova build android
echo.
echo ## ✨ Caratteristiche
echo.
echo - 🔐 Registrazione solo con telefono + OTP
echo - 💰 1000 DSN tokens gratuiti alla registrazione
echo - 💳 Integrazione Visa/Mastercard
echo - 🔒 Controlli sicurezza IP/Proxy
echo - 💸 Trasferimenti P2P
echo - ₿ Wallet multi-crypto
echo - 📊 Dashboard enterprise
echo.
echo Versione: 1.0.0 - %date%
) > "ZDOS-Banking-Final\README.md"

echo 📦 Creazione archivio finale...
if exist "ZDOS-Banking-Enterprise-v1.0.0.zip" del "ZDOS-Banking-Enterprise-v1.0.0.zip"

REM Usa PowerShell per creare ZIP
powershell -Command "Compress-Archive -Path 'ZDOS-Banking-Final\*' -DestinationPath 'ZDOS-Banking-Enterprise-v1.0.0.zip'"

if exist "ZDOS-Banking-Enterprise-v1.0.0.zip" (
    echo ✅ PACCHETTO CREATO CON SUCCESSO!
    echo.
    echo 📊 Informazioni file:
    for %%I in ("ZDOS-Banking-Enterprise-v1.0.0.zip") do echo Dimensione: %%~zI bytes
    echo.
    echo 🎯 File generato: ZDOS-Banking-Enterprise-v1.0.0.zip
    echo.
    echo 📋 Contenuto pronto per:
    echo - ✅ Deploy web su zdos.stream
    echo - ✅ Build APK Android
    echo - ✅ Electron desktop app
    echo - ✅ PWA installabile
) else (
    echo ❌ Errore creazione archivio
)

echo.
echo 🏁 Processo completato!
pause
