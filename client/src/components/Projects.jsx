import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import adminApi from "../api/adminApi";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    adminApi
      .get("/projects")
      .then((res) => setProjects(res.data))
      .catch((err) => console.log(err));
  }, []);

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const fadeInScale = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <section id="projects" className="py-20 bg-gray-800 text-white relative overflow-hidden">
  <div className="max-w-6xl mx-auto px-4 sm:px-6">
    <motion.h2
      className="text-4xl font-bold text-cyan-400 mb-10 text-center"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.3 }}
    >
      Projects
    </motion.h2>

    {/* Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-[72px]">
      {projects.map((project, index) => (
        <motion.div
          key={project._id}
          className="relative group bg-gray-900 rounded-2xl shadow-lg overflow-hidden"
          variants={fadeInScale}
          initial="hidden"
          whileInView="visible"
          transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Project Image */}
          {project.image && (
            <div className="relative">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-auto sm:h-[250px] md:h-[312px] object-cover cursor-pointer transition-transform duration-500 hover:scale-105"
                onClick={() => setSelectedImage(project.image)}
              />
              <div className="absolute top-0 left-0 w-full h-[75%] bg-black bg-opacity-80 -translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex items-center justify-center p-3 sm:p-4 text-gray-200 text-center text-sm sm:text-base">
                <p>{project.description}</p>
              </div>
            </div>
          )}

          {/* Bottom Section */}
          <div className="p-3 sm:p-4 flex flex-col">
            <h3 className="text-xl font-semibold text-cyan-400">{project.title}</h3>

            {project.skillsUsed?.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {project.skillsUsed.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-cyan-500 text-gray-900 px-2 sm:px-3 py-1 rounded-full text-sm sm:text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-4 flex gap-2 sm:gap-3 flex-wrap">
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gray-700 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-cyan-500 transition-colors duration-300 font-semibold text-sm sm:text-xs"
                >
                  GitHub Repo
                </a>
              )}
              {project.liveDemo && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gray-700 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-green-500 transition-colors duration-300 font-semibold text-sm sm:text-xs"
                >
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>

    {/* Popup Modal */}
    {selectedImage && (
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[9999] p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setSelectedImage(null)}
      >
        <motion.img
          src={selectedImage}
          alt="Full project"
          className="max-w-full sm:max-w-[90%] max-h-[80vh] sm:max-h-[70vh] rounded-lg shadow-2xl border-4 border-cyan-400 object-contain"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </motion.div>
    )}
  </div>
</section>

  );
};

export default Projects;
