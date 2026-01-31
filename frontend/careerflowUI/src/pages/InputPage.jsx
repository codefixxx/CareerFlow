import React, { useState, useContext, useEffect, useRef } from "react";
import Input from "../components/Input";
import skillsData from "../assets/skills.json";
import { useNavigate } from "react-router-dom";
import FullPageLoaders from "../components/FullPageLoaders";
import axios from "axios";
import { AppContext } from "../context/AppContext.jsx";


const InputPage = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { userData } = useContext(AppContext);
  const searchRef = useRef(null);
  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, []);
  const handleFinalSubmit = async () => {

    console.log("Sending data:", { skills });

    try {
      const start = Date.now();
      setLoading(true);
      const res = await axios.post(`${backendUrl}/api/prompt`, { skills }, { withCredentials: true });
      console.log("Success");
      console.log("Request time:", Date.now() - start, "ms");


      navigate("/flow", { state: { careerData: res.data.tree } });
    } catch (err) {

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
    finally {
      setLoading(false);
    };
  }
  if (loading) {
    return (
      <FullPageLoaders message="generating your careerFlow..." />

    );
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-6">
      {/* Skills input */}
      <h1>Hey {userData ? userData.name : "user"}</h1>
      <Input
        placeholder="Select your skills"
        ref={searchRef}
        skillsList={skillsData}
        value={skills}
        onChange={(selectedSkills) => setSkills(selectedSkills)}
      />


      {/* Final single submit */}
      <button
        onClick={handleFinalSubmit}
        disabled={!skills.length}
        className={`px-6 py-3 rounded-lg shadow-md transition ${!skills.length
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
