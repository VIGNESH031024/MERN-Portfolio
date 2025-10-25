import React, { useEffect, useState } from "react";
import adminApi from "../api/adminApi";

const SkillsForm = () => {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({ name: "", logo: null });
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch all skills
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await adminApi.get("/skills");
        setSkills(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSkills();
  }, []);

  // Handle new skill input change
  const handleChange = (e) => {
    setNewSkill({ ...newSkill, name: e.target.value });
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewSkill({ ...newSkill, logo: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  // Add new skill
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", newSkill.name);
      if (newSkill.logo) formData.append("logo", newSkill.logo);

      const res = await adminApi.post("/skills", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSkills([...skills, res.data]);
      setNewSkill({ name: "", logo: null });
      setPreview(null);
      setMessage("Skill added successfully!");
    } catch (err) {
      console.log(err);
      setMessage("Failed to add skill.");
    }
  };

  // Delete skill
  const handleDelete = async (id) => {
    try {
      await adminApi.delete(`/skills/${id}`);
      setSkills(skills.filter((skill) => skill._id !== id));
      setMessage("Skill deleted successfully!");
    } catch (err) {
      console.log(err);
      setMessage("Failed to delete skill.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-cyan-400 mb-6">Manage Skills</h2>
      {message && <p className="mb-4 text-green-400">{message}</p>}

      {/* Add New Skill */}
      <form onSubmit={handleAdd} className="flex flex-col gap-4 mb-8">
        <input
          type="text"
          placeholder="Skill Name"
          value={newSkill.name}
          onChange={handleChange}
          className="p-2 rounded bg-gray-700 text-white"
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
            className="w-20 h-20 object-contain rounded-full shadow-lg"
          />
        )}
        <button
          type="submit"
          className="bg-cyan-500 hover:bg-cyan-600 py-2 rounded font-semibold transition-colors"
        >
          Add Skill
        </button>
      </form>

      {/* List of Skills */}
      <div className="grid grid-cols-3 gap-6">
        {skills.map((skill) => (
          <div
            key={skill._id}
            className="flex flex-col items-center justify-center text-center bg-gray-800 p-4 rounded-lg shadow-lg"
          >
            {skill.logo && (
              <img
                src={skill.logo}
                alt={skill.name}
                className="w-16 h-16 object-contain rounded-full mb-2"
              />
            )}
            <p className="text-white font-semibold">{skill.name}</p>
            <button
              onClick={() => handleDelete(skill._id)}
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

export default SkillsForm;
