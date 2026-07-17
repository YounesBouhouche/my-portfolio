import { useTranslation } from "react-i18next";
import type { Project } from "../../../types/Project";
import { useScrollReveal } from "../../../hooks/useScrollReveal";

export default function ProjectLayout({ project }: { project: Project }) {
  const { t } = useTranslation();

  const heroRef = useScrollReveal<HTMLDivElement>();
  const statsRef = useScrollReveal<HTMLDivElement>({ stagger: true });
  const contentRef = useScrollReveal<HTMLDivElement>({ stagger: true });
  const featuresRef = useScrollReveal<HTMLDivElement>({ stagger: true });

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
  } = project;

  const formatDate = (isoStr: string) => {
    return new Date(isoStr).toLocaleDateString(undefined, {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  };

  return (
    <article className="min-h-screen bg-background text-white pb-32">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 border-b border-white/5 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_top_right,_var(--color-primary-dim)_0%,_transparent_60%)] opacity-30 pointer-events-none -z-10"></div>
        <div className="absolute inset-0 card-dot-grid opacity-10 pointer-events-none -z-10"></div>

        <div className="max-w-5xl mx-auto px-6">
          <div className="reveal-ready" ref={heroRef}>
            {/* Tag / Category */}
            <div className="font-mono text-xs tracking-[0.2em] text-primary uppercase mb-6 flex items-center gap-2">
              <span className="w-8 h-px bg-primary/50"></span>
              {project.category}
            </div>

            {/* Title */}
            <h1 className="font-display text-6xl md:text-8xl xl:text-9xl tracking-tight leading-[0.9] mb-8">
              {name}
            </h1>

            {/* Description */}
            <p className="font-body text-xl md:text-2xl text-gray-300 max-w-3xl leading-relaxed mb-12 border-l-2 border-primary/30 pl-6">
              {overrideDescription || description}
            </p>

            {/* Tech Stack Pills */}
            {technologies && technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-12">
                {technologies.map(tech => (
                  <span key={tech} className="tech-chip">
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {/* Action Links */}
            <div className="flex flex-wrap gap-4">
              {liveDemoLink && (
                <a href={liveDemoLink} target="_blank" rel="noreferrer" className="btn-primary">
                  {t("projects.liveDemo", "LIVE DEMO")}
                </a>
              )}
              {githubLink && (
                <a href={githubLink} target="_blank" rel="noreferrer" className="btn-ghost">
                  {t("projects.viewCode", "VIEW CODE")}
                </a>
              )}
              {extraLinks?.map((link, idx) => (
                <a key={idx} href={link.url} target="_blank" rel="noreferrer" className="btn-ghost">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GitHub Stats Strip (if available) */}
      {(stargazers_count !== undefined || primary_language || pushed_at) && (
        <section className="border-b border-white/5 bg-[#0d0d0f]">
          <div className="max-w-5xl mx-auto px-6 py-6 flex flex-wrap gap-x-12 gap-y-4 font-mono text-xs text-gray-400 reveal-stagger" ref={statsRef}>
            {stargazers_count !== undefined && (
              <div className="reveal-ready flex items-center gap-2">
                <span className="text-gray-600">STARS</span>
                <span className="text-white">{stargazers_count}</span>
              </div>
            )}
            {primary_language && (
              <div className="reveal-ready flex items-center gap-2">
                <span className="text-gray-600">LANG</span>
                <span className="flex items-center gap-1.5 text-white">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  {primary_language}
                </span>
              </div>
            )}
            {pushed_at && (
              <div className="reveal-ready flex items-center gap-2">
                <span className="text-gray-600">UPDATED</span>
                <span className="text-white">{formatDate(pushed_at)}</span>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Main Content Area */}
      <section className="max-w-4xl mx-auto px-6 mt-24 gap-4">
        {content && (
          <div className="space-y-16 reveal-stagger" ref={contentRef}>
            {heroImage && (
              <div className="reveal-ready rounded-sm overflow-hidden border border-white/10 bg-[#111113] p-1">
                <img src={heroImage} alt={name} className="w-full h-auto rounded-[2px]" />
              </div>
            )}

            {content.problem && (
              <div className="reveal-ready">
                <h2 className="font-heading text-3xl font-bold mb-6 text-white">The Problem</h2>
                <div className="font-body text-gray-400 leading-relaxed space-y-4 text-lg" dangerouslySetInnerHTML={{ __html: content.problem }} />
              </div>
            )}

            {content.approach && (
              <div className="reveal-ready">
                <h2 className="font-heading text-3xl font-bold mb-6 text-white">The Approach</h2>
                <div className="font-body text-gray-400 leading-relaxed space-y-4 text-lg" dangerouslySetInnerHTML={{ __html: content.approach }} />
              </div>
            )}

            {content.outcome && (
              <div className="reveal-ready">
                <h2 className="font-heading text-3xl font-bold mb-6 text-white">The Outcome</h2>
                <div className="font-body text-gray-400 leading-relaxed space-y-4 text-lg" dangerouslySetInnerHTML={{ __html: content.outcome }} />
              </div>
            )}
          </div>
        )}

        {screenshots && screenshots.length > 0 && (
          <div className="reveal-ready mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {screenshots.map((src, idx) => (
                <div key={idx} className="border border-white/10 bg-[#111113] p-1 rounded-sm">
                  <img src={src} alt={`Screenshot ${idx + 1}`} className="w-full h-auto rounded-[2px]" />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-24 reveal-stagger" ref={featuresRef}>
          {features && features.length > 0 && (
            <div className="reveal-ready">
              <h2 className="font-heading text-3xl font-bold mb-6 text-white">Features</h2>
              <ul className="list-none space-y-3 font-body text-gray-400 text-lg">
                {features.map((feature, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="text-primary font-bold">→</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {screenshots && screenshots.length > 0 && (
            <div className="reveal-ready mt-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {screenshots.map((src, idx) => (
                  <div key={idx} className="border border-white/10 bg-[#111113] p-1 rounded-sm">
                    <img src={src} alt={`Screenshot ${idx + 1}`} className="w-full h-auto rounded-[2px]" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </article>
  );
}
