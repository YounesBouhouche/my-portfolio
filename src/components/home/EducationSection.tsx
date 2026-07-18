import useQueryFetch from "../../hooks/useFetch";
import type { Education } from "../../types/Education";
import LoadingContainer from "../shared/LoadingContainer";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useTranslation } from "react-i18next";

export default function EducationSection() {
  const education = useQueryFetch<Education[]>(
    "/db/education.json",
    "education"
  );

  const titleRef = useScrollReveal<HTMLHeadingElement>();
  const containerRef = useScrollReveal<HTMLDivElement>({ stagger: true });
  const { t } = useTranslation();

  return (
    <section className="py-24 bg-[#0d0d0f] border-b border-white/5" id="education">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="section-title text-center md:text-right reveal-ready" ref={titleRef}>
          <span className="text-primary font-mono">/</span> {t("education.title")}
        </h2>

        <div className="mt-16 space-y-8 reveal-stagger" ref={containerRef}>
          <LoadingContainer
            data={education}
            size={120}
            children={(data) => (
              <>
                {data.map((edu, index) => (
                  <div
                    key={index}
                    className="reveal-stagger bg-[#0f0f11] chamfered-border group"
                    dir="ltr"
                  >
                    <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6 md:gap-12">

                      {/* Left: Index number */}
                      <div className="font-display text-5xl md:text-6xl text-white/5 group-hover:text-primary/20 transition-colors duration-300 select-none shrink-0 leading-none">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      {/* Center: Content */}
                      <div className="flex-grow">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <h3 className="font-heading text-xl md:text-2xl font-bold text-white transition-colors duration-300">
                            {edu.school}
                          </h3>
                        </div>
                        <p className="font-mono text-sm text-primary uppercase tracking-widest mb-3">
                          {edu.degree}
                        </p>
                        <p className="font-body text-gray-500 text-sm leading-relaxed">
                          {edu.details}
                        </p>
                      </div>

                      {/* Right: Date chip */}
                      <div className="shrink-0 self-start md:self-center">
                        <span className="inline-flex items-center font-mono text-xs text-gray-500 bg-white/5 px-3 py-1.5 chamfered border-none">
                          {edu.date}
                        </span>
                      </div>

                    </div>

                    {/* Bottom bar: primary accent line that expands on hover */}
                    <div className="h-[1px] bg-white/5 relative overflow-hidden">
                      <div className="absolute inset-0 bg-primary/40 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                    </div>
                  </div>
                ))}
              </>
            )}
          />
        </div>
      </div>
    </section>
  );
}
