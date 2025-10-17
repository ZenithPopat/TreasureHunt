import React from "react";
import { PUZZLES_DATA } from "../data/puzzlesData";
import { QRCodeSVG } from "qrcode.react";

export default function QRCodeList() {
  return (
    <div className="min-h-screen p-8 bg-[#1a1a1a] text-white">
      <h1 className="text-3xl font-bold mb-6 flex flex-col items-center justify-center">
        Clue QR Codes
      </h1>
      <div className="mt-10 z-10 flex flex-col items-center justify-center mb-4">
        <button
          onClick={() => {
            localStorage.clear();
            alert("All progress cleared!");
          }}
          className="glow-button-dark px-6 py-3 rounded-2xl font-semibold"
        >
          Reset Hunt
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PUZZLES_DATA.map((puzzle) => {
          const urlWithoutHint = `${window.location.origin}/clue/${puzzle.id}`;
          const urlWithHint = `${window.location.origin}/clue/${puzzle.id}?hint=${puzzle.hintToken}`;

          return (
            <div
              key={puzzle.id}
              className="flex flex-col items-center bg-gray-800 p-4 rounded shadow-md"
            >
              <h3 className="font-semibold mb-2">{puzzle.title}</h3>

              <div className="flex flex-col items-center justify-center mb-4">
                <p className="text-xs mb-4">Clue Only</p>
                <QRCodeSVG
                  value={urlWithoutHint}
                  size={128}
                  fgColor="#222"
                  bgColor="#fff"
                />
                <p className="mt-4 text-xs break-all">{urlWithoutHint}</p>
              </div>

              <div className="flex flex-col items-center justify-center mb-4">
                <p className="text-xs mb-4">Clue + Hint</p>
                <QRCodeSVG
                  value={urlWithHint}
                  size={128}
                  fgColor="#222"
                  bgColor="#fff"
                />
                <p className="mt-4 text-xs break-all">{urlWithHint}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
  // return (
  //   <div className="min-h-screen p-6 text-white">
  //     {/* <div className="parchment-overlay z-0"></div> */}
  //     {/* <div className="vignette-overlay"></div> */}
  //     <h1 className="text-3xl font-bold mb-6 text-center text-black">
  //       Treasure Hunt QR Codes
  //     </h1>
  //     <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
  //       {PUZZLES_DATA.map((p) => (
  //         <div
  //           key={p.id}
  //           className="flex flex-col items-center bg-gray-800 p-4 rounded"
  //         >
  //           <QRCodeSVG
  //             value={`${window.location.origin}/clue/${p.id}`}
  //             size={128}
  //           />
  //           <p className="mt-2 text-sm text-center">{p.title}</p>
  //           <p className="text-xs mt-1 break-words text-gray-400">
  //             {window.location.origin}/clue/{p.id}
  //           </p>
  //         </div>
  //       ))}
  //     </div>

  //     <div className="mt-10 z-10">
  //       <button
  //         onClick={() => {
  //           localStorage.clear();
  //           alert("All progress cleared!");
  //         }}
  //         className="glow-button-dark px-6 py-3 rounded-2xl font-semibold"
  //       >
  //         Reset Hunt
  //       </button>
  //     </div>
  //   </div>
  // );
}
