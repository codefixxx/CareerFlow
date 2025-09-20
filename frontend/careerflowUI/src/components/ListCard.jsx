import React from 'react';
import { ExternalLink } from 'lucide-react';

const ListCard = ({ title, items }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-2 border-blue-200 dark:border-blue-700">
      <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">{title}</h2>
      <ul className="list-disc list-inside space-y-2 text-lg">
        {items.map((item, index) => (
          <li key={index}>
            {item.url ? (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline flex items-center gap-1"
              >
                {item.name} <ExternalLink size={16} />
              </a>
            ) : (
              item.name || item
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListCard;

