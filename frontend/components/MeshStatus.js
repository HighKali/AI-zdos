import { useState, useEffect } from "react";

export default function MeshStatus({ address, email }) {
  const [meshStatus, setMeshStatus] = useState({
    connected: false,
    peers: 0,
    latency: 0,
    bandwidth: "0 KB/s"
  });

  useEffect(() => {
    // Simulate mesh status updates
    const interval = setInterval(() => {
      setMeshStatus({
        connected: Math.random() > 0.1, // 90% uptime
        peers: Math.floor(Math.random() * 50) + 10,
        latency: Math.floor(Math.random() * 100) + 20,
        bandwidth: `${Math.floor(Math.random() * 500) + 100} KB/s`
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Mesh Network Status</h3>
        <p className="card-subtitle">Decentralized infrastructure monitoring</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex items-center gap-3 p-3 bg-secondary rounded-md">
          <div className={`w-3 h-3 rounded-full ${
            meshStatus.connected ? 'bg-success' : 'bg-error'
          }`}></div>
          <div>
            <div className="text-sm font-medium">Connection</div>
            <div className="text-xs text-muted">
              {meshStatus.connected ? 'Online' : 'Offline'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-secondary rounded-md">
          <div className="text-primary">🌐</div>
          <div>
            <div className="text-sm font-medium">{meshStatus.peers} Peers</div>
            <div className="text-xs text-muted">Active nodes</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-secondary rounded-md">
          <div className="text-warning">⚡</div>
          <div>
            <div className="text-sm font-medium">{meshStatus.latency}ms</div>
            <div className="text-xs text-muted">Latency</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-secondary rounded-md">
          <div className="text-accent">📊</div>
          <div>
            <div className="text-sm font-medium">{meshStatus.bandwidth}</div>
            <div className="text-xs text-muted">Bandwidth</div>
          </div>
        </div>
      </div>

      {address && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
          <div className="text-sm text-green-700">
            <strong>Authenticated:</strong> {address.slice(0, 6)}...{address.slice(-4)}
            {email && <span> | {email}</span>}
          </div>
        </div>
      )}
    </div>
  );
}
