import {PlayCircle} from 'lucide-react';
function VideoDemo() {
  // In a real file, you would add:
  // import { PlayCircle } from 'lucide-react';
  
  return (
    <section id="video-demo" className="py-16 sm:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            See CareerFlow in Action
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            A quick overview of how our interactive maps work.
          </p>
        </div>
        {/* Placeholder for Video */}
        <div className="aspect-w-16 aspect-h-9 bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-700">
          <div className="flex items-center justify-center w-full h-full">
            <div className="text-center text-gray-400">
              <PlayCircle className="h-16 w-16 mx-auto" />
              <p className="mt-4 text-lg font-medium">Video Demo Placeholder</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default VideoDemo;