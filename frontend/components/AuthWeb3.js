import { useState } from "react";

export default function AuthWeb3({ onAuth }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function connectWallet() {
    setLoading(true);
    setError("");

    try {
      if (typeof window.ethereum === 'undefined') {
        throw new Error("MetaMask not installed");
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts'
      });

      if (accounts.length === 0) {
        throw new Error("No accounts found");
      }

      const address = accounts[0];
      
      // Create message to sign
      const message = `ZDOS Authentication\nTimestamp: ${Date.now()}\nAddress: ${address}`;
      
      // Request signature
      const signature = await window.ethereum.request({
        method: 'personal_sign',
        params: [message, address]
      });

      onAuth({ address, sig: signature, message });
      
    } catch (err) {
      setError(err.message || "Failed to connect wallet");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Web3 Authentication</h3>
        <p className="card-subtitle">Connect your wallet to access banking features</p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <div className="flex items-center gap-2 text-red-700">
            <span>⚠️</span>
            <span className="font-medium">{error}</span>
          </div>
        </div>
      )}

      <button
        onClick={connectWallet}
        disabled={loading}
        className="btn btn-primary w-full"
      >
        {loading ? (
          <>
            <div className="spinner"></div>
            <span>Connecting...</span>
          </>
        ) : (
          <>
            <span>🦊</span>
            <span>Connect MetaMask Wallet</span>
          </>
        )}
      </button>

      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
        <div className="text-sm text-blue-700">
          <strong>Security Note:</strong> We only store your wallet address and email. 
          No private keys or sensitive data are ever transmitted or stored.
        </div>
      </div>
    </div>
  );
}
