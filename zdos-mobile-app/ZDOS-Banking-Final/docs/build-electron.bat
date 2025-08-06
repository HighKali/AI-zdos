@echo off
cls
echo ==========================================
echo 🏦 ZDOS BANKING - BUILD ELECTRON APP
echo ==========================================

echo 📋 Verifica Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js non trovato
    echo 💡 Installa Node.js da nodejs.org
    pause
    exit /b 1
)
echo ✅ Node.js trovato

echo.
echo 📦 Configurazione package.json per Electron...
copy package-electron.json package.json
if %errorlevel% neq 0 (
    echo ❌ Errore copia package.json
    pause
    exit /b 1
)

echo.
echo 🔽 Installazione dipendenze Electron...
npm install
if %errorlevel% neq 0 (
    echo ❌ Errore installazione dipendenze
    pause
    exit /b 1
)

echo.
echo 🚀 Build app Electron...
npm run dist
if %errorlevel% eq 0 (
    echo ✅ BUILD COMPLETATO!
    echo 📱 App generata in: dist\
    echo.
    echo 🎯 File disponibili:
    dir dist\ /b
    echo.
    echo 🏁 ZDOS Banking Enterprise pronto!
    echo 💡 Esegui: npm start per testare
) else (
    echo ❌ Errore durante il build
    echo 💡 Prova: npm start per test in development
)

echo.
echo 🏁 Processo completato!
pause
