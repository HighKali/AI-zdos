import { useState, useEffect } from "react";
import Layout from "../components/Layout";

export default function GamingHub() {
  const [selectedGame, setSelectedGame] = useState("doom");
  const [lobbyData, setLobbyData] = useState({
    doom: {
      servers: [
        { id: 1, name: "MARS BASE ALPHA", players: "8/12", difficulty: "ULTRA-VIOLENCE", ping: 45, map: "E1M1" },
        { id: 2, name: "HELL ON EARTH", players: "12/16", difficulty: "NIGHTMARE", ping: 78, map: "MAP01" },
        { id: 3, name: "INFERNO STATION", players: "6/8", difficulty: "HURT ME PLENTY", ping: 32, map: "E3M7" },
        { id: 4, name: "EUROPEAN SECTOR", players: "4/12", difficulty: "ULTRA-VIOLENCE", ping: 89, map: "MAP15" }
      ],
      totalPlayers: 1247,
      version: "ZDOOM 4.8.2",
      mods: ["BRUTAL DOOM", "PROJECT BRUTALITY", "COMPLEX DOOM"]
    },
    duke: {
      servers: [
        { id: 1, name: "DUKE BURGER MAYHEM", players: "6/8", difficulty: "COME GET SOME", ping: 34, map: "E1L1" },
        { id: 2, name: "ALIEN INVASION NYC", players: "10/12", difficulty: "DAMN I'M GOOD", ping: 56, map: "E2L1" },
        { id: 3, name: "SPACE CASINO", players: "4/8", difficulty: "PIECE OF CAKE", ping: 67, map: "E4L2" },
        { id: 4, name: "SHRAPNEL CITY", players: "8/16", difficulty: "COME GET SOME", ping: 43, map: "E3L4" }
      ],
      totalPlayers: 867,
      version: "EDUKE32 SYNTH",
      mods: ["HIGH RES PACK", "DUKE PLUS", "DUKE NUKEM FOREVER MOD"]
    }
  });

  const [playerStats, setPlayerStats] = useState({
    kills: 15678,
    deaths: 4231,
    ratio: 3.7,
    level: 47,
    experience: 89234,
    achievements: 156
  });

  const gameInfo = {
    doom: {
      title: "DOOM ETERNAL ONLINE",
      subtitle: "RIP AND TEAR UNTIL IT IS DONE",
      icon: "👹",
      color: "text-error",
      bgColor: "from-red-900/20 to-orange-900/20",
      description: "The classic FPS that started it all. Join epic multiplayer battles across Mars and Hell dimensions.",
      features: [
        "🔫 Classic weapon arsenal",
        "👹 Demon hordes",
        "🏟️ Iconic maps",
        "⚔️ Deathmatch & Team modes",
        "🎯 Custom mods support",
        "🏆 Ranking system"
      ]
    },
    duke: {
      title: "DUKE NUKEM 3D ONLINE",
      subtitle: "HAIL TO THE KING, BABY!",
      icon: "💪",
      color: "text-warning",
      bgColor: "from-yellow-900/20 to-red-900/20",
      description: "The king of action heroes is back! Fight alien scum across Earth's cities with style and attitude.",
      features: [
        "💥 Devastating weapons",
        "👽 Alien invasion",
        "🏙️ Urban battlegrounds",
        "🎮 Classic gameplay",
        "🎤 Duke's one-liners",
        "🏆 Tournament mode"
      ]
    }
  };

  const currentGame = gameInfo[selectedGame];
  const currentLobby = lobbyData[selectedGame];

  return (
    <Layout>
      <div className="animate-fade-in">
        {/* Header */}
        <section className="text-center mb-8">
          <h1 className="neon-text mb-4" data-text="GAMING HUB">
            GAMING HUB
          </h1>
          <div className="glitch-text text-lg mb-6" data-text="RETRO MULTIPLAYER ARCADE">
            RETRO MULTIPLAYER ARCADE
          </div>
        </section>

        {/* Game Selection */}
        <section className="mb-8">
          <div className="flex justify-center gap-4 mb-8">
            <button 
              onClick={() => setSelectedGame("doom")}
              className={`game-selector ${selectedGame === "doom" ? "active" : ""}`}
            >
              <span className="text-4xl">👹</span>
              <div>
                <div className="font-retro font-bold">DOOM</div>
                <div className="text-xs text-secondary">ETERNAL ONLINE</div>
              </div>
            </button>
            
            <button 
              onClick={() => setSelectedGame("duke")}
              className={`game-selector ${selectedGame === "duke" ? "active" : ""}`}
            >
              <span className="text-4xl">💪</span>
              <div>
                <div className="font-retro font-bold">DUKE NUKEM</div>
                <div className="text-xs text-secondary">3D ONLINE</div>
              </div>
            </button>
          </div>
        </section>

        {/* Game Info Panel */}
        <section className="mb-8">
          <div className={`gaming-card bg-gradient-to-r ${currentGame.bgColor} border-2 border-primary`}>
            <div className="flex items-center gap-6 mb-6">
              <div className="text-8xl">{currentGame.icon}</div>
              <div>
                <h2 className={`font-retro text-3xl font-bold ${currentGame.color} mb-2`}>
                  {currentGame.title}
                </h2>
                <div className="glitch-text text-lg mb-3" data-text={currentGame.subtitle}>
                  {currentGame.subtitle}
                </div>
                <p className="text-secondary font-mono text-sm max-w-2xl">
                  {currentGame.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
              {currentGame.features.map((feature, index) => (
                <div key={index} className="text-center p-3 bg-black/30 rounded border border-secondary/30">
                  <div className="font-mono text-xs text-secondary">{feature}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-retro font-bold text-primary mb-1">
                  {currentLobby.totalPlayers}
                </div>
                <div className="text-sm text-secondary font-mono">PLAYERS ONLINE</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-retro font-bold text-success mb-1">
                  {currentLobby.servers.length}
                </div>
                <div className="text-sm text-secondary font-mono">ACTIVE SERVERS</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-retro font-bold text-accent mb-1">
                  {currentLobby.version}
                </div>
                <div className="text-sm text-secondary font-mono">ENGINE VERSION</div>
              </div>
            </div>
          </div>
        </section>

        {/* Server Browser */}
        <section className="mb-8">
          <div className="gaming-card">
            <div className="card-header mb-6">
              <h3 className="card-title text-neon font-retro">SERVER BROWSER</h3>
              <p className="card-subtitle font-mono">Choose your battlefield</p>
            </div>

            <div className="space-y-4">
              {currentLobby.servers.map((server) => (
                <div key={server.id} className="server-entry p-4 border border-secondary/30 rounded bg-black/20 hover:bg-black/40 transition-all">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-retro font-bold text-neon">{server.name}</h4>
                        <div className="status-indicator status-gaming">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                          <span>LIVE</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-secondary font-mono">PLAYERS:</span>
                          <span className="ml-2 font-retro text-primary">{server.players}</span>
                        </div>
                        <div>
                          <span className="text-secondary font-mono">MAP:</span>
                          <span className="ml-2 font-retro text-accent">{server.map}</span>
                        </div>
                        <div>
                          <span className="text-secondary font-mono">PING:</span>
                          <span className={`ml-2 font-retro ${server.ping < 50 ? 'text-success' : server.ping < 100 ? 'text-warning' : 'text-error'}`}>
                            {server.ping}ms
                          </span>
                        </div>
                        <div>
                          <span className="text-secondary font-mono">DIFFICULTY:</span>
                          <span className="ml-2 font-mono text-xs text-error">{server.difficulty}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button className="btn btn-primary">
                        <span>⚔️</span>
                        <span>JOIN</span>
                      </button>
                      <button className="btn btn-secondary">
                        <span>👥</span>
                      </button>
                      <button className="btn btn-secondary">
                        <span>ℹ️</span>
                      </button>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${(parseInt(server.players.split('/')[0]) / parseInt(server.players.split('/')[1])) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <button className="btn btn-accent btn-lg">
                <span>🔄</span>
                <span>REFRESH SERVERS</span>
              </button>
            </div>
          </div>
        </section>

        {/* Player Stats & Mods */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Player Stats */}
          <div className="gaming-card">
            <div className="card-header mb-6">
              <h3 className="card-title text-neon font-retro">PLAYER STATS</h3>
              <p className="card-subtitle font-mono">Your combat record</p>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-black/30 rounded">
                <span className="font-mono text-secondary">FRAGS:</span>
                <span className="font-retro text-xl text-primary">{playerStats.kills.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-black/30 rounded">
                <span className="font-mono text-secondary">DEATHS:</span>
                <span className="font-retro text-xl text-error">{playerStats.deaths.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-black/30 rounded">
                <span className="font-mono text-secondary">K/D RATIO:</span>
                <span className="font-retro text-xl text-success">{playerStats.ratio}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-black/30 rounded">
                <span className="font-mono text-secondary">LEVEL:</span>
                <span className="font-retro text-xl text-accent">{playerStats.level}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-black/30 rounded">
                <span className="font-mono text-secondary">XP:</span>
                <span className="font-retro text-xl text-warning">{playerStats.experience.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-black/30 rounded">
                <span className="font-mono text-secondary">ACHIEVEMENTS:</span>
                <span className="font-retro text-xl text-primary">{playerStats.achievements}</span>
              </div>
            </div>
          </div>

          {/* Mods & Add-ons */}
          <div className="gaming-card">
            <div className="card-header mb-6">
              <h3 className="card-title text-neon font-retro">MODS & ADD-ONS</h3>
              <p className="card-subtitle font-mono">Enhanced gameplay</p>
            </div>

            <div className="space-y-3">
              {currentLobby.mods.map((mod, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-black/30 rounded">
                  <div>
                    <div className="font-retro text-neon">{mod}</div>
                    <div className="text-xs text-secondary font-mono">v2.1.4 - ACTIVE</div>
                  </div>
                  <div className="status-indicator status-gaming">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span>ENABLED</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <button className="btn btn-accent w-full">
                <span>📦</span>
                <span>BROWSE MORE MODS</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <section className="mt-8">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn btn-primary btn-lg">
              <span>🎮</span>
              <span>QUICK MATCH</span>
            </button>
            <button className="btn btn-secondary btn-lg">
              <span>🛠️</span>
              <span>CREATE SERVER</span>
            </button>
            <button className="btn btn-accent btn-lg">
              <span>🏆</span>
              <span>TOURNAMENTS</span>
            </button>
            <button className="btn btn-secondary btn-lg">
              <span>⚙️</span>
              <span>SETTINGS</span>
            </button>
          </div>
        </section>
      </div>
    </Layout>
  );
}
