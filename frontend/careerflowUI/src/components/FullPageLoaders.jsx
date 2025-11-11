import React from "react";
import { Ring } from "@uiball/loaders";

const FullPageLoader = ({ message }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <Ring size={60} lineWeight={5} speed={2} color="#3B82F6" />
      {message && (
        <p className="mt-6 text-lg font-medium text-gray-800 dark:text-gray-200">
          {message}
        </p>
      )}
    </div>
  );
};

export default FullPageLoader;
