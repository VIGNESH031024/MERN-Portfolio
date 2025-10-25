import React, { useEffect, useState, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import adminApi from "../api/adminApi";

const ProjectsForm = () => {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    _id: null,
    title: "",
    description: "",
    image: null,
    skillsUsed: "",
    from: "",
    to: "",
    githubLink: "",
    liveLink: "",
  });
  const [preview, setPreview] = useState(null);
  const [modalImage, setModalImage] = useState(null); // 👈 new state for image popup
  const formRef = useRef(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await adminApi.get("/projects");
        setProjects(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const uploadData = new FormData();
      for (let key in formData) {
        if (formData[key]) {
          if (key === "skillsUsed") {
            uploadData.append(
              key,
              JSON.stringify(formData[key].split(",").map((s) => s.trim()))
            );
          } else {
            uploadData.append(key, formData[key]);
          }
        }
      }

      let res;
      if (formData._id) {
        res = await adminApi.put(`/projects/${formData._id}`, uploadData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setProjects((prev) =>
          prev.map((p) => (p._id === res.data._id ? res.data : p))
        );
        toast.success("✅ Project updated successfully!");
      } else {
        res = await adminApi.post("/projects", uploadData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setProjects([...projects, res.data]);
        toast.success("🎉 Project added successfully!");
      }

      setFormData({
        _id: null,
        title: "",
        description: "",
        image: null,
        skillsUsed: "",
        from: "",
        to: "",
        githubLink: "",
        liveLink: "",
      });
      setPreview(null);
    } catch (err) {
      console.error(err);
      toast.error("❌ Operation failed! Try again.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await adminApi.delete(`/projects/${id}`);
      setProjects(projects.filter((p) => p._id !== id));
      toast.info("🗑️ Project deleted!");
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to delete project.");
    }
  };

  const handleEdit = (project) => {
    setFormData({
      _id: project._id,
      title: project.title,
      description: project.description,
      image: null,
      skillsUsed: project.skillsUsed ? project.skillsUsed.join(", ") : "",
      from: project.from || "",
      to: project.to || "",
      githubLink: project.githubLink || "",
      liveLink: project.liveLink || "",
    });
    setPreview(project.image || null);
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar />
      <h2 className="text-3xl font-bold text-cyan-400 mb-6">Manage Projects</h2>

      {/* Project Form */}
      <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4 mb-8">
        <input
          type="text"
          placeholder="Project Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="p-2 rounded bg-gray-700 text-white"
          required
        />
        <textarea
          placeholder="Project Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="p-2 rounded bg-gray-700 text-white"
          rows={4}
          required
        />
        <input
          type="text"
          placeholder="Skills Used (comma separated)"
          name="skillsUsed"
          value={formData.skillsUsed}
          onChange={handleChange}
          className="p-2 rounded bg-gray-700 text-white"
        />
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="From (e.g., Jan 2023)"
            name="from"
            value={formData.from}
            onChange={handleChange}
            className="p-2 rounded bg-gray-700 text-white flex-1"
          />
          <input
            type="text"
            placeholder="To (e.g., Mar 2023)"
            name="to"
            value={formData.to}
            onChange={handleChange}
            className="p-2 rounded bg-gray-700 text-white flex-1"
          />
        </div>
        <input
          type="url"
          placeholder="GitHub Link"
          name="githubLink"
          value={formData.githubLink}
          onChange={handleChange}
          className="p-2 rounded bg-gray-700 text-white"
        />
        <input
          type="url"
          placeholder="Live Link"
          name="liveLink"
          value={formData.liveLink}
          onChange={handleChange}
          className="p-2 rounded bg-gray-700 text-white"
        />
        <input type="file" accept="image/*" onChange={handleImageChange} className="text-white" />
        {preview && (
          <img src={preview} alt="Preview" className="w-40 h-40 object-cover rounded-lg shadow-lg mt-2" />
        )}

        <button
          type="submit"
          className="bg-cyan-500 hover:bg-cyan-600 py-2 rounded font-semibold transition-colors"
        >
          {formData._id ? "Update Project" : "Add Project"}
        </button>
      </form>

      {/* Project List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project._id} className="bg-gray-800 p-4 rounded-lg shadow-lg text-center">
            {project.image && (
              <img
                src={project.image}
                alt={project.title}
                onClick={() => setModalImage(project.image)} // 👈 open popup
                className="w-full h-48 object-cover rounded-lg mb-2 cursor-pointer hover:opacity-80 transition-opacity"
              />
            )}
            <h3 className="text-white font-semibold">{project.title}</h3>
            <p className="text-gray-400 text-sm">{project.skillsUsed?.join(", ")}</p>
            <p className="text-gray-400 text-sm">
              {project.from} - {project.to}
            </p>
            <div className="flex justify-center gap-2 mt-3">
              <button
                onClick={() => handleEdit(project)}
                className="bg-yellow-500 hover:bg-yellow-600 px-3 py-1 rounded text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(project._id)}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Full Image Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setModalImage(null)} // close on click
        >
          <img
            src={modalImage}
            alt="Full Preview"
            className="max-w-[90%] max-h-[90%] rounded-lg shadow-2xl"
          />
        </div>
      )}
    </div>
  );
};

export default ProjectsForm;
