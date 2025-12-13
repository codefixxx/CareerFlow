import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function OtpVerification() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email"); // optional if you passed email in URL

  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO: call backend to verify OTP
    console.log("Verifying OTP:", otp, "for", email);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8">

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white text-center mb-6">
          Verify OTP
        </h2>

        {/* Subtitle */}
        <p className="text-center text-gray-600 dark:text-gray-300 mb-4 text-sm">
          Enter the 6-digit code sent to your email{email ? ` (${email})` : ""}.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* OTP Input */}
          <div>
            <label className="block text-gray-600 dark:text-gray-300 mb-1">
              OTP Code
            </label>
            <input
              type="text"
              name="otp"
              maxLength={6}
              placeholder="Enter OTP"
              value={otp}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 
              text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none tracking-widest text-center"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md 
            transition font-medium"
          >
            Verify OTP
          </button>
        </form>

        {/* Resend OTP */}
        <p className="text-center text-gray-600 dark:text-gray-300 mt-4">
          Didn’t receive the code?{" "}
          <button
            onClick={() => console.log("Resending OTP…")}
            className="text-blue-600 hover:underline"
          >
            Resend OTP
          </button>
        </p>

        {/* Back to forgot password */}
        <p className="text-center text-gray-600 dark:text-gray-300 mt-2 text-sm">
          Wrong email?{" "}
          <button
            onClick={() => navigate("/forgot-password")}
            className="text-blue-600 hover:underline"
          >
            Go back
          </button>
        </p>

      </div>
    </div>
  );
}
