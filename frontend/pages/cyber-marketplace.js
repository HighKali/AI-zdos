import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import B2BConnector from "../components/B2BConnector";
import CryptoTrader from "../components/CryptoTrader";

export default function CyberMarketplace() {
  const [activeSection, setActiveSection] = useState("travel");
  const [cryptoRates, setCryptoRates] = useState({
    BTC: 67542.30,
    ETH: 3234.45,
    ADA: 0.54,
    MATIC: 0.67
  });
  
  const [userBalance, setUserBalance] = useState({
    EUR: 2450.67,
    BTC: 0.1234,
    ETH: 1.567,
    points: 15678
  });

  const [earnings, setEarnings] = useState({
    daily: 234.56,
    weekly: 1567.89,
    monthly: 6789.12,
    total: 23456.78
  });

  // API Keys B2B (pubbliche demo)
  const apiConnections = {
    travel: {
      amadeus: "DEMO_AMADEUS_API_KEY_XYZ123",
      booking: "DEMO_BOOKING_AFFILIATE_456",
      airbnb: "DEMO_AIRBNB_PARTNER_789",
      expedia: "DEMO_EXPEDIA_AFFILIATE_ABC",
      skyscanner: "DEMO_SKYSCANNER_KEY_DEF",
      kayak: "DEMO_KAYAK_PARTNER_GHI"
    },
    ecommerce: {
      amazon: "DEMO_AMAZON_AFFILIATE_123",
      alibaba: "DEMO_ALIBABA_B2B_456",
      shopify: "DEMO_SHOPIFY_PARTNER_789",
      ebay: "DEMO_EBAY_DEVELOPER_ABC",
      etsy: "DEMO_ETSY_AFFILIATE_DEF"
    },
    crypto: {
      binance: "DEMO_BINANCE_API_XYZ",
      coinbase: "DEMO_COINBASE_MERCHANT",
      kraken: "DEMO_KRAKEN_AFFILIATE",
      polygon: "DEMO_POLYGON_RPC_KEY"
    },
    financial: {
      stripe: "DEMO_STRIPE_WEBHOOK_KEY",
      paypal: "DEMO_PAYPAL_MERCHANT_ID",
      revolut: "DEMO_REVOLUT_BUSINESS_API"
    }
  };

  const travelDeals = [
    {
      id: 1,
      type: "FLIGHT",
      title: "ROMA → TOKYO",
      description: "Volo diretto con ANA",
      price: "€678",
      cryptoPrice: "0.0098 BTC",
      commission: "€45.60",
      provider: "AMADEUS",
      rating: 4.8,
      savings: "25%",
      glitchEffect: true
    },
    {
      id: 2,
      type: "HOTEL",
      title: "CYBER HOTEL SHIBUYA",
      description: "5 stelle con vista panoramica",
      price: "€156/night",
      cryptoPrice: "0.0023 BTC",
      commission: "€18.70",
      provider: "BOOKING.COM",
      rating: 4.9,
      savings: "30%",
      glitchEffect: false
    },
    {
      id: 3,
      type: "AIRBNB",
      title: "LOFT FUTURISTICO MILANO",
      description: "Appartamento cyber-tech",
      price: "€89/night",
      cryptoPrice: "0.0013 BTC",
      commission: "€12.30",
      provider: "AIRBNB",
      rating: 4.7,
      savings: "20%",
      glitchEffect: true
    },
    {
      id: 4,
      type: "PACKAGE",
      title: "DUBAI METAVERSE TOUR",
      description: "7 giorni nel futuro",
      price: "€1,234",
      cryptoPrice: "0.0183 BTC",
      commission: "€123.40",
      provider: "EXPEDIA",
      rating: 4.6,
      savings: "35%",
      glitchEffect: false
    }
  ];

  const marketplaceProducts = [
    {
      id: 1,
      category: "CRYPTO HARDWARE",
      title: "LEDGER NANO X PRO",
      description: "Hardware wallet definitivo",
      price: "€299",
      cryptoPrice: "0.0044 BTC",
      commission: "€45.60",
      provider: "AMAZON",
      rating: 4.9,
      stock: 47,
      sales: 1234
    },
    {
      id: 2,
      category: "GAMING GEAR",
      title: "RTX 4090 CYBER EDITION",
      description: "GPU per mining e gaming",
      price: "€1,899",
      cryptoPrice: "0.0281 BTC",
      commission: "€189.90",
      provider: "ALIBABA",
      rating: 4.8,
      stock: 12,
      sales: 567
    },
    {
      id: 3,
      category: "FASHION TECH",
      title: "CYBER JACKET SMART",
      description: "Giacca con LED integrati",
      price: "€456",
      cryptoPrice: "0.0067 BTC",
      commission: "€68.40",
      provider: "ETSY",
      rating: 4.5,
      stock: 23,
      sales: 890
    },
    {
      id: 4,
      category: "AI GADGETS",
      title: "NEURO INTERFACE V2",
      description: "Controllo mentale device",
      price: "€2,999",
      cryptoPrice: "0.0444 BTC",
      commission: "€450.00",
      provider: "SHOPIFY",
      rating: 4.7,
      stock: 5,
      sales: 123
    }
  ];

  const cryptoOpportunities = [
    {
      id: 1,
      type: "STAKING",
      title: "ETHEREUM 2.0 STAKING",
      apy: "4.5%",
      minAmount: "0.1 ETH",
      commission: "10%",
      risk: "LOW",
      platform: "BINANCE"
    },
    {
      id: 2,
      type: "LIQUIDITY",
      title: "MATIC-USDC POOL",
      apy: "12.3%",
      minAmount: "100 MATIC",
      commission: "15%",
      risk: "MEDIUM",
      platform: "POLYGON"
    },
    {
      id: 3,
      type: "TRADING BOT",
      title: "AI GRID TRADING",
      apy: "8.7%",
      minAmount: "0.01 BTC",
      commission: "20%",
      risk: "HIGH",
      platform: "KRAKEN"
    },
    {
      id: 4,
      type: "NFT FLIPPING",
      title: "AUTO NFT TRADER",
      apy: "25.6%",
      minAmount: "0.5 ETH",
      commission: "30%",
      risk: "EXTREME",
      platform: "OPENSEA"
    }
  ];

  const sections = {
    travel: {
      title: "TRAVEL NEXUS",
      subtitle: "VIAGGI NEL METAVERSO",
      icon: "✈️",
      color: "text-secondary",
      data: travelDeals
    },
    marketplace: {
      title: "CYBER STORE",
      subtitle: "AMAZON DEL FUTURO",
      icon: "🛒",
      color: "text-accent",
      data: marketplaceProducts
    },
    crypto: {
      title: "CRYPTO CASINO",
      subtitle: "GUADAGNI AUTOMATICI",
      icon: "₿",
      color: "text-warning",
      data: cryptoOpportunities
    }
  };

  const currentSection = sections[activeSection];

  return (
    <Layout>
      <div className="cyber-marketplace">
        {/* Cyber Header */}
        <section className="text-center mb-8 relative">
          <div className="cyber-glitch-bg"></div>
          <h1 className="cyber-title mb-4" data-text="CYBER MARKETPLACE">
            CYBER MARKETPLACE
          </h1>
          <div className="glitch-text text-lg mb-6" data-text="MONEY MACHINE MATRIX">
            MONEY MACHINE MATRIX
          </div>
          
          {/* Live Crypto Rates */}
          <div className="cyber-ticker mb-6">
            <div className="ticker-content">
              {Object.entries(cryptoRates).map(([crypto, rate]) => (
                <span key={crypto} className="ticker-item">
                  {crypto}: €{rate.toLocaleString()} 
                  <span className="text-success ml-2">+2.3%</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Dashboard Stats */}
        <section className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="cyber-stat-card">
              <div className="cyber-value">€{userBalance.EUR.toLocaleString()}</div>
              <div className="cyber-label">BALANCE EURO</div>
              <div className="cyber-graph"></div>
            </div>
            <div className="cyber-stat-card">
              <div className="cyber-value">{userBalance.BTC} BTC</div>
              <div className="cyber-label">CRYPTO WALLET</div>
              <div className="cyber-graph"></div>
            </div>
            <div className="cyber-stat-card">
              <div className="cyber-value">€{earnings.daily}</div>
              <div className="cyber-label">DAILY EARNINGS</div>
              <div className="cyber-graph success"></div>
            </div>
            <div className="cyber-stat-card">
              <div className="cyber-value">{userBalance.points}</div>
              <div className="cyber-label">REWARD POINTS</div>
              <div className="cyber-graph warning"></div>
            </div>
          </div>
        </section>

        {/* Section Selector */}
        <section className="mb-8">
          <div className="cyber-nav">
            {Object.entries(sections).map(([key, section]) => (
              <button
                key={key}
                onClick={() => setActiveSection(key)}
                className={`cyber-nav-btn ${activeSection === key ? "active" : ""}`}
              >
                <span className="text-3xl">{section.icon}</span>
                <div>
                  <div className="font-mono font-bold text-sm">{section.title}</div>
                  <div className="text-xs text-secondary">{section.subtitle}</div>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* API Connections Status */}
        <section className="mb-8">
          <div className="cyber-card">
            <div className="cyber-card-header">
              <h3 className="cyber-card-title">API CONNECTIONS B2B</h3>
              <div className="cyber-status-grid">
                {Object.entries(apiConnections[activeSection] || {}).map(([platform, key]) => (
                  <div key={platform} className="cyber-api-status">
                    <div className="api-indicator online"></div>
                    <span className="platform-name">{platform.toUpperCase()}</span>
                    <span className="api-key">{key.substring(0, 8)}...</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="mb-8">
          <div className="cyber-card">
            <div className="cyber-card-header mb-6">
              <h2 className={`cyber-section-title ${currentSection.color}`}>
                {currentSection.title}
              </h2>
              <p className="cyber-subtitle">{currentSection.subtitle}</p>
            </div>

            {activeSection === 'crypto' ? (
              <CryptoTrader />
            ) : (
              <div className="cyber-grid">
                {currentSection.data.map((item) => (
                  <div key={item.id} className={`cyber-product-card ${item.glitchEffect ? 'glitch-card' : ''}`}>
                    {/* Product Header */}
                    <div className="cyber-product-header">
                      <div className="flex justify-between items-start mb-3">
                        <span className="cyber-category">{item.type || item.category}</span>
                        {item.savings && (
                          <span className="cyber-savings">-{item.savings}</span>
                        )}
                      </div>
                      
                      <h4 className="cyber-product-title">{item.title}</h4>
                      <p className="cyber-product-desc">{item.description}</p>
                    </div>

                    {/* Pricing */}
                    <div className="cyber-pricing mb-4">
                      <div className="cyber-price-main">{item.price}</div>
                      <div className="cyber-price-crypto">{item.cryptoPrice}</div>
                      {item.apy && (
                        <div className="cyber-apy">APY: {item.apy}</div>
                      )}
                    </div>

                    {/* Stats */}
                    <div className="cyber-stats mb-4">
                      <div className="cyber-stat">
                        <span>COMMISSION:</span>
                        <span className="text-success">€{parseFloat(item.commission?.replace('€', '') || item.commission?.replace('%', '') || '0').toFixed(2)}</span>
                      </div>
                      <div className="cyber-stat">
                        <span>PROVIDER:</span>
                        <span className="text-accent">{item.provider || item.platform}</span>
                      </div>
                      {item.rating && (
                        <div className="cyber-stat">
                          <span>RATING:</span>
                          <span className="text-warning">{item.rating}⭐</span>
                        </div>
                      )}
                      {item.stock && (
                        <div className="cyber-stat">
                          <span>STOCK:</span>
                          <span className={item.stock < 10 ? 'text-error' : 'text-success'}>{item.stock}</span>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="cyber-actions">
                      <button className="cyber-btn primary">
                        <span>💰</span>
                        <span>BUY & EARN</span>
                      </button>
                      <button className="cyber-btn secondary">
                        <span>🔗</span>
                        <span>AFFILIATE</span>
                      </button>
                    </div>

                    {/* Holographic Effect */}
                    <div className="cyber-hologram"></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Earnings Overview */}
        <section className="mb-8">
          <div className="cyber-card">
            <div className="cyber-card-header mb-6">
              <h3 className="cyber-card-title">EARNINGS MATRIX</h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="cyber-earnings-stat">
                <div className="earnings-value">€{earnings.daily}</div>
                <div className="earnings-label">TODAY</div>
                <div className="earnings-change text-success">+15.3%</div>
              </div>
              <div className="cyber-earnings-stat">
                <div className="earnings-value">€{earnings.weekly}</div>
                <div className="earnings-label">THIS WEEK</div>
                <div className="earnings-change text-success">+23.7%</div>
              </div>
              <div className="cyber-earnings-stat">
                <div className="earnings-value">€{earnings.monthly}</div>
                <div className="earnings-label">THIS MONTH</div>
                <div className="earnings-change text-warning">+8.9%</div>
              </div>
              <div className="cyber-earnings-stat">
                <div className="earnings-value">€{earnings.total}</div>
                <div className="earnings-label">TOTAL</div>
                <div className="earnings-change text-success">+156.4%</div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="text-center mb-8">
          <div className="cyber-actions-bar">
            <button className="cyber-btn-action primary">
              <span>🚀</span>
              <span>AUTO INVEST</span>
            </button>
            <button className="cyber-btn-action secondary">
              <span>📊</span>
              <span>ANALYTICS</span>
            </button>
            <button className="cyber-btn-action accent">
              <span>⚡</span>
              <span>BOOST EARNINGS</span>
            </button>
            <button className="cyber-btn-action warning">
              <span>💎</span>
              <span>PREMIUM MODE</span>
            </button>
          </div>
        </section>

        {/* B2B API Connections */}
        <section className="mb-8">
          <B2BConnector />
        </section>
      </div>
    </Layout>
  );
}
