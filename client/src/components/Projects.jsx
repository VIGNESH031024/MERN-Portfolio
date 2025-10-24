import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const cardWidth = 384 + 128; // Card width + gap

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/projects')
      .then(res => setProjects(res.data))
      .catch(err => console.log(err));
  }, []);

  // Check scroll position
  const checkScroll = () => {
    const el = scrollRef.current;
    if (el) {
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft + el.offsetWidth < el.scrollWidth);
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -cardWidth,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: cardWidth,
        behavior: 'smooth',
      });
    }
  };

  // Ensure arrows are correct after render and projects load
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // Initial check after a short delay to ensure container width is correct
    const timeout = setTimeout(checkScroll, 100);

    // Listen to scroll
    el.addEventListener('scroll', checkScroll);

    return () => {
      el.removeEventListener('scroll', checkScroll);
      clearTimeout(timeout);
    };
  }, [projects]);

  return (
    <section id="projects" className="py-20 bg-gray-800 text-white relative">
      <div className="max-w-6xl mx-auto relative">
        <h2 className="text-4xl font-bold text-cyan-400 mb-10 text-center">Projects</h2>

        {/* Scroll container */}
        <div
          className="flex items-stretch overflow-x-auto gap-[5rem] scroll-smooth scrollbar-hide hover:scrollbar-auto pb-8"
          ref={scrollRef}
        >
          {projects.map(project => (
            <div
              key={project._id}
              className="relative group bg-gray-900 rounded-2xl shadow-lg flex-shrink-0 w-96 flex flex-col overflow-hidden"
            >
              {project.image && (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-47 object-cover"
                />
              )}

              {/* Overlay */}
              <div className="absolute top-0 left-0 w-full h-[70%] bg-black bg-opacity-80 -translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 flex items-center justify-center p-4 text-gray-200 text-center">
                <p>{project.description}</p>
              </div>

              {/* Bottom section */}
              <div className="p-4 mt-48 flex flex-col">
                <h3 className="text-xl font-semibold text-cyan-400">{project.title}</h3>

                {project.skillsUsed && project.skillsUsed.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.skillsUsed.map((skill, idx) => (
                      <span
                        key={idx}
                        className="bg-cyan-500 text-gray-900 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-4 flex gap-3">
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-cyan-500 transition-colors duration-300 font-semibold text-sm"
                    >
                      GitHub Repo
                    </a>
                  )}
                  {project.liveDemo && (
                    <a
                      href={project.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-green-500 transition-colors duration-300 font-semibold text-sm"
                    >
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Left Arrow */}
        {canScrollLeft && (
          <button
            onClick={scrollLeft}
            className="absolute left-[-1.5rem] top-1/2 transform -translate-y-1/2 z-50 bg-cyan-500 bg-opacity-50 text-white p-4 rounded-full shadow-lg hover:bg-opacity-80 transition-colors duration-300"
          >
            <FaArrowLeft size={20} />
          </button>
        )}

        {/* Right Arrow */}
        {canScrollRight && (
          <button
            onClick={scrollRight}
            className="absolute right-[-1.5rem] top-1/2 transform -translate-y-1/2 z-50 bg-cyan-500 bg-opacity-50 text-white p-4 rounded-full shadow-lg hover:bg-opacity-80 transition-colors duration-300"
          >
            <FaArrowRight size={20} />
          </button>
        )}
      </div>
    </section>
  );
};

export default Projects;
