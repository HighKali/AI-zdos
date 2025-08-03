const express = require("express");
const router = express.Router();

const tracks = [];

router.post("/create", (req, res) => {
  const { prompt, user } = req.body;
  const track = {
    id: tracks.length + 1,
    user,
    prompt,
    url: `/ai-music/${Date.now()}.mp3`,
    title: `AI Track: ${prompt}`,
    createdAt: new Date(),
    likes: 0,
    plays: 0,
  };
  tracks.push(track);
  res.json(track);
});

router.get("/", (_, res) => res.json(tracks));

router.post("/:id/like", (req, res) => {
  const track = tracks.find(t => t.id === Number(req.params.id));
  if (track) {
    track.likes += 1;
    res.json({ ok: true, likes: track.likes });
  } else {
    res.status(404).json({ error: "Track not found" });
  }
});

module.exports = router;