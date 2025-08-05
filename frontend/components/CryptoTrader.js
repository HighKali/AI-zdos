import { useState, useEffect } from 'react';

export default function CryptoTrader() {
  const [activeBot, setActiveBot] = useState(null);
  const [portfolio, setPortfolio] = useState({
    BTC: { amount: 0.1234, value: 8327.45, change: +2.3 },
    ETH: { amount: 1.567, value: 5067.32, change: +1.8 },
    ADA: { amount: 2340, value: 1263.60, change: -0.5 },
    MATIC: { amount: 1567, value: 1049.89, change: +4.2 },
    LINK: { amount: 45.67, value: 1142.55, change: +0.9 }
  });

  const [tradingBots, setTradingBots] = useState([
    {
      id: 1,
      name: "GRID TRADING PRO",
      status: "ACTIVE",
      profit: "+€456.78",
      roi: "+15.6%",
      trades: 47,
      pair: "BTC/USDT",
      strategy: "Grid Trading",
      risk: "MEDIUM",
      timeframe: "24H"
    },
    {
      id: 2,
      name: "DCA ACCUMULATOR",
      status: "ACTIVE", 
      profit: "+€234.56",
      roi: "+8.9%",
      trades: 23,
      pair: "ETH/USDT",
      strategy: "Dollar Cost Average",
      risk: "LOW",
      timeframe: "7D"
    },
    {
      id: 3,
      name: "ARBITRAGE HUNTER",
      status: "PAUSED",
      profit: "+€789.12",
      roi: "+23.4%",
      trades: 156,
      pair: "MULTI",
      strategy: "Cross-Exchange Arbitrage",
      risk: "HIGH",
      timeframe: "1H"
    },
    {
      id: 4,
      name: "AI MOMENTUM",
      status: "ACTIVE",
      profit: "+€1,234.56",
      roi: "+34.7%",
      trades: 89,
      pair: "MATIC/USDT",
      strategy: "AI Momentum",
      risk: "EXTREME",
      timeframe: "15M"
    }
  ]);

  const [stakingPools, setStakingPools] = useState([
    {
      id: 1,
      token: "ETH 2.0",
      apy: "4.5%",
      staked: "1.234 ETH",
      rewards: "0.0123 ETH",
      value: "€3,987.45",
      lockPeriod: "No Lock",
      validator: "Coinbase"
    },
    {
      id: 2,
      token: "MATIC",
      apy: "12.3%",
      staked: "1,567 MATIC",
      rewards: "23.45 MATIC",
      value: "€1,049.89",
      lockPeriod: "7 days",
      validator: "Polygon"
    },
    {
      id: 3,
      token: "ADA",
      apy: "5.2%",
      staked: "2,340 ADA",
      rewards: "67.89 ADA",
      value: "€1,263.60",
      lockPeriod: "No Lock",
      validator: "IOHK"
    }
  ]);

  const [autoInvestSettings, setAutoInvestSettings] = useState({
    enabled: true,
    amount: 100,
    frequency: "daily",
    allocation: {
      BTC: 40,
      ETH: 30,
      ADA: 15,
      MATIC: 10,
      LINK: 5
    }
  });

  const totalPortfolioValue = Object.values(portfolio).reduce((sum, coin) => sum + coin.value, 0);
  const totalProfit = tradingBots.reduce((sum, bot) => {
    if (bot.status === "ACTIVE") {
      return sum + parseFloat(bot.profit.replace('€', '').replace('+', '').replace(',', ''));
    }
    return sum;
  }, 0);

  return (
    <div className="crypto-trader">
      {/* Portfolio Overview */}
      <div className="portfolio-overview mb-8">
        <div className="portfolio-header">
          <h3 className="cyber-title text-2xl mb-4">CRYPTO PORTFOLIO</h3>
          <div className="portfolio-stats">
            <div className="total-value">
              <span className="value">€{totalPortfolioValue.toLocaleString()}</span>
              <span className="label">TOTAL VALUE</span>
            </div>
            <div className="daily-profit">
              <span className="value text-success">+€{totalProfit.toFixed(2)}</span>
              <span className="label">BOT PROFITS</span>
            </div>
          </div>
        </div>

        <div className="portfolio-grid">
          {Object.entries(portfolio).map(([coin, data]) => (
            <div key={coin} className="portfolio-coin">
              <div className="coin-header">
                <span className="coin-symbol">{coin}</span>
                <span className={`coin-change ${data.change >= 0 ? 'positive' : 'negative'}`}>
                  {data.change >= 0 ? '+' : ''}{data.change}%
                </span>
              </div>
              <div className="coin-amount">{data.amount}</div>
              <div className="coin-value">€{data.value.toLocaleString()}</div>
              <div className="coin-actions">
                <button className="coin-btn buy">BUY</button>
                <button className="coin-btn sell">SELL</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trading Bots */}
      <div className="trading-bots mb-8">
        <div className="bots-header">
          <h3 className="cyber-title text-2xl mb-4">AI TRADING BOTS</h3>
          <button className="btn btn-primary">
            <span>🤖</span>
            <span>NEW BOT</span>
          </button>
        </div>

        <div className="bots-grid">
          {tradingBots.map((bot) => (
            <div key={bot.id} className={`bot-card ${bot.status.toLowerCase()}`}>
              <div className="bot-header">
                <div className="bot-info">
                  <h4 className="bot-name">{bot.name}</h4>
                  <span className={`bot-status ${bot.status.toLowerCase()}`}>
                    {bot.status}
                  </span>
                </div>
                <div className="bot-profit">
                  <span className="profit-amount">{bot.profit}</span>
                  <span className="profit-roi">{bot.roi}</span>
                </div>
              </div>

              <div className="bot-details">
                <div className="bot-stat">
                  <span className="label">PAIR:</span>
                  <span className="value">{bot.pair}</span>
                </div>
                <div className="bot-stat">
                  <span className="label">STRATEGY:</span>
                  <span className="value">{bot.strategy}</span>
                </div>
                <div className="bot-stat">
                  <span className="label">TRADES:</span>
                  <span className="value">{bot.trades}</span>
                </div>
                <div className="bot-stat">
                  <span className="label">RISK:</span>
                  <span className={`value risk-${bot.risk.toLowerCase()}`}>{bot.risk}</span>
                </div>
                <div className="bot-stat">
                  <span className="label">TIMEFRAME:</span>
                  <span className="value">{bot.timeframe}</span>
                </div>
              </div>

              <div className="bot-actions">
                <button className={`bot-action-btn ${bot.status === 'ACTIVE' ? 'pause' : 'start'}`}>
                  {bot.status === 'ACTIVE' ? '⏸️' : '▶️'}
                  {bot.status === 'ACTIVE' ? 'PAUSE' : 'START'}
                </button>
                <button className="bot-action-btn settings">
                  <span>⚙️</span>
                  <span>CONFIG</span>
                </button>
                <button className="bot-action-btn stats">
                  <span>📊</span>
                  <span>STATS</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Staking Pools */}
      <div className="staking-pools mb-8">
        <h3 className="cyber-title text-2xl mb-4">STAKING REWARDS</h3>
        
        <div className="staking-grid">
          {stakingPools.map((pool) => (
            <div key={pool.id} className="staking-card">
              <div className="staking-header">
                <div className="pool-info">
                  <h4 className="pool-token">{pool.token}</h4>
                  <span className="pool-apy">{pool.apy} APY</span>
                </div>
                <div className="pool-value">€{pool.value}</div>
              </div>

              <div className="staking-details">
                <div className="staking-stat">
                  <span className="label">STAKED:</span>
                  <span className="value">{pool.staked}</span>
                </div>
                <div className="staking-stat">
                  <span className="label">REWARDS:</span>
                  <span className="value text-success">{pool.rewards}</span>
                </div>
                <div className="staking-stat">
                  <span className="label">LOCK PERIOD:</span>
                  <span className="value">{pool.lockPeriod}</span>
                </div>
                <div className="staking-stat">
                  <span className="label">VALIDATOR:</span>
                  <span className="value">{pool.validator}</span>
                </div>
              </div>

              <div className="staking-actions">
                <button className="staking-btn stake">
                  <span>➕</span>
                  <span>STAKE MORE</span>
                </button>
                <button className="staking-btn claim">
                  <span>💰</span>
                  <span>CLAIM</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Auto Investment */}
      <div className="auto-invest mb-8">
        <h3 className="cyber-title text-2xl mb-4">AUTO INVESTMENT</h3>
        
        <div className="auto-invest-card">
          <div className="auto-invest-header">
            <div className="invest-settings">
              <div className="setting">
                <label>AMOUNT:</label>
                <input 
                  type="number" 
                  value={autoInvestSettings.amount} 
                  onChange={(e) => setAutoInvestSettings({...autoInvestSettings, amount: e.target.value})}
                />
                <span>EUR</span>
              </div>
              <div className="setting">
                <label>FREQUENCY:</label>
                <select 
                  value={autoInvestSettings.frequency}
                  onChange={(e) => setAutoInvestSettings({...autoInvestSettings, frequency: e.target.value})}
                >
                  <option value="daily">DAILY</option>
                  <option value="weekly">WEEKLY</option>
                  <option value="monthly">MONTHLY</option>
                </select>
              </div>
              <div className="setting">
                <label>STATUS:</label>
                <button 
                  className={`toggle-btn ${autoInvestSettings.enabled ? 'enabled' : 'disabled'}`}
                  onClick={() => setAutoInvestSettings({...autoInvestSettings, enabled: !autoInvestSettings.enabled})}
                >
                  {autoInvestSettings.enabled ? 'ENABLED' : 'DISABLED'}
                </button>
              </div>
            </div>
          </div>

          <div className="allocation-chart">
            <h4 className="allocation-title">ALLOCATION</h4>
            <div className="allocation-bars">
              {Object.entries(autoInvestSettings.allocation).map(([coin, percentage]) => (
                <div key={coin} className="allocation-bar">
                  <div className="bar-header">
                    <span className="coin-name">{coin}</span>
                    <span className="percentage">{percentage}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
