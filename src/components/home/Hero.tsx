import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import useQueryFetch from "../../hooks/useFetch";
import type { Library } from "../../types/Library";

export default function Hero() {
  const { t } = useTranslation();
  const [libraries] = useQueryFetch<Library[]>("/db/libraries.json", "libraries");

  return (
    <section className="relative w-full h-[100dvh] min-h-[600px] flex items-center bg-[#0a0a0a] overflow-hidden border-b border-white/5 pt-16">
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen hero-image"
        aria-hidden="true"
      />

      {/* Decorative gradient overlay matching Image 1 aesthetics */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-primary-dim)_0%,_transparent_50%)] pointer-events-none z-0"></div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 w-full h-full flex flex-col justify-center">
        {/* Left Aligned Content Stack */}
        <div className="flex flex-col items-start gap-3 max-w-4xl">

          {/* Top labels */}
          <div className="font-heading text-xs md:text-lg font-semibold tracking-wider text-gray-500 uppercase mb-2">
            {t("hero.prefix", "WELCOME, I'M")}
          </div>

          {/* Name Block */}
          <h1 className="font-display text-[15vw] md:text-[9rem] lg:text-[11rem] leading-[0.85] tracking-tight m-0 select-none">
            <div className="text-primary transform hover:scale-[1.01] transition-transform origin-left">{t("hero.firstName", "YOUNES")}</div>
            <div className="text-white transform hover:scale-[1.01] transition-transform origin-left">{t("hero.lastName", "BOUHOUCHE")}.</div>
          </h1>

          {/* Bottom-left stat strip */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 mt-12 font-mono text-[0.65rem] md:text-xs text-gray-400 tracking-wider">
            <div className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
              {t("hero.stat1", "ANDROID + REACT DEVELOPER")}
            </div>
            <div className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              {t("hero.stat2", "ESI-SBA, ALGERIA")}
            </div>
            <div className="flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
              {t("hero.stat3", "OPEN TO REMOTE")}
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="mt-12 md:mt-0 md:absolute md:bottom-24 md:right-12 z-20 flex gap-4">
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn-ghost">
            {t("about.cvButton", "DOWNLOAD CV")}
          </a>
          <Link to="/contact" className="btn-primary filled">
            {t("hero.cta", "GET IN TOUCH")}
          </Link>
        </div>
      </div>

      {/* Libraries Bottom Ribbon */}
      {libraries && libraries.length > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-12 border-t border-b border-white/5 bg-[#0d0d0f]/60 backdrop-blur-sm z-30 flex items-center overflow-hidden">
          <div className="flex gap-16 px-6 items-center animate-marquee whitespace-nowrap">
            {[...libraries, ...libraries, ...libraries].map((lib, idx) => (
              <a
                key={idx}
                href={lib.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-3 text-gray-500 hover:text-white transition-colors duration-300 font-mono text-[0.65rem] tracking-wider uppercase select-none"
              >
                {lib.icon && (
                  <img
                    src={lib.icon}
                    alt={lib.name}
                    className="h-4 w-auto opacity-50 hover:opacity-100 transition-opacity duration-300 object-contain"
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
