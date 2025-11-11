import { Map, Briefcase } from 'lucide-react';
import React from 'react';

function Features() {
  const features = [
    {
      icon: <Map className="h-8 w-8 text-blue-500 dark:text-blue-400" />,
      title: 'Interactive Career Maps',
      description: 'Visualize entire career landscapes, from entry-level to senior roles, with all the branching paths.',
    },
    {
      icon: <Briefcase className="h-8 w-8 text-blue-500 dark:text-blue-400" />,
      title: 'Skill Gap Analysis',
      description: 'Understand the skills required for your dream job and see what you need to learn to get there.',
    },
  ];

  return (
    <section id="features" className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-800 dark:bg-opacity-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Everything You Need to Succeed
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            CareerFlow provides powerful tools to navigate your professional life.
          </p>
        </div>
        <div className="mt-16 max-w-4xl mx-auto grid gap-8 md:grid-cols-2">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 bg-white shadow-sm border border-gray-200 dark:bg-gray-800 rounded-lg dark:shadow-lg dark:border-gray-700"
            >
              <div className="flex-shrink-0">{feature.icon}</div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
export default Features;