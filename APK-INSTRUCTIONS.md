# 📱 ZDOS Banking APK - Progetto Completo

## 🎯 Progetto pronto per compilazione APK

Questo è il progetto completo per creare l'APK di ZDOS Banking.

### 📦 Contenuto:

- **config.xml** - Configurazione Cordova/PhoneGap
- **package.json** - Dipendenze e script del progetto  
- **www/index.html** - App mobile ottimizzata
- **build-apk.bat** - Script automatico per build
- **README.md** - Istruzioni complete

### 🚀 Come compilare l'APK:

#### Prerequisiti:
1. **Node.js** - https://nodejs.org/
2. **Java JDK 8+** - https://adoptopenjdk.net/

#### Comandi:
```bash
npm install -g cordova
cordova platform add android
cordova plugin add cordova-plugin-whitelist
cordova plugin add cordova-plugin-device
cordova plugin add cordova-plugin-splashscreen
cordova plugin add cordova-plugin-statusbar
cordova build android
```

#### O semplicemente:
```bash
./build-apk.bat
```

### 📍 Output APK:
```
platforms/android/app/build/outputs/apk/
├── debug/app-debug.apk
└── release/app-release-unsigned.apk
```

### 📱 Caratteristiche dell'app:

- ✅ Sistema bancario mobile completo
- ✅ Registrazione solo con telefono
- ✅ UI cyber-retro ottimizzata per mobile
- ✅ Vibrazione e notifiche native
- ✅ Splash screen personalizzata
- ✅ Storage offline con LocalStorage
- ✅ Sicurezza XSS protection

### 🌐 Alternativa web:
Versione web già disponibile su: https://zdos.stream

---

## 📥 Download diretto:

Tutti i file necessari sono nella cartella `zdos-mobile-app/`

**Basta copiare la cartella e seguire le istruzioni sopra!**
