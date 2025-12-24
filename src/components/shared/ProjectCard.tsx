import { useNavigate } from "@tanstack/react-router";
import type { Project } from "../../types/Project";
import "./ProjectCard.css";

export default function ProjectCard({ project }: { project: Project }) {
  const navigate = useNavigate();
  const upcoming =
    !project.releaseDate || new Date(project.releaseDate) > new Date();
  const categoryClass = project.category.toLowerCase().replace(" ", "-");

  const handleCardClick = () => {
    if (!upcoming) {
      navigate({
        to: "/projects/$project",
        params: { project: project.route },
      });
    }
  };

  return (
    <div
      className={
        "project-card group relative" +
        (upcoming ? " upcoming-project" : " cursor-pointer")
      }
      onClick={handleCardClick}
    >
      <div className="project-card-inner bg-gray-800/30 backdrop-blur-sm overflow-hidden border border-gray-700/50 hover:border-primary/30 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 flex flex-col h-full">
        <div className="project-image-container relative h-48 overflow-hidden shrink-0">
          <img
            src={project.heroImage}
            alt={project.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          <span className={"category-badge " + categoryClass}>
            {project.category}
          </span>
        </div>

        <div className="project-content p-6 flex flex-col flex-grow">
          <div className="flex-grow">
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">
              {project.name}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies?.slice(0, 3).map((tech, techIndex) => (
                <span key={techIndex} className="tech-chip">
                  {tech}
                </span>
              ))}
              {project.technologies && project.technologies.length > 3 && (
                <span className="px-2 py-1 bg-gray-700/50 text-gray-400 text-xs border border-gray-600/50">
                  +{project.technologies.length - 3} more
                </span>
              )}
            </div>
          </div>

          {!upcoming && (project.liveDemoLink || project.githubLink) && (
            <div className="flex gap-3 mt-auto pt-4 border-t border-white/5">
              {project.liveDemoLink && (
                <a
                  href={project.liveDemoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="terminal-button-link small flex-1 text-center whitespace-nowrap"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>Live Demo</span>
                </a>
              )}
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="terminal-button-link small flex-1 text-center whitespace-nowrap"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span>Code</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
