@echo off
echo 🚀 ZDOS BANKING DEPLOYMENT per https://zdos.stream
echo =================================================

echo 📋 Preparazione deployment...

REM Crea directory di deployment
if exist zdos-deployment rmdir /s /q zdos-deployment
mkdir zdos-deployment

echo 📁 Copia file banking system...

REM Copia file frontend
copy "frontend\banking.html" "zdos-deployment\" >nul

REM Crea index.html
echo ^<!DOCTYPE html^> > zdos-deployment\index.html
echo ^<html lang="it"^> >> zdos-deployment\index.html
echo ^<head^> >> zdos-deployment\index.html
echo ^<meta charset="UTF-8"^> >> zdos-deployment\index.html
echo ^<meta name="viewport" content="width=device-width, initial-scale=1.0"^> >> zdos-deployment\index.html
echo ^<title^>ZDOS Banking System^</title^> >> zdos-deployment\index.html
echo ^<meta http-equiv="refresh" content="0; url=./banking.html"^> >> zdos-deployment\index.html
echo ^</head^> >> zdos-deployment\index.html
echo ^<body^> >> zdos-deployment\index.html
echo ^<h1^>🏦 ZDOS BANKING SYSTEM^</h1^> >> zdos-deployment\index.html
echo ^<p^>Reindirizzamento in corso...^</p^> >> zdos-deployment\index.html
echo ^<p^>^<a href="./banking.html"^>Clicca qui se non vieni reindirizzato^</a^>^</p^> >> zdos-deployment\index.html
echo ^</body^> >> zdos-deployment\index.html
echo ^</html^> >> zdos-deployment\index.html

REM Crea directory backend
mkdir zdos-deployment\backend
mkdir zdos-deployment\backend\modules

REM Copia backend files
copy "backend\index.js" "zdos-deployment\backend\" >nul
copy "backend\package.json" "zdos-deployment\backend\" >nul
copy "backend\modules\*.js" "zdos-deployment\backend\modules\" >nul

REM Crea file .env
echo NODE_ENV=production > zdos-deployment\backend\.env
echo PORT=3000 >> zdos-deployment\backend\.env
echo CORS_ORIGIN=https://zdos.stream >> zdos-deployment\backend\.env
echo SMS_API_KEY=your_sms_api_key_here >> zdos-deployment\backend\.env
echo JWT_SECRET=zdos_super_secure_jwt_secret_%RANDOM% >> zdos-deployment\backend\.env

REM Crea .htaccess
echo # Force HTTPS > zdos-deployment\.htaccess
echo RewriteEngine On >> zdos-deployment\.htaccess
echo RewriteCond %%{HTTPS} off >> zdos-deployment\.htaccess
echo RewriteRule ^^(.*^)$ https://%%{HTTP_HOST}%%{REQUEST_URI} [L,R=301] >> zdos-deployment\.htaccess
echo. >> zdos-deployment\.htaccess
echo # Security Headers >> zdos-deployment\.htaccess
echo Header always set X-Content-Type-Options nosniff >> zdos-deployment\.htaccess
echo Header always set X-Frame-Options DENY >> zdos-deployment\.htaccess
echo Header always set X-XSS-Protection "1; mode=block" >> zdos-deployment\.htaccess

echo ✅ File preparati in cartella: zdos-deployment

echo.
echo 🌐 DEPLOYMENT PER https://zdos.stream
echo ====================================
echo.
echo 📁 Tutti i file sono pronti in: zdos-deployment
echo.
echo 🚀 PROSSIMI PASSI:
echo 1. Carica il contenuto di 'zdos-deployment' sul tuo hosting zdos.stream
echo 2. Configura Node.js per la cartella 'backend'
echo 3. Avvia: cd backend ^&^& npm install --production ^&^& node index.js
echo.
echo 🌐 Il tuo banking system sarà disponibile su: https://zdos.stream
echo.

REM Apri la cartella di deployment
start "" zdos-deployment

echo ✅ DEPLOYMENT PREPARATO CON SUCCESSO!

pause
