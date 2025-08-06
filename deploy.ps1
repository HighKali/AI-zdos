# ZDOS Banking System - Deployment Script per zdos.stream
# Esegui questo script con: .\deploy.ps1
# APK Enterprise generato in: platforms\android\app\build\outputs\apk\debug\app-debug.apk

Write-Host "🚀 ZDOS BANKING DEPLOYMENT per https://zdos.stream" -ForegroundColor Cyan
Write-Host "===============================================" -ForegroundColor Cyan

# Verifica se APK Enterprise è stato compilato
Write-Host "📱 Verifica APK Enterprise..." -ForegroundColor Yellow
$apkPath = "zdos-mobile-app\platforms\android\app\build\outputs\apk\debug\app-debug.apk"
if (Test-Path $apkPath) {
    Write-Host "✅ APK Enterprise trovato: $apkPath" -ForegroundColor Green
    $apkSize = (Get-Item $apkPath).Length / 1MB
    Write-Host "📦 Dimensione APK: $([math]::Round($apkSize, 2)) MB" -ForegroundColor White
} else {
    Write-Host "⚠️  APK Enterprise non trovato. Compilazione in corso o fallita." -ForegroundColor Yellow
    Write-Host "📋 Verifica nella cartella: zdos-mobile-app\" -ForegroundColor White
}

Write-Host ""

# Verifica prerequisiti
Write-Host "📋 Verifica prerequisiti..." -ForegroundColor Yellow

# Controlla se Git è installato
try {
    git --version | Out-Null
    Write-Host "✅ Git installato" -ForegroundColor Green
} catch {
    Write-Host "❌ Git non trovato. Installa Git prima di continuare." -ForegroundColor Red
    exit 1
}

# Controlla se Node.js è installato
try {
    node --version | Out-Null
    Write-Host "✅ Node.js installato" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js non trovato. Installa Node.js prima di continuare." -ForegroundColor Red
    exit 1
}

# Controlla se npm è installato
try {
    npm --version | Out-Null
    Write-Host "✅ npm installato" -ForegroundColor Green
} catch {
    Write-Host "❌ npm non trovato." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "🔧 Preparazione files per deployment..." -ForegroundColor Yellow

# Crea directory di deployment
$deployDir = "zdos-deployment"
if (Test-Path $deployDir) {
    Remove-Item $deployDir -Recurse -Force
}
New-Item -ItemType Directory -Path $deployDir | Out-Null

# Copia file essenziali per il deployment
Write-Host "📁 Copia file banking system..." -ForegroundColor White
Copy-Item "frontend/banking.html" "$deployDir/" -Force

# Se l'APK enterprise è pronto, copialo nel deployment
if (Test-Path "zdos-mobile-app\platforms\android\app\build\outputs\apk\debug\app-debug.apk") {
    Write-Host "📱 Copia APK Enterprise nel deployment..." -ForegroundColor Green
    New-Item -ItemType Directory -Path "$deployDir/mobile" -Force | Out-Null
    Copy-Item "zdos-mobile-app\platforms\android\app\build\outputs\apk\debug\app-debug.apk" "$deployDir/mobile/zdos-banking-enterprise.apk" -Force
    Write-Host "✅ APK copiato come: zdos-banking-enterprise.apk" -ForegroundColor Green
}

# Crea index.html che reindirizza a banking.html
@"
<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ZDOS Banking System</title>
    <meta http-equiv="refresh" content="0; url=./banking.html">
    <style>
        body { 
            font-family: 'Courier New', monospace; 
            background: linear-gradient(135deg, #001122, #002244); 
            color: #00ffff; 
            text-align: center; 
            padding-top: 200px; 
        }
        .loading { animation: pulse 2s infinite; }
        @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
    </style>
</head>
<body>
    <div class="loading">
        <h1>🏦 ZDOS BANKING SYSTEM</h1>
        <p>Reindirizzamento in corso...</p>
        <p><a href="./banking.html" style="color: #00ffff;">Clicca qui se non vieni reindirizzato</a></p>
    </div>
</body>
</html>
"@ | Out-File -FilePath "$deployDir/index.html" -Encoding UTF8

# Crea directory backend
New-Item -ItemType Directory -Path "$deployDir/backend" | Out-Null
New-Item -ItemType Directory -Path "$deployDir/backend/modules" | Out-Null

# Copia backend files
Copy-Item "backend/index.js" "$deployDir/backend/" -Force
Copy-Item "backend/package.json" "$deployDir/backend/" -Force
Copy-Item "backend/modules/*.js" "$deployDir/backend/modules/" -Force

# Crea file .env per produzione
@"
NODE_ENV=production
PORT=3000
CORS_ORIGIN=https://zdos.stream
SMS_API_KEY=your_sms_api_key_here
JWT_SECRET=zdos_super_secure_jwt_secret_$(Get-Random)
"@ | Out-File -FilePath "$deployDir/backend/.env" -Encoding UTF8

# Crea .htaccess per redirect HTTPS e configurazioni
@"
# Force HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Security Headers
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'"

# Cache Control
<filesMatch "\.(css|js|png|jpg|jpeg|gif|ico|svg)$">
    Header set Cache-Control "max-age=86400, public"
</filesMatch>

# Default page
DirectoryIndex index.html banking.html
"@ | Out-File -FilePath "$deployDir/.htaccess" -Encoding UTF8

Write-Host "✅ File preparati in cartella: $deployDir" -ForegroundColor Green

Write-Host ""
Write-Host "📦 Installazione dipendenze backend..." -ForegroundColor Yellow
Set-Location "$deployDir/backend"
npm install --production
Set-Location "../.."

Write-Host ""
Write-Host "🔐 Generazione certificati e configurazioni..." -ForegroundColor Yellow

# Crea script di avvio per il server
@"
#!/bin/bash
# ZDOS Banking Server Startup Script

echo "🚀 Avvio ZDOS Banking Server..."

# Vai nella directory backend
cd backend

# Installa dipendenze se necessario
if [ ! -d "node_modules" ]; then
    echo "📦 Installazione dipendenze..."
    npm install --production
fi

# Avvia il server
echo "🏦 Avvio server banking..."
if command -v pm2 &> /dev/null; then
    pm2 start index.js --name "zdos-banking" --env production
    pm2 save
    echo "✅ Server avviato con PM2"
else
    echo "⚠️  PM2 non trovato, avvio con Node.js standard"
    NODE_ENV=production node index.js &
    echo "✅ Server avviato"
fi

echo "🌐 ZDOS Banking System è ora attivo su porta 3000"
echo "🔗 Frontend disponibile su: https://zdos.stream"
echo "🔗 API disponibile su: https://zdos.stream:3000"
"@ | Out-File -FilePath "$deployDir/start-server.sh" -Encoding UTF8

Write-Host ""
Write-Host "📋 Creazione istruzioni di deployment..." -ForegroundColor Yellow

# Crea README per il deployment
@"
# 🏦 ZDOS BANKING SYSTEM - DEPLOYMENT GUIDE

## 🚀 Deploy Rapido su https://zdos.stream

### Metodo 1: Upload via FTP/cPanel

1. **Upload File Frontend**:
   - Carica `index.html` e `banking.html` nella directory root del dominio
   - Carica `.htaccess` per configurazioni security

2. **Upload Backend**:
   - Carica cartella `backend/` nel tuo hosting Node.js
   - Configura variabili ambiente nel pannello hosting

3. **Avvio Server**:
   ```bash
   cd backend
   npm install --production
   node index.js
   ```

### Metodo 2: Git Deploy (Consigliato)

1. **Push su repository**:
   ```bash
   git add .
   git commit -m "Ready for zdos.stream deployment"
   git push origin main
   ```

2. **Clone sul server**:
   ```bash
   git clone https://github.com/HighKali/AI-zdos.git
   cd AI-zdos
   cd backend
   npm install --production
   ./start-server.sh
   ```

### Configurazione DNS (Namecheap)

```
Tipo: A Record
Host: @
Valore: [IP del tuo server]

Tipo: CNAME  
Host: www
Valore: zdos.stream
```

### Test Deployment

1. Visita: https://zdos.stream
2. Testa registrazione con il tuo numero
3. Verifica dashboard banking

## 🔐 Security Features Attive

- ✅ HTTPS forzato
- ✅ Security headers
- ✅ XSS Protection  
- ✅ Input sanitization
- ✅ Rate limiting
- ✅ CORS protection

## 📱 Funzionalità Banking

- ✅ Registrazione solo con telefono
- ✅ Verifica OTP via SMS
- ✅ Dashboard sicura
- ✅ Sistema rewards/cashback
- ✅ P2P transfers (ready)
- ✅ Crypto integration (ready)

## 📱 APK Enterprise (se disponibile)

Se presente nella cartella `mobile/`:
- 📱 `zdos-banking-enterprise.apk` - App mobile completa
- 💎 1000 DSN Token gratuiti alla prima registrazione
- 🛡️ Sicurezza enterprise (IP blacklist, proxy detection)
- 💳 Integrazione Visa/Mastercard
- 🪙 Multi-crypto wallet con random rewards

### Installazione APK:
1. Scarica `zdos-banking-enterprise.apk`
2. Abilita "Origini sconosciute" su Android
3. Installa l'APK
4. Prima registrazione = 1000 DSN Token!

Sistema pronto per produzione! 🎉
"@ | Out-File -FilePath "$deployDir/DEPLOYMENT-README.md" -Encoding UTF8

Write-Host ""
Write-Host "🎯 Comando di deployment finale..." -ForegroundColor Magenta

# Crea lo script di deployment finale
@"
#!/bin/bash
# ZDOS Banking - One Command Deploy per zdos.stream

echo "🚀 ZDOS BANKING DEPLOYMENT per https://zdos.stream"
echo "================================================="

# Verifica connessione al dominio
echo "🌐 Test connessione a zdos.stream..."
if ping -c 1 zdos.stream &> /dev/null; then
    echo "✅ Dominio zdos.stream raggiungibile"
else
    echo "⚠️  Dominio non raggiungibile, procedo comunque..."
fi

# Se hai accesso SSH al server, decommenta e configura:
# echo "📡 Upload via SSH/SCP..."
# scp -r . user@zdos.stream:/var/www/html/
# ssh user@zdos.stream "cd /var/www/html && ./start-server.sh"

echo ""
echo "📋 ISTRUZIONI MANUALI:"
echo "1. Carica i file dalla cartella 'zdos-deployment' sul tuo hosting"
echo "2. Configura Node.js per la cartella backend"
echo "3. Avvia il server con: node backend/index.js"
echo ""
echo "🔗 URL del tuo banking system: https://zdos.stream"
echo "✅ Deployment preparato con successo!"
"@ | Out-File -FilePath "$deployDir/deploy-to-zdos.sh" -Encoding UTF8

Write-Host ""
Write-Host "✅ DEPLOYMENT PREPARATO CON SUCCESSO!" -ForegroundColor Green
Write-Host "======================================" -ForegroundColor Green
Write-Host ""
Write-Host "📁 Tutti i file sono pronti in: $deployDir" -ForegroundColor White
Write-Host ""
Write-Host "🚀 PROSSIMI PASSI:" -ForegroundColor Yellow
Write-Host "1. Carica il contenuto di '$deployDir' sul tuo hosting zdos.stream" -ForegroundColor White
Write-Host "2. Configura Node.js per la cartella 'backend'" -ForegroundColor White
Write-Host "3. Avvia: cd backend && npm install --production && node index.js" -ForegroundColor White
Write-Host ""
Write-Host "🌐 Il tuo banking system sarà disponibile su: https://zdos.stream" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 Leggi 'DEPLOYMENT-README.md' per istruzioni dettagliate" -ForegroundColor Yellow

# Apri la cartella di deployment
Start-Process explorer.exe -ArgumentList (Resolve-Path $deployDir).Path
