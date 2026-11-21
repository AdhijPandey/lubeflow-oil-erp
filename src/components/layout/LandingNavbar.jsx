
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Gauge,
  Menu,
  X,
  ArrowUpRight,
} from "lucide-react";

const LandingNavbar = ({ navItems = [] }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#171A1F] border-b border-white/10">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-12">

        <div className="h-[76px] flex items-center justify-between">

          {/* LOGO */}
          <a
            href="#home"
            onClick={closeMenu}
            className="flex items-center gap-3"
          >
            <div className="w-11 h-11 bg-[#E53935] rounded-xl flex items-center justify-center text-white">
              <Gauge size={27} />
            </div>

            <div>
              <h1 className="text-xl font-black text-white tracking-wide">
                LUBE<span className="text-[#F5A623]">FLOW</span>
              </h1>

              <p className="text-[9px] text-gray-400 tracking-[2px]">
                AUTOMOTIVE LUBRICANTS
              </p>
            </div>
          </a>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.link}
                className="text-sm font-medium text-gray-300 hover:text-[#F5A623] transition-colors"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* DESKTOP ACTION BUTTONS */}
          <div className="hidden lg:flex items-center gap-6">

            {/* SIGN IN */}
            <Link
              to="/login"
              className="text-sm font-semibold text-white hover:text-[#F5A623] transition-colors"
            >
              Sign In
            </Link>

            {/* GET STARTED */}
            <Link
              to="/login"
              className="flex items-center gap-2 bg-[#E53935] hover:bg-[#C62828] text-white px-5 py-3 rounded-lg text-sm font-bold transition"
            >
              Get Started
              <ArrowUpRight size={17} />
            </Link>

          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="lg:hidden text-white p-2"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <X size={26} />
            ) : (
              <Menu size={26} />
            )}
          </button>

        </div>

        {/* MOBILE NAVIGATION */}
        <div
          className={`lg:hidden flex flex-col gap-2 overflow-hidden transition-all duration-300 ${
            menuOpen
              ? "max-h-96 opacity-100 pb-5"
              : "max-h-0 opacity-0"
          }`}
        >

          {/* MOBILE NAV LINKS */}
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.link}
              onClick={closeMenu}
              className="text-sm text-gray-200 py-3 px-2 rounded-lg hover:text-[#F5A623] hover:bg-white/5 transition-colors"
            >
              {item.name}
            </a>
          ))}

          {/* MOBILE SIGN IN */}
          <Link
            to="/login"
            onClick={closeMenu}
            className="bg-[#E53935] hover:bg-[#C62828] text-white text-center rounded-lg p-3 font-semibold text-sm transition"
          >
            Sign In
          </Link>

          {/* MOBILE GET STARTED */}
          <Link
            to="/login"
            onClick={closeMenu}
            className="border border-white/20 text-white text-center rounded-lg p-3 font-semibold text-sm hover:bg-white/5 transition"
          >
            Get Started
            <ArrowUpRight size={16} className="inline ml-2" />
          </Link>

        </div>

      </div>
    </header>
  );
};

export default LandingNavbar;
