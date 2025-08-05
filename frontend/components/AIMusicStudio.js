import { useState, useEffect } from "react";

export default function AIMusicStudio() {
  const [prompt, setPrompt] = useState("");
  const [tracks, setTracks] = useState([]);
  const [username, setUsername] = useState("");
  const [creating, setCreating] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("ambient");
  const [duration, setDuration] = useState(120); // seconds
  const [mood, setMood] = useState("happy");
  const [instruments, setInstruments] = useState([]);

  const genres = ["ambient", "electronic", "jazz", "classical", "rock", "pop", "hip-hop", "blues"];
  const moods = ["happy", "sad", "energetic", "calm", "mysterious", "epic", "romantic", "dark"];
  const availableInstruments = ["piano", "guitar", "violin", "drums", "bass", "synth", "flute", "saxophone"];

  useEffect(() => {
    fetch("http://localhost:5001/api/music")
      .then(res => res.json())
      .then(setTracks)
      .catch(() => setTracks([])); // Fallback if backend is offline
  }, []);

  async function createMusic() {
    if (!prompt || !username) {
      alert("Please enter your username and music description");
      return;
    }
    
    setCreating(true);
    
    try {
      const res = await fetch("http://localhost:5001/api/music/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          prompt, 
          user: username,
          genre: selectedGenre,
          duration,
          mood,
          instruments
        }),
      });
      
      if (res.ok) {
        const track = await res.json();
        setTracks(t => [track, ...t]);
        setPrompt("");
      } else {
        // Simulate track creation for demo
        const demoTrack = {
          id: Date.now(),
          title: `AI Generated - ${prompt.slice(0, 20)}...`,
          user: username,
          url: "#", // Demo URL
          likes: 0,
          prompt,
          genre: selectedGenre,
          duration: `${Math.floor(duration/60)}:${duration%60}`,
          mood,
          instruments,
          createdAt: new Date().toISOString()
        };
        setTracks(t => [demoTrack, ...t]);
        setPrompt("");
      }
    } catch (error) {
      console.error("Error creating music:", error);
      alert("Failed to create music. Please try again.");
    } finally {
      setCreating(false);
    }
  }

  async function likeTrack(id) {
    try {
      await fetch(`http://localhost:5001/api/music/${id}/like`, { method: "POST" });
      setTracks(tracks => tracks.map(t => t.id === id ? { ...t, likes: t.likes + 1 } : t));
    } catch (error) {
      // Simulate like for demo
      setTracks(tracks => tracks.map(t => t.id === id ? { ...t, likes: t.likes + 1 } : t));
    }
  }

  const toggleInstrument = (instrument) => {
    setInstruments(prev => 
      prev.includes(instrument) 
        ? prev.filter(i => i !== instrument)
        : [...prev, instrument]
    );
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">AI Music Creation Studio</h3>
        <p className="card-subtitle">Generate professional music with AI assistance</p>
      </div>

      {/* Creation Form */}
      <div className="space-y-6">
        {/* User Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Your Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-secondary mb-2">
              Duration (seconds)
            </label>
            <input
              type="range"
              min="30"
              max="300"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              className="w-full"
            />
            <div className="text-sm text-muted text-center mt-1">
              {Math.floor(duration/60)}:{(duration%60).toString().padStart(2, '0')}
            </div>
          </div>
        </div>

        {/* Music Description */}
        <div>
          <label className="block text-sm font-medium text-secondary mb-2">
            Describe Your Music
          </label>
          <textarea
            placeholder="Describe the music you want to create (e.g., 'uplifting ambient track with soft piano and nature sounds')"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={3}
            className="w-full"
          />
        </div>

        {/* Genre Selection */}
        <div>
          <label className="block text-sm font-medium text-secondary mb-2">
            Genre
          </label>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
            {genres.map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`btn btn-sm ${
                  selectedGenre === genre ? 'btn-primary' : 'btn-secondary'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        {/* Mood Selection */}
        <div>
          <label className="block text-sm font-medium text-secondary mb-2">
            Mood
          </label>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
            {moods.map((moodOption) => (
              <button
                key={moodOption}
                onClick={() => setMood(moodOption)}
                className={`btn btn-sm ${
                  mood === moodOption ? 'btn-primary' : 'btn-secondary'
                }`}
              >
                {moodOption}
              </button>
            ))}
          </div>
        </div>

        {/* Instrument Selection */}
        <div>
          <label className="block text-sm font-medium text-secondary mb-2">
            Instruments (optional)
          </label>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
            {availableInstruments.map((instrument) => (
              <button
                key={instrument}
                onClick={() => toggleInstrument(instrument)}
                className={`btn btn-sm ${
                  instruments.includes(instrument) ? 'btn-primary' : 'btn-secondary'
                }`}
              >
                {instrument}
              </button>
            ))}
          </div>
        </div>

        {/* Create Button */}
        <div className="flex justify-center">
          <button
            onClick={createMusic}
            disabled={creating || !prompt || !username}
            className="btn btn-primary btn-lg"
          >
            {creating ? (
              <>
                <div className="spinner"></div>
                <span>Creating Music...</span>
              </>
            ) : (
              <>
                <span>🎵</span>
                <span>Generate AI Music</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Generated Tracks */}
      {tracks.length > 0 && (
        <div className="mt-8">
          <h4 className="text-lg font-semibold mb-4">Generated Tracks</h4>
          <div className="space-y-4">
            {tracks.map((track) => (
              <div key={track.id} className="card bg-secondary">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h5 className="font-semibold">{track.title}</h5>
                      <span className="text-sm bg-primary text-white px-2 py-1 rounded">
                        {track.genre}
                      </span>
                      <span className="text-sm bg-accent text-white px-2 py-1 rounded">
                        {track.mood}
                      </span>
                    </div>
                    
                    <div className="text-sm text-muted mb-2">
                      By {track.user} • {track.duration} • {new Date(track.createdAt).toLocaleDateString()}
                    </div>
                    
                    <div className="text-sm mb-3">
                      <strong>Prompt:</strong> {track.prompt}
                    </div>
                    
                    {track.instruments && track.instruments.length > 0 && (
                      <div className="text-sm mb-3">
                        <strong>Instruments:</strong> {track.instruments.join(", ")}
                      </div>
                    )}

                    {/* Audio Player Placeholder */}
                    <div className="bg-primary/10 border border-primary/20 rounded-md p-4 mb-3">
                      <div className="flex items-center gap-3">
                        <button className="btn btn-primary btn-sm">
                          ▶️ Play
                        </button>
                        <div className="flex-1 bg-primary/20 h-2 rounded-full">
                          <div className="bg-primary h-2 rounded-full w-1/3"></div>
                        </div>
                        <span className="text-sm text-muted">0:45 / {track.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <button
                      onClick={() => likeTrack(track.id)}
                      className="btn btn-secondary btn-sm"
                    >
                      ❤️ {track.likes}
                    </button>
                    <button className="btn btn-secondary btn-sm">
                      📥 Download
                    </button>
                    <button className="btn btn-secondary btn-sm">
                      🔄 Remix
                    </button>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="btn btn-secondary btn-sm">
                      📤 Share
                    </button>
                    <button className="btn btn-secondary btn-sm">
                      💾 Save
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tracks.length === 0 && (
        <div className="text-center py-8 text-muted">
          <div className="text-4xl mb-4">🎵</div>
          <p>No tracks yet. Create your first AI-generated music!</p>
        </div>
      )}
    </div>
  );
}