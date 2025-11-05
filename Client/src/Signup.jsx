import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL; 
  const handleGoogleLogin = () => {
  window.location.href = `${API}/auth/google`;
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    const fullName = e.target.fullName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        `${API}/signup`,
        { fullName, email, password },
        { withCredentials: true }
      );

      alert(response.data.message || "Signup Successful ✅");
      navigate("/about");
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0f1c] text-white font-sans px-4 py-10">
      
      {/* Logo */}
      <div className="flex items-center justify-center mb-8">
        <i className="bi-shield text-blue-400 w-6 h-6 text-[28px] mr-3 mt-[-13px]"></i>
        <span className="ml-2 text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-500 to-indigo-400 bg-clip-text text-transparent">
          SafeRoute
        </span>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-br from-[#111827] to-[#17313E] rounded-3xl shadow-xl w-full max-w-[500px] text-center p-6 sm:p-8 md:p-10"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">Create Account</h2>
        <p className="text-gray-400 text-sm sm:text-base mb-8">
          Join SafeRoute for safer journeys
        </p>

        {/* Full Name */}
        <div className="text-left mb-6">
          <label className="block text-gray-300 text-sm mb-2 sm:mb-3">Full Name</label>
          <input
            name="fullName"
            type="text"
            placeholder="Enter your full name"
            className="w-full px-4 py-3 rounded-lg bg-[#374151] border border-transparent focus:border-blue-500 focus:outline-none text-sm sm:text-base"
            required
          />
        </div>

        {/* Email */}
        <div className="text-left mb-6">
          <label className="block text-gray-300 text-sm mb-2 sm:mb-3">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-lg bg-[#374151] border border-transparent focus:border-blue-500 focus:outline-none text-sm sm:text-base"
            required
          />
        </div>

        {/* Password */}
        <div className="text-left mb-6 relative">
          <label className="block text-gray-300 text-sm mb-2 sm:mb-3">Password</label>
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className="w-full px-4 py-3 rounded-lg bg-[#374151] border border-transparent focus:border-blue-500 focus:outline-none pr-10 text-sm sm:text-base"
            required
          />
          <i
            className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} absolute right-4 top-[55%] text-gray-400 cursor-pointer`}
            onClick={() => setShowPassword(!showPassword)}
          ></i>
        </div>

        {/* Confirm Password */}
        <div className="text-left mb-6 relative">
          <label className="block text-gray-300 text-sm mb-2 sm:mb-3">Confirm Password</label>
          <input
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            className="w-full px-4 py-3 rounded-lg bg-[#374151] border border-transparent focus:border-blue-500 focus:outline-none pr-10 text-sm sm:text-base"
            required
          />
          <i
            className={`bi ${showConfirmPassword ? "bi-eye-slash" : "bi-eye"} absolute right-4 top-[55%] text-gray-400 cursor-pointer`}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          ></i>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 py-3 rounded-lg font-semibold hover:opacity-90 transition shadow-md text-sm sm:text-base"
        >
          Create Account
        </button>

        {/* Divider */}
        <div className="my-6 flex items-center justify-center text-gray-500 text-xs sm:text-sm">
          <span className="border-t border-gray-700 w-1/4"></span>
          <span className="mx-3">Or continue with</span>
          <span className="border-t border-gray-700 w-1/4"></span>
        </div>

        {/* Google Login */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center border border-gray-700 py-3 rounded-lg hover:bg-[#111827] transition text-sm sm:text-base"
        >
          <i className="bi bi-google me-2 text-red-500"></i>
          Continue with Google
        </button>

        {/* Login Link */}
        <p className="mt-6 text-gray-400 text-xs sm:text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Sign in
          </a>
        </p>
      </form>
    </div>
  );
}
