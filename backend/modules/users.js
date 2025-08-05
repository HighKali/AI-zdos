const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const { ethers } = require("ethers");

// In-memory storage (use database in production)
const users = new Map();
const sessions = new Map();

// Rate limiting
const rateLimitMap = new Map();

function checkRateLimit(ip, limit = 10, windowMs = 60000) {
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

// Enhanced user registration
router.post("/register", (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  
  if (!checkRateLimit(ip, 5, 300000)) { // 5 attempts per 5 minutes
    return res.status(429).json({ error: "Too many registration attempts" });
  }

  const { username, email, walletAddress } = req.body;
  
  // Enhanced validation
  if (!username || username.length < 3 || username.length > 20) {
    return res.status(400).json({ error: "Username must be 3-20 characters" });
  }
  
  if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
    return res.status(400).json({ error: "Username can only contain letters, numbers, hyphens and underscores" });
  }
  
  if (email && !email.endsWith("@proton.me")) {
    return res.status(400).json({ error: "Please use a Proton email for privacy" });
  }
  
  if (walletAddress && !ethers.isAddress(walletAddress)) {
    return res.status(400).json({ error: "Invalid wallet address" });
  }

  // Check for existing users
  const existingUser = Array.from(users.values()).find(u => 
    u.username.toLowerCase() === username.toLowerCase() || 
    (email && u.email === email) ||
    (walletAddress && u.walletAddress === walletAddress)
  );
  
  if (existingUser) {
    if (existingUser.username.toLowerCase() === username.toLowerCase()) {
      return res.status(409).json({ error: "Username already exists" });
    }
    if (email && existingUser.email === email) {
      return res.status(409).json({ error: "Email already registered" });
    }
    if (walletAddress && existingUser.walletAddress === walletAddress) {
      return res.status(409).json({ error: "Wallet already registered" });
    }
  }

  // Create user
  const userId = crypto.randomUUID();
  const userData = {
    id: userId,
    username,
    email: email || null,
    walletAddress: walletAddress || null,
    joinedAt: new Date().toISOString(),
    lastActive: new Date().toISOString(),
    profile: {
      avatar: null,
      bio: "",
      preferences: {
        theme: "light",
        notifications: true,
        privacy: "public"
      }
    },
    stats: {
      loginCount: 0,
      lastLogin: null,
      totalSessions: 0
    },
    security: {
      twoFactorEnabled: false,
      ipHistory: [ip],
      lastPasswordChange: new Date().toISOString()
    },
    permissions: {
      role: "user",
      verified: false,
      features: ["basic"]
    }
  };

  users.set(userId, userData);

  // Log registration
  console.log(`New user registered: ${username} (ID: ${userId})`);

  res.json({ 
    ok: true, 
    message: "Registration successful",
    user: {
      id: userId,
      username,
      email: email || null,
      walletAddress: walletAddress || null,
      joinedAt: userData.joinedAt
    }
  });
});

// User login
router.post("/login", (req, res) => {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  
  if (!checkRateLimit(ip, 10, 300000)) {
    return res.status(429).json({ error: "Too many login attempts" });
  }

  const { identifier, walletAddress, signature } = req.body;
  
  // Find user by username, email, or wallet
  let user = null;
  for (const [id, userData] of users) {
    if (userData.username === identifier || 
        userData.email === identifier || 
        userData.walletAddress === walletAddress) {
      user = { id, ...userData };
      break;
    }
  }

  if (!user) {
    return res.status(401).json({ error: "User not found" });
  }

  // For Web3 authentication, verify signature
  if (walletAddress && signature) {
    // In production, verify the signature properly
    // const message = `Login to ZDOS at ${Date.now()}`;
    // const recoveredAddress = ethers.verifyMessage(message, signature);
    // if (recoveredAddress.toLowerCase() !== walletAddress.toLowerCase()) {
    //   return res.status(401).json({ error: "Invalid signature" });
    // }
  }

  // Update user stats
  user.stats.loginCount += 1;
  user.stats.lastLogin = new Date().toISOString();
  user.stats.totalSessions += 1;
  user.lastActive = new Date().toISOString();
  
  if (!user.security.ipHistory.includes(ip)) {
    user.security.ipHistory.push(ip);
  }

  users.set(user.id, user);

  // Create session
  const sessionId = crypto.randomUUID();
  const sessionData = {
    id: sessionId,
    userId: user.id,
    createdAt: new Date().toISOString(),
    lastActivity: new Date().toISOString(),
    ip,
    userAgent: req.headers['user-agent'] || 'unknown'
  };

  sessions.set(sessionId, sessionData);

  res.json({
    ok: true,
    message: "Login successful",
    session: {
      id: sessionId,
      expiresIn: 24 * 60 * 60 * 1000 // 24 hours
    },
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      walletAddress: user.walletAddress,
      role: user.permissions.role,
      verified: user.permissions.verified
    }
  });
});

// Get user profile
router.get("/profile/:userId", (req, res) => {
  const { userId } = req.params;
  
  if (!users.has(userId)) {
    return res.status(404).json({ error: "User not found" });
  }

  const user = users.get(userId);
  
  res.json({
    ok: true,
    profile: {
      id: userId,
      username: user.username,
      email: user.email,
      walletAddress: user.walletAddress,
      joinedAt: user.joinedAt,
      lastActive: user.lastActive,
      bio: user.profile.bio,
      avatar: user.profile.avatar,
      verified: user.permissions.verified,
      role: user.permissions.role,
      stats: {
        loginCount: user.stats.loginCount,
        totalSessions: user.stats.totalSessions
      }
    }
  });
});

// Update user profile
router.put("/profile/:userId", (req, res) => {
  const { userId } = req.params;
  const { bio, avatar, preferences } = req.body;
  
  if (!users.has(userId)) {
    return res.status(404).json({ error: "User not found" });
  }

  const user = users.get(userId);
  
  // Update profile fields
  if (bio !== undefined) user.profile.bio = bio.slice(0, 500); // Limit bio length
  if (avatar !== undefined) user.profile.avatar = avatar;
  if (preferences !== undefined) {
    user.profile.preferences = { ...user.profile.preferences, ...preferences };
  }
  
  user.lastActive = new Date().toISOString();
  users.set(userId, user);

  res.json({
    ok: true,
    message: "Profile updated successfully",
    profile: user.profile
  });
});

// Get all users (admin only or public list)
router.get("/list", (req, res) => {
  const { page = 1, limit = 20, search = "" } = req.query;
  
  const allUsers = Array.from(users.values());
  
  // Filter by search term
  const filteredUsers = search 
    ? allUsers.filter(user => 
        user.username.toLowerCase().includes(search.toLowerCase())
      )
    : allUsers;

  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + parseInt(limit);
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

  // Public user data only
  const publicUsers = paginatedUsers.map(user => ({
    id: user.id,
    username: user.username,
    joinedAt: user.joinedAt,
    verified: user.permissions.verified,
    role: user.permissions.role,
    avatar: user.profile.avatar
  }));

  res.json({
    ok: true,
    users: publicUsers,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total: filteredUsers.length,
      totalPages: Math.ceil(filteredUsers.length / limit)
    }
  });
});

// Get user statistics
router.get("/stats", (req, res) => {
  const totalUsers = users.size;
  const verifiedUsers = Array.from(users.values()).filter(u => u.permissions.verified).length;
  const activeUsers = Array.from(users.values()).filter(u => 
    new Date() - new Date(u.lastActive) < 24 * 60 * 60 * 1000
  ).length;
  
  const recentRegistrations = Array.from(users.values()).filter(u =>
    new Date() - new Date(u.joinedAt) < 7 * 24 * 60 * 60 * 1000
  ).length;

  res.json({
    ok: true,
    stats: {
      totalUsers,
      verifiedUsers,
      activeUsers,
      recentRegistrations,
      totalSessions: sessions.size,
      averageLoginCount: totalUsers > 0 
        ? Array.from(users.values()).reduce((sum, u) => sum + u.stats.loginCount, 0) / totalUsers 
        : 0
    }
  });
});

// Logout
router.post("/logout", (req, res) => {
  const { sessionId } = req.body;
  
  if (sessions.has(sessionId)) {
    sessions.delete(sessionId);
    res.json({ ok: true, message: "Logged out successfully" });
  } else {
    res.status(404).json({ error: "Session not found" });
  }
});

// Verify session
router.post("/verify-session", (req, res) => {
  const { sessionId } = req.body;
  
  if (!sessions.has(sessionId)) {
    return res.status(401).json({ error: "Invalid session" });
  }

  const session = sessions.get(sessionId);
  const sessionAge = Date.now() - new Date(session.createdAt).getTime();
  
  // Check if session expired (24 hours)
  if (sessionAge > 24 * 60 * 60 * 1000) {
    sessions.delete(sessionId);
    return res.status(401).json({ error: "Session expired" });
  }

  // Update last activity
  session.lastActivity = new Date().toISOString();
  sessions.set(sessionId, session);

  const user = users.get(session.userId);
  
  res.json({
    ok: true,
    session,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      walletAddress: user.walletAddress,
      role: user.permissions.role,
      verified: user.permissions.verified
    }
  });
});

module.exports = router;