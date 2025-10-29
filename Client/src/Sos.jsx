import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Bell } from "lucide-react";

export default function Sos() {
  const [isSOSActive, setIsSOSActive] = useState(false);
  const [audio] = useState(() => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();

    const osc1 = audioContext.createOscillator();
    const osc2 = audioContext.createOscillator();
    const osc3 = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    const compressor = audioContext.createDynamicsCompressor();

    compressor.threshold.setValueAtTime(-50, audioContext.currentTime);
    compressor.knee.setValueAtTime(40, audioContext.currentTime);
    compressor.ratio.setValueAtTime(12, audioContext.currentTime);
    compressor.attack.setValueAtTime(0, audioContext.currentTime);
    compressor.release.setValueAtTime(0.25, audioContext.currentTime);

    osc1.type = "square";
    osc1.frequency.setValueAtTime(880, audioContext.currentTime);
    osc2.type = "square";
    osc2.frequency.setValueAtTime(1100, audioContext.currentTime);
    osc3.type = "square";
    osc3.frequency.setValueAtTime(1320, audioContext.currentTime);

    gainNode.gain.setValueAtTime(0, audioContext.currentTime);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    osc3.connect(gainNode);
    gainNode.connect(compressor);
    compressor.connect(audioContext.destination);

    osc1.start();
    osc2.start();
    osc3.start();

    return { oscillators: [osc1, osc2, osc3], gainNode, context: audioContext };
  });

  useEffect(() => {
    if (isSOSActive) {
      if (audio.context.state === "suspended") {
        audio.context.resume();
      }

      const beepOn = () => audio.gainNode.gain.setValueAtTime(10, audio.context.currentTime);
      const beepOff = () => audio.gainNode.gain.setValueAtTime(0, audio.context.currentTime);

      beepOn();
      const interval = setInterval(() => {
        beepOff();
        setTimeout(beepOn, 50);
      }, 200);

      return () => {
        clearInterval(interval);
        beepOff();
      };
    } else {
      audio.gainNode.gain.setValueAtTime(0, audio.context.currentTime);
    }
  }, [isSOSActive, audio]);

  const toggleSOS = () => {
    setIsSOSActive(!isSOSActive);
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-[#0a0f1c] text-white font-sans px-4 sm:px-6 md:px-10 lg:px-20 xl:px-36 py-10">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[50px] font-bold bg-gradient-to-r from-blue-500 to-indigo-400 bg-clip-text text-transparent font-['Orbitron'] mb-4">
            Emergency SOS Alert
          </h1>
          <p className="text-gray-300 text-base sm:text-lg md:text-[18px] max-w-3xl mx-auto mt-2 mb-12">
            Instantly alert nearby police stations and your emergency contacts with a single tap.
          </p>
        </div>

        {/* SOS Button + Contacts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 lg:gap-28">
          {/* SOS Section */}
          <div className="bg-gradient-to-br from-[#222831] to-[#17313E] rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center shadow-lg text-center">
            <div className="relative">
              {isSOSActive && (
                <div className="absolute inset-0 rounded-full bg-red-500 opacity-50 animate-ping"></div>
              )}
              <button
                onClick={toggleSOS}
                className={`relative z-10 w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
                  isSOSActive
                    ? "bg-white text-red-600 animate-pulse"
                    : "bg-gradient-to-r from-red-500 to-pink-500 text-white"
                }`}
              >
                <Bell
                  className={`w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 ${
                    isSOSActive ? "text-red-600 animate-bounce" : "text-white"
                  }`}
                />
              </button>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-500 mt-8 font-['Orbitron']">
              {isSOSActive ? "ALERT ACTIVE" : "Emergency SOS"}
            </h2>
            <p className="text-gray-300 text-sm sm:text-base md:text-[18px] max-w-md text-center mt-4">
              {isSOSActive
                ? "SOS alert is active. Authorities have been notified."
                : "Tap to send instant alert to emergency services and contacts."}
            </p>
          </div>

          {/* Emergency Contacts */}
          <div className="flex flex-col gap-10">
            <div className="bg-gradient-to-br from-[#222831] to-[#17313E] rounded-2xl p-6 sm:p-8 shadow-lg">
              <h3 className="text-2xl sm:text-3xl font-semibold font-['Orbitron'] bg-gradient-to-r from-blue-500 to-indigo-400 bg-clip-text text-transparent mb-6 sm:mb-8">
                Emergency Contacts
              </h3>
              <ul className="space-y-4 text-sm sm:text-base">
                {[
                  { title: "Police Emergency", desc: "For immediate police assistance", num: "100" },
                  { title: "Ambulance", desc: "Medical emergency services", num: "108" },
                  { title: "Fire Emergency", desc: "Fire department emergency line", num: "101" },
                  { title: "Women Helpline", desc: "National helpline for women in distress", num: "181" },
                  { title: "Disaster Management", desc: "Natural and man-made disaster response", num: "112" },
                ].map((item, i) => (
                  <li key={i} className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                    <a
                      href={`tel:${item.num}`}
                      className="text-gray-300 hover:underline text-base sm:text-lg"
                    >
                      {item.num}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Safety Tips */}
        <div className="bg-gradient-to-br from-[#222831] to-[#17313E] rounded-2xl p-6 sm:p-10 shadow-2xl my-16 sm:my-20 md:my-28">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold bg-gradient-to-r from-blue-500 to-indigo-400 bg-clip-text text-transparent mb-10 sm:mb-16 text-center font-['Orbitron']">
            Safety Tips
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 sm:gap-12 md:gap-16 text-center text-white">
            {[
              { icon: "bi-exclamation-triangle", title: "Stay Calm", desc: "Keep calm and move to a safe location before using SOS." },
              { icon: "bi-telephone", title: "Keep Phone Ready", desc: "Ensure your phone has battery and signal for emergency communications." },
              { icon: "bi-geo-alt", title: "Share Location", desc: "Enable location services for accurate emergency response." },
              { icon: "bi-check-circle", title: "Update Contacts", desc: "Keep emergency contacts current and inform them about SafeRoute." },
            ].map((tip, index) => (
              <div key={index}>
                <div className="bg-gradient-to-br from-blue-600/30 to-blue-600/10 rounded-lg p-2 w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center mx-auto mb-4">
                  <i className={`${tip.icon} text-[22px] sm:text-[25px] text-blue-300`}></i>
                </div>
                <h4 className="font-semibold text-base sm:text-lg mb-2">{tip.title}</h4>
                <p className="text-xs sm:text-sm text-gray-300 max-w-xs mx-auto">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
