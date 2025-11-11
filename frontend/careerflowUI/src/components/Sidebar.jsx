import React, { useState } from "react";
import { X, TrendingUp, Brain, ChevronRight } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FullPageLoaders from "./FullPageLoaders";

export default function Sidebar({ selectedNode, onClose, country }) {
  if (!selectedNode) return null;
  const navigate = useNavigate();
  const { label, description, skills, trends } = selectedNode.data;
  const isLayer1 = selectedNode.isLayer1;
  const [loading, setLoading] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleClick = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${backendUrl}/api/analytics`, {
        job_name: selectedNode.data.label,
        country,
      });
      setLoading(false);
      navigate("/dashboard", { state: { careerAnalysis: data.data } });
    } catch (error) {
      setLoading(false);
      console.error("Analytics fetch failed:", error);
    }
  };

  if (loading) return <FullPageLoaders message="fetching analytics..." />;

  return (
    <div
      className="md:w-[28rem] sm:w-full bg-gradient-to-b from-gray-100 via-gray-50 to-gray-100 
      dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 
      p-6 border-l border-gray-300 dark:border-gray-700 shadow-2xl relative z-[9999] overflow-y-auto"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
      >
        <X size={22} />
      </button>

      {/* Header Section */}
      <div className="flex flex-col flex-grow text-gray-900 dark:text-white mt-2">
        <h2 className="text-2xl font-bold mb-2">{label}</h2>
        {description && (
          <p className="text-sm leading-relaxed mb-4 text-gray-700 dark:text-gray-300">
            {description}
          </p>
        )}

        {/* Skills Section */}
        {skills?.length > 0 && (
          <div className="mb-6 bg-white/60 dark:bg-gray-800/60 rounded-2xl p-4 shadow-md backdrop-blur-sm transition-all hover:shadow-lg">
            <div className="flex items-center mb-2">
              <Brain className="text-blue-600 dark:text-blue-400 mr-2" size={18} />
              <h3 className="font-semibold text-lg">Skills Required</h3>
            </div>
            <ul className="list-none space-y-2 text-sm text-gray-700 dark:text-gray-300">
              {skills.map((s, i) => (
                <li key={i} className="flex items-start">
                  <ChevronRight size={14} className="mt-[2px] mr-1 text-blue-500" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Trends Section */}
        {trends?.length > 0 && (
          <div className="mb-6 bg-white/60 dark:bg-gray-800/60 rounded-2xl p-4 shadow-md backdrop-blur-sm transition-all hover:shadow-lg">
            <div className="flex items-center mb-2">
              <TrendingUp className="text-green-600 dark:text-green-400 mr-2" size={18} />
              <h3 className="font-semibold text-lg">Future Trends</h3>
            </div>
            <ul className="list-none space-y-2 text-sm text-gray-700 dark:text-gray-300">
              {trends.map((t, i) => (
                <li key={i} className="flex items-start">
                  <ChevronRight size={14} className="mt-[2px] mr-1 text-green-500" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* CTA Button */}
      {isLayer1 && (
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-800 dark:text-gray-300 mb-2">
            Click to view analytics
          </p>
          <button
            onClick={handleClick}
            className="px-6 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 
            text-white font-semibold shadow-md hover:shadow-lg 
            transition-all duration-300 active:scale-95"
          >
            View Analytics
          </button>
        </div>
      )}
    </div>
  );
}
