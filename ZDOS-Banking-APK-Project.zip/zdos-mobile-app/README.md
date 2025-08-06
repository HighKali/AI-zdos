# 📱 ZDOS Banking - Mobile App APK

## 🚀 Build APK in un comando

### Prerequisiti:
1. **Node.js** - [Download](https://nodejs.org/)
2. **Java JDK 8+** - [Download](https://adoptopenjdk.net/)
3. **Android SDK** (opzionale, Cordova lo scaricherà automaticamente)

### 📦 Comando rapido per creare APK:

```bash
# Esegui questo comando nella cartella zdos-mobile-app:
build-apk.bat
```

### 🔧 Processo automatico:

1. ✅ Controlla prerequisiti (Node.js, Java)
2. ✅ Installa Cordova CLI automaticamente
3. ✅ Configura progetto Android
4. ✅ Installa plugin necessari
5. ✅ Compila APK pronto per l'installazione

### 📍 Output:

L'APK sarà creato in:
```
platforms/android/app/build/outputs/apk/
├── debug/app-debug.apk          ← Per test
└── release/app-release-unsigned.apk ← Per produzione
```

### 📱 Installazione su Android:

1. **Trasferisci** l'APK sul tuo dispositivo Android
2. **Abilita** "Origini sconosciute" in Impostazioni → Sicurezza
3. **Tocca** il file APK per installare
4. **Apri** l'app ZDOS Banking

### 🔐 Funzionalità dell'app:

- ✅ **Registrazione con telefono** (privacy-first)
- ✅ **Verifica OTP** via SMS
- ✅ **Dashboard bancario** mobile-optimized
- ✅ **Vibrazione** per feedback tattile
- ✅ **Notifiche native** Android
- ✅ **Splash screen** personalizzata
- ✅ **Offline storage** con LocalStorage
- ✅ **Design responsive** cyber-retro
- ✅ **Sicurezza** XSS protection integrata

### 🎯 Test dell'app:

1. Apri l'app ZDOS Banking
2. Inserisci numero telefono
3. Crea nickname
4. Inserisci qualsiasi OTP (6 cifre)
5. Accedi alla dashboard mobile

### 📊 Compatibilità:

- **Android**: 4.4+ (API Level 19+)
- **Dimensione APK**: ~5MB
- **Permessi**: Internet, Vibrazione, Network State

### 🔄 Aggiornamenti:

Per aggiornare l'app:
1. Modifica `www/index.html`
2. Esegui `build-apk.bat`
3. Installa nuovo APK

## ⚡ Il tuo ZDOS Banking mobile è pronto!

L'app funziona completamente offline dopo la registrazione e si sincronizza quando c'è connessione internet.
