import Header from './Header'
import './Home.css'
import Assurini from '../../../assets/jpg/Assurini.jpg'
import DepanGo from '../../../assets/jpg/DepanGo.jpg'
import ProjectCard from '../../shared/ProjectCard';
import SkillCard from '../../shared/SkillCard';
import LibraryCarousel from '../../shared/LibraryCarousel';
import LinkButton from '../../shared/LinkButton';
import MapboxIcon from '../../../assets/mapbox.svg';
import RabbitMqIcon from '../../../assets/rabbitmq.svg';
import ApolloIcon from '../../../assets/graphql.svg';
import CoilIcon from '../../../assets/coil.svg';
import KtorIcon from '../../../assets/ktor.svg';
import KoinIcon from '../../../assets/png/koin.png';
import ComposeIcon from '../../../assets/compose.svg';
import AndroidIcon from '../../../assets/android.svg';
import GitIcon from '../../../assets/git.svg';
import PhpIcon from '../../../assets/php.svg';
import JavascriptIcon from '../../../assets/javascript.svg';
import TypescriptIcon from '../../../assets/typescript.svg';
import KotlinIcon from '../../../assets/kotlin.svg';
import LaravelIcon from '../../../assets/laravel.svg';
import ReactIcon from '../../../assets/react.svg';
import TanStackIcon from '../../../assets/png/logo-color-100.png';
import MlkitIcon from '../../../assets/png/mlkit.png';

export default function HomeComponent() {
  const projects = [
    {
      title: "Assurini",
      description: "Assurini is an innovative insurance platform that simplifies the process of obtaining and managing insurance policies. With a user-friendly interface and advanced features, Assurini provides a seamless experience for users to compare, purchase, and manage their insurance needs all in one place.",
      imageUrl: Assurini,
      projectUrl: 'projects/assurini'
    },
    {
      title: "DepanGo",
      description: "DepanGo is a cutting-edge automotive service platform that connects vehicle owners with trusted mechanics and service providers. Offering a convenient way to schedule maintenance, repairs, and inspections, DepanGo ensures that users receive high-quality service at competitive prices, all while providing transparency and ease of use.",
      imageUrl: DepanGo,
      projectUrl: ''
    }
  ];
  const skills = [
    { 
      name: "React", 
      level: 90, 
      primaryColor: "#61dafb", 
      secondaryColor: "#21d4fd", 
      icon: ReactIcon
    },
    { 
      name: "JavaScript", 
      level: 88, 
      primaryColor: "#f7df1e", 
      secondaryColor: "#ffeb3b", 
      icon: JavascriptIcon
    },
    { 
      name: "TypeScript", 
      level: 85, 
      primaryColor: "#3178c6", 
      secondaryColor: "#007acc", 
      icon: TypescriptIcon 
    },
    { 
      name: "Kotlin", 
      level: 82, 
      primaryColor: "#7f52ff", 
      secondaryColor: "#a855f7", 
      icon: KotlinIcon 
    },
    { 
      name: "Jetpack Compose", 
      level: 80, 
      primaryColor: "#4285f4", 
      secondaryColor: "#0f9d58", 
      icon: ComposeIcon
    },
    { 
      name: "Android", 
      level: 78, 
      primaryColor: "#3ddc84", 
      secondaryColor: "#0f9d58", 
      icon: AndroidIcon 
    },
    { 
      name: "Laravel", 
      level: 35, 
      primaryColor: "#ff2d20", 
      secondaryColor: "#ef4444", 
      icon: LaravelIcon 
    },
    { 
      name: "PHP", 
      level: 30, 
      primaryColor: "#777bb4", 
      secondaryColor: "#8892bf", 
      icon: PhpIcon
    },
    { 
      name: "Git", 
      level: 75, 
      primaryColor: "#f05032", 
      secondaryColor: "#f14e32", 
      icon: GitIcon 
    }
  ];

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
      name: 'Tanstack Router',
      icon: TanStackIcon
    },
    {
      name: 'Mlkit',
      icon: MlkitIcon
    },
  ]

  return (
    <>
      <Header />
      <main className='space-y-60 py-20'>
        <section className='space-y-20'>
          <h2 className='text-6xl font-bold text-center'>Latest Projects</h2>
          <div className='space-y-20'>
            {projects.slice(0, 3).map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                description={project.description}
                imageUrl={project.imageUrl}
                projectUrl={project.projectUrl}
                pictureInLeft={index % 2 === 0}
              />
            ))}
          </div>
          <LinkButton to="/projects" className='block mx-auto mt-10'
          >View All Projects</LinkButton>
        </section>
        <section className='space-y-20'>
          <h2 className='text-6xl font-bold text-center'>My Skills</h2>
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <SkillCard 
                key={index} 
                name={skill.name} 
                level={skill.level} 
                delay={index * 100}
                primaryColor={skill.primaryColor}
                secondaryColor={skill.secondaryColor}
                icon={skill.icon}
              />
            ))}
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