import React from 'react';
const ChartCard = ({ title, children, className = "" }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-2 border-blue-200 dark:border-blue-700 ${className}`}>
      <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">{title}</h2>
      {children}
    </div>
  );
};
export default ChartCard;