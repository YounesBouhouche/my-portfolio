import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";
import type { Project } from "../../types/Project";
import LargeProjectCard from "./LargeProjectCard";
import "./ProjectCarousel.css";

export default function ProjectCarousel({ projects }: { projects: Project[] }) {
  const [emblaRef, embla] = useEmblaCarousel({
    loop: true,
    active: true,
    align: "center",
    skipSnaps: false,
  });

  useEffect(() => {
    const autoplay = setInterval(() => embla?.scrollNext(), 5000);
    return () => clearInterval(autoplay);
  }, [embla]);

  return (
    <div ref={emblaRef} className="overflow-hidden w-full relative">
      <div className="flex gap-8 py-10 touch-pan-y touch-pinch-zoom">
        {projects.map((project, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full md:w-[90%] lg:w-[85%] select-none"
          >
            <LargeProjectCard
              title={project.name}
              description={project.description}
              imageUrl={project.heroImage}
              projectUrl={"/projects/" + project.route}
              pictureInLeft={index % 2 === 0}
              releaseDate={project.releaseDate}
              technologies={project.technologies}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
