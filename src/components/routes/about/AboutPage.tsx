import { useTranslation } from "react-i18next";
import { useScrollReveal } from "../../../hooks/useScrollReveal";

export default function AboutPage() {
  const { t } = useTranslation();

  const headerRef = useScrollReveal<HTMLDivElement>();
  const sectionsRef = useScrollReveal<HTMLDivElement>({ stagger: true });

  const CV_LINK = "/assets/cv/document.pdf";
  const GITHUB_LINK = "https://github.com/younesbouh05";
  const LINKEDIN_LINK = "https://www.linkedin.com/in/younesbouh05";

  return (
    <div className="min-h-screen bg-background text-white pt-32 pb-32">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-24 reveal-ready" ref={headerRef}>
          <h1 className="font-display text-7xl md:text-9xl tracking-tight leading-none mb-8">
            {t("about.title", "ABOUT ME")}
            <span className="text-primary">.</span>
          </h1>
          <p className="font-body text-xl md:text-2xl text-gray-400 max-w-2xl leading-relaxed">
            {t("about.intro", "I'm Younes Bouhouche, a 3rd year Computer Science student at ESI-SBA, Algeria. I build native Android applications and React web experiences, with a focus on performance, clean architecture, and principled engineering decisions.")}
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-24 reveal-stagger" ref={sectionsRef}>
          
          {/* Section: Studies */}
          <section className="reveal-ready flex flex-col md:flex-row gap-6 md:gap-16">
            <h2 className="font-heading text-sm text-primary tracking-[0.2em] uppercase md:w-48 shrink-0 mt-1">
              {t("about.studiesTitle", "STUDIES")}
            </h2>
            <div className="font-body text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl">
              {t("about.studiesContent", "Currently in my 3rd year of Computer Science at École Supérieure en Informatique de Sidi Bel-Abbès (ESI-SBA), Algeria. Focused on algorithms, systems programming, and software engineering fundamentals.")}
            </div>
          </section>

          {/* Section: Tech Focus */}
          <section className="reveal-ready flex flex-col md:flex-row gap-6 md:gap-16">
            <h2 className="font-heading text-sm text-primary tracking-[0.2em] uppercase md:w-48 shrink-0 mt-1">
              {t("about.techTitle", "TECH FOCUS")}
            </h2>
            <div className="font-body text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl">
              {t("about.techContent", "My primary stack is Native Android (Kotlin, Jetpack Compose, Clean Architecture) for mobile and React (TypeScript, TanStack Router) for web. I believe in mastering the platform, not abstracting it away.")}
            </div>
          </section>

          {/* Section: Competitive Programming */}
          <section className="reveal-ready flex flex-col md:flex-row gap-6 md:gap-16">
            <h2 className="font-heading text-sm text-primary tracking-[0.2em] uppercase md:w-48 shrink-0 mt-1">
              {t("about.compTitle", "COMPETITIVE PROGRAMMING")}
            </h2>
            <div className="font-body text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl">
              {t("about.compContent", "Active member of the AlphaBit club at ESI-SBA — training in algorithms, data structures, and competitive problem-solving.")}
            </div>
          </section>

          {/* Section: Philosophy */}
          <section className="reveal-ready flex flex-col md:flex-row gap-6 md:gap-16">
            <h2 className="font-heading text-sm text-primary tracking-[0.2em] uppercase md:w-48 shrink-0 mt-1">
              {t("about.philosophyTitle", "NATIVE-FIRST PHILOSOPHY")}
            </h2>
            <div className="font-body text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl">
              {t("about.philosophyContent", "Cross-platform frameworks solve 80% of use cases — but the remaining 20% (biometric auth, hardware access, real-time sensors, security-critical flows) demands native. I build native-first for the cases that matter.")}
            </div>
          </section>

          {/* Actions */}
          <section className="reveal-ready pt-12 border-t border-white/10 flex flex-wrap gap-4">
            <a href={CV_LINK} download="Younes_Bouhouche_CV.pdf" className="btn-primary">
              {t("about.cvButton", "DOWNLOAD CV")}
            </a>
            <a href={GITHUB_LINK} target="_blank" rel="noreferrer" className="btn-ghost">
              {t("about.githubButton", "GITHUB")}
            </a>
            <a href={LINKEDIN_LINK} target="_blank" rel="noreferrer" className="btn-ghost">
              {t("about.linkedinButton", "LINKEDIN")}
            </a>
          </section>

        </div>
      </div>
    </div>
  );
}
