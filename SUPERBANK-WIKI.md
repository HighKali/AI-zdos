# 🏦 ZDOS (ex SuperBank) – Super Wiki

Benvenuto nella Super Wiki di **ZDOS**: l'app bancaria e AI definitiva, privacy-by-default, con mesh network, DeFi, AI, musica, scrittura, e tutto quello che serve.

## Indice

- Cos'è ZDOS?
- Architettura
- Come installare e avviare
- Smart contract DSN
- Backend: API e mesh
- Frontend: area clienti e AI
- Mesh network decentralizzata
- Funzionalità
- Sicurezza & privacy
- Estensioni e personalizzazioni
- FAQ

## Cos'è ZDOS?

ZDOS è una piattaforma estendibile che integra servizi bancari decentralizzati, AI generativa (musica/scrittura), mesh network, reward, staking, email sicura e moduli futuri (salute, produttività, social...).

## Architettura

```
zdos/
  contracts/
  backend/
  frontend/
```

- **Smart contract**: DSN token, staking, reward
- **Backend**: API, mesh, AI, musica, scrittura, utenti
- **Frontend**: dashboard, AI, banca, musica, scrittura, mesh, mail

## Come installare

1. Deploy smart contract `SuperBankDSN.sol` su testnet/mainnet
2. `cd backend && npm install && node index.js`
3. `cd frontend && npm install && npm run dev`
4. Visita http://localhost:3000

## Smart contract DSN

- ERC20 NETKALI ($DSN)
- Mint e stake/unstake con reward % annuale

## Backend

- Moduli: banca, mesh, musica, scrittura, utenti
- Sicurezza: firma Web3, rate limit, helmet
- Mesh: relay libp2p per fallback P2P

## Frontend

- Dashboard, banca, AI, musica, scrittura
- Mesh status, login web3, email decentralizzata
- Modularità e scalabilità

## Mesh Network

- Basata su libp2p
- Operatività anche senza server centrale/LAN

## Funzionalità principali

- Privacy-first, reward, staking, cashback, AI, musica, scrittura, mesh relay
- Aggiornamenti automatici
- Pronto per estensione

## Sicurezza

- NO dati sensibili, solo wallet/email Proton
- Login solo via firma Web3
- Rate limit, helmet, audit trail
- Mesh = privacy by design

## Personalizzazioni

- Aggiungi moduli in backend/frontend
- Estendi smart contract per nuovi servizi
- Integra NFT/lending/social/health/analytics

## FAQ

**La mesh funziona senza internet?**  
Sì: peer in LAN/WiFi relayano dati/tx/email.

**Posso aggiungere moduli?**  
Sì, struttura modulare.

**Dati sicuri?**  
Sì; niente password, niente selfie.

**Reward anche offline?**  
Sì: relay mesh e sync in seguito.

---

**ZDOS è la tua infrastruttura AI+Web3 definitiva, pronta per ogni esigenza.**