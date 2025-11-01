import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("⏳ Sending...");

    try {
      const res = await fetch("https://saferoute-server.onrender.com/api/send-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("✅ Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("❌ " + (data.error || "Failed to send message."));
      }
    } catch (error) {
      console.error("Error:", error);
      setStatus("❌ Something went wrong. Try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white font-sans flex flex-col">
      <Navbar />

      <div className="flex flex-col items-center px-4 sm:px-6 md:px-12 lg:px-16 pt-6 pb-16 w-full">
        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-500 to-indigo-400 bg-clip-text text-transparent font-['Orbitron'] mb-3 text-center">
          Get in Touch
        </h2>
        <p className="text-center text-gray-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto mt-1 mb-12 px-2 sm:px-0">
          Have questions about SafeRoute? Want to partner with us? We'd love to hear
          from you and help make your journeys safer.
        </p>

        {/* Content Wrapper */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-20 w-full max-w-6xl">
          {/* Left - Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-[#111827] p-6 sm:p-8 rounded-2xl shadow-md space-y-6 sm:space-y-9 
            border border-transparent 
            hover:border-teal-800 
            hover:shadow-2xl 
            hover:shadow-teal-400/50 
            transition-all duration-300"
          >
            <h3 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8 font-['Orbitron'] text-center md:text-left">
              Send us a Message
            </h3>

            {/* Name + Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <input
                type="text"
                name="name"
                placeholder="Your full name"
                value={formData.name}
                onChange={handleChange}
                required
                className="bg-transparent border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 w-full"
              />
              <input
                type="email"
                name="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="bg-transparent border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 w-full"
              />
            </div>

            {/* Subject */}
            <input
              type="text"
              name="subject"
              placeholder="What's this about?"
              value={formData.subject}
              onChange={handleChange}
              className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-500 mt-4"
            />

            {/* Message */}
            <textarea
              name="message"
              placeholder="Tell us more about your inquiry..."
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 h-32 resize-none focus:outline-none focus:border-blue-500 mt-4"
            ></textarea>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-700 to-indigo-500 text-white py-3 rounded-lg flex justify-center items-center gap-2 hover:from-blue-600 hover:to-indigo-600 shadow-lg shadow-blue-500/30 transition-all duration-300 mt-4"
            >
              <i className="bi bi-send"></i> Send Message
            </button>

            {/* Status Message */}
            {status && (
              <p className="text-center text-sm sm:text-base mt-3 text-gray-300">
                {status}
              </p>
            )}
          </form>

          {/* Right - Contact Info */}
          <div className="flex flex-col gap-8 md:gap-16">
            {/* Contact Information */}
            <div className="bg-[#111827] p-6 sm:p-8 rounded-2xl shadow-md space-y-6 sm:space-y-8
              border border-transparent 
              hover:border-teal-800 
              hover:shadow-2xl 
              hover:shadow-teal-400/50 
              transition-all duration-300">
              <h3 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8 font-['Orbitron'] text-center md:text-left">
                Contact Information
              </h3>
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start gap-4 sm:gap-6">
                  <i className="bi bi-envelope-fill text-blue-400 text-xl sm:text-2xl"></i>
                  <div>
                    <p className="font-semibold">Email Us</p>
                    <p className="text-gray-400 text-sm sm:text-base">avins2005@gmail.com</p>
                    <p className="text-gray-400 text-sm sm:text-base">avinsvr2022@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 sm:gap-6">
                  <i className="bi bi-telephone-fill text-green-400 text-xl sm:text-2xl"></i>
                  <div>
                    <p className="font-semibold">Call Us</p>
                    <p className="text-gray-400 text-sm sm:text-base">+91 9488715046</p>
                    <p className="text-gray-500 text-xs sm:text-sm">Sun–Sat, 9 AM – 6 PM IST</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 sm:gap-6">
                  <i className="bi bi-geo-alt-fill text-red-400 text-xl sm:text-2xl"></i>
                  <div>
                    <p className="font-semibold">Visit Us</p>
                    <p className="text-gray-400 text-sm sm:text-base">
                      Chennai, Tamil Nadu<br />
                      India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-[#111827] p-6 sm:p-8 rounded-2xl shadow-md border border-transparent 
              hover:border-teal-800 
              hover:shadow-2xl 
              hover:shadow-teal-400/50 
              transition-all duration-300">
              <h3 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8 font-['Orbitron'] text-center md:text-left">
                Connect With Us
              </h3>
              <div className="flex justify-center md:justify-start items-center gap-20 sm:gap-20 text-2xl sm:text-3xl text-indigo-200">
                <a href="https://www.linkedin.com/in/avinsvr" className="hover:text-blue-500 transition-colors">
                  <i className="bi bi-linkedin"></i>
                </a>
                <a href="https://github.com/Avins-VR" className="hover:text-gray-300 transition-colors">
                  <i className="bi bi-github"></i>
                </a>
                <a href="mailto:avins2005@gmail.com" className="hover:text-red-400 transition-colors">
                  <i className="bi bi-envelope"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
