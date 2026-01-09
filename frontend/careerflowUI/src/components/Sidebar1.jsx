import React, { useContext } from 'react';
import { scrollToSection } from '../utils/helpers';
import { X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

function Sidebar1({ isOpen, onClose }) {
  const navigate = useNavigate();
  const location = useLocation(); // get current route
  const { isLoggedin, authLoading, logout } = useContext(AppContext);

  const handleLogout = async () => {
    await logout();               
    navigate('/', { replace: true });
    onClose();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // only show sections if user is on homepage
  const showSections = location.pathname === '/';

  return (
    <div
      className={`fixed inset-y-0 right-0 z-50 w-64 transform bg-white text-gray-900 shadow-xl transition-transform duration-300 ease-in-out dark:bg-gray-800 dark:text-gray-100 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } md:hidden`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold">Menu</h2>
        <button
          onClick={onClose}
          className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      <nav className="flex flex-col p-4 space-y-2">
        {showSections &&
          ['features', 'pricing', 'about', 'contact'].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              onClick={(e) => {
                scrollToSection(e, item);
                onClose();
              }}
              className="px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </a>
          ))}

        <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
          {authLoading ? null : !isLoggedin ? (
            <>
              <button
                onClick={() => {
                  navigate('/login');
                  onClose();
                }}
                className="block w-full px-4 py-2 rounded-md hover:bg-gray-100"
              >
                Log In
              </button>

              <button
                onClick={() => {
                  navigate('/signup');
                  onClose();
                }}
                className="block w-full px-4 py-2 rounded-md bg-blue-600 text-white"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  navigate('/input');
                  onClose();
                }}
                className="block w-full px-4 py-2 rounded-md hover:bg-gray-100"
              >
                Generate
              </button>

              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Sidebar1;
