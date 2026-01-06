import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import LogoIcon from "../components/LogoIcon";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${backendUrl}/api/auth/send-otp`,
        {
          email,
          purpose: "reset_password",
        },
        { withCredentials: true }
      );

      toast.success(res.data.message);

      navigate("/otp-verification", {
        state: {
          email,
          purpose: "reset_password",
        },
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send reset OTP");
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

      {/* Card */}
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white text-center mb-6">
          Forgot Your Password?
        </h2>

        <p className="text-center text-sm text-gray-600 dark:text-gray-300 mb-6">
          Enter your registered email and we’ll send you a 6-digit OTP to reset
          your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">
              Email Address
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="
                w-full px-4 py-2 rounded-md
                bg-gray-100 dark:bg-gray-700
                text-gray-800 dark:text-white
                focus:ring-2 focus:ring-blue-500 focus:outline-none
              "
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full bg-blue-600 hover:bg-blue-700
              text-white py-2 rounded-md
              transition font-medium
              disabled:opacity-50
            "
          >
            {loading ? "Sending OTP..." : "Send Reset OTP"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-4">
          Remembered your password?{" "}
          <Link
            to="/login"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}


