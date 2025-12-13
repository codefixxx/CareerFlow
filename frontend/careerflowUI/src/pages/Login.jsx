import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post(
      `${backendUrl}/api/auth/login`,
      formData,
      { withCredentials: true }
    );
    console.log("Login success:", res.data);
  } catch (err) {
    console.log("Login error:", err.response?.data);
  }
};


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8">

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white text-center mb-6">
          Log In to Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div>
            <label className="block text-gray-600 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 
              text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-600 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 
              text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
            >
              Forgot Password?
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md 
            transition font-medium"
          >
            Log In
          </button>
        </form>

        {/* Signup redirect */}
        <p className="text-center text-gray-600 dark:text-gray-300 mt-4">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="text-blue-600 hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}
