import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Sidebar1 from "./components/Sidebar1";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Flow from "./pages/Flow";
import Dashboard from "./pages/Dashboard";
import InputPage from "./pages/InputPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import OtpVerification from "./pages/OtpVerification";
import { Toaster } from "react-hot-toast";
import ProtectedResetRoute from "./utils/ProtectedResetRoute";

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const showNavbarRoutes = ["/", "/input", "/flow", "/dashboard"];
  const shouldShowNavbar = showNavbarRoutes.includes(location.pathname);


  return (
    <div
      id="top"
      className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 font-sans flex flex-col"
      style={{
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          error: {
            duration: 5000,
          },
        }}
      />
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
      {shouldShowNavbar && (
        <Navbar onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />
      )}

      {/* Main Content */}
      <div className="flex-1 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/flow" element={<Flow />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/input" element={<InputPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/reset-password"
            element={
              <ProtectedResetRoute>
                <ResetPassword />
              </ProtectedResetRoute>
            }
          />
          <Route path="/otp-verification" element={<OtpVerification />} />
        </Routes>
      </div>


    </div>
  );
}


