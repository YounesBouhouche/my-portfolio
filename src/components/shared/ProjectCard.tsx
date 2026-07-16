import { useNavigate } from "@tanstack/react-router";
import { useRef } from "react";
import type { Project } from "../../types/Project";
import { NodePipeline } from "./NodePipeline";
import { useAppContext } from "../../context/AppContext";
import "./ProjectCard.css";

// Helper to map technologies to generic icons (SVG strings or simple JSX)
const getTechIcon = (tech: string) => {
  const t = tech.toLowerCase();
  if (t.includes("react")) return <span className="font-bold text-blue-500">Re</span>;
  if (t.includes("kotlin") || t.includes("android")) return <span className="font-bold text-green-600">Kt</span>;
  if (t.includes("tailwind")) return <span className="font-bold text-teal-400">Tw</span>;
  if (t.includes("laravel") || t.includes("php")) return <span className="font-bold text-red-500">La</span>;
  // Fallback generic code icon
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
    </svg>
  );
};

export default function ProjectCard({ project }: { project: Project }) {
  const navigate = useNavigate();
  const { startCardTransition } = useAppContext();
  const cardRef = useRef<HTMLDivElement>(null);
  
  const upcoming = !project.releaseDate || new Date(project.releaseDate) > new Date();

  // Handle Magnetic 3D Hover
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Calculate mouse position relative to card center (-0.5 to +0.5)
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // Magnetic pull (translate) and 3D tilt (rotate)
    const magnetX = x * 10; 
    const magnetY = y * 10;
    const rotateX = -y * 8; 
    const rotateY = x * 8;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translate(${magnetX}px, ${magnetY}px)`;
    card.style.transition = "none";
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) translate(0, 0)`;
    card.style.transition = "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)";
  };

  const handleCardClick = () => {
    if (!upcoming) {
      if (cardRef.current) {
        cardRef.current.classList.add("card-exit");
      }
      startCardTransition(project.route);
      
      // Wait for exit animation
      setTimeout(() => {
        navigate({
          to: "/projects/$project",
          params: { project: project.route },
        });
      }, 200);
    }
  };

  // Convert tech stack to nodes (max 4 to fit nicely)
  const nodes = (project.technologies || []).slice(0, 4).map(tech => ({
    icon: getTechIcon(tech),
    label: tech
  }));

  return (
    <div className="project-card-wrapper" style={{ perspective: "1000px" }}>
      <div
        ref={cardRef}
        className={`project-card node-card group ${upcoming ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleCardClick}
      >
        {/* Dot grid background */}
        <div className="absolute inset-0 card-dot-grid opacity-20 pointer-events-none"></div>

        {/* Header */}
        <div className="flex justify-between items-start mb-6 relative z-10">
          <div>
            <h3 className="font-heading text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors">
              {project.name}
            </h3>
            <div className="font-mono text-[0.65rem] text-gray-500 uppercase tracking-widest">
              {project.category}
            </div>
          </div>
          <div className="font-mono text-[0.6rem] text-gray-600 border border-gray-800 px-2 py-1 bg-[#111113]">
            {project.technologies?.length || 0} ITEMS
          </div>
        </div>

        {/* Node Pipeline Visualization */}
        <div className="flex-grow flex items-center justify-center min-h-[140px] border border-dashed border-gray-800/50 rounded-sm bg-[#0a0a0a]/50 relative z-10 overflow-hidden">
          {nodes.length > 0 ? (
            <NodePipeline nodes={nodes} />
          ) : (
            <div className="text-gray-600 font-mono text-xs">NO NODES</div>
          )}
        </div>

        {/* Footer info (GitHub API data if available) */}
        {!project.statsUnavailable && project.stargazers_count !== undefined && (
          <div className="mt-4 pt-4 border-t border-gray-800/50 flex justify-between items-center relative z-10 font-mono text-[0.65rem] text-gray-500">
            <div className="flex items-center gap-1.5">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
              </svg>
              {project.stargazers_count}
            </div>
            {project.primary_language && (
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                {project.primary_language}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
