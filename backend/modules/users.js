const express = require("express");
const router = express.Router();

const users = [];

router.post("/register", (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).json({ error: "Username required" });
  if (users.find(u => u.username === username))
    return res.status(409).json({ error: "Username exists" });
  users.push({ username, joined: new Date() });
  res.json({ ok: true });
});

module.exports = router;