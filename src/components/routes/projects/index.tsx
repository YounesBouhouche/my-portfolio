import { Outlet } from "@tanstack/react-router";
import useQueryFetch from "../../../hooks/useFetch";
import type { Project } from "../../../types/Project";
import LoadingContainer from "../../shared/LoadingContainer";
import "../../shared/ProjectCard.css";
import ProjectCard from "../../shared/ProjectCard";

import { useState, useMemo } from "react";

export default function Projects() {
  const projects = useQueryFetch<Project[]>("/db/projects.json", "projects-v2");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Web App", "Mobile App"];

  // Filter logic
  const filteredProjects = useMemo(() => {
    if (!projects[0]) return [];

    return projects[0].filter((project) => {
      // 1. Search Filter
      const matchesSearch =
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies?.some((tech) =>
          tech.toLowerCase().includes(searchTerm.toLowerCase())
        );

      // 2. Category Filter
      const matchesCategory =
        selectedCategory === "All" || project.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [projects, searchTerm, selectedCategory]);

  return (
    <>
      <div className="min-h-screen bg-[#09090b] text-white pt-20">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter">
              <span className="text-white">Featured </span>
              <span className="text-primary">Projects</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              A collection of my recent work, side projects, and experiments.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto mb-16 space-y-8">
            {/* Search Bar */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-500 group-focus-within:text-primary transition-colors"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search projects by name or technology..."
                className="w-full bg-[#121214] border border-white/10 text-white pl-12 pr-4 py-4 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all placeholder-gray-600 font-mono text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 text-sm font-mono tracking-wide border transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-primary/10 border-primary text-primary"
                      : "bg-[#121214] border-white/10 text-gray-400 hover:border-white/30 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <LoadingContainer data={projects}>
            {() => (
              <>
                {filteredProjects.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project) => (
                      <ProjectCard
                        key={project.route || project.id}
                        project={project}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <div className="text-gray-500 font-mono mb-4 text-4xl">
                      ¯\_(ツ)_/¯
                    </div>
                    <p className="text-xl text-gray-400 font-mono">
                      No projects found matching your criteria.
                    </p>
                    <button
                      onClick={() => {
                        setSearchTerm("");
                        setSelectedCategory("All");
                      }}
                      className="mt-6 text-primary hover:underline font-mono text-sm"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </>
            )}
          </LoadingContainer>
        </div>
      </div>

      <Outlet />
    </>
  );
}
