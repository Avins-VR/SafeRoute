import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Compass } from "lucide-react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function LocationMarker() {
  const [position, setPosition] = useState(null);
  const map = useMap();

  useEffect(() => {
    const defaultPosition = [13.0827, 80.2707]; // Chennai
    map.setView(defaultPosition, 13);
    setPosition(defaultPosition);
  }, [map]);

  return position ? (
    <Marker position={position}>
      <Popup>You are here!</Popup>
    </Marker>
  ) : null;
}

export default function LiveLocation() {
  const [liveSharing, setLiveSharing] = useState(true);
  const [visibleAll, setVisibleAll] = useState(false);
  const [position, setPosition] = useState([8.7642, 78.1348]); // Thoothukudi

  return (
    <div>
      <Navbar />

      {/* Main Section */}
      <div className="min-h-screen bg-[#0a0f1c] text-white font-sans flex flex-col items-center px-4 sm:px-6 lg:px-12 pt-8 pb-20">

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-[50px] font-bold bg-gradient-to-r from-blue-500 to-indigo-400 bg-clip-text text-transparent font-['Orbitron'] text-center mb-8">
          Live Location Tracking
        </h2>
        <p className="text-center text-gray-300 text-base sm:text-lg lg:text-[18px] max-w-3xl sm:max-w-4xl mx-auto mb-12">
          Share your real-time location with trusted contacts for enhanced safety during travels.
          Full control over who can see your location and when.
        </p>

        {/* Map Section */}
        <div className="bg-[#111827] text-white p-4 sm:p-6 rounded-2xl shadow-lg w-full max-w-7xl mx-auto border border-[#1a1f29] mb-12 relative">
          {/* Header */}
          <div className="flex flex-wrap justify-between items-center mb-4">
            <h2 className="text-lg sm:text-2xl font-semibold tracking-wide font-['Orbitron'] mb-2 sm:mb-0">
              Live Location
            </h2>
            <div className="flex items-center space-x-2">
              <span className="text-green-400 text-lg sm:text-xl animate-pulse">●</span>
              <span className="text-green-400 text-base sm:text-lg font-medium">Live</span>
            </div>
          </div>

          {/* Map */}
          <div className="h-[300px] sm:h-[500px] lg:h-[600px] rounded-xl overflow-hidden relative z-[1]">
            <MapContainer center={position} zoom={13} className="h-full w-full z-[1]">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>Your location</Popup>
              </Marker>
              <LocationMarker />
            </MapContainer>

            {/* GPS Button */}
            <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-[1000]">
              <button
                className="bg-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                onClick={() => {
                  navigator.geolocation.getCurrentPosition(
                    (pos) =>
                      setPosition([pos.coords.latitude, pos.coords.longitude]),
                    (error) =>
                      console.error("Error fetching location:", error.message)
                  );
                }}
              >
                <Compass className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-center items-start gap-8 lg:gap-16 w-full max-w-7xl">

          {/* Sharing Controls */}
          <div className="bg-[#111827] text-white p-5 sm:p-6 rounded-2xl shadow-lg w-full lg:w-2/3 border border-[#1a1f29]">
            <h2 className="text-lg sm:text-xl font-semibold mb-6">Sharing Controls</h2>

            {/* Live Location Toggle */}
            <div className="flex items-center justify-between bg-[#0d1117] rounded-xl px-4 py-4 mb-4 sm:mb-3">
              <div className="flex items-center space-x-4">
                <i className="bi bi-geo-alt text-blue-400 text-xl sm:text-2xl"></i>
                <div>
                  <h3 className="text-[15px] sm:text-[16px] font-medium">Live Location Sharing</h3>
                  <p className="text-sm text-gray-400">Share your real-time location</p>
                </div>
              </div>
              <div
                onClick={() => setLiveSharing(!liveSharing)}
                className={`w-11 sm:w-12 h-6 flex items-center rounded-full cursor-pointer transition-all duration-300 ${
                  liveSharing ? "bg-blue-500" : "bg-[#2c2f38]"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                    liveSharing ? "translate-x-5 sm:translate-x-6" : "translate-x-1"
                  }`}
                ></div>
              </div>
            </div>

            {/* Visible to All Toggle */}
            <div className="flex items-center justify-between bg-[#0d1117] rounded-xl px-4 py-4 mb-6">
              <div className="flex items-center space-x-4">
                <i className="bi bi-eye text-blue-400 text-xl sm:text-2xl"></i>
                <div>
                  <h3 className="text-[15px] sm:text-[16px] font-medium">Visible to All Contacts</h3>
                  <p className="text-sm text-gray-400">Let all contacts see your location</p>
                </div>
              </div>
              <div
                onClick={() => setVisibleAll(!visibleAll)}
                className={`w-11 sm:w-12 h-6 flex items-center rounded-full cursor-pointer transition-all duration-300 ${
                  visibleAll ? "bg-blue-500" : "bg-[#2c2f38]"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
                    visibleAll ? "translate-x-5 sm:translate-x-6" : "translate-x-1"
                  }`}
                ></div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <button className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-medium px-5 py-3 rounded-xl w-full sm:w-1/2 hover:shadow-[0_0_20px_rgba(30,90,150,0.6)] transition-all">
                <i className="bi bi-share"></i>
                <span>Share Location</span>
              </button>

              <a
  href="https://contacts.google.com/"
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center justify-center space-x-2 border border-[#dddddd] text-white font-medium px-5 py-3 rounded-xl w-full sm:w-1/2 hover:bg-[#1a1f29] transition-all"
>
  <i className="bi bi-telephone"></i>
  <span>Quick Call</span>
</a>

            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-[#111827] text-white p-5 sm:p-6 rounded-2xl shadow-lg w-full lg:w-1/3 border border-[#1a1f29]">
            <h2 className="text-lg sm:text-xl font-semibold mb-6 sm:mb-8">Quick Actions</h2>

            <div className="flex items-center justify-between bg-gradient-to-r from-red-600 to-pink-600 rounded-xl px-5 py-4 mb-6 cursor-pointer shadow-[0_0_15px_rgba(255,75,75,0.4)] hover:shadow-[0_0_25px_rgba(255,75,75,0.6)] transition-all">
              <a href="/Sos" className="flex items-center space-x-3 w-full">
                <i className="bi bi-shield-exclamation text-white text-xl"></i>
                <span className="text-[15px] sm:text-[16px] font-medium">Emergency SOS</span>
              </a>
            </div>

            <div className="flex items-center justify-between bg-[#0d1117] rounded-xl px-5 py-4 mb-6 cursor-pointer hover:bg-[#1b2230] transition-all">
              <a href="/Safezone" className="flex items-center space-x-3 w-full">
                <i className="bi bi-geo-alt text-gray-300 text-xl"></i>
                <span className="text-[15px] sm:text-[16px] font-medium text-gray-200">Check Area Safety</span>
              </a>
            </div>

            <div className="flex items-center justify-between bg-transparent rounded-xl px-5 py-4 cursor-pointer hover:bg-[#0d1117] transition-all">
              <a href="/Tracking" className="flex items-center space-x-3 w-full">
                <i className="bi bi-clock-history text-gray-400 text-xl"></i>
                <span className="text-[15px] sm:text-[16px] font-medium text-gray-400">Location History</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
