import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LogoIcon from "./LogoIcon";
import { Menu } from "lucide-react";
import { scrollToSection } from "../utils/helpers";
import { AppContext } from "../context/AppContext";

function Navbar({ onOpenMobileMenu }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // get current route
  const { isLoggedin, authLoading, setIsLoggedin, setUserData, logout } =
    useContext(AppContext);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    setIsLoggedin(false);
    setUserData(null);
    await logout();
    navigate("/", { replace: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // only show these sections on the homepage
  const showSections = location.pathname === "/";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200 dark:bg-gray-800/80 dark:shadow-lg dark:border-gray-700"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => {
              navigate("/");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center space-x-2"
          >
            <LogoIcon />
          </button>

          {/* Desktop Menu */}
          {showSections && (
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {["features", "pricing", "about", "contact"].map((item) => (
                  <a
                    key={item}
                    href={`#${item}`}
                    onClick={(e) => scrollToSection(e, item)}
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {authLoading ? null : !isLoggedin ? (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Log In
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                {/* Hide Generate button on /input route */}
                {location.pathname !== "/input" && (
                  <button
                    onClick={() => navigate("/input")}
                    className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Generate
                  </button>
                )}
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-red-500 hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={onOpenMobileMenu}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-700"
              aria-label="Open main menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
