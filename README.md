# 🏦 ZDOS Banking System - Production Ready

## 🚀 Sistema Bancario Privacy-First

Sistema bancario moderno con registrazione via telefono, OTP sicuro e dashboard completa per gestione finanziaria.

### ✨ Caratteristiche Principali

- **📱 Registrazione Privacy-First**: Solo numero telefono + OTP
- **🔐 Sicurezza Avanzata**: Verifica OTP con backend sicuro
- **💳 Dashboard Completa**: Saldo, cashback, rewards, transazioni
- **🎮 Gaming Integration**: Sistema token ZDOS integrato
- **📱 Mobile Responsive**: Design ottimizzato per tutti i dispositivi
- **🎨 UI Cyber-Retro**: Estetica moderna con effetti neon

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

