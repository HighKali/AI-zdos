import UserDashboard from "../components/UserDashboard";
import { useState, useEffect } from "react";

export default function Home() {
  const [stats, setStats] = useState({
    activePlayers: 1247,
    gamesOnline: 156,
    artists: 89,
    aiOperations: 89234
  });

  const [currentGame, setCurrentGame] = useState("DOOM");

  const retroGames = [
    {
      title: "DOOM ONLINE",
      description: "Classic FPS multiplayer madness",
      icon: "👹",
      players: 156,
      status: "ONLINE",
      difficulty: "ULTRA-VIOLENCE"
    },
    {
      title: "DUKE NUKEM 3D",
      description: "Hail to the king, baby!",
      icon: "💪",
      players: 89,
      status: "ONLINE", 
      difficulty: "COME GET SOME"
    },
    {
      title: "RETRO TOURNAMENT",
      description: "Weekly gaming championships",
      icon: "🏆",
      players: 234,
      status: "LIVE",
      difficulty: "NIGHTMARE"
    }
  ];

  const artistTools = [
    {
      title: "AI MUSIC STUDIO",
      description: "Create epic soundtracks",
      icon: "🎵",
      plugins: 47,
      category: "AUDIO"
    },
    {
      title: "VISUAL EDITOR",
      description: "Pixel art & sprite creation",
      icon: "🎨",
      plugins: 32,
      category: "GRAPHICS"
    },
    {
      title: "SOUND BANK",
      description: "Retro SFX & samples",
      icon: "🔊",
      plugins: 156,
      category: "SAMPLES"
    },
    {
      title: "AI WRITER",
      description: "Game storylines & dialogue",
      icon: "📝",
      plugins: 23,
      category: "NARRATIVE"
    }
  ];

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <div className="mb-8">
          <h1 className="neon-text mb-6" data-text="ZDOS ARCADE">
            ZDOS ARCADE
          </h1>
          <div className="glitch-text text-xl mb-8" data-text="RETRO GAMING MEETS AI POWER">
            RETRO GAMING MEETS AI POWER
          </div>
          <p className="text-secondary font-mono max-w-3xl mx-auto mb-8">
            Welcome to the ultimate retro gaming platform. Play classic games online, 
            create with AI-powered tools, and join the pixel revolution!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="btn btn-primary btn-lg">
              <span>🎮</span>
              <span>START GAMING</span>
            </button>
            <button className="btn btn-accent btn-lg">
              <span>🎨</span>
              <span>ARTIST MODE</span>
            </button>
            <button className="btn btn-secondary btn-lg">
              <span>🛒</span>
              <span>CYBER STORE</span>
            </button>
          </div>

          {/* Console Button Controls */}
          <div className="flex justify-center gap-4 mb-8">
            <div className="console-btn btn-a">A</div>
            <div className="console-btn btn-b">B</div>
            <div className="console-btn btn-x">X</div>
            <div className="console-btn btn-y">Y</div>
          </div>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="gaming-card text-center p-6">
            <div className="text-4xl font-bold text-primary mb-2 font-retro">
              {stats.activePlayers}
            </div>
            <div className="text-sm text-secondary font-mono">PLAYERS ONLINE</div>
            <div className="status-indicator status-gaming mt-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>ACTIVE</span>
            </div>
          </div>
          
          <div className="gaming-card text-center p-6">
            <div className="text-4xl font-bold text-success mb-2 font-retro">
              {stats.gamesOnline}
            </div>
            <div className="text-sm text-secondary font-mono">GAMES RUNNING</div>
            <div className="status-indicator status-online mt-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span>LIVE</span>
            </div>
          </div>
          
          <div className="gaming-card text-center p-6">
            <div className="text-4xl font-bold text-accent mb-2 font-retro">
              {stats.artists}
            </div>
            <div className="text-sm text-secondary font-mono">ARTISTS CREATING</div>
            <div className="status-indicator status-pending mt-2">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span>BUSY</span>
            </div>
          </div>
          
          <div className="gaming-card text-center p-6">
            <div className="text-4xl font-bold text-warning mb-2 font-retro">
              {stats.aiOperations.toLocaleString()}
            </div>
            <div className="text-sm text-secondary font-mono">AI OPERATIONS</div>
            <div className="status-indicator status-gaming mt-2">
              <div className="w-2 h-2 bg-warning rounded-full"></div>
              <span>PROCESSING</span>
            </div>
          </div>
        </div>
      </section>

      {/* Gaming Hub */}
      <section className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-primary font-retro text-3xl font-bold mb-4">
            GAMING HUB
          </h2>
          <p className="text-secondary font-mono">
            Classic games, modern multiplayer experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {retroGames.map((game, index) => (
            <div key={index} className="gaming-card hover:shadow-lg transition-all">
              <div className="text-center mb-4">
                <div className="text-6xl mb-4">{game.icon}</div>
                <h3 className="font-retro font-bold text-xl text-neon mb-2">
                  {game.title}
                </h3>
                <p className="text-secondary font-mono text-sm mb-4">
                  {game.description}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-sm">PLAYERS:</span>
                  <span className="font-retro font-bold text-primary">{game.players}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-mono text-sm">STATUS:</span>
                  <div className="status-indicator status-gaming">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>{game.status}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-mono text-sm">DIFFICULTY:</span>
                  <span className="font-mono text-xs text-error">{game.difficulty}</span>
                </div>

                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${(game.players / 200) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <button className="btn btn-primary flex-1">
                  <span>▶️</span>
                  <span>PLAY NOW</span>
                </button>
                <button className="btn btn-secondary">
                  <span>👥</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Artist Studio */}
      <section className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-accent font-retro text-3xl font-bold mb-4">
            ARTIST STUDIO
          </h2>
          <p className="text-secondary font-mono">
            Professional tools with AI superpowers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {artistTools.map((tool, index) => (
            <div key={index} className="artist-card hover:shadow-lg transition-all">
              <div className="text-center mb-4">
                <div className="text-4xl mb-3">{tool.icon}</div>
                <h3 className="font-retro font-bold text-lg text-neon mb-2">
                  {tool.title}
                </h3>
                <p className="text-secondary font-mono text-sm mb-3">
                  {tool.description}
                </p>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs">PLUGINS:</span>
                  <span className="font-retro font-bold text-accent">{tool.plugins}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-mono text-xs">CATEGORY:</span>
                  <span className="font-mono text-xs text-secondary">{tool.category}</span>
                </div>
              </div>

              <button className="btn btn-accent w-full">
                <span>🚀</span>
                <span>LAUNCH</span>
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* User Registration */}
      <section className="mb-12">
        <div className="gaming-card">
          <div className="card-header">
            <h2 className="card-title text-neon font-retro">PLAYER REGISTRATION</h2>
            <p className="card-subtitle font-mono">Join the retro gaming revolution</p>
          </div>
          <UserDashboard />
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center">
        <div className="arcade-screen p-8">
          <h2 className="text-primary font-retro text-2xl font-bold mb-4">
            READY PLAYER ONE?
          </h2>
          <p className="mb-6 font-mono text-secondary">
            Join thousands of gamers and artists in the ultimate retro experience
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="btn btn-primary btn-lg">
              <span>🎮</span>
              <span>JOIN MULTIPLAYER</span>
            </button>
            <button className="btn btn-accent btn-lg">
              <span>🎨</span>
              <span>CREATE ART</span>
            </button>
            <button className="btn btn-secondary btn-lg">
              <span>💰</span>
              <span>EARN TOKENS</span>
            </button>
          </div>

          <div className="font-mono text-sm text-muted">
            PRESS START TO CONTINUE...
          </div>
        </div>
      </section>
    </div>
  );
}