import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import useQueryFetch from "../../hooks/useFetch";
import type { Library } from "../../types/Library";
import "./Hero.css";

export default function Hero() {
  const { t } = useTranslation();
  const [libraries] = useQueryFetch<Library[]>("/db/libraries.json", "libraries");

  return (
    <section className="hero-section">
      <div
        className="hero-bg-image hero-image"
        aria-hidden="true"
      />

      {/* Decorative gradient overlay matching Image 1 aesthetics */}
      <div className="hero-gradient-overlay"></div>

      <div className="hero-container">
        {/* Left Aligned Content Stack */}
        <div className="hero-content-stack">

          {/* Top labels */}
          <div className="hero-prefix">
            {t("hero.prefix", "WELCOME, I'M")}
          </div>

          {/* Name Block */}
          <h1 className="hero-name">
            <div className="hero-firstname">{t("hero.firstName", "YOUNES")}</div>
            <div className="hero-lastname">{t("hero.lastName", "BOUHOUCHE")}.</div>
          </h1>

          {/* Bottom-left stat strip */}
          <div className="hero-stats-strip">
            <div className="hero-stat-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
              {t("hero.stat1", "ANDROID + REACT DEVELOPER")}
            </div>
            <div className="hero-stat-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              {t("hero.stat2", "ESI-SBA, ALGERIA")}
            </div>
            <div className="hero-stat-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
              {t("hero.stat3", "OPEN TO REMOTE")}
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="hero-cta-group">
          <a href="/assets/cv/document.pdf" target="_blank" rel="noreferrer" className="btn-ghost">
            {t("hero.cvButton", "DOWNLOAD CV")}
          </a>
          <Link to="/contact" className="btn-primary filled">
            {t("hero.cta", "GET IN TOUCH")}
          </Link>
        </div>
      </div>

      {/* Libraries Bottom Ribbon */}
      {libraries && libraries.length > 0 && (
        <div className="hero-ribbon">
          <div className="hero-ribbon-marquee animate-marquee">
            {[...libraries, ...libraries, ...libraries].map((lib, idx) => (
              <a
                key={idx}
                href={lib.url}
                target="_blank"
                rel="noreferrer"
                className="hero-ribbon-link"
              >
                {lib.icon && (
                  <img
                    src={lib.icon}
                    alt={lib.name}
                    className="hero-ribbon-image"
                  />
                )}
                <span>{lib.name}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

