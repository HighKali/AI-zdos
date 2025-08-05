import AIMusicStudio from "../components/AIMusicStudio";
import { useState } from "react";

export default function MusicPage() {
  const [stats] = useState({
    totalTracks: 1247,
    generatedThisMonth: 156,
    activeUsers: 89,
    totalPlays: 25634
  });

  const genres = [
    "Ambient", "Electronic", "Jazz", "Classical", "Rock", "Pop", 
    "Hip-Hop", "Blues", "Folk", "Cinematic"
  ];

  const recentTracks = [
    { id: 1, title: "Ethereal Dawn", genre: "Ambient", duration: "3:45", plays: 1234 },
    { id: 2, title: "Digital Dreams", genre: "Electronic", duration: "4:12", plays: 987 },
    { id: 3, title: "Midnight Jazz", genre: "Jazz", duration: "5:23", plays: 756 },
  ];

  return (
    <div className="animate-fade-in">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">🎵 AI Music Studio</h1>
        <p className="text-lg text-secondary">
          Create professional music with advanced AI algorithms and enterprise-grade tools
        </p>
      </div>

      {/* Stats Overview */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Studio Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted">Total Tracks</span>
              <span className="text-2xl">🎼</span>
            </div>
            <div className="text-2xl font-bold text-primary">
              {stats.totalTracks.toLocaleString()}
            </div>
            <div className="text-sm text-success mt-1">+12% this month</div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted">Generated This Month</span>
              <span className="text-2xl">🎹</span>
            </div>
            <div className="text-2xl font-bold text-accent">
              {stats.generatedThisMonth}
            </div>
            <div className="text-sm text-muted mt-1">New compositions</div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted">Active Musicians</span>
              <span className="text-2xl">👥</span>
            </div>
            <div className="text-2xl font-bold text-warning">
              {stats.activeUsers}
            </div>
            <div className="text-sm text-muted mt-1">Creating today</div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted">Total Plays</span>
              <span className="text-2xl">▶️</span>
            </div>
            <div className="text-2xl font-bold text-success">
              {stats.totalPlays.toLocaleString()}
            </div>
            <div className="text-sm text-success mt-1">+8.5% vs last month</div>
          </div>
        </div>
      </section>

      {/* Featured Genres */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Music Genres</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {genres.map((genre, index) => (
            <button
              key={index}
              className="card hover:shadow-lg transition-all text-center p-4"
            >
              <div className="text-2xl mb-2">🎵</div>
              <div className="font-medium text-sm">{genre}</div>
            </button>
          ))}
        </div>
      </section>

      {/* AI Music Studio Component */}
      <section className="mb-8">
        <AIMusicStudio />
      </section>

      {/* Recent Tracks */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Recent Compositions</h2>
          <button className="btn btn-secondary btn-sm">View Library</button>
        </div>
        
        <div className="card">
          <div className="space-y-4">
            {recentTracks.map((track) => (
              <div key={track.id} className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                    <span className="text-white text-xl">🎵</span>
                  </div>
                  <div>
                    <div className="font-medium">{track.title}</div>
                    <div className="text-sm text-muted flex items-center gap-4">
                      <span>Genre: {track.genre}</span>
                      <span>Duration: {track.duration}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm text-muted">Plays</div>
                    <div className="font-medium">{track.plays.toLocaleString()}</div>
                  </div>
                  <div className="flex gap-2">
                    <button className="btn btn-secondary btn-sm">
                      ▶️ Play
                    </button>
                    <button className="btn btn-secondary btn-sm">
                      📥 Download
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Features */}
      <section>
        <h2 className="text-2xl font-bold mb-6">AI Capabilities</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card">
            <div className="text-center">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="font-semibold mb-2">Intelligent Composition</h3>
              <p className="text-secondary text-sm">
                Advanced neural networks create original melodies and harmonies
              </p>
            </div>
          </div>
          
          <div className="card">
            <div className="text-center">
              <div className="text-4xl mb-4">🎛️</div>
              <h3 className="font-semibold mb-2">Style Transfer</h3>
              <p className="text-secondary text-sm">
                Transform music between genres while maintaining core elements
              </p>
            </div>
          </div>
          
          <div className="card">
            <div className="text-center">
              <div className="text-4xl mb-4">🎚️</div>
              <h3 className="font-semibold mb-2">Auto-Mastering</h3>
              <p className="text-secondary text-sm">
                Professional-quality mastering with AI-powered audio processing
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}