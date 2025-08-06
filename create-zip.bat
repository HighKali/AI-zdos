@echo off
echo ========================================
echo 📦 ZDOS BANKING - ZIP CREATOR
echo ========================================
echo.

echo 📁 Creazione ZIP del progetto APK...

REM Crea file ZIP usando PowerShell
powershell -NoProfile -ExecutionPolicy Bypass -Command "& {Add-Type -AssemblyName System.IO.Compression.FileSystem; [System.IO.Compression.ZipFile]::CreateFromDirectory('zdos-mobile-app', 'ZDOS-Banking-APK-Complete.zip', 'Optimal', $true)}"

if exist "ZDOS-Banking-APK-Complete.zip" (
    echo ✅ ZIP creato con successo!
    echo 📍 File: ZDOS-Banking-APK-Complete.zip
    echo.
    echo 📦 CONTENUTO del ZIP:
    echo    ├── config.xml          - Configurazione Cordova
    echo    ├── package.json        - Dipendenze progetto
    echo    ├── build-apk.bat       - Script build automatico
    echo    ├── README.md           - Istruzioni complete
    echo    └── www/
    echo        └── index.html      - App mobile ZDOS Banking
    echo.
    echo 🚀 USO del ZIP:
    echo    1. Estrai il ZIP
    echo    2. Installa Node.js + Java JDK
    echo    3. Esegui build-apk.bat
    echo    4. APK pronto!
    echo.
    start "" .
) else (
    echo ❌ Errore nella creazione del ZIP
)

echo.
pause
