export default function ClueScreen({ clue }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative fade-in-up">
      {/* Background Dust */}
      <div className="dust-layer"></div>
      <div className="dust-layer" style={{ animationDelay: "3s" }}></div>

      <div className="p-8 bg-surface/90 rounded-3xl shadow-glow border border-accent/20 max-w-lg text-center z-20">
        <h2 className="text-3xl font-heading text-accent mb-4 drop-shadow-glow">
          {clue.title}
        </h2>
        <p className="text-muted">{clue.text}</p>

        {/* Next Button Placeholder */}
        <button
          className="mt-6 glow-button px-6 py-2 font-heading text-sm text-black rounded-xl hover:scale-105 transition-all duration-300"
          onClick={() => alert("Next clue coming soon!")}
        >
          Next Clue →
        </button>
      </div>
    </div>
  );
}
