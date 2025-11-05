import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function About() {
  return (
    <div className="bg-[#0a0f1c] text-white font-sans">
      <Navbar />

      {/* About Section */}
      <div className="flex flex-col items-center px-4 sm:px-6 md:px-12 lg:px-16 py-8 md:py-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-500 to-indigo-400 bg-clip-text text-transparent font-['Orbitron'] mb-4 sm:mb-6 md:mb-8 text-center">
          About SafeRoute
        </h2>
        <p className="text-center text-gray-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto mt-1 mb-12">
          We're on a mission to make every journey safer through innovative
          technology, real-time data, and community-driven insights.
        </p>

        {/* Mission Card */}
        <div className="bg-gradient-to-br from-[#222831] to-[#17313E] rounded-2xl shadow-lg px-6 sm:px-10 py-8 sm:py-12 max-w-6xl w-full text-center hover:scale-[1.01] transition-all duration-300 shadow-gray-900/50 border border-transparent hover:border-teal-400 hover:shadow-2xl hover:shadow-teal-500/50">
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="bg-gradient-to-r from-blue-400 to-indigo-400 p-4 sm:p-5 rounded-xl">
              <i className="bi bi-heart text-white text-3xl sm:text-4xl"></i>
            </div>
          </div>

          <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 sm:mb-8">
            Our Mission
          </h3>
          <p className="text-gray-300 leading-relaxed text-sm sm:text-base md:text-lg">
            At SafeRoute, we believe safety is a right, not a privilege. Everyone deserves to travel with confidence, knowing their journey is secure. We combine advanced technology with real-world safety data to guide users through safer routes. Our platform delivers live safety insights, smart tracking, and instant SOS support when needed most. By analyzing crime data and community feedback, we empower informed travel decisions. With SafeRoute, reaching your destination is not just about speed—it’s about arriving safely, every time.
          </p>
        </div>
      </div>

      {/* Why SafeRoute Matters Section */}
      <div className="px-4 sm:px-8 md:px-20 pb-16 md:pb-20">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-400 mb-4 sm:mb-6 md:mb-8 font-['Orbitron']">
            Why SafeRoute Matters
          </h2>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-3xl mx-auto">
            Every day, millions of people worry about their safety while traveling. We're changing that with technology that works.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Left Side */}
          <div className="space-y-8">
            {/* Item 1 */}
            <div className="flex items-start space-x-4 sm:space-x-6">
              <div className="bg-gradient-to-br from-blue-600/30 to-blue-600/10 p-3 sm:p-4 rounded-xl">
                <i className="bi bi-shield-check text-blue-400 text-2xl sm:text-3xl"></i>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold">Real-Time Safety Data</h3>
                <p className="text-gray-400 text-sm sm:text-base mt-1 sm:mt-2 max-w-lg">
                  We process thousands of data points every minute to provide accurate, up-to-date safety information for any location.
                </p>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex items-start space-x-4 sm:space-x-6">
              <div className="bg-gradient-to-br from-blue-600/30 to-blue-600/10 p-3 sm:p-4 rounded-xl">
                <i className="bi bi-people text-blue-400 text-2xl sm:text-3xl"></i>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold">Community-Driven Insights</h3>
                <p className="text-gray-400 text-sm sm:text-base mt-1 sm:mt-2 max-w-lg">
                  Our platform is powered by a community of users who share real experiences and safety updates.
                </p>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex items-start space-x-4 sm:space-x-6">
              <div className="bg-gradient-to-br from-blue-600/30 to-blue-600/10 p-3 sm:p-4 rounded-xl">
                <i className="bi bi-lightning-charge text-blue-400 text-2xl sm:text-3xl"></i>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold">Instant Emergency Response</h3>
                <p className="text-gray-400 text-sm sm:text-base mt-1 sm:mt-2 max-w-lg mb-4 sm:mb-8">
                  When seconds matter, our SOS system connects you to help faster than traditional emergency services.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side (Stats Box) */}
          <div className="bg-gradient-to-br from-[#111827] to-[#17313E] rounded-2xl shadow-lg p-8 sm:p-14 text-center hover:scale-[1.01] transition-all duration-300 shadow-gray-900/50 border border-transparent hover:border-teal-800 hover:shadow-2xl hover:shadow-teal-500/50">
            <div className="grid grid-cols-2 gap-8 sm:gap-12">
              <div>
                <h4 className="text-xl sm:text-2xl md:text-4xl font-bold text-blue-400 font-['Orbitron'] mb-1 sm:mb-2">100+</h4>
                <p className="text-gray-400 text-sm sm:text-base">Active Users</p>
              </div>
              <div>
                <h4 className="text-xl sm:text-2xl md:text-4xl font-bold text-blue-400 font-['Orbitron'] mb-1 sm:mb-2">1K+</h4>
                <p className="text-gray-400 text-sm sm:text-base">Safe Journeys</p>
              </div>
              <div>
                <h4 className="text-xl sm:text-2xl md:text-4xl font-bold text-blue-400 font-['Orbitron'] mb-1 sm:mb-2">99.9%</h4>
                <p className="text-gray-400 text-sm sm:text-base">Uptime</p>
              </div>
              <div>
                <h4 className="text-xl sm:text-2xl md:text-4xl font-bold text-blue-400 font-['Orbitron'] mb-1 sm:mb-2">24/7</h4>
                <p className="text-gray-400 text-sm sm:text-base">Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="px-4 sm:px-6 md:px-12 lg:px-16 pb-20 flex flex-col items-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-400 mb-6 sm:mb-8 md:mb-12 font-['Orbitron'] text-center">
          Our Values
        </h2>
        <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-4xl mx-auto mb-12 sm:mb-16 text-center">
          At SafeRoute, our values of safety, trust, and innovation guide everything we do, ensuring every journey is secure and reliable while empowering users with integrity, empathy, and confidence.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 md:gap-16 w-full max-w-7xl">
          {/* Safety First */}
          <div className="bg-[#111827] rounded-2xl shadow-lg p-6 text-center hover:scale-[1.01] transition-all duration-300 border border-transparent hover:border-teal-800 hover:shadow-2xl hover:shadow-teal-500/50">
            <div className="bg-gradient-to-br from-blue-600/30 to-blue-600/10 text-blue-400 w-14 h-14 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <i className="bi bi-shield-lock text-[28px]"></i>
            </div>
            <h3 className="font-bold text-lg sm:text-xl mb-2">Safety First</h3>
            <p className="text-gray-400 text-sm sm:text-base">
              Every feature and decision is evaluated through the lens of user safety.
            </p>
          </div>

          {/* Community */}
          <div className="bg-[#111827] rounded-2xl shadow-lg p-6 text-center hover:scale-[1.01] transition-all duration-300 border border-transparent hover:border-teal-800 hover:shadow-2xl hover:shadow-teal-500/50">
            <div className="bg-gradient-to-br from-teal-600/30 to-teal-600/10 text-teal-400 w-14 h-14 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <i className="bi bi-people-fill text-[28px]"></i>
            </div>
            <h3 className="font-bold text-lg sm:text-xl mb-2">Community</h3>
            <p className="text-gray-400 text-sm sm:text-base">
              We believe in the power of community and collective safety awareness.
            </p>
          </div>

          {/* Reliability */}
          <div className="bg-[#111827] rounded-2xl shadow-lg p-6 text-center hover:scale-[1.01] transition-all duration-300 border border-transparent hover:border-teal-800 hover:shadow-2xl hover:shadow-teal-500/50">
            <div className="bg-gradient-to-br from-teal-600/60 to-teal-600/20 w-14 h-14 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <i className="bi bi-check2-circle text-[28px] text-green-500"></i>
            </div>
            <h3 className="font-bold text-lg sm:text-xl mb-2">Reliability</h3>
            <p className="text-gray-400 text-sm sm:text-base">
              Our technology works when you need it most - 24/7, 365 days a year.
            </p>
          </div>

          {/* Empathy */}
          <div className="bg-[#111827] rounded-2xl shadow-lg p-6 text-center hover:scale-[1.01] transition-all duration-300 border border-transparent hover:border-teal-800 hover:shadow-2xl hover:shadow-teal-500/50">
            <div className="bg-gradient-to-br from-red-600/25 to-red-600/15 text-red-400 w-14 h-14 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <i className="bi bi-heart text-[28px]"></i>
            </div>
            <h3 className="font-bold text-lg sm:text-xl mb-2">Empathy</h3>
            <p className="text-gray-400 text-sm sm:text-base">
              We understand the real fears and concerns people have about safety.
            </p>
          </div>
        </div>

        {/* Join Our Mission Section */}
        <div className="bg-[#111827] rounded-2xl shadow-lg p-8 sm:p-12 mt-12 sm:mt-16 text-center w-full max-w-5xl hover:scale-[1.01] transition-all duration-300 border border-transparent hover:border-teal-800 hover:shadow-2xl hover:shadow-teal-500/50">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-400 mb-4 sm:mb-6 md:mb-8 font-['Orbitron']">
            Join Our Mission
          </h2>
          <p className="text-gray-300 mb-6 sm:mb-8 md:mb-12 text-sm sm:text-base md:text-lg max-w-3xl mx-auto">
            Be part of a community that's making travel safer for everyone. Together, we can create a world where safety isn't a luxury.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <a 
              href="/Safezone" 
              className="bg-gradient-to-r from-blue-500 to-indigo-400 px-6 py-3 rounded-xl font-medium shadow-lg hover:opacity-90 transition text-center"
            >
              Get Started Today
            </a>

            <a 
              href="/Contact" 
              className="bg-[#1f2937] px-6 py-3 rounded-xl font-medium shadow-lg hover:bg-[#2d3748] transition text-center"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
