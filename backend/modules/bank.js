const express = require("express");
const router = express.Router();
const { ethers } = require("ethers");
const crypto = require("crypto");

// In-memory storage (in production, use a proper database)
const users = new Map();
const transactions = new Map();
const stakingPools = new Map();

// Rate limiting for sensitive operations
const rateLimitMap = new Map();

function checkRateLimit(ip, limit = 5, windowMs = 60000) {
  const now = Date.now();
  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, []);
  }
  
  const requests = rateLimitMap.get(ip);
  const validRequests = requests.filter(time => now - time < windowMs);
  
  if (validRequests.length >= limit) {
    return false;
  }
  
  validRequests.push(now);
  rateLimitMap.set(ip, validRequests);
  return true;
}

// Middleware for authentication
function requireAuth(req, res, next) {
  const { address } = req.body;
  if (!address || !users.has(address)) {
    return res.status(401).json({ error: "Authentication required" });
  }
  req.user = users.get(address);
  next();
}

// User registration
router.post("/register", (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  
  if (!checkRateLimit(ip, 3, 300000)) { // 3 attempts per 5 minutes
    return res.status(429).json({ error: "Too many registration attempts" });
  }

  const { address, email, sig, message } = req.body;
  
  // Validation
  if (!ethers.isAddress(address)) {
    return res.status(400).json({ error: "Invalid wallet address" });
  }
  
  if (!email || !email.endsWith("@proton.me")) {
    return res.status(400).json({ 
      error: "Please use a Proton email address for privacy protection" 
    });
  }

  // Check for existing users
  if (users.has(address)) {
    return res.status(409).json({ error: "Wallet already registered" });
  }

  const existingUser = Array.from(users.values()).find(u => u.email === email);
  if (existingUser) {
    return res.status(409).json({ error: "Email already in use" });
  }

  // Create user account
  const userData = {
    address,
    email,
    registeredAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
    balance: 0,
    stakedAmount: 0,
    pendingRewards: 0,
    tier: "basic",
    kyc: false,
    twoFactor: false,
    transactions: [],
    ipHistory: [ip]
  };

  users.set(address, userData);

  // Log registration
  console.log(`New user registered: ${address} (${email})`);

  return res.json({ 
    ok: true, 
    message: "Registration successful",
    user: {
      address,
      email,
      tier: userData.tier,
      registeredAt: userData.registeredAt
    }
  });
});

// Get user profile
router.post("/profile", requireAuth, (req, res) => {
  const user = req.user;
  
  res.json({
    ok: true,
    profile: {
      address: user.address,
      email: user.email,
      balance: user.balance,
      stakedAmount: user.stakedAmount,
      pendingRewards: user.pendingRewards,
      tier: user.tier,
      kyc: user.kyc,
      twoFactor: user.twoFactor,
      registeredAt: user.registeredAt,
      lastLogin: user.lastLogin
    }
  });
});

// Get account balance
router.post("/balance", requireAuth, (req, res) => {
  const user = req.user;
  
  res.json({
    ok: true,
    balance: {
      available: user.balance,
      staked: user.stakedAmount,
      rewards: user.pendingRewards,
      total: user.balance + user.stakedAmount + user.pendingRewards
    }
  });
});

// Stake tokens
router.post("/stake", requireAuth, (req, res) => {
  const { amount } = req.body;
  const user = req.user;
  
  if (!amount || amount <= 0) {
    return res.status(400).json({ error: "Invalid stake amount" });
  }
  
  if (user.balance < amount) {
    return res.status(400).json({ error: "Insufficient balance" });
  }
  
  // Process staking
  user.balance -= amount;
  user.stakedAmount += amount;
  
  // Create transaction record
  const transaction = {
    id: crypto.randomUUID(),
    type: "stake",
    amount,
    timestamp: new Date().toISOString(),
    status: "completed",
    address: user.address
  };
  
  user.transactions.push(transaction);
  transactions.set(transaction.id, transaction);
  
  users.set(user.address, user);
  
  res.json({
    ok: true,
    message: "Staking successful",
    transaction,
    newBalance: {
      available: user.balance,
      staked: user.stakedAmount
    }
  });
});

// Unstake tokens
router.post("/unstake", requireAuth, (req, res) => {
  const { amount } = req.body;
  const user = req.user;
  
  if (!amount || amount <= 0) {
    return res.status(400).json({ error: "Invalid unstake amount" });
  }
  
  if (user.stakedAmount < amount) {
    return res.status(400).json({ error: "Insufficient staked amount" });
  }
  
  // Process unstaking (with rewards calculation)
  const stakingDuration = Date.now() - new Date(user.lastStakeTime || user.registeredAt).getTime();
  const daysStaked = stakingDuration / (1000 * 60 * 60 * 24);
  const annualRate = 0.052; // 5.2% APY
  const rewards = (amount * annualRate * daysStaked) / 365;
  
  user.stakedAmount -= amount;
  user.balance += amount;
  user.pendingRewards += rewards;
  
  // Create transaction record
  const transaction = {
    id: crypto.randomUUID(),
    type: "unstake",
    amount,
    rewards,
    timestamp: new Date().toISOString(),
    status: "completed",
    address: user.address
  };
  
  user.transactions.push(transaction);
  transactions.set(transaction.id, transaction);
  
  users.set(user.address, user);
  
  res.json({
    ok: true,
    message: "Unstaking successful",
    transaction,
    rewards,
    newBalance: {
      available: user.balance,
      staked: user.stakedAmount,
      pendingRewards: user.pendingRewards
    }
  });
});

// Claim rewards
router.post("/claim-rewards", requireAuth, (req, res) => {
  const user = req.user;
  
  if (user.pendingRewards <= 0) {
    return res.status(400).json({ error: "No rewards to claim" });
  }
  
  const rewardAmount = user.pendingRewards;
  user.balance += rewardAmount;
  user.pendingRewards = 0;
  
  // Create transaction record
  const transaction = {
    id: crypto.randomUUID(),
    type: "reward_claim",
    amount: rewardAmount,
    timestamp: new Date().toISOString(),
    status: "completed",
    address: user.address
  };
  
  user.transactions.push(transaction);
  transactions.set(transaction.id, transaction);
  
  users.set(user.address, user);
  
  res.json({
    ok: true,
    message: "Rewards claimed successfully",
    transaction,
    claimedAmount: rewardAmount,
    newBalance: user.balance
  });
});

// Get transaction history
router.post("/transactions", requireAuth, (req, res) => {
  const { page = 1, limit = 10 } = req.body;
  const user = req.user;
  
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  const paginatedTransactions = user.transactions
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(startIndex, endIndex);
  
  res.json({
    ok: true,
    transactions: paginatedTransactions,
    pagination: {
      page,
      limit,
      total: user.transactions.length,
      totalPages: Math.ceil(user.transactions.length / limit)
    }
  });
});

// Transfer funds
router.post("/transfer", requireAuth, (req, res) => {
  const { to, amount, memo } = req.body;
  const user = req.user;
  
  if (!ethers.isAddress(to)) {
    return res.status(400).json({ error: "Invalid recipient address" });
  }
  
  if (!amount || amount <= 0) {
    return res.status(400).json({ error: "Invalid transfer amount" });
  }
  
  if (user.balance < amount) {
    return res.status(400).json({ error: "Insufficient balance" });
  }
  
  if (!users.has(to)) {
    return res.status(400).json({ error: "Recipient not found in system" });
  }
  
  // Process transfer
  user.balance -= amount;
  const recipient = users.get(to);
  recipient.balance += amount;
  
  // Create transaction records
  const transactionId = crypto.randomUUID();
  const timestamp = new Date().toISOString();
  
  const senderTransaction = {
    id: transactionId,
    type: "transfer_out",
    amount: -amount,
    to,
    memo: memo || "",
    timestamp,
    status: "completed",
    address: user.address
  };
  
  const recipientTransaction = {
    id: transactionId,
    type: "transfer_in",
    amount,
    from: user.address,
    memo: memo || "",
    timestamp,
    status: "completed",
    address: to
  };
  
  user.transactions.push(senderTransaction);
  recipient.transactions.push(recipientTransaction);
  
  transactions.set(transactionId, senderTransaction);
  
  users.set(user.address, user);
  users.set(to, recipient);
  
  res.json({
    ok: true,
    message: "Transfer successful",
    transaction: senderTransaction,
    newBalance: user.balance
  });
});

// Get system statistics
router.get("/stats", (req, res) => {
  const totalUsers = users.size;
  const totalStaked = Array.from(users.values()).reduce((sum, user) => sum + user.stakedAmount, 0);
  const totalVolume = transactions.size;
  const activeUsers = Array.from(users.values()).filter(
    user => new Date() - new Date(user.lastLogin) < 24 * 60 * 60 * 1000
  ).length;
  
  res.json({
    ok: true,
    stats: {
      totalUsers,
      totalStaked,
      totalVolume,
      activeUsers,
      averageStake: totalUsers > 0 ? totalStaked / totalUsers : 0,
      systemHealth: "operational"
    }
  });
});

module.exports = router;