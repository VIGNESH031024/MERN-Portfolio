import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import profilePlaceholder from "../assets/profile.jpg";
import "./Hero.css"
const Hero = () => {
  const [heroData, setHeroData] = useState({
    name: "",
    role: "",
    description: "",
    profileImage: "",
    socialLinks: { linkedin: "", github: "" },
  });

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/profile");
        if (res.data) setHeroData(res.data);
      } catch (err) {
        console.error("Error fetching hero data:", err);
      }
    };
    fetchHero();
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center bg-gradient-to-b from-gray-900 to-black px-6"
    >
      <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center md:justify-between gap-10">
        {/* Left: Text + Social Icons */}
        <div className="md:flex-1 flex flex-col items-center md:items-start space-y-6">
          <h1 className="text-5xl font-bold text-white whitespace-nowrap">
            Hi, I'm{" "}
            <span className="text-cyan-400 animate-pulse">{heroData.name}</span>
          </h1>

          <p className="text-gray-400 text-xl">{heroData.role}</p>
          <p className="text-gray-400">{heroData.description}</p>

          {/* Social Icons */}
          <div className="flex gap-4 mt-2">
            {heroData.socialLinks?.linkedin && (
              <a
                href={heroData.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 text-3xl hover:text-cyan-600 transition"
              >
                <FaLinkedin />
              </a>
            )}
            {heroData.socialLinks?.github && (
              <a
                href={heroData.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 text-3xl hover:text-cyan-600 transition"
              >
                <FaGithub />
              </a>
            )}
          </div>

          <button
            onClick={() =>
              document
                .getElementById("contact")
                .scrollIntoView({ behavior: "smooth" })
            }
            className="bg-cyan-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-cyan-500 transition mt-4"
          >
            Contact Me
          </button>
        </div>

        {/* Right: Profile Image */}
        <div className="md:flex-1 flex justify-center md:justify-end relative">
          {heroData.profileImage && (
            <div className="half-circle-border floating-img shadow-2xl p-0 rounded-full bg-white-900">
              <img
                src={heroData.profileImage || profilePlaceholder}
                alt="Profile"
                className="w-80 h-80 rounded-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
