import React, { useState } from "react";
import Input from "../components/Input";
import CountrySelector from "../components/CountrySelector";
import skillsData from "../assets/skills.json";
import { useNavigate } from "react-router-dom";
import FullPageLoaders from "../components/FullPageLoaders";
import axios from "axios";


const InputPage = () => {
  const [skills, setSkills] = useState([]);
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;


  const handleFinalSubmit = async () => {

    console.log("Sending data:", { skills, country });

    try {
      setLoading(true);
      const res = await axios.post(`${backendUrl}/api/prompt`, { skills, country });
      console.log("Success");
      setLoading(false);

      navigate("/flow", { state: { careerData: res.data.tree, country } });
    } catch (err) {
      setLoading(false);
      if (err.response) {
        // Server responded but with error (4xx, 5xx)
        console.error("Server error:", err.response.status, err.response.data);
      } else if (err.request) {
        // No response (network or CORS issue)
        console.error("No response received:", err.request);
      } else {
        // Something else (wrong config, timeout, etc.)
        console.error("Axios error:", err.message);
      }
    }
  };
  if (loading) {
    return (
      <FullPageLoaders message="generating your careerFlow..." />

    );
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6">
      {/* Skills input */}
      <Input
        skillsList={skillsData}
        value={skills}
        onChange={(selectedSkills) => setSkills(selectedSkills)}
      />

      {/* Country selector */}
      <CountrySelector
        value={country}
        onChange={(selectedCountry) => setCountry(selectedCountry)}
      />

      {/* Final single submit */}
      <button
        onClick={handleFinalSubmit}
        disabled={!skills.length || !country}
        className={`px-6 py-3 rounded-lg shadow-md transition ${!skills.length || !country
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-green-600 hover:bg-green-700 text-white"
          }`}
      >
        Submit
      </button>
    </div>
  );
};

export default InputPage;
