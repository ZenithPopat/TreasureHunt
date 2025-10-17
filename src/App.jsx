import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CluePage from "./pages/CluePage";
import QRCodeList from "./pages/QRCodeList";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen relative font-body overflow-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clue/:id" element={<CluePage />} />
          <Route path="/print-qrcodes" element={<QRCodeList />} />
        </Routes>
      </div>
    </Router>
  );
}
