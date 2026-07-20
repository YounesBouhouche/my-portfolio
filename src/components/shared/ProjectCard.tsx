import { useNavigate } from "@tanstack/react-router";
import { useRef } from "react";
import type { Project } from "../../types/Project";
import { useAppContext } from "../../context/AppContext";
import "./ProjectCard.css";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 1 }: ProjectCardProps) {
  const navigate = useNavigate();
  const { startCardTransition } = useAppContext();
  const cardRef = useRef<HTMLDivElement>(null);

  const upcoming = !project.releaseDate || new Date(project.releaseDate) > new Date();
  const indexLabel = String(index).padStart(2, "0");
  const technologies = project.technologies || [];
  const description = project.overrideDescription || project.description;

  const handleCardClick = () => {
    if (upcoming) return;

    if (cardRef.current) {
      cardRef.current.classList.add("card-exit");
    }
    startCardTransition(project.id.toString());

    window.setTimeout(() => {
      navigate({
        to: "/projects/$project",
        params: { project: project.id.toString() },
      });
    }, 200);
  };

  return (
    <div
      ref={cardRef}
      className={`spc-root ${upcoming ? "spc-root--upcoming" : ""}`}
      onClick={handleCardClick}
      role={upcoming ? undefined : "button"}
      tabIndex={upcoming ? undefined : 0}
      onKeyDown={(e) => {
        if (!upcoming && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          handleCardClick();
        }
      }}
    >
      <img
        src={project.thumbnail}
        alt={project.name}
        className="spc-image"
        draggable={false}
      />

      <div className="spc-scanline" />
      <div className="spc-overlay" />

      <div className="spc-index">{indexLabel}</div>

      {upcoming && <div className="spc-upcoming-badge">UPCOMING</div>}

      <div className="spc-corner spc-corner-tl" />
      <div className="spc-corner spc-corner-br" />

      <div className="spc-content">
        <div className="spc-accent-rule" />

        <div className="spc-meta">
          <span className="spc-category">{project.category ?? "Project"}</span>
          {project.releaseDate && !upcoming && (
            <>
              <span className="text-gray-700 font-mono text-[0.5rem]">—</span>
              <span className="spc-year">{new Date(project.releaseDate).getFullYear()}</span>
            </>
          )}
        </div>

        <h3 className="spc-title">{project.name}</h3>

        <p className="spc-description">{description}</p>

        {technologies.length > 0 && (
          <div className="spc-chips">
            {technologies.slice(0, 3).map((tech) => (
              <span key={tech} className="tech-chip">{tech}</span>
            ))}
            {technologies.length > 3 && (
              <span className="tech-chip">+{technologies.length - 3}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
