import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Hero.css'; // we'll add custom CSS here
import profile from '../assets/profile.jpg';

const Hero = () => {
    const [heroData, setHeroData] = useState({
        name: '',
        role: '',
        description: '',
        profileImage: ''
    });

    useEffect(() => {
        axios.get('http://localhost:5000/api/profile') // your backend API
            .then(res => setHeroData(res.data))
            .catch(err => console.log(err));
    }, []);

    return (
        <section id="hero" className="min-h-screen flex items-center bg-gradient-to-b from-gray-900 to-black px-6">
  <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center md:justify-between gap-10">
    
    {/* Left side: Text */}
    <div className="text-center md:text-left md:flex-1 space-y-6 hero-text">
      <h1 className="text-5xl font-bold text-white">
        Hi, I'm <span className="text-cyan-400 blink-text">{heroData.name}</span>
      </h1>
      <p className="text-gray-400 text-xl">{heroData.role}</p>
      <p className="text-gray-400">{heroData.description}</p>
      <button
        onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
        className="bg-cyan-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-cyan-500 transition mt-4"
      >
        Contact Me
      </button>
    </div>

    {/* Right side: Profile Image */}
    <div className="md:flex-1 flex justify-center md:justify-end relative">
      {heroData.profileImage && (
        <div className="half-circle-border floating-img shadow-2xl">
          <img
            src={profile ||heroData.profileImage}
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
