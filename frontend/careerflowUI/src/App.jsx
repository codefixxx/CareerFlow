import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar1 from "./components/Sidebar1";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Flow from "./pages/Flow";
import Dashboard from "./pages/Dashboard";
import InputPage from "./pages/InputPage";

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div
      id="top"
      className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 font-sans flex flex-col"
      style={{
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Dark overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 transition-opacity md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <Sidebar1
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Navbar */}
      <Navbar onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />

      {/* Main Content */}
      <div className="flex-1 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/flow" element={<Flow />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/input" element={<InputPage />} />
        </Routes>
      </div>


    </div>
  );
}


