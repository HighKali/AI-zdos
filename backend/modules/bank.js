// Production banking module with real authentication
const express = require("express");
const router = express.Router();
const crypto = require("crypto");

const users = {};
const otpCodes = {};

// Generate OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP via SMS (integrate with SMS service)
router.post("/send-otp", (req, res) => {
  const { phone } = req.body;
  
  if (!phone || !/^[\+]?[1-9][\d]{0,15}$/.test(phone.replace(/\s/g, ''))) {
    return res.status(400).json({ error: "Numero telefono non valido" });
  }
  
  const otp = generateOTP();
  otpCodes[phone] = {
    code: otp,
    expires: Date.now() + 300000, // 5 minutes
    attempts: 0
  };
  
  // TODO: Integrate with SMS service (Twilio, AWS SNS, etc.)
  console.log(`OTP for ${phone}: ${otp}`);
  
  res.json({ success: true, message: "OTP inviato" });
});

// Verify OTP and register user
router.post("/verify-otp", (req, res) => {
  const { phone, nickname, otp } = req.body;
  
  if (!phone || !nickname || !otp) {
    return res.status(400).json({ error: "Tutti i campi sono richiesti" });
  }
  
  const otpData = otpCodes[phone];
  if (!otpData) {
    return res.status(400).json({ error: "OTP non trovato o scaduto" });
  }
  
  if (Date.now() > otpData.expires) {
    delete otpCodes[phone];
    return res.status(400).json({ error: "OTP scaduto" });
  }
  
  if (otpData.attempts >= 3) {
    delete otpCodes[phone];
    return res.status(400).json({ error: "Troppi tentativi" });
  }
  
  if (otpData.code !== otp) {
    otpData.attempts++;
    return res.status(400).json({ error: "Codice OTP non valido" });
  }
  
  // Check if user already exists
  if (users[phone]) {
    return res.status(409).json({ error: "Utente già registrato" });
  }
  
  // Generate secure passkey
  const passkey = crypto.randomBytes(4).toString('hex').toUpperCase();
  
  // Create user
  users[phone] = {
    phone,
    nickname,
    passkey,
    balance: 0.00,
    rewards: 0.00,
    cashback: 0.00,
    verified: true,
    registeredAt: new Date().toISOString(),
    transactions: []
  };
  
  // Clean up OTP
  delete otpCodes[phone];
  
  res.json({ 
    success: true, 
    passkey,
    message: "Registrazione completata" 
  });
});

// Get user data
router.post("/user-data", (req, res) => {
  const { phone, passkey } = req.body;
  
  const user = users[phone];
  if (!user || user.passkey !== passkey) {
    return res.status(401).json({ error: "Credenziali non valide" });
  }
  
  res.json({
    nickname: user.nickname,
    balance: user.balance,
    rewards: user.rewards,
    cashback: user.cashback,
    transactions: user.transactions
  });
});

module.exports = router;