import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="w-full bg-[#0E1626] text-gray-300 pt-6 pb-6"
    >
      {/* Top gradient line */}
      <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent mb-4" />

      <div className="flex items-center justify-center">
        <p className="text-sm flex items-center gap-10 tracking-wide">

          <span className="text-gray-400">
            © {new Date().getFullYear()} All Rights Reserved
          </span>

          <span className="text-cyan-400">•</span>

          <span className="text-gray-400 hover:text-white transition duration-300 cursor-pointer">
            Designed & Developed by Vignesh VS
          </span>

        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
