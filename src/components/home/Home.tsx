import Hero from "./Hero";
import EducationSection from "./EducationSection";
import ProjectCarousel from "../shared/ProjectCarousel";
import { usePortfolioData } from "../../hooks/usePortfolioData";
import useQueryFetch from "../../hooks/useFetch";
import type { Skill } from "../../types/Skill";
import LoadingContainer from "../shared/LoadingContainer";
import ResourceDialog from "../shared/ResourceDialog";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "@tanstack/react-router";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import SkillGanttChart from "./SkillGanttChart";

// Helper to group skills by category
const groupSkills = (skills: Skill[] = []) => {
  const groups: Record<string, Skill[]> = {
    Languages: [],
    Frameworks: [],
    Design: [],
    Tools: [],
    Other: [],
  };

  skills.forEach((skill) => {
    const category = skill.category || "Other";
    if (groups[category]) {
      groups[category].push(skill);
    } else {
      groups["Other"].push(skill);
    }
  });

  const orderedGroups = ["Languages", "Frameworks", "Design", "Tools", "Other"];
  return orderedGroups
    .map((key) => ({
      category: key,
      skills: groups[key],
    }))
    .filter((group) => group.skills.length > 0);
};

export default function Home() {
  const { t } = useTranslation();
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  // Data
  const { projects, isLoading: projectsLoading, error: projectsError } = usePortfolioData();
  const skillsData = useQueryFetch<Skill[]>("/db/skills.json", "skills");

  // Scroll reveals
  const projectsRef = useScrollReveal<HTMLDivElement>({ stagger: true });
  const skillsRef = useScrollReveal<HTMLDivElement>({ stagger: true });

  const projectsTitleRef = useScrollReveal<HTMLHeadingElement>();
  const projectsBtnRef = useScrollReveal<HTMLDivElement>();
  const skillsTitleRef = useScrollReveal<HTMLHeadingElement>();

  const featuredProjects = [...projects]
    .filter(p => p.completed || p.featured)
    .slice(0, 3);

  return (
    <>
      <Hero />
      <main className="space-y-0">
        {/* Featured Projects */}
        <section className="py-24 bg-background border-b border-white/5" id="projects">
          <div className="container mx-auto px-6 md:px-12">
            <h2 className="section-title text-center md:text-left reveal-ready" ref={projectsTitleRef}>
              {t("projects.title", "Featured Projects")} <span className="text-primary ml-2">/</span>
            </h2>

            <div className="mt-16 reveal-ready" ref={projectsRef}>
              <LoadingContainer
                data={[projects.length > 0 ? projects : null, projectsError, projectsLoading && projects.length === 0]}
                size={120}
              >
                {() => (
                  <ProjectCarousel projects={featuredProjects} />
                )}
              </LoadingContainer>
            </div>

            <div className="mt-16 flex justify-center md:justify-end reveal-ready" ref={projectsBtnRef}>
              <Link to="/projects" search={{ q: "", stack: "" }} className="btn-ghost">
                {t("projects.goProjects", "VIEW ALL PROJECTS")}
              </Link>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section className="py-24 bg-[#0d0d0f] border-b border-white/5" id="skills">
          <div className="container mx-auto px-6 md:px-12">
            <h2 className="section-title text-center md:text-left mb-16 flex items-center justify-center md:justify-start gap-3 reveal-ready" ref={skillsTitleRef}>
              <span className="text-primary">/</span> Skills
            </h2>

            <LoadingContainer data={skillsData} size={120}>
              {(data) => (
                <div className="space-y-8 reveal-stagger" ref={skillsRef}>
                  {groupSkills(data).map((group) => (
                    <div key={group.category} className="reveal-ready">
                      <SkillGanttChart
                        category={group.category}
                        skills={group.skills}
                        onSkillClick={setSelectedSkill}
                      />
                    </div>
                  ))}
                </div>
              )}
            </LoadingContainer>
          </div>
        </section>

        <EducationSection />
      </main>

      <ResourceDialog
        isOpen={!!selectedSkill}
        onClose={() => setSelectedSkill(null)}
        skillName={selectedSkill?.name || ""}
        resources={selectedSkill?.resources}
      />
    </>
  );
}
