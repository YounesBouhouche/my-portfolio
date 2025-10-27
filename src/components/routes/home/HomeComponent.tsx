import Header from './Header'
import './Home.css'
import LargeProjectCard from '../../shared/LargeProjectCard';
import SkillCard from '../../shared/SkillCard';
import LibraryCarousel from '../../shared/LibraryCarousel';
import LinkButton from '../../shared/LinkButton';
import useQueryFetch from '../../../hooks/useFetch';
import type { Project } from '../../../types/Project';
import type { Skill } from '../../../types/Skill';
import LoadingContainer from '../../shared/LoadingContainer';
import type { Library } from '../../../types/Library';

export default function HomeComponent() {
  const projects = useQueryFetch<Project[]>('/db/projects.json', 'projects');
  const skills = useQueryFetch<Skill[]>('/db/skills.json', 'skills');
  const [libraries] = useQueryFetch<Library[]>('/db/libraries.json', 'libraries');

  return (
    <>
      <Header />
      <main className='space-y-60 py-20'>
        <section className='space-y-20'>
          <h2 className='text-6xl font-bold text-center'>Latest Projects</h2>
          <div className='space-y-20'>
            <LoadingContainer
              data={projects}
              children={(data) => (
                data.slice(0, 2).map((project, index) => (
                  <LargeProjectCard
                    key={index}
                    title={project.name}
                    description={project.description}
                    imageUrl={project.heroImage}
                    projectUrl={"/projects/" + project.route}
                    pictureInLeft={index % 2 === 0}
                    releaseDate={project.releaseDate}
                  />
                ))
              )}
            />
          </div>
          <LinkButton to="/projects" className='block mx-auto mt-10'
          >View All Projects</LinkButton>
        </section>
        <section className='space-y-20'>
          <h2 className='text-6xl font-bold text-center'>My Skills</h2>
          <div className="skills-grid">
            <LoadingContainer
              data={skills}
              children={(data) => (
                data.map((skill, index) => (
                  <SkillCard
                    key={index}
                    name={skill.name}
                    level={skill.level}
                    delay={index * 100}
                    primaryColor={skill.primaryColor}
                    secondaryColor={skill.secondaryColor}
                    icon={skill.icon}
                  />
                ))
              )}
            />
          </div>
        </section>
        {libraries && (
          <section className='space-y-20'>
            <h2 className='text-4xl font-bold text-center'>Libraries & Tools</h2>
            <LibraryCarousel libraries={libraries} />
          </section>
        )}
      </main>
    </>
  );
}
