import React, { useState } from "react";
import {
  Search,
  MapPin,
  Lightbulb,
  Shield,
  Star,
  CheckCircle,
  Clock,
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function App() {
  const [search, setSearch] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [safetyData, setSafetyData] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (search.trim() === "") {
      setShowResult(false);
      return;
    }

    setLoading(true);
    setError("");
    setShowResult(false);

    try {
      const API = import.meta.env.VITE_API_URL;

const res = await fetch(
  `${API}/api/safety?query=${encodeURIComponent(search)}`
);


      const data = await res.json();

      if (res.ok && data.success) {
        setSafetyData(data.data);
        setShowResult(true);
      } else {
        setSafetyData(null);
        setError(data.error || "No data found for this area");
      }
    } catch (err) {
      setError("Server error. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const SafetyStatCard = ({ icon: Icon, value, label, valueClass }) => (
    <div className="flex flex-col items-center justify-center p-3 sm:p-4 bg-[#0a0f1c] rounded-xl border border-gray-700/50">
      <div className="text-base font-medium text-gray-400 hidden sm:block mb-1">
        {label}
      </div>
      <p
        className={`text-xl sm:text-2xl font-bold flex justify-center items-center gap-1 ${valueClass}`}
      >
        <Icon className="w-5 h-5" />
        {value}
      </p>
      <p className="text-gray-400 text-xs sm:hidden">{label}</p>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow bg-[#0a0f1c] text-white font-sans flex flex-col items-center px-4 sm:px-6 lg:px-8 pt-6 pb-16">
        {/* ====== TITLE ====== */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-bold bg-gradient-to-r from-blue-500 to-indigo-400 bg-clip-text text-transparent font-['Orbitron'] text-center mb-4">
          Area Safety Check
        </h2>
        <p className="text-center text-gray-300 text-base sm:text-lg max-w-4xl mx-auto mt-1 mb-10 lg:mb-12">
          Get real-time safety information for any location with detailed
          analysis of street lighting, police presence, and community feedback.
        </p>

        {/* ====== SEARCH BAR ====== */}
        <div className="w-full max-w-7xl bg-[#121826] p-5 sm:p-6 rounded-2xl shadow-lg mb-10">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Enter location (e.g., Tambaram Road, Chennai)"
              className="w-full flex-1 px-4 py-3 sm:py-4 rounded-lg bg-[#0B0F19] text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#4B8BFF] text-sm sm:text-base"
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="w-full md:w-auto px-6 py-4 rounded-lg font-medium bg-gradient-to-r from-[#3B82F6] to-[#6366F1] hover:opacity-90 transition text-sm sm:text-base"
            >
              {loading ? "Loading..." : "Check Area Safety"}
            </button>
          </div>
        </div>

        {/* ====== ERROR MESSAGE ====== */}
        {error && (
          <div className="text-red-400 bg-red-900/30 border border-red-800 px-6 py-3 rounded-xl mb-6">
            ⚠️ {error}
          </div>
        )}

        {/* ====== RESULTS SECTION ====== */}
        {showResult && safetyData && (
          <div className="w-full max-w-7xl bg-[#121826] p-6 sm:p-8 lg:p-10 rounded-2xl shadow-xl border border-gray-800/80 mb-16">
            <h3 className="text-xl sm:text-2xl font-bold mb-6 border-b border-gray-800 pb-4">
              Safety Results for{" "}
              <span className="text-blue-400">"{safetyData.placeName}"</span>
            </h3>

            {/* Info Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mb-8">
              <div className="flex items-center gap-3 text-lg">
                <MapPin className="text-blue-400 w-6 h-6" />
                <span className="font-semibold text-white text-base sm:text-lg">
                  {safetyData.placeName}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Clock className="w-4 h-4" />
                <span>Updated just now</span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 text-center">
              <SafetyStatCard
                icon={Star}
                value={safetyData.safetyRating}
                label="Safety Rating"
                valueClass="text-green-400"
              />
              <SafetyStatCard
                icon={Lightbulb}
                value={safetyData.lighting}
                label="Lighting"
                valueClass="text-yellow-400"
              />
              <SafetyStatCard
                icon={Shield}
                value={safetyData.lightingScore}
                label="Lighting Score"
                valueClass="text-blue-400"
              />
              <SafetyStatCard
                icon={CheckCircle}
                value={safetyData.policePresence}
                label="Police Presence"
                valueClass="text-green-400"
              />
              <SafetyStatCard
                icon={MapPin}
                value={safetyData.emergencyServices}
                label="Emergency Services"
                valueClass="text-teal-400"
              />
            </div>

            {/* Additional Info */}
            <div className="flex flex-col md:flex-row justify-between gap-4 mt-8 border-t border-gray-800 pt-6">
              <div className="flex items-center gap-2 text-gray-400 text-sm sm:text-base">
                <span className="w-3 h-3 rounded-full bg-blue-500 flex-shrink-0"></span>
                <p>
                  Crime Beat ID:{" "}
                  <span className="text-white font-semibold">
                    {safetyData.crimeBeatId}
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm sm:text-base">
                <span className="w-3 h-3 rounded-full bg-teal-400 flex-shrink-0"></span>
                <p>
                  Crowd Density:{" "}
                  <span className="text-white font-semibold">
                    {safetyData.crowdDensity}
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm sm:text-base">
                <CheckCircle className="text-green-400 w-5 h-5 flex-shrink-0" />
                <p>
                  Overall Status:{" "}
                  <span className="text-green-400 font-semibold">
                    {safetyData.overallStatus}
                  </span>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ====== FEATURE SECTION ====== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full">
          {/* Card 1 */}
          <div className="bg-[#121826] p-8 rounded-2xl shadow-xl hover:bg-[#1e2433] transition duration-300 border border-gray-800/50">
            <div className="bg-orange-600/30 w-16 h-16 rounded-xl flex items-center justify-center mb-6 text-orange-400 text-3xl mx-auto">
              <Lightbulb className="w-8 h-8" />
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-center mb-3">
              Street Light Analysis
            </h2>
            <p className="text-gray-400 text-center text-sm sm:text-base">
              Real-time monitoring of street lighting infrastructure and
              functionality.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#121826] p-8 rounded-2xl shadow-xl hover:bg-[#1e2433] transition duration-300 border border-gray-800/50">
            <div className="bg-blue-600/30 w-16 h-16 rounded-xl flex items-center justify-center mb-6 text-blue-400 text-3xl mx-auto">
              <Shield className="w-8 h-8" />
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-center mb-3">
              Safety Scoring
            </h2>
            <p className="text-gray-400 text-center text-sm sm:text-base">
              Comprehensive safety ratings based on multiple security factors.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#121826] p-8 rounded-2xl shadow-xl hover:bg-[#1e2433] transition duration-300 border border-gray-800/50">
            <div className="bg-teal-600/30 w-16 h-16 rounded-xl flex items-center justify-center mb-6 text-teal-400 text-3xl mx-auto">
              <Star className="w-8 h-8" />
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-center mb-3">
              Community Feedback
            </h2>
            <p className="text-gray-400 text-center text-sm sm:text-base">
              User reviews and ratings from local community members.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
