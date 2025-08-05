import { useState, useEffect } from "react";
import AuthWeb3 from "../components/AuthWeb3";
import MeshStatus from "../components/MeshStatus";

const BANK_URL = "http://localhost:5001/api/bank";

export default function Bank() {
  const [msg, setMsg] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [balance, setBalance] = useState(0);
  const [staked, setStaked] = useState(0);
  const [rewards, setRewards] = useState(0);
  const [loading, setLoading] = useState(false);

  // Banking data
  const [bankingData, setBankingData] = useState({
    totalBalance: 15750.50,
    availableBalance: 12250.30,
    stakedAmount: 3500.20,
    pendingRewards: 125.75,
    apy: 5.2,
    transactions: [
      { id: 1, type: 'stake', amount: 1000, date: '2025-01-15', status: 'completed' },
      { id: 2, type: 'reward', amount: 25.50, date: '2025-01-14', status: 'completed' },
      { id: 3, type: 'transfer', amount: -500, date: '2025-01-13', status: 'completed' },
    ]
  });

  async function handleAuth({ address, sig, message }) {
    setLoading(true);
    setAddress(address);
    
    // Prompt for Proton email
    const emailProton = prompt("Enter your Proton email address:");
    
    if (!emailProton || !emailProton.endsWith("@proton.me")) {
      setMsg("Please provide a valid Proton email address");
      setLoading(false);
      return;
    }
    
    setEmail(emailProton);
    
    try {
      const res = await fetch(BANK_URL + "/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, sig, email: emailProton, message })
      });
      
      const data = await res.json();
      
      if (data.ok) {
        setMsg("Authentication successful!");
        setAuthenticated(true);
        // Simulate loading banking data
        setTimeout(() => {
          setBalance(bankingData.availableBalance);
          setStaked(bankingData.stakedAmount);
          setRewards(bankingData.pendingRewards);
        }, 1000);
      } else {
        setMsg(data.error || "Authentication failed");
      }
    } catch (error) {
      setMsg("Backend offline, using mesh network fallback.");
      // In mesh mode, still allow access with limited functionality
      setAuthenticated(true);
    } finally {
      setLoading(false);
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatToken = (amount) => {
    return `${amount.toLocaleString()} DSN`;
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">🏦 ZDOS Banking</h1>
        <p className="text-lg text-secondary">
          Decentralized banking with DeFi integration and enterprise security
        </p>
      </div>

      {/* Authentication Section */}
      {!authenticated && (
        <div className="mb-8">
          <AuthWeb3 onAuth={handleAuth} />
        </div>
      )}

      {/* Mesh Status */}
      <div className="mb-8">
        <MeshStatus address={address} email={email} />
      </div>

      {/* Status Message */}
      {msg && (
        <div className="mb-8">
          <div className={`p-4 rounded-md border ${
            msg.includes('successful') 
              ? 'bg-green-50 border-green-200 text-green-700'
              : msg.includes('offline') 
              ? 'bg-yellow-50 border-yellow-200 text-yellow-700'
              : 'bg-red-50 border-red-200 text-red-700'
          }`}>
            <div className="flex items-center gap-2">
              <span>{msg.includes('successful') ? '✅' : msg.includes('offline') ? '⚠️' : '❌'}</span>
              <span className="font-medium">{msg}</span>
            </div>
          </div>
        </div>
      )}

      {/* Banking Dashboard */}
      {authenticated && (
        <div className="space-y-8">
          {/* Account Overview */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Account Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="card">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted">Total Balance</span>
                  <span className="text-2xl">💰</span>
                </div>
                <div className="text-2xl font-bold text-primary">
                  {formatCurrency(bankingData.totalBalance)}
                </div>
                <div className="text-sm text-success mt-1">+2.5% this month</div>
              </div>

              <div className="card">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted">Available</span>
                  <span className="text-2xl">💳</span>
                </div>
                <div className="text-2xl font-bold">
                  {formatCurrency(bankingData.availableBalance)}
                </div>
                <div className="text-sm text-muted mt-1">Ready to use</div>
              </div>

              <div className="card">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted">Staked</span>
                  <span className="text-2xl">🔒</span>
                </div>
                <div className="text-2xl font-bold text-primary">
                  {formatToken(bankingData.stakedAmount)}
                </div>
                <div className="text-sm text-success mt-1">{bankingData.apy}% APY</div>
              </div>

              <div className="card">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted">Rewards</span>
                  <span className="text-2xl">🎁</span>
                </div>
                <div className="text-2xl font-bold text-accent">
                  {formatToken(bankingData.pendingRewards)}
                </div>
                <div className="text-sm text-muted mt-1">Pending claim</div>
              </div>
            </div>
          </section>

          {/* Quick Actions */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button className="card hover:shadow-lg transition-all text-left">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">📤</span>
                  <span className="font-semibold">Send</span>
                </div>
                <p className="text-sm text-muted">Transfer funds securely</p>
              </button>

              <button className="card hover:shadow-lg transition-all text-left">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">📥</span>
                  <span className="font-semibold">Receive</span>
                </div>
                <p className="text-sm text-muted">Get your wallet address</p>
              </button>

              <button className="card hover:shadow-lg transition-all text-left">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🔒</span>
                  <span className="font-semibold">Stake</span>
                </div>
                <p className="text-sm text-muted">Earn {bankingData.apy}% APY rewards</p>
              </button>

              <button className="card hover:shadow-lg transition-all text-left">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🎁</span>
                  <span className="font-semibold">Claim</span>
                </div>
                <p className="text-sm text-muted">Collect staking rewards</p>
              </button>
            </div>
          </section>

          {/* Recent Transactions */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Recent Transactions</h2>
              <button className="btn btn-secondary btn-sm">View All</button>
            </div>
            
            <div className="card">
              <div className="space-y-4">
                {bankingData.transactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-white">
                          {tx.type === 'stake' ? '🔒' : tx.type === 'reward' ? '🎁' : '📤'}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium capitalize">{tx.type}</div>
                        <div className="text-sm text-muted">{tx.date}</div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className={`font-semibold ${
                        tx.amount > 0 ? 'text-success' : 'text-error'
                      }`}>
                        {tx.amount > 0 ? '+' : ''}{formatCurrency(Math.abs(tx.amount))}
                      </div>
                      <div className={`text-xs px-2 py-1 rounded-full ${
                        tx.status === 'completed' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {tx.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* DeFi Integration */}
          <section>
            <h2 className="text-2xl font-bold mb-6">DeFi Integration</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Liquidity Pools</h3>
                  <p className="card-subtitle">Provide liquidity and earn fees</p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>DSN/ETH Pool</span>
                    <span className="text-success font-medium">12.5% APY</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>DSN/USDC Pool</span>
                    <span className="text-success font-medium">8.7% APY</span>
                  </div>
                  <button className="btn btn-primary w-full mt-4">
                    Add Liquidity
                  </button>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Lending & Borrowing</h3>
                  <p className="card-subtitle">Earn interest or access credit</p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Lend DSN</span>
                    <span className="text-success font-medium">6.2% APY</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Borrow USDC</span>
                    <span className="text-warning font-medium">4.8% APR</span>
                  </div>
                  <button className="btn btn-primary w-full mt-4">
                    Explore Lending
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}