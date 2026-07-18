import { useTranslation } from "react-i18next";
import { useScrollReveal } from "../../../hooks/useScrollReveal";
import { useParallax } from "../../../hooks/useParallax";
import CoordinateGrid from "./CoordinateGrid";
import "./AboutPage.css";

export default function AboutPage() {
  const { t } = useTranslation();

  // Parallax layers with different speeds
  const bgOffset = useParallax(0.15);
  const photoOffset = useParallax(0.3);
  const textOffset = useParallax(0.45);

  const heroRef = useScrollReveal<HTMLDivElement>();
  const contentRef = useScrollReveal<HTMLDivElement>();
  const statsRef = useScrollReveal<HTMLDivElement>({ stagger: true });
  const timelineRef = useScrollReveal<HTMLDivElement>({ stagger: true });

  const marqueeItems = [
    "Frontend Engineering", "UI/UX Design", "React Ecosystem",
    "Creative Coding", "System Architecture", "Interaction Design",
    "Performance Optimization", "Web Typography"
  ];

  return (
    <div className="ap-page">
      {/* ── PARALLAX HERO ─────────────────────────────────────── */}
      <section className="ap-hero">
        <div className="ap-hero-layers">
          {/* Layer 0: Deep background / Grid */}
          <div
            className="ap-layer ap-layer-grid"
            style={{ transform: `translateY(${bgOffset}px)` }}
          >
            <CoordinateGrid />
          </div>

          {/* Layer 1: Portrait photo */}
          <div
            className="ap-layer ap-layer-photo"
            style={{ transform: `translateY(${photoOffset}px)` }}
          >
            <img
              src="/assets/me-dithered.svg"
              alt="Younes Bouhouche"
              className="ap-portrait"
            />
          </div>

          {/* Layer 2: Vignette to blend everything */}
          <div className="ap-layer ap-layer-overlay" />
        </div>

        {/* Foreground Content */}
        <div
          className="ap-hero-content reveal-ready"
          ref={heroRef}
          style={{ transform: `translateY(${textOffset}px)` }}
        >
          <span className="ap-hero-eyebrow">Digital Craftsman</span>
          <h1 className="ap-hero-title">
            Designing <span>Interfaces.</span>
            Building <span>Experiences.</span>
          </h1>
          <p className="ap-hero-desc">
            {t("about.intro", "I'm Younes, a senior front-end engineer and UI designer focused on building impeccable, high-performance web applications that blur the line between utility and art.")}
          </p>
        </div>

        <div className="ap-hero-scroll" />
      </section>

      {/* ── MARQUEE TICKER ────────────────────────────────────── */}
      <div className="ap-marquee-wrapper" aria-hidden="true">
        <div className="ap-marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, idx) => (
            <div key={idx} className="ap-marquee-item">
              <span className="ap-marquee-text">{item}</span>
              <span className="ap-marquee-star">✦</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── BIO & STATS ───────────────────────────────────────── */}
      <section className="ap-content-section">
        <div className="ap-bio reveal-ready" ref={contentRef}>
          <p>
            With a background rooted in both technical architecture and visual design, I bridge the gap between aesthetics and functionality.
          </p>
          <p>
            My approach to software is holistic. I believe that a great product doesn't just work well under the hood—it feels flawless in the user's hands. I specialize in the React ecosystem, leveraging modern tools to build responsive, accessible, and highly interactive interfaces.
          </p>
          <p>
            Beyond pushing pixels and writing logic, I'm passionate about open-source, continuous learning, and exploring the bleeding edge of web technologies like WebGL, complex CSS animations, and generative art.
          </p>
        </div>

        <div className="ap-stats-grid reveal-stagger" ref={statsRef}>
          <div className="ap-stat-card reveal-ready">
            <span className="ap-stat-number">5+</span>
            <span className="ap-stat-label">Years Experience</span>
          </div>
          <div className="ap-stat-card reveal-ready">
            <span className="ap-stat-number">40+</span>
            <span className="ap-stat-label">Projects Completed</span>
          </div>
          <div className="ap-stat-card reveal-ready">
            <span className="ap-stat-number">10k</span>
            <span className="ap-stat-label">Commits Pushed</span>
          </div>
          <div className="ap-stat-card reveal-ready">
            <span className="ap-stat-number">∞</span>
            <span className="ap-stat-label">Coffee Consumed</span>
          </div>
        </div>
      </section>

      {/* ── TIMELINE ──────────────────────────────────────────── */}
      <section className="ap-timeline-section">
        <h2 className="ap-timeline-title">Experience</h2>
        <div className="ap-timeline reveal-stagger" ref={timelineRef}>

          <div className="ap-timeline-item reveal-ready">
            <div className="ap-timeline-dot" />
            <span className="ap-timeline-year">2022 — Present</span>
            <h3 className="ap-timeline-role">Senior Frontend Engineer</h3>
            <div className="ap-timeline-company">Tech Innovators Inc.</div>
            <p className="ap-timeline-desc">
              Led the migration of a legacy monolithic dashboard to a modern React/TypeScript micro-frontend architecture. Mentored junior developers and established internal UI design systems.
            </p>
          </div>

          <div className="ap-timeline-item reveal-ready">
            <div className="ap-timeline-dot" />
            <span className="ap-timeline-year">2019 — 2022</span>
            <h3 className="ap-timeline-role">UI/UX Designer & Developer</h3>
            <div className="ap-timeline-company">Creative Agency Studio</div>
            <p className="ap-timeline-desc">
              Designed and built high-performance marketing websites and interactive e-commerce platforms using Next.js and Tailwind CSS.
            </p>
          </div>

          <div className="ap-timeline-item reveal-ready">
            <div className="ap-timeline-dot" />
            <span className="ap-timeline-year">2017 — 2019</span>
            <h3 className="ap-timeline-role">Freelance Web Developer</h3>
            <div className="ap-timeline-company">Self-employed</div>
            <p className="ap-timeline-desc">
              Collaborated with startups to build MVPs, landing pages, and web apps. Gained deep knowledge of full-stack development and client communication.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}
