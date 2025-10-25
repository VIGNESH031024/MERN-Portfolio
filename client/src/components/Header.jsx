import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll to an element by id
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleHomeClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToSection("hero"), 100);
    } else {
      scrollToSection("hero");
    }
  };

  const handleProjectsClick = () => {
    navigate("/projects");
  };

  const handleCertificationsClick = () => {
    navigate("/certifications");
  };

  const handleContactClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToSection("contact"), 100);
    } else {
      scrollToSection("contact");
    }
  };

  const navLinks = [
    { name: "Home", onClick: handleHomeClick },
    { name: "Projects", onClick: handleProjectsClick },
    { name: "Certifications", onClick: handleCertificationsClick },
    { name: "Contact", onClick: handleContactClick },
  ];

  return (
    <header className="fixed w-full bg-gray-900 text-white shadow-lg z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <div className="text-2xl font-bold text-cyan-400">
          <Link to="/">VS</Link>
        </div>
        <nav className="flex gap-6 text-lg">
          {navLinks.map((link) => (
            <span
              key={link.name}
              onClick={link.onClick}
              className={`cursor-pointer transition-colors ${
                (link.name === "Home" && location.pathname === "/") ||
                (link.name === "Projects" && location.pathname === "/projects") ||
                (link.name === "Certifications" &&
                  location.pathname === "/certifications")
                  ? "text-cyan-400 font-semibold"
                  : "text-white hover:text-cyan-400"
              }`}
            >
              {link.name}
            </span>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
