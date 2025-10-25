import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaLinkedin } from "react-icons/fa";

const Contact = () => {
  const [contactInfo, setContactInfo] = useState({
    email: "",
    phone: "",
    address: "",
    linkedin: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/contact")
      .then((res) => setContactInfo(res.data))
      .catch((err) => console.error("Error fetching contact info:", err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/contact/sendMessage", formData);
      alert("Message sent successfully! I’ll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      alert("Error sending message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id ='contact' className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center py-16">
      <h1 className="text-5xl font-bold text-cyan-400 mb-12">Contact Me</h1>

      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 px-6">
        {/* Left: Contact Info */}
        <div className="space-y-6 flex flex-col justify-center">
          <div className="flex items-center gap-4">
            <FaEnvelope className="text-cyan-400 text-2xl" />
            <p className="text-lg">{contactInfo.email || "Loading..."}</p>
          </div>
          <div className="flex items-center gap-4">
            <FaPhoneAlt className="text-cyan-400 text-2xl" />
            <p className="text-lg">{contactInfo.phone || "Loading..."}</p>
          </div>
          <div className="flex items-center gap-4">
            <FaMapMarkerAlt className="text-cyan-400 text-2xl" />
            <p className="text-lg">{contactInfo.address || "Loading..."}</p>
          </div>
          {contactInfo.linkedin && (
            <div className="flex items-center gap-4">
              <FaLinkedin className="text-cyan-400 text-2xl" />
              <a
                href={contactInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg hover:text-cyan-300 transition"
              >
                LinkedIn Profile
              </a>
            </div>
          )}
        </div>

        {/* Right: Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full space-y-6 hover:shadow-cyan-500/30 transition duration-300"
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-cyan-400 outline-none"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-cyan-400 outline-none"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-cyan-400 outline-none resize-none"
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="bg-cyan-500 hover:bg-cyan-600 text-white py-3 px-8 rounded-lg font-semibold transition duration-300 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
