import { Instagram, Github, } from 'lucide-react';
import { scrollToSection } from '../utils/helpers';

function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-600 border-t border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Column 1: Product */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 tracking-wider uppercase">
              Product
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#features" onClick={(e) => scrollToSection(e, 'features')} className="text-base hover:text-gray-900 dark:hover:text-white">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" onClick={(e) => scrollToSection(e, 'pricing')} className="text-base hover:text-gray-900 dark:hover:text-white">
                  Pricing
                </a>
              </li>
            </ul>
          </div>
          {/* Column 2: Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 tracking-wider uppercase">
              Company
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="text-base hover:text-gray-900 dark:hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="text-base hover:text-gray-900 dark:hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          {/* Column 3: Resources */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 tracking-wider uppercase">
              Resources
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-base hover:text-gray-900 dark:hover:text-white">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#video-demo" className="text-base hover:text-gray-900 dark:hover:text-white">
                  Guides
                </a>
              </li>
            </ul>
          </div>
          {/* Column 4: Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 tracking-wider uppercase">
              Legal
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <a href="#" className="text-base hover:text-gray-900 dark:hover:text-white">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="text-base hover:text-gray-900 dark:hover:text-white">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* Bottom Footer */}
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            <a href="https://www.instagram.com/general_munchk1n_man/" target="_blank"
              rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
              <span className="sr-only">Instagram</span>
              <Instagram className="h-6 w-6" />
            </a>
            <a href="https://github.com/codefixxx" target="_blank"
              rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
              <span className="sr-only">GitHub</span>
              <Github className="h-6 w-6" />
            </a>

          </div>
          <p className="mt-8 text-base text-gray-500 dark:text-gray-400 md:mt-0 md:order-1">
            &copy; {new Date().getFullYear()} CareerFlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;