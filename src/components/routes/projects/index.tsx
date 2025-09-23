import { Link, Outlet } from '@tanstack/react-router';
import useQueryFetch from '../../../hooks/useFetch';
import type { Project } from '../../../types/Project';
import LoadingContainer from '../../shared/LoadingContainer';
import './Projects.css';

export default function Projects() {
  const projects = useQueryFetch<Project[]>('/db/projects.json', 'projects');
  const getBackground = (category: string) => {
    switch (category.toLowerCase()) {
      case 'mobile app':
        return '#34D399';
      case 'web':
      case 'web app':
        return '#60A5FA';
      default:
        return '#9CA3AF';
    }
  }

  return (
    <>
      <div className="projects-page pt-20 min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
        {/* Hero Section */}
        <div className="projects-hero relative pt-24 pb-16">
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
                  <div key={index} className="project-card group relative">
                    <div className="project-card-inner bg-gray-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-primary/30 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-primary/20">
                      <div className="project-image-container relative h-48 overflow-hidden">
                        <img 
                          src={project.heroImage} 
                          alt={project.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-2 text-gray-900 text-sm font-medium rounded-full" style={{ backgroundColor: getBackground(project.category) }}>
                            {project.category}
                          </span>
                        </div>
                      </div>

                      <div className="project-content p-6">
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
                          {project.name}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.technologies?.slice(0, 3).map((tech, techIndex) => (
                            <span 
                              key={techIndex}
                              className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-md border border-gray-600/50"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies && project.technologies.length > 3 && (
                            <span className="px-2 py-1 bg-gray-700/50 text-gray-400 text-xs rounded-md border border-gray-600/50">
                              +{project.technologies.length - 3} more
                            </span>
                          )}
                        </div>

                        <div className="flex gap-3">
                          <Link 
                            to="/projects/$project"
                            params={{ project: project.route }}
                            className="flex-1 px-4 py-2 bg-primary hover:bg-primary/80 text-black font-medium rounded-lg transition-all duration-300 text-center text-sm hover:transform hover:scale-105"
                          >
                            View Details
                          </Link>
                          {project.liveDemoLink && (
                            <a
                              href={project.liveDemoLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 text-sm hover:transform hover:scale-105"
                            >
                              Demo
                            </a>
                          )}
                          {project.githubLink && (
                            <a
                              href={project.githubLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-4 py-2 border border-gray-600 hover:border-gray-400 text-gray-300 hover:text-white font-medium rounded-lg transition-all duration-300 text-sm hover:transform hover:scale-105"
                            >
                              Code
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
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