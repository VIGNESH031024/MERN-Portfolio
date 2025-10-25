import React, { useEffect, useState } from "react";
import adminApi from "../api/adminApi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AboutForm = () => {
  const [about, setAbout] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [preview, setPreview] = useState("");

  // Fetch current about data
  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await adminApi.get("/about");
        setAbout(res.data);
        setPreview(res.data.image);
      } catch (err) {
        console.error(err);
        toast.error("❌ Failed to fetch About section!");
      }
    };
    fetchAbout();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAbout({ ...about, [name]: value });
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAbout({ ...about, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", about.title);
      formData.append("description", about.description);
      if (about.image instanceof File) {
        formData.append("image", about.image);
      }

      await adminApi.put("/about", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("✅ About section updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to update About section!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar />

      <h2 className="text-3xl font-bold text-cyan-400 mb-6">Edit About Section</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="title"
          value={about.title}
          onChange={handleChange}
          placeholder="Title"
          className="p-2 rounded bg-gray-700 text-white"
          required
        />
        <textarea
          name="description"
          value={about.description}
          onChange={handleChange}
          placeholder="Description"
          className="p-2 rounded bg-gray-700 text-white"
          rows={6}
          required
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
            className="w-80 h-80 object-cover rounded-2xl shadow-lg mt-2"
          />
        )}

        <button
          type="submit"
          className="bg-cyan-500 hover:bg-cyan-600 py-2 rounded font-semibold transition-colors"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default AboutForm;
