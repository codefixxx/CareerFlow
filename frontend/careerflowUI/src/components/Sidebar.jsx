import React from "react";
import { X } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";



export default function Sidebar({ selectedNode, onClose, country }) {
  if (!selectedNode) return null; // Hide completely if no node
  const navigate = useNavigate();
  console.log(" Selected Node in Sidebar:", selectedNode);
  const { label, description, skills, trends } = selectedNode.data;
  const isLayer1 = selectedNode.isLayer1;
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/analytics`,
        {
          job_name: selectedNode.data.label,
          country // 👈 now also sending country
        }
      );

      console.log("Analytics data received:", data);
      setLoading(false);
      navigate("/dashboard", { state: { careerAnalysis: data.data } });
    } catch (error) {
      setLoading(false);
      console.error("Failed to fetch analytics:", error);
      if (error.response) console.error("Server responded with:", error.response.data);
    }
  };
  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        <div className="text-center">
          {/* Spinner */}
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>

          {/* Text */}
          <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
            Fetching analytics data...
          </p>
        </div>
      </div>
    );
  }
  return (
    <div
      className="md:w-100 sm:w-full bg-gray-100 dark:bg-gray-800 p-4 border-l border-gray-300 dark:border-gray-600
      shadow-md relative"
      onClick={(e) => e.stopPropagation()} // prevent canvas click collapse
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-600 hover:text-black dark:hover:text-white"
      >
        <X size={20} />
      </button>
      <div className="flex flex-col flex-grow overflow-hidden
       text-black dark:text-white">
        <h2 className="text-lg font-bold mb-2">{label}</h2>
        {description && <p className="mb-2 text-sm">{description}</p>}

        {skills?.length > 0 && (
          <>
            <h3 className="font-semibold mt-2">Skills Required:</h3>
            <ul className="list-disc list-inside text-sm">
              {skills.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </>
        )}

        {trends?.length > 0 && (
          <>
            <h3 className="font-semibold mt-2">Future Trends:</h3>
            <ul className="list-disc list-inside text-sm">
              {trends.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </>
        )}
      </div>
      {isLayer1 && (<div className="mt-4 text-center text-black dark:text-white">
        <p className="mb-2">Click to view analytics</p>
        <button onClick={handleClick}
          className="px-6 py-2 rounded-xl bg-blue-600 text-white font-semibold 
               shadow-md hover:bg-blue-700 active:scale-95 
               transition-transform duration-200"
        >
          View Analytics
        </button>
      </div>)}
    </div>
  );
}



