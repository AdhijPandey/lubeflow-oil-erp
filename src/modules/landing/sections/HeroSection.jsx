
import React from "react";
import {
  ArrowRight,
  ShieldCheck,
  Package,
  TrendingUp,
} from "lucide-react";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#171A1F] text-white"
    >
      {/* BACKGROUND DECORATION */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E53935]/10 rounded-full blur-[120px]" />

  <div className="relative max-w-[1440px] mx-auto px-5 lg:px-12 pt-8 pb-8 lg:pt-10 lg:pb-10">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT CONTENT */}
          <div>

            {/* BADGE */}
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-4 py-2 mb-7">

              <span className="w-2 h-2 rounded-full bg-[#F5A623]" />

              <span className="text-xs font-bold tracking-widest text-[#F5A623]">
                AUTOMOTIVE LUBRICANTS SOLUTIONS
              </span>

            </div>

            {/* HEADING */}
            <h2 className="text-4xl sm:text-5xl xl:text-7xl font-black leading-[1.1]">
              Power Your

              <span className="block text-[#F5A623]">
                Engine.
              </span>

              Drive Your

              <span className="block">
                Business.
              </span>
            </h2>

            {/* DESCRIPTION */}
            <p className="text-gray-400 text-base lg:text-lg leading-8 mt-7 max-w-xl">
              Your trusted destination for premium automotive lubricants.
              Discover engine oils and lubrication solutions for bikes,
              cars, tractors and heavy commercial vehicles.
            </p>

            {/* BUTTONS */}
            <div className="flex flex-wrap gap-4 mt-9">

              <a
                href="#products"
                className="inline-flex items-center gap-3 bg-[#E53935] hover:bg-[#C62828] px-7 py-4 rounded-xl font-bold transition-all duration-300 hover:-translate-y-1"
              >
                Explore Products
                <ArrowRight size={19} />
              </a>

              <a
                href="#about"
                className="inline-flex items-center gap-2 border border-white/20 hover:bg-white/10 px-7 py-4 rounded-xl font-semibold transition-all duration-300"
              >
                Learn More
              </a>

            </div>

            {/* TRUST POINTS */}
            <div className="grid sm:grid-cols-3 gap-5 mt-12 pt-8 border-t border-white/10">

              <div className="flex items-center gap-3">
                <ShieldCheck className="text-[#F5A623] shrink-0" size={25} />

                <span className="text-xs font-semibold text-gray-300">
                  Quality Products
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Package className="text-[#F5A623] shrink-0" size={25} />

                <span className="text-xs font-semibold text-gray-300">
                  Multiple Brands
                </span>
              </div>

              <div className="flex items-center gap-3">
                <TrendingUp className="text-[#F5A623] shrink-0" size={25} />

                <span className="text-xs font-semibold text-gray-300">
                  Business Growth
                </span>
              </div>

            </div>

          </div>

          {/* RIGHT IMAGE */}
          <div className="relative">

            {/* IMAGE GLOW */}
            <div className="absolute inset-0 bg-[#E53935]/20 blur-[90px] rounded-full" />

            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">

              <img
                src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200"
                alt="Automotive engine and workshop"
                className="w-full h-[380px] sm:h-[480px] object-cover"
              />

              {/* IMAGE OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              {/* IMAGE TEXT */}
              <div className="absolute bottom-0 left-0 p-7 sm:p-9">

                <span className="text-[#F5A623] text-xs font-bold tracking-widest">
                  PERFORMANCE & PROTECTION
                </span>

                <h3 className="text-2xl sm:text-3xl font-extrabold mt-3">
                  The Right Oil.
                  <br />
                  For Every Engine.
                </h3>

              </div>

            </div>

            {/* FLOATING CARD */}
            <div className="absolute -bottom-6 -left-3 sm:-left-8 bg-white text-[#20252D] rounded-2xl shadow-xl p-4 sm:p-5 flex items-center gap-4">

              <div className="w-12 h-12 rounded-xl bg-[#FFF1E5] flex items-center justify-center shrink-0">
                <ShieldCheck className="text-[#E53935]" size={26} />
              </div>

              <div>
                <p className="font-extrabold text-sm">
                  Engine Protection
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Performance you can trust
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default HeroSection;
