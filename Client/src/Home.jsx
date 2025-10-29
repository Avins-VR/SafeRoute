import React from 'react';
import { Link } from "react-router-dom";
import saferoute from "./assets/saftey image.png";
import Footer from './Footer';

function Home() {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="min-h-screen 
      bg-[radial-gradient(at_top_left,#131820_0%,transparent_70%),radial-gradient(at_top_right,#1e1e1ea3_0%,transparent_70%),radial-gradient(at_bottom_left,#27353575_0%,transparent_80%),linear-gradient(180deg,#070707_0%,#020202_100%)]
      bg-blend-lighten text-white overflow-hidden">

      {/* ✅ Navbar */}
<nav className="bg-[#0a0a0a] text-gray-300 shadow-xl fixed top-0 left-0 w-full z-50">
  <div className="container mx-auto px-5 sm:px-8 lg:px-10 py-6 flex justify-between items-center">
    {/* Logo */}
    <div className="flex items-center gap-2 xl:gap-3">
      <i className="bi-shield text-blue-400 text-xl sm:text-[28px]"></i>
      <h1 className="text-xl sm:text-[28px] font-semibold">
        <span className="text-blue-400">Safe</span>
        <span className="text-indigo-400">Route</span>
      </h1>
    </div>

    {/* Desktop Menu */}
    <div className="hidden xl:flex items-center space-x-12 font-medium text-[18px]">
      {[
        { name: "Home", href: "#home" },
        { name: "Why Choose SafeRoute", href: "#why-choose-safe-route" },
        { name: "Powerful Features", href: "#features" },
      ].map((item, idx) => (
        <div key={idx} className="relative group cursor-pointer">
          <a
            href={item.href}
            className="hover:text-blue-400 transition-colors"
          >
            {item.name}
          </a>
          <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-blue-400 to-indigo-400 transition-all duration-300 group-hover:w-full"></span>
        </div>
      ))}
    </div>

    {/* Desktop Buttons */}
    <div className="hidden xl:flex items-center gap-3">
      <Link to="/Login">
        <button className="px-4 py-1.5 rounded-xl bg-blue-400/10 text-blue-400 hover:bg-blue-400/20 transition text-sm xl:text-base">
          Login
        </button>
      </Link>
      <Link to="/Signup">
        <button className="px-4 py-1.5 rounded-2xl bg-gradient-to-r from-blue-400 to-indigo-500 text-white shadow-lg hover:shadow-xl transition text-sm xl:text-base">
          Sign Up
        </button>
      </Link>
    </div>

    {/* Mobile Menu Button */}
    <button
      className="xl:hidden text-gray-300 text-3xl p-1"
      onClick={() => setIsOpen(!isOpen)}
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      {isOpen ? (
        <i className="bi-x-lg text-2xl"></i>
      ) : (
        <i className="bi-list text-3xl"></i>
      )}
    </button>
  </div>

  {/* Mobile Menu Content */}
  <div
    className={`xl:hidden overflow-hidden transition-all duration-300 ease-in-out ${
      isOpen
        ? "max-h-screen opacity-100 px-5 pb-4"
        : "max-h-0 opacity-0 px-5"
    }`}
  >
    <div className="flex flex-col gap-2 border-t border-gray-800 pt-3">
      {[
        { name: "Home", href: "#home" },
        { name: "Why Choose SafeRoute", href: "#why-choose-safe-route" },
        { name: "Powerful Features", href: "#features" },
      ].map((item, idx) => (
        <a
          key={idx}
          href={item.href}
          onClick={() => setIsOpen(false)}
          className="px-2 py-2 text-base font-medium rounded-lg hover:bg-gray-800 hover:text-blue-400 transition"
        >
          {item.name}
        </a>
      ))}
    </div>

    {/* Mobile Buttons */}
    <div className="flex gap-3 mt-4 pt-3 border-t border-gray-800">
      <Link to="/Login" className="flex-1" onClick={() => setIsOpen(false)}>
        <button className="w-full px-4 py-2 rounded-xl bg-blue-400/10 text-blue-400 hover:bg-blue-400/20 transition text-base font-medium">
          Login
        </button>
      </Link>
      <Link to="/Signup" className="flex-1" onClick={() => setIsOpen(false)}>
        <button className="w-full px-4 py-2 rounded-2xl bg-gradient-to-r from-blue-400 to-indigo-500 text-white shadow-lg hover:shadow-xl transition text-base font-medium">
          Sign Up
        </button>
      </Link>
    </div>
  </div>
</nav>

      {/* Hero Section */}
      <main id="home" className="pt-32 px-6 sm:px-8 md:px-12 py-16 relative overflow-x-hidden
        bg-[radial-gradient(at_top_left,#131820_0%,transparent_70%),radial-gradient(at_top_right,#1e1e1ea3_0%,transparent_70%),radial-gradient(at_bottom_left,#27353575_0%,transparent_80%),linear-gradient(180deg,#070707_0%,#020202_100%)]
        bg-blend-lighten">

        {/* === Hero Content (your existing part) === */}
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <div className="flex-1 space-y-5 lg:space-y-6 pt-8 lg:pt-0 max-w-full lg:max-w-[650px] mx-auto lg:mx-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 md:px-4 md:py-2 bg-blue-100 rounded-full text-red-600 font-medium text-sm md:text-base">
              <i className="bi bi-heart font-bold"></i>
              <span>Your Safety Is Our Priority</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-[50px] pt-6 font-bold text-gray-800 leading-tight mb-4 lg:mb-12 bg-gradient-to-r from-[#ffffff] via-[#dcdcddbd] to-[#e5faff6b] bg-clip-text text-transparent">
              LIFESAVING CONNECTION
            </h1>

            <p className="pt-6 text-gray-300 text-base md:text-lg leading-loose md:leading-relaxed mt-4">
              Our smart safety platform helps you stay informed and protected by showing real-time safety ratings, crowd levels, lighting conditions, and nearby police stations for any location you search. With features like location sharing, safe zone customization, and an SOS alert system that triggers a loud sound, our platform is built to support individuals—especially women—when it matters most. Make smarter decisions, feel safer, and take control of your journey with confidence.
            </p>

            <div className="pt-3 pb-4">
              <div className="flex items-center gap-3 text-lg md:text-xl font-bold text-gray-300">
                <i className="bi bi-geo-alt-fill text-rose-600"></i>
                <h2>Chennai / Emergency Help</h2>
              </div>
            </div>

            <a
              href="/Signup"
              className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-md hover:bg-red-700 transition-colors font-semibold inline-block text-center"
            >
              POST EMERGENCY REQUEST
            </a>
          </div>

          <div className="flex-1 text-center z-10 w-full mt-10 lg:mt-0">
            <img 
              src={saferoute}
              alt="Woman using safety app"
              className="w-[85%] sm:w-[70%] lg:w-[74%] h-auto max-h-[400px] 
                rounded-3xl sm:rounded-[40px] 
                border-8 md:border-[13px] border-black 
                outline outline-2 md:outline-4 outline-white outline-offset-[-6px] md:outline-offset-[-10px] 
                mx-auto lg:mt-[-20px] lg:ml-[50px]"
            />
          </div>
        </div>
      </main>

      {/* How It Works Section */}
      <section
        className="bg-gradient-to-b from-[#092635] via-[#0B192C] to-[#021526] py-10 pb-16 md:py-16 md:pb-20"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Adjusted font size for smaller screens */}
          <h2 id="why-choose-safe-route" className="text-3xl md:text-4xl lg:text-[50px] font-bold text-center bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text font-['Orbitron'] text-transparent mb-4">
            Why Choose SafeRoute?
          </h2>

          <p className="pt-6 pb-4 text-gray-400 text-center mb-10 md:mb-12 max-w-[800px] mx-auto text-base md:text-[19px] px-2">
            Your safety is our priority. We combine cutting-edge technology with real-world insights to keep you protected.
          </p>
          {/* Adjusted grid to include small screen definition */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: "bi-shield-lock",
                title: "Real-Time Safety Analysis",
                description:
                  "Get instant safety ratings for any area with live data from street lights, crime reports, and community feedback.",
                color: "from-[#222831] to-[#17313E]",
                iconBg:
                  "bg-gradient-to-br from-blue-600/30 to-blue-600/10 text-blue-400",
                hoverBorder: "hover:border-teal-400",
                hoverShadow: "hover:shadow-teal-500/50",
              },
              {
                icon: "bi-exclamation-triangle",
                title: "Instant SOS Alerts",
                description:
                  "One-touch emergency alerts that instantly notify nearby police stations and your emergency contacts.",
                color: "from-[#222831] to-[#17313E]",
                iconBg:
                  "bg-gradient-to-br from-red-600/25 to-red-600/15 text-red-400",
                hoverBorder: "hover:border-teal-400",
                hoverShadow: "hover:shadow-teal-500/50",
              },
              {
                icon: "bi-geo-alt",
                title: "Live Location Sharing",
                description:
                  "Share your real-time location with trusted contacts for added peace of mind during travels.",
                color: "from-[#222831] to-[#17313E]",
                iconBg:
                  "bg-gradient-to-br from-teal-600/30 to-teal-600/10 text-teal-400",
                hoverBorder: "hover:border-teal-400",
                hoverShadow: "hover:shadow-teal-500/50",
              },
            ].map((step, index) => (
              <div
                key={index}
                className={`rounded-2xl p-6 md:p-8 bg-gradient-to-br ${step.color} 
                   border border-transparent 
                   hover:scale-[1.02] transition-all duration-300 
                   shadow-xl shadow-gray-900/50 
                   ${step.hoverBorder} 
                   hover:shadow-2xl 
                   ${step.hoverShadow}
                   max-w-sm mx-auto w-full`}
              >
                <div
                  className={`${step.iconBg} w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center mb-4 md:mb-6`}
                >
                  <i className={`${step.icon} text-2xl md:text-[28px] font-bold`}></i>
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-300 text-sm md:text-[17px] leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Powerful Features Section */}
      <section className="bg-gradient-to-b from-[#0B192C] via-[#1A2130] to-[#021526] py-12 md:py-16 pb-20 text-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Heading */}
          <div className="text-center mb-10 md:mb-12">
            {/* Adjusted font size for smaller screens */}
            <h2 id='features' className="text-3xl md:text-4xl lg:text-[50px] font-bold text-[#3b82f6] font-['Orbitron'] mb-4">
              Powerful Features
            </h2>
            <p className="mt-6 text-gray-400 text-base md:text-[18px] mb-12 md:mb-16">
              Everything you need for safer journeys, powered by advanced technology.
            </p>
          </div>

          {/* Content grid - Adjusted grid to handle small screens */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
            {/* Left side - Features */}
            <div className="space-y-6 md:space-y-8">
              {/* Feature 1 */}
              <div className="flex items-start space-x-6">
                <div className="bg-gradient-to-br from-blue-600/30 to-blue-600/10 text-blue-400 w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className="bi bi-check2-circle text-2xl md:text-[28px] font-bold text-[#00A3FF]"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-lg md:text-xl mb-2">Street Light Monitoring</h3>
                  <p className="text-gray-400 text-sm md:text-[17px]">
                    Real-time status of street lighting infrastructure
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start space-x-6">
                <div className="bg-gradient-to-br from-blue-600/30 to-blue-600/10 text-blue-400 w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className="bi bi-people-fill text-2xl md:text-[28px] font-bold text-[#00A3FF]"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-lg md:text-xl mb-2">Community Safety Network</h3>
                  <p className="text-gray-400 text-sm md:text-[17px]">
                    Connect with local safety communities and get alerts
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start space-x-6">
                <div className="bg-gradient-to-br from-blue-600/30 to-blue-600/10 text-blue-400 w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center flex-shrink-0">
                  <i className="bi bi-star-fill text-2xl md:text-[28px] font-bold text-[#00A3FF]"></i>
                </div>
                <div>
                  <h3 className="font-semibold text-lg md:text-xl mb-2">Safety Ratings & Reviews</h3>
                  <p className="text-gray-400 text-sm md:text-[17px]">
                    Comprehensive area ratings based on multiple safety factors
                  </p>
                </div>
              </div>
            </div>

            {/* Right side - Dashboard Placeholder */}
            {/* Removed fixed ml-[50px] and used margin utilities and max-width */}
            <div className="order-first md:order-last mx-auto md:mx-0 w-full max-w-md lg:max-w-[550px] p-6 md:p-10 bg-gray-900 rounded-2xl md:rounded-3xl shadow-2xl shadow-black/90">
              <div className="bg-gradient-to-br from-[#103245] to-[#34656D] rounded-xl md:rounded-2xl shadow-lg p-10 md:p-16 flex items-center justify-center w-full">
                <div className="text-center">
                  <i className="bi bi-geo-alt-fill text-4xl md:text-5xl text-[#00A3FF]"></i>
                  <p className="text-gray-300 mt-3 md:mt-4 text-base md:text-lg">
                    Interactive Safety Dashboard
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="flex items-center justify-center py-20 md:py-32 bg-gradient-to-b from-[#0B192C] via-[#1A2130] to-[#021526]">
        <div
          className="max-w-xl lg:max-w-3xl w-[90%] md:w-full py-12 md:py-20 px-6 sm:px-12 md:px-16 rounded-2xl bg-[#11141a] 
                       border border-transparent hover:border-blue-500 
                       hover:shadow-[0_0_40px_rgba(0,122,255,0.4)]
                       transition-all duration-500"
        >
          {/* Heading - Adjusted font size for smaller screens */}
          <h1
            className="text-center text-3xl md:text-4xl lg:text-[50px] font-bold mb-4 md:mb-6 
                       text-[#3b82f6] font-['Orbitron'] mt-[-10px] md:mt-[-20px]"
          >
            Ready for Safer Journeys?
          </h1>

          {/* Subtext - Adjusted text size */}
          <p className="text-center text-gray-400 text-base md:text-lg mb-8 md:mb-10">
            Join thousands of users who trust SafeRoute for their daily travels.{" "}
            <br className="hidden sm:inline" /> 
            Start your safer journey today.
          </p>

          {/* Buttons - Adjusted spacing and added full width on mobile */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-10">
            <a
              href="/Signup"
              className="w-full sm:w-auto px-6 py-3 rounded-lg font-medium 
                        bg-gradient-to-r from-blue-500 to-blue-400 
                        text-white shadow-md hover:shadow-lg 
                        transition-all duration-300 text-center"
            >
              Get Started Free
            </a>
            <a
              href="/Signup"
              className="w-full sm:w-auto px-6 py-3 rounded-lg font-medium 
               bg-transparent border border-gray-600 
               text-gray-300 hover:bg-gray-800 
               transition-all duration-300 inline-block text-center"
            >
              Learn More
            </a>

          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Home;