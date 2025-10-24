import React from 'react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-black bg-opacity-80 backdrop-blur-md z-50">
      <nav className="flex justify-between items-center max-w-6xl mx-auto py-4 px-6">
        <h1 className="text-xl font-bold text-cyan-400">VS</h1>
        <ul className="flex gap-6 text-gray-300">
          {['Home', 'About', 'Projects', 'Skills', 'Contact'].map((item) => (
            <li key={item} className="hover:text-cyan-400 cursor-pointer transition">
              {item}
            </li>

          ))}
          
        </ul>
      </nav>
    </header>
  );
};

export default Header;
