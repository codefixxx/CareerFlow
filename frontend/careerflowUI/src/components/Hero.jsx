import { scrollToSection } from "../utils/helpers";

function Hero() {
  
  return (
    <div className="relative pt-32 pb-20 md:pt-48 md:pb-32 flex items-center justify-center text-center overflow-hidden">
      {/* Background Dot Grid - Light Mode */}
      <div
        className="absolute inset-0 z-0 dark:hidden"
        style={{
          backgroundImage: 'radial-gradient(#374151 1px, transparent 1px)', //gray-700
          backgroundSize: '1.5rem 1.5rem',
          opacity: 0.7,
        }}
      ></div>
      {/* Background Dot Grid - Dark Mode */}
      <div
        className="absolute inset-0 z-0 hidden dark:block"
        style={{
          backgroundImage: 'radial-gradient(#374151 1px, transparent 1px)', // gray-700
          backgroundSize: '1.5rem 1.5rem',
          opacity: 0.5,
        }}
      ></div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent to-white dark:to-gray-900"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          Find Your{' '}
          <span className="text-blue-500 dark:text-blue-400">Career Path,</span>{' '}
          Clearly.
        </h1>
        <p className="mt-6 max-w-lg mx-auto text-lg text-gray-600 dark:text-gray-300 sm:text-xl">
          Stop guessing. Start planning. CareerFlow gives you the map to navigate
          your professional journey from entry-level to expert.
        </p>
        <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <a
            href="#features"
            onClick={(e) => scrollToSection(e, 'features')}
            className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
          >
            Get Started
          </a>
          <a
            href="#video-demo"
            onClick={(e) => scrollToSection(e, 'video-demo')}
            className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:bg-gray-800 dark:hover:bg-opacity-80 md:py-4 md:text-lg md:px-10"
          >
            Watch Demo
          </a>
        </div>
      </div>
    </div>
  );
}
export default Hero;