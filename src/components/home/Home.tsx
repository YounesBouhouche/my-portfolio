import Hero from "./Hero";
import ExperienceSection from "./ExperienceSection";
import EducationSection from "./EducationSection";
import LargeProjectCard from "../shared/LargeProjectCard";
import SkillCard from "../shared/SkillCard";
import LibraryCarousel from "../shared/LibraryCarousel";
import ProjectCarousel from "../shared/ProjectCarousel";
import LinkButton from "../shared/LinkButton";
import useQueryFetch from "../../hooks/useFetch";
import type { Project } from "../../types/Project";
import type { Skill } from "../../types/Skill";
import LoadingContainer from "../shared/LoadingContainer";
import type { Library } from "../../types/Library";

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
              Featured Work <span className="text-primary ml-2">_</span>
            </h2>

            <div className="mt-16">
              <LoadingContainer
                data={projects}
                children={(data) => <ProjectCarousel projects={data} />}
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
            <h2 className="section-title text-center md:text-left mb-16">
              <span className="text-primary mr-2">/</span> Skills
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
    </>
  );
}
