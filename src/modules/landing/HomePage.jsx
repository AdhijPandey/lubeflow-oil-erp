
import React from "react";

import LandingNavbar from "../../components/layout/LandingNavbar";
import HeroSection from "./sections/HeroSection";

const HomePage = () => {

  // NAVIGATION ITEMS
  const navItems = [
    { name: "Home", link: "#home" },
    { name: "Products", link: "#products" },
    { name: "About Us", link: "#about" },
    { name: "Features", link: "#features" },
    { name: "Contact", link: "#contact" },
  ];

  return (
    <div className="min-h-screen font-sans">

      {/* NAVBAR */}
      <LandingNavbar navItems={navItems} />

      {/* MAIN CONTENT */}
      <main>
        <HeroSection />
      </main>

    </div>
  );
};

export default HomePage;
