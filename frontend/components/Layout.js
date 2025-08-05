import Link from "next/link";
import { useState, useEffect } from "react";

export default function Layout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const navigation = [
    { name: "Home Base", href: "/", icon: "🏠", color: "var(--primary-color)" },
    { name: "Gaming Hub", href: "/gaming-hub", icon: "🎮", color: "var(--success-color)" },
    { name: "Cyber Store", href: "/cyber-marketplace", icon: "🛒", color: "var(--accent-color)" },
    { name: "Banking", href: "/bank", icon: "💰", color: "var(--warning-color)" },
    { name: "Artist Studio", href: "/artist-studio", icon: "🎨", color: "var(--secondary-color)" },
    { name: "AI Music", href: "/music", icon: "🎵", color: "var(--error-color)" },
    { name: "AI Writing", href: "/writing", icon: "📝", color: "var(--primary-color)" },
  ];

  const systemStatus = [
    { name: "Network", status: "ONLINE", value: "99.9%", color: "var(--success-color)" },
    { name: "Gaming", status: "ACTIVE", value: "156 players", color: "var(--primary-color)" },
    { name: "AI Core", status: "RUNNING", value: "8.2 TFlops", color: "var(--accent-color)" },
    { name: "Mesh", status: "SYNC", value: "47 nodes", color: "var(--secondary-color)" },
  ];

  return (
    <div className="min-h-screen bg-primary">
      {/* Retro Gaming Header */}
      <header className="bg-secondary border-b-4 border-primary" style={{
        background: 'linear-gradient(90deg, var(--bg-secondary) 0%, var(--bg-tertiary) 50%, var(--bg-secondary) 100%)',
        boxShadow: '0 0 20px rgba(255, 107, 0, 0.3), inset 0 0 20px rgba(0, 255, 255, 0.1)'
      }}>
        <div className="container">
          <div className="flex items-center justify-between h-20">
            {/* Retro Logo */}
            <div className="flex items-center gap-4">
              <div className="relative">
                <div 
                  className="w-12 h-12 bg-primary border-2 border-secondary flex items-center justify-center"
                  style={{
                    boxShadow: '0 0 20px var(--primary-color), inset 0 0 10px rgba(255, 107, 0, 0.2)',
                    animation: 'neonGlow 2s ease-in-out infinite alternate'
                  }}
                >
                  <span className="text-bg-primary font-retro font-bold text-xl">Z</span>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-neon font-retro text-2xl font-bold tracking-wider">
                  ZDOS ARCADE
                </h1>
                <div className="text-secondary font-mono text-sm">
                  RETRO GAMING PLATFORM
                </div>
              </div>
            </div>

            {/* System Clock & Status */}
            <div className="hidden md:flex items-center gap-6">
              <div className="arcade-screen p-3">
                <div className="font-mono text-success text-lg font-bold">
                  {currentTime.toLocaleTimeString()}
                </div>
                <div className="font-mono text-secondary text-xs">
                  {currentTime.toLocaleDateString()}
                </div>
              </div>
              
              <div className="flex gap-2">
                {systemStatus.map((status, index) => (
                  <div key={index} className="status-indicator status-gaming" style={{
                    borderColor: status.color,
                    color: status.color
                  }}>
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: status.color }}></div>
                    <span className="hidden lg:inline">{status.name}</span>
                  </div>
                ))}
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden console-btn btn-a"
              >
                ☰
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Retro Gaming Navigation */}
      <nav className="bg-tertiary border-b-2 border-border-color" style={{
        background: 'linear-gradient(90deg, var(--bg-tertiary) 0%, var(--bg-secondary) 50%, var(--bg-tertiary) 100%)',
        boxShadow: 'inset 0 0 20px rgba(0, 255, 255, 0.1)'
      }}>
        <div className="container">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-1">
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="btn btn-secondary btn-sm"
                  style={{
                    borderColor: item.color,
                    color: item.color,
                    boxShadow: `0 0 10px ${item.color}33`
                  }}
                >
                  <span>{item.icon}</span>
                  <span className="hidden sm:inline font-retro">{item.name}</span>
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <div className="progress-bar w-32">
                <div 
                  className="progress-fill" 
                  style={{ width: '75%' }}
                ></div>
              </div>
              <span className="text-success font-mono text-sm">PWR: 75%</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-primary bg-opacity-95 md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="btn btn-primary btn-lg"
                style={{
                  borderColor: item.color,
                  color: item.color,
                  boxShadow: `0 0 20px ${item.color}66`
                }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="font-retro text-xl">{item.name}</span>
              </Link>
            ))}
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="console-btn btn-b mt-8"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Main Gaming Content Area */}
      <main className="flex-1">
        <div className="container py-8">
          <div className="arcade-screen">
            {children}
          </div>
        </div>
      </main>

      {/* Retro Gaming Footer */}
      <footer className="bg-dark text-secondary py-8 border-t-4 border-primary" style={{
        background: 'linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)',
        boxShadow: 'inset 0 0 30px rgba(255, 107, 0, 0.1)'
      }}>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="console-btn btn-a w-8 h-8 text-sm">Z</div>
                <span className="text-neon font-retro font-bold text-lg">ZDOS ARCADE</span>
              </div>
              <p className="font-mono text-sm">
                The ultimate retro gaming platform with AI-powered creativity tools.
              </p>
              <div className="mt-4 flex gap-2">
                <div className="status-indicator status-online">
                  <div className="w-2 h-2 bg-success-color rounded-full"></div>
                  <span>SYSTEM OPERATIONAL</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-neon font-retro font-bold mb-3">GAMING HUB</h4>
              <ul className="space-y-2 font-mono text-sm">
                <li><a href="#" className="hover:text-primary transition-colors">► DOOM ONLINE</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">► DUKE NUKEM 3D</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">► MULTIPLAYER LOBBY</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">► TOURNAMENTS</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-accent font-retro font-bold mb-3">ARTIST TOOLS</h4>
              <ul className="space-y-2 font-mono text-sm">
                <li><a href="#" className="hover:text-accent transition-colors">► MUSIC STUDIO</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">► SOUND PLUGINS</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">► VISUAL EDITOR</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">► AI GENERATORS</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-secondary font-retro font-bold mb-3">SYSTEM STATUS</h4>
              <div className="space-y-3">
                {systemStatus.map((status, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="font-mono text-xs" style={{ color: status.color }}>
                      {status.name.toUpperCase()}
                    </span>
                    <div className="font-mono text-xs font-bold" style={{ color: status.color }}>
                      {status.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="border-t border-border-color mt-8 pt-6 text-center">
            <div className="font-mono text-sm">
              <span className="neon-text">© 2025 ZDOS ARCADE PLATFORM</span>
              <span className="mx-4">|</span>
              <span className="text-primary">POWERED BY RETRO TECH</span>
              <span className="mx-4">|</span>
              <span className="text-secondary">GAME ON!</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}