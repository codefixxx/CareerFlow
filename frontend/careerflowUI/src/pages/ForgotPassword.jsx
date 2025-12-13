import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: call your API to send password reset link
    // Example:
    // await api.sendPasswordReset(email);
    // then maybe navigate to a confirmation page or show a message
    console.log("Forgot password for:", email);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8">

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white text-center mb-6">
          Forgot Your Password?
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
              value={email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 
                text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md 
              transition font-medium"
          >
            Send Reset Link
          </button>
        </form>

        {/* Back to login */}
        <p className="text-center text-gray-600 dark:text-gray-300 mt-4">
          Remembered your password?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline"
          >
            Log In
          </button>
        </p>
      </div>
    </div>
  );
}
