import { Link } from "@tanstack/react-router";
import "./LargeProjectCard.css";

export default function LargeProjectCard({
  title,
  description,
  imageUrl,
  projectUrl,
  pictureInLeft = true,
  releaseDate,
  technologies,
}: {
  title: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
  pictureInLeft?: boolean;
  releaseDate?: string;
  technologies?: string[];
}) {
  const isUpcoming = !releaseDate || new Date(releaseDate) > new Date();

  return (
    <div
      className={`group flex flex-col ${
        pictureInLeft ? "md:flex-row" : "md:flex-row-reverse"
      } bg-[#0f0f11] chamfered-border w-full h-full relative no-underline ${
        isUpcoming ? "opacity-70" : ""
      }`}
      style={{
        '--chamfer-border-color': 'rgba(255,255,255,0.06)',
        '--chamfer-border-color-focus': 'var(--color-primary)'
      } as React.CSSProperties}
    >
      {isUpcoming && (
        <div className="absolute top-4 right-4 z-20 bg-primary text-white font-mono text-[0.6rem] px-3 py-1 uppercase tracking-widest chamfered">
          UPCOMING
        </div>
      )}

      {/* Image Container */}
      <div className="w-full md:w-[45%] lg:w-[50%] relative overflow-hidden shrink-0 border-b md:border-b-0 border-white/5">
        <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover min-h-[250px] md:min-h-full opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
        />
      </div>

      {/* Content Container */}
      <div className="flex-1 p-8 md:p-12 flex flex-col justify-center relative">
        <div className="mb-4 flex items-center gap-4">
          <h3 className="font-display text-4xl md:text-5xl text-white group-hover:text-primary transition-colors duration-300 m-0 leading-none">
            {title}
          </h3>
        </div>

        <p className="font-body text-gray-400 text-sm md:text-base leading-relaxed mb-8 max-w-xl">
          {description}
        </p>

        {/* Tech Stack Tags */}
        {technologies && technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {technologies.slice(0, 5).map((tech, techIndex) => (
              <span
                key={techIndex}
                className="bg-[#111113] border border-white/5 px-2.5 py-1.5 font-mono text-[0.65rem] text-gray-500 uppercase tracking-widest chamfered transition-colors group-hover:border-primary/30 group-hover:text-gray-300"
              >
                {tech}
              </span>
            ))}
            {technologies.length > 5 && (
              <span className="bg-[#111113] border border-white/5 px-2.5 py-1.5 font-mono text-[0.65rem] text-gray-600 uppercase tracking-widest chamfered">
                +{technologies.length - 5}
              </span>
            )}
          </div>
        )}

        <div className="mt-auto">
          <Link
            to={projectUrl}
            className="btn-primary"
            onClick={(e) => {
              if (isUpcoming) e.preventDefault();
            }}
          >
            {isUpcoming ? "ACCESS DENIED" : "VIEW PROJECT"}
          </Link>
        </div>
      </div>
    </div>
  );
}
