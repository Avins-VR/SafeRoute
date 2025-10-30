import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const response = await axios.post(
        `${API}/login`,
        { email, password },
        { withCredentials: true }
      );

      alert(response.data.message || "Login Successful ✅");
      navigate("/about");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed ❌");
    }
  };

  const handleGoogleLogin = () => {
    window.open(`${API}/auth/google`, "_self");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0f1c] text-white px-4">
      <div className="flex items-center mb-8">
        <i className="bi-shield text-blue-400 text-[28px] mr-3"></i>
        <span className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-indigo-400 bg-clip-text text-transparent">
          SafeRoute
        </span>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-br from-[#111827] to-[#17313E] rounded-3xl shadow-xl p-10 w-full max-w-[450px] text-center"
      >
        <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
        <p className="text-gray-400 mb-8">Sign in to your SafeRoute account</p>

        <div className="mb-5 text-left">
          <label className="text-gray-300 mb-2 block">Email</label>
          <input
            name="email"
            type="email"
            className="w-full p-3 rounded-lg bg-[#374151] focus:border-blue-500 outline-none"
            required
          />
        </div>

        <div className="mb-5 text-left relative">
          <label className="text-gray-300 mb-2 block">Password</label>
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            className="w-full p-3 rounded-lg bg-[#374151] focus:border-blue-500 outline-none pr-12"
            required
          />
          <i
            className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"} absolute right-4 top-[55%] text-gray-300 cursor-pointer`}
            onClick={() => setShowPassword(!showPassword)}
          ></i>
        </div>

        <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 py-3 rounded-lg font-semibold hover:opacity-90 mb-6">
          Sign In
        </button>

        <div className="my-6 flex items-center justify-center text-gray-500 text-sm">
          <span className="border-t border-gray-700 w-1/4"></span>
          <span className="mx-3">Or continue with</span>
          <span className="border-t border-gray-700 w-1/4"></span>
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center border border-gray-700 py-3 rounded-lg hover:bg-[#111827]"
        >
          <i className="bi bi-google me-2"></i>
          Continue with Google
        </button>

        <p className="mt-6 text-gray-400">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-400">Sign up</a>
        </p>
      </form>
    </div>
  );
}
