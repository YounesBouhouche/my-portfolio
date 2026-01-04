import useQueryFetch from "../../hooks/useFetch";
import type { Education } from "../../types/Education";
import LoadingContainer from "../shared/LoadingContainer";

export default function EducationSection() {
  const education = useQueryFetch<Education[]>(
    "/db/education.json",
    "education"
  );

  return (
    <section className="py-20 bg-background border-b border-white/5" id="education">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="section-title text-center md:text-right">
          Education
          <span className="text-primary ml-2">/</span>
        </h2>

        <div className="mt-12">
          <LoadingContainer
            data={education}
            children={(data) => (
              <div className="space-y-4">
                {data.map((edu, index) => (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 border-l-2 border-primary/20 hover:border-primary bg-white/5 transition-all"
                  >
                    <div>
                      <h3 className="text-xl font-bold text-white">
                        {edu.school}
                      </h3>
                      <p className="text-primary mt-1">{edu.degree}</p>
                      <p className="text-gray-500 text-sm mt-1">
                        {edu.details}
                      </p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <span className="text-sm font-mono text-gray-400">
                        {edu.date}
                      </span>
                    </div>
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
