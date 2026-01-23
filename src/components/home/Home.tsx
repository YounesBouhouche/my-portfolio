import Hero from "./Hero";
import ExperienceSection from "./ExperienceSection";
import EducationSection from "./EducationSection";
import SkillCard from "../shared/SkillCard";
import LibraryCarousel from "../shared/LibraryCarousel";
import ProjectCarousel from "../shared/ProjectCarousel";
import LinkButton from "../shared/LinkButton";
import useQueryFetch from "../../hooks/useFetch";
import type { Project } from "../../types/Project";
import type { Skill } from "../../types/Skill";
import LoadingContainer from "../shared/LoadingContainer";
import type { Library } from "../../types/Library";
import ResourceDialog from "../shared/ResourceDialog";
import { useState } from "react";

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

  // Filter out empty groups and sort specific order
  const orderedGroups = ["Languages", "Frameworks", "Design", "Tools", "Other"];
  return orderedGroups
    .map((key) => ({
      category: key,
      skills: groups[key],
    }))
    .filter((group) => group.skills.length > 0);
};

export default function Home() {
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const projects = useQueryFetch<Project[]>("/db/projects.json", "projects-v2");
  const skills = useQueryFetch<Skill[]>("/db/skills.json", "skills");
  const [libraries] = useQueryFetch<Library[]>(
    "/db/libraries.json",
    "libraries"
  );

  return (
    <>
      <Hero />
      <main className="space-y-0">
        <ExperienceSection />

        <section
          className="py-20 bg-background border-b border-white/5"
          id="projects"
        >
          <div className="container mx-auto px-6 md:px-12">
            <h2 className="section-title text-center md:text-right">
              Featured Work <span className="text-primary ml-2">/</span>
            </h2>

            <div className="mt-16">
              <LoadingContainer
                data={projects}
                children={(data) => {
                  const sortedData = [...data]
                    .sort((a, b) => (a.priority || 0) - (b.priority || 0))
                    .filter((project) => project.completed)
                    .slice(0, 3);
                  return <ProjectCarousel projects={sortedData} />;
                }}
              />
            </div>

            <div className="mt-16 flex justify-center">
              <LinkButton to="/projects" className="terminal-button-link">
                View All Projects
              </LinkButton>
            </div>
          </div>
        </section>

        <section
          className="py-20 bg-background border-b border-white/5"
          id="skills"
        >
          <div className="container mx-auto px-6 md:px-12">
            <h2 className="section-title text-center md:text-left mb-16 flex items-center justify-center md:justify-start gap-3">
              <span className="text-primary">/</span> Skills
              <div
                className="group relative flex items-center"
                title="Click on a skill card to see learning resources"
              >
                <svg
                  className="w-5 h-5 text-gray-500 hover:text-primary cursor-help transition-colors"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </h2>

            <LoadingContainer
              data={skills}
              children={(skillsData) => {
                const groupedSkills = groupSkills(skillsData);
                return (
                  <div className="space-y-16">
                    {groupedSkills.map((group) => (
                      <div key={group.category}>
                        <h3 className="text-2xl font-bold text-gray-400 mb-8 border-l-4 border-primary pl-4">
                          {group.category}
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                          {group.skills.map((skill, index) => (
                            <SkillCard
                              key={index}
                              name={skill.name}
                              level={skill.level}
                              delay={index * 50}
                              primaryColor={skill.primaryColor}
                              secondaryColor={skill.secondaryColor}
                              icon={skill.icon}
                              resources={skill.resources}
                              onClick={() =>
                                skill.resources &&
                                skill.resources.length > 0 &&
                                setSelectedSkill(skill)
                              }
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              }}
            />
          </div>
        </section>

        <EducationSection />

        {libraries && (
          <section className="py-20 bg-background">
            <div className="container mx-auto px-6 md:px-12">
              <h2 className="text-2xl font-bold text-center text-gray-500 mb-10 uppercase tracking-widest">
                Libraries & Tools
              </h2>
              <LibraryCarousel libraries={libraries} />
            </div>
          </section>
        )}
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
