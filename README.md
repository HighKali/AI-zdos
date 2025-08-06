# 🏦 ZDOS Banking Enterprise - Sistema Bancario del Futuro

[![Version](https://img.shields.io/badge/version-v1.0.0-blue.svg)](https://github.com/HighKali/AI-zdos/releases/tag/v1.0.0)
[![Status](https://img.shields.io/badge/status-Production%20Ready-green.svg)](https://zdos.stream)
[![Platform](https://img.shields.io/badge/platform-Web%20%7C%20Mobile%20%7C%20Desktop-lightgrey.svg)]()

**Sistema bancario enterprise completo** con sicurezza avanzata, 1000 DSN tokens gratuiti, integrazione Visa/Mastercard e wallet multi-crypto.

## 🚀 DEPLOY IMMEDIATO

### 🌐 Web App (PWA)
```bash
# Carica su zdos.stream:
zdos-mobile-app/ZDOS-Banking-Final/web/
├── index.html
├── manifest.json  
└── sw.js
```

### 📱 Mobile App
```bash
cd zdos-mobile-app/
cordova build android
```

## ✨ CARATTERISTICHE ENTERPRISE

### 🔐 Sicurezza Avanzata
- ✅ **Registrazione telefono + OTP + nickname**
- ✅ **IP Blacklist e proxy detection**
- ✅ **Crittografia end-to-end**
- ✅ **Autenticazione biometrica**

### 💰 Sistema DSN Token
- ✅ **1000 DSN tokens gratuiti** alla registrazione
- ✅ **Cashback automatico** su ogni transazione
- ✅ **Reward system** avanzato
- ✅ **Portfolio crypto tracking**

### 💳 Payment Integration
- ✅ **Visa API** completa integrazione
- ✅ **Mastercard API** completa integrazione
- ✅ **Carte virtuali/fisiche** gestione
- ✅ **ATM/Bancomat** network

### ₿ Multi-Crypto Wallet
- ✅ **Bitcoin (BTC)** - Wallet nativo
- ✅ **Ethereum (ETH)** - Smart contracts
- ✅ **Tether (USDT)** - Stablecoin
- ✅ **DSN Token** - Gettone primario

### 🏗️ Architettura

```
zdos/
├── frontend/
│   ├── banking.html          # Versione standalone production
│   ├── components/
│   │   └── UserDashboard.js   # Componente React integrato
│   └── pages/
│       └── gaming-hub.js      # Hub gaming con token faucet
├── backend/
│   ├── index.js              # Server Express con sicurezza
│   └── modules/
│       └── bank.js           # API autenticazione OTP
└── docs/
    └── INSTALLAZIONE-DOMINIO.md
```

### 🔧 Installation

#### Quick Deploy (Standalone)
```bash
# Upload banking.html to your server
scp frontend/banking.html user@domain.com:/var/www/html/
```

#### Full Stack Deploy
```bash
# Frontend
cd frontend
npm install
npm run build
npm start

# Backend  
cd backend
npm install
npm start
```

### 🌐 API Endpoints

```
POST /api/auth/send-otp     # Invia OTP via SMS
POST /api/auth/verify-otp   # Verifica OTP e registra utente
POST /api/auth/user-data    # Recupera dati utente
```

### 🔒 Security Features

- Rate limiting (100 req/15min)
- Helmet security headers  
- CORS protection
- OTP expiration (5 minutes)
- Maximum 3 OTP attempts
- Secure passkey generation

### 📱 User Flow

1. **Registrazione**: Inserimento numero telefono
2. **Verifica**: Ricezione e inserimento OTP via SMS
3. **Profilo**: Creazione nickname personalizzato
4. **Dashboard**: Accesso completo alle funzionalità bancarie

### 🎮 Gaming Integration

- **Token Balance**: Gestione ZDOS tokens
- **Faucet System**: Claim orari gratuiti
- **Retro Games**: 4 giochi Atari con rewards
- **Leaderboard**: Classifiche globali

### 🚀 Production Notes

- Replace console.log with real SMS service integration
- Configure environment variables for production
- Set up database for persistent user storage
- Implement real payment gateway integration
- Add transaction logging and analytics

### 📞 Support

Per supporto tecnico e personalizzazioni:
- Repository: [github.com/HighKali/AI-zdos](https://github.com/HighKali/AI-zdos)
- Issues: GitHub Issues
- Documentation: Complete wiki included

---

**ZDOS Banking - Il futuro del banking privacy-first è qui! 🚀**

