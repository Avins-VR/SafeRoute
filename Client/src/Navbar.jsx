import React, { useState } from "react";
import { Link } from "react-router-dom"; 

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Area Safety", path: "/Safezone" },
    { name: "SOS Alert", path: "/Sos" },
    { name: "Tracking", path: "/Tracking" },
    { name: "About", path: "/About" },
    { name: "Contact", path: "/Contact" },
  ];

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-[#0a0a0a] text-gray-300 shadow-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-7 lg:px-9 py-7 xl:py-7 flex justify-between items-center">
        
        {/* Logo */}
        <div className="flex items-center gap-2 xl:gap-3">
          <i className="bi-shield text-blue-400 text-xl sm:text-[28px]"></i> 
          <h1 className="text-xl sm:text-[28px] font-semibold">
            <span className="text-blue-400">Safe</span>
            <span className="text-indigo-400">Route</span>
          </h1>
        </div>

        {/* Desktop Menu */}
        <div className="hidden xl:flex flex-grow-0 justify-start lg:justify-center">
          <ul className="flex items-center gap-6 xl:gap-16 font-medium"> 
            {menuItems.map((item, idx) => (
              <li
                key={idx}
                className="relative cursor-pointer flex items-center group text-base xl:text-lg"
              >
                <Link 
                  to={item.path} 
                  className="hover:text-blue-400 transition"
                >
                  {item.name}
                </Link>
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-blue-400 to-indigo-400 transition-all duration-300 group-hover:w-full"></span>
              </li>
            ))}
          </ul>
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
          isOpen ? 'max-h-screen opacity-100 px-4 sm:px-6 pb-4' : 'max-h-0 opacity-0 px-4 sm:px-6'
        }`}
      >
        <div className="flex flex-col gap-2 border-t border-gray-800 pt-3">
          {menuItems.map((item, idx) => (
            <Link
              key={idx}
              to={item.path}
              onClick={closeMenu} 
              className="px-2 py-2 text-base font-medium rounded-lg hover:bg-gray-800 hover:text-blue-400 transition"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
