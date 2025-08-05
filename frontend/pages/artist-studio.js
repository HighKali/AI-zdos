import { useState, useEffect } from "react";
import Layout from "../components/Layout";

export default function ArtistStudio() {
  const [activeStudio, setActiveStudio] = useState("music");
  const [installedPlugins, setInstalledPlugins] = useState([]);
  const [projectStats, setProjectStats] = useState({
    musicTracks: 47,
    artworks: 156,
    soundEffects: 234,
    narratives: 23,
    totalProjects: 89,
    collaborations: 34
  });

  const studios = {
    music: {
      title: "AI MUSIC STUDIO",
      subtitle: "COMPOSE EPIC SOUNDTRACKS",
      icon: "🎵",
      color: "text-secondary",
      bgColor: "from-blue-900/20 to-purple-900/20",
      description: "Professional music creation with AI assistance and vintage synthesizers.",
      plugins: [
        { id: 1, name: "VINTAGE SYNTHESIZER", category: "INSTRUMENTS", price: "FREE", rating: 4.8, downloads: "12.5K", size: "45MB", description: "Classic analog synth emulation with retro filters" },
        { id: 2, name: "DRUM MACHINE 808", category: "DRUMS", price: "$9.99", rating: 4.9, downloads: "23.1K", size: "67MB", description: "Legendary drum sounds from the golden era" },
        { id: 3, name: "AI CHORD GENERATOR", category: "AI TOOLS", price: "$19.99", rating: 4.7, downloads: "8.7K", size: "23MB", description: "Smart chord progressions powered by neural networks" },
        { id: 4, name: "RETRO REVERB", category: "EFFECTS", price: "FREE", rating: 4.6, downloads: "34.2K", size: "12MB", description: "Vintage spring reverb and echo chambers" },
        { id: 5, name: "CHIP TUNE MAKER", category: "INSTRUMENTS", price: "$14.99", rating: 4.8, downloads: "15.6K", size: "28MB", description: "8-bit sound generation for retro gaming music" },
        { id: 6, name: "VOCAL HARMONIZER", category: "VOCALS", price: "$29.99", rating: 4.5, downloads: "6.3K", size: "89MB", description: "Auto-harmony and vocal enhancement" },
        { id: 7, name: "BASS MONSTER", category: "INSTRUMENTS", price: "$24.99", rating: 4.9, downloads: "11.2K", size: "156MB", description: "Powerful bass synthesizer with sub-bass generation" },
        { id: 8, name: "AI MELODY ASSISTANT", category: "AI TOOLS", price: "$39.99", rating: 4.7, downloads: "4.5K", size: "34MB", description: "Intelligent melody creation and variation" }
      ]
    },
    visual: {
      title: "VISUAL STUDIO",
      subtitle: "PIXEL ART & SPRITE CREATION",
      icon: "🎨",
      color: "text-accent",
      bgColor: "from-purple-900/20 to-pink-900/20",
      description: "Advanced graphics tools for retro gaming and digital art creation.",
      plugins: [
        { id: 9, name: "PIXEL PERFECT EDITOR", category: "PIXEL ART", price: "FREE", rating: 4.9, downloads: "45.6K", size: "78MB", description: "Professional pixel art creation with animation support" },
        { id: 10, name: "SPRITE ANIMATOR", category: "ANIMATION", price: "$19.99", rating: 4.8, downloads: "23.4K", size: "134MB", description: "Frame-by-frame animation for game sprites" },
        { id: 11, name: "TEXTURE GENERATOR", category: "TEXTURES", price: "$15.99", rating: 4.6, downloads: "18.7K", size: "89MB", description: "Procedural texture creation for 3D models" },
        { id: 12, name: "COLOR PALETTE AI", category: "AI TOOLS", price: "$24.99", rating: 4.7, downloads: "12.3K", size: "45MB", description: "AI-powered color scheme generation" },
        { id: 13, name: "RETRO FILTER PACK", category: "EFFECTS", price: "$9.99", rating: 4.5, downloads: "34.1K", size: "23MB", description: "Vintage CRT and arcade screen effects" },
        { id: 14, name: "TILEMAP CREATOR", category: "LEVEL DESIGN", price: "$34.99", rating: 4.8, downloads: "8.9K", size: "167MB", description: "Advanced tilemap and level design tools" },
        { id: 15, name: "3D MODEL CONVERTER", category: "3D TOOLS", price: "$49.99", rating: 4.6, downloads: "5.2K", size: "234MB", description: "Convert 3D models to retro low-poly style" },
        { id: 16, name: "AI ART ASSISTANT", category: "AI TOOLS", price: "$59.99", rating: 4.4, downloads: "3.1K", size: "456MB", description: "Neural network art generation and enhancement" }
      ]
    },
    audio: {
      title: "SOUND LABORATORY",
      subtitle: "SFX & AUDIO PROCESSING",
      icon: "🔊",
      color: "text-warning",
      bgColor: "from-yellow-900/20 to-orange-900/20",
      description: "Professional audio editing and sound effect creation tools.",
      plugins: [
        { id: 17, name: "SFX GENERATOR", category: "SOUND EFFECTS", price: "FREE", rating: 4.8, downloads: "56.7K", size: "123MB", description: "Generate retro game sound effects" },
        { id: 18, name: "VOICE MODULATOR", category: "VOCALS", price: "$14.99", rating: 4.7, downloads: "28.3K", size: "67MB", description: "Real-time voice effects and modulation" },
        { id: 19, name: "AMBIENT CREATOR", category: "ATMOSPHERES", price: "$22.99", rating: 4.6, downloads: "15.8K", size: "189MB", description: "Create immersive environmental soundscapes" },
        { id: 20, name: "RETRO COMPRESSOR", category: "MASTERING", price: "$39.99", rating: 4.9, downloads: "9.4K", size: "34MB", description: "Vintage-style audio compression" },
        { id: 21, name: "NOISE GENERATOR", category: "SYNTHESIS", price: "$12.99", rating: 4.5, downloads: "21.6K", size: "45MB", description: "White, pink, and brown noise generation" },
        { id: 22, name: "EQUALIZER PRO", category: "MIXING", price: "$29.99", rating: 4.8, downloads: "18.7K", size: "78MB", description: "Professional 32-band graphic equalizer" },
        { id: 23, name: "BITCRUSHER VINTAGE", category: "EFFECTS", price: "$16.99", rating: 4.7, downloads: "13.2K", size: "23MB", description: "Lo-fi bit reduction and sample rate effects" },
        { id: 24, name: "AI AUDIO MASTERING", category: "AI TOOLS", price: "$69.99", rating: 4.3, downloads: "2.8K", size: "234MB", description: "Intelligent audio mastering and enhancement" }
      ]
    },
    narrative: {
      title: "WRITING STUDIO",
      subtitle: "STORYLINES & DIALOGUE",
      icon: "📝",
      color: "text-error",
      bgColor: "from-red-900/20 to-gray-900/20",
      description: "Advanced writing tools for game narratives and interactive stories.",
      plugins: [
        { id: 25, name: "STORY ARCHITECT", category: "PLOTTING", price: "$24.99", rating: 4.8, downloads: "12.5K", size: "89MB", description: "Interactive story plotting and character development" },
        { id: 26, name: "DIALOGUE TREE EDITOR", category: "DIALOGUE", price: "$34.99", rating: 4.9, downloads: "8.7K", size: "156MB", description: "Visual dialogue system creation" },
        { id: 27, name: "CHARACTER GENERATOR", category: "CHARACTERS", price: "$19.99", rating: 4.6, downloads: "15.3K", size: "67MB", description: "Random character backstory and trait generation" },
        { id: 28, name: "WORLD BUILDER", category: "WORLD BUILDING", price: "$49.99", rating: 4.7, downloads: "6.2K", size: "234MB", description: "Comprehensive world and lore creation tools" },
        { id: 29, name: "AI WRITING ASSISTANT", category: "AI TOOLS", price: "$39.99", rating: 4.5, downloads: "9.1K", size: "123MB", description: "AI-powered writing suggestions and editing" },
        { id: 30, name: "GRAMMAR CHECKER PRO", category: "EDITING", price: "$16.99", rating: 4.8, downloads: "23.4K", size: "45MB", description: "Advanced grammar and style checking" },
        { id: 31, name: "QUEST DESIGNER", category: "GAME DESIGN", price: "$29.99", rating: 4.7, downloads: "7.8K", size: "98MB", description: "Interactive quest and mission creation" },
        { id: 32, name: "LOCALIZATION TOOL", category: "TRANSLATION", price: "$59.99", rating: 4.4, downloads: "3.5K", size: "167MB", description: "Multi-language translation and localization" }
      ]
    }
  };

  const currentStudio = studios[activeStudio];

  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const categories = ["ALL", "AI TOOLS", "INSTRUMENTS", "EFFECTS", "ANIMATION", "SOUND EFFECTS", "EDITING"];

  const filteredPlugins = selectedCategory === "ALL" 
    ? currentStudio.plugins 
    : currentStudio.plugins.filter(plugin => plugin.category === selectedCategory);

  const handleInstallPlugin = (pluginId) => {
    if (!installedPlugins.includes(pluginId)) {
      setInstalledPlugins([...installedPlugins, pluginId]);
    }
  };

  return (
    <Layout>
      <div className="animate-fade-in">
        {/* Header */}
        <section className="text-center mb-8">
          <h1 className="neon-text mb-4" data-text="ARTIST STUDIO">
            ARTIST STUDIO
          </h1>
          <div className="glitch-text text-lg mb-6" data-text="PROFESSIONAL CREATIVE TOOLS">
            PROFESSIONAL CREATIVE TOOLS
          </div>
        </section>

        {/* Studio Selection */}
        <section className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(studios).map(([key, studio]) => (
              <button
                key={key}
                onClick={() => setActiveStudio(key)}
                className={`studio-selector ${activeStudio === key ? "active" : ""}`}
              >
                <div className="text-3xl mb-2">{studio.icon}</div>
                <div className="font-retro font-bold text-sm">{studio.title}</div>
                <div className="text-xs text-secondary">{studio.subtitle}</div>
              </button>
            ))}
          </div>
        </section>

        {/* Studio Info Panel */}
        <section className="mb-8">
          <div className={`gaming-card bg-gradient-to-r ${currentStudio.bgColor} border-2 border-primary`}>
            <div className="flex items-center gap-6 mb-6">
              <div className="text-8xl">{currentStudio.icon}</div>
              <div>
                <h2 className={`font-retro text-3xl font-bold ${currentStudio.color} mb-2`}>
                  {currentStudio.title}
                </h2>
                <div className="glitch-text text-lg mb-3" data-text={currentStudio.subtitle}>
                  {currentStudio.subtitle}
                </div>
                <p className="text-secondary font-mono text-sm max-w-2xl">
                  {currentStudio.description}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              <div className="text-center">
                <div className="text-2xl font-retro font-bold text-primary mb-1">
                  {Object.keys(currentStudio.plugins).length}
                </div>
                <div className="text-xs text-secondary font-mono">AVAILABLE PLUGINS</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-retro font-bold text-success mb-1">
                  {installedPlugins.length}
                </div>
                <div className="text-xs text-secondary font-mono">INSTALLED</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-retro font-bold text-accent mb-1">
                  {projectStats.totalProjects}
                </div>
                <div className="text-xs text-secondary font-mono">PROJECTS</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-retro font-bold text-warning mb-1">
                  {projectStats.collaborations}
                </div>
                <div className="text-xs text-secondary font-mono">COLLABORATIONS</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-retro font-bold text-secondary mb-1">
                  4.7⭐
                </div>
                <div className="text-xs text-secondary font-mono">AVG RATING</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-retro font-bold text-error mb-1">
                  156K
                </div>
                <div className="text-xs text-secondary font-mono">DOWNLOADS</div>
              </div>
            </div>
          </div>
        </section>

        {/* Plugin Categories */}
        <section className="mb-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`btn btn-sm ${selectedCategory === category ? "btn-primary" : "btn-secondary"}`}
              >
                <span className="font-mono text-xs">{category}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Plugin Marketplace */}
        <section className="mb-8">
          <div className="gaming-card">
            <div className="card-header mb-6">
              <h3 className="card-title text-neon font-retro">PLUGIN MARKETPLACE</h3>
              <p className="card-subtitle font-mono">
                Showing {filteredPlugins.length} plugins for {currentStudio.title}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPlugins.map((plugin) => (
                <div key={plugin.id} className="plugin-card">
                  <div className="plugin-header mb-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-retro font-bold text-neon text-sm">{plugin.name}</h4>
                      <div className={`text-lg font-bold ${plugin.price === "FREE" ? "text-success" : "text-warning"}`}>
                        {plugin.price}
                      </div>
                    </div>
                    
                    <div className="text-xs text-secondary font-mono mb-2">
                      {plugin.category}
                    </div>
                    
                    <p className="text-xs text-secondary mb-3">
                      {plugin.description}
                    </p>
                  </div>

                  <div className="plugin-stats space-y-2 mb-4">
                    <div className="flex justify-between text-xs">
                      <span className="text-secondary">Rating:</span>
                      <span className="text-warning">{plugin.rating}⭐</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-secondary">Downloads:</span>
                      <span className="text-primary">{plugin.downloads}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-secondary">Size:</span>
                      <span className="text-accent">{plugin.size}</span>
                    </div>
                  </div>

                  <div className="plugin-actions">
                    {installedPlugins.includes(plugin.id) ? (
                      <button className="btn btn-success w-full" disabled>
                        <span>✅</span>
                        <span>INSTALLED</span>
                      </button>
                    ) : (
                      <div className="space-y-2">
                        <button 
                          onClick={() => handleInstallPlugin(plugin.id)}
                          className="btn btn-primary w-full"
                        >
                          <span>⬇️</span>
                          <span>INSTALL</span>
                        </button>
                        <div className="flex gap-1">
                          <button className="btn btn-secondary flex-1">
                            <span>👁️</span>
                          </button>
                          <button className="btn btn-secondary flex-1">
                            <span>❤️</span>
                          </button>
                          <button className="btn btn-secondary flex-1">
                            <span>ℹ️</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn btn-primary btn-lg">
              <span>🚀</span>
              <span>NEW PROJECT</span>
            </button>
            <button className="btn btn-accent btn-lg">
              <span>💾</span>
              <span>LOAD PROJECT</span>
            </button>
            <button className="btn btn-secondary btn-lg">
              <span>🔄</span>
              <span>UPDATE PLUGINS</span>
            </button>
            <button className="btn btn-warning btn-lg">
              <span>⚙️</span>
              <span>SETTINGS</span>
            </button>
          </div>
        </section>
      </div>
    </Layout>
  );
}
