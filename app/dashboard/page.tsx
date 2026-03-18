"use client";

import { useEffect, useState } from "react";
import { getProjects } from "../../services/project.service";
import { Project } from "../../types/project";
import { createProject } from "../../services/project.service";

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectName, setProjectName] = useState("");

  const handleCreateProject = async () => {
    if (!projectName) return;

    try {
      const project = await createProject(projectName);

      setProjects([...projects, project]);
      setProjectName("");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>

        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>

      {/* Create Project Card */}
      <div className="bg-gray-900 border border-gray-700 p-6 rounded-xl mb-8">
        <h2 className="text-lg font-semibold mb-4 text-white">
          Create New Project
        </h2>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Project name"
            className="flex-1 p-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />

          <button
            onClick={handleCreateProject}
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-lg transition"
          >
            + New Project
          </button>
        </div>
      </div>

      {/* Projects Section */}
      <h2 className="text-xl font-semibold mb-4 text-white">Projects</h2>

      {projects.length === 0 ? (
        <p className="text-gray-400">
          No projects yet. Create your first project.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-gray-900 border border-gray-700 p-5 rounded-xl cursor-pointer hover:border-blue-500 hover:shadow-lg transition"
              onClick={() => {
                window.location.href = `/projects/${project.id}`;
              }}
            >
              <h3 className="text-lg font-semibold text-white">
                {project.name}
              </h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
