import React from 'react'
import { scrollToSection } from '../utils/helpers'
import { X } from 'lucide-react';


function Sidebar1({ isOpen, onClose }) {

  
  return (
    <div
      className={`fixed inset-y-0 right-0 z-50 w-64 transform bg-white text-gray-900 shadow-xl transition-transform duration-300 ease-in-out dark:bg-gray-800 dark:text-gray-100 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } md:hidden`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold">Menu</h2>
        <button
          onClick={onClose}
          className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Close menu"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
      <nav className="flex flex-col p-4 space-y-2">
        <a
          href="#features"
          onClick={(e) => {
            scrollToSection(e, 'features');
            onClose();
          }}
          className="px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Features
        </a>
         <a
          href="#pricing"
          onClick={(e) => {
            scrollToSection(e, 'pricing');
            onClose();
          }}
          className="px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Pricing
        </a>
        <a
          href="#about"
          onClick={(e) => {
            scrollToSection(e, 'about');
            onClose();
          }}
          className="px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          About
        </a>
        <a
          href="#contact"
          onClick={(e) => {
            scrollToSection(e, 'contact');
            onClose();
          }}
          className="px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Contact
        </a>
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
           <a
            href="#"
            className="block w-full text-center px-4 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            Log In
          </a>
          <a
            href="#"
            className="block w-full text-center px-4 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            Sign Up
          </a>
        </div>
      </nav>
    </div>
  );
}
export default Sidebar1;