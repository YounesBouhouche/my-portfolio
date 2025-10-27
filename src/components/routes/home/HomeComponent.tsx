import Header from './Header'
import './Home.css'
import ProjectCard from '../../shared/ProjectCard';
import SkillCard from '../../shared/SkillCard';
import LibraryCarousel from '../../shared/LibraryCarousel';
import LinkButton from '../../shared/LinkButton';
import MapboxIcon from '/assets/mapbox.svg';
import RabbitMqIcon from '/assets/rabbitmq.svg';
import ApolloIcon from '/assets/graphql.svg';
import CoilIcon from '/assets/coil.svg';
import KtorIcon from '/assets/ktor.svg';
import KoinIcon from '/assets/png/koin.png';
import TanStackIcon from '/assets/png/logo-color-100.png';
import MlkitIcon from '/assets/png/mlkit.png';
import FirebaseIcon from '/assets/firebase.svg';
import TailwindIcon from '/assets/tailwind.svg';
import useQueryFetch from '../../../hooks/useFetch';
import type { Project } from '../../../types/Project';
import type { Skill } from '../../../types/Skill';
import LoadingContainer from '../../shared/LoadingContainer';

export default function HomeComponent() {
  const projects = useQueryFetch<Project[]>('/db/projects.json', 'projects');
  const skills = useQueryFetch<Skill[]>('/db/skills.json', 'skills');

  const libraries = [
    {
      name: "Mapbox",
      icon: MapboxIcon
    },
    {
      name: "RabbitMQ",
      icon: RabbitMqIcon
    },
    {
      name: "Apollo",
      icon: ApolloIcon
    },
    {
      name: "Ktor",
      icon: KtorIcon
    },
    {
      name: "Koin",
      icon: KoinIcon
    },
    {
      name: "Coil",
      icon: CoilIcon
    },
    {
      name: "Tanstack Router",
      icon: TanStackIcon
    },
    {
      name: 'Mlkit',
      icon: MlkitIcon
    },
    {
      name: 'Firebase',
      icon: FirebaseIcon
    },
    {
      name: 'Tailwind',
      icon: TailwindIcon
    },
  ]

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
                  <ProjectCard
                    key={index}
                    title={project.name}
                    description={project.description}
                    imageUrl={project.heroImage}
                    projectUrl={"/projects/" + project.route}
                    pictureInLeft={index % 2 === 0}
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
        <section className='space-y-20'>
          <h2 className='text-4xl font-bold text-center'>Libraries & Tools</h2>
          <LibraryCarousel libraries={libraries} />
        </section>
      </main>
    </>
  );
}
