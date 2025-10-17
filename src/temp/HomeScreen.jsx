export default function HomeScreen({ onStart }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative fade-in-up">
      {/* Dust Layers */}
      <div className="dust-layer"></div>
      <div className="dust-layer" style={{ animationDelay: "2s" }}></div>

      {/* Title */}
      <h1 className="text-5xl font-heading animate-pulse-glow text-accent drop-shadow-glow mb-6 z-20">
        🧭 The Hunt Begins
      </h1>

      {/* Description */}
      <p className="text-muted max-w-lg text-center mb-8 z-20">
        Follow the clues hidden across realms of song, prayer, and starlight.
      </p>

      {/* Start Button */}
      <button
        onClick={onStart}
        className="glow-button px-10 py-3 font-heading text-lg text-black rounded-2xl hover:scale-105 transition-all duration-300 z-20"
      >
        Start the Hunt
      </button>
    </div>
  );
}
