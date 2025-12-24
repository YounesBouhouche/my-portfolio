import useQueryFetch from "../../hooks/useFetch";
import type { Experience } from "../../types/Experience";
import LoadingContainer from "../shared/LoadingContainer";

export default function ExperienceSection() {
  const experiences = useQueryFetch<Experience[]>(
    "/db/experience.json",
    "experience"
  );

  return (
    <section
      className="py-20 bg-background border-b border-white/5"
      id="experience"
    >
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="section-title text-center md:text-left">
          <span className="text-primary mr-2">/</span>
          Experience
        </h2>

        <div className="mt-12 space-y-8">
          <LoadingContainer
            data={experiences}
            children={(data) => (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.map((exp, index) => (
                  <div
                    key={index}
                    className="bg-surface border border-white/5 p-8 transition-colors hover:border-primary/30 group"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                        {exp.role}
                      </h3>
                      <span className="text-sm font-mono text-gray-500 border border-white/10 px-2 py-1">
                        {exp.date}
                      </span>
                    </div>
                    <h4 className="text-lg text-primary mb-4 font-mono">
                      {exp.company}
                    </h4>
                    <p className="text-gray-400 leading-relaxed">
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
