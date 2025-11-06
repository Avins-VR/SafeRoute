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
    <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#092635] via-[#0B192C] to-[#021526] px-4 py-12">
      <div className="bg-gradient-to-br from-[#1E2A36] to-[#112030] border border-[#1f3b52] rounded-2xl shadow-2xl shadow-black/40 p-8 sm:p-10 w-full max-w-md backdrop-blur-sm transition-all duration-300 hover:shadow-[#0ff]/20">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-indigo-400 to-teal-400 bg-clip-text text-transparent font-['Orbitron'] mb-4">
          Reset Your Password
        </h2>
        <p className="text-gray-400 text-center text-sm sm:text-base mb-8">
          Please enter your new password below to secure your account.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-left text-gray-300 text-sm font-medium mb-1">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#0B192C]/50 border border-[#1f3b52] text-gray-200 rounded-lg focus:ring-2 focus:ring-teal-400 focus:outline-none placeholder-gray-500"
              required
            />
          </div>

          <div>
            <label className="block text-left text-gray-300 text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Re-enter new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#0B192C]/50 border border-[#1f3b52] text-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none placeholder-gray-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-indigo-500 to-teal-500 hover:from-indigo-400 hover:to-teal-400 text-white font-semibold rounded-lg transition-all duration-200 shadow-lg shadow-teal-700/30 disabled:opacity-60"
          >
            {loading ? "Processing..." : "Reset Password"}
          </button>
        </form>

        {message && (
          <p
            className={`mt-6 text-center font-medium text-base ${
              message.startsWith("✅")
                ? "text-green-400"
                : message.startsWith("⚠️")
                ? "text-yellow-400"
                : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-10 text-gray-400 text-xs sm:text-sm text-center opacity-80">
        © {new Date().getFullYear()}{" "}
        <span className="text-teal-400 font-semibold">SafeRoute</span> — Secure
        Reset
      </footer>
    </section>
  );
}

export default ResetPassword;
