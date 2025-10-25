import React, { useState } from "react";
import HeroForm from "./HeroForm";
import AboutForm from "./AboutForm";
import SkillsForm from "./SkillsForm";
import ProjectsForm from "./ProjectsForm";
import CertificationsForm from "./CertificationsForm";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("hero");

  const renderTab = () => {
    switch (activeTab) {
      case "hero":
        return <HeroForm />;
      case "about":
        return <AboutForm />;
      case "skills":
        return <SkillsForm />;
      case "projects":
        return <ProjectsForm />;
      case "certifications":
        return <CertificationsForm />;
      default:
        return <HeroForm />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white py-10 px-6 pt-32">
      <h1 className="text-4xl font-bold text-cyan-400 mb-8 text-center">
        Admin Dashboard
      </h1>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-8 flex-wrap">
        {["hero", "about", "skills", "projects", "certifications"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded font-semibold transition-colors ${
              activeTab === tab
                ? "bg-cyan-500 text-gray-900"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Active Form */}
      <div>{renderTab()}</div>
    </div>
  );
};

export default AdminDashboard;
