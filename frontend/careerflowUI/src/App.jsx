import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Flow from "./pages/Flow";
import Dashboard from "./pages/Dashboard";
import InputPage from "./pages/InputPage";

export default function App() {
  return (

    <div className="flex flex-col min-h-screen no-scrollbar">
      {/* Navbar at the top */}

      <div className="flex-1 min-h-screen">
        <Routes>
          <Route path="/input" element={<InputPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/flow" element={<Flow />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </div>




  );
}


