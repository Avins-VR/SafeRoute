import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  // ======================= STATE =======================
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const togglePassword = () => setShowPassword(!showPassword);

  // ======================= HANDLE LOGIN =======================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
  email,
  password,
});
      alert(response.data.message);

      // 👉 Redirect After Login
      navigate("/about");
    } catch (error) {
      console.error("Login error:", error);
      alert(error.response?.data?.message || "Login failed. Try again.");
    }
  };

  // ======================= GOOGLE LOGIN =======================
  const handleGoogleLogin = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };

  // ======================= UI =======================
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0f1c] text-white font-sans px-4 sm:px-6 md:px-8">

      {/* ------------------ Logo ------------------ */}
      <div className="flex items-center justify-center mb-8">
        <i className="bi-shield text-blue-400 w-6 h-6 text-[28px] mr-3 mt-[-14px]"></i>
        <span className="ml-2 text-2xl sm:text-3xl md:text-4xl font-semibold bg-gradient-to-r from-blue-500 to-indigo-400 bg-clip-text text-transparent">
          SafeRoute
        </span>
      </div>

      {/* ------------------ Login Card ------------------ */}
      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-br from-[#111827] to-[#17313E] rounded-3xl shadow-xl p-6 sm:p-8 md:p-10 w-full max-w-[450px] text-center"
      >
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-bold mb-2 font-['Orbitron']">
          Welcome Back
        </h2>

        {/* Subtitle */}
        <p className="text-gray-400 text-sm sm:text-base mb-8">
          Sign in to your SafeRoute account
        </p>

        {/* ------------------ Email ------------------ */}
        <div className="text-left mb-4">
          <label className="block text-gray-300 text-sm sm:text-base mb-2">
            Email
          </label>

          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-lg bg-[#374151] border border-transparent 
            focus:border-blue-500 focus:outline-none text-sm sm:text-base"
            required
          />
        </div>

        {/* ------------------ Password ------------------ */}
        <div className="text-left mb-4 relative">
          <label className="block text-gray-300 text-sm sm:text-base mb-2">
            Password
          </label>

          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full px-4 py-3 rounded-lg bg-[#374151] border border-transparent 
            focus:border-blue-500 focus:outline-none pr-10 text-sm sm:text-base"
            required
          />

          {/* Eye icon */}
          <i
            className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} absolute right-3 top-11 text-gray-400 cursor-pointer`}
            onClick={togglePassword}
          ></i>
        </div>

        {/* ------------------ Remember + Forgot ------------------ */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 text-sm gap-3 sm:gap-0">
          <label className="flex items-center text-gray-400">
            <input type="checkbox" className="mr-2" /> Remember me
          </label>

          <a href="#" className="text-blue-400 hover:underline">
            Forgot password?
          </a>
        </div>

        {/* ------------------ Login Button ------------------ */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 py-3 rounded-lg font-semibold hover:opacity-90 transition text-sm sm:text-base"
        >
          Sign In
        </button>

        {/* Divider */}
        <div className="my-6 flex items-center justify-center text-gray-500 text-xs sm:text-sm">
          <span className="border-t border-gray-700 w-1/4"></span>
          <span className="mx-3">Or continue with</span>
          <span className="border-t border-gray-700 w-1/4"></span>
        </div>

        {/* ------------------ Google Button ------------------ */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center border border-gray-700 py-3 rounded-lg hover:bg-[#111827] transition text-sm sm:text-base"
        >
          <i className="bi bi-google me-2"></i>
          Continue with Google
        </button>

        {/* Signup redirect */}
        <p className="mt-6 text-gray-400 text-xs sm:text-sm">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-400 hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}
