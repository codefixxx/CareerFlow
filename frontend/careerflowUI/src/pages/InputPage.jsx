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

  const [careerPaths, setCareerPaths] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const { userData } = useContext(AppContext);
  const searchRef = useRef(null);

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
    fetchCareerPaths(1);
  }, []);

  useEffect(() => {
    fetchCareerPaths(page);
  }, [page]);

  const fetchCareerPaths = async (pageNumber = 1) => {
    try {
      const res = await axios.get(
        `${backendUrl}/api/careerpaths?page=${pageNumber}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setCareerPaths(res.data.careerPaths || []);
        setTotalPages(res.data.totalPages || 1);
        setPage(res.data.page || 1);
      }
    } catch (err) {
      console.error("Career paths fetch error:", err);
    }
  };

  const handleFinalSubmit = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${backendUrl}/api/prompt`,
        { skills },
        { withCredentials: true }
      );

      const { id, tree } = res.data;
      const careerData = { id, tree };

      localStorage.setItem("careerData", JSON.stringify(careerData));

      navigate("/flow", { state: { careerData } });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (careerData) => {
    navigate("/flow", { state: { careerData } });
  };

  if (loading) {
    return <FullPageLoaders message="generating your careerFlow..." />;
  }

return (
  <div className="min-h-screen flex flex-col overflow-y-auto">

    {/* CENTERED INPUT SECTION */}
    <div
      className={`flex flex-col items-center px-6 ${
        careerPaths.length === 0 ? "flex-1 justify-center" : "mt-20"
      }`}
    >
      <div className="flex flex-col items-center gap-6 w-full max-w-2xl">
        <h1 className="text-xl font-semibold text-center">
          Hey {userData ? userData.name : "user"}
        </h1>

        <div className="w-full">
          <Input
            placeholder="Select your skills"
            ref={searchRef}
            skillsList={skillsData}
            value={skills}
            onChange={(selectedSkills) => setSkills(selectedSkills)}
          />
        </div>

        <button
          onClick={handleFinalSubmit}
          disabled={!skills.length}
          className={`px-8 py-3 rounded-lg shadow-md transition ${
            !skills.length
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 text-white"
          }`}
        >
          Submit
        </button>
      </div>
    </div>

    {/* CAREER PATHS SECTION */}
    {careerPaths.length > 0 && (
      <div className="w-full max-w-6xl mx-auto px-6 pb-20 mt-10">
        <h2 className="text-xl font-semibold mb-6 text-center">
          Your Generated Career Paths
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {careerPaths.map((path) => {
            const career = path.careerData;
            const label = career?.tree?.name || "Career Path";

            return (
              <div
                key={career?.id}
                onClick={() => handleCardClick(career)}
                className="group relative flex flex-col items-center justify-center
                px-7 py-5 w-full rounded-2xl border-2 shadow-xl
                transition-all duration-300 ease-in-out
                hover:shadow-2xl hover:scale-[1.06]
                border-slate-300
                bg-gradient-to-br from-white to-slate-100
                dark:border-slate-600 dark:from-slate-700 dark:to-slate-900
                text-slate-800 dark:text-slate-100
                hover:border-indigo-400 cursor-pointer"
              >
                <p className="font-semibold text-center text-lg md:text-xl">
                  {label} Path
                </p>

                <p className="text-sm text-slate-500 mt-2 text-center">
                  {career?.skills?.slice(0, 4).join(", ") || ""}
                </p>

                <p className="text-xs text-slate-400 mt-3">
                  {career?.createdAt
                    ? new Date(career.createdAt).toLocaleDateString()
                    : ""}
                </p>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Prev
            </button>

            <span className="text-sm">
              Page {page} / {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    )}
  </div>
);
};

export default InputPage;