import React from "react";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import useQueryFetch from "../../hooks/useFetch";
import type { Library } from "../../types/Library";
import { useTypewriter } from "../../hooks/useTypewriter";
import "./Hero.css";

export default function Hero() {
  const { t } = useTranslation();
  const [libraries] = useQueryFetch<Library[]>("/db/libraries.json", "libraries");

  const { displayedFirst, displayedSecond, prefix, isTypingComplete, cursorOn, colors } =
    useTypewriter();

  return (
    <section
      className="hero-section"
      style={{
        "--color-primary": colors.primary,
        "--color-primary-dim": colors.primaryDim,
        "--color-primary-glow": colors.primaryGlow,
      } as React.CSSProperties}
    >
      {/* Background Grid Pattern */}
      <div className="hero-grid-pattern" aria-hidden="true" />

      <img
        src="/assets/png/me_new.png"
        alt=""
        className="hero-bg-img"
        aria-hidden="true"
        fetchPriority="high"
        decoding="async"
      />

      {/* Multi-layer gradient overlay */}
      <div className="hero-gradient-overlay" aria-hidden="true" />

      {/* Blurred glow orb — sits behind the portrait */}
      <div className="hero-glow-orb" aria-hidden="true" />

      <div className="hero-container">
        {/* Left Aligned Content Stack */}
        <div className="hero-content-stack">

          {/* Prefix label — changes with each typewriter state */}
          <div className="hero-prefix">
            {prefix}
          </div>

          {/* Name / Role Block */}
          <h1 className={`hero-name${isTypingComplete ? " typing-complete" : ""}`}>
            <div className="hero-firstname">
              {displayedFirst}
              {cursorOn === "first" && <span className="cursor-blink" aria-hidden="true" />}
            </div>
            <div className="hero-lastname">
              {displayedSecond}
              {cursorOn === "second" && <span className="cursor-blink" aria-hidden="true" />}
              {cursorOn === "none" && isTypingComplete && <span className="cursor-blink" aria-hidden="true" />}
            </div>
          </h1>
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
                title={lib.name}
              >
                {lib.icon && (
                  <img
                    src={lib.icon}
                    alt={lib.name}
                    className="hero-ribbon-image"
                    loading="lazy"
                    decoding="async"
                    width="32"
                    height="32"
                  />
                )}
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
