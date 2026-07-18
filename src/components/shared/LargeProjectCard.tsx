import { Link } from "@tanstack/react-router";
import "./LargeProjectCard.css";
import { useTranslation } from "react-i18next";

interface LargeProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
  pictureInLeft?: boolean;
  releaseDate?: string;
  technologies?: string[];
  index?: number;
  category?: string;
}

export default function LargeProjectCard({
  title,
  description,
  imageUrl,
  projectUrl,
  pictureInLeft = true,
  releaseDate,
  technologies,
  index = 1,
  category = "PROJECT",
}: LargeProjectCardProps) {
  const isUpcoming = !releaseDate || new Date(releaseDate) > new Date();
  const indexLabel = String(index).padStart(2, "0");
  const { t } = useTranslation();

  return (
    <div className="lpc-root">

      {/* Full-bleed background image */}
      <img
        src={imageUrl}
        alt={title}
        className="lpc-image"
        draggable={false}
      />

      {/* Scan-line shimmer */}
      <div className="lpc-scanline" />

      {/* Directional gradient overlay */}
      <div className={`lpc-overlay ${pictureInLeft ? "lpc-overlay-left" : "lpc-overlay-right"}`} />

      {/* Watermark index number */}
      <div className={`lpc-index ${pictureInLeft ? "lpc-index-left" : "lpc-index-right"}`}>
        {indexLabel}
      </div>

      {/* Upcoming badge */}
      {isUpcoming && (
        <div className="lpc-upcoming-badge">UPCOMING</div>
      )}

      {/* Corner accent brackets */}
      <div className="lpc-corner lpc-corner-tl" />
      <div className="lpc-corner lpc-corner-br" />

      {/* Content */}
      <div className={`lpc-content ${!pictureInLeft ? "lpc-content-right" : ""}`}>

        <div className="lpc-accent-rule" />

        {/* Meta row: category + year */}
        <div className="flex items-center gap-3 mb-3" style={{ justifyContent: !pictureInLeft ? "flex-end" : "flex-start" }}>
          <p className="lpc-category" style={{ margin: 0 }}>{category}</p>
          {releaseDate && !isUpcoming && (
            <>
              <span className="font-mono text-[0.55rem] text-gray-700">—</span>
              <span className="font-mono text-[0.6rem] text-gray-600 tracking-widest uppercase flex items-center gap-1">
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {new Date(releaseDate).getFullYear()}
              </span>
            </>
          )}
        </div>

        <h3 className="lpc-title">{title}</h3>

        <p className="lpc-description">{description}</p>

        {technologies && technologies.length > 0 && (
          <div className="lpc-chips">
            {technologies.slice(0, 5).map((tech) => (
              <span key={tech} className="lpc-chip">{tech}</span>
            ))}
            {technologies.length > 5 && (
              <span className="lpc-chip">+{technologies.length - 5}</span>
            )}
          </div>
        )}

        <div className="lpc-cta">
          <Link
            to={projectUrl}
            className="btn-primary"
            onClick={(e) => { if (isUpcoming) e.preventDefault(); }}
          >
            {t(isUpcoming ? "projects.access_denied" : "projects.view_project")}
          </Link>
        </div>
      </div>
    </div>
  );
}
