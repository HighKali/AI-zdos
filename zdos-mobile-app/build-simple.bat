@echo off
cls
echo ==========================================
echo 🏦 ZDOS BANKING - BUILD SEMPLIFICATO  
echo ==========================================

echo Verifico Node.js...
node --version
if %errorlevel% neq 0 (
    echo ❌ Node.js non trovato
    exit /b 1
)

echo Verifico Cordova...
cordova --version
if %errorlevel% neq 0 (
    echo ❌ Cordova non trovato
    echo Installo Cordova...
    npm install -g cordova
)

echo Preparo build Android...
if exist "platforms\android" (
    echo Rimuovo build precedente...
    rmdir /s /q platforms\android\app\build 2>nul
)

echo Avvio build APK...
cordova build android --debug

if %errorlevel% eq 0 (
    echo ✅ BUILD COMPLETATO!
    echo 📱 APK generato in: platforms\android\app\build\outputs\apk\debug\app-debug.apk
) else (
    echo ❌ Errore durante il build
    echo Provo metodo alternativo...
    cd platforms\android
    call gradlew assembleDebug
)

echo 🏁 Processo completato!
pause
