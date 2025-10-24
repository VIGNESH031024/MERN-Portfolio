import React, { useEffect, useState } from "react";
import axios from "axios";

const CertificationsPage = () => {
  const [certifications, setCertifications] = useState([]);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/certifications")
      .then((res) => setCertifications(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10">
      <h1 className="text-5xl font-bold text-cyan-400 text-center mb-12">
        Certifications
      </h1>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12">
        {certifications.map((cert) => (
          <div
            key={cert._id}
            className="flex flex-col items-center justify-center text-center cursor-pointer"
            onClick={() => setModalImage(cert.image)}
          >
            {/* Bigger image */}
            <img
              src={cert.image}
              alt={cert.name}
              className="w-96 h-96 md:w-96 md:h-96 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
            />
            <p className="mt-4 text-lg text-gray-300 font-semibold">{cert.name}</p>
            {cert.issuer && (
              <p className="text-sm text-gray-400">{cert.issuer}</p>
            )}
            {cert.date && (
              <p className="text-sm text-gray-400">{cert.date}</p>
            )}
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setModalImage(null)}
        >
          <img
            src={modalImage}
            alt="Certification"
            className="max-w-[90%] max-h-[90%] rounded-lg shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};

export default CertificationsPage;
