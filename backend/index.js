const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

// Import modules
const bank = require("./modules/bank");
const mesh = require("./modules/mesh");
const music = require("./modules/music");
const writing = require("./modules/writing");
const users = require("./modules/users");

const app = express();

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    error: "Too many requests from this IP, please try again later."
  }
});

app.use(limiter);

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://zdos.app', 'https://app.zdos.com'] 
    : ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log(`[${timestamp}] ${req.method} ${req.path} - IP: ${ip}`);
  next();
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development"
  });
});

// API routes
app.use("/api/bank", bank);
app.use("/api/mesh", mesh);
app.use("/api/music", music);
app.use("/api/writing", writing);
app.use("/api/users", users);

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    name: "ZDOS Enterprise Platform API",
    version: "1.0.0",
    description: "Enterprise AI Platform Backend",
    status: "running",
    timestamp: new Date().toISOString(),
    endpoints: {
      health: "/health",
      banking: "/api/bank",
      mesh: "/api/mesh",
      music: "/api/music",
      writing: "/api/writing",
      users: "/api/users"
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: "Endpoint not found",
    path: req.originalUrl,
    method: req.method,
    timestamp: new Date().toISOString()
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' 
      ? "Internal server error" 
      : err.message,
    timestamp: new Date().toISOString(),
    path: req.path
  });
});

const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, () => {
  console.log(`
🚀 ZDOS Enterprise Platform Backend
📡 Server running on port ${PORT}
🌐 Environment: ${process.env.NODE_ENV || 'development'}
⚡ Ready to handle requests
`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Process terminated');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  server.close(() => {
    console.log('Process terminated');
    process.exit(0);
  });
});

module.exports = app;