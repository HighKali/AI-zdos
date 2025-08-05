import { useState, useEffect } from 'react';
import Layout from '../components/Layout';

export default function GamingHub() {
  const [balance, setBalance] = useState(0);
  const [gameStats, setGameStats] = useState({
    totalPlayed: 0,
    highScore: 0,
    tokensEarned: 0
  });
  const [selectedGame, setSelectedGame] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Load user gaming data
    const savedStats = localStorage.getItem('zdos-gaming-stats');
    if (savedStats) {
      setGameStats(JSON.parse(savedStats));
    }
    
    const savedBalance = localStorage.getItem('zdos-token-balance');
    if (savedBalance) {
      setBalance(parseFloat(savedBalance));
    }
  }, []);

  const atariGames = [
    {
      id: 'asteroid',
      name: 'ASTEROID BLASTER',
      icon: '🚀',
      reward: 0.5,
      description: 'Distruggi asteroidi e guadagna token',
      difficulty: 'Facile'
    },
    {
      id: 'snake',
      name: 'CYBER SNAKE',
      icon: '🐍',
      reward: 0.3,
      description: 'Snake cyberpunk con rewards',
      difficulty: 'Medio'
    },
    {
      id: 'breakout',
      name: 'NEON BREAKOUT',
      icon: '🎯',
      reward: 0.4,
      description: 'Rompi i blocchi neon',
      difficulty: 'Medio'
    },
    {
      id: 'pong',
      name: 'RETRO PONG',
      icon: '🏓',
      reward: 0.2,
      description: 'Pong classico con twist moderno',
      difficulty: 'Facile'
    }
  ];

  const faucetClaim = async () => {
    const lastClaim = localStorage.getItem('zdos-last-faucet-claim');
    const now = new Date().getTime();
    const hourInMs = 60 * 60 * 1000;

    if (lastClaim && (now - parseInt(lastClaim)) < hourInMs) {
      alert('Faucet disponibile ogni ora!');
      return;
    }

    const faucetAmount = 0.1;
    const newBalance = balance + faucetAmount;
    setBalance(newBalance);
    
    localStorage.setItem('zdos-token-balance', newBalance.toString());
    localStorage.setItem('zdos-last-faucet-claim', now.toString());
    
    alert(`+${faucetAmount} ZDOS tokens ottenuti dal faucet!`);
  };

  const playGame = (game) => {
    setSelectedGame(game);
    setIsPlaying(true);
    
    // Simulate game play
    setTimeout(() => {
      const earnedTokens = game.reward;
      const newBalance = balance + earnedTokens;
      setBalance(newBalance);
      
      const newStats = {
        ...gameStats,
        totalPlayed: gameStats.totalPlayed + 1,
        tokensEarned: gameStats.tokensEarned + earnedTokens
      };
      setGameStats(newStats);
      
      localStorage.setItem('zdos-token-balance', newBalance.toString());
      localStorage.setItem('zdos-gaming-stats', JSON.stringify(newStats));
      
      setIsPlaying(false);
      alert(`Gioco completato! +${earnedTokens} ZDOS tokens guadagnati!`);
    }, 3000);
  };

  return (
    <Layout>
      <div className="gaming-hub">
        <div className="gaming-header">
          <div className="hub-title">
            <h1 className="glitch-text" data-text="RETRO GAMING HUB">
              RETRO GAMING HUB
            </h1>
            <p className="hub-subtitle">Gioca ai classici Atari e guadagna ZDOS tokens</p>
          </div>
          
          <div className="user-stats">
            <div className="stat-card balance">
              <div className="stat-icon">💰</div>
              <div className="stat-info">
                <div className="stat-label">BALANCE</div>
                <div className="stat-value">{balance.toFixed(3)} ZDOS</div>
              </div>
            </div>
            
            <div className="stat-card games">
              <div className="stat-icon">🎮</div>
              <div className="stat-info">
                <div className="stat-label">GAMES PLAYED</div>
                <div className="stat-value">{gameStats.totalPlayed}</div>
              </div>
            </div>
            
            <div className="stat-card earned">
              <div className="stat-icon">🏆</div>
              <div className="stat-info">
                <div className="stat-label">TOKENS EARNED</div>
                <div className="stat-value">{gameStats.tokensEarned.toFixed(3)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Faucet Section */}
        <div className="faucet-section">
          <div className="faucet-card">
            <div className="faucet-icon">🚰</div>
            <div className="faucet-info">
              <h3>ZDOS TOKEN FAUCET</h3>
              <p>Richiedi 0.1 ZDOS tokens gratuiti ogni ora</p>
            </div>
            <button className="faucet-btn" onClick={faucetClaim}>
              CLAIM FAUCET
            </button>
          </div>
        </div>

        {/* Games Grid */}
        <div className="games-section">
          <h2 className="section-title">GIOCHI DISPONIBILI</h2>
          
          <div className="games-grid">
            {atariGames.map((game) => (
              <div key={game.id} className="game-card">
                <div className="game-header">
                  <div className="game-icon">{game.icon}</div>
                  <div className="game-title">{game.name}</div>
                </div>
                
                <div className="game-info">
                  <p className="game-description">{game.description}</p>
                  <div className="game-meta">
                    <span className="game-difficulty">{game.difficulty}</span>
                    <span className="game-reward">+{game.reward} ZDOS</span>
                  </div>
                </div>
                
                <button 
                  className="play-btn"
                  onClick={() => playGame(game)}
                  disabled={isPlaying}
                >
                  {isPlaying && selectedGame?.id === game.id ? 'GIOCANDO...' : 'GIOCA ORA'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Game Canvas Placeholder */}
        {isPlaying && (
          <div className="game-overlay">
            <div className="game-container">
              <div className="game-canvas">
                <div className="game-loading">
                  <div className="loading-spinner"></div>
                  <h3>Giocando a {selectedGame?.name}...</h3>
                  <p>Simulating retro gaming experience...</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Leaderboard */}
        <div className="leaderboard-section">
          <h2 className="section-title">LEADERBOARD</h2>
          
          <div className="leaderboard">
            <div className="leaderboard-header">
              <span>RANK</span>
              <span>PLAYER</span>
              <span>SCORE</span>
              <span>TOKENS</span>
            </div>
            
            <div className="leaderboard-entries">
              <div className="leaderboard-entry">
                <span className="rank">1</span>
                <span className="player">CyberGamer123</span>
                <span className="score">15,420</span>
                <span className="tokens">45.6 ZDOS</span>
              </div>
              
              <div className="leaderboard-entry">
                <span className="rank">2</span>
                <span className="player">RetroKing</span>
                <span className="score">12,890</span>
                <span className="tokens">38.2 ZDOS</span>
              </div>
              
              <div className="leaderboard-entry">
                <span className="rank">3</span>
                <span className="player">PixelMaster</span>
                <span className="score">11,340</span>
                <span className="tokens">32.1 ZDOS</span>
              </div>
              
              <div className="leaderboard-entry current-user">
                <span className="rank">-</span>
                <span className="player">Tu</span>
                <span className="score">{gameStats.highScore}</span>
                <span className="tokens">{gameStats.tokensEarned.toFixed(1)} ZDOS</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
