import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import LogoIcon from "../components/LogoIcon";

export default function OtpVerification() {
  const location = useLocation();
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const email = location.state?.email;
  const purpose = location.state?.purpose; // verify_account | reset_password

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  // 🔐 Guard: block direct access / refresh
  useEffect(() => {
    if (!email || !purpose) {
      toast.error("Invalid OTP session. Please try again.");
      navigate("/login", { replace: true });
    }
  }, [email, purpose, navigate]);

  // ⏳ Resend cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;

    const timer = setTimeout(() => {
      setResendCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [resendCooldown]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      toast.error("Enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${backendUrl}/api/auth/verify-otp`,
        { email, otp, purpose },
        { withCredentials: true }
      );

      toast.success(res.data.message);

      if (purpose === "verify_account") {
        navigate("/login", { replace: true });
      }

      if (purpose === "reset_password") {
        const { resetToken } = res.data;
        if (!resetToken) throw new Error("Reset token missing");

        navigate(`/reset-password?token=${resetToken}`, { replace: true });
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      const res = await axios.post(
        `${backendUrl}/api/auth/send-otp`,
        { email, purpose },
        { withCredentials: true }
      );

      toast.success(res.data.message);
      setResendCooldown(60);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to resend OTP");
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
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white text-center mb-4">
          {purpose === "reset_password" ? "Reset Password" : "Verify Account"}
        </h2>

        <p className="text-center text-sm text-gray-600 dark:text-gray-300 mb-6">
          Enter the 6-digit OTP sent to <span className="font-medium">{email}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            placeholder="Enter OTP"
            className="
              w-full px-4 py-2 rounded-md
              text-center tracking-widest
              bg-gray-100 dark:bg-gray-700
              text-gray-800 dark:text-white
              focus:ring-2 focus:ring-blue-500 focus:outline-none
            "
            required
          />

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
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-600 dark:text-gray-300">
          Didn’t receive the code?{" "}
          <button
            type="button"
            onClick={handleResend}
            disabled={resendCooldown > 0}
            className="text-blue-600 dark:text-blue-400 hover:underline disabled:text-gray-400"
          >
            {resendCooldown > 0
              ? `Resend in ${resendCooldown}s`
              : "Resend OTP"}
          </button>
        </p>
      </div>
    </div>
  );
}




