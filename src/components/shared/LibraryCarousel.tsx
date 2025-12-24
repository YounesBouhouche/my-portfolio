import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./LibraryCarousel.css";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";
import type { Library } from "../../types/Library";

export default function LibraryCarousel({
  libraries,
}: {
  libraries: Library[];
}) {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, active: true });

  useEffect(() => {
    const autoplay = setInterval(() => embla?.scrollNext(), 2000);
    return () => clearInterval(autoplay);
  }, [embla]);

  return (
    <div ref={emblaRef} className="overflow-hidden w-full relative">
      <div className="flex gap-10 py-10 touch-pan-y touch-pinch-zoom">
        {libraries.map((lib, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center shrink-0 px-10 py-5 select-none"
            title={lib.name}
          >
            <div className="bg-white/10 backdrop-blur-sm p-4 border border-white/10 hover:border-primary/30 transition-all duration-300 w-[100px] h-[100px] mb-10 flex items-center justify-center">
              <img
                src={lib.icon}
                alt={lib.name}
                className="h-16 w-auto opacity-70 group-hover:opacity-100 transition-opacity duration-300 object-contain"
              />
            </div>
            <span className="font-medium text-xl">{lib.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
