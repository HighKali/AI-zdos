// Semplice router di backend per la banca, da estendere
const express = require("express");
const router = express.Router();
const { ethers } = require("ethers");

const users = {};

router.post("/register", (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const { address, email } = req.body;
  if (!ethers.isAddress(address) || !email || !email.endsWith("@proton.me")) {
    return res.status(400).json({ error: "Email Proton e wallet obbligatori!" });
  }
  if (Object.values(users).find(u => u.email === email)) {
    return res.status(409).json({ error: "Email già usata" });
  }
  if (users[address]) return res.status(409).json({ error: "Wallet già registrato" });
  users[address] = { email, ip, registered: Date.now(), balance: 0, staking: 0, txs: [] };
  return res.json({ ok: true, msg: "Registrazione completata" });
});

// ...inserisci qui reward, staking, swap, pool, ecc...

module.exports = router;