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
      className="
        md:w-[28rem] sm:w-full relative z-[9999] overflow-y-auto
        p-6 border-l shadow-2xl transition-all duration-500 ease-in-out

        /* Light Mode */
        bg-gradient-to-br from-slate-50 via-white to-blue-50
        text-slate-800 border-slate-300

        /* Dark Mode */
        dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950
        dark:text-slate-100 dark:border-slate-700
      "
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
      <div className="flex flex-col flex-grow mt-2 relative z-10">
        <h2 className="text-2xl font-bold mb-2">{label}</h2>

        {description && (
          <p className="text-sm leading-relaxed mb-4 text-gray-700 dark:text-gray-300">
            {description}
          </p>
        )}

        {/* Skills Section */}
        {skills?.length > 0 && (
          <div className="mb-6 bg-white/70 dark:bg-slate-800/70 rounded-2xl p-4 shadow-md backdrop-blur-sm transition-all hover:shadow-lg border border-slate-200 dark:border-slate-700">
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
          <div className="mb-6 bg-white/70 dark:bg-slate-800/70 rounded-2xl p-4 shadow-md backdrop-blur-sm transition-all hover:shadow-lg border border-slate-200 dark:border-slate-700">
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
    </div>
  );
}
