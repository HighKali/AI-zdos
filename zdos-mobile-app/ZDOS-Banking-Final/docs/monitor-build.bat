@echo off
cls
echo.
echo ==========================================
echo 📱 ZDOS BANKING - MONITOR COMPILAZIONE
echo ==========================================
echo.

echo 🔍 Controllo stato compilazione...

REM Verifica processi attivi
echo 📋 Processi di compilazione attivi:
tasklist | findstr /i "node.exe cordova gradle java" 2>nul
if %errorlevel% neq 0 (
    echo    Nessun processo di compilazione attivo
)

echo.
echo 📁 Verifica struttura progetto:

if exist "platforms" (
    echo ✅ Cartella platforms creata
    if exist "platforms\android" (
        echo ✅ Piattaforma Android configurata
        if exist "platforms\android\app\build\outputs\apk\debug\app-debug.apk" (
            echo.
            echo 🎉 APK ENTERPRISE TROVATO!
            echo ✅ File: platforms\android\app\build\outputs\apk\debug\app-debug.apk
            
            REM Mostra info file
            for %%F in ("platforms\android\app\build\outputs\apk\debug\app-debug.apk") do (
                echo 📦 Dimensione: %%~zF bytes
                echo 📅 Data: %%~tF
            )
            
            echo.
            echo 🚀 COMPILAZIONE COMPLETATA CON SUCCESSO!
            echo.
            echo 📲 PROSSIMI PASSI:
            echo    1. Connetti dispositivo Android
            echo    2. Abilita "Origini sconosciute"  
            echo    3. Installa APK
            echo    4. Prima registrazione = 1000 DSN Token!
            echo.
            
            REM Apri cartella APK
            start explorer.exe "platforms\android\app\build\outputs\apk\debug"
            
        ) else (
            echo ⚠️  APK non ancora generato
            echo 🔄 Compilazione probabilmente in corso...
        )
    ) else (
        echo ⚠️  Piattaforma Android non ancora configurata
    )
) else (
    echo ❌ Cartella platforms non trovata
    echo 🔄 Setup o compilazione in corso...
)

echo.
echo 📊 Files di configurazione:
if exist "config.xml" echo ✅ config.xml
if exist "package.json" echo ✅ package.json  
if exist "www\index.html" echo ✅ www\index.html

echo.
echo 🔧 Plugin Cordova installati:
if exist "plugins" (
    dir /b plugins 2>nul
) else (
    echo    Nessun plugin installato ancora
)

echo.
echo 🔄 Per rinfrescare lo status, riesegui questo script
echo.
pause
