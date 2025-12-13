import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();  
  const token = searchParams.get("token"); // optional if you use token in link

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // TODO: API call for resetting password using token + new password
    console.log("Resetting password...", formData, token);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-8">

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white text-center mb-6">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* New Password */}
          <div>
            <label className="block text-gray-600 dark:text-gray-300 mb-1">
              New Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter new password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 
              text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-gray-600 dark:text-gray-300 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm new password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 
              text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md 
            transition font-medium"
          >
            Reset Password
          </button>
        </form>

        {/* Back to login */}
        <p className="text-center text-gray-600 dark:text-gray-300 mt-4">
          Back to{" "}
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
