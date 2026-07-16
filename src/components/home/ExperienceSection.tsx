import useQueryFetch from "../../hooks/useFetch";
import type { Experience } from "../../types/Experience";
import LoadingContainer from "../shared/LoadingContainer";
import { useScrollReveal } from "../../hooks/useScrollReveal";

export default function ExperienceSection() {
  const experiences = useQueryFetch<Experience[]>(
    "/db/experience.json",
    "experience"
  );

  const titleRef = useScrollReveal<HTMLHeadingElement>();
  const containerRef = useScrollReveal<HTMLDivElement>({ stagger: true });

  return (
    <section
      className="py-24 bg-background border-b border-white/5"
      id="experience"
    >
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="section-title text-center md:text-left reveal-ready" ref={titleRef}>
          <span className="text-primary mr-2">/</span>
          Experience
        </h2>

        <div className="mt-16 reveal-stagger" ref={containerRef}>
          <LoadingContainer
            data={experiences}
            children={(data) => (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {data.map((exp, index) => (
                  <div
                    key={index}
                    className="reveal-ready bg-surface p-8 group chamfered-border transition-colors duration-300"
                    style={{ '--chamfer-border-color-focus': 'var(--color-primary)' } as React.CSSProperties}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                      <h3 className="text-xl md:text-2xl font-heading font-bold text-white group-hover:text-primary transition-colors duration-300">
                        {exp.role}
                      </h3>
                      <span className="inline-flex items-center self-start sm:self-auto font-mono text-xs text-gray-500 bg-white/5 border border-white/10 px-3 py-1 chamfered">
                        {exp.date}
                      </span>
                    </div>
                    
                    <h4 className="text-base text-primary mb-4 font-mono uppercase tracking-wider">
                      {exp.company}
                    </h4>
                    
                    <p className="text-gray-400 font-body leading-relaxed text-sm md:text-base">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            )}
          />
        </div>
      </div>
    </section>
  );
}
