export default function App() {
  return (
    <div className="min-h-screen bg-background text-white font-body flex flex-col items-center justify-center overflow-hidden relative">
      {/* Background Layer */}
      <div className="absolute inset-0 bg-[url('/textures/map-bg.jpg')] bg-cover bg-center mix-blend-overlay pointer-events-none"></div>

      {/* <div className="dust-layer z-0"></div> */}
      {/* <div className="dust-layer z-0" style={{ animationDelay: "3s" }}></div> */}

      {/* Glow Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80 z-10"></div>

      {/* Main Content */}
      <div className="relative z-20 text-center space-y-4 animate-fade-in-up">
        <h1 className="text-5xl font-heading animate-pulse-glow text-accent drop-shadow-glow">
          🧭 The Hunt Begins
        </h1>
        <p className="text-muted max-w-lg mx-auto">
          Follow the clues hidden across realms of song, prayer, and starlight.
        </p>

        <button className="mt-6 glow-button px-10 py-3 font-heading text-lg text-black rounded-2xl hover:scale-105 transition-all duration-300">
          Start the Hunt
        </button>
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 max-w-5xl relative z-10">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="group bg-surface/90 p-6 rounded-2xl shadow-lg border border-accent/10 hover:border-accent/30
                 bg-[url('/textures/paper-bg.jpg')] bg-cover bg-center text-left
                 hover:-translate-y-2 hover:shadow-glow transition-all duration-300 cursor-pointer"
            >
              <h2 className="font-heading text-xl mb-2 text-accent group-hover:text-secondary transition-colors">
                Clue {n}
              </h2>
              <p className="text-muted">
                {n === 1
                  ? "A melody lost in time awaits your voice."
                  : n === 2
                  ? "Seek the dawn where prayers rise."
                  : "The final riddle glimmers under starlit skies."}
              </p>
            </div>
          ))}
        </div>
      </div>
      <img
        src="/1.png"
        alt="compass"
        className="absolute bottom-8 right-8 w-16 h-16 animate-spin-slow opacity-50"
      />
    </div>
  );
}
