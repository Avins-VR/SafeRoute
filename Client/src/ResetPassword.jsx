import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("⚠️ Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        `https://saferoute-server.onrender.com/api/password/reset/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Password reset successful! Redirecting...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage(data.message || "❌ Reset failed, please try again");
      }
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Server error, please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-600 via-blue-500 to-cyan-400 px-4 py-10 sm:px-6 lg:px-8">
      {/* Main card */}
      <div className="bg-white/95 backdrop-blur-sm shadow-2xl rounded-2xl w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-md p-8 md:p-10 transition-all duration-300 hover:shadow-indigo-300">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-3 sm:text-2xl">
          Reset Your Password
        </h2>
        <p className="text-gray-500 text-sm text-center mb-8">
          Enter your new password below to secure your account.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-left text-gray-700 text-sm font-medium mb-1">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-800 placeholder-gray-400"
              required
            />
          </div>

          <div>
            <label className="block text-left text-gray-700 text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Re-enter new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-800 placeholder-gray-400"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-60"
          >
            {loading ? "Processing..." : "Reset Password"}
          </button>
        </form>

        {/* Message */}
        {message && (
          <p
            className={`mt-5 text-center font-medium text-base ${
              message.startsWith("✅")
                ? "text-green-600"
                : message.startsWith("⚠️")
                ? "text-yellow-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-10 text-white text-xs sm:text-sm text-center opacity-90">
        © {new Date().getFullYear()} <b>SafeRoute</b> — Secure Reset
      </footer>
    </div>
  );
}

export default ResetPassword;
