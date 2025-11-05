import React from "react";

export default function Footer() {
  return (
    <footer className="bg-[#11141a] text-gray-400 pt-12 pb-6 px-6 sm:px-10 md:px-20">
      {/* Top Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-gray-700 pb-10">
        {/* Logo & About */}
        <div className="text-center sm:text-left">
          <div className="flex justify-center sm:justify-start items-center gap-3 mb-6">
            <i className="bi bi-shield text-blue-500 text-[28px]"></i>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-indigo-400 bg-clip-text text-transparent">
              SafeRoute
            </h2>
          </div>
          <p className="text-[15px] sm:text-[16px] leading-relaxed">
            Advanced safety technology for your journeys. Built with innovation,
            designed for safer travels.
          </p>

          <div className="flex justify-center sm:justify-start gap-4 mt-6">
            <a
              href="https://www.linkedin.com/in/avinsvr"
              className="p-3 bg-[#1a1d24] rounded-xl hover:bg-blue-600 transition"
            >
              <i className="bi bi-linkedin text-blue-400 text-lg hover:text-white"></i>
            </a>
            <a
              href="https://github.com/Avins-VR"
              className="p-3 bg-[#1a1d24] rounded-xl hover:bg-blue-600 transition"
            >
              <i className="bi bi-github text-blue-400 text-lg hover:text-white"></i>
            </a>
            <a
              href="mailto:avins2005@gmail.com"
              className="p-3 bg-[#1a1d24] rounded-xl hover:bg-blue-600 transition"
            >
              <i className="bi bi-envelope-fill text-blue-400 text-lg hover:text-white"></i>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="text-center sm:text-left">
          <h3 className="text-white font-semibold mb-4 text-[18px]">
            Quick Links
          </h3>
          <ul className="space-y-2 text-[15px] sm:text-[16px]">
            <li>
              <a href="/Safezone" className="hover:text-blue-400 transition">
                Area Safety
              </a>
            </li>
            <li>
              <a href="/Sos" className="hover:text-blue-400 transition">
                SOS Alert
              </a>
            </li>
            <li>
              <a href="/Tracking" className="hover:text-blue-400 transition">
                Live Tracking
              </a>
            </li>
            <li>
              <a href="/About" className="hover:text-blue-400 transition">
                About Us
              </a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div className="text-center sm:text-left">
          <h3 className="text-white font-semibold mb-4 text-[18px]">Support</h3>
          <ul className="space-y-2 text-[15px] sm:text-[16px]">
            <li>
              <a href="/Contact" className="hover:text-blue-400 transition">
                Contact Us
              </a>
            </li>
            <li>
              <a href="/Home" className="hover:text-blue-400 transition">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/About" className="hover:text-blue-400 transition">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="/Contact" className="hover:text-blue-400 transition">
                Help Center
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="text-center sm:text-left">
          <h3 className="text-white font-semibold mb-4 text-[18px]">Contact</h3>
          <ul className="space-y-3 text-[15px] sm:text-[16px]">
            <li className="flex justify-center sm:justify-start items-center gap-4">
              <i className="bi bi-geo-alt-fill text-blue-400 text-[18px]"></i>
              Chennai, Tamil Nadu, India
            </li>
            <li className="flex justify-center sm:justify-start items-center gap-4">
              <i className="bi bi-telephone-fill text-blue-400"></i>
              <a
                href="tel:+919488715046"
                className="hover:text-blue-500 transition"
              >
                +91 9488715046
              </a>
            </li>
            <li className="flex justify-center sm:justify-start items-center gap-4">
              <i className="bi bi-envelope-fill text-blue-400"></i>
              <a
                href="mailto:avins2005@gmail.com"
                className="hover:text-blue-500 transition break-all"
              >
                avins2005@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-[14px] sm:text-[16px] text-gray-500 mt-6 leading-relaxed">
        <p>
          Built with innovation • Designed for safer journeys • From India to
          the world
        </p>
        <p className="mt-2">
          © {new Date().getFullYear()} SafeRoute. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
