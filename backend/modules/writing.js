const express = require("express");
const router = express.Router();

const stories = [];

router.post("/create", (req, res) => {
  const { prompt, user } = req.body;
  const story = {
    id: stories.length + 1,
    user,
    prompt,
    content: `AI Story for prompt "${prompt}" ... [mock text]`,
    title: `AI Story: ${prompt}`,
    createdAt: new Date(),
    likes: 0,
    reads: 0,
  };
  stories.push(story);
  res.json(story);
});

router.get("/", (_, res) => res.json(stories));

router.post("/:id/like", (req, res) => {
  const story = stories.find(s => s.id === Number(req.params.id));
  if (story) {
    story.likes += 1;
    res.json({ ok: true, likes: story.likes });
  } else {
    res.status(404).json({ error: "Story not found" });
  }
});

module.exports = router;