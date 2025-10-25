import React, { useEffect, useState } from "react";
import adminApi from "../api/adminApi";

const CertificationsForm = () => {
  const [certifications, setCertifications] = useState([]);
  const [newCert, setNewCert] = useState({
    name: "",
    image: null,
    issuer: "",
    date: "",
    description: "",
  });
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch all certifications
  useEffect(() => {
    const fetchCerts = async () => {
      try {
        const res = await adminApi.get("/certifications");
        setCertifications(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCerts();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCert({ ...newCert, [name]: value });
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewCert({ ...newCert, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  // Add new certification
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", newCert.name);
      formData.append("issuer", newCert.issuer);
      formData.append("date", newCert.date);
      formData.append("description", newCert.description);
      if (newCert.image) formData.append("image", newCert.image);

      const res = await adminApi.post("/certifications", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setCertifications([...certifications, res.data]);
      setNewCert({ name: "", image: null, issuer: "", date: "", description: "" });
      setPreview(null);
      setMessage("Certification added successfully!");
    } catch (err) {
      console.log(err);
      setMessage("Failed to add certification.");
    }
  };

  // Delete certification
  const handleDelete = async (id) => {
    try {
      await adminApi.delete(`/certifications/${id}`);
      setCertifications(certifications.filter((c) => c._id !== id));
      setMessage("Certification deleted successfully!");
    } catch (err) {
      console.log(err);
      setMessage("Failed to delete certification.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-cyan-400 mb-6">Manage Certifications</h2>
      {message && <p className="mb-4 text-green-400">{message}</p>}

      {/* Add New Certification */}
      <form onSubmit={handleAdd} className="flex flex-col gap-4 mb-8">
        <input
          type="text"
          placeholder="Certification Name"
          name="name"
          value={newCert.name}
          onChange={handleChange}
          className="p-2 rounded bg-gray-700 text-white"
          required
        />
        <input
          type="text"
          placeholder="Issuer"
          name="issuer"
          value={newCert.issuer}
          onChange={handleChange}
          className="p-2 rounded bg-gray-700 text-white"
        />
        <input
          type="text"
          placeholder="Date (e.g., Jan 2023)"
          name="date"
          value={newCert.date}
          onChange={handleChange}
          className="p-2 rounded bg-gray-700 text-white"
        />
        <textarea
          placeholder="Description"
          name="description"
          value={newCert.description}
          onChange={handleChange}
          className="p-2 rounded bg-gray-700 text-white"
          rows={4}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="text-white"
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="w-40 h-40 object-cover rounded-lg shadow-lg mt-2"
          />
        )}
        <button
          type="submit"
          className="bg-cyan-500 hover:bg-cyan-600 py-2 rounded font-semibold transition-colors"
        >
          Add Certification
        </button>
      </form>

      {/* List of Certifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certifications.map((cert) => (
          <div
            key={cert._id}
            className="flex flex-col items-center justify-center text-center bg-gray-800 p-4 rounded-lg shadow-lg"
          >
            {cert.image && (
              <img
                src={cert.image}
                alt={cert.name}
                className="w-48 h-48 object-cover rounded-lg mb-2"
              />
            )}
            <p className="text-white font-semibold">{cert.name}</p>
            {cert.issuer && <p className="text-gray-400 text-sm">{cert.issuer}</p>}
            {cert.date && <p className="text-gray-400 text-sm">{cert.date}</p>}
            {cert.description && (
              <p className="text-gray-300 text-sm mt-1">{cert.description}</p>
            )}
            <button
              onClick={() => handleDelete(cert._id)}
              className="mt-2 bg-red-500 hover:bg-red-600 py-1 px-3 rounded text-sm transition-colors"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CertificationsForm;
