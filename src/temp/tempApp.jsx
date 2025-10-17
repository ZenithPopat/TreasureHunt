export default function App() {
  return (
    <div className="min-h-screen inset-0 bg-[url('/old-map.webp')] bg-cover bg-center text-white font-body flex flex-col">
      {/* <div className="absolute inset-0 bg-[url('/map-bg.jpg')] bg-cover bg-center opacity-10 mix-blend-overlay pointer-events-none"></div> */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80"></div>
      <header className="bg-surface text-accent font-heading text-3xl py-4 shadow-glow text-center animate-pulse-glow">
        🕵️ The Great Treasure Hunt
      </header>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-heading mb-4 animate-pulseGlow">
          Welcome, Adventurer
        </h1>
        <p className="text-muted max-w-lg">
          Every clue hides a secret. Every secret leads closer to your destiny.
        </p>
        <button className="mt-6 relative px-8 py-3 font-heading text-lg text-black bg-accent rounded-2xl shadow-glow hover:scale-105 hover:shadow-lg transition-all duration-300">
          {/* <button className="glow-button px-8 py-3 font-heading text-lg text-black bg-accent rounded-2xl hover:scale-105 transition-all duration-300"> */}
          Start the Hunt
        </button>
      </main>

      <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 max-w-5xl">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="group bg-surface p-6 rounded-2xl shadow-lg hover:-translate-y-2 hover:shadow-glow transition-all duration-300 cursor-pointer"
            >
              <h2 className="font-heading text-xl mb-2 group-hover:text-accent transition-colors">
                Clue {n}
              </h2>
              <p className="text-muted">
                {n === 1
                  ? "Find the song your father loves the most..."
                  : n === 2
                  ? "Seek where faith meets the morning light..."
                  : "Your final clue awaits among the stars..."}
              </p>
            </div>
          ))}
        </div>
      </div>

      <footer className="bg-surface text-sm text-muted py-3 text-center">
        “Seek and you shall find.” 🔎
      </footer>
    </div>
  );
}

// export default function App() {
//   return (
//     <div className="min-h-screen bg-background text-white font-body flex flex-col">

//       <header className="bg-surface text-accent font-heading text-3xl py-4 shadow-glow text-center animate-pulse-glow">
//         🕵️ The Great Treasure Hunt
//       </header>

//       <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
//         <h1 className="text-4xl font-heading mb-4 animate-pulseGlow">
//           Welcome, Adventurer
//         </h1>
//         <p className="text-muted max-w-lg">
//           Every clue hides a secret. Every secret leads closer to your destiny.
//         </p>
//         <button className="mt-6 relative px-8 py-3 font-heading text-lg text-black bg-accent rounded-2xl shadow-glow hover:scale-105 hover:shadow-lg transition-all duration-300">
//           {/* <button className="glow-button px-8 py-3 font-heading text-lg text-black bg-accent rounded-2xl hover:scale-105 transition-all duration-300"> */}
//           Start the Hunt
//         </button>
//       </main>

//       <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6 max-w-5xl">
//           {[1, 2, 3].map((n) => (
//             <div
//               key={n}
//               className="group bg-surface p-6 rounded-2xl shadow-lg hover:-translate-y-2 hover:shadow-glow transition-all duration-300 cursor-pointer"
//             >
//               <h2 className="font-heading text-xl mb-2 group-hover:text-accent transition-colors">
//                 Clue {n}
//               </h2>
//               <p className="text-muted">
//                 {n === 1
//                   ? "Find the song your father loves the most..."
//                   : n === 2
//                   ? "Seek where faith meets the morning light..."
//                   : "Your final clue awaits among the stars..."}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>

//       <footer className="bg-surface text-sm text-muted py-3 text-center">
//         “Seek and you shall find.” 🔎
//       </footer>
//     </div>
//   );
// }
