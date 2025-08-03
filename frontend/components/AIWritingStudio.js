import { useState, useEffect } from "react";

export default function AIWritingStudio() {
  const [prompt, setPrompt] = useState("");
  const [stories, setStories] = useState([]);
  const [username, setUsername] = useState("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5001/api/writing")
      .then(res => res.json())
      .then(setStories);
  }, []);

  async function createStory() {
    if (!prompt || !username) return;
    setCreating(true);
    const res = await fetch("http://localhost:5001/api/writing/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, user: username }),
    });
    const story = await res.json();
    setStories(s => [story, ...s]);
    setPrompt("");
    setCreating(false);
  }

  async function likeStory(id) {
    await fetch(`http://localhost:5001/api/writing/${id}/like`, { method: "POST" });
    setStories(stories => stories.map(s => s.id === id ? { ...s, likes: s.likes + 1 } : s));
  }

  return (
    <section>
      <input
        placeholder="Tuo nome utente"
        value={username}
        onChange={e => setUsername(e.target.value)}
        style={{ marginRight: 8 }}
      />
      <input
        placeholder="Descrivi la storia che vuoi (es: fantasy, amore, thriller...)"
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        style={{ width: 300, marginRight: 8 }}
      />
      <button onClick={createStory} disabled={creating}>
        {creating ? "Creazione in corso..." : "Crea con AI"}
      </button>
      <div style={{ marginTop: 32 }}>
        {stories.map(story => (
          <div key={story.id} style={{ borderBottom: "1px solid #eee", padding: 8 }}>
            <b>{story.title}</b> di {story.user} <br />
            <div style={{ fontFamily: "serif", margin: "8px 0" }}>{story.content}</div>
            <div>
              <button onClick={() => likeStory(story.id)}>❤️ {story.likes}</button>
              | <span>{story.prompt}</span>
              | <span>Data: {new Date(story.createdAt).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}