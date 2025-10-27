import { Link, Outlet } from '@tanstack/react-router';
import useQueryFetch from '../../../hooks/useFetch';
import type { Project } from '../../../types/Project';
import LoadingContainer from '../../shared/LoadingContainer';
import './Projects.css';
import '../../shared/ProjectCard.css';
import ProjectCard from '../../shared/ProjectCard';

export default function Projects() {
  const projects = useQueryFetch<Project[]>('/db/projects.json', 'projects');

  return (
    <>
      <div className="projects-page pt-20 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        {/* Hero Section */}
        <div className="projects-hero relative pt-40 pb-30">
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
            <h1 className="projects-title text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-blue-400 to-purple-500 bg-clip-text text-transparent">
              My Projects
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Explore my latest work featuring modern applications built with cutting-edge technologies
            </p>
          </div>
        </div>

        <div className="projects-content max-w-7xl mx-auto px-6 pb-20">
          <LoadingContainer data={projects}>
            {(projectsData) => (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projectsData.map((project, index) => (
                  <ProjectCard
                    key={index}
                    project={project}
                  />
                ))}
              </div>
            )}
          </LoadingContainer>
        </div>
      </div>
      
      {/* Outlet for child routes */}
      <Outlet />
    </>
  );
}