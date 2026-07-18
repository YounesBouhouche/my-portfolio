import { useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import useEmblaCarousel from "embla-carousel-react";
import type { Project } from "../../../types/Project";
import { useScrollReveal } from "../../../hooks/useScrollReveal";
import { useParallax } from "../../../hooks/useParallax";
import "./ProjectLayout.css";

export default function ProjectLayout({ project }: { project: Project }) {
  const { t } = useTranslation();
  const heroOffset = useParallax(0.35);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const contentRef = useScrollReveal<HTMLDivElement>({ stagger: true });
  const featuresRef = useScrollReveal<HTMLDivElement>();
  const screenshotsRef = useScrollReveal<HTMLDivElement>();

  const {
    name,
    description,
    overrideDescription,
    heroImage,
    screenshots,
    technologies,
    features,
    githubLink,
    liveDemoLink,
    extraLinks,
    content,
    stargazers_count,
    primary_language,
    pushed_at,
    requirements,
    category,
    date,
    releaseDate,
    statsUnavailable,
  } = project;

  const displayDesc = overrideDescription || description;
  const hasStats =
    !statsUnavailable &&
    (stargazers_count !== undefined || primary_language || pushed_at);

  const formatDate = (isoStr?: string) => {
    if (!isoStr) return null;
    return new Date(isoStr).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  /* ── Screenshot carousel ─────────────────────────────────── */
  const [screenshotRef, screenshotEmbla] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: "trimSnaps",
  });

  const scrollPrev = useCallback(
    () => screenshotEmbla?.scrollPrev(),
    [screenshotEmbla]
  );
  const scrollNext = useCallback(
    () => screenshotEmbla?.scrollNext(),
    [screenshotEmbla]
  );

  const onSelect = useCallback(() => {
    if (!screenshotEmbla) return;
    setSelectedIndex(screenshotEmbla.selectedScrollSnap());
  }, [screenshotEmbla]);

  useEffect(() => {
    if (!screenshotEmbla) return;
    setScrollSnaps(screenshotEmbla.scrollSnapList());
    screenshotEmbla.on("select", onSelect);
    onSelect();
    return () => { screenshotEmbla.off("select", onSelect); };
  }, [screenshotEmbla, onSelect]);

  /* ── Shared sidebar content ──────────────────────────────── */
  const sidebarContent = (
    <>
      {/* Project Metadata */}
      <div className="pl-sidebar-section">
        <span className="pl-sidebar-label">Project Info</span>
        {category && (
          <div className="pl-sidebar-stat">
            <span className="pl-sidebar-stat-key">Category</span>
            <span className="pl-sidebar-stat-val">{category}</span>
          </div>
        )}
        {releaseDate && (
          <div className="pl-sidebar-stat">
            <span className="pl-sidebar-stat-key">Released</span>
            <span className="pl-sidebar-stat-val">{formatDate(releaseDate)}</span>
          </div>
        )}
        {date && (
          <div className="pl-sidebar-stat">
            <span className="pl-sidebar-stat-key">Started</span>
            <span className="pl-sidebar-stat-val">{formatDate(date)}</span>
          </div>
        )}
        {project.completed !== undefined && (
          <div className="pl-sidebar-stat">
            <span className="pl-sidebar-stat-key">Status</span>
            <span className="pl-sidebar-stat-val">
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: project.completed ? "#22c55e" : "#f59e0b",
                  display: "inline-block",
                }}
              />
              {project.completed ? "Completed" : "In Progress"}
            </span>
          </div>
        )}
      </div>

      {/* GitHub Stats */}
      {hasStats && (
        <div className="pl-sidebar-section">
          <span className="pl-sidebar-label">GitHub Stats</span>
          {stargazers_count !== undefined && (
            <div className="pl-sidebar-stat">
              <span className="pl-sidebar-stat-key">Stars</span>
              <span className="pl-sidebar-stat-val">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="#f59e0b"
                  className="pl-sidebar-star"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                {stargazers_count}
              </span>
            </div>
          )}
          {primary_language && (
            <div className="pl-sidebar-stat">
              <span className="pl-sidebar-stat-key">Language</span>
              <span className="pl-sidebar-stat-val">
                {primary_language}
              </span>
            </div>
          )}
          {pushed_at && (
            <div className="pl-sidebar-stat">
              <span className="pl-sidebar-stat-key">Last push</span>
              <span className="pl-sidebar-stat-val">{formatDate(pushed_at)}</span>
            </div>
          )}
        </div>
      )}

      {/* Requirements */}
      {requirements && requirements.length > 0 && (
        <div className="pl-sidebar-section">
          <span className="pl-sidebar-label">Requirements</span>
          {requirements.map((req, i) => (
            <div key={i} className="pl-sidebar-req-item">
              <span className="pl-sidebar-req-bullet">›</span>
              <span className="pl-sidebar-req-text">{req}</span>
            </div>
          ))}
        </div>
      )}

      {/* Links */}
      {(githubLink || liveDemoLink || (extraLinks && extraLinks.length > 0)) && (
        <div className="pl-sidebar-section">
          <span className="pl-sidebar-label">Links</span>
          {githubLink && (
            <a
              href={githubLink}
              target="_blank"
              rel="noreferrer"
              className="pl-sidebar-link"
            >
              <span className="pl-sidebar-link-arr">▸</span>
              GitHub Repository
            </a>
          )}
          {liveDemoLink && (
            <a
              href={liveDemoLink}
              target="_blank"
              rel="noreferrer"
              className="pl-sidebar-link"
            >
              <span className="pl-sidebar-link-arr">▸</span>
              Live Demo
            </a>
          )}
          {extraLinks?.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="pl-sidebar-link"
            >
              <span className="pl-sidebar-link-arr">▸</span>
              {link.label}
            </a>
          ))}
        </div>
      )}

      {/* Tech Stack */}
      {technologies && technologies.length > 0 && (
        <div className="pl-sidebar-section">
          <span className="pl-sidebar-label">Stack</span>
          <div className="pl-sidebar-chips">
            {technologies.map((tech) => (
              <span key={tech} className="tech-chip">
                {tech}
              </span>
            ))}
          </div>
        </div>
      )}
    </>
  );

  return (
    <article className="min-h-screen bg-background text-white">
      {/* ═══════════════════════════════════════════════════════
          HERO — parallax background image
          ═══════════════════════════════════════════════════════ */}
      <section className="pl-hero">
        {/* Parallax background */}
        <div
          className="pl-hero-bg"
          style={{ transform: `translateY(${heroOffset}px)` }}
        >
          <img src={heroImage} alt={name} className="pl-hero-image" />
          <div className="pl-hero-overlay" />
        </div>

        {/* Primary-tinted atmospheric accent */}
        <div className="pl-hero-accent" />

        {/* Text content */}
        <div className="pl-hero-content">
          <span className="pl-hero-category">
            <span className="pl-hero-category-line" />
            {category ?? "Project"}
          </span>

          <h1 className="pl-hero-title">{name}</h1>

          <p className="pl-hero-desc">{displayDesc}</p>

          {technologies && technologies.length > 0 && (
            <div className="pl-hero-chips">
              {technologies.slice(0, 7).map((tech) => (
                <span key={tech} className="tech-chip">
                  {tech}
                </span>
              ))}
              {technologies.length > 7 && (
                <span className="tech-chip">+{technologies.length - 7}</span>
              )}
            </div>
          )}

          <div className="pl-hero-actions">
            {liveDemoLink && (
              <a
                href={liveDemoLink}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                {t("projects.liveDemo", "LIVE DEMO")}
              </a>
            )}
            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
              >
                {t("projects.viewCode", "VIEW CODE")}
              </a>
            )}
            {extraLinks?.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="pl-scroll-hint" aria-hidden="true">
          <span className="pl-scroll-hint-label">Scroll</span>
          <div className="pl-scroll-hint-line" />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          BODY — main content + sticky sidebar
          ═══════════════════════════════════════════════════════ */}
      <div className="pl-body">
        {/* ── Main Content ─────────────────────────────────── */}
        <main className="pl-main">
          {/* Problem / Approach / Outcome */}
          {content && (
            <div className="space-y-10 mb-16 reveal-stagger" ref={contentRef}>
              {content.problem && (
                <div className="reveal-ready pl-section">
                  <h2 className="pl-section-title">The Problem</h2>
                  <div
                    className="pl-section-body"
                    dangerouslySetInnerHTML={{ __html: content.problem }}
                  />
                </div>
              )}
              {content.approach && (
                <div className="reveal-ready pl-section">
                  <h2 className="pl-section-title">The Approach</h2>
                  <div
                    className="pl-section-body"
                    dangerouslySetInnerHTML={{ __html: content.approach }}
                  />
                </div>
              )}
              {content.outcome && (
                <div className="reveal-ready pl-section">
                  <h2 className="pl-section-title">The Outcome</h2>
                  <div
                    className="pl-section-body"
                    dangerouslySetInnerHTML={{ __html: content.outcome }}
                  />
                </div>
              )}
            </div>
          )}

          {/* Features */}
          {features && features.length > 0 && (
            <div
              className="pl-section reveal-ready mb-16"
              ref={featuresRef}
            >
              <h2 className="pl-section-title">Features</h2>
              <ul className="pl-features-list">
                {features.map((feature, idx) => (
                  <li key={idx} className="pl-feature-item">
                    <span className="pl-feature-arrow">›</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Screenshots carousel */}
          {screenshots && screenshots.length > 0 && (
            <div
              className="pl-screenshots reveal-ready"
              ref={screenshotsRef}
            >
              <h2 className="pl-screenshots-header">Screenshots</h2>

              <div className="pl-screenshots-viewport" ref={screenshotRef}>
                <div className="pl-screenshots-track">
                  {screenshots.map((src, idx) => (
                    <div
                      key={idx}
                      className={`pl-screenshot-slide${idx === selectedIndex ? " is-selected" : ""
                        }`}
                    >
                      <img
                        src={src}
                        alt={`${name} — screenshot ${idx + 1}`}
                        className="pl-screenshot-img"
                        draggable={false}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pl-screenshots-controls">
                <button
                  className="pl-screenshot-btn"
                  onClick={scrollPrev}
                  aria-label="Previous screenshot"
                >
                  ‹
                </button>
                <div className="pl-screenshot-dots" role="tablist">
                  {scrollSnaps.map((_, idx) => (
                    <button
                      key={idx}
                      role="tab"
                      aria-selected={idx === selectedIndex}
                      className={`pl-screenshot-dot${idx === selectedIndex ? " active" : ""
                        }`}
                      onClick={() => screenshotEmbla?.scrollTo(idx)}
                      aria-label={`Screenshot ${idx + 1}`}
                    />
                  ))}
                </div>
                <button
                  className="pl-screenshot-btn"
                  onClick={scrollNext}
                  aria-label="Next screenshot"
                >
                  ›
                </button>
              </div>
            </div>
          )}
        </main>

        {/* ── Desktop Sidebar ───────────────────────────────── */}
        <aside className="pl-sidebar" aria-label="Project details">
          <div className="pl-sidebar-box">{sidebarContent}</div>
        </aside>
      </div>

      {/* ── Mobile Info FAB ───────────────────────────────────── */}
      <button
        className="pl-info-fab"
        onClick={() => setSidebarOpen(true)}
        aria-label="Show project info"
        aria-expanded={sidebarOpen}
      >
        <svg
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        INFO
      </button>

      {/* ── Mobile Drawer ─────────────────────────────────────── */}
      {sidebarOpen && (
        <div
          className="pl-drawer-backdrop"
          onClick={() => setSidebarOpen(false)}
          role="presentation"
        >
          <aside
            className="pl-drawer"
            onClick={(e) => e.stopPropagation()}
            aria-label="Project details panel"
          >
            <div className="pl-drawer-header">
              <span className="pl-drawer-title">Project Info</span>
              <button
                className="pl-drawer-close"
                onClick={() => setSidebarOpen(false)}
                aria-label="Close panel"
              >
                ✕
              </button>
            </div>
            {sidebarContent}
          </aside>
        </div>
      )}
    </article>
  );
}
