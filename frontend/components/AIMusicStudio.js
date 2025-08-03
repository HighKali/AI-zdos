import { useState, useEffect } from "react";

export default function AIMusicStudio() {
  const [prompt, setPrompt] = useState("");
  const [tracks, setTracks] = useState([]);
  const [username, setUsername] = useState("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5001/api/music")
      .then(res => res.json())
      .then(setTracks);
  }, []);

  async function createMusic() {
    if (!prompt || !username) return;
    setCreating(true);
    const res = await fetch("http://localhost:5001/api/music/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt, user: username }),
    });
    const track = await res.json();
    setTracks(t => [track, ...t]);
    setPrompt("");
    setCreating(false);
  }

  async function likeTrack(id) {
    await fetch(`http://localhost:5001/api/music/${id}/like`, { method: "POST" });
    setTracks(tracks => tracks.map(t => t.id === id ? { ...t, likes: t.likes + 1 } : t));
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
        placeholder="Descrivi il brano che vuoi (es: jazz rilassante, techno futuristica...)"
        value={prompt}
        onChange={e => setPrompt(e.target.value)}
        style={{ width: 300, marginRight: 8 }}
      />
      <button onClick={createMusic} disabled={creating}>
        {creating ? "Creazione in corso..." : "Crea con AI"}
      </button>
      <div style={{ marginTop: 32 }}>
        {tracks.map(track => (
          <div key={track.id} style={{ borderBottom: "1px solid #eee", padding: 8 }}>
            <b>{track.title}</b> di {track.user} <br />
            <audio controls src={track.url} style={{ width: 200 }}/>
            <div>
              <button onClick={() => likeTrack(track.id)}>❤️ {track.likes}</button>
              | <span>{track.prompt}</span>
              | <span>Data: {new Date(track.createdAt).toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}