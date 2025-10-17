import React, { useState } from "react";
import { PUZZLE_LIBRARY } from "../data/puzzleLibrary";
import { QRCodeCanvas } from "qrcode.react";
import jsPDF from "jspdf";

export default function HuntmasterPage() {
  const [selected, setSelected] = useState([]);

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const generateHuntData = () => {
    const puzzles = selected.map((id, index) => {
      const p = PUZZLE_LIBRARY.find((x) => x.id === id);
      return {
        ...p,
        nextId: index < selected.length - 1 ? selected[index + 1] : null,
      };
    });

    const data = `export const PUZZLES_DATA = ${JSON.stringify(
      puzzles,
      null,
      2
    )};`;
    const blob = new Blob([data], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "puzzlesData.js";
    a.click();
  };

  const generateQRPDF = (puzzles) => {
    const pdf = new jsPDF();
    // const pageWidth = pdf.internal.pageSize.getWidth();
    let y = 20;

    puzzles.forEach((puzzle, index) => {
      // const canvas = document.createElement("canvas");
      const qr = new QRCodeCanvas({
        value: `${window.location.origin}/hunt/${puzzle.id}`,
        size: 150,
      });

      // Convert QRCodeCanvas to data URL
      const svgContainer = document.createElement("div");
      qr.render(svgContainer);
      const imgData = svgContainer
        .querySelector("canvas")
        ?.toDataURL("image/png");

      if (imgData) {
        pdf.text(`Clue ${index + 1}: ${puzzle.title}`, 10, y);
        pdf.addImage(imgData, "PNG", 10, y + 5, 50, 50);
        pdf.text(`${window.location.origin}/hunt/${puzzle.id}`, 70, y + 30);
        y += 70;

        // Add new page if needed
        if (y > 250 && index !== puzzles.length - 1) {
          pdf.addPage();
          y = 20;
        }
      }
    });

    pdf.save("TreasureHunt_QRCodes.pdf");
  };

  return (
    <div className="min-h-screen p-8 bg-[#1a1a1a] text-white">
      <h1 className="text-3xl font-bold mb-4">Huntmaster</h1>
      <p className="mb-6 text-gray-300">
        Select puzzles from the library to create a new hunt.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {PUZZLE_LIBRARY.map((p) => (
          <div
            key={p.id}
            onClick={() => toggleSelect(p.id)}
            className={`p-3 border rounded cursor-pointer transition ${
              selected.includes(p.id)
                ? "bg-green-700 border-green-400"
                : "bg-gray-800 border-gray-600 hover:bg-gray-700"
            }`}
          >
            <h3 className="font-semibold">{p.title}</h3>
            <p className="text-xs text-gray-400">{p.id}</p>
          </div>
        ))}
      </div>

      <button
        onClick={generateHuntData}
        disabled={selected.length === 0}
        className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded disabled:opacity-40"
      >
        Export Selected ({selected.length})
      </button>
      <button
        onClick={() => generateQRPDF(selected)}
        className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700"
      >
        Generate Printable QR PDF
      </button>

      {selected.length > 0 && (
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {selected.map((id) => (
            <div key={id} className="flex flex-col items-center">
              <QRCodeCanvas
                value={`${window.location.origin}/clue/${id}`}
                size={128}
                fgColor="#222"
                bgColor="#fff"
              />
              <p className="mt-2 text-xs">{id}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
