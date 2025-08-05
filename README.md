# 🏦 ZDOS BANKING SYSTEM

## 🚀 Sistema Bancario Privacy-First di Nuova Generazione

**ZDOS Banking** è un sistema bancario digitale innovativo progettato per offrire servizi finanziari con il **minimo di raccolta dati personali**, in piena conformità GDPR.

### ✨ CARATTERISTICHE PRINCIPALI

- 🔐 **Registrazione solo con telefono** + nickname (zero KYC tradizionale)
- 💰 **Dashboard banking mobile-first** con saldo, rewards e cashback
- 📱 **Pagamenti P2P istantanei** e ricariche immediate  
- 💳 **Multi-payment integration** (PayPal, CashApp, SEPA, Crypto)
- 🛡️ **Privacy-by-design** - nessun documento richiesto
- 🎨 **Design cyber responsive** ottimizzato per mobile

### 🧪 TEST RAPIDO
```bash
# Test immediato senza installazione
Apri: frontend/test-banking.html nel browser

# Dati di test:
Telefono: +39 123 456 7890
Nickname: TestUser123  
OTP: 123456
```

### 📚 DOCUMENTAZIONE COMPLETA
- 📖 **[Wiki Completa](./ZDOS-BANKING-WIKI.md)** - Documentazione tecnica dettagliata
- 🏗️ **[Technical Docs](./TECHNICAL_DOCS.md)** - Architettura e API
- 📊 **[Banking Features](./frontend/components/UserDashboard.js)** - Component principale

### 🛠️ INSTALLAZIONE RAPIDA

#### Prerequisiti
- Node.js 18+ 
- npm/yarn
- Browser moderno

#### Setup
```bash
# Clone repository
git clone https://github.com/HighKali/AI-zdos.git
cd AI-zdos

# Frontend
cd frontend
npm install
npm run dev

# Backend (separato)
cd ../backend
npm install  
npm start

# Accesso
Frontend: http://localhost:3000
Backend: http://localhost:8000
Test: frontend/test-banking.html
```

### 🏗️ ARCHITETTURA

```
Frontend: Next.js 14 + React 18 + CSS puro (4000+ righe)
Backend: Node.js + Express + Modular APIs
Security: OTP verification + Passkey generation
Storage: localStorage (frontend) + JSON (backend prototipo)
Payments: PayPal, Stripe, SEPA, Crypto integrations
```

### 🔐 CONFORMITÀ PRIVACY

#### GDPR Compliant ✅
- **Dati minimi**: Solo telefono + nickname
- **Zero KYC**: Nessun documento d'identità  
- **Zero biometria**: Nessun selfie/video/impronte
- **Diritto oblio**: Logout cancella tutti i dati
- **Portabilità**: Export JSON profilo utente

#### Sicurezza
- OTP a 6 cifre per verifica telefono
- Passkey auto-generata (8 caratteri sicuri)
- Crittografia AES-256 per dati sensibili
- JWT tokens con scadenza 24h
- Rate limiting su API critiche

### 💰 FUNZIONALITÀ BANKING

#### Dashboard Completa
- **Saldo disponibile** con toggle privacy
- **Sistema cashback** automatico (2.5% medio)
- **Rewards program** con bonus periodici
- **Azioni P2P**: Ricariche, Bancomat, Crypto
- **Payment methods**: 6+ integrazioni attive

#### Pagamenti Supportati
- 💳 **Carte**: Visa, Mastercard, Amex (via Stripe)
- 🏦 **SEPA**: Bonifici istantanei EU
- 📱 **Digital**: PayPal, CashApp, Apple/Google Pay
- ₿ **Crypto**: Bitcoin, Ethereum, stablecoins
- 🏪 **P2P**: Trasferimenti tra utenti ZDOS

### 🧪 TESTING

#### Test Automatizzato
Il file `frontend/test-banking.html` permette il test completo del sistema:

1. **Apri nel browser** il file HTML standalone
2. **Registrati** con telefono + nickname
3. **Verifica OTP** con codice `123456`
4. **Esplora dashboard** banking completa
5. **Testa logout/re-login** e persistenza dati

#### Test Live Demo
- **Saldo demo**: € 150.50
- **Cashback**: € 12.30
- **Rewards**: € 8.50
- **4 azioni P2P** funzionanti
- **Transazioni simulate** con cronologia

### 🌍 ROADMAP

#### 2025 Q4 - v2.0
- Banking APIs reali (PSD2)
- Analytics avanzate
- AI financial advisor
- App mobile nativa

#### 2026 Q1 - v2.5  
- Marketplace P2P integrato
- NFT wallet + trading
- Biometria opzionale
- Robo-advisor investimenti

#### 2026 Q2 - v3.0
- Full blockchain layer
- White-label solution
- Open Banking compliance
- International expansion

### 🤝 CONTRIBUIRE

```bash
# Fork + clone
git clone https://github.com/[tuo-username]/AI-zdos.git

# Crea feature branch
git checkout -b feature/nuova-funzionalita

# Commit con conventional commits
git commit -m "feat: aggiunta nuova funzionalità"

# Push + Pull Request
git push origin feature/nuova-funzionalita
```

### 📄 LICENZA

MIT License - Vedi [LICENSE](./LICENSE) per dettagli.

### 📞 SUPPORTO

- 📧 Email: support@zdos-banking.com
- 💬 Discord: https://discord.gg/zdos-banking  
- 🐦 Twitter: @ZDOSBanking
- 📱 Telegram: @zdos_community

---

**⚡ ZDOS Banking - Il Futuro dei Pagamenti Privacy-First ⚡**

*Made with ❤️ for financial privacy and user empowerment*
- Real-time transaction monitoring
- Privacy-first architecture

### 🤖 **AI Services**
- **AI Music Studio**: Generate professional music with advanced AI
- **AI Writing Assistant**: Enterprise-grade content creation tools
- **Style Transfer**: Transform content between different styles
- **Auto-Processing**: Automated mastering and optimization

### 🌐 **Mesh Network**
- Peer-to-peer communication infrastructure
- Offline-capable operations
- Distributed data storage
- Resilient network topology
- Real-time status monitoring

### 🔒 **Security & Privacy**
- Zero-knowledge authentication
- End-to-end encryption
- No personal data storage
- Proton email integration
- Rate limiting and DDoS protection

## 🛠️ Technology Stack

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Ethers.js** - Web3 integration
- **Framer Motion** - Animations

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **Helmet** - Security middleware
- **Rate Limiting** - API protection
- **CORS** - Cross-origin requests

### Blockchain
- **Solidity** - Smart contracts
- **OpenZeppelin** - Security standards
- **ERC-20** - Token implementation
- **Ethereum** - Blockchain network

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm 8+
- MetaMask or compatible Web3 wallet
- Proton email account (for privacy)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/HighKali/AI-zdos.git
   cd AI-zdos
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Deploy Smart Contract (Optional)**
   ```bash
   cd ../contracts
   # Deploy SuperBankDSN.sol to your preferred network
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   # Server runs on http://localhost:5001
   ```

2. **Start the frontend application**
   ```bash
   cd frontend
   npm run dev
   # Application runs on http://localhost:3000
   ```

3. **Access the platform**
   - Open http://localhost:3000 in your browser
   - Connect your Web3 wallet
   - Register with a Proton email address

## 📋 API Documentation

### Authentication Endpoints
- `POST /api/users/register` - User registration
- `POST /api/users/login` - User authentication
- `POST /api/users/logout` - Session termination

### Banking Endpoints
- `POST /api/bank/register` - Bank account setup
- `POST /api/bank/balance` - Account balance
- `POST /api/bank/stake` - Stake tokens
- `POST /api/bank/unstake` - Unstake tokens
- `POST /api/bank/transfer` - Transfer funds

### AI Services Endpoints
- `POST /api/music/create` - Generate AI music
- `POST /api/writing/create` - Generate AI content
- `GET /api/music` - List music tracks
- `GET /api/writing` - List written content

### System Endpoints
- `GET /health` - System health check
- `GET /api/bank/stats` - Banking statistics
- `GET /api/users/stats` - User statistics

## 🏗️ Architecture

```
zdos/
├── contracts/          # Smart contracts
│   └── SuperBankDSN.sol
├── backend/            # Node.js API server
│   ├── index.js
│   └── modules/
│       ├── bank.js
│       ├── users.js
│       ├── music.js
│       ├── writing.js
│       └── mesh.js
└── frontend/           # Next.js application
    ├── components/     # React components
    ├── pages/         # Application pages
    └── styles/        # Stylesheets
```

## 🔐 Security Features

### Enterprise-Grade Security
- **Helmet.js** - Security headers
- **Rate Limiting** - API protection
- **Input Validation** - Data sanitization
- **Error Handling** - Secure error responses

### Privacy Protection
- **No PII Storage** - Only wallet addresses and Proton emails
- **Web3 Authentication** - Cryptographic signatures
- **Zero-Knowledge** - Privacy-first architecture
- **Encrypted Communication** - End-to-end encryption

## 🌐 Deployment

### Production Environment
```bash
# Backend
cd backend
npm run build
npm start

# Frontend
cd frontend
npm run build
npm start
```

### Environment Variables
```bash
# Backend (.env)
NODE_ENV=production
PORT=5001
CORS_ORIGIN=https://yourdomain.com

# Frontend (.env.local)
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
```

## 🔮 Roadmap

### Phase 1 (Current)
- ✅ Enterprise UI/UX
- ✅ Banking integration
- ✅ AI music generation
- ✅ Mesh network foundation

### Phase 2 (Q2 2025)
- 🔄 Health analytics module
- 🔄 Social networking features
- 🔄 Advanced AI capabilities
- 🔄 Mobile application

### Phase 3 (Q3 2025)
- 📋 NFT marketplace
- 📋 DeFi lending protocols
- 📋 DAO governance
- 📋 Enterprise partnerships

### Phase 4 (Q4 2025)
- 📋 Multi-chain support
- 📋 Advanced analytics
- 📋 Enterprise licensing
- 📋 Global expansion

## 🤝 Contributing

We welcome contributions from the community! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [Wiki](SUPERBANK-WIKI.md)
- **Issues**: [GitHub Issues](https://github.com/HighKali/AI-zdos/issues)
- **Discord**: [Community Server](https://discord.gg/zdos)
- **Email**: support@zdos.com

## 🙏 Acknowledgments

- OpenZeppelin for security standards
- Ethereum community for blockchain infrastructure
- Proton for privacy-focused email services
- Open source community for tools and libraries

---

**ZDOS** - *Building the future of enterprise AI and Web3 infrastructure*

Made with ❤️ by the ZDOS Team