import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import LogoIcon from "../components/LogoIcon";
import { AppContext } from "../context/AppContext.jsx";

export default function Login() {
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const {setIsLoggedin, getUserData, isLoggedin} = useContext(AppContext);
  useEffect(() => {
    if (isLoggedin) {
      // Already logged in → redirect to input page
      navigate("/input", { replace: true });
    }
  }, [isLoggedin]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${backendUrl}/api/auth/login`,
        formData,
        { withCredentials: true }
      );
      setIsLoggedin(true);
      await getUserData();
      toast.success(res.data?.message || "Login successful");
      navigate("/input");

    } catch (err) {
      const errorCode = err.response?.data?.code;
      const errorMessage = err.response?.data?.message;

      // Invalid credentials
      if (errorCode === "INVALID_CREDENTIALS") {
        toast.error("Invalid email or password");
        setFormData((prev) => ({
          ...prev,
          password: "",
        }));
        return;
      }

      // Email not verified
      if (errorCode === "EMAIL_NOT_VERIFIED") {
        toast.error("Please verify your email first");
        axios.post(
          `${backendUrl}/api/auth/send-otp`,
          { email: formData.email, purpose: "verify_account" },
          { withCredentials: true }
        );
        navigate("/otp-verification", {
          state: { email: formData.email, purpose: "verify_account" },
          
        });
        return;
      }

      // Fallback (network / server)
      toast.error(errorMessage || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">

      {/* Logo */}
      <div className="absolute top-8 left-8">
        <Link to="/" aria-label="Go to home">
          <LogoIcon className="cursor-pointer" />
        </Link>
      </div>

      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8">
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
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-600 dark:text-gray-300 mb-1">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 pr-14 rounded-md bg-gray-100 dark:bg-gray-700
                text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-sm
                text-gray-600 dark:text-gray-300 hover:text-blue-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right">
            <Link
              to="/forgot-password"
              className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md
            transition font-medium disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        {/* Signup */}
        <p className="text-center text-gray-600 dark:text-gray-300 mt-4">
          Don&apos;t have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
